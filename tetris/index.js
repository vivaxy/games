/**
 * @since 2019-09-22 05:26
 * @author vivaxy
 */

import EventEmitter from 'https://unpkg.com/@vivaxy/framework/class/event-emitter.js';
import * as ET from './enums/event-types.js';
import game from './services/game.js';
import gameState from './services/game-state.js';
import render from './services/render.js';
import renderGrid from './services/render-grid.js';
import renderCells from './services/render-cells.js';
import movingCells from './services/moving-cells.js';
import tickLoop from './services/tick-loop.js';

const ee = new EventEmitter();

game.init(ee);
gameState.init(ee);
render.init(ee);
renderGrid.init(ee);
renderCells.init(ee);
movingCells.init(ee);
tickLoop.init(ee);

setTimeout(function() {
  ee.emit(ET.GAME_START);
}, 1000);
