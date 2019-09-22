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

  ee.on(ET.GAME_STATE_CHANGE, handleGameStateChange);
  ee.on(ET.TICK, handleTick);

  function handleGameStateChange(eventType, { gameState: _gameState }) {
    gameState = _gameState;
  }

  function handleTick() {
    if (gameState === GS.PLAYING) {
      ee.emit(ET.UPDATE_GRID, { grid });
    }
  }
}

export default {
  init,
};
