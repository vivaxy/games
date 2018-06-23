/**
 * @since 2018-06-23 08:59:14
 * @author vivaxy
 */

import * as eventTypes from '../enums/event-types.js';

function init(events) {

  const statusEl = document.querySelector('.js-game-status');

  statusEl.addEventListener('click', onToggleStatus);

  let playing = false;
  statusEl.disabled = false;
  setElText();

  function onToggleStatus() {
    playing = !playing;
    setElText();
    events.emit(eventTypes.APPLY_GAME_STATUS, { playing });
  }

  function setElText() {
    if (playing) {
      statusEl.innerHTML = 'Stop';
    } else {
      statusEl.innerHTML = 'Play';
    }
  }

}

export default { init };
