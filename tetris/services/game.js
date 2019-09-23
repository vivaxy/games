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
      return 0;
    });
  });
  let score = 0;
  let shapeMoving = false;
  const speed = 1;
  let speedIndex = 0;

  ee.on(ET.GAME_STATE_CHANGE, handleGameStateChange);
  ee.on(ET.TICK, handleTick);
  ee.on(ET.SHAPE_SETTLED, handleShapeSettled);

  function handleGameStateChange(eventType, { gameState: _gameState }) {
    gameState = _gameState;
    if (gameState === GS.PLAYING) {
      ee.emit(ET.UPDATE_GRID, { grid });
    }
  }

  function handleTick() {
    if (gameState === GS.PLAYING) {
      if (speedIndex > speed) {
        speedIndex = 0;
        if (!shapeMoving) {
          shapeMoving = true;
          ee.emit(ET.SHAPE_CREATE);
        } else {
          ee.emit(ET.SHAPE_MOVE);
        }
      } else {
        speedIndex++;
      }
    }
  }

  function handleShapeSettled(et, { shape, position }) {
    shapeMoving = false;
    score += 1;
    let gameOver = false;
    shape.forEach(function(row, rowIndex) {
      row.forEach(function(item) {
        if (item) {
          if (rowIndex + position[1] <= 0) {
            gameOver = true;
          }
        }
      });
    });
    if (gameOver) {
      ee.emit(GS.GAME_OVER);
    }
    console.log('score', score);
  }
}

export default {
  init,
};
