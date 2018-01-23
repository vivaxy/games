/**
 * @since 20180123 13:13
 * @author vivaxy
 */

import { getNow } from '../configs';

export default class Timer {

    constructor({ ctx }) {
        this.ctx = ctx;
        this.time = 0;
        this.startingTime = null;
    }

    render() {
        const { ctx } = this;
    }

    start() {
        this.time = 0;
        this.startingTime = getNow();
    }

    stop() {
        this.startingTime = getNow();
    }

    reset() {
        this.time = 0;
    }

    update() {
        if (this.startingTime) {
            this.time = getNow() - this.startingTime;
        }
    }

}
