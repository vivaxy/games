/**
 * @since 2018-09-22 11:11:00
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as sizes from '../enums/sizes.js';

function init(ee, balls, bricks, plate) {

  ee.on(ET.TICK, function() {
    balls.forEach((ball) => {
      ballAndCanvas(ee, ball);
      bricks.forEach((brick) => {
        ballAndBrick(ball, brick, bricks);
      });
      ballAndPlate(ee, ball, plate);
    });
  });

}

function ballAndCanvas(ee, ball) {
  if (ball.x > sizes.CANVAS_WIDTH - ball.r) {
    ball.a = whenHitVerticalWall(ball);
    ball.x = sizes.CANVAS_WIDTH - ball.r;
    return;
  }

  if (ball.x < ball.r) {
    ball.a = whenHitVerticalWall(ball);
    ball.x = ball.r;
    return;
  }

  if (ball.y > sizes.CANVAS_HEIGHT + ball.r) {
    // whenHitHorizontalWall(ball);
    // ball.y = sizes.CANVAS_HEIGHT - ball.r;
    ee.emit(ET.GAME_OVER);
    return;
  }

  if (ball.y < ball.r) {
    ball.a = whenHitHorizontalWall(ball);
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
 * @param arc
 *  - x
 *  - y
 *  - r
 *  - a
 * @param rect
 *  - x
 *  - y
 * @return a: new angle
 */
function arcHitRect(arc, rect) {
  // 1
  if (arc.x <= rect.x && arc.y <= rect.y && getDistance(arc, rect) <= arc.r) {
    return whenHitAngle(arc, { x: rect.x, y: rect.y });
  }
  // 2
  if (arc.x >= rect.x && arc.x <= rect.x + rect.w && arc.y >= rect.y - arc.r && arc.y <= rect.y) {
    return whenHitHorizontalWall(arc);
  }
  // 3
  if (arc.x >= rect.x + rect.w && arc.y <= rect.y && getDistance(arc, {
    x: rect.x + rect.w,
    y: rect.y,
  }) <= arc.r) {
    return whenHitAngle(arc, { x: rect.x + rect.w, y: rect.y });
  }
  // 4
  if (arc.x >= rect.x - arc.r && arc.x <= rect.x && arc.y >= rect.y && arc.y <= rect.y + rect.h) {
    return whenHitVerticalWall(arc);
  }
  // 5
  if (arc.x >= rect.x + rect.w && arc.x <= rect.x + rect.w + arc.r && arc.y >= rect.y && arc.y <= rect.y + rect.h) {
    return whenHitVerticalWall(arc);
  }
  // 6
  if (arc.x <= rect.x && arc.y >= rect.y + rect.h && getDistance(arc, {
    x: rect.x,
    y: rect.y + rect.h,
  }) <= arc.r) {
    return whenHitAngle(arc, { x: rect.x, y: rect.y + rect.h });
  }
  // 7
  if (arc.x >= rect.x && arc.x <= rect.x + rect.w && arc.y >= rect.y + rect.h && arc.y <= rect.y + rect.h + arc.r) {
    return whenHitHorizontalWall(arc);
  }
  // 8
  if (arc.x >= rect.x + rect.w && arc.y >= rect.y + rect.h && getDistance(arc, {
    x: rect.x + rect.w,
    y: rect.y + rect.h,
  }) <= arc.r) {
    return whenHitAngle(arc, { x: rect.x + rect.w, y: rect.y + rect.h });
  }
  // 9
  if (arc.x >= rect.x && arc.x <= rect.x + rect.w && arc.y >= rect.y && arc.y < rect.y + rect.h) {
    if (rect.w > rect.h) {
      return whenHitHorizontalWall(arc);
    }
    return whenHitVerticalWall(arc);
  }
  return arc.a;
}

function ballAndBrick(ball, brick, bricks) {
  const newA = arcHitRect(ball, brick);
  if (newA !== ball.a) {
    // hit
    removeBrick(bricks, brick);
    ball.a = newA;
  }
}

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function whenHitAngle(ball, point) {
  const a = Math.PI - ball.a + 2 * Math.atan2(ball.y - point.y, point.x - ball.x);
  return normalizeAngle(a);
}

function whenHitVerticalWall(ball) {
  const a = Math.PI - ball.a;
  return normalizeAngle(a);
}

function whenHitHorizontalWall(ball) {
  const a = -ball.a;
  return normalizeAngle(a);
}

function normalizeAngle(a) {
  if (a > Math.PI) {
    return a - Math.PI * 2;
  }
  if (a < -Math.PI) {
    return a + Math.PI * 2;
  }
  return a;
}

function removeBrick(bricks, brick) {
  const index = bricks.indexOf(brick);
  bricks.splice(index, 1);
}

function ballAndPlate(ee, ball, plate) {
  const newA = arcHitRect(ball, plate);
  if (newA !== ball.a) {
    // hit
    ball.a = newA;
  }
}

export default { init, ballAndBrick };
