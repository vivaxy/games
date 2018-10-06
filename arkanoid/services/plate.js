/**
 * @since 2018-10-06 08:47:38
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as sizes from '../enums/sizes.js';
import Plate from '../class/plate.js';
import * as RS from '../enums/render-sequence.js';

let plate = null;

function init(ee) {
  plate = new Plate(sizes.PLATE_X, sizes.PLATE_Y, sizes.PLATE_WIDTH, sizes.PLATE_HEIGHT, 'rgb(200,150,200)');

  ee.on(ET.TICK, () => {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.PLATE });
  });

  function render(ctx) {
    plate.render(ctx);
  }
}

export default { init };
