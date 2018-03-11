/**
 * @since 2018-03-11 10:46:34
 * @author vivaxy
 */

export default class Canvas {
    constructor({
                    canvasElement,
                    size: { width: sizeWidth = 100, height: sizeHeight = 100 } = {},
                    style: { width: styleWidth = 100, height: styleHeight = 100 } = {},
                }) {
        this.canvasElement = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.size = { width: sizeWidth, height: sizeHeight };
        this.style = { width: styleWidth, height: styleHeight };
    }

    _clear() {
        this.ctx.clearRect();
    }

    render(layers) {
        this._clear();
        layers.forEach(() => {

        });
    }
}
