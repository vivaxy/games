/**
 * @since 150119 16:14
 * @author vivaxy
 */

var grid;
var that = {};
that.init = function (options) {
  grid = new Grid(options);
};
that.start = function (url, cb) {
  if (grid.status != 'GRID_READY') return;
  grid.options.winningImage = url;
  grid.options.callback = cb || function () {
  };
  grid.disturb();
};
that.bindMessage = function (type, cb) {
  grid.messenger.on(type, function (data) {
    cb(data);
  });
};
that.reset = function () {
  if (grid.status != 'PRIZE_SHOWN') return;
  grid.options.container.innerHTML = '';
  grid.status = 'GRID_READY';
  grid.init();
};
return that;
})();
