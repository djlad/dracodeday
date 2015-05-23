canvas = document.getElementsByTagName("canvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext("2d")
c.font = "bolder 30px courier new";

thumbs = [];
document.body.style.overflow = 'hidden';

window.addEventListener("touchmove",function(e){
	updateThumbs(e);
})
window.addEventListener("touchstart",function(e){
	updateThumbs(e);
})
window.addEventListener("touchend",function(e){
	updateThumbs(e);
})
//classes
function Thumb(){
	this.x = 0;
	this.y =0;
	this.checkTouchButton = function(){
		var array=[];
		for(var i=0;i<buttons.length;i++){
			if(distance(this,buttons[i])<buttons[i].radius)array.push(i);
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
	this.radius = 25;//button radius
}

//functions
function updateScore(){
	var array = thumbs[0].checkTouchButton();
	if(array.length>0)score++;
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

//startup code
function start(){
	thumbs = [];
	buttons = [];
	score = 0;

	thumbs.push(new Thumb());
	buttons.push(new Button());
}

function game(){
	update();
	render();
}

function update(){
	updateScore();
	buttons.map(function(e){
		e.vx+=e.ax;
		e.vy+=e.ay;
		e.x+=e.vx;
		e.y+=e.vy;
	})

	if(Math.random()>.99 )randommove();


	if(buttons[0].x<0)buttons[0].vx=Math.abs(buttons[0].vx)

    if(buttons[0].y<0)buttons[0].vy=Math.abs(buttons[0].vy)
    if(buttons[0].x>canvas.width)buttons[0].vx=-Math.abs(buttons[0].vx)
    if(buttons[0].y>canvas.height)buttons[0].vy=-Math.abs(buttons[0].vy)



}

function render(){
	c.clearRect(0,0,canvas.width,canvas.height);
	buttons.map(function(e){
		c.fillRect(e.x-e.radius,e.y-e.radius,e.radius*2,e.radius*2);
	})
	c.fillText(score,25,25);
}


function randommove(){

buttons[0].vx=Math.random()*6-3

buttons[0].vy=Math.random()*6-3


}








start()
setInterval(game,1000/60);




















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