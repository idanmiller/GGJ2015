Receptor = function(game, config, x, y,   startingPosition) {
	this.type = "Receptor";
    CircularEntity.call(this, game, config, x, y, "receptor");
    this.collisionRadius = 40;
    this.game = game;
    this.alpha = 0;
    this.ignoreCollision = true;
    s = this.game.add.tween("receptor");
    s.to({ alpha: 1 }, 700, function(){this.ignoreCollision = false;})
    s.start();

};

Receptor.prototype = Object.create(CircularEntity.prototype);
Receptor.prototype.constructor = Receptor;
