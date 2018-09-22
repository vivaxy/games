/**
 * @since 2018-09-22 11:11:00
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';

function init(ee, balls, canvas, bricks) {

  ee.on(ET.TICK, function() {
    balls.forEach((ball) => {
      ballAndCanvas(ball, canvas);
      bricks.forEach((brick) => {
        ballAndBrick(ball, brick);
      });
    });
  });

  function ballAndCanvas(ball, canvas) {
    if (ball.x > canvas.width - ball.r) {
      ball.vx = -ball.vx;
      ball.x = canvas.width - ball.r;
    }

    if (ball.x < ball.r) {
      ball.vx = -ball.vx;
      ball.x = ball.r;
    }

    if (ball.y > canvas.height - ball.r) {
      ball.y = canvas.height - ball.r;
      ball.vy = -ball.vy;
    }

    if (ball.y < ball.r) {
      ball.vy = -ball.vy;
      ball.y = ball.r;
    }
  }

  function ballAndBrick(ball, brick) {
    // todo
  }

  function ballAndPlate(ball, plate) {
    // todo
  }

  function hitRect(ball, rect) {
    // todo
  }

}

export default { init };
