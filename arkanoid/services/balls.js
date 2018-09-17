/**
 * @since 2018-09-17 08:48:01
 * @author vivaxy
 */

import * as E from '../enums/event-types.js';
import Ball from '../class/ball.js';

let balls = [];

function init({ e, ctx }) {
  balls.push(new Ball({}));

  e.on(E.TICK, handleTick);

  function handleTick(et, { delta }) {
    balls.forEach((ball) => {
      ball.move({ delta });
      ball.render({ ctx });
    });
  }
}

export default { init };
