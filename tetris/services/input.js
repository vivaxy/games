/**
 * @since 2019-09-23 09:55
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';

function init(ee) {
  window.addEventListener('keydown', handleKeyDown);

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
