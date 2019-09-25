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
import renderGrid from './services/render-grid.js';
import renderTetrominos from './services/render-tetrominos.js';
import renderScore from './services/render-score.js';
import tetrominos from './services/tetrominos.js';
import tickLoop from './services/tick-loop.js';
import input from './services/input.js';

const ee = new EventEmitter();

game.init(ee);
render.init(ee);
renderGrid.init(ee);
renderTetrominos.init(ee);
renderScore.init(ee);
tetrominos.init(ee);
tickLoop.init(ee);
input.init(ee);

setTimeout(function() {
  game.gameStateMachine.start();
}, 0);
