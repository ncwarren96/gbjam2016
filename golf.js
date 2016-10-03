//Canvas stuff
	var canvas = document.getElementsByTagName('canvas');
	//var ctx = canvas.getContext("2d");
	//ctx.imageSmoothingEnabled = false;

var WIDTH = 160;
var HEIGHT = 144;

var stage;
var ball, speedX, speedY, accelX, accelY, power;
var dirVect = {
	x: 0,
	y: 0
};
var ballIsStop = true;
var dt = 1/30.0;

document.onkeydown = keyPressed;

var arrow;
var ball;

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
	power = 10;
	
	//var text = new createjs.Text(ball.x, "20px Arial", "#ff7700");
	//text.x = 10;	
	
	//Ticker
	createjs.Ticker.on("tick", game_loop);
	createjs.Ticker.setFPS(30);
	
}
function game_loop(event) {
	update();
	draw();
}
function update(){
	//move ball
	ball.x += speedX;
	ball.y += speedY;

	//friction
	speedX = speedX*.97;
	speedY = speedY*.97;
	if(Math.abs(speedX)<0.1 && Math.abs(speedY)<0.1){
		speedX = 0;
		speedY = 0;
		ballIsStop = true;
	}
	//wall collison
	if(ball.y>HEIGHT-10 || ball.y<3){
		speedY = -speedY;
	}
	if(ball.x>WIDTH-6 || ball.x<6){
		speedX = -speedX;
	}
	
	if(ballIsStop){
		arrow.x = ball.x;
		arrow.y = ball.y;
	}
	
	
	stage.update(event);
}

 function draw(){
 	
}

function keyPressed(event){
	console.log("key pressed\n");
	switch(event.keyCode){
		case 37:
			arrow.rotation += 5;
			break;
		case 39:
			arrow.rotation-=5;
			break;
		case 32:
			hitBall(arrow.rotation);
			break;
	}
	stage.update();
}

function hitBall(degrees){
	ballIsStop = false;
	var radians = degrees * (Math.PI/180);
	dirVect.x = -Math.sin(radians);
	dirVect.y = Math.cos(radians);
	
	speedX = power * dirVect.x;
	speedY = power * dirVect.y;
	
	//arrow.x = ball.x;
	//arrow.y = ball.y;
	
	console.log(radians);
}






