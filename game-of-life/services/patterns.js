/**
 * @since 2018-06-23 11:29:36
 * @author vivaxy
 */

import * as eventTypes from '../enums/event-types.js';

import dot from './patterns/dot.js';
import block from './patterns/block.js';
import beehive from './patterns/beehive.js';
import loaf from './patterns/loaf.js';
import boat from './patterns/boat.js';
import tub from './patterns/tub.js';
import blinker from './patterns/blinker.js';
import toad from './patterns/toad.js';
import beacon from './patterns/beacon.js';
import pulsar from './patterns/pulsar.js';
import pentadecathlon from './patterns/pentadecathlon.js';
import glider from './patterns/glider.js';
import lightweightSpaceShip from './patterns/lightweight-spaceship.js';
import theRPentomino from './patterns/the-r-pentomino.js';
import diehard from './patterns/diehard.js';
import acorn from './patterns/acorn.js';

function init(events) {
  const patterns = {
    // still lifes
    'Dot': dot,
    'Block': block,
    'Beehive': beehive,
    'Loaf': loaf,
    'Boat': boat,
    'Tub': tub,

    // oscillators
    'Blinker': blinker,
    'Toad': toad,
    'Beacon': beacon,
    'Pulsar': pulsar,
    'Pentadecathlon': pentadecathlon,

    // spaceships
    'Glider': glider,
    'Lightweight spaceship': lightweightSpaceShip,

    // methuselahs
    'The R-pentomino': theRPentomino,

    // etc
    'Diehard': diehard,
    'Acorn': acorn,
  };

  const selectEl = document.querySelector('.js-pattern-select');

  Object.keys(patterns).forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.innerHTML = name;
    selectEl.appendChild(option);
  });

  selectEl.addEventListener('change', onPatternSelect);

  function onPatternSelect(e) {
    const pattern = patterns[e.target.value];
    if (pattern) {
      events.emit(eventTypes.APPLY_PATTERN, { pattern });
    }
  }

  events.emit(eventTypes.APPLY_PATTERN, { pattern: dot });
}

export default { init };
