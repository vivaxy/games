import {
    tileSize,
    tileTypes,
    events,
    movementThreshold,
    tileSpacing,
    size,
    buttonTypes,
    directions,
} from './configs';

import Grid from './puzzle/grid';
import Tile from './puzzle/tile';
import Buttons from './puzzle/buttons';

const whenDirection = (direction) => {
    return (options) => {
        return Object.keys(options).map((directionKey) => {
            if (directionKey.toUpperCase() === direction) {
                return options[directionKey]();
            }
        });
    }
};

export default class Puzzle {
    constructor({ ctx, row, col, input }) {
        this.ctx = ctx;
        this.row = row;
        this.col = col;
        this.input = input;

        this.grid = new Grid({ ctx });
        this.buttons = new Buttons({ ctx });
        this.tileList = this.initializeTileList();
        this.initializeInput();
        this.buttons.enable([buttonTypes.SCRAMBLE]);
        this.moveActionEnabled = true;
    }

    initializeInput() {
        this.input.on(events.TRY_MOVE, (direction, point) => {
            if (!this.moveActionEnabled) {
                return;
            }
            this.tryMove(direction, point);
            whenDirection(direction)({
                left: () => {
                    if (point.deltaX < -movementThreshold) {
                        this.move(direction, point);
                    }
                },
                up: () => {
                    if (point.deltaY < -movementThreshold) {
                        this.move(direction, point);
                    }
                },
                right: () => {
                    if (point.deltaX > movementThreshold) {
                        this.move(direction, point);
                    }
                },
                down: () => {
                    if (point.deltaY > movementThreshold) {
                        this.move(direction, point);
                    }
                },
            });
        });
        this.input.on(events.RESET_SPACE_TILE, () => {
            const tile = this.findSpaceTile();
            tile.animateToResetPosition();
        });
        this.input.on(events.CLICK, (point) => {
            const buttonAction = this.buttons.hitButton(point);
            switch (buttonAction) {
                case buttonTypes.SCRAMBLE:
                    this.moveActionEnabled = false;
                    this.scramble();
                    this.moveActionEnabled = true;
                    this.buttons.enable([buttonTypes.SCRAMBLE]);
                    break;
            }
        });
    }

    initializeTileList() {
        const { ctx, col, row } = this;
        const width = tileSize;
        const height = tileSize;
        return Array.from({ length: row }, (rowItem, rowIndex) => {
            return Array.from({ length: col }, (colItem, colIndex) => {
                return new Tile({
                    ctx: ctx,
                    width,
                    height,
                    colIndex,
                    rowIndex,
                    text: String(rowIndex * row + colIndex + 1),
                    type: colIndex === col - 1 && rowIndex === row - 1 ? tileTypes.SPACE : tileTypes.NORMAL,
                });
            });
        });
    }

    tryMove(direction, point) {
        const tile = this.findSpaceTile();
        if (tile.colIndex >= size - 1 && point.deltaX > 0) {
            this.input.setStartPoint({ x: tile.x });
            point.deltaX = 0;
        }
        if (tile.colIndex <= 0 && point.deltaX < 0) {
            this.input.setStartPoint({ x: tile.x });
            point.deltaX = 0;
        }
        if (tile.rowIndex <= 0 && point.deltaY < 0) {
            this.input.setStartPoint({ y: tile.y });
            point.deltaY = 0;
        }
        if (tile.rowIndex >= size - 1 && point.deltaY > 0) {
            this.input.setStartPoint({ y: tile.y });
            point.deltaY = 0;
        }
        tile.deltaX = point.deltaX;
        tile.deltaY = point.deltaY;
    }

