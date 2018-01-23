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
        this.styles = {
            width: window.innerWidth,
            height: window.innerHeight,
            top: 0,
            left: 0,
        };
        this.updatePosition();
    }

    updatePosition() {
        const { canvas, width, height, styles } = this;
        if (width / height > window.innerWidth / window.innerHeight) {
            // canvas is much wider, fit canvas width to window width
            styles.width = window.innerWidth;
            styles.height = window.innerWidth * height / width;
        } else {
            styles.height = window.innerHeight;
            styles.width = window.innerHeight * width / height;
        }
        styles.top = (window.innerHeight - styles.height) / 2;
        styles.left = (window.innerWidth - styles.width) / 2;
        Object.keys(styles).forEach((styleKey) => {
            canvas.style[styleKey] = styles[styleKey] + 'px';
        });
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
