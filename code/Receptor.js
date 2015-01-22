Receptor = function(game, config, x, y,   startingPosition) {
	this.type = "Receptor";
    CircularEntity.call(this, game, config, x, y, "receptor",0);
    this.collisionRadius = 40;
    this.game = game;
    this.RADIUS = 40;
    this.alpha = 0;
    this.ignoreCollision = true;

};

Receptor.prototype = Object.create(CircularEntity.prototype);
Receptor.prototype.constructor = Receptor;

Receptor.prototype.update= function(){
    if(this.alpha<1){
        this.alpha+=0.01
    }else
    {
        this.ignoreCollision = false;
    }
}