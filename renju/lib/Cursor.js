/**
 * @since 2018-03-11 16:09:00
 * @author vivaxy
 */

import events from './events.js';
import * as eventTypes from '../configs/eventTypes.js';
import * as layerTypes from '../configs/layerTypes.js';
import { mapIndexToCoords } from './utils.js';

const offset = 6;
const length = 10;
const lineWidth = 3;

export default class Cursor {
    constructor({ gridSize, boardSize } = {}) {
        this.gridSize = gridSize;
        this.boardSize = boardSize;
        this.colIndex = null;
        this.rowIndex = null;
        events.on(eventTypes.INPUT.HOVER, ({ x, y }) => {
            this.snapIntoGrid({ x, y });
        });
        events.on(eventTypes.INPUT.HOVER_OUT, () => {
            this.colIndex = null;
            this.rowIndex = null;
        });
        events.on(eventTypes.GAME.RENDER, ({ layerType, ctx, pieces }) => {
            if (layerType === layerTypes.CURSOR) {
                this.render({ ctx, pieces });
            }
        });
    }

    snapIntoGrid({ x, y }) {
        const colIndex = Math.floor((x + (this.boardSize.width / 2)) / this.gridSize.width);
        const rowIndex = Math.floor((-y + (this.boardSize.height / 2)) / this.gridSize.height);
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
    }

    render({ ctx, pieces }) {
        const { colIndex, rowIndex } = this;
        if (rowIndex === null || colIndex === null) {
            return;
        }
        if (pieces.some(({ colIndex: _col, rowIndex: _row }) => {
                return colIndex === _col && rowIndex === _row;
            })) {
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
