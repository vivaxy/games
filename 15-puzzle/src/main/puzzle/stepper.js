import { timerFontColor, timerFontSize, timerHeight, timerLeft, timerTop } from '../configs';

/**
 * @since 20180123 13:13
 * @author vivaxy
 */

import { stepperFontColor, stepperFontSize, stepperHeight, stepperLeft, stepperTop, stepperWidth } from '../configs';

export default class Stepper {
    constructor({ ctx }) {
        this.ctx = ctx;
        this.steps = 0;
    }

    render() {
        const { ctx } = this;
        ctx.font = `${stepperFontSize}px/${stepperHeight}px serif`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = stepperFontColor;
        ctx.fillText(String(this.steps), stepperLeft + stepperWidth, stepperTop + stepperHeight / 2);
    }

    reset() {
        this.steps = 0
    }

    update() {
        this.steps += 1;
    }

    getStepper() {
        return this.steps;
    }

}
