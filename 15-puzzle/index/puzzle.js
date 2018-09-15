import {
  tileSize,
  tileTypes,
  events,
  movementThreshold,
  tileSpacing,
  size,
  buttonTypes,
  directions,
  puzzleStatusCodes,
  browserEvents,
} from './configs.js';

import Grid from './puzzle/grid.js';
import Tile from './puzzle/tile.js';
import Buttons from './puzzle/buttons.js';
import Timer from './puzzle/timer.js';
import Stepper from './puzzle/stepper.js';
import Copyright from './puzzle/copyright.js';

const whenDirection = (direction) => {
  return (options) => {
    return Object.keys(options).map((directionKey) => {
      if (directionKey.toUpperCase() === direction) {
        return options[directionKey]();
      }
    });
  };
};

export default class Puzzle {
  constructor({ ctx, row, col, input }) {
    this.ctx = ctx;
    this.row = row;
    this.col = col;
    this.input = input;

    this.grid = new Grid({ ctx });
    this.buttons = new Buttons({ ctx });
    this.timer = new Timer({ ctx });
    this.stepper = new Stepper({ ctx });
    this.copyright = new Copyright({ ctx });

    this.tileList = this.initializeTileList();
    this.initializeInput();
    this.buttons.enable([buttonTypes.SCRAMBLE]);
    this.puzzleStatus = puzzleStatusCodes.SCRAMBLING;

  }

  initializeInput() {
    const scoreContainer = document.querySelector('.js-score-container');

    this.input.on(events.TRY_MOVE, (eventType, { direction, point }) => {
      if ([puzzleStatusCodes.SCRAMBLING, puzzleStatusCodes.WINNING].includes(this.puzzleStatus)) {
        return;
      }
      this.tryMove(direction, point);
      whenDirection(direction)({
        left: () => {
          if (point.deltaX < -movementThreshold) {
            this.move(direction, point);
          }
        },
        up: () => {
          if (point.deltaY < -movementThreshold) {
            this.move(direction, point);
          }
        },
        right: () => {
          if (point.deltaX > movementThreshold) {
            this.move(direction, point);
          }
        },
        down: () => {
          if (point.deltaY > movementThreshold) {
            this.move(direction, point);
          }
        },
      });
    });
    this.input.on(events.RESET_SPACE_TILE, () => {
      const tile = this.findSpaceTile();
      tile.animateToResetPosition();
    });
    this.input.on(events.CLICK, (eventType, point) => {
      const buttonAction = this.buttons.hitButton(point);
      switch (buttonAction) {
        case buttonTypes.SCRAMBLE:
          this.puzzleStatus = puzzleStatusCodes.SCRAMBLING;
          this.timer.reset();
          this.stepper.reset();
          this.scramble();
          this.puzzleStatus = puzzleStatusCodes.READY;
          this.buttons.enable([buttonTypes.SCRAMBLE]);
          return;
        case buttonTypes.SHOW_SCORE:
          scoreContainer.style.display = 'flex';
          this.buttons.enable([buttonTypes.SHOW_SCORE]);
          return;
      }
      if (this.copyright.hit(point)) {
        location.href = 'https://vivaxyblog.github.io/';
      }
    });

    scoreContainer.addEventListener(browserEvents.TOUCH_START, (e) => {
      e.stopPropagation();
    }, { passive: true });
    scoreContainer.addEventListener(browserEvents.TOUCH_MOVE, (e) => {
      e.stopPropagation();
    }, { passive: true });
    scoreContainer.addEventListener(browserEvents.TOUCH_END, (e) => {
      e.stopPropagation();
    }, { passive: true });
    scoreContainer.addEventListener(browserEvents.TOUCH_CANCEL, (e) => {
      e.stopPropagation();
    }, { passive: true });
    scoreContainer.addEventListener(browserEvents.CLICK, () => {
      scoreContainer.style.display = 'none';
    });
  }

  initializeTileList() {
    const { ctx, col, row } = this;
    const width = tileSize;
    const height = tileSize;
    return Array.from({ length: row }, (rowItem, rowIndex) => {
      return Array.from({ length: col }, (colItem, colIndex) => {
        return new Tile({
          ctx: ctx,
          width,
          height,
          colIndex,
          rowIndex,
          text: String(rowIndex * row + colIndex + 1),
          type: colIndex === col - 1 && rowIndex === row - 1 ? tileTypes.SPACE : tileTypes.NORMAL,
        });
      });
    });
  }

  tryMove(direction, point) {
    const tile = this.findSpaceTile();
    if (tile.colIndex >= size - 1 && point.deltaX > 0) {
      this.input.setStartPoint({ x: tile.x });
      point.deltaX = 0;
    }
    if (tile.colIndex <= 0 && point.deltaX < 0) {
      this.input.setStartPoint({ x: tile.x });
      point.deltaX = 0;
    }
    if (tile.rowIndex <= 0 && point.deltaY < 0) {
      this.input.setStartPoint({ y: tile.y });
      point.deltaY = 0;
    }
    if (tile.rowIndex >= size - 1 && point.deltaY > 0) {
      this.input.setStartPoint({ y: tile.y });
      point.deltaY = 0;
    }
    tile.deltaX = point.deltaX;
    tile.deltaY = point.deltaY;
  }

