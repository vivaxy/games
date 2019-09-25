/**
 * @since 2019-09-24 11:34
 * @author vivaxy
 */
export default class Grid {
  constructor({ rowCount = 20, colCount = 10 } = {}) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.reset();
  }

  get() {
    return this.value;
  }

  reset() {
    this.value = Array.from({ length: this.rowCount }, () => {
      return Array.from({ length: this.colCount }, function() {
        return null;
      });
    });
    this.eliminatingRows = [];
  }

  getEliminatingRows() {
    return this.eliminatingRows;
  }
}
