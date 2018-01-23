/**
 * @since 20180123 13:13
 * @author vivaxy
 */

import { getNow, timerFontColor, timerFontSize, timerHeight, timerLeft, timerTop, timerWidth } from '../configs';

export default class Timer {

    constructor({ ctx }) {
        this.ctx = ctx;
        this.time = 0;
        this.startingTime = null;
    }

    formatTime() {
        const milliseconds = this.time % 1000;
        const seconds = (this.time - milliseconds) / 1000 % 60;
        const minutes = ((this.time - milliseconds) / 1000 - seconds) / 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}.${milliseconds}`;
    }

    render() {
        const { ctx } = this;
        ctx.font = `${timerFontSize}px/${timerHeight}px serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = timerFontColor;
        ctx.fillText(this.formatTime(this.time), timerLeft, timerTop + timerHeight / 2);
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

}
