/**
 * @since 2018-09-17 08:48:01
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';
import * as sizes from '../enums/sizes.js';
import Ball from '../class/ball.js';

let balls = [];

function init(ee, canvas) {

  ee.on(ET.TICK, renderBall);
  ee.on(ET.GAME_START, handleStartGame);
  ee.on(ET.GAME_OVER, handleGameOver);
  ee.on(ET.GAME_RESET, handleGameReset);

  handleGameReset();

  function renderBall() {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.BALLS });
  }

  function moveBall(et, { delta }) {
    move(delta);
  }

  function handleStartGame() {
    ee.on(ET.TICK, moveBall);
  }

  function handleGameOver() {
    ee.off(ET.TICK, moveBall);
  }

  function handleGameReset() {
    balls = [new Ball(
      sizes.PLATE_X + sizes.PLATE_WIDTH / 2,
      sizes.PLATE_Y - sizes.BALL_RADIUS,
      sizes.BALL_RADIUS,
      'rgba(150, 200, 200, 1)',
      0.5,
      -Math.PI / 4,
    )];
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

function removeBall(ball) {
  const index = balls.indexOf(ball);
  if (index !== -1) {
    balls.splice(index, 1);
  }
}

function addBall(ball) {
  balls.push(ball);
}

export default { init, getBalls, addBall, removeBall };
