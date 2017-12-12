/**
 * @since 2017-03-17 11:33:56
 * @author vivaxy
 */

import EventEmitter from 'eventemitter3';

import canvas from './canvas';
import Bird from './Bird';
import Input from './Input';
import Background from './Background';
import StickManager from './StickManager';

export default class GameManager extends EventEmitter {

    constructor() {
        super();

        this.background = new Background();
        this.bird = new Bird();
        this.input = new Input();
        this.sticks = new StickManager();
        this.input.on('touch', () => {
            this.bird.moveUp();
        });
    }

    paint() {
        canvas.clear();
        this.background.move();
        this.background.paint();
        this.sticks.move();
        this.sticks.paint();
        this.bird.move();
        this.bird.paint();
    }

    checkGameOver() {
        const isCollided = this.sticks.getSticks().some((stick) => {
            return stick.isCollidedWidthBird(this.bird.isCollidedWithRect.bind(this.bird));
        });
        const isOutOfScreen = this.bird.isOutOfScreen();
        return isCollided || isOutOfScreen;
    }

    loop() {
        this.paint();
        if (this.checkGameOver()) {
            this.emit('game-over');
            return this;
        }
        requestAnimationFrame(() => {
            this.loop();
        });
        return this;
    }

    start() {
        this.loop();
    }

}
