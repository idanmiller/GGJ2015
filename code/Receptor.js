Receptor = function(game, config, x, y,  strategy, startingPosition) {
	this.type = "Receptor";
    CircularEntity.call(this, game, config, x, y, "receptor");
    this.collisionRadius = 40;
    this.game = game;
};

Receptor.prototype = Object.create(CircularEntity.prototype);
Receptor.prototype.constructor = Receptor;
