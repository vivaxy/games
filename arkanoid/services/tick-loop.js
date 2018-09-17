/**
 * @since 2018-09-17 08:48:47
 * @author vivaxy
 */

import * as E from '../enums/event-types.js';

function init({ e }) {
  let prevTime = Date.now();

  function loop() {
    const now = Date.now();
    e.emit(E.TICK, { now, delta: now - prevTime });
    prevTime = now;
    requestAnimationFrame(loop);
  }

  loop();
}

export default { init };
