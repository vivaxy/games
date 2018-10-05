/**
 * @since 2018-10-05 20:38:09
 * @author vivaxy
 */

import Brick from '../../class/brick.js';
import Ball from '../../class/ball.js';
import collision from '../collision.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
document.body.style.margin = 0;
canvas.style.display = 'block';
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

const BRICK_WIDTH = 400;
const BRICK_HEIGHT = 300;
const brick = new Brick((canvas.width - BRICK_WIDTH) / 2, (canvas.height - BRICK_HEIGHT) / 2, BRICK_WIDTH, BRICK_HEIGHT, 'rgb(150,200,200)');
brick.render(ctx);

let x = canvas.width / 2;
let y = canvas.height / 2;
let a = Math.PI / 4;
const BALL_RADIUS = 100;
const ball = new Ball(x, y, BALL_RADIUS, 'rgb(200,150,200)', 0, a);
ball.render(ctx);

loop();

function loop() {
  renderAngle();
  collision.ballAndBrick(ball, brick, [brick]);
  renderAfterAngle();
}

function renderAngle() {
  const ANGLE_LENGTH = 50;
  const ANGLE_COLOR = 'rgb(150,200,150)';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - ANGLE_LENGTH * Math.cos(a), y + ANGLE_LENGTH * Math.sin(a));
  ctx.closePath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = ANGLE_COLOR;
  ctx.stroke();
}

function renderAfterAngle() {
  const ANGLE_LENGTH = 50;
  const ANGLE_COLOR = 'rgb(200,200,150)';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + ANGLE_LENGTH * Math.cos(ball.a), y - ANGLE_LENGTH * Math.sin(ball.a));
  ctx.closePath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = ANGLE_COLOR;
  ctx.stroke();
}
