/**
 * @since 20180109 21:07
 * @author vivaxy
 */

import Element from './element';

import { wallThickness } from './common';

class Wall extends Element {
    constructor({ ctx, size, x, y, width, height }) {
        super({ ctx, size });
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgb(90, 90, 90)';
    }

}

export default class Walls extends Element {
    constructor({ ctx, size }) {
        super({ ctx, size });
        this.walls = [
            new Wall({ ctx, size, x: 0, y: 0, width: wallThickness, height: this.size.height }),
            new Wall({ ctx, size, x: 0, y: 0, width: this.size.width, height: wallThickness }),
            new Wall({
                ctx,
                size,
                x: this.size.width - wallThickness,
                y: 0,
                width: wallThickness,
                height: this.size.height,
            }),
        ];
    }

    render() {
        this.walls.forEach((wall) => {
            wall.render();
        });
    }
}
