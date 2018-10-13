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
  plate = new Plate(sizes.PLATE_X, sizes.PLATE_Y, sizes.PLATE_WIDTH, sizes.PLATE_HEIGHT, 'rgb(200,150,200)');

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  ee.on(ET.TICK, () => {
    tryMovePlate();
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.PLATE });
  });

  function render(ctx) {
    plate.render(ctx);
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowLeft': // <-
      case 'a': // a
      case ',': // ,
        moveDirection = -1;
        break;
      case 'ArrowRight': // ->
      case 'd': // d
      case '.': // .
        moveDirection = 1;
        break;
      default:
        moveDirection = 0;
    }
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
