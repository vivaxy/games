/**
 * @since 2018-10-06 08:47:38
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as sizes from '../enums/sizes.js';
import Plate from '../class/plate.js';
import * as RS from '../enums/render-sequence.js';

let plate = null;
const speed = sizes.PLATE_WIDTH / 100;

function init(ee) {

  handleGameReset();

  ee.on(ET.TICK, renderPlate);
  ee.on(ET.GAME_RESET, handleGameReset);

  function renderPlate() {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.PLATE });
  }

  function handleGameReset() {
    plate = new Plate(sizes.PLATE_X, sizes.PLATE_Y, sizes.PLATE_WIDTH, sizes.PLATE_HEIGHT, 'rgb(200,150,200)');
  }

  function render(ctx) {
    plate.render(ctx);
  }

}

function getPlate() {
  return plate;
}

function getSpeed() {
  return speed;
}

function movePlateX(xDiff) {
  plate.x += xDiff;
  plate.normalizePosition();
}

export default { init, getPlate, getSpeed, movePlateX };
