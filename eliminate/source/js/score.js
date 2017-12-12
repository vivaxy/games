/**
 * @since 14/12/3 上午10:08
 * @author vivaxy
 */
var Score = function (now, best, remaining, row, col) {

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

};
Score.prototype.initLocalStorage = function () {
    window.fakeStorage = {
        _data: {},
        setItem: function (id, val) {
            return this._data[id] = String(val);
        },
        getItem: function (id) {
            return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
        }
    };
};
Score.prototype.getBestScore = function () {
    return this.storage.getItem(this.key) || 0;
};
Score.prototype.setHighScore = function () {
    var score = Math.max(this.bestScore, this.score);
    this.bestScore = score;
    this.storage.setItem(this.key, score);
};
Score.prototype.addScore = function (num) {
    this.score += num * num;
    this.remaining -= num;
    this.setScore();
};
Score.prototype.setScore = function () {
    this.setHighScore();
    this.nowContainer.innerHTML = this.score;
    this.bestContainer.innerHTML = this.bestScore;
    this.remainingContainer.innerHTML = this.remaining;
};
Score.prototype.reset = function () {
    this.score = 0;
    this.remaining = this.totalBlocks;
    this.setScore();
};