  swapTiles({ rowIndex: fromRowIndex, colIndex: fromColIndex }, { rowIndex: toRowIndex, colIndex: toColIndex }) {
    const fromTile = this.tileList[fromRowIndex][fromColIndex]; // space tile
    const toTile = this.tileList[toRowIndex][toColIndex]; // the other tile

    // swap
    this.tileList[fromRowIndex][fromColIndex] = toTile;
    this.tileList[toRowIndex][toColIndex] = fromTile;
    fromTile.rowIndex = toRowIndex;
    fromTile.colIndex = toColIndex;
    toTile.rowIndex = fromRowIndex;
    toTile.colIndex = fromColIndex;

    const deltaX = fromTile.deltaX;
    const deltaY = fromTile.deltaY;
    fromTile.deltaX = (fromColIndex - toColIndex) * (tileSize + tileSpacing) + deltaX;
    fromTile.deltaY = (fromRowIndex - toRowIndex) * (tileSize + tileSpacing) + deltaY;
    toTile.deltaX = (toColIndex - fromColIndex) * (tileSize + tileSpacing);
    toTile.deltaY = (toRowIndex - fromRowIndex) * (tileSize + tileSpacing);
    toTile.animateToResetPosition();
    this.input.moveStartPoint({
      x: (toColIndex - fromColIndex) * (tileSize + tileSpacing),
      y: (toRowIndex - fromRowIndex) * (tileSize + tileSpacing),
    });
    if (this.puzzleStatus === puzzleStatusCodes.READY) {
      this.timer.start();
      this.puzzleStatus = puzzleStatusCodes.STARTED;
    }
    if (this.puzzleStatus === puzzleStatusCodes.STARTED) {
      this.stepper.update();
      this.checkWinning();
    }
  }

  move(direction, point) {
    const { rowIndex, colIndex } = this.findSpaceTile();
    whenDirection(direction)({
      left: () => {
        if (colIndex <= 0) {
          this.input.resetPoint(point);
          return;
        }
        // move left
        this.swapTiles({ rowIndex, colIndex }, { rowIndex, colIndex: colIndex - 1 });
      },
      up: () => {
        if (rowIndex <= 0) {
          this.input.resetPoint(point);
          return;
        }
        // move up
        this.swapTiles({ rowIndex, colIndex }, { rowIndex: rowIndex - 1, colIndex });
      },
      right: () => {
        if (colIndex >= this.col - 1) {
          this.input.resetPoint(point);
          return;
        }
        // move right
        this.swapTiles({ rowIndex, colIndex }, { rowIndex, colIndex: colIndex + 1 });
      },
      down: () => {
        if (rowIndex >= this.row - 1) {
          this.input.resetPoint(point);
          return;
        }
        // move down
        this.swapTiles({ rowIndex, colIndex }, { rowIndex: rowIndex + 1, colIndex });
      },
    });
  }

  findSpaceTile() {
    const { tileList } = this;
    return tileList.reduce((result, tileRow) => {
      return result || tileRow.reduce((tileResult, tile) => {
        if (tile.type === tileTypes.SPACE) {
          return tile;
        }
        return tileResult;
      }, null);
    }, null);
  }

  render() {
    const { grid, tileList, buttons, timer, stepper, copyright } = this;
    const renders = tileList.reduce(({ list: accRowList, spaceTile: accRowSpaceTile }, tileRow) => {
      const { list: rowList, spaceTile: rowSpaceTile } = tileRow.reduce(({ list, spaceTile }, tile) => {
        if (tile.type !== tileTypes.SPACE) {
          return { list: [...list, tile], spaceTile };
        } else {
          return { list, spaceTile: tile };
        }
      }, { list: [], spaceTile: null });
      return { list: [...accRowList, ...rowList], spaceTile: accRowSpaceTile || rowSpaceTile };
    }, { list: [], spaceTile: null });
    grid.render();
    renders.spaceTile.render();
    renders.list.map((tile) => {
      tile.render();
    });
    buttons.render();
    timer.render();
    stepper.render();
    copyright.render();
  }

  update() {
    this.tileList.forEach((tileRow) => {
      tileRow.forEach((tile) => {
        tile.update();
      });
    });
    this.timer.update();
  }

  scramble() {
    const directionKeys = Object.keys(directions);
    Array.from({ length: 1000 }, () => {
      return directions[directionKeys[Math.floor(Math.random() * directionKeys.length)]];
    }).map((direction) => {
      return this.move(direction, { x: 0, y: 0 });
    });
    const tile = this.findSpaceTile();
    tile.animateToResetPosition();
  }

  checkWinning() {
    const { row } = this;
    const winning = this.tileList.every((tileRow, rowIndex) => {
      return tileRow.every((tile, colIndex) => {
        return Number(tile.text) === rowIndex * row + colIndex + 1;
      });
    });
    if (winning) {
      this.puzzleStatus = puzzleStatusCodes.WINNING;
      this.timer.stop();
    }
  }
}
