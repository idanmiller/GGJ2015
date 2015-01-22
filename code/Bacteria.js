Bacteria = function(game, x, y, resource, collisionRadius) {
	this.type = "Bacteria";
    CircularEntity.call(this, game, x, y, resource, collisionRadius);
};

Bacteria.prototype = Object.create(CircularEntity.prototype);
Bacteria.prototype.constructor = Bacteria;

Bacteria.prototype.split = function() {
	var first = new Bacteria(this.game, this.x, this.y-20, this.key, this.collisionRadius);
	var second = new Bacteria(this.game, this.x, this.y+20, this.key, this.collisionRadius);
	first.scale.setTo(0.8, 0.8);
	second.scale.setTo(0.8, 0.8);
	return [first, second];
};