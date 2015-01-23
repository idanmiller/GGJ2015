var BACTERIA_BASE_VELOCITY = 130;
var BACTERIA_MAX_VELOCITY = 400;
var BACTERIA_ACCELERATION_DELTA = 5; //TODO random acceleration (swarm)
var BACTERIA_SPLIT_OFFSET_X = 75;
var BACTERIA_SPLIT_OFFSET_Y = 80;
var BACTERIA_SPLIT_DISTANCE = 100;
var BACTERIA_RADIUS = 50;

Bacteria = function (game, config, x, y, resource, scale) {
    this.type = "Bacteria";
    CircularEntity.call(this, game, config, x, y, resource, scale);
    this.game = game;
    this.config = config;
    this.resource = resource;
    this.receptorLevel = 0;
    this.collisionRadius = BACTERIA_RADIUS;
    this.resetMovementParameters();
};

Bacteria.prototype = Object.create(CircularEntity.prototype);
Bacteria.prototype.constructor = Bacteria;

Bacteria.prototype.resetMovementParameters = function () {
    this.velocityX = 0;
    this.velocityY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;
};

Bacteria.prototype.acquireReceptor = function () {
    if (this.receptor) {
        this.removeChild(this.receptor);
    }
    this.receptorLevel = this.receptorLevel == 10 ? 10 : this.receptorLevel + 1;
    this.receptorResource = "receptor_" + this.receptorLevel;
    this.receptor = this.game.make.sprite(this.width / 4, -this.height / 2 - this.height / 7.5, this.receptorResource);
    this.addChild(this.receptor);
},

    Bacteria.prototype.split = function (stopFunction, context) {
        //var scale = Math.max(this.scale.x-0.1, 0.3);
        ScaleTarget = Math.max(this.scale.x - 0.1, 0.3);
        var scale = ScaleTarget;
        var splitter = this.game.add.sprite(this.x, this.y, 'bacteria_split');
        splitter.scale.setTo(scale, scale);
        var animation = splitter.animations.add('bacteria_split');
        splitter.animations.play('bacteria_split', 10, false);

        animation.onComplete.add(this.killSplitter, this, splitter);
        if (stopFunction != null) {
        	animation.onComplete.add(stopFunction, context, splitter);
        }

        var offsetX = BACTERIA_SPLIT_OFFSET_X * scale;
        var offsetY = BACTERIA_SPLIT_OFFSET_Y * scale;
        var distance = BACTERIA_SPLIT_DISTANCE * scale;
        var first = new Bacteria(this.game, this.config, splitter.x + offsetX, splitter.y + offsetY, this.resource, scale);
        var second = new Bacteria(this.game, this.config, splitter.x + offsetX, splitter.y + offsetY + distance, this.resource, scale);
        this.inheritReceptors(this, first);
        this.inheritReceptors(this, second);
        first.scale.setTo(scale, scale);
        second.scale.setTo(scale, scale);

        //first.scale.setTo(scale, scale);
        //second.scale.setTo(scale, scale);

        var sound = this.game.add.audio('split');
        sound.play();

        return [first, second];
    };

    Bacteria.prototype.killSplitter = function (splitter) {
    	splitter.kill();
    }

Bacteria.prototype.inheritReceptors = function (src, dest) {
    dest.receptorLevel = src.receptorLevel;
    dest.addChild(this.game.make.sprite(this.width / 4, -this.height / 2 - this.height / 7.5, src.receptorResource));
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
    if (cursors.right.isDown) {
        //  Move to the right
        this.velocityX = BACTERIA_BASE_VELOCITY + this.accelerationX;
    }
    if (cursors.up.isDown) {
        //  Move up
        this.velocityY = -BACTERIA_BASE_VELOCITY + this.accelerationY;
    }

    if (cursors.down.isDown) {
        //  Move down
        this.velocityY = BACTERIA_BASE_VELOCITY + this.accelerationY;
    }

    if (!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
        this.resetMovementParameters();
    }
};

Bacteria.prototype.calculateSwarmRotation = function (cursors) {
	if (this.velocityX > 0 && this.velocityY < 0) { 
		this.rotation = -0.78;
	}
	else if (this.velocityX > 0 && this.velocityY > 0) { 
		this.rotation = 0.78;
	}
	else if (this.velocityX < 0 && this.velocityY > 0) { 
		this.rotation = 2.35;
	}
	else if (this.velocityX < 0 && cursors.up.isDown) { 
		this.rotation = 3.92;
	}
	else if (this.velocityX < 0) {
		this.rotation = 3.14;
	}
	else if (this.velocityX > 0 && this.velocityY == 0) {
		this.rotation = 0;
	}
	else if (this.velocityY < 0) {
		this.rotation = -1.57;
	}
	else if (this.velocityY > 0) {
		this.rotation = 1.57;
	}
};


Bacteria.prototype.calculateSwarmAcceleration = function (mother) {
    var collide = CircularEntity.prototype.collidesWith.call(this, mother);
    var distance = CircularEntity.prototype.getDistance.call(this, mother);
    var swarm_acceleration = distance/20;
    if (collide) {
        if (mother.x < this.x) {
            this.accelerationX = swarm_acceleration * 2;
        }
        if (mother.x > this.x) {
            this.accelerationX = -swarm_acceleration * 2;
        }
        if (mother.y < this.y) {
            this.accelerationY = swarm_acceleration * 2;
        }
        if (mother.y > this.y) {
            this.accelerationY = -swarm_acceleration * 2;
        }
    }
        else
        {
            if (mother.x < this.x) {
                this.accelerationX = -swarm_acceleration;
            }
            if (mother.x > this.x) {
                this.accelerationX = swarm_acceleration;
            }
            if (mother.y < this.y) {
                this.accelerationY = -swarm_acceleration;
            }
            if (mother.y > this.y) {
                this.accelerationY = swarm_acceleration;
            }
        }

    };

Bacteria.prototype.calculateSwarmVelocity = function (mother) {
        this.velocityX += this.accelerationX;
        this.velocityY +=  this.accelerationY;
};

Bacteria.prototype.update = function () {
    CircularEntity.prototype.update.call(this);
    var x = expectedX = this.x + 1 / this.config.fps * this.velocityX;
    var y = expectedY = this.y + 1 / this.config.fps * this.velocityY;
    if (expectedX > this.game.width - this.width / 2) {
        x = this.game.width - this.width / 2;
    }
    if (expectedX < 0 + this.width / 2) {
        x = 0 + this.width / 2;
    }
    if (expectedY > this.game.height - this.height / 2) {
        y = this.game.height - this.height / 2;
    }
    if (expectedY < 0 + this.height / 2) {
        y = 0 + this.height / 2;
    }
    this.x = x;
    this.y = y;


};
