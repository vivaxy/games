/**
 * @since 20180109 21:11
 * @author vivaxy
 */

export default class Ball {
  constructor(x, y, r, c, v, a) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.v = v;
    this.a = a;
  }

  render(ctx) {
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  move(delta) {
    this.x += this.v * Math.cos(this.a) * delta;
    this.y -= this.v * Math.sin(this.a) * delta;
  }

}
