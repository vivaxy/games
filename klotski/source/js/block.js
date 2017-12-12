/**
 * @since 150205 10:05
 * @author vivaxy
 */

var Block = function (container, type, position, size, style) {
    // container
    this.container = container;
    // if this block is selected
    this.selected = false;

    // cell size
    this.size = size;

    this.style = style;
    // types
    this.types = {
        'one': [{x: 0, y: 0}],
        'two-horizon': [{x: 0, y: 0}, {x: 1, y: 0}],
        'two-vertical': [{x: 0, y: 0}, {x: 0, y: 1}],
        'four-block': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
    };
    // stores the cell array
    this.shape = this.types[type];

    this.originalPosition = {
        x: position.x,
        y: position.y
    };
    // initiate block position
    this.move(position);
    // render this block on page
    this.element = this.paint();
};

/**
 * move the block to its right position
 * @param direction
 */
Block.prototype.move = function (direction) {
    var self = this;
    for (var i = 0; i < self.shape.length; i++) {
        var cell = self.shape[i];
        self.moveCell(cell, direction);
    }
};

/**
 * move a cell according to the direction
 * @param cell
 * @param direction
 */
Block.prototype.moveCell = function (cell, direction) {
    cell.x += direction.x;
    cell.y += direction.y;
};

Block.prototype.repaint = function () {
    var self = this;
    var element = self.element;
    element.style.top = self.getTopStyle();
    element.style.left = self.getLeftStyle();
};

/**
 * render this block
 */
Block.prototype.paint = function () {
    var self = this;
    var element = document.createElement('div');
    element.style.width = self.getWidthStyle();
    element.style.height = self.getHeightStyle();
    element.style.top = self.getTopStyle();
    element.style.left = self.getLeftStyle();
    element.classList.add('block');
    self.style && element.classList.add(self.style);
    self.container.appendChild(element);
    return element;
};

/**
 * get block height style
 * @returns {string}
 */
Block.prototype.getHeightStyle = function () {
    var self = this;
    return (self.getBottom() - self.getTop() + 1) * self.size + 'px';
};

/**
 * get block width style
 * @returns {string}
 */
Block.prototype.getWidthStyle = function () {
    var self = this;
    return (self.getRight() - self.getLeft() + 1) * self.size + 'px';
};

/**
 * get block top position
 * @returns {number|Number|*}
 */
Block.prototype.getTop = function () {
    var self = this;
    var min = self.shape[0].y;
    self.shape.forEach(function (item) {
        if (item.y < min) min = item.y;
    });
    return min;
};

/**
 * get block top style
 * @returns {string}
 */
Block.prototype.getTopStyle = function () {
    var self = this;
    var y = self.getTop();
    return y * self.size + 'px';
};

/**
 * get block bottom position
 * @returns {number|Number|*}
 */
Block.prototype.getBottom = function () {
    var self = this;
    var max = self.shape[0].y;
    self.shape.forEach(function (item) {
        if (item.y > max) max = item.y;
    });
    return max;
};

/**
 * get block left position
 * @returns {number|Number|*}
 */
Block.prototype.getLeft = function () {
    var self = this;
    var min = self.shape[0].x;
    self.shape.forEach(function (item) {
        if (item.x < min) min = item.x;
    });
    return min;
};

/**
 * get block left style
 * @returns {string}
 */
Block.prototype.getLeftStyle = function () {
    var self = this;
    var x = self.getLeft();
    return x * self.size + 'px';
};

/**
 * get block right position
 * @returns {number|Number|*}
 */
Block.prototype.getRight = function () {
    var self = this;
    var max = self.shape[0].x;
    self.shape.forEach(function (item) {
        if (item.x > max) max = item.x;
    });
    return max;
};

/**
 * select this block
 */
Block.prototype.select = function () {
    var self = this;
    self.selected = true;
    self.element.classList.add('selected');
};

/**
 * release this block
 */
Block.prototype.unselect = function () {
    var self = this;
    self.selected = true;
    self.element.classList.remove('selected');
};

Block.prototype.resetPosition = function () {
    var self = this;
    for (var i = 0; i < self.shape.length; i++) {
        var cell = self.shape[i];
        cell.x = 0;
        cell.y = 0;
    }
    self.move(self.originalPosition);
    self.repaint();
};