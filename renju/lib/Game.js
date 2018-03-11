/**
 * @since 2018-03-11 10:05:13
 * @author vivaxy
 */

import events from './events.js';
import Board from './Board.js';
import Canvas from './Canvas';
import * as eventTypes from '../configs/eventTypes.js';
import * as statusTypes from '../configs/statusTypes.js';

export default class Game {

    constructor({ canvasElement }) {
        new Board();
        this.canvas = new Canvas({ canvasElement });
        this.layers = [];
    }

    tick() {
        this.canvas.clear();
        this.canvas.render({ layers: this.layers });
    }

}
