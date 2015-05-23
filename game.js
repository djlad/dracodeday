canvas = document.getElementsByTagName("canvas")[0];
canvas.width = 500;
canvas.height = 800;
c = canvas.getContext("2d")







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