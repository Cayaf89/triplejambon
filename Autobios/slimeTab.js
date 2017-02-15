var SlimeTab = function(ctx) {
	this.ctx = ctx;
}

SlimeTab.prototype = {
	constructor: SlimeTab,
	update_slimes: function() {
		for(var i = 0; i < this.ctx.slimes.length; i++) {
			if(this.ctx.slimes_tabs.getElementsByClassName("id_" + this.ctx.slimes[i].id)[0] == null) {
				var tr = document.createElement("tr");
				var td_id = document.createElement("td");
				var td_idParent = document.createElement("td");
				var td_statut = document.createElement("td");
				var td_energy = document.createElement("td");
				var td_life = document.createElement("td");
				var td_baby = document.createElement("td");
				var td_favPlace = document.createElement("td");

				tr.setAttribute("class", "slime_" + this.ctx.slimes[i].id);
				tr.setAttribute("onmouseover", "target_slime("+ this.ctx.slimes[i].id +")");
				tr.setAttribute("onmouseout", "untarget_slime("+ this.ctx.slimes[i].id +")");
				td_id.setAttribute("class", "id_" + this.ctx.slimes[i].id);
				td_idParent.setAttribute("class", "idParent_" + this.ctx.slimes[i].id);
				td_statut.setAttribute("class", "statut_" + this.ctx.slimes[i].id);
				td_energy.setAttribute("class", "energy_" + this.ctx.slimes[i].id);
				td_life.setAttribute("class", "life_" + this.ctx.slimes[i].id);
				td_baby.setAttribute("class", "baby_" + this.ctx.slimes[i].id);
				td_favPlace.setAttribute("class", "favPlace_" + this.ctx.slimes[i].id);

				td_id.setAttribute("nowrap", "nowrap");
				td_idParent.setAttribute("nowrap", "nowrap");
				td_statut.setAttribute("nowrap", "nowrap");
				td_energy.setAttribute("nowrap", "nowrap");
				td_life.setAttribute("nowrap", "nowrap");
				td_baby.setAttribute("nowrap", "nowrap");
				td_favPlace.setAttribute("nowrap", "nowrap");

				var text_id = document.createTextNode(this.ctx.slimes[i].id);
				var text_idParent = document.createTextNode(this.ctx.slimes[i].idParent);
				var text_statut = document.createTextNode(this.ctx.slimes[i].statutAge);
				var text_energy = document.createTextNode(Math.trunc(this.ctx.slimes[i].energy));
				var text_life = document.createTextNode(this.ctx.slimes[i].life);
				var text_baby = document.createTextNode(this.ctx.slimes[i].baby);
				var text_favPlace = document.createTextNode(this.ctx.slimes[i].x + " - " + this.ctx.slimes[i].y);

				td_id.appendChild(text_id);
				td_idParent.appendChild(text_idParent);
				td_statut.appendChild(text_statut);
				td_energy.appendChild(text_energy);
				td_life.appendChild(text_life);
				td_baby.appendChild(text_baby);
				td_favPlace.appendChild(text_favPlace);

				tr.appendChild(td_id);
				tr.appendChild(td_idParent);
				tr.appendChild(td_statut);
				tr.appendChild(td_energy);
				tr.appendChild(td_life);
				tr.appendChild(td_baby);
				tr.appendChild(td_favPlace);
				this.ctx.slimes_tabs.appendChild(tr);
			}
			else {
				this.ctx.slimes_tabs.getElementsByClassName("idParent_" + this.ctx.slimes[i].id)[0].innerHTML = this.ctx.slimes[i].idParent;
				this.ctx.slimes_tabs.getElementsByClassName("statut_" + this.ctx.slimes[i].id)[0].innerHTML = this.ctx.slimes[i].statutAge;
				this.ctx.slimes_tabs.getElementsByClassName("energy_" + this.ctx.slimes[i].id)[0].innerHTML = Math.trunc(this.ctx.slimes[i].energy);
				this.ctx.slimes_tabs.getElementsByClassName("life_" + this.ctx.slimes[i].id)[0].innerHTML = this.ctx.slimes[i].life;
				this.ctx.slimes_tabs.getElementsByClassName("baby_" + this.ctx.slimes[i].id)[0].innerHTML = (this.ctx.slimes[i].needBaby) ? "Yeah" : "Nope...";
				this.ctx.slimes_tabs.getElementsByClassName("favPlace_" + this.ctx.slimes[i].id)[0].innerHTML = Math.trunc(this.ctx.slimes[i].x) + " - " + Math.trunc(this.ctx.slimes[i].y);
			}
		}
	},

	delete_slime : function(id) {
		this.ctx.slimes_tabs.deleteRow(this.ctx.slimes_tabs.getElementsByClassName("slime_" + id)[0].rowIndex);
	}
}