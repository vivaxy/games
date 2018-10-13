/**
 * @since 2018-06-23 08:42:09
 * @author vivaxy
 */

import * as eventTypes from '../enums/event-types.js';
import { mapMatrixToPixel } from '../helpers/matrix-pixel.js';

function init(events) {

  const dpr = window.devicePixelRatio;
  const canvas = document.querySelector('.js-canvas');
  const ctx = canvas.getContext('2d');
  initCanvasSize();

  canvas.addEventListener('click', handleCanvasClick);
  window.addEventListener('resize', handleWindowResize);

  events.on(eventTypes.APPLY_CANVAS_DRAW, onCanvasDraw);

  function handleCanvasClick(e) {
    events.emit(eventTypes.ON_CANVAS_CLICK, getCoord(e));
  }

  function onCanvasDraw(eventId, eventData) {
    const matrix = eventData.matrix;
    const dimension = eventData.dimension;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    matrix.forEach((row, rowIndex) => {
      // horizontal line
      const { x: x1, y: y1 } = mapMatrixToPixel({ colIndex: 0, rowIndex: rowIndex + 1, dimension });
      const { x: x2, y: y2 } = mapMatrixToPixel({ colIndex: row.length - 1, rowIndex: rowIndex + 1, dimension });
      strokeLine(x1, y1, x2, y2);

      row.forEach((value, colIndex) => {

        // vertical line
        if (rowIndex === 0) {
          const { x: x1, y: y1 } = mapMatrixToPixel({ colIndex, rowIndex, dimension });
          const { x: x2, y: y2 } = mapMatrixToPixel({ colIndex, rowIndex: matrix.length - 1, dimension });
          strokeLine(x1, y1, x2, y2);
        }

        if (value) {
          ctx.fillStyle = '#333';
          const { x, y } = mapMatrixToPixel({ colIndex, rowIndex, dimension });
          ctx.fillRect(x, y, dimension, dimension);
        }
      });
    });
  }

  function strokeLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
  }

  function getCoord(e) {
    let x = null;
    let y = null;
    if (e.changedTouches) {
      x = e.changedTouches[0].clientX;
      y = e.changedTouches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    return { x: x * dpr, y: y * dpr };
  }

  function handleWindowResize() {
    initCanvasSize();
  }

  function initCanvasSize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

}

export default { init };
