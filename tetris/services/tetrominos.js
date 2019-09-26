/**
 * @since 2019-09-22 11:06
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';

function init(ee) {
  let grid = null;
  let tetromino = null;
  let position = [0, 0];

  ee.on(ET.TETROMINO_CREATE, createTetromino);
  ee.on(ET.UPDATE_GRID, handleGridUpdate);
  ee.on(ET.TETROMINO_MOVE, moveTetromino);
  ee.on(ET.TETROMINO_LEFT, moveTetrominoLeft);
  ee.on(ET.TETROMINO_RIGHT, moveTetrominoRight);
  ee.on(ET.TETROMINO_ROTATE, rotateTetromino);

  function addTetromino() {
    const isSettled = addTetrominoToGrid();
    ee.emit(ET.UPDATE_GRID, { grid });
    if (isSettled) {
      ee.emit(ET.TETROMINO_SETTLED, { tetromino, position });
      tetromino = null;
    }
  }

  function removeTetrominoFromGrid() {

  }

  function handleGridUpdate(et, { grid: _grid }) {
    grid = _grid;
  }

  function fitLeft() {
    if (position[0] < 0) {
      return false;
    }
    let fit = true;
    tetromino.forEach(function(row, rowIndex) {
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        if (row[colIndex]) {
          if (
            // tetromino may get position like [-1, 0]
            grid[rowIndex + position[1]] &&
            grid[rowIndex + position[1]][colIndex + position[0]]
          ) {
            fit = false;
          }
          break;
        }
      }
    });
    return fit;
  }

  function fitRight() {
    if (position[0] > grid[0].length - tetromino[0].length) {
      return false;
    }
    let fit = true;
    tetromino.forEach(function(row, rowIndex) {
      for (let colIndex = row.length - 1; colIndex >= 0; colIndex--) {
        if (row[colIndex]) {
          if (
            // tetromino may get position like [-1, 0]
            grid[rowIndex + position[1]] &&
            grid[rowIndex + position[1]][colIndex + position[0]]
          ) {
            fit = false;
          }
          break;
        }
      }
    });
    return fit;
  }

  function makeLeftFit() {
    while (!fitLeft()) {
      position[0] += 1;
    }
  }

  function makeRightFit() {
    while (!fitRight()) {
      position[0] -= 1;
    }
  }

  function moveTetrominoLeft() {
    if (!tetromino) {
      return;
    }
    removeTetrominoFromGrid();
    position[0] -= 1;
    makeLeftFit();
    addTetromino();
  }

  function moveTetrominoRight() {
    if (!tetromino) {
      return;
    }
    removeTetrominoFromGrid();
    position[0] += 1;
    makeRightFit();
    addTetromino();
  }

  function rotateTetromino() {
    if (!tetromino) {
      return;
    }
    removeTetrominoFromGrid();
    const t = [];
    for (let i = tetromino[0].length - 1; i >= 0; i--) {
      const row = [];
      for (let j = 0; j < tetromino.length; j++) {
        row.push(tetromino[j][i]);
      }
      t.push(row);
    }
    tetromino = t;
    makeLeftFit();
    makeRightFit();
    addTetromino();
  }
}

export default { init };
