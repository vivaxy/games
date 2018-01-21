import {
    tileBorderWidth,
    tileBorderColor,
    getTilePosition,
    tileTypes,
} from '../configs';

export default class Tile {
    constructor({ ctx, width, height, text, type, rowIndex, colIndex, deltaX = 0, deltaY = 0 }) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.borderWidth = tileBorderWidth;
        this.strokeStyle = tileBorderColor;
        this.text = text;
        this.type = type;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    renderSpaceTile() {
        const { ctx, strokeStyle, borderWidth, width, height, rowIndex, colIndex, deltaX, deltaY } = this;
        const { x, y } = getTilePosition({ colIndex, rowIndex });
        ctx.fillStyle = '#999';
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = borderWidth;
        ctx.fillRect(x + deltaX, y + deltaY, width, height);
    }

    renderNormalTile() {
        const { ctx, strokeStyle, borderWidth, width, height, text, rowIndex, colIndex } = this;
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

    render() {
        const { type } = this;
        if (type === tileTypes.SPACE) {
            return this.renderSpaceTile();
        }
        return this.renderNormalTile();
    }
}
