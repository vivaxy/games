/**
 * @since 2018-10-05 20:38:09
 * @author vivaxy
 */

import Brick from '../../class/brick.js';
import Ball from '../../class/ball.js';
import collision from '../collision.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
document.body.style.margin = '0';
canvas.style.display = 'block';
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

const BRICK_WIDTH = 400;
const BRICK_HEIGHT = 300;
const brick = new Brick((canvas.width - BRICK_WIDTH) / 2, (canvas.height - BRICK_HEIGHT) / 2, BRICK_WIDTH, BRICK_HEIGHT, 'rgb(150,200,200)');

let x = 647.020866394043;
let y = 657.2215576171875;
let a = -Math.PI * 3 / 4;
const BALL_RADIUS = 100;
const ball = new Ball(x, y, BALL_RADIUS, 'rgb(200,150,200)', 0, a);

canvas.addEventListener('touchstart', touchStartHandler);
canvas.addEventListener('touchmove', touchMoveHandler);
canvas.addEventListener('touchend', touchEndHandler);

const input = document.querySelector('input');
input.style.position = 'absolute';
input.style.display = 'block';
input.style.left = '0';
input.style.right = '0';
input.style.top = '0';
input.style.height = '30px';
input.style.margin = '0';
input.style.width = '100%';
input.value = a;
input.min = -Math.PI;
input.max = Math.PI;
input.step = 0.001;
input.addEventListener('change', handleAngleChange);

let caching = {};
loop();

function loop() {
  ball.x = x;
  ball.y = y;
  ball.a = a;
  if (!caching[`${x},${y}`]) {
    collision.ballAndBrick(ball, brick, [brick]);
    caching[`${x},${y}`] = { a, b: ball.a };
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  brick.render(ctx);
  ball.render(ctx);
  renderAngle(caching[`${x},${y}`].a);
  renderAfterAngle(caching[`${x},${y}`].b);
  requestAnimationFrame(loop);
}

function renderAngle(angle) {
  const ANGLE_LENGTH = 50;
  const ANGLE_COLOR = 'rgb(150,200,150)';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - ANGLE_LENGTH * Math.cos(angle), y + ANGLE_LENGTH * Math.sin(angle));
  ctx.closePath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = ANGLE_COLOR;
  ctx.stroke();
}

function renderAfterAngle(angle) {
  const ANGLE_LENGTH = 50;
  const ANGLE_COLOR = 'rgb(200,200,150)';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + ANGLE_LENGTH * Math.cos(angle), y - ANGLE_LENGTH * Math.sin(angle));
  ctx.closePath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = ANGLE_COLOR;
  ctx.stroke();
}

let startingPoint = null;
let startingCenter = null;

function touchStartHandler(e) {
  startingPoint = getCoords(e);
  startingCenter = { x, y };
}

function touchMoveHandler(e) {
  const p = getCoords(e);
  x = startingCenter.x + p.x - startingPoint.x;
  y = startingCenter.y + p.y - startingPoint.y;
}

function touchEndHandler() {
  console.log(x, y);
  startingPoint = null;
  startingCenter = null;
}

function getCoords(e) {
  if (e.changedTouches) {
    return {
      x: e.changedTouches[0].clientX * window.devicePixelRatio,
      y: e.changedTouches[0].clientY * window.devicePixelRatio,
    };
  }
  return { x: e.clientX * window.devicePixelRatio, y: e.clientY * window.devicePixelRatio };
}

function handleAngleChange(e) {
  a = Number(e.target.value);
}
