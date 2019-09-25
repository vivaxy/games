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
  pause: [GS.PLAYING, GS.PAUSED],
  resume: [GS.PAUSED, GS.PLAYING],
  over: [GS.PLAYING, GS.GAME_OVER],
  reset: [GS.GAME_OVER, GS.NEW_GAME],
});

function init(ee) {
  let grid = new Grid();
  let score = new Score();
  let tetromino = new Tetromino();
  let eliminatingRows = [];
  let speed = new Speed();

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
      grid = new Grid();
      score.clear();
      eliminatingRows = [];
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
        } else if (eliminatingRows.length) {
          const addScore = eliminatingRows.length * eliminatingRows.length * 10;
          let dropRowCount = 0;
          for (let i = grid.rowCount - 1; i >= 0; i--) {
            while (
              i - dropRowCount ===
              eliminatingRows[eliminatingRows.length - 1]
            ) {
              dropRowCount++;
              eliminatingRows.pop();
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
          if (eliminatingRows.length !== 0) {
            throw new Error('Unexpect loop result');
          }
          score.add(addScore);
          ee.emit(ET.SCORE_UPDATE, { score: score.get() });
        } else {
          tetromino.create();
          ee.emit(ET.TETROMINO_CREATE);
        }
      } else {
        if (eliminatingRows.length) {
          eliminatingRows.forEach(function(rowIndex) {
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

    eliminatingRows = [];
    grid.get().forEach(function(row, rowIndex) {
      let hasSpace = false;
      row.forEach(function(item) {
        if (!item) {
          hasSpace = true;
        }
      });
      if (!hasSpace) {
        eliminatingRows.push(rowIndex);
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
