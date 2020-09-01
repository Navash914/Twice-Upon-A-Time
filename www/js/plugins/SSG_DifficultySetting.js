//=============================================================================
// SSG_DifficultySetting.js
// Version 1.0.1
//==============================================================================

/*:
 * @plugindesc Add difficulty feature on your game.
 * <SSG_DifficultySetting>
 * @author Heartbreak61
 * 
 * @help
 * ============================================================================
 *                 [Simple Stupid Gaming] Difficulty Setting
 *
 *                      file name: SSG_DifficultySetting.js
 *                                 ver 1.0.1
 *                              by Heartbreak61
 * ----------------------------------------------------------------------------
 * 
 * 
 * This plugin allows you to set difficulties that affects enemies stats, exp,
 * gold, and shop price. You can choose wether to display difficulty setting on
 * Game Option screen or not (default: on). In case you don't want to, you can 
 * switch difficulty levels using Event Plugin Command.
 * 
 * Before using this plugin, please make sure that you have file Difficulty.json
 * and place that file on the "data" folder of your current project. Edit your
 * Difficulty.json to your liking. You may add or remove difficulty levels as 
 * long as you follow the pattern.
 *
 * ============================================================================
 *                        DIFFICULTY.JSON EXPLANATION
 * ----------------------------------------------------------------------------
 *
 *                                ~~ name ~~
 *
 * Set your difficulty level name that will be displayed on the Option Screen.
 * Values must be a string (wrapped by quotes or double quotes sign).
 *
 * The tables is an Array. It means that the first element's ID is 0.
 * You should make your difficulty level sorted from easiest to hardest. As
 * it will make sense for the player when they set difficulty on the option
 * screen
 *
 *
 *              ~~ mhp, mmp, atk, def, atk, mat, mdf, agi, luk ~~
 * Set enemy's stats. Values represent percentage (100 is 100%)
 *
 *
 *                              ~~ exp, gold ~~
 * Set enemy's exp and gold. Values represent percentage
 *
 *
 *                              ~~ buy, sell ~~
 * Affect price when buying or selling items on the shop. Values represent
 * percentage
 *
 * 
 *                              ~~ switches ~~
 * Will specified set of switches to ON when a difficulty level applied.
 * Switches should be declared in array (i.e. [1,2,3]). If you don't want to
 * use this feature, just set it to [0]. Switches from other difficulty level
 * will be turned OFF but you can have same switches declared on different
 * difficulty level (See how I set switch 6 on difficulty 0 and 2 on the
 * example table below).
 * Please note that switches CAN'T be turned off using normal way.
 *
 *                      Author's Note About Switches:
 * In case you don't know, you can use switches for enemy skill condition.
 * So you can set an enemy to cast different skills on different difficulty
 * level.
 *
 * 
 * ============================================================================
 *                                PLUGIN COMMAND
 * ----------------------------------------------------------------------------
 *
 * To set difficulties using Plugin command, please write:
 *
 *     setDifficulty Number
 *     example: setDifficulty 4
 *
 * Using the example table below, it will set the difficulty level to very hard.
 * 
 * ============================================================================
 *                             SPECIFIC ENEMY SETTING
 * ----------------------------------------------------------------------------
 *
 * To override the table (for example, you find that 250% of DEF is too high
 * for certain enemies, you can write this line on enemy notebox
 *
 *		<param difficulty: difficultyLevel, param, value>
 *		example: <def_difficulty: 4, def, 250>
 * 
 * It will set enemy's DEF on difficulty 4 to 250%.
 *
 * Or you can write these lines for multiple assignment
 * 		<enemy difficulty>
 *		difficultyLevel, param, value
 *		difficultyLevel, param, value
 *		...
 *		</enemy difficulty>
 *
 *		example:
 * 		<enemy difficulty>
 *		3, atk, 150
 *		3, def, 125
 *		4, atk, 200
 *		...
 *		</enemy difficulty>
 *
 *
 * valid arguments for enemy stats is:
 *
 *     mhp, mmp, atk, def, mat, mdf, agi, luk, exp, gold
 *
 * Note: default parameter limiter for enemy will still be applied. For example,
 * you won't be able to set enemy's ATK to a value more than 999.
 *
 * ============================================================================
 *                                 TERM OF USE
 * ----------------------------------------------------------------------------
 *
 * Free to use on both commercial or non-commercial project as long as you
 * give credits to me. ;)
 *
 * ============================================================================
 *                                 CHANGELOG
 * ----------------------------------------------------------------------------
 * 2015.11.16 ver 0.9.9
 *   - Finished beta version
 *
 * 2015.11.26 ver 1.0.0
 *   - Added   : display on Option Screen
 *   - Added   : option to turn switches on
 *   - Changed : change from using Game_System to SSG_Heartbreak static class
 *
 *
 * 2015.11.27 ver 1.0.1
 *   - Fixed   :  Attempt to fix error about not being able to read property of
 *                'length' from null object
 *               
 * 2015.11.28 ver 1.0.2
 *   - Fixed   : Improved fix method from ver 1.0.1. Now it should work properly.
 *   - Fixed   : Bug that caused user to be able to set switches from another
 *               difficulty level to ON
 *   - Added   : Better documentation
 *
 * ============================================================================
 *                                 END OF HELP
 * ============================================================================
 * @param Show Difficulty Option
 * @desc Show Difficulty on Option Window
 * @default true
 *
 * @param Default Difficulty
 * @desc Your default starting difficulty level. This value will be replaced by game option save data.
 * @default 0
 */

