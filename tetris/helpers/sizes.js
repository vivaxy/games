/**
 * @since 2019-09-22 07:54
 * @author vivaxy
 */
function getCellSize() {
  const expectWidth = 1;
  const expectHeight = 2;
  const actual = (window.innerHeight / window.innerWidth) > (expectHeight / expectWidth) ? window.innerWidth * (expectHeight / expectWidth) : window.innerHeight;

}

const cellSize = 0;

