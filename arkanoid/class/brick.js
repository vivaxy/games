/**
 * @since 20180109 21:08
 * @author vivaxy
 */

import * as effectTypes from '../enums/effect-types.js';

// 0 ~ 100
const thicknessL = [80, 60, 40];
// 0 ~ 360
const effectH = {
  NONE: 0,
  [effectTypes.PLATE_EXTEND]: 120,
  [effectTypes.BALL_SPLIT]: 240,
};

export default class Brick {
  constructor(x, y, w, h, thickness = 1, effects = []) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this._thickness = thickness;
    this.effects = effects;
    this.c = getColor(this._thickness, this.effects);
  }

  get thickness() {
    return this._thickness;
  }

  set thickness(v) {
    if (v > thicknessL.length) {
      v = thicknessL.length;
    }
    this.c = getColor(v, this.effects);
    this._thickness = v;
  }

  render(ctx) {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

function getColor(thickness, effects) {
  return `hsla(${effectH[effects[0] || 'NONE']}, 40%, ${thicknessL[thickness - 1]}%, 1)`
}
