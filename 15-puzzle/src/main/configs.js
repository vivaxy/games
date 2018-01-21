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
export const tileSpacing = 10;
export const tileBorderWidth = 5;
export const tileSize = (gridSize - tileSpacing * (size + 1) - gridBorderWidth * 2) / size; // border 在内
export const tileBorderColor = 'rgb(255, 0, 0)';
export const getTilePosition = ({ rowIndex, colIndex }) => {
    const x = gridX + (colIndex + 1) * tileSpacing + tileSize * colIndex + gridBorderWidth;
    const y = gridY + (rowIndex + 1) * tileSpacing + tileSize * rowIndex + gridBorderWidth;
    return { x, y }
};

export const tileTypes = {
    SPACE: 'SPACE',
    NORMAL: 'NORMAL',
};

export const movementThreshold = window.innerWidth / canvasWidth * (tileSize + tileSpacing + tileBorderWidth * 2) / 2;

export const directions = {
    LEFT: 'LEFT',
    UP: 'UP',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
};

export const events = {
    MOVE: 'MOVE',
    TRY_MOVE: 'TRY_MOVE',
};

export const browserEvents = {
    TOUCH_START: 'touchstart',
    TOUCH_MOVE: 'touchmove',
    TOUCH_END: 'touchend',
    TOUCH_CANCEL: 'touchcancel',
};
