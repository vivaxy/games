/**
 * @since 2018-03-11 10:05:13
 * @author vivaxy
 */

import events from './events.js';
import Board from './Board.js';
import Canvas from './Canvas.js';
import Background from './Background.js';
import Input from './Input.js';
import Pieces from './Pieces.js';
import Cursor from './Cursor.js';
import * as eventTypes from '../configs/eventTypes.js';
import * as layerTypes from '../configs/layerTypes.js';
import * as statusTypes from '../configs/statusTypes.js';

const boardSize = { width: 600, height: 600 };
const style = Math.min(window.innerWidth, window.innerHeight) - 40;
const boardStyleSize = { width: style, height: style };

export default class Game {

    constructor({ canvasElement, rowCount = 15, colCount = 15 }) {
        this.canvas = new Canvas({
            canvasElement,
            size: boardSize,
            style: boardStyleSize,
        });
        this.input = new Input({ canvasElement, boardStyleSize, boardSize });


        const gridSize = {
            width: boardSize.width / colCount,
            height: boardSize.height / rowCount,
        };
        this.background = new Background({ size: boardSize });
        this.board = new Board({ size: boardSize, colCount, rowCount, gridSize });
        this.pieces = new Pieces({ boardSize, gridSize });
        this.cursor = new Cursor({ gridSize, boardSize });


        this.layers = [
            layerTypes.CANVAS,
            layerTypes.BACKGROUND,
            layerTypes.BOARD,
            layerTypes.PIECES,
            layerTypes.CURSOR,
        ];

        this.status = statusTypes.UNSET;

        this.tick();
    }

    tick() {
        requestAnimationFrame(() => {
            this.layers.map((layerType) => {
                events.emit(eventTypes.GAME.RENDER, { layerType, ctx: this.canvas, pieces: this.pieces.getPieces() })
            });
            this.tick();
            events.emit(eventTypes.GAME.TICK, {
                dt: Date.now(),
            });
        })
    }

}
