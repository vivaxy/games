/**
 * @since 14/11/30 下午7:51
 * @author vivaxy
 */

import Output from './output.js';
import Input from './input.js';
import Score from './score.js';
import Alert from './alert.js';
import Share from './share.js';
import Query from './query.js';
import Base64 from './base64.js';
import Block from './block.js';

export default class Eliminate {
  constructor(row, col) {
    this.colorList = [
      '#3498db',
      '#2ecc71',
      '#9b59b6',
      //'#34495e', //black
      '#f1c40f',
      //'#e67e22', //orange
      '#e74c3c',
    ];
    this.gridRow = row;
    this.gridCol = col;
    this.blockSize = 96;
    this.gridSize = 100;
    this.animationTime = 100;
    this.blocks = [];
    this.directions = [{
      row: -1,
      col: 0,
    }, {
      row: 1,
      col: 0,
    }, {
      row: 0,
      col: -1,
    }, {
      row: 0,
      col: 1,
    }];
    this.same = [];
    this.canvas = document.querySelector('canvas');
    this.backgroundColor = 'rgb(200,200,200)';
    this.output = new Output(this.canvas, this.gridSize, this.blockSize, this.gridCol, this.gridRow, this.backgroundColor, this.animationTime);
    this.input = new Input(this.canvas, this.gridSize, this.gridRow, this.gridCol, document.querySelector('.save'), document.querySelector('.generate'));
    this.score = new Score(document.querySelector('.now'), document.querySelector('.best'), document.querySelector('.remaining'), this.gridRow, this.gridCol);
    this.alert = new Alert(document.querySelector('.alert'), this.input.touch);
    this.share = new Share();
    this.query = new Query();
    this.base64 = new Base64();

    try {
      this.grid = JSON.parse(this.base64.decode(this.query.getQueryStringByName('grid')));
    } catch (e) {
      this.grid = null;
    }

    this.input.on('poke', this.poke.bind(this));
    this.alert.on('restart', this.reset.bind(this));
    this.reset();

    //hack
    this.input.on('save', this.saveGrid.bind(this));
    this.input.on('generate', this.generateGrid.bind(this));
  }

  reset() {
    this.score.reset();
    this.share.title = document.title;
    if (this.grid) this.useGrid();
    else this.newBlocks();
    this.redraw();
    this.input.listen();
  }

  newBlocks() {
    this.blocks = [];
    for (var i = 0; i < this.gridRow; i++) {
      var blockRow = [];
      for (var j = 0; j < this.gridCol; j++) {
        var type = Math.floor(Math.random() * this.colorList.length);
        var block = new Block(this.blockSize, i, j, this.colorList[type], 0, 0, type);
        blockRow.push(block);
      }
      this.blocks.push(blockRow);
    }
  }

  redraw() {
    this.output.drawBackground();
    for (var i = 0; i < this.blocks.length; i++) {
      for (var j = 0; j < this.blocks[i].length; j++) {
        //console.log(this.blocks[i][j]);
        this.output.drawBlock(this.blocks[i][j]);
      }
    }
  }

  poke(position) {
    var self = this;
    var row = position.row;
    var col = position.col;
    var block = self.blocks[row][col];
    if (!block.color) return;
    var sameBlocks = self.sameBlocks(block);
    //console.log(sameBlocks);
    if (sameBlocks.length > 1) {
      self.input.stopListen();
      self.score.addScore(sameBlocks.length);
      self.share.title = '#eliminate# I scored ' + self.score.score + ' with ' + self.score.remaining + ' blocks left!';
      self.output.destroy(sameBlocks, function () {
        for (var i = 0; i < sameBlocks.length; i++) {
          var temp = sameBlocks[i];
          self.destroy(temp.row, temp.col);
        }
        self.redraw();
        var moveDownList = self.getMoveDownList();
        self.output.moveDown(moveDownList, function () {
          //console.log(self.blocks);
          self.pullDown(moveDownList);
          self.redraw();
          var moveLeftList = self.getMoveLeftList();
          //console.log(moveLeftList);
          self.output.moveLeft(moveLeftList, function () {
            self.pullLeft(moveLeftList);
            self.redraw();
            self.input.listen();
            if (!self.couldBeEliminated()) self.gameOver();
          });
        });
      });
    }
    self.same = [];
  }

  destroy(row, col) {
    this.blocks[row][col].color = null;
  }

  sameBlocks(block) {
    var row = block.row;
    var col = block.col;
    for (var i = 0; i < this.directions.length; i++) {
      var r = row + this.directions[i].row;
      var c = col + this.directions[i].col;
      if (this.inside(r, c)) {
        var sideBlock = this.blocks[r][c];
        if (block.color && sideBlock && block.color == sideBlock.color && !this.inSameList(sideBlock)) {
          this.same.push(sideBlock);
          this.sameBlocks(sideBlock);
        }
      }
    }
    return this.same;
  }

