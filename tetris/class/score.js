/**
 * @since 2019-09-25 08:10
 * @author vivaxy
 */
export default class Score {
  constructor() {
    this.value = 0;
  }

  clear() {
    this.value = 0;
  }

  add(value) {
    this.value += value;
  }

  get() {
    return this.value;
  }
}
