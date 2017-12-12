/**
 * @since 14/11/30 下午7:56
 * @author vivaxy
 */
var Output = function (canvas, gridsize, blockSize, col, row, color, animationTime) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = gridsize * col;
    this.canvas.height = gridsize * row;
    this.gridsize = gridsize;
    this.blockSize = blockSize;
    this.background = color;
    this.animationTime = animationTime;
};
Output.prototype.drawBackground = function () {
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};
Output.prototype.drawBlock = function (block) {
    if (!block.color) return;
    //console.log('draw block: color: ' + block.color + ', row: ' + block.row + ', col: '+ block.col);
    var centerX = (block.col + 1 / 2) * this.gridsize;
    var centerY = (block.row + 1 / 2) * this.gridsize;
    var x = centerX - block.size / 2 + block.x;
    var y = centerY - block.size / 2 + block.y;
    var s = block.size;
    //console.log(x, y, s, block.color);
    this.ctx.fillStyle = block.color;
    this.ctx.fillRect(x, y, s, s);
};
Output.prototype.destroy = function (blocks, cb) {
    var self = this;
    var now = new Date().getTime();
    var start = now;
    var size = self.blockSize - self.blockSize / self.animationTime * (now - start);
    var looper = 0;
    var loop = function () {
        now = new Date().getTime();
        size = self.blockSize - self.blockSize / self.animationTime * (now - start);
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i];
            b.size = size;
            var bg = new Block(self.gridsize, b.row, b.col, self.background);
            self.drawBlock(bg);
            self.drawBlock(b);
        }
        //console.log(size);
        if (now - start > self.animationTime) {
            cancelAnimationFrame(looper);
            for (var j = 0; j < blocks.length; j++) {
                blocks[j].size = self.blockSize;
            }
            return cb();
        } else {
            looper = requestAnimationFrame(loop);
        }
    };
    loop();
};
Output.prototype.moveDown = function (moveDownList, cb) {
    var self = this;
    var looper = 0;
    var now = new Date().getTime();
    var start = now;
    var loop = function () {
        now = new Date().getTime();
        for (var i = 0; i < moveDownList.length; i++) {
            var move = moveDownList[i];
            var block = move.block;
            var col = block.col;
            var fromRow = block.row;
            var toRow = move.to;
            var bg = new Block(self.gridsize, fromRow, col, self.background, 0, block.y);
            self.drawBlock(bg);
            block.y = (toRow - fromRow) * self.gridsize / self.animationTime * (now - start);
            self.drawBlock(block);
        }
        if (now - start > self.animationTime) {
            cancelAnimationFrame(looper);
            for (var j = 0; j < moveDownList.length; j++) {
                moveDownList[j].block.y = 0;
            }
            return cb();
        } else {
            looper = requestAnimationFrame(loop);
        }
    };
    loop();
};
Output.prototype.moveLeft = function (moveLeftList, cb) {
    if (moveLeftList.length === 0) return cb();
    var self = this;
    var looper = 0;
    var now = new Date().getTime();
    var start = now;
    var loop = function () {
        now = new Date().getTime();
        for (var i = 0; i < moveLeftList.length; i++) {
            var move = moveLeftList[i];
            var block = move.block;
            var row = block.row;
            var fromCol = block.col;
            var toCol = move.to;
            var bg = new Block(self.gridsize, row, fromCol, self.background, block.x, 0);
            self.drawBlock(bg);
            block.x = (toCol - fromCol) * self.gridsize / self.animationTime * (now - start);
            self.drawBlock(block);
        }
        if (now - start > self.animationTime) {
            cancelAnimationFrame(looper);
            for (var j = 0; j < moveLeftList.length; j++) {
                moveLeftList[j].block.x = 0;
            }
            return cb();
        } else {
            looper = requestAnimationFrame(loop);
        }
    };
    loop();
};