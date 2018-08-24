/**
 * @since 20180824 13:52
 * @author vivaxy
 */

function render(ctx) {
  ctx.font = 16 * window.devicePixelRatio + 'px serif';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Left click: add ball. Right click: remove ball.', 0, 0);
}

export default { render }
