/**
 * @since 20180109 21:08
 * @author vivaxy
 */

export default class Brick {
  constructor({ x, y, w, h, c }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  render({ ctx }) {
    this.fillStyle = this.c;
    ctx.fillRect(x, y, w, h);
  }
}