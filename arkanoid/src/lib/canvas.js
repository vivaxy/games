/**
 * @since 20180109 20:59
 * @author vivaxy
 */

export default class Canvas {
    constructor() {
        this.canvas = document.querySelector('.js-canvas');
        this.size = this.resize();
        this.ctx = this.canvas.getContext('2d');
    }

    getSize() {
        return this.size;
    }

    getCtx() {
        return this.ctx;
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        return { width, height };
    }

    clear() {
        const { width, height } = this.size;
        this.ctx.clearRect(0, 0, width, height);
    }
}
