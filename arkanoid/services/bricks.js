/**
 * @since 2018-09-22 10:48:49
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';
import * as sizes from '../enums/sizes.js';
import Brick from '../class/brick.js';

let bricks = [];

function init(ee) {

  const rowCount = 10;
  const colCount = 7;

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      const brick = new Brick(
        sizes.BRICK_HORIZONTAL_BORDER + j * (sizes.BRICK_WIDTH + sizes.BRICK_HORIZONTAL_SPACING),
        sizes.BRICK_VERTICAL_BORDER + i * (sizes.BRICK_HEIGHT + sizes.BRICK_VERTICAL_SPACING),
        sizes.BRICK_WIDTH, sizes.BRICK_HEIGHT, 'rgba(100, 255, 255, 1)');
      bricks.push(brick);
    }
  }

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