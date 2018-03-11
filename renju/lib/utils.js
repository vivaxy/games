/**
 * @since 2018-03-11 17:03:00
 * @author vivaxy
 */

export const getCoords = (e) => {
    if (e.changedTouches) {
        return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX - e.target.offsetLeft, y: e.clientY - e.target.offsetTop };
};

export const mapIndexToCoords = ({ colIndex, rowIndex, boardSize, gridSize }) => {
    return {
        x: (colIndex + 0.5) * gridSize.width - (boardSize.width / 2),
        y: -(rowIndex + 0.5) * gridSize.height + (boardSize.height / 2)
    };
};

export const mapCoordsToIndex = ({ x, y, boardSize, gridSize }) => {
    if (x < -boardSize.width / 2 || y < -boardSize.height / 2 || x > boardSize.width / 2 || y > boardSize.height / 2) {
        return { colIndex: null, rowIndex: null };
    }
    return {
        colIndex: Math.floor((x + (boardSize.width / 2)) / gridSize.width),
        rowIndex: Math.floor((-y + (boardSize.height / 2)) / gridSize.height),
    };
};
