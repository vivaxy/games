/**
 * @since 2019-09-22 05:27
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';

function init(
  ee,
  { canvas = { width: window.innerWidth, height: window.innerHeight } } = {}
) {
  const $canvas = document.querySelector('canvas');
  $canvas.width = canvas.width * window.devicePixelRatio;
  $canvas.height = canvas.height * window.devicePixelRatio;
  $canvas.style.width = canvas.width + 'px';
  $canvas.style.height = canvas.height + 'px';

  const ctx = $canvas.getContext('2d');

  function render() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    ee.emit(ET.RENDER, { ctx, canvas: $canvas });
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

export default { init };
