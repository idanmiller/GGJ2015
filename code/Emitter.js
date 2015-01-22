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
    var fps = 60;
    var factor  =  1/(secondsBeforeCreation*fps) ;//fps/this.level;
    var lottoResult = Math.random();
    console.log("Factor:"+factor);
    console.log("Result:"+lottoResult);
    if (lottoResult<=factor){
        alert("create macrophage now");
    }
}