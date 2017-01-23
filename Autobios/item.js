var sunglass = new Image();
sunglass.src = "img/sunglass.png";


function drawItems(ctx){
	for(var i =0;i<ctx.items.length;i++){
		ctx.items[i].draw(ctx);
	}
}

var Item = function(img,x,y,slime,inheritable,giveable,name){
	



	this.x = x;
	this.y = y;




	this.img = img;


		this.slime =slime;

	

	if(name != null){
		this.name = name;
	}else{
		this.name ="";
	}

	if(giveable != null){
		this.giveable = giveable;
	}else{
		this.giveable = false;
	}

	if(inheritable != null && this.giveable == false){
		this.inheritable = inheritable;
	}else{
		this.inheritable =false;
	}

	this.size = 30;

}


Item.prototype = {
	Constructor: Item,

	draw: function(ctx){

		if(this.slime!=null){
				ctx.drawImage(this.img,this.slime.x+this.x,this.slime.y+this.y);
			}else{
				ctx.drawImage(this.img,this.x,this.y);
			}
	
	},

	copyTo: function(newSlime){
		return new Item(this.img,this.x,this.y,newSlime,this.giveable,this.inheritable,this.name);
	},

	getBy: function(slime,newX,newY){
		this.slime = slime;
		this.x = newX;
		this.y = newY;


		slime.items.push(this);

		if(this.equals(slime.target)){slime.target = null;}
	},

	kill: function(){
		delete this.slime;
	},

	equals: function(item){
		return this.name == item.name && this.x == item.x && this.y == item.y;
	}



}