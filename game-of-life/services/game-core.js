/**
 * @since 2018-06-23 09:43:09
 * @author vivaxy
 */

import * as eventTypes from '../enums/event-types.js';
import { mapPixelToMatrix } from '../helpers/matrix-pixel.js';

function init(events) {

  let matrix = null;
  let dimension = null;
  let speed = null;
  let rowCount = null;
  let colCount = null;
  let prevDrawTime = null;
  let pattern = null;
  let playing = false;
  const dpr = window.devicePixelRatio;

  events.on(eventTypes.TICK, onTick);
  events.on(eventTypes.APPLY_DIMENSION, onDimensionChange);
  events.on(eventTypes.APPLY_SPEED, onSpeedChange);
  events.on(eventTypes.APPLY_GAME_STATUS, onGameStatusChange);
  events.on(eventTypes.APPLY_PATTERN, onPatternChange);
  events.on(eventTypes.ON_CANVAS_CLICK, onCanvasClick);

  function onTick(eventId, eventData) {
    if (playing) {
      if (eventData.now - prevDrawTime > 1 / speed) {
        // draw
        prevDrawTime = eventData.now;
        evolve();
        events.emit(eventTypes.APPLY_CANVAS_DRAW, { matrix, dimension });
      }
    }
  }

  function onDimensionChange(eventId, eventData) {
    dimension = eventData.dimension;
    const newRowCount = Math.ceil(window.innerHeight * dpr / dimension);
    const newColCount = Math.ceil(window.innerWidth * dpr / dimension);

    if (!matrix) {
      rowCount = newRowCount;
      colCount = newColCount;
      matrix = Array.from({ length: rowCount }, () => {
        return Array.from({ length: colCount }, () => {
          return false;
        });
      });
    } else if (newRowCount >= rowCount) {
      // map matrix
      const topPad = Math.floor((newRowCount - rowCount) / 2);
      const bottomPad = newRowCount - rowCount - topPad;
      for (let i = 0; i < topPad; i++) {
        matrix.unshift(Array.from({ length: colCount }, () => {
          return false;
        }));
      }
      for (let i = 0; i < bottomPad; i++) {
        matrix.push(Array.from({ length: colCount }, () => {
          return false;
        }));
      }

      const leftPad = Math.floor((newColCount - colCount) / 2);
      const rightPad = newColCount - colCount - leftPad;
      matrix.forEach((row) => {
        for (let i = 0; i < leftPad; i++) {
          row.unshift(false);
        }
        for (let i = 0; i < rightPad; i++) {
          row.push(false);
        }
      });

      rowCount = newRowCount;
      colCount = newColCount;
    } else {
      const topCut = Math.floor((rowCount - newRowCount) / 2);
      const bottomCut = rowCount - newRowCount - topCut;

      for (let i = 0; i < topCut; i++) {
        matrix.shift();
      }
      for (let i = 0; i < bottomCut; i++) {
        matrix.pop();
      }

      const leftCut = Math.floor((colCount - newColCount) / 2);
      const rightCut = colCount - newColCount - leftCut;
      matrix.forEach((row) => {
        for (let i = 0; i < leftCut; i++) {
          row.shift();
        }
        for (let i = 0; i < rightCut; i++) {
          row.pop();
        }
      });

      rowCount = newRowCount;
      colCount = newColCount;
    }
    events.emit(eventTypes.APPLY_CANVAS_DRAW, { matrix, dimension });
  }

  function onSpeedChange(eventId, eventData) {
    speed = eventData.speed;
  }

  function onGameStatusChange(eventId, eventData) {
    playing = eventData.playing;
  }

  function onCanvasClick(eventId, eventData) {
    const { colIndex, rowIndex } = mapPixelToMatrix({ x: eventData.x, y: eventData.y, dimension });
    addPatternToMatrix({ colIndex, rowIndex });
    events.emit(eventTypes.APPLY_CANVAS_DRAW, { matrix, dimension });
  }

  function evolve() {
    /**
     * core evolve algorithm
     *  1. live cell
     *    1.1 liveNeighbors < 2                         : die
     *    1.2 liveNeighbors == 2 || liveNeighbors == 3  : live
     *    1.2 liveNeighbors > 3                         : die
     *  2. dead cell
     *    2.1 liveNeighbors == 3                        : live
     */
    matrix = matrix.map((row, rowIndex) => {
      return row.map((live, colIndex) => {
        const liveNeighbors = getLiveNeighbors({ rowIndex, colIndex });
        if (live) {
          if (liveNeighbors < 2) {
            return false;
          } else if (liveNeighbors > 3) {
            return false;
          }
        } else {
          if (liveNeighbors === 3) {
            return true;
          }
        }
        return live;
      });
    });
  }

  function getLiveNeighbors({ rowIndex, colIndex }) {
    let liveNeighbors = 0;
    [
      { rowDiff: -1, colDiff: -1 },
      { rowDiff: -1, colDiff: 0 },
      { rowDiff: -1, colDiff: 1 },
      { rowDiff: 0, colDiff: -1 },
      { rowDiff: 0, colDiff: 1 },
      { rowDiff: 1, colDiff: -1 },
      { rowDiff: 1, colDiff: 0 },
      { rowDiff: 1, colDiff: 1 },
    ].forEach(({ colDiff, rowDiff }) => {
      if (matrix[rowIndex + rowDiff] && matrix[rowIndex + rowDiff][colIndex + colDiff]) {
        liveNeighbors++;
      }
    });
    return liveNeighbors;
  }

  function onPatternChange(eventId, eventData) {
    pattern = eventData.pattern;
  }

  function addPatternToMatrix({ colIndex, rowIndex }) {
    pattern.forEach((row, pRowIndex) => {
      row.forEach((value, pColIndex) => {
        if (value) {
          matrix[rowIndex + pRowIndex][colIndex + pColIndex] = !matrix[rowIndex + pRowIndex][colIndex + pColIndex];
        }
        // else stay put
      });
    });
  }

}

export default { init };
