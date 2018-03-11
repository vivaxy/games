/**
 * @since 2018-03-11 15:42:25
 * @author vivaxy
 */

import events from './events.js';
import * as eventTypes from '../configs/eventTypes.js';
import * as pieceTypes from '../configs/pieceTypes.js';
import * as layerTypes from '../configs/layerTypes.js';
import { mapIndexToCoords } from './utils.js';

export default class Pieces {
    constructor({ gridSize, boardSize } = {}) {
        this.boardSize = boardSize;
        this.gridSize = gridSize;
        const size = Math.min(this.gridSize.width, this.gridSize.height) / 2 - 4;
        this.size = { width: size, height: size };
        /**
         *
         *  @param colIndex
         *  @param rowIndex
         *  @param type
         */
        this.pieces = [
            {
                colIndex: 1,
                rowIndex: 0,
                type: pieceTypes.WHITE,
            },
            {
                colIndex: 2,
                rowIndex: 2,
                type: pieceTypes.BLACK,
            }
        ];
        events.on(eventTypes.GAME.RENDER, ({ layerType, ctx }) => {
            if (layerType === layerTypes.PIECES) {
                this.render({ ctx });
            }
        });
        events.on(eventTypes.INPUT.CLICK, () => {

        });
    }

    getPieces() {
        return this.pieces;
    }

    render({ ctx }) {
        const { width: radius } = this.size;
        return this.pieces.map(({ colIndex, rowIndex, type }) => {
            if (type === pieceTypes.BLACK) {
                ctx.fillStyle = '#000000';
            } else {
                ctx.fillStyle = '#ffffff';
            }
            const { x, y } = mapIndexToCoords({
                colIndex,
                rowIndex,
                gridSize: this.gridSize,
                boardSize: this.boardSize
            });
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            // border
            if (type === pieceTypes.BLACK) {
                ctx.strokeStyle = '#ffffff';
            } else {
                ctx.strokeStyle = '#000000';
            }
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.stroke();
        });
    }
}
