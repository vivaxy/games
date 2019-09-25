/**
 * @since 2019-09-24 02:14
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';
import * as GS from '../enums/game-state.js';
import * as TS from '../enums/tetromino-state.js';
import StateMachine from '../class/state-machine.js';
import Grid from '../class/grid.js';
import Score from '../class/score.js';
import Tetromino from '../class/tetromino.js';
import Speed from '../class/speed.js';

const state = new StateMachine({
  default: GS.NEW_GAME,
  start: [GS.NEW_GAME, GS.PLAYING],
  eliminate: [GS.PLAYING, GS.ELIMINATING],
  continue: [GS.ELIMINATING, GS.PLAYING],
  pause: [GS.PLAYING, GS.PAUSED],
  resume: [GS.PAUSED, GS.PLAYING],
  over: [GS.PLAYING, GS.GAME_OVER],
  reset: [GS.GAME_OVER, GS.NEW_GAME],
});

function init(ee) {
  const grid = new Grid();
  const score = new Score();
  const tetromino = new Tetromino();
  const speed = new Speed();

  state.onChange(function() {
    if (state.getState() === GS.PLAYING) {
      ee.emit(ET.UPDATE_GRID, { grid: grid.get() });
    }
    if (state.getState() === GS.GAME_OVER) {
      const restart = confirm('Game Over! Restart?');
      if (restart) {
        state.reset();
      }
    }
    if (state.getState() === GS.NEW_GAME) {
      grid.reset();
      score.reset();
      speed.reset();
      setTimeout(function() {
        state.start();
      }, 1000);
    }
  });

  ee.on(ET.TICK, handleTick);
  ee.on(ET.TETROMINO_SETTLED, handleTetrominoSettled);
  ee.on(ET.TETROMINO_DOWN, handleTetrominoDown);

  function handleTick() {
    if (state.getState() === GS.PLAYING) {
      if (tetromino.getState() === TS.DROPPING) {
        ee.emit(ET.TETROMINO_MOVE);
      } else if (speed.nextTick()) {
        if (tetromino.getState() === TS.MOVING) {
          ee.emit(ET.TETROMINO_MOVE);
        } else if (grid.getEliminatingRows().length) {
          const addScore = grid.getEliminatingRows().length * grid.getEliminatingRows().length * 10;
          let dropRowCount = 0;
          for (let i = grid.rowCount - 1; i >= 0; i--) {
            while (
              i - dropRowCount ===
              grid.getEliminatingRows()[grid.getEliminatingRows().length - 1]
            ) {
              dropRowCount++;
              grid.getEliminatingRows().pop();
            }
            if (i - dropRowCount >= 0) {
              grid.get()[i - dropRowCount].forEach(function(item, colIndex) {
                grid.get()[i][colIndex] = item;
              });
            } else {
              grid.get()[i].forEach(function(_, colIndex) {
                grid.get()[i][colIndex] = null;
              });
            }
          }
          if (grid.getEliminatingRows().length !== 0) {
            throw new Error('Unexpect loop result');
          }
          score.add(addScore);
          ee.emit(ET.SCORE_UPDATE, { score: score.get() });
        } else {
          tetromino.create();
          ee.emit(ET.TETROMINO_CREATE);
        }
      } else {
        if (grid.getEliminatingRows().length) {
          grid.getEliminatingRows().forEach(function(rowIndex) {
            grid.get()[rowIndex].forEach(function(item) {
              if (item._color) {
                item.color = item._color;
                delete item._color;
              } else {
                item._color = item.color;
                item.color = '#fff';
              }
            });
          });
        }
      }
    }
  }

  function handleTetrominoSettled(et, { tetromino: _tetromino, position }) {
    tetromino.settle();
    let gameOver = false;
    _tetromino.forEach(function(row, rowIndex) {
      row.forEach(function(item) {
        if (item) {
          if (rowIndex + position[1] <= 0) {
            gameOver = true;
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
    score.add(1);
    ee.emit(ET.SCORE_UPDATE, { score: score.get() });
    if (gameOver) {
      setTimeout(function() {
        ee.emit(GS.GAME_OVER);
      }, 0);
    }
  }

  function handleTetrominoDown() {
    if (tetromino.getState() === TS.MOVING) {
      tetromino.drop();
    }
  }
}

export default {
  init,
  start() {
    state.start();
  },
};
