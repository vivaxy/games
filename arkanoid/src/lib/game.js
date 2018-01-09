/**
 * @since 20180109 21:12
 * @author vivaxy
 */

import Canvas from './canvas';
import Walls from './walls';
import Bricks from './bricks';
import Plate from './plate';
import Balls from './balls';

export default class Game {
    constructor() {
        this.canvas = new Canvas();
        const ctx = this.canvas.getCtx();
        const size = this.canvas.getSize();
        this.walls = new Walls({ ctx, size });
        this.bricks = new Bricks({ ctx, size });
        this.plate = new Plate({ ctx, size });
        this.balls = new Balls({ ctx, size });
    }

    render() {
        this.canvas.clear();
        this.walls.render();
        this.bricks.render();
        this.plate.render();
        this.balls.render();
    }

    loop() {
        this.render();
        requestAnimationFrame(() => {
            this.loop();
        });
    }
}

