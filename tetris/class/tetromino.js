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

  getPosition() {
    return this.position;
  }

  get(){
    return this.value;
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
      Math.floor(
        Math.random() * (grid.get()[0].length - this.value[0].length + 1)
      ),
      1 - this.value.length,
    ];
    this.state.create();
  }

  drop() {
    this.state.drop();
  }

  settle() {
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

  canMove(grid) {
    for (let rowIndex = 0; rowIndex < this.value.length; rowIndex++) {
      const row = this.value[rowIndex];
      for (let colIndex = 0; colIndex < this.value.length; colIndex++) {
        const gridRowIndex = rowIndex + this.position[1];
        const gridColIndex = colIndex + this.position[0];
        if (gridRowIndex < 0) {
          continue;
        }
        if (row[colIndex]) {
          if (gridRowIndex + 1 > grid.rowCount - 1) {
            return false;
          }
          if (grid.get()[gridRowIndex + 1][gridColIndex]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  move({ direction: { x = 0, y = 1 } = {} } = {}) {
    this.position[0] += x;
    this.position[1] += y;
  }

  render(ctx, canvas) {}
}