/**
 * "Register" this plugin on a variable called Imported, which is the way
 * many scripter check for other's script existence.
 */
var Imported = Imported || {};
Imported['SSG Difficulty Setting'] = '1.0.2';

/**
 * Create new object SSG_Heartbreak which I intend to use on most of my future script
 */
 var SSG_Heartbreak = SSG_Heartbreak || {};
 

(function() {
'use strict';
var params = $plugins.filter(function(plugin) {
	return plugin.description.indexOf('<SSG_DifficultySetting>') != -1;
})[0].parameters;
var showDiff = (params['Show Difficulty Option'].toLowerCase() === 'true') ? true : false;
var defDiff = Number(params['Default Difficulty'] || 0);

//==============================================================================
// Array.unique
Array.prototype.unique = function() {
	var o = {}, i, l = this.length, r = [];
	for (i=0; i<l; i++) o[this[i]] = this[i];
	for (i in o) r.push(o[i]);
	return r;
}

//==============================================================================
// SSG_Heartbreak

SSG_Heartbreak.conversionTable = ['mhp','mmp','atk','def','mat','mdf','agi','luk','exp','gold'];
SSG_Heartbreak.difficultyTable = [];
SSG_Heartbreak.difficultyFalseSwitches = [];
SSG_Heartbreak.regexOverOn = /<enemy difficulty>/;
SSG_Heartbreak.regexOverOff = /<\/enemy difficulty>/;

/**
 * A method to tell the engine to scan enemies data from $dataEnemies.
 */
SSG_Heartbreak.loadEnemyDifficulty = function() {
	if (SSG_Heartbreak.isDataEnemyLoaded()) {
		SSG_Heartbreak.scanData($dataEnemies);
	}
};

/**
 * Create enemy difficulty multiplier based on global difficulty multiplier and tell the engine
 * to scan enemy note, which will set specific enemy multiplier.
 */
SSG_Heartbreak.scanData = function(data){
	for (var i = 0; i < data.length; i++){
		if (!!data[i]){
			this.createEnemyMultiplier(data[i]);
			this.scanDifficultyNote(data[i]);
		}
	}
};

/**
 * A method to create enemy difficulty multiplier based on global difficulty multiplier.
 */
SSG_Heartbreak.createEnemyMultiplier = function(object){
	object.paramMultiplier = [];
	var table = SSG_Heartbreak.difficultyTable;
	var limit = SSG_Heartbreak.conversionTable.length;
	for (var i = 0; i < table.length; i++) {
	object.paramMultiplier[i] = {};
	var _keys = Object.keys(table[i]);
		for (var ii = 0; ii <= limit; ii++) {
			object.paramMultiplier[i][_keys[ii]] = table[i][_keys[ii]];
		}
	};
};

/**
 * Method to scan specific enemy multiplier.
 */
SSG_Heartbreak.scanDifficultyNote = function(object) {
	var _ary = object.note.split(/[\r\n]/);
	var _regex = /(\d+)\s*,\s*(\w+)\s*,\s*(\d+)/;
	var _regexTwo = /<param difficulty:\s*(\d+)\s*,\s*(\w+)\s*,\s*(\d+)>/;
	var _bool = false;
	for (var i = 0; i < _ary.length; i++){
		var _line = _ary[i];
		if (_line.match( _regexTwo )){
			var _found = _line.match(_regexTwo);
			var _dLv = Number(_found[1]);
			var _param = _found[2]; 
			var _value = Number(_found[3]);
			object.paramMultiplier[_dLv][_param] = _value;
		}
		if (_line.match( SSG_Heartbreak.regexOverOn )) {
			_bool = true;
			continue;
		}
		if (_line.match( SSG_Heartbreak.regexOverOff )) {
			_bool = false;
			continue;
		}
		if (_bool = true && !!_line.match(_regex)) {
			var _found = _line.match(_regex);
			var _dLv = Number(_found[1]);
			var _param = _found[2]; 
			var _value = Number(_found[3]);
			object.paramMultiplier[_dLv][_param] = _value;
		}
	}
};

/**
 * A method to load Difficulties.json and store it on a variable which will be
 * used for lookup.
 */
SSG_Heartbreak.loadDifficulty = function() {
    var xhr = new XMLHttpRequest();
    var url = 'data/Difficulties.json';
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
        if (xhr.status < 400) {
			var str = xhr.responseText.replace(/[\r\n\t]/g,'');
			str = str.replace('],}', ']}');
			str = str.replace('},]', '}]');
			SSG_Heartbreak.difficultyTable = JSON.parse(str);
			_ConfigManager_load.call(ConfigManager);
        }
    };
	xhr.onerror = function() {
		var str = 'Failed to load /data/Difficulties.json file!';
        throw new Error(str);
    };
    xhr.send();
};

/**
 * A method to check wether enemies data and difficulty table has been loaded
 */
SSG_Heartbreak.isDataEnemyLoaded = function() {
	return (!!$dataEnemies && (SSG_Heartbreak.difficultyTable.length > 0));
};


//==============================================================================
// ConfigManager
/**
 * Since we use game configuration, we need to create new properties called
 * "difficulty" of configuration.
 */
var _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	var config = _ConfigManager_makeData.call(this);
	config.difficulty = this.difficulty;
	return config;
};

