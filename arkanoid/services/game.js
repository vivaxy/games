/**
 * @since 2018-10-13 19:14:16
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';

const KEY_DOWN = 'keydown';
const CLICK = 'click';
const TOUCH_START = 'touchstart';
let listenerAdded = false;

function init(ee) {

  addListeners();
  ee.on(ET.GAME_OVER, handleGameOver);

  function handleInput() {
    ee.emit(ET.GAME_START);
    removeListeners();
  }

  function handleGameOver() {
    alert('Game Over');
    ee.emit(ET.GAME_RESET);
    addListeners();
  }

  function addListeners() {
    if (!listenerAdded) {
      window.addEventListener(KEY_DOWN, handleInput);
      window.addEventListener(CLICK, handleInput);
      window.addEventListener(TOUCH_START, handleInput);
      listenerAdded = true;
    }
  }

  function removeListeners() {
    window.removeEventListener(KEY_DOWN, handleInput);
    window.removeEventListener(CLICK, handleInput);
    window.removeEventListener(TOUCH_START, handleInput);
    listenerAdded = false;
  }
}

export default { init };
