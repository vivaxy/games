/**
 * @since 20180109 21:11
 * @author vivaxy
 */

import Element from './element';
import { ballRadius } from './common';

class Ball extends Element {
    constructor({ ctx, size, x, y }) {
        super({ ctx, size });
        this.x = x;
        this.y = y;
        this.r = ballRadius;
        this.color = 'rgb(0, 0, 255)';
    }

    render() {
        this.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

export default class Balls extends Element {
    constructor({ ctx, size }) {
        super({ ctx, size });
        this.balls = [
            new Ball({ ctx, size, x: 100, y: 100 })
        ];
    }

    render() {
        this.balls.forEach((ball) => {
            ball.render();
        });
    }
}
