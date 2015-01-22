Macrophage = function (game, config, x, y, strategy,emitter, startingPosition) {
    this.type = "Macrophage";
    CircularEntity.call(this, game, config, 900, -0, "macrophage");
    this.game = game;
    this.anchor.setTo(0.5,0.5);
    this.config = config;
    this.velocity = 50;
    this.rotation = Math.random() * 380 - 180;
    this.strategy = strategy;
    this.emitter = emitter;
};

Macrophage.prototype = Object.create(CircularEntity.prototype);
Macrophage.prototype.constructor = Macrophage;

Macrophage.prototype.findTarget = function () {
    if (this.strategy == this.config.strategies.default) {
        this.x += Math.random() * - 300;
        this.y += Math.random() *  200 -100;
        var targetX =  Math.random()* 900 - 150 ;
        var targetY = Math.random() * 1000 + 1500;
        this.target = {x: targetX, y: targetY};
        var angle = Phaser.Math.angleBetweenPoints(this, this.target);
        this.velocityX = -Math.cos(angle) * this.velocity * 1 / this.config.fps;
        this.velocityY = -Math.sin(angle) * this.velocity * 1 / this.config.fps;
    }
}

Macrophage.prototype.update = function () {
    //var angle = Phaser.Math.angleBetweenPoints(this, this.target);
    if(this.isDead){
        return; //horrible workaround!
    }

    this.rotation+=0.005;
    if (this.rotation > 180) {
        this.rotation *= -1;
    }

    if(this.x < -500 || this.y > 1500  ){
        this.destroyMe();
    }

    this.x += this.velocityX;
    this.y += this.velocityY;
};

Macrophage.prototype.destroyMe = function () {
    this.emitter.killMacrophage(this);
    this.isDead = true;

    this.kill();
    this.destroy();

}