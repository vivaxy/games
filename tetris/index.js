/**
 * @since 2019-09-22 05:26
 * @author vivaxy
 * tickLoop Timeline
 *        ↓
 * Game = Tetromino + Grid + GameState + Score   ←   Input
 *        ↑
 * Render Timeline
 */
import EventEmitter from 'https://unpkg.com/@vivaxy/framework/class/event-emitter.js';
import game from './services/game.js';
import render from './services/render.js';
import tetrominos from './services/tetrominos.js';
import tickLoop from './services/tick-loop.js';
import input from './services/input.js';

const ee = new EventEmitter();

game.init(ee);
render.init(ee);
tetrominos.init(ee);
tickLoop.init(ee);
input.init(ee);

setTimeout(function() {
  game.start();
}, 0);
