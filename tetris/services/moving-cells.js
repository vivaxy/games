/**
 * @since 2019-09-22 11:06
 * @author vivaxy
 */
import shapes from '../helpers/shapes.js';
import * as ET from '../enums/event-types.js';

function init(ee) {
  let grid = null;
  let shape = null;
  let shapePosition = [0, 0];

  ee.on(ET.SHAPE_CREATE, invokeAShape);
  ee.on(ET.UPDATE_GRID, handleGridUpdate);
  ee.on(ET.SHAPE_MOVE, handleMoveShape);

  function invokeAShape() {
    const randomShapeIndex = Math.floor(shapes.length * Math.random());
    shape = shapes[randomShapeIndex];
    shapePosition = [
      Math.floor(
        Math.random() * (grid[0].length - shape[0].length + 1)
      ),
      1 - shape.length
    ]
    addShape();
  }

  function handleMoveShape(et, { direction: { x = 0, y = 1 } = {} } = {}) {
    removeShapeFromGrid();
    shapePosition[0] += x;
    shapePosition[1] += y;
    addShape();
  }

  function addShape() {
    const isSettled = addShapeToGrid();
    ee.emit(ET.UPDATE_GRID, { grid });
    if (isSettled) {
      ee.emit(ET.SHAPE_SETTLED, { shape, position: shapePosition });
      shape = null;
    }
  }

  function addShapeToGrid() {
    let isSettled = false;
    shape.forEach(function(row, rowIndex) {
      row.forEach(function(item, colIndex) {
        const gridRowIndex = rowIndex + shapePosition[1];
        const gridColIndex = colIndex + shapePosition[0];
        if (gridRowIndex < 0) {
          return;
        }
        if (item) {
          if (grid[gridRowIndex][gridColIndex]) {
            throw new Error('Unexpected cell');
          }
          grid[gridRowIndex][gridColIndex] = 1;

          if (gridRowIndex + 1 >= grid.length) {
            isSettled = true;
            return;
          }
          const nextRow = grid[gridRowIndex + 1][gridColIndex];
          if (nextRow === 1) {
            isSettled = true;
          }
        }
      });
    });
    return isSettled;
  }

  function removeShapeFromGrid() {
    shape.forEach(function(row, rowIndex) {
      row.forEach(function(item, colIndex) {
        const gridRowIndex = rowIndex + shapePosition[1];
        const gridColIndex = colIndex + shapePosition[0];
        if (gridRowIndex < 0) {
          return;
        }
        if (item) {
          if (!grid[gridRowIndex][gridColIndex]) {
            throw new Error('Unexpected cell');
          }
          grid[gridRowIndex][gridColIndex] = 0;
        }
      });
    });
  }

  function handleGridUpdate(et, { grid: _grid }) {
    grid = _grid;
  }
}

export default { init };
