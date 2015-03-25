/**
 * @since 2014/10/17 10:22
 * @author vivaxy
 */
var Snake = function (speed, gameSize, color, direction, ctx, cellSize) {

    this.gameSize = gameSize;
    this.backgroundColor = color.background;
    this.headColor = color.snakeHead;
    this.bodyColor = color.snakeBody;
    this.borderColor = color.border;
    this.ctx = ctx;
    this.cellSize = cellSize;

    this.list = [];
    this.cleanList = [];
    this.speed = speed;
    this.direction = direction;
    this.movingDirection = null;

    this.setup(direction);

};

Snake.prototype.setup = function (direction) {
    var cell = {
        x: Math.floor(this.gameSize / 2),
        y: Math.floor(this.gameSize / 2),
        direction: direction
    };
    this.movingDirection = direction;
    this.list.push(cell);
};

Snake.prototype.draw = function () {
    this.clearTail();
    this.drawBody();
    this.drawHead();
};

Snake.prototype.clearTail = function () {
    while (this.cleanList.length > 0) {
        var cell = this.cleanList[0];
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.lineWidth = "1";
        this.ctx.strokeRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
        this.cleanList.shift();
    }
};

Snake.prototype.drawBody = function () {
    if (this.list.length > 1) {
        var cell = this.list[1];
        this.ctx.fillStyle = this.bodyColor;
        this.ctx.fillRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.lineWidth = "1";
        this.ctx.strokeRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
        this.ctx.beginPath();
        if (cell.direction.y == 0) {
            this.ctx.moveTo(cell.x * this.cellSize, (cell.y + 0.5) * this.cellSize);
            this.ctx.lineTo((cell.x + 1) * this.cellSize, (cell.y + 0.5) * this.cellSize);
        } else {
            this.ctx.moveTo((cell.x + 0.5) * this.cellSize, (cell.y) * this.cellSize);
            this.ctx.lineTo((cell.x + 0.5) * this.cellSize, (cell.y + 1) * this.cellSize);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
};

Snake.prototype.drawHead = function () {
    var cell = this.list[0];
    cell.heading = this.direction;
    this.ctx.fillStyle = this.headColor;
    this.ctx.beginPath();
    switch (true) {
        case cell.direction.x == 0 && cell.direction.y == -1://up
            this.ctx.moveTo(cell.x * this.cellSize, (cell.y + 1) * this.cellSize);
            this.ctx.quadraticCurveTo((cell.x + 0.5 + cell.heading.x / 2) * this.cellSize, (cell.y - 1) * this.cellSize, (cell.x + 1) * this.cellSize, (cell.y + 1) * this.cellSize);
            this.ctx.lineTo(cell.x * this.cellSize, (cell.y + 1) * this.cellSize);
            break;
        case cell.direction.x == 0 && cell.direction.y == 1://down
            this.ctx.moveTo(cell.x * this.cellSize, cell.y * this.cellSize);
            this.ctx.quadraticCurveTo((cell.x + 0.5 + cell.heading.x / 2) * this.cellSize, (cell.y + 2) * this.cellSize, (cell.x + 1) * this.cellSize, cell.y * this.cellSize);
            this.ctx.lineTo(cell.x * this.cellSize, cell.y * this.cellSize);
            break;
        case cell.direction.x == -1 && cell.direction.y == 0://left
            this.ctx.moveTo((cell.x + 1) * this.cellSize, cell.y * this.cellSize);
            this.ctx.quadraticCurveTo((cell.x - 1) * this.cellSize, (cell.y + 0.5 + cell.heading.y / 2) * this.cellSize, (cell.x + 1) * this.cellSize, (cell.y + 1) * this.cellSize);
            this.ctx.lineTo((cell.x + 1) * this.cellSize, cell.y * this.cellSize);
            break;
        case cell.direction.x == 1 && cell.direction.y == 0://right
            this.ctx.moveTo(cell.x * this.cellSize, cell.y * this.cellSize);
            this.ctx.quadraticCurveTo((cell.x + 2) * this.cellSize, (cell.y + 0.5 + cell.heading.y / 2) * this.cellSize, cell.x * this.cellSize, (cell.y + 1) * this.cellSize);
            this.ctx.lineTo(cell.x * this.cellSize, cell.y * this.cellSize);
            break;
        default:
            break;
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.lineWidth = "1";
    this.ctx.strokeRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
};

Snake.prototype.clearHead = function () {
    var cell = this.list[0];
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.lineWidth = "1";
    this.ctx.strokeRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
    this.cleanList.shift();
};

Snake.prototype.move = function () {

    if (this.direction.x == 0 && this.direction.y == 0) return this.list[0];

    var cell = {
        x: this.list[0].x + this.direction.x,
        y: this.list[0].y + this.direction.y,
        direction: this.direction
    };
    this.list.unshift(cell);
    this.cleanList.push(this.list.pop());

    this.movingDirection = this.direction;

    return cell;

};

Snake.prototype.changeDirection = function (direction) {
    if (direction.x + this.movingDirection.x == 0 && direction.y + this.movingDirection.y == 0) {
        return;
    }
    this.direction = direction;

    this.clearHead();
    this.drawHead();
};

Snake.prototype.hitBody = function (cell) {
    for (var i = 1; i < this.list.length; i++) {
        if (this.inSamePosition(this.list[i], cell)) return true;
    }
    return false;
};

Snake.prototype.inSamePosition = function (a, b) {
    return a.x == b.x && a.y == b.y;
};