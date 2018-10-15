/**
 * @since 150116 18:14
 * @author vivaxy
 */

import jiugongge from './lib/jiugongge.js'
const log = document.querySelector('.console');

jiugongge.init({
  prizeImages: ['images/grid/prize0.png', 'images/grid/prize0.png', 'images/grid/prize0.png',
    'images/grid/prize0.png', 'images/grid/ready.png', 'images/grid/prize0.png',
    'images/grid/prize0.png', 'images/grid/prize0.png', 'images/grid/prize0.png'],
  coverImages: 'images/grid/cover.png',
  interval: 100,
});

jiugongge.bindMessage('START', function() {
  log.innerHTML += '点了开始<br>';
});

jiugongge.bindMessage('DISTURBED', function() {
  log.innerHTML += '打乱了<br>';
});

jiugongge.bindMessage('REVEAL', function() {
  log.innerHTML += '抽奖翻牌<br>';
});

jiugongge.bindMessage('REVEALED', function() {
  log.innerHTML += '动画结束<br>';
});

window.start = function() {
  jiugongge.start('images/grid/prize1.png', function() {
    log.innerHTML += '抽奖结果已展示<br>';
  });
};

window.reset = function() {
  jiugongge.reset();
};
