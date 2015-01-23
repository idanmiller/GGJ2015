var SCORE_LEVEL_FACTOR = 150;

Emitter = function(game,gameContext,config) {
    this.stepCount=0;
    this.game = game;
    this.fps = config.fps;
    this.config = config;
    this.gameContext = gameContext;
    this.numberOfMacrophages = 0;
    this.macrophagesCounter = 0;
    this.macrophagesProbabiltyMultiplayer = 1;
    this.numberOfReceptors = 0;
    this.receptorProbabiltyMultiplayer = 1;
};

Emitter.prototype = Object.create(Phaser.Sprite.prototype);
Emitter.prototype.constructor = Emitter;

Emitter.prototype.updateProgress = function(score) {
	this.stepCount++;
    this.updateLevel(score);
    this.emitMacrophage(score);
    this.emitReceptor(score);
};

Emitter.prototype.updateLevel = function(score) {
    this.level = Math.round(score/SCORE_LEVEL_FACTOR)+1;
};

Emitter.prototype.emitt = function(score) {
        this.emitReceptor(score);
        this.emitMacrophage(score);
}
Emitter.prototype.emitMacrophage = function(score) {
    var secondsBeforeCreation = 10;
    var fps = this.fps;
    var factor  = (secondsBeforeCreation*fps) ;
    if(this.numberOfMacrophages<=score){  //add refrance to level
        this.macrophagesProbabiltyMultiplayer += 0.002;
    }
    var lottoResult = Math.floor(Math.random() * factor)*this.macrophagesProbabiltyMultiplayer + 1;
    if (lottoResult >= factor-1){
        console.log("Score:"+score);
       this.createMacrophage(score);
    }
};

Emitter.prototype.emitReceptor = function(score) {
    var secondsBeforeCreation = 20;
    var fps = this.fps;
    var factor  = (secondsBeforeCreation*fps) ;
    if(this.numberOfReceptors){
        return;
    }
    var lottoResult = Math.floor(Math.random() * factor) + 1;
    if (lottoResult >= factor-1){
        this.createRecptor(score);
    }
};

Emitter.prototype.createMacrophage = function(score) {
    //console.log("Emitter is creating a Macrophage");
    //console.log("Probability: "+this.macrophagesProbabiltyMultiplayer);
    //console.log("Macrophage: "+this.numberOfMacrophages);
    this.macrophagesProbabiltyMultiplayer = 1;
    this.macrophagesCounter++;
    this.numberOfMacrophages++;
    var receptorLevel = Math.round(Math.min(10,score)* Math.random())+1;
    var macro = new Macrophage(this.game,this.config,0,0,this.config.strategies.default,this,receptorLevel);
    macro.id = this.macrophagesCounter;
    this.gameContext.addMacrophage(macro);
};

Emitter.prototype.createRecptor = function() {
    console.log("Emitter is creating a Recptor");
    this.receptorProbabiltyMultiplayer = 1;
    this.numberOfReceptors++;
    var x = Math.random()* 360 + 300;
    var y = Math.random()* 200 + 200;
    var receptor = new Receptor(this.game,this.config,x,y);
    this.gameContext.addReceptor(receptor);
};

Emitter.prototype.killMacrophage = function(macro) {
    console.log("Killing Macrophage");
    this.numberOfMacrophages--;
};