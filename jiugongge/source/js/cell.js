/**
 * @since 150213 13:08
 * @author vivaxy
 */
var Cell = function(element, index){
    this.element = element;
    this.index = index;
};

var fn = Cell.prototype;

fn.animate = function (callback) {
    var self = this;
    var listener = function () {
        self.element.removeEventListener('webkitTransitionEnd', listener, false);
        callback();
    };
    self.element.addEventListener('webkitTransitionEnd', listener, false);
};
