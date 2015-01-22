var SCORE_LEVEL_FACTOR = 150;

Emitter = function(game) {
    this.stepCount=0;
};

Emitter.prototype = Object.create(Phaser.Sprite.prototype);
Emitter.prototype.constructor = Emitter;

Emitter.prototype.updateProgress = function() {
	this.stepCount++;
};

Emitter.prototype.updateLevel = function(score) {
    this.level = Math.round(score/SCORE_LEVEL_FACTOR);
};


Emitter.prototype.CreateMacrophage = function(score) {
    var secondsBeforeCreation = 5;
    var fps = ;