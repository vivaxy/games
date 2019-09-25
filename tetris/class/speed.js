/**
 * @since 2019-09-25 11:48
 * @author vivaxy
 */
export default class Speed {
  constructor() {
    this.reset();
  }

  nextTick() {
    this._s++;
    if (this._s > this.value) {
      this._s = 0;
      return true;
    }
    return false;
  }

  reset() {
    this.value = 100;
    this._s = 0;
  }
  get() {
    return this.value;
  }
}
