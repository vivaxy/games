import { canvasHeight, canvasWidth } from './configs';

export default class Canvas {
    constructor() {
        const canvas = document.querySelector('.js-canvas');
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvasWidth;
        this.height = canvasHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }

    getCtx() {
        return this.ctx;
    }

    getCanvas() {
        return this.canvas;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}
