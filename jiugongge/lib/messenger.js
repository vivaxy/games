/**
 * @since 150118 12:32
 * @author vivaxy
 */
/**
 * messenger
 * @constructor
 */
var Messenger = function () {
  this.events = {};
};
/**
 * bind functions to very event
 * @param event - event type name
 * @param callback - callback function
 */
Messenger.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};
/**
 * emit some event with data
 * @param event - event type name
 * @param [data] - data
 */
Messenger.prototype.fire = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

export default Messenger;
