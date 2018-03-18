/**
 * @since 2018-03-18 11:16:41
 * @author vivaxy
 */

export default class Buttons {
    constructor({ style, container }) {
        this.container = container;
        this.style = style;
        this.initializeStyle();
    }

    initializeStyle() {
        this.container.style.width = this.style.width + 'px';
        this.container.style.height = this.style.height + 'px';
    }

}
