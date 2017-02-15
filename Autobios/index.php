<?php

require_once "../ressources/webpage.class.php";

$w = new Webpage("Autobios");
$w->appendContent(<<<HTML
	<button type="button" id="push_slime" onclick="push_slime();">Ajouter Slime</button>
	<table id="slimes_tabs">
		<thead>
			<td nowrap>id</td>
			<td nowrap>id parent</td>
			<td nowrap>statut</td>
			<td nowrap>energy</td>
			<td nowrap>life</td>
			<td nowrap>baby</td>
			<td nowrap>favPlace</td>
		</thead>
	</table>
	<canvas id="canvas" width="980" height="500">Votre navigateur est beaucoup trop vieux pour ça!</canvas>
	<div id="count">aa</div>
HTML
);

$w->addBasicCss();
$w->appendCss(<<<CSS

	body{
		font-family: Helvetica;
		margin : 0;
		padding : 0;
	}

	#push_slime{
		width: 10%;
		height: 50px;
		margin-left: 40%;
		margin-top: 2%;
		position: fixed;
	}

	#slimes_tabs{
		width: 10%;
		margin-left: 80%;
		margin-top: 2%;
		border: 1px solid black;
		border-collapse: collapse;
		position: fixed;
	}

	#slimes_tabs td {
		border: 1px solid black;
		padding: 4px;

	}

	#canvas{
		background-image: url(img/bg3.png);
		background-color: whitesmoke;
		border: solid grey 2px;
		display: inline-block;
		margin: 8% 3%;
	}

	#count{	
		color: white;
		padding: 10px;
		position: fixed;
		left: 0;
		top: 0%;
		background-color: rgba(25,25,25,0.3);
	}
	#count p {
		font-size:25px;
	}
CSS
);

$w->appendJsUrl("slimeTab.js");
$w->appendJsUrl("slime.js");
$w->appendJsUrl("../ressources/random.js");
$w->appendJsUrl("game.js");
$w->appendJsUrl("arbre.js");
$w->appendJsUrl("fruit.js");
$w->appendJsUrl("animation.js");
$w->appendJsUrl("item.js");

echo $w->toHTML();
