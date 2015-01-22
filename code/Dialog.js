Dialog = function(game, config, resource) {
    Phaser.Sprite.call(this, game, 480, 300, resource);
    this.anchor.setTo(0.5, 0.5);
    this.game = game;
    this.config = config;
};

Dialog.prototype = Object.create(Phaser.Sprite.prototype);
Dialog.prototype.constructor = Dialog;

