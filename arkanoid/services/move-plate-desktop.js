/**
 * @since 2018-10-13 20:05:29
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import plateService from './plate.js';

const KEY_DOWN = 'keydown';
const KEY_UP = 'keyup';

let moveDirection = 0;

function init(ee) {

  ee.on(ET.GAME_START, handleGameStart);
  ee.on(ET.GAME_OVER, handleGameOver);
  ee.on(ET.GAME_RESET, handleGameReset);

  function handleGameStart() {
    window.addEventListener(KEY_DOWN, handleKeyDown);
    window.addEventListener(KEY_UP, handleKeyUp);
    ee.on(ET.TICK, movePlate);
  }

  function handleGameOver() {
    window.removeEventListener(KEY_DOWN, handleKeyDown);
    window.removeEventListener(KEY_UP, handleKeyUp);
    ee.off(ET.TICK, movePlate);
  }

  function handleGameReset() {
    moveDirection = 0;
  }

  function movePlate(et, ed) {
    if (moveDirection !== 0) {
      const speed = plateService.getSpeed();
      plateService.movePlateX(speed * moveDirection * ed.delta);
    }
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowLeft': // <-
      case 'a': // a
      case ',': // ,
        handleActionKey(-1);
        break;
      case 'ArrowRight': // ->
      case 'd': // d
      case '.': // .
        handleActionKey(1);
        break;
      default:
        moveDirection = 0;
    }
  }

  function handleActionKey(direction) {
    moveDirection = direction;
  }

  function handleKeyUp() {
    // arrowKeys and a do not firing keypress ans keyup event???
    moveDirection = 0;
  }

}

export default { init };
