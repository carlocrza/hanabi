// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', process.env.PORT || 5000);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'static/index.html'));
});
// Starts the server.
server.listen(process.env.PORT || 5000, function() {
  console.log('Starting server on port' + process.env.PORT);
});
setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);
var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function(data) {
    players[socket.id] = {
      x: 300,
      y: 300,
      name: data
    };
  });

  socket.on('change_name', function(data) {
    var player = players[socket.id] || {};
    player.name = data;
  })

  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });

  // Deletes user once they close the game
  socket.on('disconnect', function(data) {
    delete players[socket.id]; 
  });
});
setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 144);
