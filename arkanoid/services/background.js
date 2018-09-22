/**
 * @since 2018-09-22 10:28:59
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';
import Background from '../class/background.js';

let background;

function init(ee, canvas) {
  background = new Background(0, 0, canvas.width, canvas.height, 'rgba(0,0,0,0.2)');

  ee.on(ET.TICK, function() {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.BACKGROUND });
  });

  function render(ctx) {
    background.render(ctx);
  }
}

export default { init };
