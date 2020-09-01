//-----------------------------------------------------------------------------
//  Galv's Message Sound Effects
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MessageSoundEffects.js
//-----------------------------------------------------------------------------
//  Version 1.0
//  2015-11-04 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MessageSE = true;

var Galv = Galv || {};          // Galv's main object
Galv.MSE = Galv.MSE || {};      // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Play sound effects when during Show Text event commands.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Default Talk SE
 * @desc Sound effect played during each character in a Show Text
 * message. FileName,volume,pitch.
 * @default Cursor1,80,150
 *
 * @param Default Confirm SE
 * @desc Sound effect played When player confirms message to
 * continue. FileName,volume,pitch.
 * @default Cursor2, 80, 150
 *
 * @param -----------
 * @desc Doesn't do anything
 *
 * @default
 *
 * @param Quick SE 1
 * @desc To use in the quick talk plugin command as 1.
 *
 * @default
 *
 * @param Quick SE 2
 * @desc To use in the quick talk plugin command as 2.
 *
 * @default
 *
 * @param Quick SE 3
 * @desc To use in the quick talk plugin command as 3.
 *
 * @default
 *
 * @param Quick SE 4
 * @desc To use in the quick talk plugin command as 4.
 *
 * @default
 *
 * @help
 * Galv's Message Sound Effects
 * -----------------------------------------------------------------------------
 * Set the default sound effects in the plugin settings for characters showing
 * and for confirming the Show Text message. The parameters are:
 *
 * SoundName,volume,pitch
 *
 * Separated by commas. For example, the below will play the Cursor1 SE at 80
 * volume and 150 pitch:
 * Cursor1,80,150
 *
 * While this plugin allows you to do more or less, RPG Maker MV usually 
 * restricts users to certain amounts:
 * Volume: 0 - 100
 * Pitch: 50 - 150
 *
 * -----------------------------------------------------------------------------
 *   PLUGIN COMMANDS
 * -----------------------------------------------------------------------------
 *   MSGSE TALK CLEAR              // Removes talk SE
 *   MSGSE TALK DEFAULT            // Returns talk SE to default
 *   MSGSE TALK SoundName vol pit  // Sets talk SE to a specific sound
 *   MSGSE TALK x                  // Change talk SE to a quick talk. x = 1-4
 *
 *   MSGSE CONFIRM CLEAR              // Removes the confirm SE
 *   MSGSE CONFIRM DEFAULT            // Returns confirm SE to default
 *   MSGSE CONFIRM SoundName vol pit  // Sets confirm SE to a specific sound
 *   MSGSE CONFIRM x                  // Change confirm SE to a quick SE 1-4
 * -----------------------------------------------------------------------------
 * Once a plugin is called, the SE's will stay changed until changed again.
 */



(function() {
	
// PLUGIN CODE
var Galv_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	Galv_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === 'MSGSE') Galv.MSE.plugin(args);
};

Galv.MSE.plugin = function(arr) {
	if (arr[0] !== "TALK" && arr[0] !== "CONFIRM") return;
	// Get Sound
	switch (arr[1]) {
		case "CLEAR":
			sound = Galv.MSE.makeSound(["",0,100]);
			break;
		case "DEFAULT":
			sound = "default";
			break;
		case "1": case "2": case "3": case "4":
			// Quick SE
			sound = Galv.MSE.quickSE[Number(arr[1])];
			break;
		default:
		console.log(arr);
			obj = {
				name: arr[1],
				pan: 0,
				pitch: Number(arr[3]),
				volume: Number(arr[2])
			};
			sound = obj;
			break;
	};
	// Set sound
	if (arr[0] === "TALK") {
		if (sound === "default") {
			$gameMessage.msgSe = Galv.MSE.defaultSe;
		} else {
			$gameMessage.msgSe = sound;
		};
	} else if (arr[0] === "CONFIRM") {
		if (sound === "default") {
			$gameMessage.msgConfirmSe = Galv.MSE.defaultConfirmSe;
		} else {
			$gameMessage.msgConfirmSe = sound;
		};
	};
};
	
	
Galv.MSE.makeSound = function(txt) {
	if (Array.isArray(txt)) {
		arr = txt;
	} else {
		arr = txt.split(",");
	};
	obj = {
		name: arr[0],
		pan: 0,
		pitch: Number(arr[2]),
		volume: Number(arr[1])
	};
	return obj;
};

Galv.MSE.defaultSe = Galv.MSE.makeSound(PluginManager.parameters('GALV_MessageSoundEffects')["Default Talk SE"]);
Galv.MSE.defaultConfirmSe = Galv.MSE.makeSound(PluginManager.parameters('GALV_MessageSoundEffects')["Default Confirm SE"]);

Galv.MSE.quickSE = [];
for (i = 1; i < 5; i++) {
	var name = "Quick SE " + i
	Galv.MSE.quickSE[i] = Galv.MSE.makeSound(PluginManager.parameters('GALV_MessageSoundEffects')[name]);
};

	
var Galv_Message_initialize = Game_Message.prototype.initialize;
Game_Message.prototype.initialize = function() {
	this.msgSe = Galv.MSE.defaultSe;
	this.msgConfirmSe = Galv.MSE.defaultConfirmSe;
    Galv_Message_initialize.call(this);
};

	
var Galv_Window_Message_processNormalCharacter = Window_Base.prototype.processNormalCharacter || Window_Base.prototype.processNormalCharacter;
Window_Message.prototype.processNormalCharacter = function(textState) {
	if (!this._showFast) AudioManager.playSe($gameMessage.msgSe);
    Galv_Window_Message_processNormalCharacter.call(this, textState);
};


var Galv_Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
	AudioManager.playSe($gameMessage.msgConfirmSe);
    Galv_Window_Message_terminateMessage.call(this);
};
	
	
})();