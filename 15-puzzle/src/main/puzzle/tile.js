import createBezierEasing from 'bezier-easing';

import {
    tileBorderWidth,
    tileBorderColor,
    getTilePosition,
    tileTypes,
} from '../configs';

const getNow = () => {
    return new Date().getTime();
};

export default class Tile {
    constructor({ ctx, width, height, text, type, rowIndex, colIndex, deltaX = 0, deltaY = 0 }) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.borderWidth = tileBorderWidth;
        this.strokeStyle = tileBorderColor;
        this.text = text;
        this.type = type;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.deltaX = deltaX;
        this.deltaY = deltaY;

        // https://github.com/atlassian/react-beautiful-dnd/blob/master/src/view/animation.js#L26
        this.easing = createBezierEasing(0.2, 0, 0, 1);
        this.animationDuration = 100;
    }

    renderSpaceTile() {
        const { ctx, strokeStyle, borderWidth, width, height, rowIndex, colIndex, deltaX, deltaY } = this;
        const { x, y } = getTilePosition({ colIndex, rowIndex });
        ctx.fillStyle = '#999';
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = borderWidth;
        ctx.fillRect(x + deltaX, y + deltaY, width, height);
    }

    renderNormalTile() {
        const { ctx, strokeStyle, borderWidth, width, height, text, rowIndex, colIndex, deltaX, deltaY } = this;
        const { x, y } = getTilePosition({ colIndex, rowIndex });
        ctx.fillStyle = '#000';
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = borderWidth;
        ctx.fillRect(x + deltaX, y + deltaY, width, height);

        ctx.font = '48px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.fillText(text, x + deltaX + width / 2, y + deltaY + height / 2);
    }

    render() {
        const { type } = this;
        this.updateDeltaAnimation();
        if (type === tileTypes.SPACE) {
            return this.renderSpaceTile();
        }
        return this.renderNormalTile();
    }

    animateToResetPosition() {
        this.animationStartTime = getNow();
        this.animationStartDeltaX = this.deltaX;
        this.animationStartDeltaY = this.deltaY;
    }

    updateDeltaAnimation() {
        if (this.animationStartTime) {
            const progress = (getNow() - this.animationStartTime) / this.animationDuration;
            this.deltaX = this.animationStartDeltaX * (1 - this.easing(progress));
            this.deltaY = this.animationStartDeltaY * (1 - this.easing(progress));
            if (progress >= 1) {
                this.animationStartTime = null;
                this.animationStartDeltaX = null;
                this.animationStartDeltaY = null;
            }
        }
    }
}
