/**
 * @since 2018-03-11 16:09:00
 * @author vivaxy
 */

import events from './events.js';
import * as eventTypes from '../configs/eventTypes.js';
import { mapIndexToCoords } from './utils.js';

const offset = 6;
const length = 10;
const lineWidth = 3;

export default class Cursor {
    constructor({ gridSize, boardSize } = {}) {
        this.gridSize = gridSize;
        this.boardSize = boardSize;
        this.x = null;
        this.y = null;
        events.on(eventTypes.INPUT.HOVER, ({ x, y }) => {
            this.snapIntoGrid({ x, y });
        });
        events.on(eventTypes.INPUT.HOVER_OUT, () => {
            this.x = null;
            this.y = null;
        });
    }

    snapIntoGrid({ x, y }) {
        const colIndex = Math.floor((x + (this.boardSize.width / 2)) / this.gridSize.width);
        const rowIndex = Math.floor((-y + (this.boardSize.height / 2)) / this.gridSize.height);
        const { x: _x, y: _y } = mapIndexToCoords({
            colIndex,
            rowIndex,
            boardSize: this.boardSize,
            gridSize: this.gridSize
        });
        this.x = _x;
        this.y = _y;
    }

    getLayerRender() {
        return (ctx) => {
            const { x, y } = this;
            if (x === null || y === null) {
                return;
            }
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
        };
    }
}
