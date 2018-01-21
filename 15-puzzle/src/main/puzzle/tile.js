import {
    tileBorderWidth,
    tileBorderColor,
    getTilePosition,
    tileTypes,
} from '../configs';

export default class Tile {
    constructor({ ctx, width, height, text, type }) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.borderWidth = tileBorderWidth;
        this.strokeStyle = tileBorderColor;
        this.text = text;
        this.type = type;
    }

    renderSpaceTile({ rowIndex, colIndex }) {
        // const { ctx, strokeStyle, borderWidth, width, height } = this;
        // const { x, y } = getTilePosition({ colIndex, rowIndex });
        // ctx.fillStyle = '#f00';
        // ctx.strokeStyle = strokeStyle;
        // ctx.lineWidth = borderWidth;
        // ctx.fillRect(x, y, width, height);
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
