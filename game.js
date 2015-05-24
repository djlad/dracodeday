//sockets first
var socket = io();
function sortNumber(a,b) {
    return b.score-a.score ;
}

socket.on("hsl2client",function(highscores){
	hsl = highscores;
	//hsl.sort(sortNumber)
});

function sendScore(){
	socket.emit("score2server",{name:name,score:score})
}
hsl = {};
canvas = document.getElementsByTagName("canvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext("2d")
c.font = "bolder 30px courier new";
name = prompt("what is your name?"); 
radius = 150;
pause = false;
started = false;
thumbs = [];
buttons = [];
score = 0;
thumbs.push(new Thumb());
buttons.push(new Button());
pushed = false;
moveRandom = true;
document.body.style.overflow = 'hidden';

var buttonImage = new Image();
buttonImage.src = "player1.png";

var buttonImagePushed = new Image();
buttonImagePushed.src = "player1pushed.png";

window.addEventListener("touchmove",function(e){
	updateThumbs(e);

    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
})
window.addEventListener("touchstart",function(e){
	updateThumbs(e);
	pause = false;

    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
})
window.addEventListener("touchend",function(e){
	//updateThumbs(e);
	thumbs[0].x = -100;
	thumbs[0].y=-100;
	pushed = false;

    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
})
//classes
function Thumb(){
	this.x = canvas.width/2+radius+2;
	this.y =canvas.height/2;
	this.checkTouchButton = function(){
		var array=[];
		for(var i=0;i<buttons.length;i++){
			if(distance(this,buttons[i])<buttons[i].radius){
				array.push(i);
				pushed = true;
			}else{
				pushed = false
			}
			if (distance(this,buttons[i])>buttons[i].radius+30)endGame();
		}
		return array;
	}
}
function Button(){
	this.x = canvas.width/2;//button y position
	this.y = canvas.height/2;//button x position
	this.vx = 0;//velocity x
	this.vy = 0;//velocity y
	this.ax = 0;//acceleration x
	this.ay = 0;//acceleration y
	this.radius = radius;//button radius
}

//functions
function restart(){
	console.log("restarts")
	start();
	location.reload();	
}

function endGame(){
	clearInterval(gameInterval);
	setTimeout(function(){
		c.fillText("Play again?",canvas.width/2,canvas.height/2);
		c.fillText("Final Score: "+ score,canvas.width/2,canvas.height/2-40);
		window.addEventListener("touchend",restart)
		

	},100)

}

function updateScore(){
	var array = thumbs[0].checkTouchButton();
	if(array.length>0){
		score+=(1-distance(thumbs[0],buttons[0])/radius)*10;
	}

}

function updateThumbs(e){
	for(var i=0;i<thumbs.length;i++){
		thumbs[i].x = e.changedTouches[i].clientX;
		thumbs[i].y = e.changedTouches[i].clientY;
	}
}
function distance(obj1,obj2){
	return Math.sqrt(Math.pow(obj1.x-obj2.x,2)+Math.pow(obj1.y-obj2.y,2));
}

function checkMaxSpeed(){
	if(buttons[0].vx>2)buttons[0].ax=0;
		if(buttons[0].vy>2)buttons[0].ay=0;
}

//startup code
function start(){

	thumbs = [];
	buttons = [];
	score = 0;
	buttons.push(new Button());
	thumbs.push(new Thumb());
	
	pushed = false;
	moveRandom = true;

	gameInterval = setInterval(game,1000/60);
	game();
	pause = true;
}

function game(){
	if(!pause){
		update();
		render();
	}
}

function update(){
	updateScore();
	buttons.map(function(e){
		e.vx+=e.ax;
		e.vy+=e.ay;
		e.x+=e.vx;
		e.y+=e.vy;
	})

	if(moveRandom == true &&Math.random()>.99)randommove();


	if(buttons[0].x<0)buttons[0].vx=Math.abs(buttons[0].vx)

    if(buttons[0].y<0)buttons[0].vy=Math.abs(buttons[0].vy)
    if(buttons[0].x>canvas.width)buttons[0].vx=-Math.abs(buttons[0].vx)
    if(buttons[0].y>canvas.height)buttons[0].vy=-Math.abs(buttons[0].vy)


    sendScore();

}
var counter =0;
function render(){
	c.clearRect(0,0,canvas.width,canvas.height);
	buttons.map(function(e){
		if(pushed){
			c.drawImage(buttonImagePushed,e.x-e.radius/2,e.y-e.radius/2,e.radius,e.radius)
		}
		else
			c.drawImage(buttonImage,e.x-e.radius/2,e.y-e.radius/2,e.radius,e.radius);
	})
	c.fillText(score,25,25);
	counter = 0;

	renderHS();

}

function renderHS(){
	tmpArray = [];
	for(i in hsl){
		tmpArray.push(hsl[i]);
		counter++;
	}
	tmpArray.sort(sortNumber);
	for(var i=0;i<tmpArray.length;i++){
		c.fillText(tmpArray[i].name+": "+tmpArray[i].score,canvas.width-150,50*i)
	}
}

function randommove(){

	buttons[0].ax=Math.random()*.1-.05

	buttons[0].ay=Math.random()*.1-.05


}



buttonImage.onload = function(){
	start();
}


























/*
//classes
function Player(x,y){
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.ay = .25;

	this.checkCol = function(block){
		var nx = this.x + this.vx;
		var ny = this.y + this.vy;
	}
}

function Platform(x,y,width){
	this.x=x;
	this.y=y;
	this.width = width;
	this.height = 10;
}

//functions

function addPlayer(){
	players.push(new Player(10,10));
}
function update(){
	players.map(function(e){
		e.vy+=e.ay;
		e.x+=e.vx;
		e.y+=e.vy;
	});
}

function render(){
	c.clearRect(0,0,canvas.width,canvas.height)
	players.map(function(e){
		c.fillRect(e.x,e.y,10,10);
	});

	platforms.map(function(e){
		c.fillRect(e.x,e.y,e.width,e.height);
	});
}

function game(){
	update();
	render();
}

players = [];
platforms = [];

addPlayer();
p = players[0];

platforms.push(new Platform(10,100,100));



setInterval(game,1000/60);*/