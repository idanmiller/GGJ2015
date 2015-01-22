Macrophage = function (game, config, x, y, strategy, emitter, receptorLevel) {
    this.type = "Macrophage";
    CircularEntity.call(this, game, config, 900, -0, "macrophage");
    this.game = game;
    this.anchor.setTo(0.5, 0.5);
    this.config = config;
    this.velocity = 50;
    this.rotation = Math.random() * 380 - 180;
    this.strategy = strategy;
    this.emitter = emitter;
    this.radius = 250;
    this.receptorLevel = receptorLevel;

};

Macrophage.prototype = Object.create(CircularEntity.prototype);
Macrophage.prototype.constructor = Macrophage;

Macrophage.prototype.findTarget = function () {
    if (this.strategy == this.config.strategies.default)
        if (Math.random() > 0.5) { //top ot bottom
            this.y = Math.random() * 200 - 100;
            var targetY = Math.random() * 600 + 300;
        } else {
            this.y = Math.random() * 200 + 600;
            var targetY = Math.random() * 300;
        }
    this.x = Math.random() * -300 + 960;
    var targetX = -1000;
    this.target = {x: targetX, y: targetY};
    var angle = Math.atan((this.y - targetY) / (targetX - this.x)) * (180 / Math.PI);
    console.log("Angle:" + angle);
    console.log("TargetX:" + targetX + ",TargetY" + targetY);
    this.velocityX = -this.velocity / this.config.fps;
    this.velocityY = Math.sin(angle) * this.velocity * 1 / this.config.fps;
}


Macrophage.prototype.update = function () {
    //var angle = Phaser.Math.angleBetweenPoints(this, this.target);
    if (this.isDead) {
        return; //horrible workaround!
    }

    this.rotation += 0.005;
    if (this.rotation > 180) {
        this.rotation *= -1;
    }

    if (this.x < -400 || this.y > 1500) {
        this.destroyMe();
    }

    this.x += this.velocityX;
    this.y += this.velocityY;
};

Macrophage.prototype.checkBacteria = function (targetBacteria) {
    if (this.receptorLevel > targetBacteria.receptorLevel) {
        return true;
    }
    return false;
}


Macrophage.prototype.destroyMe = function () {
    this.emitter.killMacrophage(this);
    this.isDead = true;
    this.kill();
    this.destroy();

}