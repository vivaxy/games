/**
 * @since 2018-10-15 17:25:46
 * @author vivaxy
 */

import Query from 'https://unpkg.com/event-based-framework/class/query.js';

const formatter = (v) => {
  const r = parseInt(v);
  if (Number.isNaN(r)) {
    return 3;
  }
  if (r <= 0) {
    return 3;
  }
  return r;
};

const query = new Query({
  params: [
    {
      name: 'colCount',
      format: formatter,
    },
    {
      name: 'rowCount',
      format: formatter,
    },
  ],
});

const container = document.createElement('div');
container.classList.add('container');

for (let rowIndex = 0; rowIndex < query.rowCount; rowIndex++) {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let colIndex = 0; colIndex < query.colCount; colIndex++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.classList.add('on');
    block.dataset.rowIndex = String(rowIndex);
    block.dataset.colIndex = String(colIndex);
    block.style.width = (window.innerWidth / query.colCount) + 'px';
    block.style.height = (window.innerHeight / query.rowCount) + 'px';
    block.addEventListener('click', createHandleBlockClick);
    row.appendChild(block);
  }
  container.appendChild(row);
}

document.body.appendChild(container);

function createHandleBlockClick(e) {
  e.target.classList.toggle('on');
  const rowIndex = Number(e.target.dataset.rowIndex);
  const colIndex = Number(e.target.dataset.colIndex);
  [
    { row: -1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
  ].forEach(({ row, col }) => {
    const block = document.querySelector(`div.block[data-row-index="${rowIndex + row}"][data-col-index="${colIndex + col}"]`);
    if (block) {
      block.classList.toggle('on');
    }
  });

  if (checkWin()) {
    alert('You Win!');
    Array.from(document.querySelectorAll('div.block')).forEach((block) => {
      block.classList.add('on');
    });
  }
}

function checkWin() {
  return Array.from(document.querySelectorAll('div.block')).every((block) => {
    return !block.classList.contains('on');
  });
}
