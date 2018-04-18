/**
 * @since 20180417 17:19
 * @author vivaxy
 */

import events from './events.js';

const body = document.body;
const devicePixel = window.devicePixelRatio;
const canvas = document.createElement('canvas');

const handleCanvasClick = (e) => {
  events.emit('canvas-click', e);
};

let dispose = null;

export default () => {
  if (dispose) {
    dispose();
  }

  canvas.width = window.innerWidth * devicePixel;
  canvas.height = window.innerHeight * devicePixel;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';

  canvas.addEventListener('click', handleCanvasClick);
  body.appendChild(canvas);
  dispose = () => {
    canvas.removeEventListener('click', handleCanvasClick);
    body.removeChild(canvas);
  };
  return dispose;
};
