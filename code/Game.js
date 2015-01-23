//Globals
var GamePaused = false;
var FadeTarget  = 1;
var ScaleTarget  = 1;
var SacleFactor  = 0.001;

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
    this.entities = [];
    this.lostGame = false;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {
        // Create initial bacteria
        this.waitingToStart = true;
        this.receptor = null;
        this.isDeciding = false;
        this.bacterias = [];
        this.macrophages = [];

        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

        this.bgtile = this.game.add.tileSprite(960, 0, 1920, 600, 'background');
        this.bgtile.x =0;

        this.startScreen = new Dialog(this.game, this.config, "startDialog");
        this.game.add.existing(this.startScreen);

        this.music = this.add.audio('menuMusic',1,true);
        this.music.play('',0,1,true);
    },

    startGame: function() {
        this.startScreen.kill();

        var bacteria = new Bacteria(this.game, this.config, 100, 100, "bacteria_idle");
        bacteria.animations.add('bacteria_idle');
        bacteria.animations.play('bacteria_idle', 10, true);
        this.game.add.existing(bacteria);
        this.bacterias.push(bacteria);
        //  var bacteria1 = new Bacteria(this.game, this.config, 200, 200, "bacteria_idle");
        // bacteria1.animations.add('bacteria_idle');
        // bacteria1.animations.play('bacteria_idle', 10, true);
        // this.game.add.existing(bacteria1);
        // this.bacterias.push(bacteria1);

        // Start and init itter
        // TEMP just emit a macrophage every 3 seconds
        //this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.addMacrophage, this);
        //this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.addReceptor, this);

        this.music.stop();
        this.game.time.events.loop(Phaser.Timer.SECOND * 15, this.addScore, this);
        this.music = this.add.audio('gameMusic',1,true);
        this.music.play('',0,1,true);
    },

    addScore: function() {
        this.score++;
    },

    addMacrophage: function(macrophage) {
        var bacteria = this.bacterias[Math.floor(Math.random()*this.bacterias.length)];
        this.game.add.existing(macrophage);
        macrophage.findTarget(bacteria);
        this.macrophages.push(macrophage);
    },

    addReceptor: function(receptor) {
        this.game.add.existing(receptor);
        this.receptor = receptor;

        var sound = this.game.add.audio('powerupAppear');
        sound.play();
    },

    showDecisionDialog: function(level) {
        this.isDeciding = true;
        gamePaused = true;
        this.dialog = new DecisionDialog(this.game, this.config, level);
        this.game.add.existing(this.dialog);

        for (var i = 0; i < this.bacterias.length; i++) {
            this.bacterias[i].resetMovementParameters();
        }
    },

    dimsissDecisionDialog: function() {
        gamePaused = false;
        this.isDeciding = false;
        this.dialog.kill();
    },

    update: function () {
        if (this.waitingToStart) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.waitingToStart = false;
                this.startGame();
            }
        } else {
            // Check controls, update bacteria movement
            var cursors = this.game.input.keyboard.createCursorKeys();

            if (this.isDeciding) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                    this.dimsissDecisionDialog();
                    this.splitAllBacterias();
                }

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
                    this.dimsissDecisionDialog();
                    this.acquireReceptor();
                }
            } else {
                if(this.bacterias.length) {
                    this.bacterias[0].calculateAcceleration(cursors);
                    this.bacterias[0].calculateVelocity(cursors);
                    this.bacterias[0].calculateRotation(cursors);
                    for (var i = 1; i < this.bacterias.length; i++) {
                        var bacteria = this.bacterias[i];
                        bacteria.calculateSwarmAcceleration(this.bacterias[0]);
                        bacteria.calculateSwarmVelocity(this.bacterias[0]);
                    }
                    if (!this.lostGame) {
                        this.emitter.updateProgress(this.score);
                    }
                }
                if(!this.lostGame) {
                    this.emitter.updateProgress(this.score);
                }
                // Move all entities

                // Check walls collision

                // Check bacteria and macrofag collision
                for (var i = this.bacterias.length - 1; i >= 0; i--) {
                    var bacteria = this.bacterias[i];

                    for (var j = 0; j < this.macrophages.length; j++) {
                        var macrophage = this.macrophages[j];
                        if (bacteria.collidesWith(macrophage)&&macrophage.checkBacteria(bacteria)) {
                            //TODO: Check if there is a match in receptors...
                            bacteria.kill();
                            this.bacterias.splice(i, 1);
                        }
                    }
                    // Check collision with receptor
                    if (this.receptor) {
                        if (bacteria.collidesWith(this.receptor)) {
                            this.receptor.kill();
                            this.emitter.numberOfReceptors--;
                            this.receptor = null;
                            this.showDecisionDialog(bacteria.receptorLevel);

                            var sound = this.game.add.audio('powerupTaken');
                            sound.play();
                        }
                    }
                }

                // Check bacteria and receptor collision
                if (!this.lostGame) {
                    if (this.bacterias.length == 0) {
                        this.gameOver(false);
                    } else if (this.bacterias.length > 100) {
                        this.gameOver(true);
                    }
                }else{
                    var tween = game.add.tween(this.bgtile);
                    tween.to({ alpha: 0.0 }, 600);
                    tween.start();    
                }
            }


            //move background
            this.bgtile.x-=0.1;
            if(this.bgtile.x<=-960){
                this.bgtile.x=0;
            }
            // Check game end: no bacterias, or enough bacterias
        }
    },

    gameOver: function(didWon) {
        FadeTarget = 0;
        this.lostGame = true;
        this.music.stop();

        if (didWon) {
            var sound = this.game.add.audio('gameWon');
            sound.play();
        }
    },

    splitAllBacterias: function() {
        this.newBacterias = [];
        for (var i = 0; i < this.bacterias.length; i++) {            
            var bacteria = this.bacterias[i];

            if (i == this.bacterias.length - 1) {
                this.newBacterias = this.newBacterias.concat(bacteria.split(this.afterSplitAnimation, this));
            } else {
                this.newBacterias = this.newBacterias.concat(bacteria.split(null, null));
            }

            
            bacteria.kill();
        }
    },

    afterSplitAnimation: function(splitter) {
        for (var j = 0; j < this.newBacterias.length; j++) {
            var newBacteria = this.newBacterias[j];
            this.game.add.existing(newBacteria);
            newBacteria.animations.add('bacteria_idle');
            newBacteria.animations.play('bacteria_idle', 10, true);
        }

        this.bacterias = this.newBacterias;
    },

    acquireReceptor: function() {
        for (var i = 0; i < this.bacterias.length; i++) {
            this.bacterias[i].acquireReceptor();
        }

        var sound = this.game.add.audio('powerupConfirm');
        sound.play();
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
