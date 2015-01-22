Macrophage = function(game, x, y, resource, collisionRadius) {
    CircularEntity.call(this, game, x, y, resource, collisionRadius);
};

Macrophage.prototype = Object.create(CircularEntity.prototype);
Macrophage.prototype.constructor = Macrophage;
