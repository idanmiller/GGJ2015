Receptor = function(game, config, x, y, resource, strategy, startingPosition) {
	this.type = "Receptor";
    CircularEntity.call(this, game, x, y, resource);
    this.game = game;
};

Receptor.prototype = Object.create(CircularEntity.prototype);
Receptor.prototype.constructor = Receptor;
