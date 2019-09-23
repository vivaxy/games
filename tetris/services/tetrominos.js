/**
 * @since 2019-09-22 11:06
 * @author vivaxy
 */
import tetrominos from '../helpers/tetrominos.js';
import * as ET from '../enums/event-types.js';
import { getNextColor } from '../helpers/colors.js';

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

  function createTetromino() {
    const color = getNextColor();
    const randomTetrominoIndex = Math.floor(tetrominos.length * Math.random());
    tetromino = tetrominos[randomTetrominoIndex].map(function(row) {
      return row.map(function(item) {
        if (item) {
          return {
            color,
          };
        }
        return null;
      });
    });
    position = [
      Math.floor(Math.random() * (grid[0].length - tetromino[0].length + 1)),
      1 - tetromino.length,
    ];
    addTetromino();
  }

  function moveTetromino(et, { direction: { x = 0, y = 1 } = {} } = {}) {
    removeTetrominoFromGrid();
    position[0] += x;
    position[1] += y;
    addTetromino();
  }

  function addTetromino() {
    const isSettled = addTetrominoToGrid();
    ee.emit(ET.UPDATE_GRID, { grid });
    if (isSettled) {
      ee.emit(ET.TETROMINO_SETTLED, { tetromino, position });
      tetromino = null;
    }
  }

  function addTetrominoToGrid() {
    let isSettled = false;
    tetromino.forEach(function(row, rowIndex) {
      row.forEach(function(item, colIndex) {
        const gridRowIndex = rowIndex + position[1];
        const gridColIndex = colIndex + position[0];
        if (gridRowIndex < 0) {
          return;
        }
        if (item) {
          if (grid[gridRowIndex][gridColIndex]) {
            throw new Error('Unexpected cell');
          }
          grid[gridRowIndex][gridColIndex] = item;

          if (gridRowIndex + 1 >= grid.length) {
            isSettled = true;
            return;
          }
          const nextRow = grid[gridRowIndex + 1][gridColIndex];
          if (nextRow) {
            isSettled = true;
          }
        }
      });
    });
    return isSettled;
  }

  function removeTetrominoFromGrid() {
    tetromino.forEach(function(row, rowIndex) {
      row.forEach(function(item, colIndex) {
        const gridRowIndex = rowIndex + position[1];
        const gridColIndex = colIndex + position[0];
        if (gridRowIndex < 0) {
          return;
        }
        if (item) {
          if (!grid[gridRowIndex][gridColIndex]) {
            throw new Error('Unexpected cell');
          }
          grid[gridRowIndex][gridColIndex] = null;
        }
      });
    });
  }

  function handleGridUpdate(et, { grid: _grid }) {
    grid = _grid;
  }

  function moveTetrominoLeft() {
    if (!tetromino) {
      return;
    }
    removeTetrominoFromGrid();
    position[0] -= 1;
    if (position[0] < 0) {
      position[0] = 0;
    }
    addTetromino();
  }

  function moveTetrominoRight() {
    if (!tetromino) {
      return;
    }
    removeTetrominoFromGrid();
    position[0] += 1;
    if (position[0] > grid[0].length - tetromino[0].length) {
      position[0] = grid[0].length - tetromino[0].length;
    }
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
    addTetromino();
  }
}

export default { init };
