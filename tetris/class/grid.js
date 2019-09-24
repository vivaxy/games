/**
 * @since 2019-09-24 11:34
 * @author vivaxy
 */
export default class Grid {
  constructor({ rowCount = 20, colCount = 10 } = {}) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.data = Array.from({ length: rowCount }, function() {
      return Array.from({ length: colCount }, function() {
        return null;
      });
    });
  }
}
