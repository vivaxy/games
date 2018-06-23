/**
 * @since 2018-06-23 10:32:45
 * @author vivaxy
 */

export const mapPixelToMatrix = ({ x, y, dimension }) => {
  const colIndex = Math.floor(x / dimension);
  const rowIndex = Math.floor(y / dimension);
  return { colIndex, rowIndex };
};

export const mapMatrixToPixel = ({ colIndex, rowIndex, dimension }) => {
  const x = colIndex * dimension;
  const y = rowIndex * dimension;
  return { x, y };
};
