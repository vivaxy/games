/**
 * @since 2018-09-17 08:40:44
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';

let canvas;
let w;
let h;
let ctx;

function init(ee) {
  canvas = document.querySelector('.js-canvas');
  resize();
  ctx = canvas.getContext('2d');

  ee.on(ET.TICK, function() {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.CANVAS });
  });

  function render() {
    ctx.clearRect(0, 0, w, h);
  }
}

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}

function getCtx() {
  return ctx;
}

function getCanvas() {
  return canvas;
}

export default { init, getCtx, getCanvas };
