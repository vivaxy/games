/**
 * @since 2019-09-24 02:14
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';
import * as GS from '../enums/game-state.js';
import * as TS from '../enums/tetromino-state.js';
import StateMachine from '../class/state-machine.js';
import Grid from '../class/grid.js';
import Score from '../class/score.js';
import Tetromino from '../class/tetromino.js';
import Speed from '../class/speed.js';

const state = new StateMachine({
  default: GS.NEW_GAME,
  start: [GS.NEW_GAME, GS.PLAYING],
  eliminate: [GS.PLAYING, GS.ELIMINATING],
  continue: [GS.ELIMINATING, GS.PLAYING],
  pause: [GS.PLAYING, GS.PAUSED],
  resume: [GS.PAUSED, GS.PLAYING],
  over: [GS.PLAYING, GS.GAME_OVER],
  reset: [GS.GAME_OVER, GS.NEW_GAME],
});

function init(ee) {
  const grid = new Grid();
  const score = new Score();
  const tetromino = new Tetromino();
  const speed = new Speed();

  state.onChange(handleStateChange);
  tetromino.onStateChange(handleTetrominoStateChange);
  ee.on(ET.TICK, handleTick);
  ee.on(ET.RENDER, handleRender);
  ee.on(ET.TETROMINO_LEFT, handleTetrominoLeft);
  ee.on(ET.TETROMINO_ROTATE, handleTetrominoRight);
  ee.on(ET.TETROMINO_DOWN, handleTetrominoDown);

  function handleStateChange({ from, to }) {
    switch (true) {
      case to === GS.GAME_OVER:
        const restart = confirm('Game Over! Restart?');
        if (restart) {
          state.reset();
        }
        break;
      case to === GS.NEW_GAME:
        grid.reset();
        score.reset();
        speed.reset();
        setTimeout(function() {
          state.start();
        }, 1000);
        break;
      case to === GS.PLAYING && from === GS.ELIMINATING:
        const { scoreToAdd } = grid.eliminate(grid);
        score.add(scoreToAdd);
        break;
      case to === GS.PLAYING && from === GS.NEW_GAME:
        tetromino.create();
        break;
    }
  }

  function handleTetrominoStateChange({ from, to }) {
    switch (to) {
      case TS.MOVING:
        if (speed.toOriginalSpeed) {
          speed.toOriginalSpeed();
        }
        tetromino.createTetromino(grid);
        grid.addTetromino(tetromino);
        break;
      case TS.SETTLED:
        if (tetromino.isOnTopBorder()) {
          game.over();
        } else {
          tetromino.create();
        }
        break;
      case TS.DROPPING:
        speed.toMaxSpeed();
        break;
    }
  }

  function handleEliminating() {
    if (speed.isNextFrame()) {
      grid.eliminateRows();
      game.continue();
    }
    const eliminatingRows = grid.getEliminatingRows();
    if (eliminatingRows.length) {
      eliminatingRows.forEach(function(rowIndex) {
        grid.get()[rowIndex].forEach(function(item) {
          if (item._color) {
            item.color = item._color;
            delete item._color;
          } else {
            item._color = item.color;
            item.color = '#fff';
          }
        });
      });
    }
  }

  function handlePlaying() {
    switch (tetromino.getState()) {
      case TS.DROPPING:
      case TS.MOVING:
        if (speed.isNextFrame()) {
          speed.clearTick();
          if (tetromino.canMove(grid)) {
            grid.removeTetromino(tetromino);
            tetromino.move();
            grid.addTetromino(tetromino);
          } else {
            tetromino.settle();
            grid.computeEliminatingRows();
            if (grid.getEliminatingRows().length) {
              game.eliminate();
            }
          }
        }
        break;
    }
  }

  function handleTick() {
    if (state.getState() === GS.ELIMINATING) {
      handleEliminating();
    } else if (GS.PLAYING) {
      handlePlaying();
    }
  }

  function handleRender(et, { ctx, canvas }) {
    grid.render(ctx, canvas);
    score.render(ctx, canvas, speed.get());
  }

  function handleTetrominoDown() {
    if (tetromino.getState() === TS.MOVING) {
      tetromino.drop();
    }
  }

  function handleTetrominoLeft() {
    grid.removeTetromino(tetromino);
    tetromino.move(-1, 0);
    grid.addTetromino(tetromino);
  }

  function handleTetrominoRight() {
    grid.removeTetromino(tetromino);
    tetromino.move(1, 0);
    grid.addTetromino(tetromino);
  }
}

export default {
  init,
  start() {
    state.start();
  },
};
