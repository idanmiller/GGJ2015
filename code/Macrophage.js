Macrophage = function(game, x, y, resource, collisionRadius, velocity) {
	this.type = "Macrophage";
    CircularEntity.call(this, game, x, y, resource, collisionRadius);
    this.velocity = velocity;
    this.game = game;
};

Macrophage.prototype = Object.create(CircularEntity.prototype);
Macrophage.prototype.constructor = Macrophage;
 
Macrophage.prototype.findTarget = function(targetBacteria) {
	this.targetBacteria = targetBacteria;
	this.targetX = this.targetBacteria.x;
	this.targetY = this.targetBacteria.y;
};

Macrophage.prototype.update = function() {
	var angle = Phaser.Math.angleBetweenPoints(this, this.targetBacteria);
	this.x -= Math.cos(angle) * this.velocity * 1/60;
	this.y += Math.sin(angle) * this.velocity * 1/60;
};
