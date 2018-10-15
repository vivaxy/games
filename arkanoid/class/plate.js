/**
 * @since 20180109 21:11
 * @author vivaxy
 */

import * as sizes from '../enums/sizes.js';

export default class Plate {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  render(ctx) {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  normalizePosition() {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > sizes.CANVAS_WIDTH - this.w) {
      this.x = sizes.CANVAS_WIDTH - this.w;
    }
  }

}
