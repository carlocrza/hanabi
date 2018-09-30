var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
    case 37: // left
      movement.left = true;
      break;
    case 38: // up
      movement.up = true;
      break;
    case 39: // right
      movement.right = true;
      break;
    case 40: // down
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;

	case 37: // left
		movement.left = false;
		break;
	case 38: // up
		movement.up = false;
		break;
	case 39: // right
		movement.right = false;
		break;
	case 40: // down
		movement.down = false;
		break;
  }
});
// document.addEventListener("mouseup", function(event) {
//   var x = event.clientX;
//   var y = event.clientY;
//   socket.on('state', function(players) {
    
//   });
// });





var name = prompt("what is thou name?");
socket.emit('new player', name);
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 1000; //canvas.clientWidth;
canvas.height = 600; //canvas.clientWidth;
var context = canvas.getContext('2d');

//make_base();
function make_base() {
	base_img = new Image();
	base_img.src = 'https://ae01.alicdn.com/kf/HTB1UP_7HVXXXXXOXpXXq6xXFXXXK/english-hanabi-board-game-HANABI-with-english-rules-playing-game-cards-game-board-game-for-brazil.jpg'
	base_img.onload = function() { context.drawImage(base_img, 0, 0) }
}
socket.on('state', function(players) {
  context.clearRect(0, 0, 1000, 600);
  context.fillStyle = 'blue';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);

    //Adding text name section
    var r = Math.random();
    context.font = "20px Comic Sans MS";
    /*if (r < .33) {
	name = "Christine";
    } else if (r < .66) {
	name = "Jon";
    } else {
	name = "Carlo";
    }*/
    context.fillText(player.name, player.x - 10, player.y - 10);
    context.fill();
  }
// make_base();
});
