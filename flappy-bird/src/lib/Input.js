/**
 * @since 2017-03-30 18:16:13
 * @author vivaxy
 */

import EventEmitter from 'eventemitter3';

export default class Input extends EventEmitter {

    constructor() {
        super();
        window.addEventListener('click', () => {
            this.emit('touch');
        });
        window.addEventListener('touchstart', () => {
            this.emit('touch');
        });
        window.addEventListener('keydown', (e) => {
            if (e.which === 32) {
                this.emit('touch');
            }
        });
    }
}
