import { EventEmitter } from 'eventemitter3';

import { movementThreshold, directions, events } from './configs';

const inputStatusValues = {
    TOUCH_UP: 0,
    TOUCH_DOWN: 1,
};

const getCoords = (e) => {
    if (e.changedTouches) {
        return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
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
        canvas.addEventListener('touchstart', this.start);
        canvas.addEventListener('touchmove', this.move);
        canvas.addEventListener('touchend', this.end);
        canvas.addEventListener('touchcancel', this.end);
    }

    tryMove() {
        const xMovement = Math.abs(this.startPointX - this.pointX);
        const yMovement = Math.abs(this.startPointY - this.pointY);
        const point = { x: this.pointX, y: this.pointY };
        if (xMovement > yMovement) {
            if (xMovement > movementThreshold) {
                // left or right
                if (this.pointX - this.startPointX > 0) {
                    this.emit(events.MOVE, this.inverse ? directions.RIGHT : directions.LEFT, point);
                    this.resetPoint(point);
                } else {
                    this.emit(events.MOVE, this.inverse ? directions.LEFT : directions.RIGHT, point);
                    this.resetPoint(point);
                }
            }
        } else {
            if (yMovement > movementThreshold) {
                // up or down
                if (this.pointY - this.startPointY > 0) {
                    this.emit(events.MOVE, this.inverse ? directions.DOWN : directions.UP, point);
                    this.resetPoint(point);
                } else {
                    this.emit(events.MOVE, this.inverse ? directions.UP : directions.DOWN, point);
                    this.resetPoint(point);
                }
            }
        }
    }

    resetPoint(point) {
        this.startPointX = point.x;
        this.startPointY = point.y;
        this.pointX = point.x;
        this.pointY = point.y;
    }

    start = (e) => {
        this.inputStatus = inputStatusValues.TOUCH_DOWN;
        const point = getCoords(e);
        this.resetPoint(point);
    };

    move = (e) => {
        e.stopPropagation();
        const point = getCoords(e);
        this.pointX = point.x;
        this.pointY = point.y;
        this.tryMove();
    };

    end = (e) => {
        this.inputStatus = inputStatusValues.TOUCH_UP;
        this.resetPoint(this.invalidPoint);
    };
};
