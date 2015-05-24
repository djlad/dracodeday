var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});
app.get('/game.js', function(req, res){
  res.sendfile('game.js');
});
app.get('/player1.png', function(req, res){
  res.sendfile('player1.png');
});
app.get('/player1pushed.png', function(req, res){
  res.sendfile('player1pushed.png');
});

io.on('connection', function(socket){
	socket.on("hello",function(d){
		console.log(d)
	});
});

http.listen(3333, function(){
  console.log('listening on *:3000');
});