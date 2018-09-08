/**
 * @since 14/11/30 下午7:49
 * @author vivaxy
 */

export default class Block {
  constructor(size, row, col, color, x, y, type) {
    this.size = size;
    this.row = row;
    this.col = col;
    this.color = color;
    this.type = type;
    this.x = x || 0;
    this.y = y || 0;
  }
}
