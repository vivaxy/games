/**
 * @since 2018-10-13 19:14:16
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';

function init(ee) {

  let listenerAdded = true;

  window.addEventListener('keydown', handleKeyDown);
  ee.on(ET.GAME_OVER, handleGameOver);

  function handleKeyDown() {
    ee.emit(ET.GAME_START);
    window.removeEventListener('keydown', handleKeyDown);
    listenerAdded = false;
  }

  function handleGameOver() {
    alert('Game Over');
    ee.emit(ET.GAME_RESET);
    if (!listenerAdded) {
      window.addEventListener('keydown', handleKeyDown);
      listenerAdded = true;
    }
  }
}

export default { init };
