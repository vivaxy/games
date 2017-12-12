/**
 * @since 150205 10:05
 * @author vivaxy
 */
var Klotski = function (config) {

    this.container = config.container;

    this.stepContainer = config.stepContainer;

    this.titleContainer = config.titleContainer;

    this.size = config.size;

    this.step = 0;

    this.gridCells = [];
    /**
     * the player block
     * @type {Block}
     */
    this.player = undefined;
    /**
     * exit cells
     * when exit cells meets the
     * @type {Array}
     */
    this.exit = [];
    /**
     * the blocks that block the way to the entrance
     * @type {Array}
     */
    this.blocks = [];
    /**
     * if any block is selected
     * @type {boolean}
     */
    this.selected = null;
    // init the game
    this.init(config);

    this.isMobile = (function () {
        var check = false;
        (function (a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    })();

    this.listen();

};

/**
 * init blocks and player
 */
Klotski.prototype.init = function (config) {

    var self = this;

    self.setStyle(config);

    for (var i = 0; i < config.col; i++) {
        for (var j = 0; j < config.row; j++) {
            var p = {x: i, y: j};
            self.gridCells.push(p);
        }
    }

    for (var k = 0; k < config.blocks.length; k++) {
        var _block = config.blocks[k];
        if (_block.type == 'player') {
            // player block
            self.player = new Block(self.container, _block.shape, _block.position, self.size, _block.style);
        } else if (_block.type == 'block') {
            // block blocks
            self.blocks.push(new Block(self.container, _block.shape, _block.position, self.size, _block.style));
        } else if (_block.type == 'exit') {
            // exit cells
            self.exit.push(_block.position);
        }
    }

};

/**
 * get position from two integer to object
 * @param x
 * @param y
 * @returns {{x: *, y: *}}
 */
Klotski.prototype.getPosition = function (x, y) {
    return {x: x, y: y};
};

/**
 * listen to click event
 */
Klotski.prototype.listen = function () {
    var self = this;

    var clickEvent = self.isMobile ? 'touchstart' : 'click';
    self.container.addEventListener(clickEvent, function (e) {

        e.preventDefault();
        e.stopPropagation();

        if (e.target == self.container) {
            // there is not any block selected
            if (!self.selected) return;
            // empty cell clicked
            // or maybe some block selected
            var emptyPositionClick = self.getCellPosition(e);

            if (!self.isAvailableCell(emptyPositionClick)) {
                return;
            }

            var nearestCellInBlock = self.getNearestCell(self.selected, emptyPositionClick);
            var direction = self.getDirection(nearestCellInBlock, emptyPositionClick);

            if (direction && self.canMove(self.selected, direction)) {
                self.move(direction);
            }
        } else {
            var block = self.findBlock(e.target);
            if (block) {

                // block clicked
                if (self.selected) {
                    var needPickUp = true;
                    // drop down block
                    if (self.selected == block) {
                        needPickUp = false;
                    }
                    self.dropDown();
                    needPickUp && self.pickUp(block);
                } else {
                    // pick up block
                    self.pickUp(block);
                }
            }
        }
    }, false);

    self.titleContainer.addEventListener(clickEvent, self.restart.bind(self), false);

};

/**
 * find Block clicked
 * @param ele
 * @returns {Block}
 */
Klotski.prototype.findBlock = function (ele) {
    var self = this;
    for (var i = 0; i < self.blocks.length; i++) {
        var block = self.blocks[i];
        if (ele == block.element) return block;
    }
    if (ele == self.player.element) return self.player;
    return null;
};

/**
 * pick up a block
 * @param block
 */
Klotski.prototype.pickUp = function (block) {
    var self = this;
    if (self.selected) return;
    block.select();
    self.selected = block;
};

/**
 * drop down all blocks
 */
Klotski.prototype.dropDown = function () {
    var self = this;
    for (var i = 0; i < self.blocks.length; i++) {
        var block = self.blocks[i];
        block.unselect();
    }
    self.player.unselect();
    self.selected = null;
};

/**
 * get cell position according to the click event
 * @param e
 * @returns {{x: number, y: number}}
 */
Klotski.prototype.getCellPosition = function (e) {
    var self = this;
    var touches = self.isMobile ? e.touches : [e];
    var touch = touches[0];
    var _x = touch.offsetX || touch.pageX - (touch.target.getBoundingClientRect().left + document.body.scrollTop);
    var _y = touch.offsetY || touch.pageY - (touch.target.getBoundingClientRect().top + document.body.scrollTop);
    var x = Math.floor(_x / self.size);
    var y = Math.floor(_y / self.size);
    return {
        x: x,
        y: y
    }
};

/**
 * if a block can move to the direction
 * @param block
 * @param direction
 * @returns {boolean}
 */
Klotski.prototype.canMove = function (block, direction) {
    var self = this;
    // use mock block to avoid real move
    // deep copy
    var mockBlock = {};
    mockBlock.shape = [];
    for (var k = 0; k < block.shape.length; k++) {
        var shape = block.shape[k];
        mockBlock.shape.push({
            x: shape.x,
            y: shape.y
        });
    }
    for (var j = 0; j < mockBlock.shape.length; j++) {
        var cell = mockBlock.shape[j];
        cell.x += direction.x;
        cell.y += direction.y;
    }

    if (self.player != block && self.blockOverlapped(self.player, mockBlock)) return false;
    for (var i = 0; i < self.blocks.length; i++) {
        var _block = self.blocks[i];
        if (_block == block) continue;
        if (self.blockOverlapped(_block, mockBlock)) {
            return false;
        }
    }
    return true;
};

/**
 * find if two blocks overlaps each other
 * @param block1
 * @param block2
 * @returns {boolean}
 */
Klotski.prototype.blockOverlapped = function (block1, block2) {
    var self = this;
    if (block1 == block2) return true;
    for (var i = 0; i < block1.shape.length; i++) {
        var cell1 = block1.shape[i];
        for (var j = 0; j < block2.shape.length; j++) {
            var cell2 = block2.shape[j];
            if (self.cellInSamePosition(cell1, cell2)) return true;
        }
    }
    return false;
};

/**
 * compare two cell or position
 * @param cell1
 * @param cell2
 * @returns {boolean}
 */
Klotski.prototype.cellInSamePosition = function (cell1, cell2) {
    return cell1.x == cell2.x && cell1.y == cell2.y;
};

/**
 * get nearest cell
 * @param block
 * @param pos
 * @returns {*|T}
 */
Klotski.prototype.getNearestCell = function (block, pos) {
    var getLength = function (cell, _pos) {
        return (cell.x - _pos.x) * (cell.x - _pos.x) + (cell.y - _pos.y) * (cell.y - _pos.y);
    };
    var result = block.shape[0];
    var min = getLength(result, pos);
    for (var i = 1; i < block.shape.length; i++) {
        var cell = block.shape[i];
        var len = getLength(cell, pos);
        if (len < min) {
            result = cell;
            min = len;
        }
    }
    return result;
};

/**
 * get move direction
 * @param selected
 * @param target
 * @returns {{x: number, y: number}}
 */
Klotski.prototype.getDirection = function (selected, target) {
    var x = target.x - selected.x;
    var y = target.y - selected.y;
    if (x == 0) {
        return {
            x: 0,
            y: y < 0 ? -1 : 1
        }
    } else if (y == 0) {
        return {
            x: x < 0 ? -1 : 1,
            y: 0
        }
    }
};

/**
 * determine if the player wins
 * @returns {boolean}
 */
Klotski.prototype.ifWin = function () {
    var self = this;
    for (var i = 0; i < self.exit.length; i++) {
        var cell = self.exit[i];
        if (!self.isCellInBlock(cell, self.player)) {
            return false;
        }
    }
    return true;
};

/**
 * find if this cell is in the block
 * @param cell
 * @param block
 * @returns {boolean}
 */
Klotski.prototype.isCellInBlock = function (cell, block) {
    var self = this;
    for (var i = 0; i < block.shape.length; i++) {
        var _cell = block.shape[i];
        if (self.cellInSamePosition(cell, _cell)) return true;
    }
    return false;
};

/**
 * find if the cell is empty
 * @param position
 * @returns {boolean}
 */
Klotski.prototype.isAvailableCell = function (position) {
    var self = this;
    var block = self.player;
    if (self.isCellInBlock(position, block)) {
        return false;
    }

    for (var i = 0; i < self.blocks.length; i++) {

        block = self.blocks[i];
        if (self.isCellInBlock(position, block)) {
            return false;
        }
    }

    return true;
};

/**
 * move and win method
 */
Klotski.prototype.move = function (direction) {
    var self = this;
    self.selected.move(direction);
    self.selected.repaint();
    self.updateStep();
    if (self.ifWin()) {
        document.title = self.step + ' steps moved to get the lightest out #klotski#';
        self.titleContainer.innerHTML = 'YOU WIN!';
    }
};

Klotski.prototype.updateStep = function () {
    var self = this;
    self.step++;
    self.stepContainer.innerHTML = self.step;
};

/**
 * set container style
 * @param config
 */
Klotski.prototype.setStyle = function (config) {
    config.outerContainer.style.width = config.container.style.width = config.col * config.size + 'px';
    config.outerContainer.style.height = config.container.style.height = config.row * config.size + 'px';
    config.outerContainer.style.padding = config.border + 'px';

    for (var i = 0; i < config.exit.length; i++) {
        var exitConfig = config.exit[i];
        var exit = document.createElement('div');
        exit.classList.add(exitConfig.style);
        exit.style.left = exitConfig.left + 'px';
        exit.style.top = exitConfig.top + 'px';
        exit.style.width = exitConfig.width + 'px';
        exit.style.height = exitConfig.height + 'px';

        config.outerContainer.appendChild(exit);
    }

};

Klotski.prototype.restart = function () {
    var self = this;
    self.selected = null;
    self.player.unselect();
    self.player.resetPosition();
    for (var i = 0; i < self.blocks.length; i++) {
        self.blocks[i].unselect();
        self.blocks[i].resetPosition();
    }
    self.step = 0;
    self.stepContainer.innerHTML = self.step;
    self.titleContainer.innerHTML = 'KLOTSKI';
};
