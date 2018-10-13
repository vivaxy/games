/**
 * @since 2018-10-13 20:11:41
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import plateService from './plate.js';
import * as sizes from '../enums/sizes.js';

const TOUCH_START = 'touchstart';
const TOUCH_MOVE = 'touchmove';
const TOUCH_END = 'touchend';

let targetX = null;

function init(ee) {

  ee.on(ET.GAME_START, handleGameStart);
  ee.on(ET.GAME_OVER, handleGameOver);

  function handleGameStart() {
    window.addEventListener(TOUCH_START, handleTouchStart);
    window.addEventListener(TOUCH_MOVE, handleTouchMove);
    window.addEventListener(TOUCH_END, handleTouchEnd);
    ee.on(ET.TICK, movePlate);
  }

  function handleGameOver() {
    window.removeEventListener(TOUCH_START, handleTouchStart);
    window.removeEventListener(TOUCH_MOVE, handleTouchMove);
    window.removeEventListener(TOUCH_END, handleTouchEnd);
    ee.off(ET.TICK, movePlate);
  }

  function movePlate(et, ed) {
    if (targetX !== null) {
      const speed = plateService.getSpeed();
      const plate = plateService.getPlate();
      const targetDiff = targetX - plate.x;
      const direction = targetDiff > 0 ? 1 : -1;
      const absDiff = speed * ed.delta;
      const diff = direction * Math.min(absDiff, targetDiff * direction);
      plateService.movePlateX(diff);
    }
  }

  function handleTouchStart(e) {
    targetX = getTargetX(e);
  }

  function handleTouchMove(e) {
    targetX = getTargetX(e);
  }

  function handleTouchEnd() {
    targetX = null;
  }

  function getTargetX(e) {
    const x = getX(e);
    return x * window.devicePixelRatio - sizes.PLATE_WIDTH / 2;
  }

  function getX(e) {
    if (e.changedTouches) {
      return e.changedTouches[0].clientX;
    }
    return e.clientX;
  }

}

export default { init };
