// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());
/**
 * @since 2014/10/23 9:26
 * @author vivaxy
 */
var Cart = function(x,y){
    this.x = x;
    this.y = y;
    this.ctx = document.getElementsByClassName("canvas")[0].getContext("2d");
};

Cart.prototype.draw = function(){
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.x-200,this.y,200,50);
};

/**
 * @since 2014/10/23 9:26
 * @author vivaxy
 */
var Wheel = function(){
    this.ctx = document.getElementsByClassName("canvas")[0].getContext("2d");
    this.radius = 40;
};

Wheel.prototype.draw = function(){

};
/**
 * @since 2014/10/23 9:25
 * @author vivaxy
 */
var Spoon = function(x, y){
    this.ctx = document.getElementsByClassName("canvas")[0].getContext("2d");
    this.x = x;
    this.y = y;
    this.minDegree = 20;
    this.degree = 20;
    this.maxDegree = 70;
    this.stage = 0;//0: before pull; 1: pulling; 2: loose; 3: broken;
};

Spoon.prototype.draw = function(){
    this.ctx.strokeStyle = "blue";
    this.ctx.lineWidth = 10;
    this.ctx.translate(this.x,this.y);
    this.ctx.rotate((90-this.degree)*Math.PI/180);
    this.ctx.beginPath();
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(-200,0);
    this.ctx.arc(-250,0,50,0,Math.PI);
    this.ctx.stroke();
    this.ctx.rotate(-(90-this.degree)*Math.PI/180);
    this.ctx.translate(-this.x,-this.y);
};

/**
 * @since 2014/10/23 9:37
 * @author vivaxy
 */
var Catapult = function(){

    this.x = 300;
    this.y = 500;
    this.cart = new Cart(this.x, this.y);
    this.spoon = new Spoon(this.x, this.y);

    this.wheel = new Wheel();

    this.cart.draw();
    this.spoon.draw();

};
/**
 * @since 2014/10/23 9:27
 * @author vivaxy
 */
var Ball = function(x,y){
    this.x = x;
    this.y = y;
    this.ctx = document.getElementsByClassName("canvas")[0].getContext("2d");
    this.radius = 40;
};

Ball.prototype.draw = function(degree){
    degree = (90-degree)*Math.PI/180;
    var length = 250;
    var x = this.x - length * Math.cos(degree);
    var y = this.y - length * Math.sin(degree);
    this.ctx.fillStyle = "orange";
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, 2*Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
};
/**
 * @since 2014/10/23 9:27
 * @author vivaxy
 */
var Input = function() {
    this.events = {};
    document.addEventListener("keydown", this.keyDown.bind(this), false);
    document.addEventListener("keyup", this.keyUp.bind(this), false);
    document.addEventListener("touchstart", this.keyDown.bind(this), false);
    document.addEventListener("touchend", this.keyUp.bind(this), false);
};

Input.prototype.bindEvent = function (event, callback) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
};

Input.prototype.emitEvent = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach(function (callback) {
            callback(data);
        });
    }
};

Input.prototype.clearEvent = function (event) {
    this.events[event] = null;
};


Input.prototype.keyDown = function (e) {
    this.emitEvent("key-down");
};

Input.prototype.keyUp = function (e) {
    this.emitEvent("key-up");
};
/**
 * @since 2014/10/23 9:30
 * @author vivaxy
 */
var Game = function(){
    this.canvas = document.getElementsByClassName("canvas")[0];
    this.ctx = this.canvas.getContext("2d");
    this.hint = document.getElementsByClassName("hint")[0];

    this.canvas.width = 400;
    this.canvas.height = 600;

    this.ctx.fillStyle = "rgb(200,200,200)";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

    this.looper = 0;

    this.catapult = new Catapult();
    this.ball = new Ball(300,500);
    this.ball.draw(this.catapult.spoon.degree);

    this.input = new Input();
    this.input.bindEvent("key-down", this.keyDown.bind(this), false);
    this.input.bindEvent("key-up", this.keyUp.bind(this), false);

};

Game.prototype.keyDown = function(){
    switch (this.catapult.spoon.stage){
        case 0:
            this.catapult.spoon.stage = 1;
            this.pull();
            break;
        default:
            break;
    }
};

Game.prototype.keyUp = function(){
    switch (this.catapult.spoon.stage){
        case 1:
            this.loose();
            this.catapult.spoon.stage = 2;
            break;
        default:
            break;
    }
};

Game.prototype.pull = function(){

    this.catapult.spoon.degree += 0.1;

    this.ctx.fillStyle = "rgb(200,200,200)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.catapult.cart.draw();
    this.catapult.spoon.draw();
    this.ball.draw(this.catapult.spoon.degree);
    if (this.catapult.spoon.degree >= this.catapult.spoon.maxDegree) {
        this.hint.innerHTML = "fail";
        this.catapult.spoon.stage = 3;
        cancelAnimationFrame(this.looper);
    }else{
        this.looper = requestAnimationFrame(this.pull.bind(this));
    }

};

Game.prototype.loose = function() {
    this.catapult.spoon.degree -= 10;

    this.ctx.fillStyle = "rgb(200,200,200)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.catapult.cart.draw();
    this.catapult.spoon.draw();

    if (this.catapult.spoon.degree <= this.catapult.spoon.minDegree){
        cancelAnimationFrame(this.looper);
    }else{
        this.looper = requestAnimationFrame(this.loose.bind(this));
    }
};
/**
 * @since 2014/10/23 9:39
 * @author vivaxy
 */
var game = new Game();