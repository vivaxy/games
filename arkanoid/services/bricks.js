/**
 * @since 2018-09-22 10:48:49
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';
import Brick from '../class/brick.js';

let bricks = [];

function init(ee, canvas) {

  const brickWidth = 50;
  const brickHeight = 10;
  const brickSpacing = canvas.width;
  const brickStarting = 6;
  const rowCount = 10;
  const colCount = 7;

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      bricks.push(new Brick(brickStarting + j * (brickWidth + brickSpacing), brickStarting + i * (brickHeight + brickSpacing), brickWidth, brickHeight, 'rgba(100, 255, 255, 1)'));
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
