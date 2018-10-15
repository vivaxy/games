/**
 * @since 2014/10/23 9:30
 * @author vivaxy
 */

import Catapult from './catapult.js';
import Ball from './ball.js';
import Input from './input.js';

var Game = function() {
  this.canvas = document.getElementsByClassName('canvas')[0];
  this.ctx = this.canvas.getContext('2d');
  this.hint = document.getElementsByClassName('hint')[0];

  this.canvas.width = 400;
  this.canvas.height = 600;

  this.ctx.fillStyle = 'rgb(200,200,200)';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  this.looper = 0;

  this.catapult = new Catapult();
  this.ball = new Ball(300, 500);
  this.ball.draw(this.catapult.spoon.degree);

  this.input = new Input();
  this.input.bindEvent('key-down', this.keyDown.bind(this), false);
  this.input.bindEvent('key-up', this.keyUp.bind(this), false);

};

Game.prototype.keyDown = function() {
  switch (this.catapult.spoon.stage) {
    case 0:
      this.catapult.spoon.stage = 1;
      this.pull();
      break;
    default:
      break;
  }
};

Game.prototype.keyUp = function() {
  switch (this.catapult.spoon.stage) {
    case 1:
      this.loose();
      this.catapult.spoon.stage = 2;
      break;
    default:
      break;
  }
};

Game.prototype.pull = function() {

  this.catapult.spoon.degree += 0.1;

  this.ctx.fillStyle = 'rgb(200,200,200)';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  this.catapult.cart.draw();
  this.catapult.spoon.draw();
  this.ball.draw(this.catapult.spoon.degree);
  if (this.catapult.spoon.degree >= this.catapult.spoon.maxDegree) {
    this.hint.innerHTML = 'fail';
    this.catapult.spoon.stage = 3;
    cancelAnimationFrame(this.looper);
  } else {
    this.looper = requestAnimationFrame(this.pull.bind(this));
  }

};

Game.prototype.loose = function() {
  this.catapult.spoon.degree -= 10;

  this.ctx.fillStyle = 'rgb(200,200,200)';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  this.catapult.cart.draw();
  this.catapult.spoon.draw();

  if (this.catapult.spoon.degree <= this.catapult.spoon.minDegree) {
    cancelAnimationFrame(this.looper);
  } else {
    this.looper = requestAnimationFrame(this.loose.bind(this));
  }
};

export default Game;
