/**
 * @since 20180417 16:52
 * @author vivaxy
 */

import EventEmitter from 'https://unpkg.com/event-based-framework/class/event-emitter.js';

import gameCore from './services/game-core.js';
import canvas from './services/canvas.js';
import tickLoop from './services/tick-loop.js';
import gameStatus from './services/game-status.js';
import speedControl from './services/speed-control.js';
import dimensionControl from './services/dimension-control.js';
import patterns from './services/patterns.js';

import * as eventTypes from './enums/event-types.js';
import glider from './services/patterns/glider.js';
import block from './services/patterns/block.js';

const events = new EventEmitter();

gameCore.init(events);
canvas.init(events);
tickLoop.init(events);
gameStatus.init(events);
speedControl.init(events);
dimensionControl.init(events);
patterns.init(events);

// init game with a glider and started
events.emit(eventTypes.APPLY_PATTERN, { pattern: glider });
events.emit(eventTypes.ON_CANVAS_CLICK, { x: 0, y: 0 });
events.emit(eventTypes.APPLY_PATTERN, { pattern: block });
