CircularEntity = function(game, config, x, y, resource) {
    Phaser.Sprite.call(this, game, x, y, resource);
    this.anchor.setTo(0.5, 0.5);
    this.currentScale = 0;
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


CircularEntity.prototype.update = function() {

    if(this.alpha > FadeTarget){
        this.alpha -=SacleFactor;
    }

    if(this.alpha < ScaleTarget){
        this.alpha +=SacleFactor;
    }

    //if(this.currentScale > ScaleTarget){
    //    this.currentScale -=SacleFactor;
    //    this.scale = {x:this.currentScale,y:this.currentScale};
    //}
    //
    //if(this.scale < ScaleTarget){
    //    this.currentScale +=SacleFactor;
    //    this.scale = {x:this.currentScale,y:this.currentScale};
    //}
};
