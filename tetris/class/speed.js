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
    const value = this.value;
    this.value = 100;
    this.toOriginalSpeed = () => {
      this.value = value;
      delete this.toOriginalSpeed;
    };
  }

  get() {
    return this.value;
  }
}
