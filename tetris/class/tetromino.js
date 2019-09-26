/**
 * @since 2019-09-25 08:18
 * @author vivaxy
 * TODO: put service tetrominos in this or in game
 */
import StateMachine from './state-machine.js';
import * as TS from '../enums/tetromino-state.js';
import * as sizes from '../helpers/sizes.js';
import { getNextColor } from '../helpers/colors.js';
import tetrominos from '../helpers/tetrominos.js';

export default class Tetromino {
  constructor() {
    this.state = new StateMachine({
      default: TS.SETTLED,
      create: [TS.SETTLED, TS.MOVING],
      drop: [TS.MOVING, TS.DROPPING],
      settleFromMoving: [TS.MOVING, TS.SETTLED],
      settleFromDropping: [TS.DROPPING, TS.SETTLED],
    });
    this.position = [0, 0];
    this.value = null;
  }

  onStateChange(callback) {
    this.state.onChange(callback);
  }

  getState() {
    return this.state.getState();
  }

  create(grid) {
    const color = getNextColor();
    const randomTetrominoIndex = Math.floor(tetrominos.length * Math.random());
    this.value = tetrominos[randomTetrominoIndex].map(function(row) {
      return row.map(function(item) {
        if (item) {
          return {
            color,
          };
        }
        return null;
      });
    });
    this.position = [
      Math.floor(Math.random() * (grid[0].length - this.value[0].length + 1)),
      1 - this.value.length,
    ];
    this.state.create();
    this.addTetromino(grid);
  }

  drop() {
    this.state.drop();
  }

  settle(grid, score) {
    const ret = {
      isGameOver: false,
      scoreToAdd: 0,
    };
    this.value.forEach((row, rowIndex) => {
      row.forEach((item) => {
        if (item) {
          if (rowIndex + this.position[1] <= 0) {
            ret.isGameOver = true;
          }
        }
      });
    });

    grid.get().forEach(function(row, rowIndex) {
      let hasSpace = false;
      row.forEach(function(item) {
        if (!item) {
          hasSpace = true;
        }
      });
      if (!hasSpace) {
        grid.getEliminatingRows().push(rowIndex);
      }
    });
    ret.scoreToAdd = 1;

    this.value = null;
    if (this.getState() === TS.MOVING) {
      this.state.settleFromMoving();
      return ret;
    }
    if (this.getState() === TS.DROPPING) {
      this.state.settleFromDropping();
      return ret;
    }
    throw new Error('settle from state: ' + this.getState());
  }

  addTetromino(grid) {

  }

  move(grid, { direction: { x = 0, y = 1 } = {} } = {}) {
    removeTetrominoFromGrid();
    this.position[0] += x;
    this.position[1] += y;
    this.addTetromino(grid);
  }

  render(ctx, canvas, grid) {
    const gridWidth = sizes.cellSize * grid[0].length;
    const gridHeight = sizes.cellSize * grid.length;
    const marginHorizontal = (canvas.width - gridWidth) / 2;
    const marginVertical = (canvas.height - gridHeight) / 2;

    grid.forEach(function(row, rowIndex) {
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
