var BACTERIA_BASE_VELOCITY = 130;
var BACTERIA_MAX_VELOCITY = 400;
var BACTERIA_ACCELERATION_DELTA = 5; //TODO random acceleration (swarm)

Bacteria = function(game, config, x, y, resource) {
	this.type = "Bacteria";
    CircularEntity.call(this, game, config, x, y, resource);
    this.game = game;
    this.config = config;
    this.resetMovementParameters();
    this.receptorLevel = 0;
};

Bacteria.prototype = Object.create(CircularEntity.prototype);
Bacteria.prototype.constructor = Bacteria;

Bacteria.prototype.resetMovementParameters = function() {
	this.velocityX = 0;
    this.velocityY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;
};

Bacteria.prototype.acquireReceptor = function() {
	this.receptorLevel++;
	var receptorResource = "receptor_" + this.receptorLevel;
	this.addChild(this.game.make.sprite(this.width/2-this.width/4, -this.height/2-this.height/8, receptorResource))
},

Bacteria.prototype.split = function() {
	var first  = new Bacteria(this.game, this.x, this.y-20, this.key, this.collisionRadius);
	var second = new Bacteria(this.game, this.x, this.y+20, this.key, this.collisionRadius);
	first.scale.setTo(0.8, 0.8);
	second.scale.setTo(0.8, 0.8);
	return [first, second];
};

Bacteria.prototype.calculateAcceleration = function (cursors) {
	if (cursors.left.isDown) {
		this.accelerationX = (this.accelerationX > 0) ? 0 : this.accelerationX - BACTERIA_ACCELERATION_DELTA;
	} 
	if (cursors.right.isDown) {
		this.accelerationX = (this.accelerationX < 0) ? 0 : this.accelerationX + BACTERIA_ACCELERATION_DELTA;
	}
	if (cursors.down.isDown) {
		this.accelerationY = (this.accelerationY < 0) ? 0 : this.accelerationY + BACTERIA_ACCELERATION_DELTA;
	}
	if (cursors.up.isDown) {
		this.accelerationY = (this.accelerationY > 0) ? 0 : this.accelerationY - BACTERIA_ACCELERATION_DELTA;
	} 
};

Bacteria.prototype.calculateVelocity = function (cursors) {
	if (cursors.left.isDown) {
		//  Move to the left
		this.velocityX = -BACTERIA_BASE_VELOCITY + this.accelerationX;
	}
	if (cursors.right.isDown)
    {
        //  Move to the right
        this.velocityX = BACTERIA_BASE_VELOCITY + this.accelerationX;
    }
    if (cursors.up.isDown)
    {
        //  Move up
        this.velocityY = -BACTERIA_BASE_VELOCITY + this.accelerationY;  
    }

    if (cursors.down.isDown)
    {
        //  Move down
        this.velocityY = BACTERIA_BASE_VELOCITY + this.accelerationY;   
    }
    if (!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
    	this.resetMovementParameters();
    }
};

Bacteria.prototype.update = function() {	
	var x = expectedX = this.x + 1 / this.config.fps * this.velocityX;
	var y = expectedY = this.y + 1 / this.config.fps * this.velocityY;
	if (expectedX > this.game.width - this.width/2) {
		x = this.game.width - this.width/2;
	}
	if (expectedX < 0 + this.width/2) {
		x = 0 + this.width/2;
	}
	if (expectedY > this.game.height - this.height/2) {
		y = this.game.height - this.height/2;
	}
	if (expectedY < 0 + this.height/2) {
		y = 0 + this.height/2;
	}
	this.x = x;
	this.y = y;
};
