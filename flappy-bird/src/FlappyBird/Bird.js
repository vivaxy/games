/**
 * @since 2017-03-17 11:34:02
 * @author vivaxy
 */

import canvas, { ctx } from './canvas';
import forwardImage from './bird-forward.png';
import upImage from './bird-up.png';
import downImage from './bird-down.png';
import Movable from './Movable';

export default class Bird extends Movable {
    constructor() {
        super();
        const { width, height } = canvas.getSize();
        // 圆心
        this.x = 200;
        this.y = height / 2;
        const ratio = 5;
        this.rx = 17 * ratio; // 17 * 12
        this.ry = 12 * ratio;
        this.vy = 100;
        this.g = 2000;

        const forward = new Image();
        forward.src = forwardImage;
        const up = new Image();
        up.src = upImage;
        const down = new Image();
        down.src = downImage;
        this.image = { forward, up, down };
    }

    move() {
        const { diff } = super.move();
        this.vy = this.vy + (this.g * diff / 1000);
    }

    moveUp() {
        this.vy = -500;
    }

    getYState() {
        if (this.vy > 0) {
            return 'up';
        }
        if (this.vy < 0) {
            return 'down';
        }
        return 'forward';
    }

    getImage() {
        const state = this.getYState();
        return this.image[state];
    }

    paint() {
        ctx.drawImage(this.getImage(), this.x - (this.rx / 2), this.y - (this.ry / 2), this.rx, this.ry);
    }

    isCollidedWithRect(x, y, width, position) {
        /**
         *    rx
         *   │  │  │  │
         *   │  │  │  │
         *   │  │  │  │
         *   │  └──┘  │
         *   └────────┘  ry
         * if ellipse center is in outer box, then collide
         */
        if (position === 'up') {
            const minX = x - width / 2 - this.rx / 2;
            const maxX = x + width / 2 + this.rx / 2;
            const maxY = y + this.ry / 2;
            if (this.x > minX && this.x < maxX && this.y < maxY) {
                return true;
            }
        }
        if (position === 'down') {
            const minX = x - width / 2 - this.rx / 2;
            const maxX = x + width / 2 + this.rx / 2;
            const minY = y - this.ry / 2;
            if (this.x > minX && this.x < maxX && this.y > minY) {
                return true;
            }
        }
        return false;
    }

    isOutOfScreen() {
        if (this.y - this.ry / 2 < 0) {
            return true;
        }
        const { width, height } = canvas.getSize();
        return this.y + this.ry / 2 >= height;
    }

}
