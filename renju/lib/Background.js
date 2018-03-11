/**
 * @since 2018-03-11 14:18:00
 * @author vivaxy
 */

import events from './events.js';
import * as eventTypes from '../configs/eventTypes.js';
import * as layerTypes from '../configs/layerTypes.js';

export default class Background {
    constructor({ size } = {}) {
        this.size = size;
        events.on(eventTypes.GAME.RENDER, ({ layerType, ctx }) => {
            if (layerType === layerTypes.BACKGROUND) {
                this.render({ ctx });
            }
        });
    }

    render({ ctx }) {
    }
}
