/**
 * @since 2018-09-17 08:48:47
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';

function init(ee) {

  let prevTime = Date.now();
  loop();

  function loop() {
    const now = Date.now();
    ee.emit(ET.TICK, { now, delta: now - prevTime });
    prevTime = now;
    requestAnimationFrame(loop);
  }
}

export default { init };
