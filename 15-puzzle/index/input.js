import EventEmitter from 'https://unpkg.com/event-based-framework/class/event-emitter.js';

import { directions, events, browserEvents } from './configs.js';

const getCoords = (canvas, e) => {
  const { clientX, clientY } = e.changedTouches ? e.changedTouches[0] : e;
  const { left, top, width, height } = canvas.getBoundingClientRect();
  return {
    x: ((clientX - left) * canvas.width) / width,
    y: ((clientY - top) * canvas.height) / height,
  };
};

export default class Input extends EventEmitter {
  constructor({ canvas }) {
    super();

    this.start = (e) => {
      const point = getCoords(canvas, e);
      this.resetPoint(point);
    };

    this.move = (e) => {
      const point = getCoords(canvas, e);
      this.pointX = point.x;
      this.pointY = point.y;
      this.tryMove();
    };

    this.end = () => {
      this.resetPoint(this.invalidPoint);
      this.emit(events.RESET_SPACE_TILE);
    };

    this.click = (e) => {
      this.emit(events.CLICK, getCoords(canvas, e));
    };

    this.resize = () => {
      this.emit(events.RESIZE_CANVAS);
    };

    this.orientationChange = () => {
      this.emit(events.RESIZE_CANVAS);
    };

    this.canvas = canvas;

    this.invalidPoint = { x: null, y: null };
    this.resetPoint(this.invalidPoint);

    this.initialize();
  }

  initialize() {
    const { canvas } = this;
    const element = document.body;
    element.addEventListener(browserEvents.TOUCH_START, this.start, {
      passive: true,
    });
    element.addEventListener(browserEvents.TOUCH_MOVE, this.move, {
      passive: true,
    });
    element.addEventListener(browserEvents.TOUCH_END, this.end, {
      passive: true,
    });
    element.addEventListener(browserEvents.TOUCH_CANCEL, this.end, {
      passive: true,
    });
    canvas.addEventListener(browserEvents.CLICK, this.click, { passive: true });
    window.addEventListener(browserEvents.RESIZE, this.resize, {
      passive: true,
    });
    window.addEventListener(
      browserEvents.ORIENTATION_CHANGE,
      this.orientationChange,
      { passive: true },
    );
  }

  getDirection() {
    const xMovement = Math.abs(this.startPointX - this.pointX);
    const yMovement = Math.abs(this.startPointY - this.pointY);
    if (xMovement > yMovement) {
      if (this.pointX - this.startPointX > 0) {
        return directions.RIGHT;
      } else {
        return directions.LEFT;
      }
    } else {
      if (this.pointY - this.startPointY > 0) {
        return directions.DOWN;
      } else {
        return directions.UP;
      }
    }
  }

  tryMove() {
    const xMovement = this.pointX - this.startPointX;
    const yMovement = this.pointY - this.startPointY;
    const point = {
      deltaX: xMovement,
      deltaY: yMovement,
      x: this.pointX,
      y: this.pointY,
    };
    const direction = this.getDirection();
    this.emit(events.TRY_MOVE, { direction, point });
  }

  setStartPoint({ x = this.startPointX, y = this.startPointY }) {
    this.startPointX = x;
    this.startPointY = y;
  }

  moveStartPoint({ x, y }) {
    this.startPointX += x;
    this.startPointY += y;
  }

  resetPoint({ x, y }) {
    this.startPointX = x;
    this.startPointY = y;
    this.pointX = x;
    this.pointY = y;
  }
}
