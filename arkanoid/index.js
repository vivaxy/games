/**
 * @since 2017-03-17 13:57:46
 * @author vivaxy
 */

import * as E from './enums/event-types.js';
import EventEmitter from '../_framework/class/event-emitter.js';
import tickLoop from './services/tick-loop.js';
import balls from './services/balls.js';
import canvas from './services/canvas.js';

const e = new EventEmitter();
canvas.init();
e.on(E.TICK, canvas.clear);
balls.init({ e, ctx: canvas.getCtx() });
tickLoop.init({ e });
