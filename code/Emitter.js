var SCORE_LEVEL_FACTOR = 150;

Emitter = function(game,config) {
    this.stepCount=0;
    this.game = game;
    this.fps = config.fps;
    this.config =this.config;
};

Emitter.prototype = Object.create(Phaser.Sprite.prototype);
Emitter.prototype.constructor = Emitter;

Emitter.prototype.updateProgress = function(score) {
	this.stepCount++;
    this.updateLevel(score);
    this.emmitMacrophage(score);
};

Emitter.prototype.updateLevel = function(score) {
    this.level = Math.round(score/SCORE_LEVEL_FACTOR)+1;
};


Emitter.prototype.emmitMacrophage = function(score) {
    var secondsBeforeCreation = 5;
    var fps = this.fps;
    var factor  = (secondsBeforeCreation*fps) ;
    var lottoResult = Math.floor(Math.random() * factor) + 1;
    if (lottoResult >= factor-1){
        console.log("create macrophage");
    }
}

Emitter.prototype.createMacrophage = function(score) {
   var macro = new Macrophage(this.game,0,0,"macrophage",this.config.default)
}