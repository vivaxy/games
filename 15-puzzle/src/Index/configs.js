// canvas
export const canvasWidth = 900;
export const canvasHeight = 1600;

// grid
export const gridSize = 720;
export const gridBorderWidth = 5;
export const gridX = (canvasWidth - gridSize - gridBorderWidth * 2) / 2;
export const gridY = 200;
export const gridBorderColor = 'rgb(0, 255, 0)';

// tile
export const tileSpacing = 5;
export const tileBorderWidth = 5;
export const getTileSize = ({ size }) => {
    return (gridSize - tileSpacing * (size + 1) - gridBorderWidth * 2) / size - tileBorderWidth * 2;
};
export const tileBorderColor = 'rgb(255, 0, 0)';
export const getTilePosition = ({ tileWidth, tileHeight, rowIndex, colIndex }) => {
    const eachTileWidth = tileWidth + tileBorderWidth * 2;
    const eachTileHeight = tileHeight + tileBorderWidth * 2;
    const x = gridX + (colIndex + 1) * tileSpacing + tileBorderWidth + eachTileWidth * colIndex + gridBorderWidth;
    const y = gridY + (rowIndex + 1) * tileSpacing + tileBorderWidth + eachTileHeight * rowIndex + gridBorderWidth;
    return { x, y }
};

export const tileTypes = {
    SPACE: 0,
    NORMAL: 1,
};
