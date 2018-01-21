import { gridBorderColor, gridBorderWidth, gridSize, gridX, gridY } from '../configs';

export default class Grid {
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
