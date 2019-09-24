/**
 * @since 2019-09-24 02:14
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';
import * as GS from '../enums/game-state.js';
import StateMachine from '../class/state-machine.js';

const gameStateMachine = new StateMachine({
  default: GS.NEW_GAME,
  start: [GS.NEW_GAME, GS.PLAYING],
  pause: [GS.PLAYING, GS.PAUSED],
  resume: [GS.PAUSED, GS.PLAYING],
  over: [GS.PLAYING, GS.GAME_OVER],
  reset: [GS.GAME_OVER, GS.NEW_GAME],
});

function init(ee) {
  const INITIAL_SPEED = 100;
  function generateDefaultGrid() {
    return Array.from({ length: 20 }, function() {
      return Array.from({ length: 10 }, function() {
        return null;
      });
    });
  }

  let grid = generateDefaultGrid();
  let score = 0;
  let tetrominoMoving = false;
  let tetrominoDroping = false;
  let eliminatingRows = [];
  let speed = INITIAL_SPEED;
  let speedIndex = 0;

  gameStateMachine.onChange(function() {
    if (gameStateMachine.getState() === GS.PLAYING) {
      ee.emit(ET.UPDATE_GRID, { grid });
    }
    if (gameStateMachine.getState() === GS.GAME_OVER) {
      const restart = confirm('Game Over! Restart?');
      if (restart) {
        gameStateMachine.reset();
      }
    }
    if (gameStateMachine.getState() === GS.NEW_GAME) {
      grid = generateDefaultGrid();
      score = 0;
      tetrominoMoving = false;
      tetrominoDroping = false;
      eliminatingRows = [];
      speed = INITIAL_SPEED;
      speedIndex = 0;
      setTimeout(function() {
        gameStateMachine.start();
      }, 1000);
    }
  });

  ee.on(ET.TICK, handleTick);
  ee.on(ET.TETROMINO_SETTLED, handleTetrominoSettled);
  ee.on(ET.TETROMINO_DOWN, handleTetrominoDown);

  function handleTick() {
    if (gameStateMachine.getState() === GS.PLAYING) {
      if (tetrominoDroping && tetrominoMoving) {
        speedIndex = 0;
        ee.emit(ET.TETROMINO_MOVE);
      } else if (speedIndex > speed) {
        speedIndex = 0;
        if (tetrominoMoving) {
          ee.emit(ET.TETROMINO_MOVE);
        } else if (eliminatingRows.length) {
          const addScore = eliminatingRows.length * eliminatingRows.length * 10;
          let dropRowCount = 0;
          for (let i = grid.length - 1; i >= 0; i--) {
            while (
              i - dropRowCount ===
              eliminatingRows[eliminatingRows.length - 1]
            ) {
              dropRowCount++;
              eliminatingRows.pop();
            }
            if (i - dropRowCount >= 0) {
              grid[i - dropRowCount].forEach(function(item, colIndex) {
                grid[i][colIndex] = item;
              });
            } else {
              grid[i].forEach(function(_, colIndex) {
                grid[i][colIndex] = null;
              });
            }
          }
          if (eliminatingRows.length !== 0) {
            throw new Error('Unexpect loop result');
          }
          score += addScore;
          ee.emit(ET.SCORE_UPDATE, { score });
        } else {
          tetrominoMoving = true;
          ee.emit(ET.TETROMINO_CREATE);
        }
      } else {
        speedIndex++;
        if (eliminatingRows.length) {
          eliminatingRows.forEach(function(rowIndex) {
            grid[rowIndex].forEach(function(item) {
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

  function handleTetrominoSettled(et, { tetromino, position }) {
    tetrominoMoving = false;
    tetrominoDroping = false;
    let gameOver = false;
    tetromino.forEach(function(row, rowIndex) {
      row.forEach(function(item) {
        if (item) {
          if (rowIndex + position[1] <= 0) {
            gameOver = true;
          }
        }
      });
    });

    eliminatingRows = [];
    grid.forEach(function(row, rowIndex) {
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
    score++;
    ee.emit(ET.SCORE_UPDATE, { score });
    if (gameOver) {
      setTimeout(function() {
        ee.emit(GS.GAME_OVER);
      }, 0);
    }
  }

  function handleTetrominoDown() {
    if (!tetrominoDroping) {
      tetrominoDroping = true;
    }
  }
}

export default {
  init,
  gameStateMachine,
};
