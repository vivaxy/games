/**
 * @since 2018-09-17 08:48:01
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';
import Ball from '../class/ball.js';

let balls = [];

function init(ee, canvas) {
  balls.push(new Ball(0, 0, 10, 'rgba(255, 255, 100, 1)', 0.1, 0.1));

  ee.on(ET.TICK, handleTick);

  function handleTick(et, { delta }) {
    move(delta);
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.BALLS });
  }

  function render(ctx) {
    balls.forEach((ball) => {
      ball.render(ctx);
    });
  }

  function move(delta) {
    balls.forEach((ball) => {
      ball.move(delta, canvas);
    });
  }

}

function getBalls() {
  return balls;
}

export default { init, getBalls };
