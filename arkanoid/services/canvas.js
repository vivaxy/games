/**
 * @since 2018-09-17 08:40:44
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';
import * as sizes from '../enums/sizes.js';

let canvas;
let ctx;

function init(ee) {
  canvas = document.querySelector('.js-canvas');
  ctx = canvas.getContext('2d');

  canvas.width = sizes.CANVAS_WIDTH;
  canvas.height = sizes.CANVAS_HEIGHT;

  ee.on(ET.TICK, function() {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.CANVAS });
  });

  function render() {
    ctx.clearRect(0, 0, sizes.CANVAS_WIDTH, sizes.CANVAS_HEIGHT);
  }
}

function getCtx() {
  return ctx;
}

function getCanvas() {
  return canvas;
}

export default { init, getCtx, getCanvas };
