/**
 * @since 20180109 21:08
 * @author vivaxy
 */

const brickColors = [
  'rgba(240, 190, 190, 1)',
  'rgba(200, 150, 150, 1)',
];

export default class Brick {
  constructor(x, y, w, h, thickness = 1, effects = []) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this._thickness = thickness;
    this.c = brickColors[thickness - 1];
    this.effects = effects;
  }

  get thickness() {
    return this._thickness;
  }

  set thickness(v) {
    this.c = brickColors[v - 1];
    this._thickness = v;
  }

  render(ctx) {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
