/**
 * @since 14/12/6 下午9:55
 * @author vivaxy
 */
var Alert = function (container, touch) {
    this.events = {};
    this.alertContainer = container;
    this.alertContainer.addEventListener(touch, this.message.bind(this), false);
};

Alert.prototype.on = function (event, callback) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
};
Alert.prototype.fire = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach(function (callback) {
            callback(data);
        });
    }
};

Alert.prototype.off = function (event) {
    this.events[event] = null;
};

Alert.prototype.show = function () {
    this.alertContainer.classList.remove('hide');
};

Alert.prototype.hide = function () {
    this.alertContainer.classList.add('hide');
};

Alert.prototype.message = function (e) {
    e.stopPropagation();
    if (e.target.classList.contains('restart')) {
        this.fire('restart');
        this.hide();
    }
};
