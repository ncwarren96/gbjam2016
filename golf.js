//Canvas stuff
	var canvas = document.getElementsByTagName('canvas');
	var ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

var WIDTH = 160;
var HEIGHT = 144;

var stage;
var ball, speedX, speedY, accelX, accelY, power;
var dt = 1/30.0;
function init(){

	console.log("init");
	stage = new createjs.Stage("canvas");
	
	//Test ball
	ball = new createjs.Shape();
	ball.graphics.beginFill("green").drawCircle(0, 0, 3);
	ball.x = 20;
	ball.y = 20;
	stage.addChild(ball);
	
	arrow = new createjs.Shape();
	arrow.graphics.beginFill("black").drawRect(0, 0, 1, 20);
	arrow.x = ball.y;
	arrow.y = ball.x;
	
	stage.addChild(arrow);
	
	speedX = 0;
	speedY = 0;
	power = 0;
	
	//var text = new createjs.Text(ball.x, "20px Arial", "#ff7700");
	//text.x = 10;	
	
	index.document.onkeydown = keyPressed;
	
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
	ball.y += speedY;
	
	//arrow.rotation++;
	//friction
	speedX = speedX*.95;
	speedY = speedY*.95;
	
	//wall collison
	if(ball.y>150 || ball.y<0){
		speedY = -speedY;
	}
	if(ball.x>WIDTH || ball.x<0){
		speedX = -speedX;
	}
	
	
	var inc = true;
	if(power>100){
		inc = !inc;
	}
	if(inc){
		power++;
	}else{
		power--;
	}
	
	stage.update(event);
}

 function draw(){
 	
}

function keyPressed(event){
	switch(event.keyCode){
		case 37:
			arrow.rotation++;
			break;
		case 39:
			arrow.rotation--;
			break;
		case 32:
			//hit ball
			break;
	}
	stage.update();
}










