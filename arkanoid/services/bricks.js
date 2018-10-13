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

  handleGameReset();

  ee.on(ET.TICK, handleTick);
  ee.on(ET.GAME_RESET, handleGameReset);

  function handleTick() {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.BRICKS });
  }

  function handleGameReset() {
    bricks = [];
    for (let i = 0; i < sizes.BRICK_ROW_COUNT; i++) {
      for (let j = 0; j < sizes.BRICK_COLUMN_COUNT; j++) {
        const brick = new Brick(
          sizes.BRICK_HORIZONTAL_BORDER + j * (sizes.BRICK_WIDTH + sizes.BRICK_HORIZONTAL_SPACING),
          sizes.BRICK_VERTICAL_BORDER + i * (sizes.BRICK_HEIGHT + sizes.BRICK_VERTICAL_SPACING),
          sizes.BRICK_WIDTH, sizes.BRICK_HEIGHT, 'rgba(150, 200, 200, 1)');
        bricks.push(brick);
      }
    }
  }

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
