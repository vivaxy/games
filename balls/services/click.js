/**
 * @since 20180824 14:00
 * @author vivaxy
 */

function init(canvas, onLeftClick, onRightClick) {
  canvas.addEventListener('click', onLeftClick);
  canvas.addEventListener('contextmenu', onRightClick);
}

export default { init }
