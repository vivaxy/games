/**
 * @since 2019-09-22 07:47
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';

function init(ee) {
  let grid = [];

  ee.on(ET.UPDATE_GRID, updateGrid);

  ee.emit(ET.RENDER_LAYERS_ADD, {
    layer: function(ctx, { width, height }) {
      ctx.strokeStyle = 'black';
      ctx.rect(0, 0, width, height);
    },
  });

  function updateGrid(et, { grid: _grid }) {
    grid = _grid;
  }
}

export default { init };
