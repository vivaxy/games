/**
 * @since 2018-09-17 08:40:44
 * @author vivaxy
 */

let canvas;
let w;
let h;
let ctx;

function init() {
  canvas = document.querySelector('.js-canvas');
  resize();
  ctx = canvas.getContext('2d');
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

function clear() {
  ctx.clearRect(0, 0, w, h);
}

function getDimension() {
  return { w, h };
}

export default { init, getCtx, getDimension, clear };
