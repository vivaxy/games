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
  const speed = 10;
  let speedIndex = 0;

  ee.on(ET.GAME_STATE_CHANGE, handleGameStateChange);
  ee.on(ET.TICK, handleTick);

  function handleGameStateChange(eventType, { gameState: _gameState }) {
    gameState = _gameState;
    if (gameState === GS.PLAYING) {
      ee.emit(ET.UPDATE_GRID, { grid });
    }
  }

  function handleTick() {
    if (gameState === GS.PLAYING) {
      if (!shapeMoving) {
        ee.emit(ET.INVOKE_A_SHAPE);
        shapeMoving = true;
      } else {
        speedIndex++;
        if (speedIndex > speed) {
          ee.emit(ET.MOVE_SHAPE);
          speedIndex = 0;
        }
      }
    }
  }
}

export default {
  init,
};
