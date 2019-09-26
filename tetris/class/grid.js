/**
 * @since 2019-09-24 11:34
 * @author vivaxy
 */
import * as sizes from '../helpers/sizes.js';
export default class Grid {
  constructor({ rowCount = 20, colCount = 10 } = {}) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.reset();
  }

  get() {
    return this.value;
  }

  reset() {
    this.value = Array.from({ length: this.rowCount }, () => {
      return Array.from({ length: this.colCount }, function() {
        return null;
      });
    });
    this.eliminatingRows = [];
  }

  getEliminatingRows() {
    return this.eliminatingRows;
  }

  render(ctx, canvas) {
    ctx.beginPath();
    ctx.strokeStyle = '#efefef';
    ctx.lineWidth = sizes.gridBorderWidth;
    const gridWidth = sizes.cellSize * this.value[0].length;
    const gridHeight = sizes.cellSize * this.value.length;
    const marginHorizontal = (canvas.width - gridWidth) / 2;
    const marginVertical = (canvas.height - gridHeight) / 2;
    ctx.rect(
      marginHorizontal - sizes.gridBorderWidth / 2,
      marginVertical - sizes.gridBorderWidth / 2,
      gridWidth + sizes.gridBorderWidth,
      gridHeight + sizes.gridBorderWidth
    );
    ctx.stroke();
    ctx.closePath();
  }
}
