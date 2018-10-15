/**
 * @since 2014/10/23 9:37
 * @author vivaxy
 */

import Cart from './cart.js';
import Spoon from './spoon.js';
import Wheel from './wheel.js';

var Catapult = function() {

  this.x = 300;
  this.y = 500;
  this.cart = new Cart(this.x, this.y);
  this.spoon = new Spoon(this.x, this.y);

  this.wheel = new Wheel();

  this.cart.draw();
  this.spoon.draw();

};

export default Catapult;
