/**
 * @since 2019-09-22 06:00
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';
import * as GS from '../enums/game-state.js';

function init(ee) {
  let gameState = GS.NEW_GAME;

  ee.on(ET.GAME_START, start);
  ee.on(ET.GAME_PAUSE, pause);
  ee.on(ET.GAME_RESUME, resume);
  ee.on(ET.GAME_OVER, over);
  ee.on(ET.GAME_RESET, reset);

  function start() {
    if (gameState === GS.NEW_GAME) {
      gameState === GS.PLAYING;
      ee.emit(ET.GAME_STATE_CHANGE, { gameState });
      return;
    }
    throw new Error('invalid game action');
  }

  function pause() {
    if (gameState === GS.PLAYING) {
      gameState = GS.PAUSE;
      ee.emit(ET.GAME_STATE_CHANGE, { gameState });
      return;
    }
    throw new Error('invalid game action');
  }

  function resume() {
    if (gameState === GS.PAUSE) {
      gameState = GS.PLAYING;
      ee.emit(ET.GAME_STATE_CHANGE, { gameState });
      return;
    }
    throw new Error('invalid game action');
  }

  function over() {
    if (gameState === GS.PLAYING) {
      gameState = GS.GAME_OVER;
      ee.emit(ET.GAME_STATE_CHANGE, { gameState });
      return;
    }
    throw new Error('invalid game action');
  }

  function reset() {
    if (gameState === GS.GAME_OVER) {
      gameState = GS.NEW_GAME;
      ee.emit(ET.GAME_STATE_CHANGE, { gameState });
      return;
    }
    throw new Error('invalid game action');
  }
}

export default { init };
