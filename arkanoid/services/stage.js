/**
 * @since 2018-09-22 10:28:59
 * @author vivaxy
 */

import * as ET from '../enums/event-types.js';
import * as RS from '../enums/render-sequence.js';
import * as sizes from '../enums/sizes.js';
import Stage from '../class/stage.js';

let stage;

function init(ee) {
  stage = new Stage(0, 0, sizes.STAGE_WIDTH, sizes.STAGE_HEIGHT, 'rgba(0,0,0,0.2)');

  ee.on(ET.TICK, function() {
    ee.emit(ET.APPLY_RENDER, { render, sequence: RS.BACKGROUND });
  });

  function render(ctx) {
    stage.render(ctx);
  }
}

export default { init };
