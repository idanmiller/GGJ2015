CircularEntity = function(game, config, x, y, resource) {
    Phaser.Sprite.call(this, game, x, y, resource);
    this.anchor.setTo(0.5, 0.5);
};

CircularEntity.prototype = Object.create(Phaser.Sprite.prototype);
CircularEntity.prototype.constructor = CircularEntity;

CircularEntity.prototype.getDistance = function(otherCircularEntity) {
	var dx = otherCircularEntity.x - this.x;
    var dy = otherCircularEntity.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
}; 

CircularEntity.prototype.collidesWith = function(otherCircularEntity) {
	var dist = this.getDistance(otherCircularEntity);
	return (dist < this.collisionRadius + otherCircularEntity.collisionRadius);
}; 
