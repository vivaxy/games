/**
 * @since 20180123 13:24
 * @author vivaxy
 */

import {
    buttonAreaTop,
    buttonAreaLeft,
    buttonAreaWidth,
    buttonAreaHeight,
    buttonBackgroundColor,
    buttonTextColor,
    buttonSpacing,
    buttonTypes,
    buttonDisabledBackgroundColor,
} from '../configs';

export default class Buttons {
    constructor({ ctx }) {
        this.ctx = ctx;
        this.buttons = [
            { text: 'Scramble', disabled: true, type: buttonTypes.SCRAMBLE },
            { text: 'Scores', disabled: false, type: buttonTypes.SHOW_SCORE },
        ];
    }

    enable(types) {
        return this.buttons.map((button) => {
            if (types.includes(button.type)) {
                button.disabled = false;
                return true;
            }
            return false;
        });
    }

    hitButton({ x, y }) {
        const buttonWidth = (buttonAreaWidth + buttonSpacing) / this.buttons.length - buttonSpacing;
        const foundButton = this.buttons.find((button, index) => {
            const buttonLeft = buttonAreaLeft + index * (buttonWidth + buttonSpacing);
            if (x > buttonLeft && x < buttonLeft + buttonWidth && y > buttonAreaTop && y < buttonAreaTop + buttonAreaHeight) {
                if (!button.disabled) {
                    button.disabled = true;
                    return true;
                }
            }
            return false;
        });
        if (foundButton) {
            return foundButton.type;
        }
        return null;
    }

    render() {
        const { ctx } = this;
        const buttonWidth = (buttonAreaWidth + buttonSpacing) / this.buttons.length - buttonSpacing;
        this.buttons.forEach((button, index) => {
            const x = buttonAreaLeft + index * (buttonWidth + buttonSpacing);
            ctx.fillStyle = button.disabled ? buttonDisabledBackgroundColor : buttonBackgroundColor;
            ctx.fillRect(x, buttonAreaTop, buttonWidth, buttonAreaHeight);

            ctx.font = '48px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = buttonTextColor;
            ctx.fillText(button.text, x + buttonWidth / 2, buttonAreaTop + buttonAreaHeight / 2);
        });
    }
}
