Macrophage = function(game, config, x, y, resource, strategy, startingPosition) {
	this.type = "Macrophage";
    CircularEntity.call(this, game, config, 900, -100, resource);
    this.game = game;
	this.config = config;
	this.velocity = 50;
};

Macrophage.prototype = Object.create(CircularEntity.prototype);
Macrophage.prototype.constructor = Macrophage;
 
Macrophage.prototype.findTarget = function() {
	var targetX = -50;
	var targetY = 700;
	this.target = {x: targetX, y: targetY};
	var angle = Phaser.Math.angleBetweenPoints(this, this.target);
	this.velocityX =  -Math.cos(angle) * this.velocity * 1/this.config.fps;
	this.velocityY =  -Math.sin(angle) * this.velocity * 1/this.config.fps;
}

Macrophage.prototype.update = function() {
	var angle = Phaser.Math.angleBetweenPoints(this, this.target);
	this.x += this.velocityX;
	this.y += this.velocityY;
};
