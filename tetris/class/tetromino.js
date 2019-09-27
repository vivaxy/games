/**
 * @since 2019-09-25 08:18
 * @author vivaxy
 */
import StateMachine from './state-machine.js';
import * as TS from '../enums/tetromino-state.js';
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

  getPosition() {
    return this.position;
  }

  get() {
    return this.value;
  }

  create() {
    this.state.create();
  }

  createTetromino(grid) {
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
      Math.floor(
        Math.random() * (grid.get()[0].length - this.value[0].length + 1),
      ),
      1 - this.value.length,
    ];
  }

  drop() {
    this.state.drop();
  }

  isOnTopBorder() {
    return this.position[1] <= 0;
  }

  settle() {
    this.value = null;
    if (this.getState() === TS.MOVING) {
      this.state.settleFromMoving();
      return;
    }
    if (this.getState() === TS.DROPPING) {
      this.state.settleFromDropping();
      return;
    }
    throw new Error('settle from state: ' + this.getState());
  }

  canMove(grid) {
    for (let rowIndex = 0; rowIndex < this.value.length; rowIndex++) {
      const row = this.value[rowIndex];
      const gridRowIndex = rowIndex + this.position[1];
      if (gridRowIndex < 0) {
        continue;
      }
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const gridColIndex = colIndex + this.position[0];
        if (row[colIndex]) {
          if (gridRowIndex + 1 > grid.rowCount - 1) {
            return false;
          }
          if (
            grid.get()[gridRowIndex + 1][gridColIndex] &&
            // next row is not itself
            !(this.value[rowIndex + 1] && this.value[rowIndex + 1][colIndex])
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  move(x = 0, y = 1) {
    this.position[0] += x;
    this.position[1] += y;
  }

  canMoveLeft(grid) {
    if (this.position[0] <= 0) {
      return false;
    }
    for (let rowIndex = 0; rowIndex < this.value.length; rowIndex++) {
      const row = this.value[row];
      const gridRowIndex = rowIndex + this.position[1];
      if (gridRowIndex < 0) {
        continue;
      }
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const gridColIndex = colIndex + this.position[0];
        if (row[colIndex]) {
          if (
            grid.get()[gridRowIndex][gridColIndex - 1] &&
            // not self
            !this.value[rowIndex][colIndex - 1]
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  canMoveRight(grid) {
    if (this.position[0] >= grid.colCount - 1) {
      return false;
    }
    for (let rowIndex = 0; rowIndex < this.value.length; rowIndex++) {
      const row = this.value[row];
      const gridRowIndex = rowIndex + this.position[1];
      if (gridRowIndex < 0) {
        continue;
      }
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const gridColIndex = colIndex + this.position[0];
        if (row[colIndex]) {
          if (
            grid.get()[gridRowIndex][gridColIndex + 1] &&
            !this.value[rowIndex][colIndex + 1]
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  rotate() {
    if (!tetromino) {
      return;
    }
    removeTetrominoFromGrid();
    const t = [];
    for (let i = tetromino[0].length - 1; i >= 0; i--) {
      const row = [];
      for (let j = 0; j < tetromino.length; j++) {
        row.push(tetromino[j][i]);
      }
      t.push(row);
    }
    tetromino = t;
    makeLeftFit();
    makeRightFit();
    addTetromino();
  }
}
