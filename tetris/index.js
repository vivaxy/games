/**
 * @since 2019-09-22 05:26
 * @author vivaxy
 */

import EventEmitter from 'https://unpkg.com/@vivaxy/framework/class/event-emitter.js';
import * as ET from './enums/event-types.js';
import game from './services/game.js';
import gameState from './services/game-state.js';
import render from './services/render.js';
import tickLoop from './services/tick-loop.js';

const ee = new EventEmitter();

game.init(ee);
gameState.init(ee);
render.init(ee);
tickLoop.init(ee);

ee.emit(ET.GAME_START);
