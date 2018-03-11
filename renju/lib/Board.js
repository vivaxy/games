/**
 * @since 2018-03-11 10:20:12
 * @author vivaxy
 */

import events from './events.js';
import * as eventTypes from '../configs/eventTypes.js';
import * as statusTypes from '../configs/statusTypes.js';

export default class Board {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.render();
        this.listen();
    }

    render() {
        const boardContainer = document.createElement('div');
        events.emit(eventTypes.GAME.RENDER, {
            rect: boardContainer,
            styles: { width: 100, height: 100 },
        });
        this.boardContainer = boardContainer;
    }

    listen() {
        this.boardContainer.addEventListener('click', () => {

        });
    }
}
