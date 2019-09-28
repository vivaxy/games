/**
 * @since 2019-09-25 11:48
 * @author vivaxy
 * 0: 1000
 * 100: 16
 */
export default class Speed {
  constructor() {
    this.reset();
  }

  clearTick() {
    this.startTime = Date.now();
  }

  isNextFrame() {
    return (
      this.startTime + ((16 - 1000) / 100) * this.value + 1000 < Date.now()
    );
  }

  reset() {
    this.value = 0;
    this.startTime = Date.now();
  }

  toMaxSpeed() {
    this.isNextFrame = function() {
      return this.startTime + 16 < Date.now();
    };
    this.toOriginalSpeed = () => {
      delete this.isNextFrame;
    };
  }

  get() {
    return this.value;
  }
}
