/**
 * @since 2017-03-17 13:57:46
 * @author vivaxy
 */

import '../styles/index.pcss';

import { browserEvents } from './configs';
import Canvas from './canvas';
import Puzzle from './puzzle';
import Input from './input';

class Game {
    constructor({ row = 4, col = 4 } = {}) {
        const canvas = new Canvas();
        const input = new Input({ canvas: canvas.getCanvas() });
        const puzzle = new Puzzle({ ctx: canvas.getCtx(), row, col, input });
        this.canvas = canvas;
        this.puzzle = puzzle;
        // disable scroll. // weixin need this
        document.body.addEventListener(browserEvents.TOUCH_MOVE, (e) => {
            e.preventDefault();
        }, { passive: false });
    }

    render() {
        const { puzzle, canvas } = this;
        canvas.clear();
        puzzle.render();
    }

    loop() {
        this.render();
        requestAnimationFrame(() => {
            this.loop();
        });
    }

    start() {
        this.loop();
    }
}

new Game().start();
