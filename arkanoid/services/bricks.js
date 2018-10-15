/**
 * @since 2018-09-22 10:48:49
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';
import * as sizes from '../enums/sizes.js';
import * as effectTypes from '../enums/effect-types.js';
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
        const opt = getBrickOptions(i, j);
        const brick = new Brick(opt.x, opt.y, opt.w, opt.h, opt.thickness, opt.effects);
        bricks.push(brick);
      }
    }
  }

  function render(ctx) {
    bricks.forEach((brick) => {
      brick.render(ctx);
    });
  }

  function getBrickOptions(rowIndex, colIndex) {
    const effects = getRandomEffects();

    return {
      x: sizes.BRICK_HORIZONTAL_BORDER + colIndex * (sizes.BRICK_WIDTH + sizes.BRICK_HORIZONTAL_SPACING),
      y: sizes.BRICK_VERTICAL_BORDER + rowIndex * (sizes.BRICK_HEIGHT + sizes.BRICK_VERTICAL_SPACING),
      w: sizes.BRICK_WIDTH,
      h: sizes.BRICK_HEIGHT,
      thickness: effects.length + 1,
      effects,
    };
  }

  function getRandomEffects() {
    const rand = Math.random();
    if (rand < 0.1) {
      return [];
    }
    if (rand - 0.1 < 0.45) {
      return [effectTypes.BALL_SPLIT];
    }
    return [effectTypes.PLATE_EXTEND];
  }

}

function getBricks() {
  return bricks;
}

export default { init, getBricks };
