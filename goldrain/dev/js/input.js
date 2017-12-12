/**
 * @since 2014/10/22 10:35
 * @author vivaxy
 */
var Input = function () {

    this.events = {};

    this.keyMap = {
        37: -1,//left arrow
        39: 1,//right arrow
        65: -1,//a
        68: 1//d
    };
    document.addEventListener("keydown", this.keyDown.bind(this), false);
    document.addEventListener("touchstart", this.touchStart.bind(this), false);
    document.addEventListener("touchmove", this.touchMove.bind(this), false);
    document.addEventListener("touchend", this.touchEnd.bind(this), false);
};

Input.prototype.bindEvent = function (event, callback) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
};

Input.prototype.emitEvent = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach(function (callback) {
            callback(data);
        });
    }
};

Input.prototype.clearEvent = function (event) {
    this.events[event] = null;
};

Input.prototype.keyDown = function (e) {
    var direction = this.keyMap[e.which];
    if (direction !== undefined) {
        e.preventDefault();
        this.emitEvent("change-direction", direction);
    }
};

Input.prototype.touchStart = function (e) {
    e.preventDefault();
    if (e.touches.length > 1) return;
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
};

Input.prototype.touchMove = function (e) {
    e.preventDefault();
};

Input.prototype.touchEnd = function (e) {
    e.preventDefault();
    if (e.touches.length > 0) return;
    var dx = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) > 10) {
        var direction= dx < 0 ? -1 : 1;
        this.emitEvent("change-direction", direction);
    }
};