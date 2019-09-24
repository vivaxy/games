/**
 * @since 2019-09-24 10:54
 * @author vivaxy
 */
export default class StateMachine {
  constructor(options) {
    this.history = [];
    this.changeCallbacks = [];
    this.maxHistoryLength = options.maxHistoryLength || 10;
    this.state = options.default;

    Object.keys(options).forEach((action) => {
      if (action === 'maxHistoryLength' || action === 'default') {
        return;
      }
      const [from, to] = options[action];
      this[action] = function() {
        if (this.state === from) {
          this.state = to;
          this.history.push(from);
          while (this.history.length > this.maxHistoryLength) {
            this.history.shift();
          }
          this.changeCallbacks.forEach(function(callback) {
            callback({ from, to });
          });
        } else {
          throw new Error(`state change error: ${action} from ${this.state}`);
        }
      };
    });
  }

  getState() {
    return this.state;
  }

  onChange(callback) {
    this.changeCallbacks.push(callback);
  }
}
