/**
 * @since 2018-09-17 08:48:47
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';

function init(e) {

  let prevTime;
  setTimeout(() => {
    prevTime = Date.now();
    loop();
  }, 1000);

  function loop() {
    const now = Date.now();
    e.emit(ET.TICK, { now, delta: now - prevTime });
    prevTime = now;
    requestAnimationFrame(loop);
  }
}

export default { init };
