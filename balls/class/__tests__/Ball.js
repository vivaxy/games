/**
 * @since 20180824 14:57
 * @author vivaxy
 */

import test from 'ava';

import Ball, { apartBalls, getBallDistance } from '../Ball.js';

test('apart balls 1', (t) => {
  const ball1 = new Ball({ x: 0, y: 0, r: 1 });
  const ball2 = new Ball({ x: 1, y: 1, r: 1 });
  const distance = getBallDistance(ball1, ball2);
  t.is(distance, Math.sqrt(2) - 2);

  apartBalls(ball1, ball2, distance);
  t.true(Math.abs(ball1.x - (1 - Math.sqrt(2)) / 2) < 1e-10);
  t.true(Math.abs(ball1.y - (1 - Math.sqrt(2)) / 2) < 1e-10);
  t.true(Math.abs(ball2.x - (1 + Math.sqrt(2)) / 2) < 1e-10);
  t.true(Math.abs(ball2.y - (1 + Math.sqrt(2)) / 2) < 1e-10);
});

test('apart balls 2', (t) => {
  const ball1 = new Ball({ x: 0, y: 0, r: 1 });
  const ball2 = new Ball({ x: 1, y: -1, r: 1 });
  const distance = getBallDistance(ball1, ball2);
  t.is(distance, Math.sqrt(2) - 2);

  apartBalls(ball1, ball2, distance);
  t.true(Math.abs(ball1.x - (1 - Math.sqrt(2)) / 2) < 1e-10);
  t.true(Math.abs(ball1.y - (Math.sqrt(2) - 1) / 2) < 1e-10);
  t.true(Math.abs(ball2.x - (1 + Math.sqrt(2)) / 2) < 1e-10);
  t.true(Math.abs(ball2.y + (1 + Math.sqrt(2)) / 2) < 1e-10);
});

test('apart balls 3', (t) => {
  const ball1 = new Ball({ x: 0, y: 0, r: 1 });
  const ball2 = new Ball({ x: -1, y: -1, r: 1 });
  const distance = getBallDistance(ball1, ball2);
  t.is(distance, Math.sqrt(2) - 2);

  apartBalls(ball1, ball2, distance);
  t.true(Math.abs(ball1.x - (Math.sqrt(2) - 1) / 2) < 1e-10);
  t.true(Math.abs(ball1.y - (Math.sqrt(2) - 1) / 2) < 1e-10);
  t.true(Math.abs(ball2.x + (1 + Math.sqrt(2)) / 2) < 1e-10);
  t.true(Math.abs(ball2.y + (1 + Math.sqrt(2)) / 2) < 1e-10);
});

test('apart balls 4', (t) => {
  const ball1 = new Ball({ x: 0, y: 0, r: 1 });
  const ball2 = new Ball({ x: -1, y: 1, r: 1 });
  const distance = getBallDistance(ball1, ball2);
  t.is(distance, Math.sqrt(2) - 2);

  apartBalls(ball1, ball2, distance);
  t.true(Math.abs(ball1.x - (Math.sqrt(2) - 1) / 2) < 1e-10);
  t.true(Math.abs(ball1.y - (1 - Math.sqrt(2)) / 2) < 1e-10);
  t.true(Math.abs(ball2.x + (1 + Math.sqrt(2)) / 2) < 1e-10);
  t.true(Math.abs(ball2.y - (1 + Math.sqrt(2)) / 2) < 1e-10);
});

test('apart balls 4', (t) => {
  const ball1 = new Ball({ x: 0, y: 0, r: 1 });
  const ball2 = new Ball({ x: -1, y: 1, r: 1 });
  const distance = getBallDistance(ball1, ball2);
  t.is(distance, Math.sqrt(2) - 2);

  apartBalls(ball1, ball2, distance);
  t.true(Math.abs(ball1.x - (Math.sqrt(2) - 1) / 2) < 1e-10);
  t.true(Math.abs(ball1.y - (1 - Math.sqrt(2)) / 2) < 1e-10);
  t.true(Math.abs(ball2.x + (1 + Math.sqrt(2)) / 2) < 1e-10);
  t.true(Math.abs(ball2.y - (1 + Math.sqrt(2)) / 2) < 1e-10);
});

test('apart balls different mass', (t) => {
  const ball1 = new Ball({ x: 0, y: 0, r: 1 });
  const ball2 = new Ball({ x: 2, y: 2, r: 2 });
  const distance = getBallDistance(ball1, ball2);
  t.is(distance, Math.sqrt(2) * 2 - 3);

  apartBalls(ball1, ball2, distance);

  t.true(Math.abs(ball1.x - (16 - 12 * Math.sqrt(2)) / 9) < 1e-10);
  t.true(Math.abs(ball1.y - (16 - 12 * Math.sqrt(2)) / 9) < 1e-10);
  t.true(Math.abs(ball2.x - (16 * Math.sqrt(2) + 3) / 9 / Math.sqrt(2)) < 1e-10);
  t.true(Math.abs(ball2.y - (16 * Math.sqrt(2) + 3) / 9 / Math.sqrt(2)) < 1e-10);
});
