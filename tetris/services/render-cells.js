/**
 * @since 2019-09-22 10:53
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
        const gridWidth = sizes.cellSize * grid[0].length;
        const gridHeight = sizes.cellSize * grid.length;
        const marginHorizontal = (width - gridWidth) / 2;
        const marginVertical = (height - gridHeight) / 2;

        grid.forEach(function(row, rowIndex) {
          row.forEach(function(item, colIndex) {
            if (item) {
              ctx.beginPath();
              ctx.strokeStyle = 'grey';
              ctx.rect(
                marginHorizontal + colIndex * sizes.cellSize,
                marginVertical + rowIndex * sizes.cellSize,
                sizes.cellSize,
                sizes.cellSize
              );
              ctx.fill();
              ctx.closePath();
            }
          });
        });
      },
    ],
  });

  function updateGrid(et, { grid: _grid }) {
    grid = _grid;
  }
}

export default { init };
