/**
 * @since 14/12/6 下午9:55
 * @author vivaxy
 */

export default class Alert {

  constructor(container, touch) {
    this.events = {};
    this.alertContainer = container;
    this.alertContainer.addEventListener(touch, this.message.bind(this), false);
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  fire(event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach(function (callback) {
        callback(data);
      });
    }
  }

  off(event) {
    this.events[event] = null;
  }

  show() {
    this.alertContainer.classList.remove('hide');
  }

  hide() {
    this.alertContainer.classList.add('hide');
  }

  message(e) {
    e.stopPropagation();
    if (e.target.classList.contains('restart')) {
      this.fire('restart');
      this.hide();
    }
  }

}
