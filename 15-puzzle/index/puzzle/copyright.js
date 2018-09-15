/**
 * @since 20180124 16:56
 * @author vivaxy
 */

import {
  copyrightFontColor,
  copyrightFontSize,
  copyrightHeight,
  copyrightLeft,
  copyrightTop,
  copyrightWidth,
} from '../configs.js';

export default class Copyright {
  constructor({ ctx }) {
    this.ctx = ctx;
    this.text = '© Copyright by vivaxy';
  }

  hit({ x, y }) {
    return x > copyrightLeft && x < copyrightLeft + copyrightWidth && y > copyrightTop && y < copyrightTop + copyrightHeight;
  }

  render() {
    const { ctx, text } = this;
    ctx.font = copyrightFontSize + 'px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = copyrightFontColor;
    ctx.fillText(text, copyrightLeft + copyrightWidth / 2, copyrightTop + copyrightHeight / 2);
  }
}
