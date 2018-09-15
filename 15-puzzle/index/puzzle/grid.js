import { gridBorderColor, gridBackgroundColor, gridBorderWidth, gridSize, gridX, gridY } from '../configs.js';

export default class Grid {
  constructor({ ctx }) {
    this.ctx = ctx;
    this.x = gridX;
    this.y = gridY;
    this.width = this.height = gridSize;
    this.borderWidth = gridBorderWidth;
    this.strokeStyle = gridBorderColor;
    this.fillStyle = gridBackgroundColor;
  }

  render() {
    const { ctx, strokeStyle, fillStyle, borderWidth, x, y, width, height } = this;
    if (borderWidth) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(x, y, width, height);
    }
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, width, height);
  }
}
