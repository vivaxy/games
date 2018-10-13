/**
 * @since 2018-10-06 08:47:38
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as sizes from '../enums/sizes.js';
import Plate from '../class/plate.js';
import * as RS from '../enums/render-sequence.js';

let plate = null;
let moveSpeed = sizes.PLATE_WIDTH / 10;
let moveDirection = 0;

function init(ee) {

  handleGameReset();

  ee.on(ET.TICK, renderPlate);
  ee.on(ET.GAME_START, handleGameStart);
  ee.on(ET.GAME_OVER, handleGameOver);
  ee.on(ET.GAME_RESET, handleGameReset);

  function renderPlate() {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.PLATE });
  }

  function movePlate() {
    tryMovePlate();
  }

  function handleGameStart() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    ee.on(ET.TICK, movePlate);
  }

  function handleGameOver() {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    ee.off(ET.TICK, movePlate);
  }

  function handleGameReset() {
    plate = new Plate(sizes.PLATE_X, sizes.PLATE_Y, sizes.PLATE_WIDTH, sizes.PLATE_HEIGHT, 'rgb(200,150,200)');
  }

  function render(ctx) {
    plate.render(ctx);
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

  function tryMovePlate() {
    if (moveDirection !== 0) {
      plate.x += moveSpeed * moveDirection;
      if (plate.x < 0) {
        plate.x = 0;
      }
      if (plate.x > sizes.CANVAS_WIDTH - sizes.PLATE_WIDTH) {
        plate.x = sizes.CANVAS_WIDTH - sizes.PLATE_WIDTH;
      }
    }
  }
}

function getPlate() {
  return plate;
}

export default { init, getPlate };
