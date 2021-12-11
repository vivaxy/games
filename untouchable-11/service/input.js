/**
 * @since 2021-12-11
 * @author vivaxy
 */
function getBlockIndex($element, $root) {
  while ($element && $root.contains($element)) {
    if ($element.classList.contains('block') && $element.dataset.index) {
      return Number($element.dataset.index);
    }
    $element = $element.parentElement;
  }
  return -1;
}

let movingBlockIndex = -1;
let blockStartPosition = { x: 0, y: 0 };
let mouseStartPosition = { x: 0, y: 0 };

function getPosition(e, $root) {
  return {
    x: e.clientX - $root.offsetLeft, y: e.clientY - $root.offsetTop,
  };
}

function init($root, blocks) {
  $root.addEventListener('mousedown', function(e) {
    movingBlockIndex = getBlockIndex(e.target, $root);
    blockStartPosition = blocks.getPositionByBlockIndex(movingBlockIndex);
    mouseStartPosition = getPosition(e, $root);
  });
  $root.addEventListener('mousemove', function(e) {
    if (movingBlockIndex === -1) {
      return;
    }
    const mousePosition = getPosition(e, $root);
    blocks.setPositionByBlockIndex(movingBlockIndex, {
      x: blockStartPosition.x + mousePosition.x - mouseStartPosition.x,
      y: blockStartPosition.y + mousePosition.y - mouseStartPosition.y,
    });
    e.preventDefault();
  });
  $root.addEventListener('mouseup', function(e) {
    movingBlockIndex = -1;
  });
}

export { init };
