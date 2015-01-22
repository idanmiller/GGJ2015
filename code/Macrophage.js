Macrophage = function(game, x, y, resource, collisionRadius, velocity) {
	this.type = "Macrophage";
    CircularEntity.call(this, game, x, y, resource, collisionRadius);
    this.velocity = velocity;
};

Macrophage.prototype = Object.create(CircularEntity.prototype);
Macrophage.prototype.constructor = Macrophage;

Macrophage.prototype.create = function() {
	var bacterias = Phaser.world.filter(function(child) {
		return child.type == "Bacteria";
	});
	this.targetBacteria = Phaser.ArrayUtils.getRandomItem(bacterias);
	this.targetX = this.targetBacteria.x;
	this.targetY = this.targetBacteria.y;
};

Macrophage.prototype.update = function() {
	var angle = Phaser.Math.angleBetweenPoints(this, this.targetBacteria);
	this.x += Math.cos(angle) * this.velocity * 1/60;
	this.y += Math.sin(angle) * this.velocity * 1/60;
};
