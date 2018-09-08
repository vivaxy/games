/**
 * @since 14/12/3 上午10:08
 * @author vivaxy
 */
export default class Score {
  constructor(now, best, remaining, row, col) {

    this.nowContainer = now;
    this.bestContainer = best;
    this.remainingContainer = remaining;

    this.initLocalStorage();

    this.key = 'bestScore';
    this.storage = !!window.localStorage ? window.localStorage : window.fakeStorage;

    this.totalBlocks = row * col;
    this.score = 0;
    this.remaining = this.totalBlocks;
    this.bestScore = this.getBestScore();

    this.setScore();
  }

  initLocalStorage() {
    window.fakeStorage = {
      _data: {},
      setItem: function (id, val) {
        return this._data[id] = String(val);
      },
      getItem: function (id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
      },
    };
  }

  getBestScore() {
    return this.storage.getItem(this.key) || 0;
  }

  setHighScore() {
    var score = Math.max(this.bestScore, this.score);
    this.bestScore = score;
    this.storage.setItem(this.key, score);
  }

  addScore(num) {
    this.score += num * num;
    this.remaining -= num;
    this.setScore();
  }

  setScore() {
    this.setHighScore();
    this.nowContainer.innerHTML = this.score;
    this.bestContainer.innerHTML = this.bestScore;
    this.remainingContainer.innerHTML = this.remaining;
  }

  reset() {
    this.score = 0;
    this.remaining = this.totalBlocks;
    this.setScore();
  }
}

