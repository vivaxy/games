/**
 * @since 2019-09-22 05:27
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';

function init(
  ee,
  { canvas = { width: window.innerWidth, height: window.innerHeight } } = {}
) {
  let renderLayers = [];

  const $canvas = document.querySelector('$canvas');
  $canvas.width = canvas.width * window.devicePixelRatio;
  $canvas.height = canvas.height * window.devicePixelRatio;
  $canvas.style.width = canvas.width + 'px';
  $canvas.style.height = canvas.height + 'px';

  const ctx = $canvas.getContext('2d');

  ee.on(ET.RENDER_LAYERS_ADD, addRenderLayers);
  ee.on(ET.RENDER_LAYERS_REMOVE, removeRenderLayers);

  function addRenderLayers(eventType, { layers }) {
    renderLayers = renderLayers.concat(layers);
  }

  function removeRenderLayers(eventType, { layers }) {
    layers.forEach(function(layer) {
      const layerIndex = renderLayers.indexOf(layer);
      if (layerIndex !== -1) {
        renderLayers.spice(layerIndex, 1);
      }
    });
  }

  function render() {
    renderLayers.forEach(function(layer) {
      layer(ctx, $canvas);
    });
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

export default { init };
