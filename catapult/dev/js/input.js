/**
 * @since 2014/10/23 9:27
 * @author vivaxy
 */
var Input = function() {
    this.events = {};
    document.addEventListener("keydown", this.keyDown.bind(this), false);
    document.addEventListener("keyup", this.keyUp.bind(this), false);
    document.addEventListener("touchstart", this.keyDown.bind(this), false);
    document.addEventListener("touchend", this.keyUp.bind(this), false);
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
    this.emitEvent("key-down");
};

Input.prototype.keyUp = function (e) {
    this.emitEvent("key-up");
};