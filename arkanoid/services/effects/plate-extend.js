/**
 * @since 2018-10-15 16:06:46
 * @author vivaxy
 */

import plateService from '../plate.js';
import * as ET from '../../enums/event-types.js';
import * as sizes from '../../enums/sizes.js';
import * as effectTypes from '../../enums/effect-types.js';
import createBezierEasing from '../../../_framework/utils/bezier-easing.js';

const extendDuration = 5000;
const extendAnimationDuration = 300;
const extendX = 100;
const bezier = createBezierEasing(0, 0.5, 0.5, 1);

function init(ee) {

  let extendEndTime = null;

  ee.on(ET.HIT_A_BRICK, handleHitABrick);

  function handleHitABrick(et, ed) {
    if (ed.brick && ed.brick.effects && ed.brick.effects.includes(effectTypes.PLATE_EXTEND) && ed.brick.thickness === 0) {

      if (!extendEndTime) {
        extendPlate();
        ee.on(ET.TICK, extendBrickCountdown);
      }

      extendEndTime = Date.now() + extendDuration;
    }
  }

  function extendBrickCountdown(et, ed) {
    if (extendEndTime && extendEndTime < ed.now) {
      extendEndTime = null;
      ee.off(ET.TICK, extendBrickCountdown);
      unextendPlate();
    }
  }

  function extendPlate() {
    ee.on(ET.TICK, handleTick);
    let startTime = Date.now();

    function handleTick(et, ed) {
      const targetW = sizes.PLATE_WIDTH + bezier((ed.now - startTime) / extendAnimationDuration) * extendX;
      const plate = plateService.getPlate();
      const diffW = targetW - plate.w;
      plate.w += diffW;
      plate.x += diffW / 2;
      if (plate.w >= extendX + sizes.PLATE_WIDTH || ed.now - startTime >= extendAnimationDuration) {
        plate.w = extendX + sizes.PLATE_WIDTH;
        ee.off(ET.TICK, handleTick);
      }
    }
  }

  function unextendPlate() {
    ee.on(ET.TICK, handleTick);
    let startTime = Date.now();

    function handleTick(et, ed) {
      const targetW = sizes.PLATE_WIDTH + extendX - bezier((ed.now - startTime) / extendAnimationDuration) * extendX;
      const plate = plateService.getPlate();
      const diffW = targetW - plate.w;
      plate.w += diffW;
      plate.x += diffW / 2;
      if (plate.w <= sizes.PLATE_WIDTH || ed.now - startTime >= extendAnimationDuration) {
        plate.w = sizes.PLATE_WIDTH;
        ee.off(ET.TICK, handleTick);
      }
    }
  }
}

export default { init };
