/**
 * @since 2014/10/17 17:42
 * @author vivaxy
 */
/**
 * @since 2014/10/16 17:12
 * @author vivaxy
 */
var Food = function (position, color, ctx, cellSize) {

    this.cell = position;
    this.color = color.food;
    this.borderColor = color.border;
    this.ctx = ctx;
    this.cellSize = cellSize;
};

Food.prototype.draw = function () {
    var cell = this.cell;
    this.ctx.beginPath();
    this.ctx.arc(cell.x * this.cellSize + this.cellSize / 2, cell.y * this.cellSize + this.cellSize / 2, this.cellSize / 2, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
};