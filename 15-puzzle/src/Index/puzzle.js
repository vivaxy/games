import {
    gridX,
    gridY,
    gridSize,
    gridBorderWidth,
    gridBorderColor,
    tileSize,
    tileBorderWidth,
    tileBorderColor,
    getTilePosition,
    tileTypes,
    directions,
    events,
} from './configs';

class Tile {
    constructor({ ctx, width, height, text, type }) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.borderWidth = tileBorderWidth;
        this.strokeStyle = tileBorderColor;
        this.text = text;
        this.type = type;
    }

    renderSpaceTile() {
    }

    renderNormalTile({ rowIndex, colIndex }) {
        const { ctx, strokeStyle, borderWidth, width, height, text } = this;
        const { x, y } = getTilePosition({ colIndex, rowIndex });
        ctx.fillStyle = '#000';
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = borderWidth;
        ctx.fillRect(x, y, width, height);

        ctx.font = '48px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.fillText(text, x + width / 2, y + height / 2);
    }

    render({ rowIndex, colIndex }) {
        const { type } = this;
        if (type === tileTypes.SPACE) {
            return this.renderSpaceTile({ rowIndex, colIndex });
        }
        return this.renderNormalTile({ rowIndex, colIndex });
    }
}

class Grid {
    constructor({ ctx }) {
        this.ctx = ctx;
        this.x = gridX;
        this.y = gridY;
        this.width = this.height = gridSize;
        this.borderWidth = gridBorderWidth;
        this.strokeStyle = gridBorderColor;
    }

    render() {
        const { ctx, strokeStyle, borderWidth, x, y, width, height } = this;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(x, y, width, height);
    }
}

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
