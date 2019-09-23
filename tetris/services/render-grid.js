/**
 * @since 2019-09-22 07:47
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';
import * as sizes from '../helpers/sizes.js';

function init(ee) {
  let grid = null;
  ee.on(ET.UPDATE_GRID, updateGrid);

  ee.emit(ET.RENDER_LAYERS_ADD, {
    layers: [
      function(ctx, { width, height }) {
        if (!grid) {
          return;
        }
        ctx.beginPath();
        ctx.strokeStyle = '#efefef';
        ctx.lineWidth = sizes.gridBorderWidth;
        const gridWidth = sizes.cellSize * grid[0].length;
        const gridHeight = sizes.cellSize * grid.length;
        const marginHorizontal = (width - gridWidth) / 2;
        const marginVertical = (height - gridHeight) / 2;
        ctx.rect(
          marginHorizontal - sizes.gridBorderWidth / 2,
          marginVertical - sizes.gridBorderWidth / 2,
          gridWidth + sizes.gridBorderWidth,
          gridHeight + sizes.gridBorderWidth
        );
        ctx.stroke();
        ctx.closePath();
      },
    ],
  });

  function updateGrid(et, { grid: _grid }) {
    grid = _grid;
  }
}

export default { init };
