/**
 * @since 150205 10:05
 * @author vivaxy
 */

import Block from './block.js';

export default class Klotski {
  constructor(config) {

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

    this.isMobile = (() => {
      let check = false;
      ((a) => {
        if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    })();

    this.listen();

  }


  /**
   * init blocks and player
   */
  init(config) {
    this.setStyle(config);

    for (let i = 0; i < config.col; i++) {
      for (let j = 0; j < config.row; j++) {
        let p = { x: i, y: j };
        this.gridCells.push(p);
      }
    }

    for (let k = 0; k < config.blocks.length; k++) {
      let _block = config.blocks[k];
      if (_block.type == 'player') {
        // player block
        this.player = new Block(this.container, _block.shape, _block.position, this.size, _block.style);
      } else if (_block.type == 'block') {
        // block blocks
        this.blocks.push(new Block(this.container, _block.shape, _block.position, this.size, _block.style));
      } else if (_block.type == 'exit') {
        // exit cells
        this.exit.push(_block.position);
      }
    }

  };

  /**
   * get position from two integer to object
   * @param x
   * @param y
   * @returns {{x: *, y: *}}
   */
  getPosition(x, y) {
    return { x: x, y: y };
  };

  /**
   * listen to click event
   */
  listen() {
    let clickEvent = this.isMobile ? 'touchstart' : 'click';
    this.container.addEventListener(clickEvent, (e) => {

      e.preventDefault();
      e.stopPropagation();

      if (e.target === this.container) {
        // there is not any block selected
        if (!this.selected) return;
        // empty cell clicked
        // or maybe some block selected
        let emptyPositionClick = this.getCellPosition(e);

        if (!this.isAvailableCell(emptyPositionClick)) {
          return;
        }

        let nearestCellInBlock = this.getNearestCell(this.selected, emptyPositionClick);
        let direction = this.getDirection(nearestCellInBlock, emptyPositionClick);

        if (direction && this.canMove(this.selected, direction)) {
          this.move(direction);
        }
      } else {
        let block = this.findBlock(e.target);
        if (block) {

          // block clicked
          if (this.selected) {
            let needPickUp = true;
            // drop down block
            if (this.selected == block) {
              needPickUp = false;
            }
            this.dropDown();
            needPickUp && this.pickUp(block);
          } else {
            // pick up block
            this.pickUp(block);
          }
        }
      }
    }, false);

    this.titleContainer.addEventListener(clickEvent, this.restart.bind(this), false);

  };

  /**
   * find Block clicked
   * @param ele
   * @returns {Block}
   */
  findBlock(ele) {
    for (let i = 0; i < this.blocks.length; i++) {
      let block = this.blocks[i];
      if (ele == block.element) return block;
    }
    if (ele == this.player.element) return this.player;
    return null;
  };

  /**
   * pick up a block
   * @param block
   */
  pickUp(block) {
    if (this.selected) return;
    block.select();
    this.selected = block;
  };

  /**
   * drop down all blocks
   */
  dropDown() {
    for (let i = 0; i < this.blocks.length; i++) {
      let block = this.blocks[i];
      block.unselect();
    }
    this.player.unselect();
    this.selected = null;
  };

  /**
   * get cell position according to the click event
   * @param e
   * @returns {{x: number, y: number}}
   */
  getCellPosition(e) {
    let touches = this.isMobile ? e.touches : [e];
    let touch = touches[0];
    let _x = touch.offsetX || touch.pageX - (touch.target.getBoundingClientRect().left + document.body.scrollTop);
    let _y = touch.offsetY || touch.pageY - (touch.target.getBoundingClientRect().top + document.body.scrollTop);
    let x = Math.floor(_x / this.size);
    let y = Math.floor(_y / this.size);
    return {
      x: x,
      y: y,
    };
  };

  /**
   * if a block can move to the direction
   * @param block
   * @param direction
   * @returns {boolean}
   */
  canMove(block, direction) {
    // use mock block to avoid real move
    // deep copy
    let mockBlock = {};
    mockBlock.shape = [];
    for (let k = 0; k < block.shape.length; k++) {
      let shape = block.shape[k];
      mockBlock.shape.push({
        x: shape.x,
        y: shape.y,
      });
    }
    for (let j = 0; j < mockBlock.shape.length; j++) {
      let cell = mockBlock.shape[j];
      cell.x += direction.x;
      cell.y += direction.y;
    }

    if (this.player !== block && this.blockOverlapped(this.player, mockBlock)) return false;
    for (let i = 0; i < this.blocks.length; i++) {
      let _block = this.blocks[i];
      if (_block === block) continue;
      if (this.blockOverlapped(_block, mockBlock)) {
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
  blockOverlapped(block1, block2) {
    if (block1 === block2) return true;
    for (let i = 0; i < block1.shape.length; i++) {
      let cell1 = block1.shape[i];
      for (let j = 0; j < block2.shape.length; j++) {
        let cell2 = block2.shape[j];
        if (this.cellInSamePosition(cell1, cell2)) return true;
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
  cellInSamePosition(cell1, cell2) {
    return cell1.x == cell2.x && cell1.y == cell2.y;
  };

  /**
   * get nearest cell
   * @param block
   * @param pos
   * @returns {*|T}
   */
  getNearestCell(block, pos) {
    let getLength = (cell, _pos) => {
      return (cell.x - _pos.x) * (cell.x - _pos.x) + (cell.y - _pos.y) * (cell.y - _pos.y);
    };
    let result = block.shape[0];
    let min = getLength(result, pos);
    for (let i = 1; i < block.shape.length; i++) {
      let cell = block.shape[i];
      let len = getLength(cell, pos);
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
  getDirection(selected, target) {
    let x = target.x - selected.x;
    let y = target.y - selected.y;
    if (x == 0) {
      return {
        x: 0,
        y: y < 0 ? -1 : 1,
      };
    } else if (y == 0) {
      return {
        x: x < 0 ? -1 : 1,
        y: 0,
      };
    }
  };

  /**
   * determine if the player wins
   * @returns {boolean}
   */
  ifWin() {
    for (let i = 0; i < this.exit.length; i++) {
      let cell = this.exit[i];
      if (!this.isCellInBlock(cell, this.player)) {
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
  isCellInBlock(cell, block) {
    for (let i = 0; i < block.shape.length; i++) {
      let _cell = block.shape[i];
      if (this.cellInSamePosition(cell, _cell)) return true;
    }
    return false;
  };

  /**
   * find if the cell is empty
   * @param position
   * @returns {boolean}
   */
  isAvailableCell(position) {
    let block = this.player;
    if (this.isCellInBlock(position, block)) {
      return false;
    }

    for (let i = 0; i < this.blocks.length; i++) {

      block = this.blocks[i];
      if (this.isCellInBlock(position, block)) {
        return false;
      }
    }

    return true;
  };

  /**
   * move and win method
   */
  move(direction) {
    this.selected.move(direction);
    this.selected.repaint();
    this.updateStep();
    if (this.ifWin()) {
      document.title = this.step + ' steps moved to get the lightest out #klotski#';
      this.titleContainer.innerHTML = 'YOU WIN!';
    }
  };

  updateStep() {
    this.step++;
    this.stepContainer.innerHTML = this.step;
  };

  /**
   * set container style
   * @param config
   */
  setStyle(config) {
    config.outerContainer.style.width = config.container.style.width = config.col * config.size + 'px';
    config.outerContainer.style.height = config.container.style.height = config.row * config.size + 'px';
    config.outerContainer.style.padding = config.border + 'px';

    for (let i = 0; i < config.exit.length; i++) {
      let exitConfig = config.exit[i];
      let exit = document.createElement('div');
      exit.classList.add(exitConfig.style);
      exit.style.left = exitConfig.left + 'px';
      exit.style.top = exitConfig.top + 'px';
      exit.style.width = exitConfig.width + 'px';
      exit.style.height = exitConfig.height + 'px';

      config.outerContainer.appendChild(exit);
    }

  };

  restart() {
    this.selected = null;
    this.player.unselect();
    this.player.resetPosition();
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].unselect();
      this.blocks[i].resetPosition();
    }
    this.step = 0;
    this.stepContainer.innerHTML = this.step;
    this.titleContainer.innerHTML = 'KLOTSKI';
  };

}
