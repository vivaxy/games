/**
 * @since 2019-09-25 08:10
 * @author vivaxy
 * TODO: put high score in
 */
export default class Score {
  constructor() {
    this.value = 0;
  }

  reset() {
    this.value = 0;
  }

  add(value) {
    this.value += value;
  }

  get() {
    return this.value;
  }
}