/**
 * Everytime game configuration is saved, we need to make sure that our difficulty
 * is also being saved.
 */
var _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	_ConfigManager_applyData.call(this, config);
	this.difficulty = this.readDifficulty(config, 'difficulty');
};

/**
 * And everytime game configuration is readed, we need our difficulty to be loaded too.
 */
ConfigManager.readDifficulty = function(config, name) {
	var value = config[name];
    if (value !== undefined) {
		return value;
    } else {
        return defDiff;
    }
};

/**
 * We replaced default config manager way to load saved config data. Since we will load
 * difficulty name from our difficulty table, we need to move the default method when
 * we're sure that our difficulty table has fully being loaded.
 */
var _ConfigManager_load = ConfigManager.load;
ConfigManager.load = function(){
	SSG_Heartbreak.loadDifficulty();
}

// ==============================================================================
// Game_Switches
/**
 * Setup switches that have any relationship with our difficulty table. 
 */
var _Game_Switches_initialize = Game_Switches.prototype.initialize;
Game_Switches.prototype.initialize = function() {
	_Game_Switches_initialize.call(this);
	this.setDifficultySwitches();
};

/**
 * We do not allow the game to alter switches from our difficulty table
 */
var _Game_Switches_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
	var table = SSG_Heartbreak.difficultyTable
	var diff = ConfigManager.difficulty;
	var swTrue = table[diff]["switches"];
	var swFalse = SSG_Heartbreak.difficultyFalseSwitches;
	if (swFalse.contains(switchId) || swTrue.contains(switchId)) { return; }
	_Game_Switches_setValue.call(this, switchId, value);
};

