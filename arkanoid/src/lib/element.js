/**
 * @since 20180109 21:09
 * @author vivaxy
 */

export default class Element {
    constructor({ ctx, size }) {
        this.ctx = ctx;
        this.size = size;
    }

    render() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
