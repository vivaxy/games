/**
 * @since 2014/10/17 9:31
 * @author vivaxy
 */
var Output = function (canvasSize, gameSize) {

    this.canvasSize = canvasSize;
    this.gameSize = gameSize;

    this.canvas = null;
    this.ctx = null;
    this.hint = null;

    this.setup();

};

Output.prototype.setup = function () {

    this.canvas = document.getElementsByClassName("game-canvas")[0];
    this.canvas.width = this.canvasSize;
    this.canvas.height = this.canvasSize;

    this.ctx = this.canvas.getContext("2d");

    this.cellSize = this.canvasSize / this.gameSize;

    this.hint = document.getElementsByClassName("hint-container")[0];

};

Output.prototype.showHint = function (bool) {
    if (bool) this.hint.classList.remove("hide");
    else this.hint.classList.add("hide");
};
