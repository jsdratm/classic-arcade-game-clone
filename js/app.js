// The canvas dimensions
var CANVAS_SIZE = [505, 606];

// The grid dimensions
var GRID_SIZE = [5, 6];

// The size of each grid tile
var GRID_TILE_SIZE = [101, 101];

// The move size for the player
var GRID_MOVE_SIZE = [101, 84];

// The maximum number of enemies on the screen at a time
var MAX_ENEMY_COUNT = 6;

// Get a random value between a min and max
function getRandom(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.xPosition = getRandom (-300, 0);
	this.yPosition = (getRandom(1, 3) * GRID_MOVE_SIZE[1]) - (GRID_MOVE_SIZE[1] / 2);
	this.velocity = getRandom(30, 150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	this.xPosition += dt * this.velocity;
	
	if (this.xPosition > CANVAS_SIZE[0]) {
		this.xPosition = getRandom (-300, 0);
		this.yPosition = (getRandom(1, 3) * GRID_MOVE_SIZE[1]) - (GRID_MOVE_SIZE[1] / 2);
		this.velocity = getRandom(30, 150);
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
};

// Player constructor
var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.playerPosition = [2, 5];
};

// Resets the player to the start position if they collide
Player.prototype.reset = function () {
	this.playerPosition = [2, 5];
};

// Checks if the player has collided with any enemies or the water row
Player.prototype.checkCollisions = function () {
	var playerXMin = (this.playerPosition[0] * GRID_MOVE_SIZE[0]) - (GRID_MOVE_SIZE[0] / 2);
	var playerXMax = (this.playerPosition[0] * GRID_MOVE_SIZE[0]) + (GRID_MOVE_SIZE[0] / 2);
	
	var playerYMin = (this.playerPosition[1] * GRID_MOVE_SIZE[1]) - (GRID_MOVE_SIZE[1] / 2);
	var playerYMax = (this.playerPosition[1] * GRID_MOVE_SIZE[1]);
	
	//console.log(playerXMin + " - " + playerXMax + ", " + playerYMin + " - " + playerYMax);
	
	if (this.playerPosition[1] == 0) {
		console.log("Water Collision");
		player.reset();
	}
	
	allEnemies.forEach(function(enemy) {
		//console.log(enemy.xPosition + ", " + enemy.yPosition);
		if (enemy.xPosition >= playerXMin &&
		    enemy.xPosition <= playerXMax &&
			enemy.yPosition >= playerYMin &&
			enemy.yPosition <= playerYMax) {
			console.log("Collision");
			player.reset();
		}
	});
};

// Updates the player position
Player.prototype.update = function () {	
	// Not currently used for anything
};

// Renders the player on the canvas
Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), (this.playerPosition[0] * GRID_MOVE_SIZE[0]), ((this.playerPosition[1] * GRID_MOVE_SIZE[1]) - GRID_MOVE_SIZE[1] / 2));
};

// Handles user input and applies it to the player
Player.prototype.handleInput = function (keyCode) {
	//console.log(keyCode);
	switch (keyCode) {
		case "left":
			if (this.playerPosition[0] > 0) {
				this.playerPosition[0]--;
			}
			break;
		case "right":
			if (this.playerPosition[0] < (GRID_SIZE[0] - 1)) {
				this.playerPosition[0]++;
			}
			break;
		case "up":
			if (this.playerPosition[1] > 0) {
				this.playerPosition[1]--;
			}
			break;
		case "down":
			if (this.playerPosition[1] < (GRID_SIZE[1] - 1)) {
				this.playerPosition[1]++;
			}
			break;
		default:
			// Ignore
			break;
	}
};

// Instantiate the player object
var player = new Player();

// Instantiate the list of enemy objects
var allEnemies = [];

for (var j = 0; j < MAX_ENEMY_COUNT; j++) {
    var newEnemy = new Enemy();
	allEnemies.push(newEnemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
