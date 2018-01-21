import {
    tileSize,
    tileTypes,
    directions,
    events,
} from './configs';

import Grid from './puzzle/grid';
import Tile from './puzzle/tile';

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
        this.input.on(events.MOVE, (direction, point) => {
            this.move(direction, point);
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

    move(direction, point) {
        const { row, col } = this.findSpacePosition();
        if (direction === directions.LEFT) {
            if (col <= 0) {
                this.input.resetPoint(point);
                return;
            }
            // move left
            const tileRow = this.tileList[row];
            const [tile] = tileRow.splice(col, 1);
            tileRow.splice(col - 1, 0, tile);
        } else if (direction === directions.UP) {
            if (row <= 0) {
                this.input.resetPoint(point);
                return;
            }
            // move up
            const tileRow = this.tileList[row];
            const upTileRow = this.tileList[row - 1];
            const [tile] = tileRow.splice(col, 1);
            const [upTile] = upTileRow.splice(col, 1);
            tileRow.splice(col, 0, upTile);
            upTileRow.splice(col, 0, tile);
        } else if (direction === directions.RIGHT) {
            if (col >= this.col - 1) {
                this.input.resetPoint(point);
                return;
            }
            // move right
            const tileRow = this.tileList[row];
            const [tile] = tileRow.splice(col, 1);
            tileRow.splice(col + 1, 0, tile);
        } else if (direction === directions.DOWN) {
            if (row >= this.row - 1) {
                this.input.resetPoint(point);
                return;
            }
            // move down
            const tileRow = this.tileList[row];
            const downTileRow = this.tileList[row + 1];
            const [tile] = tileRow.splice(col, 1);
            const [downTile] = downTileRow.splice(col, 1);
            tileRow.splice(col, 0, downTile);
            downTileRow.splice(col, 0, tile);
        } else {
            throw new Error('unexpected direction: ' + direction);
        }
    }

    findSpacePosition() {
        const { tileList } = this;
        return tileList.reduce((result, tileRow, rowIndex) => {
            const col = tileRow.reduce((colResult, tile, colIndex) => {
                if (tile.type === tileTypes.SPACE) {
                    return colIndex;
                }
                return colResult === null ? null : colResult;
            }, null);
            if (col !== null) {
                return { row: rowIndex, col };
            }
            return result;
        }, { col: null, row: null });
    }

    render() {
        const { grid, tileList } = this;
        grid.render();
        tileList.map((tileRow, rowIndex) => {
            return tileRow.map((tile, colIndex) => {
                return tile.render({ rowIndex, colIndex });
            });
        });
    }
}
