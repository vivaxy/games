/**
 * @since 2018-03-11 10:05:13
 * @author vivaxy
 */

// import './lib/debug.js';
import Game from './lib/Game.js';
import * as pieceTypes from './configs/pieceTypes.js';
import * as statusTypes from './configs/statusTypes.js';
import base64 from './vendor/base64.js';

const canvasElement = document.querySelector('.js-canvas');
const statusContainer = document.querySelector('.js-status');
const buttonsContainer = document.querySelector('.js-buttons');

const defaultStatus = {
  status: statusTypes.READY,
  pieceType: pieceTypes.WHITE,
  pieces: [],
  boardSize: { rowCount: 15, colCount: 15 },
};

const getPreloadStatus = () => {
  const { searchParams } = new URL(location.href);
  const preloadStatus = searchParams.get('status');
  if (preloadStatus) {
    try {
      return Game.parseGameStatus(JSON.parse(base64.decode(preloadStatus)));
    } catch (ex) {
      return defaultStatus;
    }
  }
  return defaultStatus;
};

const { status, pieceType, pieces, boardSize: { rowCount, colCount } } = getPreloadStatus();
new Game({
  canvasElement,
  statusContainer,
  buttonsContainer,
  rowCount,
  colCount,
  status,
  pieceType,
  pieces,
}).start();
