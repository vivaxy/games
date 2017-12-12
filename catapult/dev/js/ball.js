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