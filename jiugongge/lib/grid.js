/**
 * @since 150118 12:33
 * @author vivaxy
 */

import Tween from './tween.js';
import Messenger from './messenger.js';

/**
 * jiugongge
 * @param options
 * @constructor
 */
var Grid = function(options) {
  // default variables
  this.options = {
    container: document.querySelector('.jiugongge'),
    size: 90,
    spacing: 4,
    interval: 100,
    winningImage: 'prize.png',
    prizeImages: ['prize0.png', 'prize1.png', 'prize2.png', 'prize3.png', 'button.png', 'prize4.png', 'prize5.png', 'prize6.png', 'prize7.png'],
    coverImages: ['cover.png', 'cover.png', 'cover.png', 'cover.png', 'cover.png', 'cover.png', 'cover.png', 'cover.png', 'cover.png'],
    callback: function() {
    },
  };
  //
  this.messenger = new Messenger();
  /**
   * @public
   * message type
   * START - start button clicked
   * DISTURBED - disturb animation ended
   * REVEAL - reveal prize button clicked
   * REVEALED - prize revealed
   */
  /**
   * @private
   * status code
   * GRID_READY - grid ready
   * GRID_START - disturb animation started
   * PRIZE_READY - disturb animation ended
   * PRIZE_SHOWN - revealing prize
   */
  this.status = 'GRID_READY';
  // main
  this.init(options);
};
/**
 * add container and cells to this container
 * @returns {Grid}
 */
Grid.prototype.appendElements = function() {
  var self = this;
  // inner container
  var innerContainer = document.createElement('div');
  innerContainer.style.position = 'relative';
  innerContainer.style.margin = '0 auto';
  innerContainer.style.width = 3 * self.options.size + 2 * self.options.spacing + 'px';
  innerContainer.style.height = 3 * self.options.size + 2 * self.options.spacing + 'px';
  // add cells
  for (var i = 0; i < 9; i++) {
    // position
    var col = self.convert(i).col;
    var row = self.convert(i).row;
    var left = col * self.options.size + col * self.options.spacing;
    var top = row * self.options.size + row * self.options.spacing;
    var style = {
      position: 'absolute',
      width: self.options.size + 'px',
      height: self.options.size + 'px',
      left: left + 'px',
      top: top + 'px',
      zIndex: 0,
    };
    var cell = document.createElement('div');
    self.setStyle(cell, style);
    self.data(cell, 'data-row', row);
    self.data(cell, 'data-col', col);
    // bind click events
    self.bindEvents(cell);
    //add images
    var imagePrize = document.createElement('img');
    imagePrize.src = self.options.prizeImages[i];
    imagePrize.width = imagePrize.height = self.options.size;
    imagePrize.style.position = 'absolute';
    var imageCover = document.createElement('img');
    imageCover.src = self.options.coverImages[i];
    imageCover.width = imageCover.height = self.options.size;
    imageCover.style.position = 'absolute';
    imageCover.style.display = 'none';
    // append
    cell.appendChild(imageCover);
    cell.appendChild(imagePrize);
    innerContainer.appendChild(cell);
  }
  self.options.container.appendChild(innerContainer);
  return self;
};
/**
 *
 * @param opts
 * @returns {Grid}
 */
Grid.prototype.overwriteOptions = function(opts) {
  var self = this;
  if (opts) {
    for (var i in this.options) {
      if (opts[i]) {
        if ((i === 'prizeImages' || i === 'coverImages') && typeof opts[i] === 'string') {
          var url = opts[i];
          opts[i] = [];
          for (var j = 0; j < 9; j++) {
            opts[i].push(url);
          }
        }
        if ((i === 'prizeImages' || i === 'coverImages') && typeof opts[i] === 'object' && opts[i].length !== 9) {
          throw new Error(i + ' length not equals 9');
        }
        self.options[i] = opts[i];
      }
    }
  }
  return self;
};
/**
 * bind click event to each cell
 * @param cell
 * @returns {Grid}
 */