  inSameList(block) {
    for (var i = 0; i < this.same.length; i++) {
      if (block.row === this.same[i].row && block.col === this.same[i].col) return true;
    }
    return false;
  }

  inside(row, col) {
    return row >= 0 && col >= 0 && row < this.gridRow && col < this.gridCol;
  }

  pullDown(moveDownList) {
    for (var i = moveDownList.length - 1; i >= 0; i--) {
      var col = moveDownList[i].block.col;
      var from = moveDownList[i].block.row;
      var to = moveDownList[i].to;
      var fromColor = this.blocks[from][col].color;
      var toColor = this.blocks[to][col].color;
      this.blocks[to][col].color = fromColor;
      this.blocks[from][col].color = toColor;
    }
  }

  getMoveDownList() {
    var moveDownList = [];
    for (var i = 0; i < this.gridCol; i++) {// for each col
      var blankBlocks = [];
      for (var j = 0; j < this.gridRow; j++) {
        if (this.blocks[j][i].color === null) blankBlocks.push(j);
      }
      for (var k = 0; k < this.gridRow; k++) {// k行
        var blanks = 0;
        for (var l = 0; l < blankBlocks.length; l++) {
          if (blankBlocks[l] > k) blanks++;// k行下面有空格
        }
        if (blanks > 0 && this.blocks[k][i].color !== null && !this.topAllBlankBlocks(k, i)) {
          var move = {
            block: this.blocks[k][i],
            to: k + blanks,
          };
          moveDownList.push(move);
        }
      }
    }
    return moveDownList;
  }

  pullLeft(moveLeftList) {
    for (var i = 0; i < moveLeftList.length; i++) {
      var row = moveLeftList[i].block.row;
      var from = moveLeftList[i].block.col;
      var to = moveLeftList[i].to;
      var fromColor = this.blocks[row][from].color;
      var toColor = this.blocks[row][to].color;
      this.blocks[row][to].color = fromColor;
      this.blocks[row][from].color = toColor;
    }
  }

  getMoveLeftList() {
    var blankCols = 0;
    var moveLeftList = [];
    for (var i = 1; i < this.gridCol; i++) {
      if (this.isBlankCol(i - 1) || blankCols > 0) {
        if (this.isBlankCol(i - 1)) {
          blankCols++;
        }
        for (var j = 0; j < this.gridRow; j++) {
          var block = this.blocks[j][i];
          if (block.color !== null) {
            var move = {};
            move.block = block;
            move.to = i - blankCols;
            moveLeftList.push(move);
          }
        }
      }
    }
    return moveLeftList;
  }

  topAllBlankBlocks(row, col) {
    for (var i = 0; i <= row; i++) {
      if (this.blocks[i][col].color !== null) return false;
    }
    return true;
  }

  isBlankCol(col) {
    for (var i = 0; i < this.gridRow; i++) {
      if (this.blocks[i][col].color !== null) return false;
    }
    return true;
  }

  couldBeEliminated() {
    for (var i = 0; i < this.gridCol; i++) {
      for (var j = 0; j < this.gridRow; j++) {
        var block = this.blocks[i][j];
        if (this.sameBlocks(block).length > 1) {
          this.same = [];
          return true;
        }
      }
    }
    this.same = [];
    return false;
  }

  gameOver() {
    this.input.stopListen();
    this.alert.show();
  }

  saveGrid() {
    if (this.score.score > 0) {
      if (this.grid) {
        return this.reset();
      } else {
        return;
      }
    }
    var saveBlocks = [];
    for (var i = 0; i < this.blocks.length; i++) {
      var row = this.blocks[i];
      var saveRow = [];
      for (var j = 0; j < row.length; j++) {
        var block = row[j];
        var b = block.type;
        saveRow.push(b);
      }
      saveBlocks.push(saveRow);
    }
    location.search = 'grid=' + this.base64.encode(JSON.stringify(saveBlocks));
  }

  useGrid() {
    var blocks = [];
    for (var i = 0; i < this.grid.length; i++) {
      var row = this.grid[i];
      var blocksRow = [];
      for (var j = 0; j < row.length; j++) {
        var type = row[j];
        var block = new Block(this.blockSize, i, j, this.colorList[type], 0, 0, type);
        blocksRow.push(block);
      }
      blocks.push(blocksRow);
    }
    this.blocks = blocks;
  }

  generateGrid() {
    location.search = '';
  }
}
