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
import * as pieceTypes from '../configs/pieceTypes.js';
import { mapCoordsToIndex } from './utils.js';

const boardSize = { width: 600, height: 600 };
const style = Math.min(window.innerWidth, window.innerHeight) - 40;
const boardStyleSize = { width: style, height: style };

export default class Game {

    constructor({ canvasElement, rowCount = 15, colCount = 15, restartButton, statusContainer }) {
        this.statusContainer = statusContainer;

        this.canvas = new Canvas({
            canvasElement,
            size: boardSize,
            style: boardStyleSize,
        });
        this.input = new Input({ canvasElement, boardStyleSize, boardSize, restartButton });


        const gridSize = {
            width: boardSize.width / colCount,
            height: boardSize.height / rowCount,
        };
        this.background = new Background({ size: boardSize });
        this.board = new Board({ size: boardSize, colCount, rowCount, gridSize });
        this.pieces = new Pieces({ boardSize, gridSize, initialType: pieceTypes.WHITE, colCount, rowCount });
        this.cursor = new Cursor({ gridSize, boardSize });


        this.layers = [
            layerTypes.CANVAS,
            layerTypes.BACKGROUND,
            layerTypes.BOARD,
            layerTypes.PIECES,
            layerTypes.CURSOR,
        ];

        this.status = statusTypes.READY;

        events.on(eventTypes.GAME.SWITCH_STATUS, ({ status }) => {
            switch (status) {
                case statusTypes.READY:
                    if (this.status === statusTypes.OVER) {
                        this.pieces.reset();
                        this.status = statusTypes.READY;
                    }
                    break;
                case statusTypes.WAITING_MY_ACTION:
                    if (this.status === statusTypes.READY) {
                        // first piece
                        this.status = statusTypes.WAITING_MY_ACTION;
                    } else if (this.status === statusTypes.WAITING_OP_ACTION) {
                        this.status = statusTypes.WAITING_MY_ACTION;
                        this.pieces.switchPieceType();
                    }
                    break;
                case statusTypes.WAITING_OP_ACTION:
                    if (this.status === statusTypes.READY || this.status === statusTypes.WAITING_MY_ACTION) {
                        this.status = statusTypes.WAITING_OP_ACTION;
                        this.pieces.switchPieceType();
                    }
                    break;
                case statusTypes.OVER:
                    if (this.status === statusTypes.WAITING_MY_ACTION || this.status === statusTypes.WAITING_OP_ACTION) {
                        this.status = statusTypes.OVER;
                    }
                    break;
                default:
                    throw new Error('Undefined statusType: ' + status);
            }
            this.updateGameStatus();
        });

        events.on(eventTypes.INPUT.HOVER, ({ x, y }) => {
            const { colIndex, rowIndex } = mapCoordsToIndex({ x, y, gridSize, boardSize });
            if (this.pieces.pieceExists({ colIndex, rowIndex })) {
                events.emit(eventTypes.CURSOR.PLACE_CURSOR, { colIndex: null, rowIndex: null });
            } else {
                events.emit(eventTypes.CURSOR.PLACE_CURSOR, { colIndex, rowIndex });
            }
        });
        events.on(eventTypes.INPUT.HOVER_OUT, () => {
            events.emit(eventTypes.CURSOR.PLACE_CURSOR, { colIndex: null, rowIndex: null });
        });
        events.on(eventTypes.INPUT.CLICK, ({ x, y }) => {
            if ([statusTypes.READY, statusTypes.WAITING_OP_ACTION, statusTypes.WAITING_MY_ACTION].includes(this.status)) {
                const { colIndex, rowIndex } = mapCoordsToIndex({ x, y, boardSize, gridSize });
                if (!this.pieces.pieceExists({ colIndex, rowIndex })) {
                    this.pieces.addPiece({
                        colIndex,
                        rowIndex,
                        type: this.pieces.getPieceType(),
                    });
                    if (this.pieces.checkWin()) {
                        events.emit(eventTypes.GAME.SWITCH_STATUS, { status: statusTypes.OVER });
                    } else {
                        events.emit(eventTypes.GAME.SWITCH_STATUS, { status: this.status === statusTypes.WAITING_MY_ACTION ? statusTypes.WAITING_OP_ACTION : statusTypes.WAITING_MY_ACTION });
                    }
                }
            }
        });

        events.on(eventTypes.INPUT.RESTART, () => {
            this.restart();
        });

        this.tick();
    }

    tick() {
        requestAnimationFrame(() => {
            this.layers.map((layerType) => {
                events.emit(eventTypes.GAME.RENDER, { layerType, ctx: this.canvas })
            });
            this.tick();
            events.emit(eventTypes.GAME.TICK, {
                dt: Date.now(),
            });
        });
    }

    start() {
        events.emit(eventTypes.GAME.SWITCH_STATUS, { status: statusTypes.WAITING_MY_ACTION });
    }

    restart() {
        events.emit(eventTypes.GAME.SWITCH_STATUS, { status: statusTypes.READY });
        this.start();
    }

    updateGameStatus() {
        let text = 'Undefined status';
        switch (this.status) {
            case statusTypes.READY:
                text = 'Ready!';
                break;
            case statusTypes.WAITING_MY_ACTION:
            case statusTypes.WAITING_OP_ACTION:
                text = this.pieces.getPieceType() === pieceTypes.WHITE ? 'White turn' : 'Black turn';
                break;
            case statusTypes.OVER:
                text = this.pieces.getPieceType() === pieceTypes.WHITE ? 'White win!' : 'Black win!';
                break;
        }
        this.statusContainer.innerHTML = text;
    }

}