Grid.prototype.bindEvents = function(cell) {
  var self = this;
  cell.addEventListener('click', function(e) {
    // get row col data
    var row = self.data(e.target.parentNode, 'data-row');
    var col = self.data(e.target.parentNode, 'data-col');
    // different message from different status
    if (self.status === 'GRID_READY' && row === '1' && col === '1') {
      self.messenger.fire('START');
    }
    if (self.status === 'PRIZE_READY') {
      self.status = 'PRIZE_SHOWN';
      self.messenger.fire('REVEAL');
      self.flip(e.target.parentNode, function() {
        self.messenger.fire('REVEALED');
        self.options.callback();
      });
    }
  });
  return self;
};
/**
 *
 * @param opt
 * @returns {Grid}
 */
Grid.prototype.init = function(opt) {
  var self = this;
  self.overwriteOptions(opt).appendElements();
  return self;
};
/**
 * main animation before prize drawn
 * @param cb
 * @returns {Grid}
 */
Grid.prototype.disturb = function(cb) {
  var self = this;
  self.status = 'GRID_START';
  // firstly, flip all cells
  self.flipAll(function() {
    // secondly, move all cells to center
    self.appendWinningImage();
    self.pause(function() {
      self.moveToCenterAll(function() {
        // thirdly, rearrange cells
        // finally, move apart all cells
        self.pause(function() {
          self.moveApartAll(function() {
            self.status = 'PRIZE_READY';
            self.messenger.fire('DISTURBED');
            cb && cb();
          });
        });
      });
    });
  });
  return self;
};
/**
 * move apart all cells
 * @param cb
 * @returns {Grid}
 */
Grid.prototype.moveApartAll = function(cb) {
  var self = this;
  var cells = self.options.container.children[0].children;
  cells = self.rearrange(cells);
  var factory = function(cell, _cb) {
    return function() {
      self.setStyle(cell, {
        zIndex: 1,
      });
      self.moveApart(cell, function() {
        _cb();
        self.setStyle(cell, {
          zIndex: 0,
        });
      });
    };
  };
  for (var i = cells.length - 1; i >= 0; i--) {
    if (i !== 4) {
      cb = factory(cells[i], cb);
    }
  }
  cb();
  return self;
};
/**
 *
 * @param cell
 * @param cb
 * @returns {Grid}
 */
Grid.prototype.moveApart = function(cell, cb) {
  var self = this;
  var row = self.data(cell, 'data-row');
  var col = self.data(cell, 'data-col');
  var left = col * this.options.size + col * this.options.spacing;
  var top = row * this.options.size + row * this.options.spacing;
  var original = {
    left: cell.style.left,
    top: cell.style.top,
  };
  var style = {
    left: left + 'px',
    top: top + 'px',
  };
  new Tween(cell, original, style, self.options.interval).play(cb);
  return self;
};
/**
 * move all cells to center
 * @param cb
 * @returns {Grid}
 */
Grid.prototype.moveToCenterAll = function(cb) {
  var self = this;
  var cells = self.options.container.children[0].children;
  // cells has no forEach method
  var factory = function(cell, _cb) {
    return function() {
      // put it top level
      self.setStyle(cell, {
        zIndex: 1,
      });
      self.moveToCenter(cell, function() {
        _cb();
        self.setStyle(cell, {
          zIndex: 0,
        });
      });
    };
  };
  for (var i = cells.length - 1; i >= 0; i--) {
    if (i !== 4) {
      cb = factory(cells[i], cb);
    }
  }
  cb();
  return self;
};
/**
 * move a cell to center
 * @param cell
 * @param cb
 * @returns {Grid}
 */
Grid.prototype.moveToCenter = function(cell, cb) {
  var self = this;
  var style = {
    left: self.options.size + self.options.spacing + 'px',
    top: self.options.size + self.options.spacing + 'px',
  };
  var original = {
    left: cell.style.left,
    top: cell.style.top,
  };
  new Tween(cell, original, style, self.options.interval).play(cb);
  return self;
};
/**
 * flip all cells
 * @param cb
 * @returns {Grid}
 */
Grid.prototype.flipAll = function(cb) {
  var self = this;
  var cells = self.options.container.children[0].children;
  for (var i = 0; i < cells.length; i++) {
    if (i === 0) {
      self.flip(cells[i], cb);
    } else {
      self.flip(cells[i], null);
    }
  }
  return self;
};
/**
 * flip a single cell
 * @param cell
 * @param cb
 * @returns {Grid}
 */
