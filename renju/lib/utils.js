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

export const mapIndexToCoords = ({ colIndex, rowIndex, boardSize: { width: boardWidth, height: boardHeight }, gridSize: { width: gridWidth, height: gridHeight } }) => {
    return {
        x: (colIndex + 0.5) * gridWidth - (boardWidth / 2),
        y: -(rowIndex + 0.5) * gridHeight + (boardHeight / 2)
    };
};
