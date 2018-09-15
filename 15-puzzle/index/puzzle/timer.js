/**
 * @since 20180123 13:13
 * @author vivaxy
 */

import { getNow, timerFontColor, timerFontSize, timerHeight, timerLeft, timerTop } from '../configs.js';

const pad = (string, length) => {
  while (length - string.length > 0) {
    string = '0' + string;
  }
  return string;
};

export const formatTime = (time) => {
  const milliseconds = time % 1000;
  const seconds = (time - milliseconds) / 1000 % 60;
  const minutes = ((time - milliseconds) / 1000 - seconds) / 60;
  return `${minutes}:${pad(String(seconds), 2)}.${pad(String(milliseconds), 3)}`;
};

export default class Timer {

  constructor({ ctx }) {
    this.ctx = ctx;
    this.time = 0;
    this.startingTime = null;
  }

  render() {
    const { ctx } = this;
    ctx.font = `${timerFontSize}px/${timerHeight}px serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = timerFontColor;
    ctx.fillText(formatTime(this.time), timerLeft, timerTop + timerHeight / 2);
  }

  start() {
    if (!this.startingTime) {
      this.time = 0;
      this.startingTime = getNow();
    }
  }

  stop() {
    this.startingTime = null;
  }

  reset() {
    this.time = 0;
    this.startingTime = null;
  }

  update() {
    if (this.startingTime) {
      this.time = getNow() - this.startingTime;
    }
  }

  getTime() {
    return this.time;
  }

}
