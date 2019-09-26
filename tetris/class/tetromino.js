/**
 * @since 2019-09-25 08:18
 * @author vivaxy
 * TODO: put service tetrominos in this or in game
 */
import StateMachine from './state-machine.js';
import * as TS from '../enums/tetromino-state.js';
import * as sizes from '../helpers/sizes.js';

export default class Tetromino {
  constructor() {
    this.state = new StateMachine({
      default: TS.SETTLED,
      create: [TS.SETTLED, TS.MOVING],
      drop: [TS.MOVING, TS.DROPPING],
      settleFromMoving: [TS.MOVING, TS.SETTLED],
      settleFromDropping: [TS.DROPPING, TS.SETTLED],
    });
  }

  getState() {
    return this.state.getState();
  }

  create() {
    this.state.create();
  }

  drop() {
    this.state.drop();
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
