var arbreSprite = new Image();
arbreSprite.src = ("img/arbre.png");

function drawArbres(ctx){
	for(var i = 0;i< ctx.arbres.length;i++){
		ctx.arbres[i].draw(ctx);
	}
}


var Arbre = function(ctx, x, y){
	
	this.size = 100;

	if(x == null){ this.x = random((ctx.canvas.width)-this.size);}
	else{this.x = x;}
	if(y == null){ this.y = random(ctx.canvas.height-this.size);}
	else{this.y = y;}

	this.life = 300;

	this.color = [100,165,85];
}


Arbre.prototype ={
	constructor: Arbre,

	draw: function(ctx){
		/*ctx.beginPath();
		ctx.arc(this.x,this.y,this.size/2,0,2*Math.PI, false);	
		ctx.fillStyle = toRGB(this.color);

		ctx.fill();*/
		ctx.drawImage(arbreSprite,this.x,this.y);
	},

	makeFruit : function(ctx){
		var fx = random(this.size+30)-this.size/2;
		var fy = random(this.size+30)-this.size/2;
/*
		if(fx>0){
			fx+= (this.size);
		}

		if(fy>0){
			fy += (this.size);
		}

*/
		var f = new Fruit(ctx,this.x+this.size/2+fx,this.y+this.size/2+fy);



		ctx.fruits.push(f);
	}
}