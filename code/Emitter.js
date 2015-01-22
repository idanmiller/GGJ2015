var SCORE_LEVEL_FACTOR = 150;

Emitter = function(game,gameContext,config) {
    this.stepCount=0;
    this.game = game;
    this.fps = config.fps;
    this.config = config;
    this.gameContext = gameContext;
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
       this.createMacrophage();
    }
};

Emitter.prototype.createMacrophage = function() {
    console.log("Emitter is creating a Macrophage");
    var macro = new Macrophage(this.game,0,0,"macrophage",this.config.strategies.default);
    this.gameContext.addMacrophage(macro);



};