/**
 * @since 2014/10/22 10:35
 * @author vivaxy
 */
var Game = function () {

    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = 400;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext("2d");

    this.looper = 0;
    this.nextCoinAt = new Date().getTime();
    this.nextCoinInterval = 1000;

    this.coins = [];
    this.bowl = new Bowl(this.canvas);

    this.input = new Input();
    this.input.bindEvent("change-direction", this.bowl.changeDirection.bind(this.bowl));

    this.loop();

};

Game.prototype.loop = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (new Date().getTime() > this.nextCoinAt) {
        this.coins.push(new Coin(this.canvas));
        this.nextCoinAt += this.nextCoinInterval;
    }
    for (var i = 0; i < this.coins.length; i++) {
        var coin = this.coins[i];
        coin.fall();
        coin.draw();
        if (coin.y > this.canvas.height - this.bowl.height && coin.inBowl(this.bowl)) {
            this.coins.splice(i, 1);
            this.bowl.hasCoins += coin.score;
        }
    }
    this.bowl.move();
    this.bowl.draw();
    this.looper = requestAnimationFrame(this.loop.bind(this));
};