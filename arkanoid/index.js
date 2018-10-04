/**
 * @since 2017-03-17 13:57:46
 * @author vivaxy
 */

import EventEmitter from '../_framework/class/event-emitter.js';
import tickLoopService from './services/tick-loop.js';
import canvasService from './services/canvas.js';
import renderService from './services/render.js';

import gameContainerService from './services/game-container.js';
import bricksService from './services/bricks.js';
import ballsService from './services/balls.js';

import collisionService from './services/collision.js';

const ee = new EventEmitter();

canvasService.init(ee);

gameContainerService.init(ee);
bricksService.init(ee);
ballsService.init(ee);

renderService.init(ee, canvasService.getCanvas());
collisionService.init(ee, ballsService.getBalls(), canvasService.getCanvas(), bricksService.getBricks());

tickLoopService.init(ee);
