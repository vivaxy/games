/**
 * @since 2019-09-22 07:54
 * @author vivaxy
 */
function getSizeRatio() {
  const expectWidth = 110;
  const expectHeight = 210;
  const actualHeight = (window.innerHeight / window.innerWidth) > (expectHeight / expectWidth) ? window.innerWidth * (expectHeight / expectWidth) : window.innerHeight;
  return actualHeight / expectHeight * window.devicePixelRatio;
}

export const sizeRatio = getSizeRatio();
export const cellSize = 10 * sizeRatio;
export const gridBorderWidth = 5 * sizeRatio;
