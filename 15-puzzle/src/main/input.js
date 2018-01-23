import { EventEmitter } from 'eventemitter3';

import { directions, events, browserEvents, mapPointToCanvas } from './configs';

const inputStatusValues = {
    TOUCH_UP: 0,
    TOUCH_DOWN: 1,
};

const getCoords = (e) => {
    if (e.changedTouches) {
        return {
            x: mapPointToCanvas(e.changedTouches[0].clientX - e.target.offsetLeft),
            y: mapPointToCanvas(e.changedTouches[0].clientY - e.target.offsetTop)
        };
    }
    return {
        x: mapPointToCanvas(e.clientX - e.target.offsetLeft),
        y: mapPointToCanvas(e.clientY - e.target.offsetTop)
    };
};

export default class Input extends EventEmitter {
    constructor({ canvas }) {
        super();
        this.canvas = canvas;

        this.inputStatus = inputStatusValues.TOUCH_UP;
        this.inverse = true;
        this.invalidPoint = { x: null, y: null };
        this.resetPoint(this.invalidPoint);

        this.initialize();
    }

    initialize() {
        const { canvas } = this;
        const element = document.body;
        element.addEventListener(browserEvents.TOUCH_START, this.start, { passive: true });
        element.addEventListener(browserEvents.TOUCH_MOVE, this.move, { passive: true });
        element.addEventListener(browserEvents.TOUCH_END, this.end, { passive: true });
        element.addEventListener(browserEvents.TOUCH_CANCEL, this.end, { passive: true });
        canvas.addEventListener(browserEvents.CLICK, this.click, { passive: true });
        window.addEventListener(browserEvents.RESIZE, this.resize, { passive: true });
        window.addEventListener(browserEvents.ORIENTATION_CHANGE, this.orientationChange, { passive: true });
    }

    getDirection() {
        const xMovement = Math.abs(this.startPointX - this.pointX);
        const yMovement = Math.abs(this.startPointY - this.pointY);
        if (xMovement > yMovement) {
            if (this.pointX - this.startPointX > 0) {
                return this.inverse ? directions.RIGHT : directions.LEFT;
            } else {
                return this.inverse ? directions.LEFT : directions.RIGHT;
            }
        } else {
            if (this.pointY - this.startPointY > 0) {
                return this.inverse ? directions.DOWN : directions.UP;
            } else {
                return this.inverse ? directions.UP : directions.DOWN;
            }
        }
    }

    tryMove() {
        const xMovement = this.pointX - this.startPointX;
        const yMovement = this.pointY - this.startPointY;
        const point = { deltaX: xMovement, deltaY: yMovement, x: this.pointX, y: this.pointY };
        const direction = this.getDirection();
        this.emit(events.TRY_MOVE, direction, point);
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

    start = (e) => {
        this.inputStatus = inputStatusValues.TOUCH_DOWN;
        const point = getCoords(e);
        this.resetPoint(point);
    };

    move = (e) => {
        const point = getCoords(e);
        this.pointX = point.x;
        this.pointY = point.y;
        this.tryMove();
    };

    end = (e) => {
        this.inputStatus = inputStatusValues.TOUCH_UP;
        this.resetPoint(this.invalidPoint);
        this.emit(events.RESET_SPACE_TILE);
    };

    click = (e) => {
        this.emit(events.CLICK, getCoords(e));
    };

    resize = () => {
        this.emit(events.RESIZE_CANVAS);
    };

    orientationChange = () => {
        this.emit(events.RESIZE_CANVAS);
    };
};
