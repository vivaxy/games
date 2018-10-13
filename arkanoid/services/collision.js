/**
 * @since 2018-09-22 11:11:00
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as sizes from '../enums/sizes.js';
import ballsService from './balls.js';
import bricksService from './bricks.js';
import plateService from './plate.js';

function init(ee) {

  ee.on(ET.GAME_START, handleGameStart);
  ee.on(ET.GAME_OVER, handleGameOver);

  function handleTick() {
    const balls = ballsService.getBalls();
    const bricks = bricksService.getBricks();
    const plate = plateService.getPlate();
    balls.forEach((ball) => {
      ballAndCanvas(ee, ball);
      bricks.forEach((brick) => {
        ballAndBrick(ball, brick, bricks, ee);
      });
      ballAndPlate(ee, ball, plate);
    });
  }

  function handleGameStart() {
    ee.on(ET.TICK, handleTick);
  }

  function handleGameOver() {
    ee.off(ET.TICK, handleTick);
  }

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
    ballsService.removeBall(ball);
    if (ballsService.getBalls().length === 0) {
      ee.emit(ET.GAME_OVER);
    }
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
 * @param ball
 *  - x
 *  - y
 *  - r
 *  - a
 * @param rect
 *  - x
 *  - y
 * @return
 *  - a: new angle
 *  - x
 *  - y
 */
function ballHitRect(ball, rect) {
  // 1
  if (ball.x <= rect.x && ball.y <= rect.y && getDistance(ball, rect) <= ball.r) {
    return { a: whenHitAngle(ball, { x: rect.x, y: rect.y }), x: ball.x, y: ball.y };
  }
  // 2
  if (ball.x >= rect.x && ball.x <= rect.x + rect.w && ball.y >= rect.y - ball.r && ball.y <= rect.y) {
    return { a: whenHitHorizontalWall(ball), x: ball.x, y: rect.y - ball.r };
  }
  // 3
  if (ball.x >= rect.x + rect.w && ball.y <= rect.y && getDistance(ball, {
    x: rect.x + rect.w,
    y: rect.y,
  }) <= ball.r) {
    return { a: whenHitAngle(ball, { x: rect.x + rect.w, y: rect.y }), x: ball.x, y: ball.y };
  }
  // 4
  if (ball.x >= rect.x - ball.r && ball.x <= rect.x && ball.y >= rect.y && ball.y <= rect.y + rect.h) {
    return { a: whenHitVerticalWall(ball), x: rect.x - ball.r, y: ball.y };
  }
  // 5
  if (ball.x >= rect.x + rect.w && ball.x <= rect.x + rect.w + ball.r && ball.y >= rect.y && ball.y <= rect.y + rect.h) {
    return { a: whenHitVerticalWall(ball), x: rect.x + rect.w + ball.r, y: ball.y };
  }
  // 6
  if (ball.x <= rect.x && ball.y >= rect.y + rect.h && getDistance(ball, {
    x: rect.x,
    y: rect.y + rect.h,
  }) <= ball.r) {
    return { a: whenHitAngle(ball, { x: rect.x, y: rect.y + rect.h }), x: ball.x, y: ball.y };
  }
  // 7
  if (ball.x >= rect.x && ball.x <= rect.x + rect.w && ball.y >= rect.y + rect.h && ball.y <= rect.y + rect.h + ball.r) {
    return { a: whenHitHorizontalWall(ball), x: ball.x, y: rect.y + rect.h + ball.r };
  }
  // 8
  if (ball.x >= rect.x + rect.w && ball.y >= rect.y + rect.h && getDistance(ball, {
    x: rect.x + rect.w,
    y: rect.y + rect.h,
  }) <= ball.r) {
    return { a: whenHitAngle(ball, { x: rect.x + rect.w, y: rect.y + rect.h }), x: ball.x, y: ball.y };
  }
  // 9
  if (ball.x >= rect.x && ball.x <= rect.x + rect.w && ball.y >= rect.y && ball.y < rect.y + rect.h) {
    if (rect.w > rect.h) {
      /**
       * -------------
       * |\1   3   2/|
       * |-----------|
       * |/4   6   5\|
       * -------------
       */
      if (ball.y < rect.y + rect.h / 2) {
        // 1, 2, 3
        if (ball.x - rect.x < ball.y - rect.y) {
          // 1
          return { a: whenHitVerticalWall(ball), x: rect.x - ball.r, y: ball.y };
        }
        if (rect.x + rect.w - ball.x < ball.y - rect.y) {
          // 2
          return { a: whenHitVerticalWall(ball), x: rect.x + rect.w + ball.r, y: ball.y };
        }
        // 3
        return { a: whenHitHorizontalWall(ball), x: ball.x, y: rect.y - ball.r };
      }
      // 4, 5, 6
      if (ball.x - rect.x < rect.y + rect.h - ball.y) {
        // 4
        return { a: whenHitVerticalWall(ball), x: rect.x - ball.r, y: ball.y };
      }
      if (rect.x + rect.w - ball.x < rect.y + rect.h - ball.y) {
        // 5
        return { a: whenHitVerticalWall(ball), x: rect.x + rect.w + ball.r, y: ball.y };
      }
      // 6
      return { a: whenHitHorizontalWall(ball), x: ball.x, y: rect.y + rect.h + ball.r };
    }
    /**
     * ---------
     * |\ 1|4 /|
     * | \ | / |
     * |  \|/  |
     * |   |   |
     * | 3 | 6 |
     * |   |   |
     * |  /|\  |
     * | / | \ |
     * |/ 2|5 \|
     * ---------
     */
    if (ball.x < rect.x + rect.w / 2) {
      // 1, 2, 3
      if (ball.x - rect.x > ball.y - rect.y) {
        // 1
        return { a: whenHitHorizontalWall(ball), x: ball.x, y: rect.y - ball.r };
      }
      if (ball.x - rect.x > rect.y + rect.h - ball.y) {
        // 2
        return { a: whenHitHorizontalWall(ball), x: ball.x, y: rect.y + rect.h + ball.r };
      }
      // 3
      return { a: whenHitVerticalWall(ball), x: rect.x - ball.r, y: ball.y };
    }
    // 4, 5, 6
    if (rect.x + rect.w - ball.x > ball.y - rect.y) {
      // 4
      return { a: whenHitHorizontalWall(ball), x: ball.x, y: rect.y - ball.r };
    }
    if (rect.x + rect.w - ball.x > rect.y + rect.h - ball.y) {
      // 5
      return { a: whenHitHorizontalWall(ball), x: ball.x, y: rect.y + rect.h + ball.r };
    }
    // 6
    return { a: whenHitVerticalWall(ball), x: rect.x + rect.w + ball.r, y: ball.y };
  }
  return { a: ball.a, x: ball.x, y: ball.y };
}

function ballAndBrick(ball, brick, bricks, ee) {
  const { a, x, y } = ballHitRect(ball, brick);
  if (a !== ball.a) {
    // hit
    brick.thickness--;
    if (bricks && brick.thickness === 0) {
      removeBrick(bricks, brick);
    }
    if (ee) {
      ee.emit(ET.HIT_A_BRICK, { brick, ball });
    }
    ball.a = a;
    ball.x = x;
    ball.y = y;
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
  const { a, x, y } = ballHitRect(ball, plate);
  if (a !== ball.a) {
    // hit
    ball.a = a;
    ball.x = x;
    ball.y = y;
  }
}

export default { init, ballAndBrick };
