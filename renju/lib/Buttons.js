/**
 * @since 2018-03-18 11:16:41
 * @author vivaxy
 */

import events from '../lib/events.js';
import * as eventTypes from '../configs/eventTypes.js';

export default class Buttons {
    constructor({ style, container }) {
        this.container = container;
        this.style = style;
        this.initializeStyle();
        this.bindEvents();
    }

    initializeStyle() {
        this.container.style.width = this.style.width + 'px';
        this.container.style.height = this.style.height + 'px';
    }

    bindEvents() {
        this.container.querySelector('.js-restart').addEventListener('click', () => {
            events.emit(eventTypes.INPUT.BUTTON_RESTART);
        });
        this.container.querySelector('.js-undo').addEventListener('click', () => {
            events.emit(eventTypes.INPUT.BUTTON_UNDO);
        });
    }
}
