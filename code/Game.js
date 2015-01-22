
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
    this.FPS = 60;
    this.config = {fps:this.FPS, strategies:{ default :'Default',chase:'Chase'} };
    this.emitter = new Emitter(game,this.config);

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {
        // Create initial bacteria
        this.isDeciding = false;
        this.bacterias = [];
        this.macrophages = [];

        var bacteria = new Bacteria(this.game, this.config, 100, 100, "bacteria");
        bacteria.collisionRadius = 80;
        this.game.add.existing(bacteria);
        this.bacterias.push(bacteria);

        // Start and init emitter
        // TEMP just emit a macrophage every 3 seconds
        this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.addMacrophage, this);

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    addMacrophage: function() {
        var bacteria = this.bacterias[Math.floor(Math.random()*this.bacterias.length)];
        var macrophage = new Macrophage(this.game, this.config, 700, 100, "macrophage", 50, 140);
        macrophage.collisionRadius = 80;
        this.game.add.existing(macrophage);

        macrophage.findTarget(bacteria);
        this.macrophages.push(macrophage);
    },

    update: function () {
        // Check controls, update bacteria movement
        var cursors = this.game.input.keyboard.createCursorKeys();

        if (this.isDeciding) {
            if (cursors.left.isDown) {
                this.isDeciding = false;
            }

            if (cursors.right.isDown) {
                this.isDeciding = false;
            }
        } else {
            var bacteriaVelocityX = 0;
            var bacteriaVelocityY = 0;


            //todo: Idan velocity should come from an entity property [acceleration]
            if (cursors.left.isDown)
            {
                //  Move to the left
                bacteriaVelocityX = -150;
            }

            if (cursors.right.isDown)
            {
                //  Move to the right
                bacteriaVelocityX = 150;   
            }

            if (cursors.up.isDown)
            {
                //  Move up
                bacteriaVelocityY = -150;   
            }

            if (cursors.down.isDown)
            {
                //  Move down
                bacteriaVelocityY = 150;   
            }

            for (var i = 0; i < this.bacterias.length; i++) {
                this.bacterias[i].velocity = {x: bacteriaVelocityX, y: bacteriaVelocityY};

                // TEMP
                this.bacterias[i].x = this.bacterias[i].x + 1 / this.FPS * this.bacterias[i].velocity.x;
                this.bacterias[i].y = this.bacterias[i].y + 1 / this.FPS * this.bacterias[i].velocity.y;
            }

            //emit macrophage
            var score = 1;
            this.emitter.updateProgress(score);

            // Move all entities

            // Check walls collision

            // Check bacteria and macrofag collision
            /*for (var i = this.bacterias.length - 1; i >= 0; i--) {
                var bacteria = this.bacterias[i];

                for (var j = 0; j < this.macrophages.length; j++) {
                    var macrophage = this.macrophages[j];

                    if (bacteria.collidesWith(macrophage)) {
                        //TODO: Check if there is a match in receptors...
                        bacteria.kill();
                    }
                }
            }*/

            // Check game end: no bacterias, or enough bacterias
        }
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

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
