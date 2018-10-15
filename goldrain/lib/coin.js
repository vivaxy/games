/**
 * @since 2014/10/22 10:35
 * @author vivaxy
 */
var Coin = function(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.score = 1;
  this.speed = 2;
  this.radius = 20;
  this.x = this.randomX();
  this.y = -this.radius;
};

Coin.prototype.randomX = function() {
  return this.radius + Math.random() * (this.canvas.width - 2 * this.radius);
};

Coin.prototype.fall = function() {
  this.y = this.y + this.speed;
};

Coin.prototype.draw = function() {
  this.ctx.fillStyle = 'red';
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  this.ctx.closePath();
  this.ctx.fill();
};

Coin.prototype.inBowl = function(bowl) {
  return this.y < this.canvas.height && this.y > this.canvas.height - bowl.height && bowl.x - bowl.width / 2 < this.x && bowl.x + bowl.width / 2 > this.x;
};

export default Coin;
