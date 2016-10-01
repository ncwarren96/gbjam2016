//Canvas stuff
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
//var width = $("#canvas").width();
//var height = $("#canvas").height();

function init(){

	console.log("init");
	
	//Test ball
	var stage = new createjs.Stage("canvas");
	var ball = new createjs.Shape();
	ball.graphics.beginFill("green").drawCircle(0, 0, 2);
	ball.x = 10;
	ball.y = 10;
	stage.addChild(circle);
	
	//Ticker
	createjs.Ticker.on("tick", game_loop);
	createjs.Ticker.setFPS(30);
	
}
function game_loop(event) {
	update();
	draw();
}
