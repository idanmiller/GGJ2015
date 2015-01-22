var SCORE_LEVEL_FACTOR = 150;

Emitter = function(game,gameContext,config) {
    this.stepCount=0;
    this.game = game;
    this.fps = config.fps;
    this.config = config;
    this.gameContext = gameContext;
    this.numberOfMacrophages = 0;
    this.macrophagesCounter = 0;
    this.macrophagesPropabiltyMultiplayer = 1;
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
    var secondsBeforeCreation = 10;
    var fps = this.fps;
    var factor  = (secondsBeforeCreation*fps) ;
    if(this.numberOfMacrophages<=score){  //add refrance to level
        this.macrophagesPropabiltyMultiplayer += 0.002;
    }
    var lottoResult = Math.floor(Math.random() * factor)*this.macrophagesPropabiltyMultiplayer + 1;
    if (lottoResult >= factor-1){
        console.log("Score:"+score);
       this.createMacrophage();
    }
};

Emitter.prototype.createMacrophage = function() {

    console.log("Emitter is creating a Macrophage");
    console.log("Propability: "+this.macrophagesPropabiltyMultiplayer);
    console.log("Macrophage: "+this.numberOfMacrophages);
    console.log("Macrophage: "+this.numberOfMacrophages);
    this.macrophagesPropabiltyMultiplayer = 1;
    this.macrophagesCounter++;
    this.numberOfMacrophages++;
    var macro = new Macrophage(this.game,this.config,0,0,this.config.strategies.default,this);
    macro.id = this.macrophagesCounter;
    this.gameContext.addMacrophage(macro);
};

Emitter.prototype.killMacrophage = function(macro) {
    console.log("Killing Macrophage");
    this.numberOfMacrophages--;
};