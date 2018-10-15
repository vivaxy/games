/**
 * @since 2018-10-15 20:56:13
 * @author vivaxy
 */

import Grid from './grid.js';

var grid;
var that = {};
that.init = function(options) {
  grid = new Grid(options);
};
that.start = function(url, cb) {
  if (grid.status !== 'GRID_READY') return;
  grid.options.winningImage = url;
  grid.options.callback = cb || function() {
  };
  grid.disturb();
};
that.bindMessage = function(type, cb) {
  grid.messenger.on(type, function(data) {
    cb(data);
  });
};
that.reset = function() {
  if (grid.status !== 'PRIZE_SHOWN') return;
  grid.options.container.innerHTML = '';
  grid.status = 'GRID_READY';
  grid.init();
};

export default that;
