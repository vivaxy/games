/**
 * @since 2014/10/16 17:34
 * @author vivaxy
 */
var Input = function () {

    this.hint = document.getElementsByClassName("hint-container")[0];

    this.events = {};

    this.keyMap = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        65: "left",//a
        87: "up",//w
        68: "right",//d
        83: "down"//s
    };

    this.directionMap = {
        left: {x: -1, y: 0},
        up: {x: 0, y: -1},
        right: {x: 1, y: 0},
        down: {x: 0, y: 1}
    };

    this.touchStartX = 0;
    this.touchStartY = 0;

    this.setup();

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

Input.prototype.keyListener = function (e) {
    var modifiers = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    var direction = this.directionMap[this.keyMap[e.which]];
    if (!modifiers) {
        if (direction !== undefined) {
            e.preventDefault();
            if (!this.hint.classList.contains("hide")) {
                this.emitEvent("start", direction);
            } else {
                this.emitEvent("heading", direction);
            }
        }
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
    var absDx = Math.abs(dx);
    var dy = e.changedTouches[0].clientY - this.touchStartY;
    var absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) > 10) {
        var directionName = absDx > absDy ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
        var direction = this.directionMap[directionName];
        if (e.target == this.hint) {
            this.emitEvent("start", direction);
        } else {
            this.emitEvent("heading", direction);
        }
    }
};

Input.prototype.setup = function () {
    document.addEventListener("keydown", this.keyListener.bind(this), false);
    document.addEventListener("touchstart", this.touchStart.bind(this), false);
    document.addEventListener("touchmove", this.touchMove.bind(this), false);
    document.addEventListener("touchend", this.touchEnd.bind(this), false);
};
