
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //GameJame Init
    this.score = 0;
    this.FPS = 60;
    this.config = {fps:this.FPS, strategies:{ default :'Default',chase:'Chase'} };
    this.emitter = new Emitter(game,this,this.config);

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {
        // Create initial bacteria
        this.receptor = null;
        this.isDeciding = false;
        this.bacterias = [];
        this.macrophages = [];

        this.game.add.sprite(0, 0, "background");

        var bacteria = new Bacteria(this.game, this.config, 100, 100, "bacteria_idle");
        bacteria.animations.add('bacteria_idle');
        bacteria.animations.play('bacteria_idle', 10, true);
        bacteria.collisionRadius = 80;
        this.game.add.existing(bacteria);
        this.bacterias.push(bacteria);

        // Start and init emitter
        // TEMP just emit a macrophage every 3 seconds
        //this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.addMacrophage, this);
        //this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.addReceptor, this);

        this.game.time.events.loop(Phaser.Timer.SECOND * 30, this.addScore, this);
        this.music = this.add.audio("gameMusic");
        this.music.play();
    },

    addScore: function() {
        this.score++;
    },

    addMacrophage: function(macrophage) {
        var bacteria = this.bacterias[Math.floor(Math.random()*this.bacterias.length)];
        macrophage.collisionRadius = 80;
        this.game.add.existing(macrophage);
        macrophage.findTarget(bacteria);
        this.macrophages.push(macrophage);
    },

    addReceptor: function(receptor) {
        this.game.add.existing(receptor);
    },

    showDecisionDialog: function() {
        this.isDeciding = true;
        this.dialog = new Dialog(this.game, this.config);
        this.game.add.existing(this.dialog);
    },

    dimsissDecisionDialog: function() {
        this.isDeciding = false;
        this.dialog.kill();
    },

    update: function () {
        // Check controls, update bacteria movement
        var cursors = this.game.input.keyboard.createCursorKeys();

        if (this.isDeciding) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
                this.dimsissDecisionDialog();
                this.splitAllBacterias();
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                this.dimsissDecisionDialog();
                this.acquireReceptor();
            }
        } else {
            for (var i = 0; i < this.bacterias.length; i++) {
                var bacteria = this.bacterias[i];
                bacteria.calculateAcceleration(cursors);
                bacteria.calculateVelocity(cursors);
            }

            this.emitter.updateProgress(this.score);

            // Move all entities

            // Check walls collision

            // Check bacteria and macrofag collision
            for (var i = this.bacterias.length - 1; i >= 0; i--) {
                var bacteria = this.bacterias[i];

                for (var j = 0; j < this.macrophages.length; j++) {
                    var macrophage = this.macrophages[j];

                    if (bacteria.collidesWith(macrophage)) {
                        //TODO: Check if there is a match in receptors...
                        bacteria.kill();
                        this.bacterias.splice(i, 1);
                    }
                }

                // Check collision with receptor
                if (this.receptor) {
                    if (bacteria.collidesWith(this.receptor)) {
                        this.receptor.kill();
                        this.receptor = null;
                        this.showDecisionDialog();
                    }
                }
            }

            // Check bacteria and receptor collision
            if (this.bacterias.length == 0) {
                this.gameOver();
            } else if (this.bacterias.length > 100) {
                this.gameWon();
            }

            // Check game end: no bacterias, or enough bacterias
        }
    },

    gameOver: function() {
        var dialog = new GameOverDialog(this.game, this.config, "GAME OVER!");
        this.game.add.existing(dialog);
    },

    gameWon: function() {
        var dialog = new GameOverDialog(this.game, this.config, "YOU WON!");
        this.game.add.existing(dialog);
    },

    splitAllBacterias: function() {
        this.newBacterias = [];
        for (var i = 0; i < this.bacterias.length; i++) {            
            var bacteria = this.bacterias[i];
            var newBacterias = bacteria.split();
            bacteria.kill();

            for (var j = 0; j < newBacterias.length; j++) {
                this.game.add.existing(newBacterias[j]);
                this.newBacterias.push(newBacterias[j]);
            }
        }

        this.bacterias = this.newBacterias;
    },

    acquireReceptor: function() {

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
