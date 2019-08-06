/**
 * @since 2017-03-17 13:57:46
 * @author vivaxy
 */

import EventEmitter from 'https://unpkg.com/event-based-framework/class/event-emitter.js';
import tickLoopService from './services/tick-loop.js';
import canvasService from './services/canvas.js';
import renderService from './services/render.js';

import stageService from './services/stage.js';
import bricksService from './services/bricks.js';
import ballsService from './services/balls.js';
import plateService from './services/plate.js';
import plateControlDesktopService from './services/plate-control/desktop.js';
import plateControlMobileService from './services/plate-control/mobile.js';

import ballSplitEffectService from './services/effects/ball-split.js';
import plateExtendEffectService from './services/effects/plate-extend.js';

import collisionService from './services/collision.js';

import gameService from './services/game.js';

const ee = new EventEmitter();

canvasService.init(ee);

stageService.init(ee);
bricksService.init(ee);
ballsService.init(ee);
plateService.init(ee);
plateControlDesktopService.init(ee);
plateControlMobileService.init(ee);

ballSplitEffectService.init(ee);
plateExtendEffectService.init(ee);

collisionService.init(ee);
renderService.init(ee);

tickLoopService.init(ee);

gameService.init(ee);
