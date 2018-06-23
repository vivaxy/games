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

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';

  canvas.addEventListener('click', handleCanvasClick);

  events.on(eventTypes.APPLY_CANVAS_DRAW, onCanvasDraw);

  function handleCanvasClick(e) {
    events.emit(eventTypes.ON_CANVAS_CLICK, getCoord(e));
  }

  function onCanvasDraw(eventId, eventData) {
    const matrix = eventData.matrix;
    const dimension = eventData.dimension;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    matrix.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value) {
          ctx.fillStyle = '#333';
          const { x, y } = mapMatrixToPixel({ colIndex, rowIndex, dimension });
          ctx.fillRect(x, y, dimension, dimension);
        }
      });
    });
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

}

export default { init };
