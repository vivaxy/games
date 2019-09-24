/**
 * @since 2019-09-23 09:55
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';

function init(ee) {
  const canvas = document.querySelector('canvas');
  canvas.addEventListener('touchstart', handleTouchStart);
  canvas.addEventListener('touchmove', handleTouchMove);
  canvas.addEventListener('touchend', handleTouchEnd);
  canvas.addEventListener('touchcancel', handleTouchEnd);
  window.addEventListener('keydown', handleKeyDown);

  let touchStartPosition = null;
  let lastTouchMovePosition = null;
  function handleTouchStart(e) {
    const coord = getCoords(e);
    touchStartPosition = [coord.x, coord.y];
  }

  function handleTouchMove(e) {
    const coord = getCoords(e);
    lastTouchMovePosition = [coord.x, coord.y];
    e.preventDefault();
    e.stopPropagation();
  }

  function handleTouchEnd() {
    if (!lastTouchMovePosition) {
      return;
    }
    const deltaX = lastTouchMovePosition[0] - touchStartPosition[0];
    const deltaY = lastTouchMovePosition[1] - touchStartPosition[1];
    if (
      Math.abs(deltaX) > 10 ||
      Math.abs(deltaY) > 10
    ) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          ee.emit(ET.TETROMINO_RIGHT);
        } else {
          ee.emit(ET.TETROMINO_LEFT);
        }
      } else {
        if (deltaY > 0) {
          ee.emit(ET.TETROMINO_DOWN);
        } else {
          ee.emit(ET.TETROMINO_ROTATE);
        }
      }
    }
    touchStartPosition = null;
    lastTouchMovePosition = null;
  }

  function getCoords(e) {
    if (e.changedTouches) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function handleKeyDown(e) {
    switch (e.keyCode) {
      case 37: // left
        ee.emit(ET.TETROMINO_LEFT);
        break;
      case 39: // right
        ee.emit(ET.TETROMINO_RIGHT);
        break;
      case 38: // up
        ee.emit(ET.TETROMINO_ROTATE);
        break;
      case 40: // down
        ee.emit(ET.TETROMINO_DOWN);
        break;
    }
  }
}

export default { init };
