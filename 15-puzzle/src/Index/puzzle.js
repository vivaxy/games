import {
    gridX,
    gridY,
    gridSize,
    gridBorderWidth,
    gridBorderColor,
    getTileSize,
    tileBorderWidth,
    tileBorderColor,
    getTilePosition,
} from './configs';

class Tile {
    constructor({ ctx, width, height, x, y }) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.borderWidth = tileBorderWidth;
        this.strokeStyle = tileBorderColor;
        this.x = x;
        this.y = y;
    }

    render() {
        const ctx = this.ctx;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.borderWidth;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
        const ctx = this.ctx;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

export default class Puzzle {
    constructor({ ctx, row, col }) {
        this.ctx = ctx;
        this.row = row;
        this.col = col;

        this.grid = new Grid({ ctx });
        this.tileList = this.initializeTileList();
    }

    initializeTileList() {
        const width = getTileSize({ size: this.col });
        const height = getTileSize({ size: this.row });
        return Array.from({ length: this.col }, (colItem, colIndex) => {
            return Array.from({ length: this.row }, (rowItem, rowIndex) => {
                return new Tile({
                    ctx: this.ctx,
                    width,
                    height,
                    ...getTilePosition({
                        tileWidth: width,
                        tileHeight: height,
                        colIndex,
                        rowIndex,
                    })
                });
            });
        });
    }

    render() {
        const grid = this.grid;
        const tileList = this.tileList;
        grid.render();
        tileList.map((tileRow) => {
            return tileRow.map((tile) => {
                return tile.render();
            });
        });
    }
}
