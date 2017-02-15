var slimeSprite = new Image();
slimeSprite.src="img/slime.png";

var slimeSpriteBlink = new Image();
slimeSpriteBlink.src="img/slimeBlink.png";

var childSlimeSprite = new Image();
childSlimeSprite.src="img/childSlime.png";

var slimeTarget = new Image();
slimeTarget.src="img/circular-target-symbol-icon.png";

var heart = new Image();
heart.src = "img/life.png";

var dead = new Image();
dead.src = "img/dead.png";

var beard = new Image();
beard.src = "img/barbe.png";

var idCounter = 1;

var log = "";
var logOn = true;

function updateSlimes(ctx){
	var slim;

	for(var i =0;i<ctx.slimes.length;i++){

		slim = ctx.slimes[i];

		/*if(slim.energy < 20 && (slim.target == slim.favoritePlace) && ctx.fruits.length > 0){
			slim.target = ctx.fruits[random(ctx.fruits.length)];

		}
		
		if(slim.target == null){slim.target = slim.favoritePlace;}

		if(	slim.target.type == "fruit"
			&& ctx.fruits.length >0 
			&& slim.collision(slim.target)){
			slim.eat(ctx,slim.target);

		}*/
		slim.defineTarget(ctx);
	

		if(slim.blink < ctx.time && random(25)==5){
			slim.blink = ctx.time+5;
		}
		slim.move(ctx);

		slim.testBabies(ctx);
		slim.collideItem(ctx);


		slim.draw(ctx);

		if(!slim.updateLife(ctx)){
			ctx.slimeTab.delete_slime(ctx.slimes[i].id);
			slim.kill(ctx);
			ctx.slimes.splice(i,1);
			ctx.animations.push(new Animation(ctx,dead,slim.x,slim.y-60,ctx.time,ctx.time+25));
		}
		ctx.slimeTab.update_slimes();
	}
}

function updateEnergies(ctx){

	for(var i =0;i<ctx.slimes.length;i++){
		ctx.slimes[i].updateEnergy();
	}
}


