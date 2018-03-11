/**
 * @since 2018-03-11 16:09:00
 * @author vivaxy
 */

import events from './events.js';
import * as eventTypes from '../configs/eventTypes.js';
import * as layerTypes from '../configs/layerTypes.js';
import { mapIndexToCoords, mapCoordsToIndex } from './utils.js';

const offset = 4;
const length = 8;
const lineWidth = 2;

export default class Cursor {
    constructor({ gridSize, boardSize } = {}) {
        this.gridSize = gridSize;
        this.boardSize = boardSize;
        this.colIndex = null;
        this.rowIndex = null;
        events.on(eventTypes.CURSOR.PLACE_CURSOR, ({ colIndex, rowIndex }) => {
            this.colIndex = colIndex;
            this.rowIndex = rowIndex;
        });
        events.on(eventTypes.GAME.RENDER, ({ layerType, ctx }) => {
            if (layerType === layerTypes.CURSOR) {
                this.render({ ctx });
            }
        });
    }

    render({ ctx }) {
        const { colIndex, rowIndex } = this;
        if (rowIndex === null || colIndex === null) {
            return;
        }
        const { x, y } = mapIndexToCoords({
            colIndex,
            rowIndex,
            boardSize: this.boardSize,
            gridSize: this.gridSize
        });
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(x + offset, y + offset + length);
        ctx.lineTo(x + offset, y + offset);
        ctx.lineTo(x + offset + length, y + offset);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + offset + length, y - offset);
        ctx.lineTo(x + offset, y - offset);
        ctx.lineTo(x + offset, y - offset - length);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - offset, y - offset - length);
        ctx.lineTo(x - offset, y - offset);
        ctx.lineTo(x - offset - length, y - offset);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - offset - length, y + offset);
        ctx.lineTo(x - offset, y + offset);
        ctx.lineTo(x - offset, y + offset + length);
        ctx.stroke();
    }
}
