/**
 * @since 2014/10/22 10:35
 * @author vivaxy
 */
var Bowl = function(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  this.width = 100;
  this.height = 50;
  this.x = this.canvas.width / 2;
  this.direction = 0;
  this.speed = 1;
  this.hasCoins = 0;
};

Bowl.prototype.move = function() {
  if (this.x <= this.width / 2 && this.direction === -1 || this.x >= this.canvas.width - this.width / 2 && this.direction === 1) {
    this.direction = 0;
    return;
  }
  this.x = this.x + this.direction * this.speed;
};

Bowl.prototype.draw = function() {
  this.ctx.fillStyle = 'blue';
  this.ctx.fillRect(this.x - this.width / 2, this.canvas.height - this.height, this.width, this.height);
};

Bowl.prototype.changeDirection = function(direction) {
  this.direction = direction;
};

export default Bowl;
