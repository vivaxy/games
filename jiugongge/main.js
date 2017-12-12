/**
 * @since 150116 18:14
 * @author vivaxy
 */
var log = document.querySelector('.console');

jiugongge.init({
  prizeImages: ['image/grid/prize0.png', 'image/grid/prize0.png', 'image/grid/prize0.png',
    'image/grid/prize0.png', 'image/grid/ready.png', 'image/grid/prize0.png',
    'image/grid/prize0.png', 'image/grid/prize0.png', 'image/grid/prize0.png'],
  coverImages: 'image/grid/cover.png',
  interval: 100
});

jiugongge.bindMessage('START', function () {
  log.innerHTML += '点了开始<br>';
});

jiugongge.bindMessage('DISTURBED', function () {
  log.innerHTML += '打乱了<br>';
});

jiugongge.bindMessage('REVEAL', function () {
  log.innerHTML += '抽奖翻牌<br>';
});

jiugongge.bindMessage('REVEALED', function () {
  log.innerHTML += '动画结束<br>';
});

var start = function () {
  jiugongge.start('image/grid/prize1.png', function () {
    log.innerHTML += '抽奖结果已展示<br>';
  });
};

var reset = function () {
  jiugongge.reset();
};
