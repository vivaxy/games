/**
 * @since 2019-09-25 11:48
 * @author vivaxy
 * TODO: speed show as index 0 ~ 100
 */
export default class Speed {
  constructor() {
    this.reset();
  }

  nextTick() {
    this._s++;
  }
  clearTick() {
    this._s = 0;
  }
  isNextFrame() {
    return this._s > this.value;
  }

  reset() {
    this.value = 100;
    this._s = 0;
  }
  get() {
    return this.value;
  }
}
