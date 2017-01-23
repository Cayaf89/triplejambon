function drawAnimations(ctx){
	for(var i =0;i<ctx.animations.length;i++){
		var a = !ctx.animations[i].draw(ctx);

		if(ctx.animations[i].end<ctx.time){
			delete ctx.animations[i];
			ctx.animations.splice(i,1);
		}

	}
}

var Animation = function(ctx,img,x,y,beg,end){

	this.img = img;
	this.x = x;
	this.y = y;
	this.beg = beg;
	this.end = end;





}



Animation.prototype = {
	constructor: Animation,
	draw: function(ctx){
	




		if(ctx.time > this.beg && ctx.time < this.end){
			if(this.end-ctx.time> 3*(this.end-this.beg)/4){
				this.y++;
			}else{
				this.y--;
			}
			ctx.drawImage(this.img,this.x,this.y);
			return true;
		}else{
			return false;
		}

	}


}