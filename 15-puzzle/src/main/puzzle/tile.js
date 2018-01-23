import createBezierEasing from 'bezier-easing';

import {
    tileBorderWidth,
    tileBorderColor,
    getTilePosition,
    tileTypes,
    tileTextColor,
    tileColors,
    getNow,
} from '../configs';

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
        this.fillStyle = tileColors[Math.min(rowIndex, colIndex)];

        // https://github.com/atlassian/react-beautiful-dnd/blob/master/src/view/animation.js#L26
        this.easing = createBezierEasing(0.2, 0, 0, 1);
        this.animationDuration = 100;
    }

    renderSpaceTile() {
        const { ctx, fillStyle, borderWidth, width, height, rowIndex, colIndex, deltaX, deltaY } = this;
        const { x, y } = getTilePosition({ colIndex, rowIndex });
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x + deltaX, y + deltaY, width, height);

        if (borderWidth) {
            ctx.lineWidth = borderWidth;
            ctx.strokeStyle = strokeStyle;
            ctx.strokeRect(x, y, width, height);
        }
    }

    renderNormalTile() {
        const { ctx, strokeStyle, fillStyle, borderWidth, width, height, text, rowIndex, colIndex, deltaX, deltaY } = this;
        const { x, y } = getTilePosition({ colIndex, rowIndex });
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x + deltaX, y + deltaY, width, height);

        if (borderWidth) {
            ctx.lineWidth = borderWidth;
            ctx.strokeStyle = strokeStyle;
            ctx.strokeRect(x, y, width, height);
        }

        ctx.font = '48px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = tileTextColor;
        ctx.fillText(text, x + deltaX + width / 2, y + deltaY + height / 2);
    }

    render() {
        const { type } = this;
        if (type === tileTypes.SPACE) {
            return this.renderSpaceTile();
        }
        return this.renderNormalTile();
    }

    update() {
        this.updateDeltaAnimation();
    }

    animateToResetPosition() {
        this.animationStartTime = getNow();
        this.animationStartDeltaX = this.deltaX;
        this.animationStartDeltaY = this.deltaY;
        this.animationStartWidth = this.width;
        this.animationStartHeight = this.height;
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
                this.animationStartWidth = null;
                this.animationStartHeight = null;
            }
        }
    }
}
