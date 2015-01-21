Entity = function(game, x, y, resource, collisionRadius) {
    Phaser.Sprite.call(this, game, game.x, game.y, resource);
    this.collisionRadius = collisionRadius;
};

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype = {

	getDistance: function(otherEntity) {
		var dx = otherEntity.x - this.x;
        var dy = otherEntity.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
	}

}; 
