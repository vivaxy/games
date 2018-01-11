/**
 * @since 2017-03-30 18:17:53
 * @author vivaxy
 */

import canvas, { ctx } from './canvas';
import image from './background.png';

import Movable from './Movable';

export default class Background extends Movable {

    constructor() {
        super();
        this.image = new Image();
        this.image.src = image;
        const { width, height } = canvas.getSize();
        this.width = width;
        this.height = height;
        this.vx = -100;
    }

    move() {
        super.move();
        if (this.x < -this.width) {
            this.x += this.width;
        }
    }

    paint() {
        ctx.drawImage(this.image, this.x, 0, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, 0, this.width, this.height);
    }
}
