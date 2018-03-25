/**
 * @since 2018-03-11 16:09:00
 * @author vivaxy
 */

import events from './events.js';
import * as eventTypes from '../configs/eventTypes.js';
import * as layerTypes from '../configs/layerTypes.js';
import { mapIndexToCoords } from './utils.js';

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

    [
      [
        [x + offset, y + offset + length],
        [x + offset, y + offset],
        [x + offset + length, y + offset],
      ],
      [
        [x + offset + length, y - offset],
        [x + offset, y - offset],
        [x + offset, y - offset - length],
      ],
      [
        [x - offset, y - offset - length],
        [x - offset, y - offset],
        [x - offset - length, y - offset],
      ],
      [
        [x - offset - length, y + offset],
        [x - offset, y + offset],
        [x - offset, y + offset + length],
      ],
    ].map(([moveTo, lineTo1, lineTo2]) => {
      ctx.beginPath();
      ctx.moveTo(...moveTo);
      ctx.lineTo(...lineTo1);
      ctx.lineTo(...lineTo2);
      ctx.stroke();
    });
  }
}
