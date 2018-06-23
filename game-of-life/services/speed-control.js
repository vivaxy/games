/**
 * @since 2018-06-23 09:25:53
 * @author vivaxy
 */

import * as eventTypes from '../enums/event-types.js';

function init(events) {

  let speed = 0.01; // 0.001 frame per millisecond
  const updateRatio = 2;

  const speedUpEl = document.querySelector('.js-speed-up');
  const speedDownEl = document.querySelector('.js-speed-down');
  const speedValueEl = document.querySelector('.js-speed-value');

  speedUpEl.addEventListener('click', onSpeedUpElClick);
  speedDownEl.addEventListener('click', onSpeedDownElClick);
  updateSpeedValue();

  function onSpeedUpElClick() {
    const newSpeed = speed * updateRatio;
    events.emit(eventTypes.APPLY_SPEED, { prevSpeed: speed, speed: newSpeed });
    speed = newSpeed;
    updateSpeedValue();
  }

  function onSpeedDownElClick() {
    const newSpeed = speed / updateRatio;
    events.emit(eventTypes.APPLY_SPEED, { prevSpeed: speed, speed: newSpeed });
    speed = newSpeed;
    updateSpeedValue();
  }

  function updateSpeedValue() {
    if (speedValueEl) {
      speedValueEl.innerHTML = String(speed);
    }
  }

  events.emit(eventTypes.APPLY_SPEED, { prevSpeed: null, speed: speed });

}

export default { init };
