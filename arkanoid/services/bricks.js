/**
 * @since 2018-09-22 10:48:49
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';
import Brick from '../class/brick.js';

let bricks = [];

function init(ee) {
  bricks.push(new Brick(100, 100, 50, 10, 'rgba(100, 255, 255, 1)'));

  ee.on(ET.TICK, function() {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.BRICKS });
  });

  function render(ctx) {
    bricks.forEach((brick) => {
      brick.render(ctx);
    });
  }

}

function getBricks() {
  return bricks;
}

export default { init, getBricks };
