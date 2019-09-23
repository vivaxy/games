/**
 * @since 2019-09-22 05:30
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';
import * as GS from '../enums/game-state.js';

function init(ee) {
  let gameState = GS.NEW_GAME;
  let grid = Array.from({ length: 20 }, function() {
    return Array.from({ length: 10 }, function() {
      return null;
    });
  });
  let score = 0;
  let tetrominoMoving = false;
  let tetrominoDroping = false;
  let eliminatingRows = [];
  let speed = 100;
  let speedIndex = 0;

  ee.on(ET.GAME_STATE_CHANGE, handleGameStateChange);
  ee.on(ET.TICK, handleTick);
  ee.on(ET.TETROMINO_SETTLED, handleTetrominoSettled);
  ee.on(ET.TETROMINO_DOWN, handleTetrominoDown);

  function handleGameStateChange(et, { gameState: _gameState }) {
    gameState = _gameState;
    if (gameState === GS.PLAYING) {
      ee.emit(ET.UPDATE_GRID, { grid });
    }
  }

  function handleTick() {
    if (gameState === GS.PLAYING) {
      if (tetrominoDroping) {
        speedIndex = 0;
        ee.emit(ET.TETROMINO_MOVE);
      } else if (speedIndex > speed) {
        speedIndex = 0;
        if (tetrominoMoving) {
          ee.emit(ET.TETROMINO_MOVE);
        } else if (eliminatingRows.length) {
          let dropRowCount = 0;
          for (let i = grid.length - 1; i >= 0; i--) {
            if (eliminatingRows[eliminatingRows.length - 1] === i) {
              dropRowCount++;
              eliminatingRows.pop();
            }
            if (i - dropRowCount >= 0) {
              // TODO fix bug when eliminate multiple rows
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
    score += 1;
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
    if (gameOver) {
      ee.emit(GS.GAME_OVER);
    }
    console.log('score', score);
  }

  function handleTetrominoDown() {
    tetrominoDroping = true;
  }
}

export default {
  init,
};
