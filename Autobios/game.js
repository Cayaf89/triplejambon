

document.addEventListener('DOMContentLoaded', function() {

	var updateTimeout;

	var log = "";
    var logOn = false;

	var counter = document.getElementById("count");
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	
	var slimNumber = 2;


	ctx.slimes = [];

	for(var i =0;i<slimNumber;i++){
		ctx.slimes.push(new Slime(ctx));
	}


var slimy = ctx.slimes[0];
var slimo = ctx.slimes[1];


//slimy.life = 20;
	
	//slimy.items.push(new Item(sunglass,0,15,slimy,false ,true,"sunglass"));
	
	ctx.items = [];

	ctx.arbres = [];


	

	for(var i =0;i<5;i++){
		ctx.arbres.push(new Arbre(ctx));
	}

	ctx.arbres.sort(sortByY);

	ctx.time = 0;

	ctx.fruits = [];
	ctx.animations = [];
	// @return slim
	ctx.getSlimById = function(idSlim){
		var res = null;
		for(var i = 0; i<this.slimes.length && res == null;i++){
			if (this.slimes[i].id == idSlim){
				res = this.slimes[i];
			}
		}
		return res;
	} 
	// @return an object {X: , y:}
	ctx.getSlimPosition = function(idSlim){
		var slim = ctx.getSlimById(idSlim);
		console.log("id slim :" + idSlim);
		console.log(slim);
		var res = {"x": slim.x, "y" : slim.y};
		return res;
	} 


	var update = function(){
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		
		count.innerHTML = ctx.slimes.length;

		


		if((ctx.time% 100) == 0  &&ctx.fruits.length<10*ctx.arbres.length){
			
			for(var i = 0;i<ctx.arbres.length;i++){
				if(random(10)< 6){ctx.arbres[i].makeFruit(ctx);}
			}
		}

		ctx.fruits.sort(sortByY);

		drawFruits(ctx);
		log += ("#TRACKER! game.js.update : fruits drawn" + '\n');
		

		//ctx.slimes.sort(sortByY);
		updateSlimes(ctx);
		log += ('#TRACKER! game.js.update : updateSlimes end' + '\n');
		
		drawArbres(ctx);
		log += ('#TRACKER! game.js.update :  drawArbres end' + '\n');
		drawAnimations(ctx);
		log += ('#TRACKER! game.js.update :  drawAnomations end' + '\n');
	

		drawItems(ctx);
		log += ( '#TRACKER! game.js.update : drawItems end'+ '\n');
		if(random(1000)==18){
			ctx.arbres.push(new Arbre(ctx));
			log += ( '#TRACKER! game.js.update : nouvel arbre'+ '\n');
		}if(random(1500)==18){
			var randonee = random(ctx.arbres.length);
			delete ctx.arbres[randonee];
			ctx.arbres.splice(randonee,1);
			log += ( '#TRACKER! game.js.update : un arbre meurt'+ '\n');
		}

		

		if(ctx.time%10 == 0){
			updateEnergies(ctx);
			log += ( '#TRACKER! game.js.update :energies updated'+ '\n');	
		}
		log += ( "#TRACKER 			###LOOP ENDED###" + '\n');
		if(logOn){
			console.log(log);
			log = "";
		}
		updateTimeout = setTimeout(function(){
			ctx.time = (ctx.time+1);
			update();
		},15);
	}

	update();



});