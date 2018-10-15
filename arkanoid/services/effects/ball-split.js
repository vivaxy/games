/**
 * @since 2018-10-13 20:54:40
 * @author vivaxy
 */

import * as ET from '../../enums/event-types.js';
import * as effectTypes from '../../enums/effect-types.js';
import ballsService from '../../services/balls.js';
import Ball from '../../class/ball.js';

function init(ee) {
  ee.on(ET.HIT_A_BRICK, handleHitABrick);

  function handleHitABrick(et, ed) {
    if (ed.brick && ed.brick.effects && ed.brick.effects.includes(effectTypes.BALL_SPLIT) && ed.brick.thickness === 0) {
      const COUNT = 1;
      for (let i = 0; i < COUNT; i++) {
        ballsService.addBall(new Ball(
          ed.ball.x,
          ed.ball.y,
          ed.ball.r,
          ed.ball.c,
          ed.ball.v,
          ed.ball.a + Math.PI * 2 / (COUNT + 1) * (i + 1),
        ));
      }
    }
  }
}

export default { init };
