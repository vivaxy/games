/**
 * @since 2018-06-23 09:20:03
 * @author vivaxy
 */

import * as eventTypes from '../enums/event-types.js';

function init(events) {

  let tickId = 0;
  let prevTime = Date.now();

  loop();

  function loop() {
    const now = Date.now();
    const deltaTime = now - prevTime;
    events.emit(eventTypes.TICK, { now, deltaTime, tickId });
    tickId++;
    prevTime = now;
    setTimeout(loop, 0);
  }
}

export default { init };
