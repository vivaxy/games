/**
 * @since 150205 10:05
 * @author vivaxy
 */

export default class Block {
  constructor(container, type, position, size, style) {
    // container
    this.container = container;
    // if this block is selected
    this.selected = false;

    // cell size
    this.size = size;

    this.style = style;
    // types
    this.types = {
      'one': [{ x: 0, y: 0 }],
      'two-horizon': [{ x: 0, y: 0 }, { x: 1, y: 0 }],
      'two-vertical': [{ x: 0, y: 0 }, { x: 0, y: 1 }],
      'four-block': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
    };
    // stores the cell array
    this.shape = this.types[type];

    this.originalPosition = {
      x: position.x,
      y: position.y,
    };
    // initiate block position
    this.move(position);
    // render this block on page
    this.element = this.paint();
  }


  /**
   * move the block to its right position
   * @param direction
   */
  move(direction) {
    for (let i = 0; i < this.shape.length; i++) {
      let cell = this.shape[i];
      this.moveCell(cell, direction);
    }
  };

  /**
   * move a cell according to the direction
   * @param cell
   * @param direction
   */
  moveCell(cell, direction) {
    cell.x += direction.x;
    cell.y += direction.y;
  };

  repaint() {

    let element = this.element;
    element.style.top = this.getTopStyle();
    element.style.left = this.getLeftStyle();
  };

  /**
   * render this block
   */
  paint() {

    let element = document.createElement('div');
    element.style.width = this.getWidthStyle();
    element.style.height = this.getHeightStyle();
    element.style.top = this.getTopStyle();
    element.style.left = this.getLeftStyle();
    element.classList.add('block');
    this.style && element.classList.add(this.style);
    this.container.appendChild(element);
    return element;
  };

  /**
   * get block height style
   * @returns {string}
   */
  getHeightStyle() {

    return (this.getBottom() - this.getTop() + 1) * this.size + 'px';
  };

  /**
   * get block width style
   * @returns {string}
   */
  getWidthStyle() {

    return (this.getRight() - this.getLeft() + 1) * this.size + 'px';
  };

  /**
   * get block top position
   * @returns {number|Number|*}
   */
  getTop() {

    let min = this.shape[0].y;
    this.shape.forEach((item) => {
      if (item.y < min) min = item.y;
    });
    return min;
  };

  /**
   * get block top style
   * @returns {string}
   */
  getTopStyle() {

    let y = this.getTop();
    return y * this.size + 'px';
  };

  /**
   * get block bottom position
   * @returns {number|Number|*}
   */
  getBottom() {

    let max = this.shape[0].y;
    this.shape.forEach((item) => {
      if (item.y > max) max = item.y;
    });
    return max;
  };

  /**
   * get block left position
   * @returns {number|Number|*}
   */
  getLeft() {

    let min = this.shape[0].x;
    this.shape.forEach((item) => {
      if (item.x < min) min = item.x;
    });
    return min;
  };

  /**
   * get block left style
   * @returns {string}
   */
  getLeftStyle() {

    let x = this.getLeft();
    return x * this.size + 'px';
  };

  /**
   * get block right position
   * @returns {number|Number|*}
   */
  getRight() {
    let max = this.shape[0].x;
    this.shape.forEach((item) => {
      if (item.x > max) max = item.x;
    });
    return max;
  };

  /**
   * select this block
   */
  select() {
    this.selected = true;
    this.element.classList.add('selected');
  };

  /**
   * release this block
   */
  unselect() {

    this.selected = true;
    this.element.classList.remove('selected');
  };

  resetPosition() {

    for (let i = 0; i < this.shape.length; i++) {
      let cell = this.shape[i];
      cell.x = 0;
      cell.y = 0;
    }
    this.move(this.originalPosition);
    this.repaint();
  };

}
