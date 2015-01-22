CircularEntity = function(game, x, y, resource, collisionRadius) {
    Phaser.Sprite.call(this, game, x, y, resource);
    this.collisionRadius = collisionRadius;
};

CircularEntity.prototype = Object.create(Phaser.Sprite.prototype);
CircularEntity.prototype.constructor = CircularEntity;

CircularEntity.prototype.getDistance = function(otherCircularEntity) {
	var dx = otherCircularEntity.x - this.x;
    var dy = otherEntity.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
}; 
