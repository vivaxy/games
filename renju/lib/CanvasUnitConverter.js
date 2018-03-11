/**
 * @since 2018-03-11 10:58:39
 * @author vivaxy
 */

export default class CanvasUnitConverter {

    constructor({
                    canvas: { width = 100, height = 100 } = {},
                    ratio = 1,
                } = {}) {
        this.canvas = { width, height };
        this.ratio = ratio;
    }

    cartesianToCanvasCoords({ x, y }) {
        return { x, y };
    }

    cartesianToCanvasAngle({ x, y }) {

    }

}
