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
