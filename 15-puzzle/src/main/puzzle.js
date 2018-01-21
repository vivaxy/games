import {
    tileSize,
    tileTypes,
    events,
    movementThreshold,
    gridSize,
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
        const fromTileRow = this.tileList[fromRowIndex];
        const [fromTile] = fromTileRow.splice(fromColIndex, 1);
        const toTileRow = this.tileList[toRowIndex];
        const [toTile] = toTileRow.splice(toColIndex, 1);
        toTileRow.splice(toColIndex, 0, fromTile);
        fromTileRow.splice(fromColIndex, 0, toTile);
        fromTile.rowIndex = toRowIndex;
        fromTile.colIndex = toColIndex;
        toTile.rowIndex = fromRowIndex;
        toTile.colIndex = fromColIndex;
        fromTile.deltaX += (toColIndex - fromColIndex) * tileSize;
        fromTile.deltaY += (toRowIndex - fromRowIndex) * tileSize;
        toTile.deltaX += (fromColIndex - toColIndex) * tileSize;
        toTile.deltaY += (fromRowIndex - toRowIndex) * tileSize;
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
        grid.render();
        tileList.reduceRight((accRow, tileRow) => {
            return tileRow.reduceRight((acc, tile) => {
                return tile.render();
            }, null);
        }, null);
    }
}
