/**
 * @since 2018-09-22 10:28:49
 * @author vivaxy
 * Fix w/h ratio
 * Fix size
 */

export default class GameContainer {
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
}
