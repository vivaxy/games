/**
 * @since 20180123 13:13
 * @author vivaxy
 */

export default class Stepper {
    constructor({ ctx }) {
        this.ctx = ctx;
        this.steps = 0;
    }

    render() {

    }

    reset() {
        this.steps = 0
    }

    update() {
        this.steps += 1;
    }
}
