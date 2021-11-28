/**
 * @since 2021-11-28
 * @author vivaxy
 */
function createMatrix(rowCount, colCount) {
  return Array.from({ length: rowCount }, function() {
    return Array.from({ length: colCount }, function() {
      return 0;
    });
  });

}

const grid = createMatrix(20, 20);
const blocks = [
  [
    [1, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 1],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [1, 1, 0],
    [1, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [1, 1, 0],
    [1, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 0, 0, 1],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 1, 0],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
  ],
];

function div(classname) {
  const $div = document.createElement('div');
  if (classname) {
    $div.classList.add(classname);
  }
  return $div;
}

function drawBlock(block) {
  const $block = div('block');
  for (const row of block) {
    const $row = div('row');
    for (const cell of row) {
      const $cell = div('cell');
      $cell.dataset.value = cell;
      $row.appendChild($cell);
    }
    $block.appendChild($row);
  }
  $block.draggable = true;
  return $block;
}

blocks.forEach(function(block) {
  const $block = drawBlock(block);
  document.getElementById('root').appendChild($block);
});
