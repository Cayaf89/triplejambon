var appleSprite = new Image();
appleSprite.src = "img/apple.png";

function drawFruits(ctx){
	for(var i = 0;i< ctx.fruits.length;i++){
		ctx.fruits[i].draw(ctx);
	}
}

var Fruit = function(ctx, x, y){
	
	this.size = 20;

	this.x = x;
	this.y = y;

	this.energy = 70;


	this.type = "fruit";

}


Fruit.prototype ={
	constructor: Fruit,

	draw: function(ctx){
		/*ctx.beginPath();
		ctx.arc(this.x,this.y,this.size/2,0,2*Math.PI, false);	
		ctx.fillStyle = toRGB(this.color);

		ctx.fill();*/

		ctx.drawImage(appleSprite,this.x-this.size/2,this.y-this.size/2);
	},

	equals : function(fruit){
		if(fruit != null){
			return this.x == fruit.x && this.y == fruit.y;
		}else{
			return false;
		}
		
	}
}