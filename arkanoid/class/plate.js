/**
 * @since 20180109 21:11
 * @author vivaxy
 */

export default class Plate {
  constructor({ x, y, w, h, c }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  render({ ctx }) {
    ctx.fillStyle = this.c;
    ctx.fillRect(x, y, w, h);
  }

}
