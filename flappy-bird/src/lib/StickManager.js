/**
 * @since 2017-03-30 18:15:13
 * @author vivaxy
 */

import canvas from './canvas';
import Stick from './Stick';

export default class StickManager {

    constructor() {
        this.sticks = [];
        const { width } = canvas.getSize();
        this.create(width);
        this.create(width + width / 2);
        this.create(width * 2);
    }

    getSticks() {
        return this.sticks;
    }

    create(x) {
        this.sticks.push(new Stick(x));
    }

    move() {
        this.sticks = this.sticks.filter((stick) => {
            stick.move();
            return !stick.isOutOfScreen();
        });
        if (this.sticks.length < 3) {
            const { width } = canvas.getSize();
            this.create(width * 3 / 2);
        }
    }

    paint() {
        return this.sticks.map((stick) => {
            return stick.paint();
        });
    }

}
