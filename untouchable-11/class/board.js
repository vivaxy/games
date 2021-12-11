/**
 * @since 2021-12-11
 * @author vivaxy
 */
import { div } from '../utils/html.js';

export default class Board {
  constructor({ colCount, rowCount }) {
    this.colCount = colCount;
    this.rowCount = rowCount;

    this.cells = Array.from({ length: rowCount }, function() {
      return Array.from({ length: colCount }, function() {
        return 0;
      });
    });
    this.$element = this.render();
  }

  render() {
    const $board = div('board');
    for (const row of this.cells) {
      const $row = div('board-row');
      for (const cell of row) {
        const $cell = div('board-cell');
        $row.appendChild($cell);
      }
      $board.appendChild($row);
    }
    return $board;
  }
}
