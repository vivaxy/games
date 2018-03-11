/**
 * @since 2018-03-11 10:58:39
 * @author vivaxy
 * @todo refactor to a more common UnitConverter
 *  passing pointA, pointB, to get Mapped pointA and pointB
 */

export default class UnitConverter {

    /**
     *
     *  @param cartesian
     *      @param width
     *      @param height
     *  @param canvas
     *      @param width
     *      @param height
     */
    constructor({
                    cartesian: { width: cartesianWidth = 0, height: cartesianHeight = 0 } = {},
                    canvas: { width: canvasWidth = 0, height: canvasHeight = 0 } = {},
                } = {}) {
        this.canvas = { width: canvasWidth, height: canvasHeight };
        this.cartesian = { width: cartesianWidth, height: cartesianHeight };
        this.__cache__halfCanvasWidth = canvasWidth / 2;
        this.__cache__halfCanvasHeight = canvasHeight / 2;
        this.__cache__cartesianToCanvasWidthRatio = canvasWidth / cartesianWidth;
        this.__cache__cartesianToCanvasHeightRatio = canvasHeight / cartesianHeight;
    }

    cartesianToCanvasCoords({ x, y }) {
        const {
            __cache__halfCanvasWidth,
            __cache__halfCanvasHeight,
            __cache__cartesianToCanvasWidthRatio,
            __cache__cartesianToCanvasHeightRatio,
        } = this;
        const _x = (x * __cache__cartesianToCanvasWidthRatio) + __cache__halfCanvasWidth;
        const _y = __cache__halfCanvasHeight - (y * __cache__cartesianToCanvasHeightRatio);
        return { x: _x, y: _y };
    }

    cartesianToCanvasLength({ width = 0, height = 0 }) {
        const { __cache__cartesianToCanvasWidthRatio, __cache__cartesianToCanvasHeightRatio } = this;
        return {
            width: width * __cache__cartesianToCanvasWidthRatio,
            height: height * __cache__cartesianToCanvasHeightRatio,
        };
    }

    cartesianToCanvasAngle(angle) {
        return -angle;
    }

    canvasToCartesianCoords({ x, y }) {
        const {
            __cache__halfCanvasWidth,
            __cache__halfCanvasHeight,
            __cache__cartesianToCanvasWidthRatio,
            __cache__cartesianToCanvasHeightRatio,
        } = this;
        const _x = (x - __cache__halfCanvasWidth) / __cache__cartesianToCanvasWidthRatio;
        const _y = (__cache__halfCanvasHeight - y) / __cache__cartesianToCanvasHeightRatio;
        return { x: _x, y: _y };
    }

    canvasToCartesianAngle(angle) {
        return -angle;
    }

    canvasToCartesianLength({ width = 0, height = 0 }) {
        const { __cache__cartesianToCanvasWidthRatio, __cache__cartesianToCanvasHeightRatio } = this;
        return {
            width: width / __cache__cartesianToCanvasWidthRatio,
            height: height / __cache__cartesianToCanvasHeightRatio,
        }
    }

    getCanvasSize() {
        return this.canvas;
    }

    getCartesianSize() {
        return this.cartesian;
    }

}
