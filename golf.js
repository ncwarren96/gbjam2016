//Canvas stuff
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
//var width = $("#canvas").width();
//var height = $("#canvas").height();


var stage;
var ball, speedX, speedY, power; 
function init(){

	console.log("init");
	stage = new createjs.Stage("canvas");
	
	//Test ball
	ball = new createjs.Shape();
	ball.graphics.beginFill("green").drawCircle(0, 0, 2);
	ball.x = 10;
	ball.y = 10;
	stage.addChild(ball);
	
	speedX = 3;
	speedY = 1;
	power = 0;
		
	//Ticker
	createjs.Ticker.on("tick", game_loop);
	createjs.Ticker.setFPS(30);
	
}
function game_loop(event) {
	update();
	draw();
}
function update(){
	ball.x += speedX;
	speedX = speedX*.95;
	stage.update(event);
	
	console.log(speedX);
	var inc = true;
	
	if(power>100){
		inc = !inc;
	}
	
	if(inc){
		power++;
	}else{
		power--;
	}
}

 function draw(){
 	
}












