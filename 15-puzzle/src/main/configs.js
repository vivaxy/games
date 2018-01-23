// canvas
export const canvasWidth = 800;
export const canvasHeight = 1200;

export const size = 4;

// grid
export const gridSize = 720;
export const gridBorderWidth = 0;
export const gridX = (canvasWidth - gridSize - gridBorderWidth * 2) / 2;
export const gridY = 200;
export const gridBorderColor = '#1e2e45';
export const gridBackgroundColor = '#1e2e45';

// tile
export const tileSpacing = 10;
export const tileBorderWidth = 0;
export const tileSize = (gridSize - tileSpacing * (size + 1) - gridBorderWidth * 2) / size; // border 在内
export const tileBorderColor = 'rgb(255, 0, 0)';
export const tileTextColor = '#1e2e45';
export const tileColors = ['#ff778d', '#ffce54', '#54c0ff', '#e7e2ea'];
export const getTilePosition = ({ rowIndex, colIndex }) => {
    const x = gridX + (colIndex + 1) * tileSpacing + tileSize * colIndex + gridBorderWidth;
    const y = gridY + (rowIndex + 1) * tileSpacing + tileSize * rowIndex + gridBorderWidth;
    return { x, y }
};

// buttons
export const buttonAreaWidth = 720;
export const buttonAreaHeight = 60;
export const buttonAreaTop = 120;
export const buttonAreaLeft = (canvasWidth - buttonAreaWidth) / 2;
export const buttonSpacing = 10;
export const buttonBackgroundColor = '#1e2e45';
export const buttonDisabledBackgroundColor = '#e7e2ea';
export const buttonTextColor = '#fff';
export const buttonTypes = {
    SCRAMBLE: 'SCRAMBLE',
};

export const tileTypes = {
    SPACE: 'SPACE',
    NORMAL: 'NORMAL',
};

export const mapCanvasToPoint = (dimension) => {
    return window.innerWidth / canvasWidth * dimension;
};

export const mapPointToCanvas = (dimension) => {
    return canvasWidth / window.innerWidth * dimension;
};

export const movementThreshold = (tileSize + tileSpacing) / 2;

export const directions = {
    LEFT: 'LEFT',
    UP: 'UP',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
};

export const events = {
    MOVE: 'MOVE',
    TRY_MOVE: 'TRY_MOVE',
    RESET_SPACE_TILE: 'RESET_SPACE_TILE',
    CLICK: 'CLICK',
    RESIZE_CANVAS: 'RESIZE_CANVAS',
};

export const browserEvents = {
    TOUCH_START: 'touchstart',
    TOUCH_MOVE: 'touchmove',
    TOUCH_END: 'touchend',
    TOUCH_CANCEL: 'touchcancel',
    CLICK: 'click',
    RESIZE: 'resize',
    ORIENTATION_CHANGE: 'orientationchange',
};

export const getNow = () => {
    return new Date().getTime();
};
