/**
 * @since 2019-09-24 08:11
 * @author vivaxy
 */
import * as ET from '../enums/event-types.js';
import * as sizes from '../helpers/sizes.js';

function init(ee) {
  const LOCAL_SRORAGE_KEY_HIGH_SCORE = 'tetris-high-score';
  let highScore =
    Number(localStorage.getItem(LOCAL_SRORAGE_KEY_HIGH_SCORE)) || 0;
  let score = 0;
  let speed = 0;
  ee.on(ET.SCORE_UPDATE, updateScore);
  ee.on(ET.SPEED_UPDATE, updateSpeed);

  ee.emit(ET.RENDER_LAYERS_ADD, {
    layers: [
      function render(ctx, canvas) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#333';
        ctx.font = sizes.gridBorderWidth + 'px monospace';
        ctx.fillText(
          `High Score: ${highScore} Score: ${score} Speed: ${speed}`,
          canvas.width / 2,
          canvas.height - 3
        );
      },
    ],
  });

  function updateScore(et, { score: _score }) {
    score = _score;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem(LOCAL_SRORAGE_KEY_HIGH_SCORE, highScore);
    }
  }

  function updateSpeed(et, { speed: _speed }) {
    speed = Math.ceil(100 - _speed);
  }
}

export default { init };
