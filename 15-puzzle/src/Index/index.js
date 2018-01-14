/**
 * @since 2017-03-17 13:57:46
 * @author vivaxy
 */

import '../styles/index.pcss';
import Canvas from './canvas';
import Puzzle from './puzzle';

class Game {
    constructor({ row = 4, col = 4 } = {}) {
        const canvas = new Canvas();
        const puzzle = new Puzzle({ ctx: canvas.getCtx(), row, col });
        this.canvas = canvas;
        this.puzzle = puzzle;
    }

    render() {
        const puzzle = this.puzzle;
        puzzle.render();
    }
}

new Game().render();