/**
 * Method to set all switches from current difficulty level to on. This method
 * also turn all switches from another difficulty level to off. 
 */
Game_Switches.prototype.setDifficultySwitches = function() {
	var table = SSG_Heartbreak.difficultyTable.slice();
	var diff = ConfigManager.difficulty;
	var swTrue = table[diff]["switches"] || [];
	SSG_Heartbreak.difficultyFalseSwitches = []
	for (var i = 0; i < table.length; i++) {
		if (i === diff) { continue; }
		if ( !!table[i]["switches"] ) {
			SSG_Heartbreak.difficultyFalseSwitches.push(table[i]["switches"]);
		}
	}
	SSG_Heartbreak.difficultyFalseSwitches = SSG_Heartbreak.difficultyFalseSwitches.join().split(',').filter(function(m) {
		return !!m;}).unique();
	for (var i = 0; i < SSG_Heartbreak.difficultyFalseSwitches.length; i++) {
		var sw;
		SSG_Heartbreak.difficultyFalseSwitches[i] = Number(SSG_Heartbreak.difficultyFalseSwitches[i])
		sw = SSG_Heartbreak.difficultyFalseSwitches[i];
		if (sw > 0 && sw < $dataSystem.switches.length) {
			this._data[sw] = false;
		}
	}
	for (var i = 0; i < swTrue.length; i++) {
		swTrue[i] = Number(swTrue[i]);
		this._data[swTrue[i]] = true;
	}
	if (!!$gameMap) this.onChange();
};


// ==============================================================================
// Game_Interpreter
/**
 * Set our plugin command that can be invoked from event command. Everytime we set
 * our difficulty, we need to update game switches and config manager.
 */
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command.toLowerCase() === 'setdifficulty') {
		ConfigManager.difficulty = args[0];
		$gameSwitches.setDifficultySwitches();
		ConfigManager.save();
	}
};

// ==============================================================================
// Game_Enemy
/**
 * A method to calculate final stats
 */
Game_Enemy.prototype.paramDifficultyFormula = function(id, value) {
	var mult, enemy = this.enemy(), dl = ConfigManager.difficulty;
	mult = enemy.paramMultiplier[dl][id];
	return Math.floor(value * mult / 100);
};

/**
 * Alter param base using formula
 */
var _Game_Enemy_paramBase = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
	var value = _Game_Enemy_paramBase.call(this, paramId);
	var key = SSG_Heartbreak.conversionTable[paramId];
	return this.paramDifficultyFormula(key, value);
};

/**
 * Alter enemy exp using formula
 */
var _Game_Enemy_exp = Game_Enemy.prototype.exp;
Game_Enemy.prototype.exp = function() {
	var value = _Game_Enemy_exp.call(this);
	return this.paramDifficultyFormula('exp', value);
};

/**
 * Alter enemy exp using formula
 */
var _Game_Enemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function() {
	var value = _Game_Enemy_gold.call(this);
	return this.paramDifficultyFormula('gold', value);
};

// ==============================================================================
// Window_ShopBuy
/**
 * Alter shop buying price. Since we can't create individual table on shop like
 * we did on enemies, we need to look at our global difficulty table
 */
