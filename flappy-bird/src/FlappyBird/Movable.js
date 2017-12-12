/**
 * @since 2017-07-08 21:57:03.905
 * @author vivaxy
 */

export default class Movable {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
    }

    move() {
        const diff = 10;
        this.x += this.vx * diff / 1000;
        this.y += this.vy * diff / 1000;
        return { diff };
    }

}
