var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});
app.get('/game.js', function(req, res){
  res.sendfile('game.js');
});

io.on('connection', function(socket){
	socket.on("hello",function(d){
		console.log(d)
	});
});

http.listen(3333, function(){
  console.log('listening on *:3000');
});