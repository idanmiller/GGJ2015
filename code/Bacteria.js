Bacteria = function(game, x, y, resource, collisionRadius) {
    CircularEntity.call(game, x, y, resource, collisionRadius);
};

Bacteria.prototype = Object.create(Entity.prototype);
Bacteria.prototype.constructor = Bacteria;
