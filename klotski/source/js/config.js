/**
 * @since 150206 09:48
 * @author vivaxy
 */

var Config = function () {

    this.blocks = [
        {
            type: 'player',
            style: 'player',
            shape: 'four-block',
            position: {
                x: 1,
                y: 0
            }
        },
        {
            type: 'block',
            style: 'block1',
            shape: 'two-vertical',
            position: {
                x: 0,
                y: 0
            }
        },
        {
            type: 'block',
            style: 'block2',
            shape: 'two-vertical',
            position: {
                x: 3,
                y: 0
            }
        },
        {
            type: 'block',
            style: 'block3',
            shape: 'two-vertical',
            position: {
                x: 0,
                y: 2
            }
        },
        {
            type: 'block',
            style: 'block4',
            shape: 'two-vertical',
            position: {
                x: 3,
                y: 2
            }
        },
        {
            type: 'block',
            style: 'block5',
            shape: 'two-horizon',
            position: {
                x: 1,
                y: 2
            }
        },
        {
            type: 'block',
            style: 'block6',
            shape: 'one',
            position: {
                x: 1,
                y: 3
            }
        },
        {
            type: 'block',
            style: 'block7',
            shape: 'one',
            position: {
                x: 2,
                y: 3
            }
        },
        {
            type: 'block',
            style: 'block8',
            shape: 'one',
            position: {
                x: 0,
                y: 4
            }
        },
        {
            type: 'block',
            style: 'block9',
            shape: 'one',
            position: {
                x: 3,
                y: 4
            }
        },
        {
            type: 'exit',
            position: {
                x: 1,
                y: 4
            }
        },
        {
            type: 'exit',
            position: {
                x: 2,
                y: 4
            }
        }
    ];

    // use window.innerWidth other than screen.width
    // screen.width means screen with, and in some cases, it vary from browsers to browsers
    // see http://www.quirksmode.org/blog/archives/2013/11/screenwidth_is.html
    // u need 2 use window.innerWidth to get the html height
    this.size = Math.min(window.innerWidth / 5, window.innerHeight / 8);

    this.border = 10;

    this.row = 5;

    this.col = 4;

    this.container = document.querySelector('.inner-container');

    this.outerContainer = document.querySelector('.game-container');

    this.stepContainer = document.querySelector('.step');

    this.titleContainer = document.querySelector('.header');

    this.exit = [
        {
            style: 'exit',
            left: this.size * 1 + this.border,
            top: this.size * 5 + this.border,
            width: this.size,
            height: this.border
        },
        {
            style: 'exit',
            left: this.size * 2 + this.border,
            top: this.size * 5 + this.border,
            width: this.size,
            height: this.border
        }
    ];
};
