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

  computeEliminatingRows() {
    this.value.forEach((row, rowIndex) => {
      let hasSpace = false;
      row.forEach((item) => {
        if (!item) {
          hasSpace = true;
        }
      });
      if (!hasSpace) {
        this.eliminatingRows.push(rowIndex);
      }
    });
  }

  eliminateRows() {
    const eliminatingRows = this.eliminatingRows;
    const scoreToAdd = Math.pow(eliminatingRows.length, 2);

    let dropRowCount = 0;
    for (let i = this.rowCount - 1; i >= 0; i--) {
      while (i - dropRowCount === eliminatingRows[eliminatingRows.length - 1]) {
        dropRowCount++;
        eliminatingRows.pop();
      }
      if (i - dropRowCount >= 0) {
        this.value[i - dropRowCount].forEach((item, colIndex) => {
          this.value[i][colIndex] = item;
        });
      } else {
        this.value[i].forEach(function(_, colIndex) {
          this.value[i][colIndex] = null;
        });
      }
    }
    if (eliminatingRows.length !== 0) {
      throw new Error('Unexpect loop result');
    }
    return {
      scoreToAdd,
    };
  }
  removeTetromino(tetromino) {
    for (let rowIndex = 0; rowIndex < tetromino.get().length; rowIndex++) {
      const row = tetromino.get()[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const gridRowIndex = rowIndex + tetromino.getPosition()[1];
        const gridColIndex = colIndex + tetromino.getPosition()[0];
        if (gridRowIndex < 0) {
          continue;
        }
        if (row[colIndex]) {
          if (!this.value[gridRowIndex][gridColIndex]) {
            throw new Error('Unexpected cell');
          }
          this.value[gridRowIndex][gridColIndex] = null;
        }
      }
    }
  }

  addTetromino(tetromino) {
    for (let rowIndex = 0; rowIndex < tetromino.get().length; rowIndex++) {
      const row = tetromino.get()[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const gridRowIndex = rowIndex + tetromino.getPosition()[1];
        const gridColIndex = colIndex + tetromino.getPosition()[0];
        if (gridRowIndex < 0) {
          continue;
        }
        if (row[colIndex]) {
          if (this.value[gridRowIndex][gridColIndex]) {
            throw new Error('Unexpected cell');
          }
          this.value[gridRowIndex][gridColIndex] = row[colIndex];
        }
      }
    }
  }

  render(ctx, canvas) {
    this.renderBorder(ctx, canvas);
    this.renderGrid(ctx, canvas);
  }
  renderBorder(ctx, canvas) {
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

  renderGrid(ctx, canvas) {
    const gridWidth = sizes.cellSize * this.value[0].length;
    const gridHeight = sizes.cellSize * this.value.length;
    const marginHorizontal = (canvas.width - gridWidth) / 2;
    const marginVertical = (canvas.height - gridHeight) / 2;

    this.value.forEach(function(row, rowIndex) {
      row.forEach(function(item, colIndex) {
        if (item) {
          ctx.beginPath();
          ctx.fillStyle = item.color;
          ctx.rect(
            marginHorizontal + colIndex * sizes.cellSize,
            marginVertical + rowIndex * sizes.cellSize,
            sizes.cellSize,
            sizes.cellSize
          );
          ctx.fill();
          ctx.closePath();
          ctx.beginPath();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.rect(
            marginHorizontal + colIndex * sizes.cellSize + sizes.cellSize / 10,
            marginVertical + rowIndex * sizes.cellSize + sizes.cellSize / 10,
            sizes.cellSize - sizes.cellSize / 5,
            sizes.cellSize - sizes.cellSize / 5
          );
          ctx.stroke();
          ctx.closePath();
        }
      });
    });
  }
}
