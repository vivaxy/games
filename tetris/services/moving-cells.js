/**
 * @since 2019-09-22 11:06
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';

function init(ee) {
  let grid = null;
  let shape = null;
  let shapePosition = [0, 0];

  ee.on(ET.INVOKE_A_SHAPE, invokeAShape);
  ee.on(ET.UPDATE_GRID, handleGridUpdate);
  ee.on(ET.MOVE_SHAPE, handleMoveShape);

  function invokeAShape() {
    shape = [[1]];
    shapePosition[0] = Math.floor(
      Math.random() * (grid[0].length - shape[0].length)
    );
    addShapeToGrid();
    ee.emit(ET.UPDATE_GRID, { grid });
  }

  function handleMoveShape(et, { direction: { x = 0, y = 1 } = {} } = {}) {
    removeShapeFromGrid();
    shapePosition[0] += x;
    shapePosition[1] += y;
    addShapeToGrid();
    ee.emit(ET.UPDATE_GRID, { grid });
  }

  function addShapeToGrid() {
    shape.forEach(function(row, rowIndex) {
      row.forEach(function(item, colIndex) {
        const gridRowIndex = rowIndex + shapePosition[1];
        const gridColIndex = colIndex + shapePosition[0];
        if (grid[gridRowIndex][gridColIndex]) {
          throw new Error('Unexpected cell');
        }
        grid[gridRowIndex][gridColIndex] = 1;
      });
    });
  }

  function removeShapeFromGrid() {
    shape.forEach(function(row, rowIndex) {
      row.forEach(function(item, colIndex) {
        const gridRowIndex = rowIndex + shapePosition[1];
        const gridColIndex = colIndex + shapePosition[0];
        if (!grid[gridRowIndex][gridColIndex]) {
          throw new Error('Unexpected cell');
        }
        grid[gridRowIndex][gridColIndex] = 0;
      });
    });
  }

  function handleGridUpdate(et, { grid: _grid }) {
    grid = _grid;
  }
}

export default { init };
