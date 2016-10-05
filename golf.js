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

//Ball state 0=stopped, 1=charging, 2=hit/moving
var ballState = 0;
var dt = 1/30.0;

document.onkeydown = keyPressed;

var arrow;
var ball;
var background;
var powerMeter;

var i = 0;
var inc = true;

function init(){

	console.log("init");
	stage = new createjs.Stage("canvas");
	
	var image = new Image();
	image.src = "./GolfBase.png";
	background = new createjs.Bitmap(image);
	stage.addChild(background);
	
	//Test ball
	image = new Image();
	image.src = "./GolfBall.png";
	ball = new createjs.Bitmap(image);
	//ball = new createjs.Shape();
	//ball.graphics.beginFill("green").drawCircle(0, 0, 3);
	ball.x = 20;
	ball.y = 20;
	stage.addChild(ball);
	
	arrow = new createjs.Shape();
	arrow.graphics.beginFill("black").drawRect(0, 0, 1, 20);
	arrow.x = ball.y;
	arrow.y = ball.x;
	
	stage.addChild(arrow);
	
	var data = {
		images: ["./GolfPowerBar.png"],
		frames: {width: 11, height: 42, count: 41}
	};

	powerMeter = new createjs.Sprite(new createjs.SpriteSheet(data));
	powerMeter.x = 3;
	powerMeter.y = 100;
	stage.addChild(powerMeter);
	
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
	

	//friction
	speedX = speedX*.97;
	speedY = speedY*.97;
	
	console.log(ballState+": "+speedX+", "+speedY+": "+i);
	
	//Stop ball
	if(Math.abs(speedX)<0.1 && Math.abs(speedY)<0.1 && !ballIsStop){
		speedX = 0;
		speedY = 0;
		ballIsStop = true;
		ballState = 0;
	}
	if(ballState == 0){
		arrow.x = ball.x+2;
		arrow.y = ball.y+1.5;
		i = 0;
	}
	
	//wall collison
	if(ball.y>HEIGHT-5 || ball.y<1){
		speedY = -speedY;
	}
	if(ball.x>WIDTH-5 || ball.x<18){
		speedX = -speedX;
	}
	
	//power bar
	if(ballState == 1 && ballIsStop){
		if(i>=100 || i<0) inc = !inc;
		i = powerBar(i);
	}
	if(ballState == 2 && ballIsStop == true){
		hitBall(arrow.rotation, i/10);
	}
	//move ball
	ball.x += speedX;
	ball.y += speedY;
	stage.update(event);
}

function draw(){
 	
}

function keyPressed(event){
	//console.log("key pressed\n");
	switch(event.keyCode){
		case 37:
			if(ballState == 0){
				arrow.rotation -= 5;
			}
			break;
		case 39:
			if(ballState == 0){
				arrow.rotation+=5;
			}
			break;
		case 32:
			console.log("SPACE PRESSED");
			if(ballState == 0 && ballIsStop){
				ballState++;
			}else if(ballState == 1){
				ballState++
			}
			//ballState++;
			//change ball state to charging, then hit
			break;
	}
	stage.update();
}

function hitBall(degrees, power){
	ballIsStop = false;
	//ballState = 0;
	var radians = degrees * (Math.PI/180);
	dirVect.x = -Math.sin(radians);
	dirVect.y = Math.cos(radians);
	
	speedX = power * dirVect.x;
	speedY = power * dirVect.y;
	
	//arrow.x = ball.x;
	//arrow.y = ball.y;
	
	//console.log(radians);
	console.log(speedX+", "+speedY);
}

function powerBar(i){
		if(inc){
			i++;
			
		}else{
			i--;
		}
		powerMeter.gotoAndStop(Math.round((40/100)*i));
	return i;
}



