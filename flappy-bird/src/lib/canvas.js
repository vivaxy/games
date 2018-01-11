/**
 * @since 2017-03-17 11:41:18
 * @author vivaxy
 */

class Canvas {
    constructor() {
        // set canvas width height
        const canvas = document.querySelector('canvas');

        canvas.height = window.innerHeight * window.devicePixelRatio;
        canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas = canvas;
    }

    getCtx() {
        return this.canvas.getContext('2d');
    }

    clear() {
        const ctx = this.getCtx();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getSize() {
        return { width: this.canvas.width, height: this.canvas.height };
    }
}

const canvas = new Canvas();

export default canvas;
export const ctx = canvas.getCtx();
