/**
 * @since 20180109 21:11
 * @author vivaxy
 */

export default class Ball {
  constructor({ x, y, r, c, vx, vy }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.vx = vx;
    this.vy = vy;
  }

  render({ ctx }) {
    this.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  move({ delta }) {
    this.x += this.vx * delta;
    this.y += this.vy * delta;
  }
}
