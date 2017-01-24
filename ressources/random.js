//créé un random de 0 a a
function random(a) { 

	return (Math.floor((a)*Math.random()+1))-1; 
} 

function toRGB(tab){
	var res;

	if(tab[3]!=null){
		res= "rgba";
	}else{
		res ="rgb";
	}

	res += "("+tab[0]+","+tab[1]+","+tab[2];
	if(tab[3]!=null){
		res+= (","+tab [3]);
	}

	res+= ")";

	return res;

}


function toHSL(tab){
	var res;

	if(tab[3]!=null){
		res= "hsla";
	}else{
		res ="hsl";
	}

	res += "("+tab[0]+","+tab[1]+"%,"+tab[2]+"%";
	if(tab[3]!=null){
		res+= (","+tab [3]);
	}

	res+= ")";

	return res;

}

function sortByY(a,b){
		return a.y - b.y;
}