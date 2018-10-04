/**
 * @since 2018-09-17 08:40:44
 * @author vivaxy
 */

import Canvas from '../../_framework/class/canvas.js';
import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';

let canvas;

function init(ee) {
  const el = document.querySelector('.js-canvas');
  canvas = new Canvas({ el });
  canvas.fillWindow();

  ee.on(ET.TICK, function() {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.CANVAS });
  });

  function render() {
    canvas.clearAll();
  }
}

function getCanvas() {
  return canvas;
}

export default { init, getCanvas };
