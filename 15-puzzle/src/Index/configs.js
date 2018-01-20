// canvas
export const canvasWidth = 900;
export const canvasHeight = 1600;

export const size = 4;

// grid
export const gridSize = 720;
export const gridBorderWidth = 5;
export const gridX = (canvasWidth - gridSize - gridBorderWidth * 2) / 2;
export const gridY = 200;
export const gridBorderColor = 'rgb(0, 255, 0)';

// tile
export const tileSpacing = 5;
export const tileBorderWidth = 5;
export const tileSize = (gridSize - tileSpacing * (size + 1) - gridBorderWidth * 2) / size - tileBorderWidth * 2;
export const tileBorderColor = 'rgb(255, 0, 0)';
export const getTilePosition = ({ rowIndex, colIndex }) => {
    const eachTileWidth = tileSize + tileBorderWidth * 2;
    const eachTileHeight = tileSize + tileBorderWidth * 2;
    const x = gridX + (colIndex + 1) * tileSpacing + tileBorderWidth + eachTileWidth * colIndex + gridBorderWidth;
    const y = gridY + (rowIndex + 1) * tileSpacing + tileBorderWidth + eachTileHeight * rowIndex + gridBorderWidth;
    return { x, y }
};

export const tileTypes = {
    SPACE: 0,
    NORMAL: 1,
};

export const movementThreshold = window.innerWidth / canvasWidth * (tileSize + tileSpacing);

export const directions = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
};

export const events = {
    MOVE: 'MOVE',
};
