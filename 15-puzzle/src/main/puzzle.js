import {
    tileSize,
    tileTypes,
    events,
    movementThreshold,
    tileSpacing,
    mapCanvasToPoint,
    mapPointToCanvas,
} from './configs';

import Grid from './puzzle/grid';
import Tile from './puzzle/tile';

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
        this.tileList = this.initializeTileList();
        this.initializeInput();
    }

    initializeInput() {
        this.input.on(events.TRY_MOVE, (direction, point) => {
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
        tile.deltaX = point.deltaX;
        tile.deltaY = point.deltaY;
    }

    swapTiles({ rowIndex: fromRowIndex, colIndex: fromColIndex }, { rowIndex: toRowIndex, colIndex: toColIndex }) {
        const fromTile = this.tileList[fromRowIndex][fromColIndex];
        const toTile = this.tileList[toRowIndex][toColIndex];

        const getSpaceTile = () => {
            if (fromTile.type === tileTypes.SPACE) {
                return fromTile;
            }
            return toTile;
        };
        const spaceTile = getSpaceTile();

        // swap
        this.tileList[fromRowIndex][fromColIndex] = toTile;
        this.tileList[toRowIndex][toColIndex] = fromTile;
        fromTile.rowIndex = toRowIndex;
        fromTile.colIndex = toColIndex;
        toTile.rowIndex = fromRowIndex;
        toTile.colIndex = fromColIndex;

        const deltaX = spaceTile.deltaX;
        const deltaY = spaceTile.deltaY;
        spaceTile.deltaX = (fromColIndex - toColIndex) * (tileSize + tileSpacing) - deltaX;
        spaceTile.deltaY = (fromRowIndex - toRowIndex) * (tileSize + tileSpacing) - deltaY;
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
        const { grid, tileList } = this;
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
    }
}
