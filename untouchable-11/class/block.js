/**
 * @since 2021-12-11
 * @author vivaxy
 */
import { div } from '../utils/html.js';

export default class Block {
  constructor(structure, color, index) {
    this.structure = structure;
    this.color = color;
    this.index = index;
    this.$element = this.render();
  }

  render() {
    const $block = div('block');
    $block.dataset.index = this.index;
    $block.style.top = 0;
    $block.style.left = 0;
    for (const row of this.structure) {
      const $row = div('block-row');
      for (const cell of row) {
        const $cell = div('block-cell');
        $cell.dataset.value = cell;
        if (cell) {
          $cell.style.background = this.color;
        }
        $row.appendChild($cell);
      }
      $block.appendChild($row);
    }

    return $block;
  }

  getPosition() {
    return {
      x: this.$element.offsetLeft,
      y: this.$element.offsetTop,
    };
  }

  setPosition(position) {
    this.$element.style.top = position.y + 'px';
    this.$element.style.left = position.x + 'px';
  }
}
