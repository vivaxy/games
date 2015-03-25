/**
 * @since 2014/10/16 17:20
 * @author vivaxy
 */
var Grid = function (gameSize, color, ctx, cellSize) {
    this.gameSize = gameSize;
    this.backgroundColor = color.background;
    this.borderColor = color.border;
    this.ctx = ctx;
    this.cellSize = cellSize;

    this.list = [];

    this.setup();

};

Grid.prototype.setup = function () {
    for (var i = 0; i < this.gameSize; i++) {
        for (var j = 0; j < this.gameSize; j++) {
            var cell = {
                x: i,
                y: j
            };
            this.list.push(cell);
        }
    }
};

Grid.prototype.draw = function () {
    for (var i = 0; i < this.list.length; i++) {
        var cell = this.list[i];
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.lineWidth = "1";
        this.ctx.strokeRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
    }
};

Grid.prototype.isInside = function (cell) {
    return cell.x >= 0 && cell.x <= this.gameSize - 1 && cell.y >= 0 && cell.y <= this.gameSize - 1;
};

Grid.prototype.randomCell = function (snakeList) {
    var cells = this.availableCells(snakeList);
    if (cells.length) return cells[Math.floor(Math.random() * cells.length)];
};

Grid.prototype.availableCells = function (snakeList) {
    var cells = [];
    for (var i = 0; i < this.list.length; i++) {
        var isOccupied = false;
        var cell = this.list[i];
        for (var j = 0; j < snakeList.length; j++) {
            if (this.inSamePosition(cell, snakeList[j])) {
                isOccupied = true;
                continue;
            }
        }
        if (!isOccupied) cells.push(cell);
    }
//    console.log(cells);
    return cells;
};

Grid.prototype.inSamePosition = function (a, b) {
    return a.x == b.x && a.y == b.y;
};