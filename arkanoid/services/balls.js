/**
 * @since 2018-09-17 08:48:01
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';
import * as sizes from '../enums/sizes.js';
import Ball from '../class/ball.js';

let balls = [];
let gameStarted = false;

function init(ee, canvas) {
  balls.push(new Ball(
    sizes.PLATE_X + sizes.PLATE_WIDTH / 2 - sizes.BALL_RADIUS,
    sizes.PLATE_Y - sizes.BALL_RADIUS,
    sizes.BALL_RADIUS,
    'rgba(200, 200, 150, 1)',
    0.5,
    -Math.PI / 4,
  ));

  ee.on(ET.TICK, handleTick);
  ee.on(ET.START_GAME, handleStartGame);
  ee.on(ET.GAME_OVER, handleGameOver);

  function handleTick(et, { delta }) {
    if (gameStarted) {
      move(delta);
    }
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.BALLS });
  }

  function handleStartGame() {
    gameStarted = true;
  }

  function handleGameOver() {
    gameStarted = false;
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
