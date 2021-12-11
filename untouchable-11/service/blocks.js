/**
 * @since 2021-12-11
 * @author vivaxy
 */
import Board from '../class/board.js';
import Block from '../class/block.js';

const blockStructures = [
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

const blockColors = [
  '#FF9C9C',
  '#FFD19C',
  '#FFEDA4',
  '#E8FFA4',
  '#C5FFA4',
  '#A4FFEA',
  '#A4CEFF',
  '#B0A4FF',
  '#F3A4FF',
  '#FFA4CA',
  '#FFA4A4',
];

const board = new Board({ rowCount: 12, colCount: 12 });
const blocks = blockStructures.map(function(blockStructure, index) {
  return new Block(blockStructure, blockColors[index], index);
});

function init($root) {
  $root.appendChild(board.$element);
  blocks.forEach(function(block) {
    $root.appendChild(block.$element);
  });
}

function getPositionByBlockIndex(blockIndex) {
  return blocks[blockIndex].getPosition();
}

function setPositionByBlockIndex(blockIndex, position) {
  blocks[blockIndex].setPosition(position);
}

export { init, getPositionByBlockIndex, setPositionByBlockIndex };
