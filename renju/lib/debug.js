/**
 * @since 2018-03-11 20:08:34
 * @author vivaxy
 */

import events from './events.js';
import * as eventTypes from '../configs/eventTypes.js';

events.on(eventTypes.GAME.SWITCH_STATUS, (eventData) => {
  console.log(eventData);
});
