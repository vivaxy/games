/**
 * @since 2019-09-24 02:14
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';
import * as GS from '../enums/game-state.js';
import * as TS from '../enums/tetromino-state.js';
import * as DIRECTIONS from '../enums/directions.js';
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
  ee.on(ET.TETROMINO_RIGHT, handleTetrominoRight);
  ee.on(ET.TETROMINO_ROTATE, handleTetrominoRotate);
  ee.on(ET.TETROMINO_DOWN, handleTetrominoDown);

  function handleStateChange({ to }) {
    switch (true) {
      case to === GS.GAME_OVER:
        alert('Game Over!');
        state.reset();
        break;
      case to === GS.NEW_GAME:
        grid.reset();
        score.reset();
        speed.reset();
        setTimeout(function() {
          state.start();
        }, 1000);
        break;
    }
  }

  function handleTetrominoStateChange({ to }) {
    switch (to) {
      case TS.MOVING:
        tetromino.createTetromino(grid);
        grid.addTetromino(tetromino);
        break;
      case TS.SETTLED:
        if (speed.toOriginalSpeed) {
          speed.toOriginalSpeed();
        }
        if (tetromino.isOnTopBorder()) {
          state.over();
        } else {
          score.add(1);
        }
        break;
      case TS.DROPPING:
        speed.toMaxSpeed();
        break;
    }
  }

  function handleEliminating() {
    if (speed.isNextFrame()) {
      const { scoreToAdd } = grid.eliminateRows();
      score.add(scoreToAdd);
      state.continue();
      return;
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
          if (tetromino.canMove(grid, DIRECTIONS.DOWN)) {
            grid.removeTetromino(tetromino);
            tetromino.move(DIRECTIONS.DOWN);
            grid.addTetromino(tetromino);
          } else {
            tetromino.settle();
            grid.computeEliminatingRows();
            if (grid.getEliminatingRows().length) {
              state.eliminate();
            }
          }
        }
        break;
      case TS.SETTLED:
        tetromino.create();
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
    if (tetromino.canMove(grid, DIRECTIONS.LEFT)) {
      grid.removeTetromino(tetromino);
      tetromino.move(DIRECTIONS.LEFT);
      grid.addTetromino(tetromino);
    }
  }

  function handleTetrominoRight() {
    if (tetromino.canMove(grid, DIRECTIONS.RIGHT)) {
      grid.removeTetromino(tetromino);
      tetromino.move(DIRECTIONS.RIGHT);
      grid.addTetromino(tetromino);
    }
  }

  function handleTetrominoRotate() {
    grid.removeTetromino(tetromino);
    tetromino.rotate(grid);
    grid.addTetromino(tetromino);
  }
}

export default {
  init,
  start() {
    state.start();
  },
};
