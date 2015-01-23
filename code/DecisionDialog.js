DecisionDialog = function(game, config, receptorLevel) {
    Dialog.call(this, game, config, "dialog");
    this.receptorLevel = receptorLevel;

    var splitButton = game.add.sprite(-102, -50, 
		"receptor_button" + (this.receptorLevel + 1 + 1).toString());
	var duplicateButton = game.add.sprite(20, -50, "split_button");

    var style = {font: "28pt Arial", fill: "#C0EAFF", align: "center"};
    var qText = game.add.text(-76, 30, "Q", style);
    var wText = game.add.text(46, 30, "W", style);

	this.addChild(splitButton);
	this.addChild(duplicateButton);
	this.addChild(qText);
	this.addChild(wText);
};

DecisionDialog.prototype = Object.create(Dialog.prototype);
DecisionDialog.prototype.constructor = DecisionDialog;
