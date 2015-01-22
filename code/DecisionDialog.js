DecisionDialog = function(game, config, receptorLevel) {
    Dialog.call(this, game, config, "dialog");
    this.receptorLevel = receptorLevel;

    var splitButton = game.add.sprite(-102, -50, 
		"receptor_button" + (this.receptorLevel + 1 + 1).toString());
	var duplicateButton = game.add.sprite(20, -50, "split_button");

    var style = {font: "20px Arial", fill: "#ff0044", align: "center"};
    var qText = game.add.text(-68, 30, "Q", style);
    var wText = game.add.text(54, 30, "W", style);

	this.addChild(splitButton);
	this.addChild(duplicateButton);
	this.addChild(qText);
	this.addChild(wText);
};

DecisionDialog.prototype = Object.create(Dialog.prototype);
DecisionDialog.prototype.constructor = DecisionDialog;