    swapTiles({ rowIndex: fromRowIndex, colIndex: fromColIndex }, { rowIndex: toRowIndex, colIndex: toColIndex }) {
        const fromTile = this.tileList[fromRowIndex][fromColIndex]; // space tile
        const toTile = this.tileList[toRowIndex][toColIndex]; // the other tile

        // swap
        this.tileList[fromRowIndex][fromColIndex] = toTile;
        this.tileList[toRowIndex][toColIndex] = fromTile;
        fromTile.rowIndex = toRowIndex;
        fromTile.colIndex = toColIndex;
        toTile.rowIndex = fromRowIndex;
        toTile.colIndex = fromColIndex;

        const deltaX = fromTile.deltaX;
        const deltaY = fromTile.deltaY;
        fromTile.deltaX = (fromColIndex - toColIndex) * (tileSize + tileSpacing) + deltaX;
        fromTile.deltaY = (fromRowIndex - toRowIndex) * (tileSize + tileSpacing) + deltaY;
        toTile.deltaX = (toColIndex - fromColIndex) * (tileSize + tileSpacing);
        toTile.deltaY = (toRowIndex - fromRowIndex) * (tileSize + tileSpacing);
        toTile.animateToResetPosition();
        this.input.moveStartPoint({
            x: (toColIndex - fromColIndex) * (tileSize + tileSpacing),
            y: (toRowIndex - fromRowIndex) * (tileSize + tileSpacing)
        });
    }

    move(direction, point) {
        const { rowIndex, colIndex } = this.findSpaceTile();
        whenDirection(direction)({
            left: () => {
                if (colIndex <= 0) {
                    this.input.resetPoint(point);
                    return;
                }
                // move left
                this.swapTiles({ rowIndex, colIndex }, { rowIndex, colIndex: colIndex - 1 });
            },
            up: () => {
                if (rowIndex <= 0) {
                    this.input.resetPoint(point);
                    return;
                }
                // move up
                this.swapTiles({ rowIndex, colIndex }, { rowIndex: rowIndex - 1, colIndex });
            },
            right: () => {
                if (colIndex >= this.col - 1) {
                    this.input.resetPoint(point);
                    return;
                }
                // move right
                this.swapTiles({ rowIndex, colIndex }, { rowIndex, colIndex: colIndex + 1 });
            },
            down: () => {
                if (rowIndex >= this.row - 1) {
                    this.input.resetPoint(point);
                    return;
                }
                // move down
                this.swapTiles({ rowIndex, colIndex }, { rowIndex: rowIndex + 1, colIndex });
            }
        });
    }

    findSpaceTile() {
        const { tileList } = this;
        return tileList.reduce((result, tileRow) => {
            return result || tileRow.reduce((tileResult, tile) => {
                if (tile.type === tileTypes.SPACE) {
                    return tile;
                }
                return tileResult;
            }, null);
        }, null);
    }

    render() {
        const { grid, tileList, buttons } = this;
        const renders = tileList.reduce(({ list: accRowList, spaceTile: accRowSpaceTile }, tileRow) => {
            const { list: rowList, spaceTile: rowSpaceTile } = tileRow.reduce(({ list, spaceTile }, tile) => {
                if (tile.type !== tileTypes.SPACE) {
                    return { list: [...list, tile], spaceTile };
                } else {
                    return { list, spaceTile: tile };
                }
            }, { list: [], spaceTile: null });
            return { list: [...accRowList, ...rowList], spaceTile: accRowSpaceTile || rowSpaceTile };
        }, { list: [], spaceTile: null });
        grid.render();
        renders.spaceTile.render();
        renders.list.map((tile) => {
            tile.render();
        });
        buttons.render();
    }

    update() {
        this.tileList.forEach((tileRow) => {
            tileRow.forEach((tile) => {
                tile.update();
            });
        });
    }

    scramble() {
        const directionKeys = Object.keys(directions);
        Array.from({ length: 1000 }, () => {
            return directions[directionKeys[Math.floor(Math.random() * directionKeys.length)]];
        }).map((direction) => {
            return this.move(direction, { x: 0, y: 0 });
        });
    }
}
