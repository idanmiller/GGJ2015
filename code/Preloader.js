
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		//this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('bacteria', 'images/bacteria_0.png');
		this.load.atlas('bacteria_idle', 'images/bacteria_idle.png', 'bacteria_idle.json' );
		this.load.atlas('bacteria_split', 'images/bacteria_split.png', 'bacteria_split.json' );
		this.load.image('macrophage', 'images/Macrophage_0.png');
		this.load.image('dialog', 'images/selection_dialog_frame.png');
		this.load.image('startDialog', 'images/hit_space_to_play.png');
		this.load.image('receptor', 'images/receptor.png');
		this.load.image('receptor_1', 'images/receptor_1.png');
		this.load.image('receptor_2', 'images/receptor_2.png');
		this.load.image('receptor_3', 'images/receptor_3.png');
		this.load.image('receptor_4', 'images/receptor_4.png');
		this.load.image('receptor_5', 'images/receptor_5.png');
		this.load.image('receptor_6', 'images/receptor_6.png');
		this.load.image('receptor_7', 'images/receptor_7.png');
		this.load.image('receptor_8', 'images/receptor_8.png');
		this.load.image('receptor_9', 'images/receptor_9.png');
		this.load.image('receptor_10', 'images/receptor_10.png');
		this.load.image('macrophage_receptor_1', 'images/macrophage_receptor_1.png');
		this.load.image('macrophage_receptor_2', 'images/macrophage_receptor_2.png');
		this.load.image('macrophage_receptor_3', 'images/macrophage_receptor_3.png');
		this.load.image('macrophage_receptor_4', 'images/macrophage_receptor_4.png');
		this.load.image('macrophage_receptor_5', 'images/macrophage_receptor_5.png');
		this.load.image('macrophage_receptor_6', 'images/macrophage_receptor_6.png');
		this.load.image('macrophage_receptor_7', 'images/macrophage_receptor_7.png');
		this.load.image('macrophage_receptor_8', 'images/macrophage_receptor_8.png');
		this.load.image('macrophage_receptor_9', 'images/macrophage_receptor_9.png');
		this.load.image('macrophage_receptor_10', 'images/macrophage_receptor_10.png');
		this.load.image('background', 'images/background.jpg');
		this.load.image('you_won', 'images/you_won.png');
		this.load.image('you_lost', 'images/you_lost.png');
		this.load.image('split_button', 'images/selection_split_normal.png');
		this.load.image('receptor_button1', 'images/dialog_receptor_1_normal.png');
		this.load.image('receptor_button2', 'images/dialog_receptor_2_normal.png');
		this.load.image('receptor_button3', 'images/dialog_receptor_3_normal.png');
		this.load.image('receptor_button4', 'images/dialog_receptor_4_normal.png');
		this.load.image('receptor_button5', 'images/dialog_receptor_5_normal.png');
		this.load.image('receptor_button6', 'images/dialog_receptor_6_normal.png');
		this.load.image('receptor_button7', 'images/dialog_receptor_7_normal.png');
		this.load.image('receptor_button8', 'images/dialog_receptor_8_normal.png');
		this.load.image('receptor_button9', 'images/dialog_receptor_9_normal.png');
		this.load.image('receptor_button10', 'images/dialog_receptor_10_normal.png');
		//this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		this.load.audio('gameMusic', ['audio/jerms_game.mp3']);
		this.load.audio('menuMusic', ['audio/menu_music.mp3']);
		//this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		//this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		/*if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}*/
		this.state.start('MainMenu');

	}

};