var Slime = function(ctx, col, x,y,idParent = null){
	this.size = 22;
	this.statutAge = 'E';
	this.id = idCounter++;
	this.idParent = idParent;
	this.type = "slime";
	if(logOn){
		//console.log("#TRACKER slime.js newborn id: #" + this.id + "- parent: #" + (this.idParent === null ? "null": this.idParent));
	}
	if(x == null){
		this.x = random(ctx.canvas.width - this.size);
	}else{
		this.x = x;
	}

	if(y == null){
		this.y = random(ctx.canvas.height - this.size);
	}else{
		this.y = y;
	}

	if(col == null){
		this.color = [ random(360), 90, 60, 0.6];
	}else{
		this.color = col;
	}


	
	this.favoritePlace = {
		x:random(ctx.canvas.width-this.size),
		y:random(ctx.canvas.height-this.size)
	}

	this.energy = 100;

	this.life = 100;

	this.target = null;

	this.needBaby = false;

	this.blink =0;
	this.items =[];





};
Slime.prototype ={
	constructor : Slime,
	draw: function(ctx){this.gaveBirth

		if(this.statutAge == 'E'){
			//ctx.fillRect(this.x,this.y,this.size,this.size);
			ctx.fillStyle = toHSL(this.color);

			ctx.beginPath();
			ctx.arc(this.x+this.size/2 ,this.y+this.size/2,this.size/2,0,2*Math.PI, false);

			ctx.fill();

			ctx.drawImage(childSlimeSprite,this.x-1,this.y);

		

			for(var i =0;i<this.items.length;i++){
					this.items[i].draw(ctx);
			}


		}else{
			//ctx.fillRect(this.x,this.y,this.size,this.size);
			ctx.fillStyle = toHSL(this.color);

			ctx.beginPath();
			ctx.arc(this.x+this.size/2 ,this.y+this.size/2,this.size/2,0,2*Math.PI, false);

			ctx.fill();

			if(this.blink >ctx.time){
				ctx.drawImage(slimeSpriteBlink,this.x-10,this.y);
			}else{
				ctx.drawImage(slimeSprite,this.x-10,this.y);
			}
		

			for(var i =0;i<this.items.length;i++){
					this.items[i].draw(ctx);
			}
		}	
	},

	collision: function(b){
		var thisDot = [this.x+this.size/2,this.y+this.size/2];
		var bDot = [b.x+b.size/2,b.y+this.size/2];

		var X = thisDot[0]-bDot[0];
		var Y = thisDot[1]-bDot[1];

		var dist = Math.sqrt(X*X + Y*Y);



		return Math.abs(dist)<this.size;
	},

	follow : function(a,speed,ecart){
		if(a !== null){
			if(ecart==null){ecart = 1;}
			if( Math.abs(this.x - a.x)>ecart || Math.abs(this.y-a.y)>ecart ){

				var mat = Math.sqrt((this.x-a.x)*(this.x-a.x)+(this.y-a.y)*(this.y-a.y));

				if(mat == 0){mat = 1;}

				var dx = (this.x-a.x)/mat;
				var dy = (this.y-a.y)/mat;

				this.x -= (dx*speed);
				this.y -= (dy*speed);
			}
		}
	},

	outboundPrevent : function(ctx){
		if(this.x < 0){	this.x = 0;}
		if(this.y <0) {this.y = 0;}
		if(this.x + this.size > ctx.canvas.width){ this.x = ctx.canvas.width -this.size;}
		if(this.y + this.size > ctx.canvas.height){ this.y = ctx.canvas.height -this.size;}
	},

	atFavorite : function(){
		return (Math.abs(this.x - this.favoritePlace.x) <1
			&& Math.abs(this.y- this.favoritePlace.y)<1);
	},

	move: function(ctx){
		if(this.target == null || this.atFavorite()){
			this.favoritePlace = {
				x: random(ctx.canvas.width-this.size),
				y : random(ctx.canvas.height-this.size)
			};
			this.target = this.favoritePlace;
		}

		this.follow(this.target, 1.5,1);
	},

	/* fait un bébé */
	baby : function(ctx,parent){
		if( (!this.gaveBirth || !parent.gaveBirth) 
			&& this.statutAge != "E" && parent.statutAge != "E"){

			var babyX = this.x + 50-random(100);
			var babyY = this.y+ 50-random(100);

			var babyCol = [
			(this.color[0] +random(20))%360,
			90,
			60,
			0.6
			];
			var s = new Slime(ctx,babyCol,babyX,babyY,this.id);

			if(this.gaveBirth){
				parent.gaveBirth = true;
			}else {
				this.gaveBirth = true;
			}

			this.target = null;
			this.needBaby = false;

			ctx.animations.push(new Animation(ctx,heart,this.x,this.y-40,ctx.time,ctx.time+25));

			for(var i = 0;i<this.items.length;i++){
				if(this.items[i].inheritable){

					s.items.push(this.items[i].copyTo(s));
				}else if(this.items[i].giveable){

					s.items.push(this.items[i].copyTo(s));
					delete this.items[i];
					this.items.splice(i,1);
				}
			}

			for(var i = 0;i<parent.items.length;i++){
				if(parent.items[i].inheritable){
					s.items.push(parent.items[i].copyTo(s));
				}else if(parent.items[i].giveable){

					s.items.push(parent.items[i].copyTo(s));
					delete parent.items[i];
					parent.items.splice(i,1);
				}
			}
			ctx.slimes.push(s);
		}
	},

	updateEnergy: function () {
		if(this.energy>0){
			this.energy-= 0.9;
		}else{
			this.life--;
		}
		
	},

	isHungry: function(){
		return this.energy<20;
	},

	/* pour manger */
	eat : function(ctx,fruit){
		var f = -1;
		for(var i = 0;i<ctx.fruits.length && f== -1;i++){
			if (fruit.equals(ctx.fruits[i])){
				f = i;
			}
		}

		if(f!=-1){
			this.energy+= ctx.fruits[f].energy;
			for(var i = 0;i<ctx.slimes.length;i++){
				if(ctx.fruits[f].equals(ctx.slimes[i].target)){
					ctx.slimes[i].target = null;
				}
			}
			delete ctx.fruits[f];
			ctx.fruits.splice(f,1);
		}
	},

	// met à jour la vie en fonction du temps et renvoie false si la vie est <0
	updateLife: function(ctx){
		if(this.life >0){
			if(ctx.time%100 == 0){
				this.life --;

				/* a modifier -> appel de nextAge qui s'occupe de faire les modifs */
				this.nextAge(true);
				
			}
			return true;
		}else{
			return false;
		}
	},

	// @Return true si le point x,y est dans le radius du slime
	around: function(x,y,radius){
		// pythagore maggle
		return radius > Math.sqrt((this.x-x)*(this.x-x)+(this.y-y)*(this.y-y));
	},

	equals : function(slime){
		var res = true;
		for(var i =0;i<this.color.length;i++){
			res = res && (this.color[i] == slime.color[i]);
		}
		return res && this.x == slime.x && this.y == slime.y;
	},

	/* fait un bébé si les conditions sont ok */
	testBabies: function(ctx){
		// les enfants et les vieux ne kennent pas
		if(this.statutAge != "E" && this.statutAge != "V"){
			
			if(!this.needBaby){
				this.needBaby = !this.gaveBirth && this.life<90 && random(10)==5;
			}

			if(this.needBaby && this.target.color== null && ctx.slimes.length > 1){
				do{
					this.target = ctx.slimes[random(ctx.slimes.length)];
				}while(this.equals(this.target));
			}

			if(this.needBaby && this.target.color != null && this.collision(this.target)){
				this.baby(ctx,this.target);
			}
		}
	},

	/* si le slime rencontre un item, il le ramasse */
	collideItem: function(ctx){
		for(var i = 0;i<ctx.items.length;i++){
			if(this.collision(ctx.items[i])){
				ctx.items[i].getBy(this,0,15);
				ctx.items.splice(i,1);
			}
		}
	},

	// Detyermine si il peut passer a l'age suivant
	// le fait passer a l'age suivant si update = true
	// renvoie true si il peut passer a l'age suivant, false sinon
	nextAge: function(update){
		var result = false;
		// l'adulte passe à vieux si life < 20
		if (this.statutAge === "A"){
			if (this.life < 20){
				result = true;
				if (update == true){
					this.statutAge = "V";
					this.color[1] = 20;
					this.color[2] = 55;
					this.items.push(new Item(beard,-9,7,this));
					
				}
			}
		}// l'enfant passe à l'age adulte s'il n'a pas faim et life <80
		else if(this.statutAge === "E"){
			if(this.isHungry() == false && this.life <= 80){
				result = true;
				if(update == true){
					this.statutAge = "A";
					this.size = 30;
				}
			}
		}
		return result;
	},

	defineTarget: function(ctx){
		// si l'enfant est pas loin de sa mere, sa target redeviens null
		if(this.energy < 20 
			&& (this.target == this.favoritePlace) 
			&& ctx.fruits.length > 0){
			this.target = ctx.fruits[random(ctx.fruits.length)];
		}

		if(	this.target != null && this.target.type == "fruit"){
			if(ctx.fruits.length >0 && this.collision(this.target)){
				this.eat(ctx,this.target);
			}
		}

		if(this.target == null){
			if(this.statutAge =="E" && this.idParent != null){
				this.favoritePlace = ctx.getSlimPosition(this.idParent);
				this.favoritePlace.type = "parent";
			}else{
				this.favoritePlace.type = "favorite"
			}
			this.target = this.favoritePlace;
		}
	},

	set_target: function() {
		var target_item = new Item(slimeTarget,-(this.size/2),-(this.size/2),this,false,false,"target");
		this.items.push(target_item);
	},

	unset_target: function() {
		for(var i = 0; i < this.items.length; i++) {
			if(this.items[i].name == "target") {
				this.items[i].kill();
				this.items.splice(i,1);
			}
		}
	},

	kill: function(ctx) {
		for(var i = 0; i < ctx.slimes.length; i++) {
			if(ctx.slimes[i].idParent == this.id){
				ctx.slimes[i].idParent = null;
			}
		}
		this.items.splice(0,this.items.length);
		delete this;
	}
}; 