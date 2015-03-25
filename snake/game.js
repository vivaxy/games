/**
 * @since 2014/10/16 17:04
 * @author vivaxy
 */
var Game = function () {

    this.color = {
        background: "rgb(200, 200, 200)",
        snakeHead: "rgb(22, 160, 133)",
        snakeBody: "rgb(39, 174, 96)",
        food: "rgb(211, 84, 0)",
        border: "rgb(255, 255, 255)"
    };
    this.canvasSize = 600;
    this.gameSize = 20;
    this.snakeSpeed = 4;

    this.input = null;
    this.output = null;
    this.grid = null;
    this.snake = null;
    this.food = null;
    this.looper = 0;
    this.over = true;
    this.interval = 0;
    this.startAt = 0;
    this.moveAt = 0;

    this.setup();

};

Game.prototype.setup = function () {

    this.input = new Input();
    this.output = new Output(this.canvasSize, this.gameSize);
    this.grid = new Grid(this.gameSize, this.color, this.output.ctx, this.output.cellSize);

    this.grid.draw();

    this.input.bindEvent("start", this.start.bind(this));

};

Game.prototype.updateTimeStamp = function () {
    this.interval = 1000 / this.snake.speed;
    this.moveAt = this.moveAt + this.interval;
};

Game.prototype.ifMove = function () {
    var now = new Date().getTime();
    return now > this.moveAt;
};

Game.prototype.loop = function () {
    if (this.ifMove()) {
        this.updateTimeStamp();
        var cell = this.snake.move(this.food.cell);

        if (this.inSamePosition(cell, this.food.cell)) {
            this.snake.list = this.snake.list.concat(this.snake.cleanList);
            this.snake.cleanList = [];
            this.food = new Food(this.grid.randomCell(this.snake.list), this.color, this.output.ctx, this.output.cellSize);
            this.food.draw();
        }
        if (this.grid.isInside(cell) && !this.snake.hitBody(cell)) {
            this.snake.draw();
        } else {
            this.gameOver();
        }
    }
    if (this.over) {
        cancelAnimationFrame(this.looper);
    } else {
        this.looper = requestAnimationFrame(this.loop.bind(this));
    }
};

Game.prototype.start = function (direction) {

    if (this.over == false) return;

    this.snake = new Snake(this.snakeSpeed, this.gameSize, this.color, direction, this.output.ctx, this.output.cellSize);
    this.food = new Food(this.grid.randomCell(this.snake.list), this.color, this.output.ctx, this.output.cellSize);

    this.grid.draw();
    this.snake.draw();
    this.food.draw();

    this.input.bindEvent("heading", this.snake.changeDirection.bind(this.snake));

    this.output.showHint(false);
    this.over = false;

    this.startAt = new Date().getTime();
    this.interval = 1000 / this.snake.speed;
    this.moveAt = this.startAt + this.interval;

    this.loop();
};

Game.prototype.inSamePosition = function (a, b) {
    return a.x == b.x && a.y == b.y;
};

Game.prototype.gameOver = function () {
    this.over = true;
    this.output.showHint(true);
    this.input.clearEvent("heading");
};