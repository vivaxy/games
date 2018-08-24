/**
 * @since 20180824 13:50
 * @author vivaxy
 */

let canvas = null;
let ctx = null;

function init() {
  canvas = document.createElement('canvas');

  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;

  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
}

function getElement() {
  return canvas;
}

function getContext() {
  return ctx;
}

export default { init, getElement, getContext }
