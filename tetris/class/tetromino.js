/**
 * @since 2019-09-25 08:18
 * @author vivaxy
 */
import StateMachine from './state-machine.js';
import * as TS from '../enums/tetromino-state.js';
import * as DIRECTIONS from '../enums/directions.js';
import { getNextColor } from '../helpers/colors.js';
import tetrominos from '../helpers/tetrominos.js';

const DIRECTIONS_TO_COORDS = {
  [DIRECTIONS.LEFT]: [-1, 0],
  [DIRECTIONS.RIGHT]: [1, 0],
  [DIRECTIONS.DOWN]: [0, 1],
};

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

  canFit(tetromino, grid, x, y) {
    for (let rowIndex = 0; rowIndex < tetromino.length; rowIndex++) {
      const row = tetromino[rowIndex];
      const gridRowIndex = rowIndex + y;
      if (gridRowIndex < 0) {
        continue;
      }
      if (gridRowIndex >= grid.rowCount) {
        return false;
      }
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const gridColIndex = colIndex + x;
        if (gridColIndex < 0 || gridColIndex >= grid.colCount) {
          return false;
        }
        if (row[colIndex] && grid.get()[gridRowIndex][gridColIndex]) {
          return false;
        }
      }
    }
    return true;
  }

  canMove(grid, direction) {
    const [x, y] = DIRECTIONS_TO_COORDS[direction];
    for (let rowIndex = 0; rowIndex < this.value.length; rowIndex++) {
      const row = this.value[rowIndex];
      const gridRowIndex = rowIndex + this.position[1];
      if (gridRowIndex < 0) {
        continue;
      }
      const nextGridRowIndex = gridRowIndex + y;
      if (nextGridRowIndex >= grid.rowCount) {
        return false;
      }
      const nextRowIndex = rowIndex + y;

      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const gridColIndex = colIndex + this.position[0];
        const nextGridColIndex = gridColIndex + x;
        const nextColIndex = colIndex + x;
        if (nextGridColIndex < 0 || nextGridColIndex >= grid.colCount) {
          return false;
        }
        if (row[colIndex]) {
          if (
            grid.get()[nextGridRowIndex][nextGridColIndex] &&
            // next row is not itself
            !(
              this.value[nextRowIndex] && this.value[nextRowIndex][nextColIndex]
            )
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  move(direction) {
    const [x, y] = DIRECTIONS_TO_COORDS[direction];
    this._move(x, y);
  }

  _move(x, y) {
    this.position[0] += x;
    this.position[1] += y;
  }

  getMoveLeftStepCount(rotatedTetromino, grid) {
    for (let colIndex = this.position[0]; colIndex >= 0; colIndex--) {
      if (this.canFit(rotatedTetromino, grid, colIndex, this.position[1])) {
        return this.position[0] - colIndex;
      }
    }
    return -1;
  }

  getMoveRightStepCount(rotatedTetromino, grid) {
    for (let colIndex = this.position[0]; colIndex < 0; colIndex++) {
      if (this.canFit(rotatedTetromino, grid, colIndex, this.position[1])) {
        return colIndex - this.position[0];
      }
    }
    return -1;
  }

  getRotateInfo(grid) {
    const rotatedTetromino = this.getRotatedTetromino();
    let moveLeftStepCount = this.getMoveLeftStepCount(rotatedTetromino, grid);
    let moveRightStepCount = this.getMoveRightStepCount(rotatedTetromino, grid);
    if (moveLeftStepCount === -1 && moveRightStepCount === -1) {
      return null;
    }
    if (moveLeftStepCount === -1) {
      return {
        rotatedTetromino,
        positionXOffset: moveRightStepCount,
      };
    }
    if (moveRightStepCount === -1) {
      return {
        rotatedTetromino,
        positionXOffset: -moveLeftStepCount,
      };
    }
    if (moveLeftStepCount <= moveRightStepCount) {
      return {
        rotatedTetromino,
        positionXOffset: -moveLeftStepCount,
      };
    }
    return {
      rotatedTetromino,
      positionXOffset: moveRightStepCount,
    };
  }

  getRotatedTetromino() {
    const t = [];
    for (let i = this.value[0].length - 1; i >= 0; i--) {
      const row = [];
      for (let j = 0; j < this.value.length; j++) {
        row.push(this.value[j][i]);
      }
      t.push(row);
    }
    return t;
  }

  rotate(grid) {
    const rotateInfo = this.getRotateInfo(grid);
    if (!rotateInfo) {
      // cannot rotate
      return false;
    }
    this.value = rotateInfo.rotatedTetromino;
    this.position[0] += rotateInfo.positionXOffset;
  }
}
