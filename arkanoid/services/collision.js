/**
 * @since 2018-09-22 11:11:00
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as sizes from '../enums/sizes.js';

function init(ee, balls, bricks) {

  ee.on(ET.TICK, function() {
    balls.forEach((ball) => {
      ballAndCanvas(ball);
      bricks.forEach((brick) => {
        ballAndBrick(ball, brick, bricks);
      });
    });
  });

}

function ballAndCanvas(ball) {
  if (ball.x > sizes.CANVAS_WIDTH - ball.r) {
    whenHitVerticalWall(ball);
    ball.x = sizes.CANVAS_WIDTH - ball.r;
  }

  if (ball.x < ball.r) {
    whenHitVerticalWall(ball);
    ball.x = ball.r;
  }

  if (ball.y > sizes.CANVAS_HEIGHT - ball.r) {
    whenHitHorizontalWall(ball);
    ball.y = sizes.CANVAS_HEIGHT - ball.r;
  }

  if (ball.y < ball.r) {
    whenHitHorizontalWall(ball);
    ball.y = ball.r;
  }
}

/**
 * 1---2---3
 * | ----- |
 * 4 | 9 | 5
 * | ----- |
 * 6---7---8
 *
 * @param ball
 * @param brick
 * @param bricks
 */
function ballAndBrick(ball, brick, bricks) {
  // 1
  if (ball.x <= brick.x && ball.y <= brick.y && getDistance(ball, brick) <= ball.r) {
    whenHitAngle(ball, { x: brick.x, y: brick.y });
    removeBrick(bricks, brick);
    return;
  }
  // 2
  if (ball.x >= brick.x && ball.x <= brick.x + brick.w && ball.y >= brick.y - ball.r && ball.y <= brick.y) {
    whenHitHorizontalWall(ball);
    removeBrick(bricks, brick);
    return;
  }
  // 3
  if (ball.x >= brick.x + brick.w && ball.y <= brick.y && getDistance(ball, {
    x: brick.x + brick.w,
    y: brick.y,
  }) <= ball.r) {
    whenHitAngle(ball, { x: brick.x + brick.w, y: brick.y });
    removeBrick(bricks, brick);
    return;
  }
  // 4
  if (ball.x >= brick.x - ball.r && ball.x <= brick.x && ball.y >= brick.y && ball.y <= brick.y + brick.h) {
    whenHitVerticalWall(ball);
    removeBrick(bricks, brick);
    return;
  }
  // 5
  if (ball.x >= brick.x + brick.w && ball.x <= brick.x + brick.w + ball.r && ball.y >= brick.y && ball.y <= brick.y + brick.h) {
    whenHitVerticalWall(ball);
    removeBrick(bricks, brick);
    return;
  }
  // 6
  if (ball.x <= brick.x && ball.y >= brick.y + brick.h && getDistance(ball, {
    x: brick.x,
    y: brick.y + brick.h,
  }) <= ball.r) {
    whenHitAngle(ball, { x: brick.x, y: brick.y + brick.h });
    removeBrick(bricks, brick);
    return;
  }
  // 7
  if (ball.x >= brick.x && ball.x <= brick.x + brick.w && ball.y >= brick.y + brick.h && ball.y <= brick.y + brick.h + ball.r) {
    whenHitHorizontalWall(ball);
    removeBrick(bricks, brick);
    return;
  }
  // 8
  if (ball.x >= brick.x + brick.w && ball.y >= brick.y + brick.h && getDistance(ball, {
    x: brick.x + brick.w,
    y: brick.y + brick.h,
  }) <= ball.r) {
    whenHitAngle(ball, { x: brick.x + brick.w, y: brick.y + brick.h });
    removeBrick(bricks, brick);
    return;
  }
  // 9
  if (ball.x >= brick.x && ball.x <= brick.x + brick.w && ball.y >= brick.y && ball.y < brick.y + brick.h) {
    if (brick.w > brick.h) {
      whenHitHorizontalWall(ball);
      removeBrick(bricks, brick);
      return;
    }
    whenHitVerticalWall(ball);
    removeBrick(bricks, brick);
  }
}

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function whenHitAngle(ball, point) {
  ball.a = Math.PI - ball.a + 2 * Math.atan2(ball.y - point.y, point.x - ball.x);
  ball.normalizeAngle();
}

function whenHitVerticalWall(ball) {
  ball.a = Math.PI - ball.a;
  ball.normalizeAngle();
}

function whenHitHorizontalWall(ball) {
  ball.a = -ball.a;
  ball.normalizeAngle();
}

function removeBrick(bricks, brick) {
  const index = bricks.indexOf(brick);
  bricks.splice(index, 1);
}

export default { init, ballAndBrick };
