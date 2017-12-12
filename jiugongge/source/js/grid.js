/**
 * @since 150213 13:09
 * @author vivaxy
 */
var Grid = function () {

    this.slice = Array.prototype.slice;

    //this.container = document.querySelector('.grid-wrapper');
    //this.cells = this.getCells(this.container.querySelectorAll('.grid-cell')).reverse();

    //this.resize();
    //this.resizeListener();

};

var fn = Grid.prototype;

eventuality(fn);


fn.getCells = function (elementList) {
    return this.slice.apply(elementList).map(function (cell, i) {
        return new Cell(cell, i);
    });
};

fn.resize = function () {
    this.container.style.height = this.container.offsetWidth + 'px';
};

fn.resizeListener = function () {
    var self = this;
    window.addEventListener('resize', self.resize.bind(self), false);
};
