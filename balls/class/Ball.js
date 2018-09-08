/**
 * @since 20180824 13:33
 * @author vivaxy
 */

function collide(r1, r2, v1, v2) {
  const m1 = Math.pow(r1, 3);
  const m2 = Math.pow(r2, 3);
  return {
    v1: ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2),
    v2: ((m2 - m1) * v2 + 2 * m1 * v2) / (m1 + m2),
  };
}

export function getBallDistance(ball1, ball2) {
  return Math.sqrt(Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2)) - ball1.r - ball2.r;
}

export function apartBalls(ball1, ball2, distance = getBallDistance(ball1, ball2)) {
  if (distance >= 0) {
    return;
  }
  const m1 = Math.pow(ball1.r, 3);
  const m2 = Math.pow(ball2.r, 3);

  const distance1 = -distance * m2 / (m1 + m2);
  const distance2 = -distance * m1 / (m1 + m2);

  const angle = Math.atan2(ball2.y - ball1.y, ball2.x - ball1.x); // from ball1 to ball2
  ball1.x -= Math.cos(angle) * distance1;
  ball1.y -= Math.sin(angle) * distance1;
  ball2.x += Math.cos(angle) * distance2;
  ball2.y += Math.sin(angle) * distance2;
}

const damping = 0.8;

export default class Ball {
  constructor({ x, y, r, c, vx, vy }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.vx = vx;
    this.vy = vy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.c;
    ctx.fill();
  }

  move(time) {
    this.x += this.vx * time;
    this.y += this.vy * time;
  }

  collideWithCanvas(canvas) {
    if (this.x < this.r) {
      this.vx = -this.vx * damping;
      this.x = this.r;
      return true;
    }
    if (this.x > canvas.width - this.r) {
      this.vx = -this.vx * damping;
      this.x = canvas.width - this.r;
      return true;
    }
    if (this.y < this.r) {
      this.vy = -this.vy * damping;
      this.y = this.r;
      return true;
    }
    if (this.y > canvas.height - this.r) {
      this.vy = -this.vy * damping;
      this.y = canvas.height - this.r;
      return true;
    }
    return false;
  }

  collideWithBall(ball) {
    const distance = getBallDistance(this, ball);
    apartBalls(this, ball, distance);

    if (distance < 0) {

      const collideX = collide(this.r, ball.r, this.vx, ball.vx);
      const collideY = collide(this.r, ball.r, this.vy, ball.vy);

      this.vx = collideX.v1 * damping;
      ball.vx = collideX.v2 * damping;
      this.vy = collideY.v1 * damping;
      ball.vy = collideY.v2 * damping;

      return true;
    }

    return false;
  }

}
