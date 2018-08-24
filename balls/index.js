/**
 * @since 20180824 13:33
 * @author vivaxy
 */

import Ball from './class/Ball.js';

import canvas from './services/canvas.js';
import notes from './services/notes.js';
import click from './services/click.js';

let balls = [];
let timestamp = Date.now();

function randomColor() {
  return Math.floor(Math.random() * 256);
}

function randomRange(from, to) {
  return Math.random() * (to - from) + from;
}

function onLeftClick() {
  const canvasEl = canvas.getElement();
  const x = randomRange(0, canvasEl.width);
  const y = randomRange(0, canvasEl.height);
  const r = randomRange(50, 100);
  const c = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  const vx = randomRange(0.1, 0.2);
  const vy = randomRange(0.1, 0.2);
  balls.push(new Ball({ x, y, r, c, vx, vy }));
}

function onRightClick() {
  balls.pop();
}

function frame() {
  const ctx = canvas.getContext();
  const canvasEl = canvas.getElement();
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  const now = Date.now();
  const time = now - timestamp;
  timestamp = now;

  for (let i = 0; i < balls.length; i++) {
    const ball1 = balls[i];
    ball1.move(time);

    if (!ball1.collideWithCanvas(canvasEl)) {
      for (let j = i + 1; j < balls.length; j++) {
        const ball2 = balls[j];
        ball1.collideWithBall(ball2);
      }
    }
    ball1.render(ctx);
  }

  notes.render(ctx);
  requestAnimationFrame(frame);
}

canvas.init();
click.init(canvas.getElement(), onLeftClick, onRightClick);

frame();