Grid.prototype.flip = function(cell, cb) {
  var self = this;
  self.flipForward(cell, function() {
    self.switchImage(cell).flipBackward(cell, cb);
  });
  return self;
};
/**
 * flip a cell from 0 to 90 degree
 * @param cell
 * @param cb
 * @returns {Grid}
 */
Grid.prototype.flipForward = function(cell, cb) {
  var self = this;
  var style = {
    transform: 'rotateY(90deg)',
    webkitTransform: 'rotateY(90deg)',
  };
  var original = {
    transform: 'rotateY(0deg)',
    webkitTransform: 'rotateY(0deg)',
  };
  new Tween(cell, original, style, self.options.interval).play(cb);
  return self;
};

/**
 * flip a cell from 90 to 0 degree
 * @param cell
 * @param cb
 * @returns {Grid}
 */
Grid.prototype.flipBackward = function(cell, cb) {
  var self = this;
  var original = {
    transform: 'rotateY(90deg)',
    webkitTransform: 'rotateY(90deg)',
  };
  var style = {
    transform: 'rotateY(0deg)',
    webkitTransform: 'rotateY(0deg)',
  };
  new Tween(cell, original, style, self.options.interval).play(cb);
  return self;
};

Grid.prototype.switchImage = function(cell) {
  var self = this;
  var images = cell.children;
  for (var i = 0; i < images.length; i++) {
    images[i].style.display = images[i].style.display === 'none' ? 'block' : 'none';
  }
  return self;
};

/**
 * convert between index and position
 * @param pos
 * @returns {Object}
 */
Grid.prototype.convert = function(pos) {
  if (typeof pos == 'object') {
    return pos.row * 3 + pos.col;
  }
  if (typeof pos == 'number') {
    var col = pos % 3;
    var row = Math.floor(pos / 3);
    return {
      row: row,
      col: col,
    };
  }
  throw new Error('position type not defined');
};
/**
 *
 * @param array
 * @returns {Array}
 */
Grid.prototype.rearrange = function(array) {
  var self = this;
  var length = array.length;
  var result = [];
  var origin = [];
  for (var i = 0; i < length; i++) {
    origin.push(array[i]);
  }
  var resultIndex = 0;
  for (var j = 0; j < length; j++) {
    var index = Math.floor(Math.random() * origin.length);
    var item = origin[index];
    origin.splice(index, 1);
    var row = self.convert(resultIndex).row;
    var col = self.convert(resultIndex).col;
    self.data(item, 'data-row', row);
    self.data(item, 'data-col', col);
    result.push(item);
    resultIndex++;
  }
  return result;
};
/**
 * set cell style
 * @param ele
 * @param style
 * @returns {Grid}
 */
Grid.prototype.setStyle = function(ele, style) {
  var self = this;
  Object.keys(style).forEach(function(key) {
    ele.style[key] = style[key];
  });
  return self;
};

/**
 * bind/get data to/from an element
 * @param _ele
 * @param {String} _key - some key
 * @param {String} [_value] - some value
 */
Grid.prototype.data = function(_ele, _key, _value) {
  if (_value !== undefined) { // bind
    _ele.setAttribute(_key, String(_value));
    return _ele;
  } else {//get
    return _ele.getAttribute(_key);
  }
};

/**
 * append result image to each cell, replacing the hidden one
 * @returns {Grid}
 */
Grid.prototype.appendWinningImage = function() {
  var self = this;
  var cells = self.options.container.children[0].children;
  for (var i = 0; i < cells.length; i++) {
    var images = cells[i].children;
    for (var j = 0; j < images.length; j++) {
      if (images[j].style.display === 'none') images[j].src = self.options.winningImage;
    }
  }
  return self;
};

/**
 * pause for interval time length
 * @param cb
 * @returns {Grid}
 */
Grid.prototype.pause = function(cb) {
  var self = this;
  new Tween(self.options.container, {}, {}, self.options.interval).play(cb);
  return self;
};

export default Grid;
