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
      SAVE: 'SAVE',
      UNDO: 'UNDO',
    };
  }

  constructor({ style, container }) {
    this.container = container;
    this.style = style;

    this.buttons = [
      {
        type: Buttons.buttonTypes.RESTART,
        eventType: eventTypes.INPUT.BUTTON_RESTART,
        text: 'Restart',
      },
      {
        type: Buttons.buttonTypes.SAVE,
        eventType: eventTypes.INPUT.BUTTON_SAVE,
        text: 'Save',
      },
      {
        type: Buttons.buttonTypes.UNDO,
        eventType: eventTypes.INPUT.BUTTON_UNDO,
        text: 'Undo',
      },
    ].map(({ type, eventType, text }) => {
      const button = document.createElement('button');
      button.textContent = text;
      button.disabled = true;
      button.classList.add('button');
      this.container.appendChild(button);
      return { type, element: button, eventType };
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
