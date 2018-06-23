/**
 * @since 2018-06-23 09:38:22
 * @author vivaxy
 */

import * as eventTypes from '../enums/event-types.js';

function init(events) {

  let dimension = 50; // pixel per unit
  const updateRatio = 2;

  const dimensionUpEl = document.querySelector('.js-dimension-up');
  const dimensionDownEl = document.querySelector('.js-dimension-down');
  const dimensionValueEl = document.querySelector('.js-dimension-value');

  dimensionUpEl.addEventListener('click', onDimensionUpElClick);
  dimensionDownEl.addEventListener('click', onDimensionDownElClick);

  updateDimensionValue();

  function onDimensionUpElClick() {
    const newDimension = dimension * updateRatio;
    events.emit(eventTypes.APPLY_DIMENSION, { prevDimension: dimension, dimension: newDimension });
    dimension = newDimension;
    updateDimensionValue();
  }

  function onDimensionDownElClick() {
    const newDimension = dimension / updateRatio;
    events.emit(eventTypes.APPLY_DIMENSION, { prevDimension: dimension, dimension: newDimension });
    dimension = newDimension;
    updateDimensionValue();
  }

  function updateDimensionValue() {
    if (dimensionValueEl) {
      dimensionValueEl.innerHTML = String(dimension);
    }
  }

  events.emit(eventTypes.APPLY_DIMENSION, { prevDimension: null, dimension });

}

export default { init };
