/**
 * @since 20180109 21:08
 * @author vivaxy
 */

import Element from './element';
import { wallThickness, bottomSpacing } from './common';

class Brick extends Element {
    constructor({ ctx, size, x, y, width, height }) {
        super({ ctx, size });
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgb(255, 0, 0)';
    }
}

export default class Bricks extends Element {
    constructor({ ctx, size }) {
        super({ ctx, size });
        this.bricks = [];
        this.initializeBricks();
    }

    initializeBricks() {
        const width = (this.size.width - wallThickness - wallThickness) / 4;
        const height = (this.size.height - wallThickness - wallThickness) / 40;
        const widthGap = 10;
        const heightGap = 10;
        let x = wallThickness + width / 2;
        while (x < this.size.width - wallThickness - width) {
            let y = wallThickness + height * 2;
            while (y < this.size.height - wallThickness - height - bottomSpacing) {
                const brick = new Brick({ ctx: this.ctx, size: this.size, x, y, width, height });
                this.bricks.push(brick);
                y = y + height + heightGap;
            }
            x = x + width + widthGap;
        }
    }

    render() {
        this.bricks.forEach((brick) => {
            brick.render();
        });
    }
}
