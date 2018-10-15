/**
 * @since 2018-10-13 20:11:41
 * @author vivaxy
 */

import * as ET from '../../enums/event-types.js';
import plateService from '../plate.js';
import canvasService from '../canvas.js';
import * as sizes from '../../enums/sizes.js';

const TOUCH_START = 'touchstart';
const TOUCH_MOVE = 'touchmove';
const TOUCH_END = 'touchend';

let targetX = null;

function init(ee) {

  ee.on(ET.GAME_START, handleGameStart);
  ee.on(ET.GAME_OVER, handleGameOver);

  function handleGameStart() {
    const canvas = canvasService.getCanvas();
    canvas.addEventListener(TOUCH_START, handleTouchStart);
    canvas.addEventListener(TOUCH_MOVE, handleTouchMove);
    canvas.addEventListener(TOUCH_END, handleTouchEnd);
    ee.on(ET.TICK, movePlate);
  }

  function handleGameOver() {
    const canvas = canvasService.getCanvas();
    canvas.removeEventListener(TOUCH_START, handleTouchStart);
    canvas.removeEventListener(TOUCH_MOVE, handleTouchMove);
    canvas.removeEventListener(TOUCH_END, handleTouchEnd);
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
    e.stopPropagation();
    e.preventDefault();
    targetX = getTargetX(e);
  }

  function handleTouchMove(e) {
    e.stopPropagation();
    e.preventDefault();
    targetX = getTargetX(e);
  }

  function handleTouchEnd(e) {
    e.stopPropagation();
    e.preventDefault();
    targetX = null;
  }

  function getTargetX(e) {
    const x = getX(e);
    const canvas = canvasService.getCanvas();
    // make user finger at the plate right most
    const plate = plateService.getPlate();
    return x * sizes.CANVAS_WIDTH / canvas.offsetWidth - plate.w;
  }

  function getX(e) {
    if (e.changedTouches) {
      const touch = e.changedTouches[0];
      return touch.clientX - touch.target.offsetLeft;
    }
    return e.clientX - e.target.offsetLeft;
  }

}

export default { init };
