/**
 * @since 2018-03-11 14:38:09
 * @author vivaxy
 */

import events from './events.js';
import * as eventTypes from '../configs/eventTypes.js';
import UnitConverter from './UnitConverter.js';
import { getCoords } from './utils.js';

export default class Input {
  constructor({ canvasElement, boardStyleSize, boardSize }) {
    this.canvasElement = canvasElement;
    this.boardSize = boardSize;
    this.unitConverter = new UnitConverter({
      canvas: boardStyleSize,
      cartesian: boardSize
    });
    this.listen();
  }

  listen() {
    this.canvasElement.addEventListener('mousemove', (e) => {
      events.emit(eventTypes.INPUT.HOVER, this.unitConverter.canvasToCartesianCoords(getCoords(e)));
    });
    this.canvasElement.addEventListener('mouseout', () => {
      events.emit(eventTypes.INPUT.HOVER_OUT);
    });
    this.canvasElement.addEventListener('click', (e) => {
      events.emit(eventTypes.INPUT.CLICK, this.unitConverter.canvasToCartesianCoords(getCoords(e)));
    });
  }
}
