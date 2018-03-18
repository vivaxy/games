/**
 * @since 2018-03-11 10:05:13
 * @author vivaxy
 */

// import './lib/debug.js';
import Game from './lib/Game.js';

const canvasElement = document.querySelector('.js-canvas');
const restartButton = document.querySelector('.js-restart');
const statusContainer = document.querySelector('.js-status');
const buttonsContainer = document.querySelector('.js-buttons');
new Game({ canvasElement, restartButton, statusContainer, buttonsContainer }).start();
