<?php

require_once "../ressources/webpage.class.php";





$w = new Webpage("Autobios");


$w->appendContent(<<<HTML

	<canvas id="canvas" width="1000" height="500">Votre navigateur est beaucoup trop vieux pour ça!</canvas>
	<div id="count">aa</div>

HTML
);


$w->addBasicCss();

$w->appendCss(<<<CSS

	body{
		text-align: center;
		font-family: Helvetica;
	}

	 #canvas{
	background-image: url(img/bg3.png);
		background-color: whitesmoke;
		border: solid grey 2px;
		display: inline;
		margin: 2% 0;

	}

	#count{
		font-size:25px;
		color: white;
		padding: 30px;
		position: fixed;
		left: 0;
		top: 2%;
		background-color: rgba(25,25,25,0.3);

	}
CSS
	);

$w->appendJsUrl("slime.js");
$w->appendJsUrl("../ressources/random.js");
$w->appendJsUrl("game.js");
$w->appendJsUrl("arbre.js");
$w->appendJsUrl("fruit.js");
$w->appendJsUrl("animation.js");
$w->appendJsUrl("item.js");


echo $w->toHTML();

