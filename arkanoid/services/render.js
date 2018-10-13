/**
 * @since 2018-09-22 10:25:26
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import canvasService from './canvas.js';

let renders = [];

function init(ee) {
  ee.on(ET.APPLY_RENDER, save);

  ee.on(ET.TICK, render);

  function save(et, render) {
    renders.push(render);
  }

  function render() {
    const ctx = canvasService.getCtx();
    renders.sort(({ sequence: prev }, { sequence: next }) => {
      return prev - next;
    });
    while (renders.length) {
      const render = renders.shift();
      render.render(ctx);
    }
  }
}

export default { init };