var _Window_ShopBuy_price = Window_ShopBuy.prototype.price;
Window_ShopBuy.prototype.price = function(item){
	var value = _Window_ShopBuy_price.call(this, item),
	diffLevel = ConfigManager.difficulty,
	table = SSG_Heartbreak.difficultyTable,
	mult = table[diffLevel]['buy'];
	return Math.floor( value * mult / 100);
};

// ==============================================================================
// Scene_Boot
/**
 * Tell the engine to load enemy difficulty when enemies data and our difficulty table
 * has been loaded. Maybe there's a better way to do this, instead of do regular check
 * at the beginning of the game. But since we only do this on the Scene Boot, lets leave
 * it at it is right now.
 */
Scene_Boot.prototype.update = function() {
	if (SSG_Heartbreak.isDataEnemyLoaded()){ SSG_Heartbreak.loadEnemyDifficulty(); }
	Scene_Base.prototype.update.call(this);
};

// ==============================================================================
// Scene_Shop
/**
 * Alter shop selling price. Since we can't create individual table on shop like
 * we did on enemies, we need to look at our global difficulty table
 */
var _Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
Scene_Shop.prototype.sellingPrice = function() {
	var value = _Scene_Shop_sellingPrice.call(this),
	diffLevel = ConfigManager.difficulty,
	table = SSG_Heartbreak.difficultyTable,
	mult = table[diffLevel]['sell'];
	return Math.floor( value * mult / 100);
};

// ==============================================================================
// Window_Options
/**
 * Any fancy things we will do on Window Option only valid if we set plugin parameter 
 * 'Show Difficulty Option' to true
 */
if (showDiff) {
	/**
	 * Add difficulty option at the end of the command list
	 */	
	var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
	Window_Options.prototype.makeCommandList = function() {
		_Window_Options_makeCommandList.call(this);
		this.addCommand('Difficulty', 'difficulty');
	};

	/**
	 * Set status text from the "name" value from our difficulty table
	 */	
	var _Window_Options_statusText = Window_Options.prototype.statusText;
	Window_Options.prototype.statusText = function(index) {
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if (symbol === 'difficulty') {
			return SSG_Heartbreak.difficultyTable[value]['name'];
		}
		return _Window_Options_statusText.call(this, index);
	};
	
	/**
	 * When window option tell to the engine to save configuration,
	 * we need to tell it not to forget to save our difficulty setting.
	 */
	var _Window_Options_processOk = Window_Options.prototype.processOk;
	Window_Options.prototype.processOk = function() {
		var index = this.index();
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		var max = SSG_Heartbreak.difficultyTable.length - 1
		if (symbol === 'difficulty') {
			value = value.clamp(0, max);
			this.changeValue(symbol, value);
		} else {
			_Window_Options_processOk.call(this);
		}
	};
	
	/**
	 * Add method on process cursor right for difficulty option
	 */
	var _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
	Window_Options.prototype.cursorRight = function(wrap) {
		var index = this.index();
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		var max = SSG_Heartbreak.difficultyTable.length - 1
		if (symbol === 'difficulty') {
			value++;
			value = value.clamp(0, max);
			this.changeValue(symbol, value);
			$gameSwitches.setDifficultySwitches()
		} else {
			_Window_Options_cursorRight.call(this, wrap);
		}
	};
	
	/**
	 * Add method on process cursor left for difficulty option
	 */
	var _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
	Window_Options.prototype.cursorLeft = function(wrap) {
		var index = this.index();
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		var max = SSG_Heartbreak.difficultyTable.length - 1
		if (symbol === 'difficulty') {
			value--;
			value = value.clamp(0, max);
			this.changeValue(symbol, value);
			$gameSwitches.setDifficultySwitches()
		} else {
			_Window_Options_cursorLeft.call(this, wrap);
		}
	};

}; //if (showDiff)

//==============================================================================
})(); // (function() {
