var SCORE_LEVEL_FACTOR = 150;

Emitter = function(game) {
    this.stepCount=0;
    this.game = game;
};

Emitter.prototype = Object.create(Phaser.Sprite.prototype);
Emitter.prototype.constructor = Emitter;

Emitter.prototype.updateProgress = function(score) {
	this.stepCount++;
    this.updateLevel(score);
    this.createMacrophage(score);
};

Emitter.prototype.updateLevel = function(score) {
    this.level = Math.round(score/SCORE_LEVEL_FACTOR)+1;
};


Emitter.prototype.createMacrophage = function(score) {
    var secondsBeforeCreation = 5;
    var fps = this.game.time.fps;
    var factor  = (secondsBeforeCreation*fps) ;
    var lottoResult = Math.floor(Math.random() * factor) + 1;
    if (lottoResult >= factor-1){
        console.log("create macrophage");
    }
}