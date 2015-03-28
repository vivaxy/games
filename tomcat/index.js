/**
 * @since 2014/9/25 15:53
 * @author vivaxy
 */
var Tomcat = function () {
    var imgCount = 0;
    var CONSTANTS = {
        totalImageCount: 443,
        imageLength: {
            angry: 26,
            cymbal: 13,
            drink: 81,
            eat: 40,
            fart: 28,
            foot_left: 30,
            foot_right: 30,
            knockout: 81,
            pie: 24,
            scratch: 56,
            stomach: 34
        },
        buttonType: {
            angry: "canvas",
            cymbal: "button",
            drink: "button",
            eat: "button",
            fart: "button",
            foot_left: "canvas",
            foot_right: "canvas",
            knockout: "canvas",
            pie: "button",
            scratch: "button",
            stomach: "canvas"
        },
        buttonPosition: {
            angry: {
                x: 65,
                y: 75,
                w: 15,
                h: 20
            },
            foot_right: {
                x: 35,
                y: 85,
                w: 15,
                h: 15
            },
            foot_left: {
                x: 50,
                y: 85,
                w: 15,
                h: 15
            },
            knockout: {
                x: 25,
                y: 20,
                w: 50,
                h: 30
            },
            stomach: {
                x: 35,
                y: 55,
                w: 30,
                h: 30
            }
        }
    };
    var formatInt = function (int) {
        if (int == 0) return "00";
        var temp = (int / 100).toFixed(2);
        return temp.substr(2, 4);
    };
    var inBox = function (x, y, box) {
        return (x > box.x && x < box.x + box.w && y > box.y && y < box.y + box.h);
    };
    var ANIMATIONS = {};
    /**
     * angry : {
     *     animationImages : [],
     *     buttonType : "", //canvas, button
     *     buttonBox : {
     *         x : 0,
     *         y : 0,
     *         w : 0,
     *         h : 0
     *     }
     * }
     */
    var canvas = document.getElementsByTagName("canvas")[0], ctx = canvas.getContext("2d");
    var width = 640, height = 1024;
    var playing = false, loopLimit = 0, looper = 0;
    var setupAnimations = function () {
        for (var animation in CONSTANTS.imageLength) {
            ANIMATIONS[animation] = {};
            //set animation images
            ANIMATIONS[animation].animationImages = [];
            for (var i = 0; i < CONSTANTS.imageLength[animation]; i++) {
                var img = new Image();
                img.src = "Animations/" + animation + "/" + animation + "_" + formatInt(i) + ".jpg";
                var addImageCount = function () {
                    imgCount += 1;
                    document.getElementsByClassName("loading")[0].style.width = imgCount * 100 / CONSTANTS.totalImageCount + "%";
                    if (imgCount == CONSTANTS.totalImageCount) document.querySelector('.loading-container').style.display = 'none';
                };
                img.addEventListener("load", addImageCount, false);
                ANIMATIONS[animation].animationImages.push(img);
            }
            //set button type
            ANIMATIONS[animation].buttonType = CONSTANTS.buttonType[animation];
            if (ANIMATIONS[animation].buttonType == "canvas") {
                ANIMATIONS[animation].buttonBox = {};
            }
        }
    };
    var draw = function (animation, i) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(ANIMATIONS[animation].animationImages[i], 0, 0, width, height);
    };
    var drawTest = function () {
        for (var animation in ANIMATIONS) {
            if (ANIMATIONS[animation].buttonType == "canvas") {
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "black";
                ctx.rect(ANIMATIONS[animation].buttonBox.x, ANIMATIONS[animation].buttonBox.y, ANIMATIONS[animation].buttonBox.w, ANIMATIONS[animation].buttonBox.h);
                ctx.stroke();
            }
        }
    };
    var reset = function () {
        draw("angry", 0);
        //drawTest();
    };
    var loop = function (animation) {
        loopLimit += CONSTANTS.imageLength[animation];
        var running = function () {
            if (looper >= loopLimit) {
                clearTimeout(looper);
                playing = false;
            } else {
                draw(animation, CONSTANTS.imageLength[animation] - loopLimit + looper);
                looper = setTimeout(running, 80);
            }
        };
        playing = true;
        running();
    };
    var resize = function () {
        setupLoadingPosition();
        height = window.innerHeight;
        width = window.innerWidth;
        if (width * 1024 > height * 640) {// wider
            width = height * 640 / 1024;
        } else {// higher
            height = width * 1024 / 640;
        }
        canvas.width = width;
        canvas.height = height;
        for (var animation in ANIMATIONS) {
            if (ANIMATIONS[animation].buttonType == "canvas") {
                ANIMATIONS[animation].buttonBox.x = CONSTANTS.buttonPosition[animation].x * width / 100;
                ANIMATIONS[animation].buttonBox.y = CONSTANTS.buttonPosition[animation].y * height / 100;
                ANIMATIONS[animation].buttonBox.w = CONSTANTS.buttonPosition[animation].w * width / 100;
                ANIMATIONS[animation].buttonBox.h = CONSTANTS.buttonPosition[animation].h * height / 100;
            }
        }
        if (!playing) reset();
    };
    var play = function (e) {
        e.stopPropagation();
        if (!playing) {
            var target = e.target.classList[0];
            if (!target || target == 'loading-container') return;
            if (target == "canvas") {
                for (var animation in ANIMATIONS) {
                    if (ANIMATIONS[animation].buttonType == "canvas") {
                        if (inBox(e.offsetX, e.offsetY, ANIMATIONS[animation].buttonBox)) {
                            loop(animation);
                        }
                    }
                }
            } else if (target == "container") {
            } else {
                loop(target);
            }
        }
    };

    setupAnimations();
    resize();
    window.addEventListener("load", reset, false);
    window.addEventListener("resize", resize, false);
    document.addEventListener("click", play, false);
};

var setupLoadingPosition = function () {
    var outerLeft = document.querySelector('.loading-text-outer').getBoundingClientRect().left;
    document.querySelector('.loading-text-inner').style.left = outerLeft + 'px';
};

setupLoadingPosition();

new Tomcat();