/**
 * @since 2018-03-11 10:46:34
 * @author vivaxy
 */

import events from './events.js';
import UnitConverter from './UnitConverter.js';
import * as eventTypes from '../configs/eventTypes.js';
import * as layerTypes from '../configs/layerTypes.js';

export default class Canvas {
    /**
     *
     *  @param canvasElement
     *  @param size
     *      @param width
     *      @param height
     *  @param style
     *      @param width
     *      @param height
     */
    constructor({
                    canvasElement,
                    size: { width: sizeWidth, height: sizeHeight } = {},
                    style: { width: styleWidth, height: styleHeight } = {},
                }) {
        this.canvasElement = canvasElement;
        this.rawCtx = canvasElement.getContext('2d');
        this.size = { width: sizeWidth, height: sizeHeight };
        this.style = { width: styleWidth, height: styleHeight };
        const devicePixelRatio = window.devicePixelRatio;
        this.unitConverter = new UnitConverter({
            canvas: { width: sizeWidth * devicePixelRatio, height: sizeHeight * devicePixelRatio },
            cartesian: this.size,
        });
        this.initializeStyle();
        events.on(eventTypes.GAME.RENDER, ({ layerType }) => {
            if (layerType === layerTypes.CANVAS) {
                this._clear();
            }
        });
    }

    initializeStyle() {
        const { width, height } = this.unitConverter.getCanvasSize();
        this.canvasElement.width = width;
        this.canvasElement.height = height;
        this.canvasElement.style.width = this.style.width + 'px';
        this.canvasElement.style.height = this.style.height + 'px';
    }

    _clear() {
        const { width, height } = this.unitConverter.getCartesianSize();
        this.clearRect(-width / 2, height / 2, width, height);
    }

    // canvas APIs
    _rectAPIs(_x, _y, _width, _height) {
        const { width, height } = this.unitConverter.cartesianToCanvasLength({ width: _width, height: _height });
        return [...this._coordsAPIs(_x, _y), width, height];
    }

    _coordsAPIs(_x, _y) {
        const { x, y } = this.unitConverter.cartesianToCanvasCoords({ x: _x, y: _y });
        return [x, y];
    }

    clearRect(x, y, width, height) {
        this.rawCtx.clearRect(...this._rectAPIs(x, y, width, height));
    }

    rect(x, y, width, height) {
        this.rawCtx.rect(...this._rectAPIs(x, y, width, height));
    }

    fill() {
        this.rawCtx.fill();
    }

    stroke() {
        this.rawCtx.stroke();
    }

    strokeRect(x, y, width, height) {
        this.rawCtx.strokeRect(...this._rectAPIs(x, y, width, height));
    }

    beginPath() {
        this.rawCtx.beginPath();
    }

    moveTo(x, y) {
        this.rawCtx.moveTo(...this._coordsAPIs(x, y));
    }

    arc(_x, _y, radius, startAngle, endAngle, clockwise) {
        const { x, y } = this.unitConverter.cartesianToCanvasCoords({ x: _x, y: _y });
        const { width, height } = this.unitConverter.cartesianToCanvasLength({ width: radius, height: radius });
        this.rawCtx.ellipse(x, y, width, height, 0, this.unitConverter.cartesianToCanvasAngle(startAngle), this.unitConverter.cartesianToCanvasAngle(endAngle), clockwise);
    }

    lineTo(x, y) {
        this.rawCtx.lineTo(...this._coordsAPIs(x, y));
    }

    set fillStyle(colorPattern) {
        this.rawCtx.fillStyle = colorPattern;
    }

    set strokeStyle(colorPattern) {
        this.rawCtx.strokeStyle = colorPattern;
    }

    set lineWidth(value) {
        const { width } = this.unitConverter.cartesianToCanvasLength({ width: value });
        this.rawCtx.lineWidth = width;
    }
}
