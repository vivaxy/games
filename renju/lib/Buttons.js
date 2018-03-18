/**
 * @since 2018-03-18 11:16:41
 * @author vivaxy
 */

import events from '../lib/events.js';
import * as eventTypes from '../configs/eventTypes.js';

class Buttons {

    static get buttonTypes() {
        return {
            RESTART: 'RESTART',
            UNDO: 'UNDO',
        };
    }

    constructor({ style, container }) {
        this.container = container;
        this.style = style;

        this.buttons = [
            {
                type: Buttons.buttonTypes.RESTART,
                selector: '.js-restart',
                eventType: eventTypes.INPUT.BUTTON_RESTART,
            },
            {
                type: Buttons.buttonTypes.UNDO,
                selector: '.js-undo',
                eventType: eventTypes.INPUT.BUTTON_UNDO,
            },
        ].map(({ type, selector, eventType }) => {
            return { type, selector, eventType, element: this.container.querySelector(selector) };
        });
        this.initializeStyle();
        this.bindEvents();
    }

    initializeStyle() {
        this.container.style.width = this.style.width + 'px';
        this.container.style.height = this.style.height + 'px';
    }

    bindEvents() {
        this.buttons.map(({ element, eventType }) => {
            element.addEventListener('click', () => {
                events.emit(eventType);
            });
        });
    }

    setDisabled(type, disabled = true) {
        const button = this.buttons.find((b) => {
            return b.type === type;
        });
        if (!button) {
            throw new Error('button of ' + type + ' type not found.');
        }
        if (disabled) {
            if (!button.element.hasAttribute('disabled')) {
                button.element.setAttribute('disabled', '');
            }
        } else {
            if (button.element.hasAttribute('disabled')) {
                button.element.removeAttribute('disabled');
            }
        }
    }
}

export default Buttons;
