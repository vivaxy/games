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
