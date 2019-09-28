/**
 * @since 2019-09-25 08:10
 * @author vivaxy
 */
import * as sizes from '../helpers/sizes.js';

const LOCAL_SRORAGE_KEY_HIGH_SCORE = 'tetris-high-score';

export default class Score {
  constructor() {
    this.value = 0;
    this.highScore =
      Number(localStorage.getItem(LOCAL_SRORAGE_KEY_HIGH_SCORE)) || 0;
  }

  reset() {
    this.value = 0;
  }

  add(value) {
    this.value += value;
    if (this.value > this.highScore) {
      localStorage.setItem(LOCAL_SRORAGE_KEY_HIGH_SCORE, this.value);
      this.highScore = this.value;
    }
  }

  get() {
    return this.value;
  }

  render(ctx, canvas, speed) {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#333';
    ctx.font = sizes.gridBorderWidth + 'px monospace';
    ctx.fillText(
      `High Score: ${this.highScore} Score: ${this.value} Speed: ${speed}`,
      canvas.width / 2,
      canvas.height - sizes.sizeRatio,
    );
  }
}
