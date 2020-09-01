//=============================================================================
// Bluebooth Plugins - Consistent Audio
// BBS_ConsistentAudio.js
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc v1.01 Keep BGS/BGM consistent when transitioning between maps,
 * after loading a saved file, transitioning to and from menus, etc.  In other words
 * this eliminates the need for checks on every map to confirm the right BGM/BGS
 * is playing.
 * @author Michael Morris
 * 
 * @param Universal Fade Duration
 * @desc How many frames audio should take to fade in and out.  6 by default.
 * Default: 6
 * @default 6
 * 
 * @param ---Debug Settings---
 * @default
 * 
 * @param Debug Mode
 * @desc Enable to activate console variable logging.  Use for debugging odd behaviour.
 * true to enable console variable logging.
 * @default false
 *  
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * One of my biggest pet peeves with RPG Maker MV is that it doesn't track the most
 * recent weather and BGS/BGM when transitioning to an interior and then back to
 * the exterior map again, or during save and loads!  This is mostly a problem on
 * maps where these conditions can change based on scripts (ie. the map is normally
 * a "day" map, but with a time change is now a "night" map).  It would be really 
 * helpful if such settings could be tracked for you.  So I made it happen.  
 * This cuts down on debugging time (you won't need to check every door during 
 * every condition change to see which door loses changes), and
 * just makes development life more pleasant.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * 
 *  consistentAudio ignoreNext				Do not save the next audio change for BGM or BGS, whichever comes first.
 *  consistentAudio ignoreNextBgm			Do not save the next audio change for BGM only.
 *  consistentAudio ignoreNextBgs			Do not save the next audio change for BGS only.
 * 
 * ============================================================================
 * Versions
 * ============================================================================
 * 1.01 - Plugin finished.
 * 
 */
//=============================================================================

//=============================================================================

//=============================================================================
var Imported = Imported || {} ;
var BBS = BBS || {};
Imported.ConsistentAudio = 1;
BBS.ConsistentAudio = BBS.ConsistentAudio || {};

(function() {
		  
	//=============================================================================
	// Parameter Variables
	//=============================================================================
	var parameters = PluginManager.parameters('BBS_ConsistentTimeWeather');
	
	// Save variables (weather)
	var universalDuration		= Number(parameters['Universal Fade Duration'] || 6);
	
	// Other
	var debugging		  		= eval(String(parameters['Debug Mode'] || 'false'));

	// Track audio
	var $mapConditions = null;
	var ignoreNextBgm = false;
	var ignoreNextBgs = false;
		
	//=============================================================================
	// Game_Interpreter
	//=============================================================================
    var BBS_CA_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        if (command === 'consistentAudio') {
            switch (args[0]) 
			{
				case 'ignoreNext':
					ignoreNextBgm = true;
					ignoreNextBgs = true;
					break;
				case 'ignoreNextBgm':
					ignoreNextBgm = true;
					break;
				case 'ignoreNextBgs':
					ignoreNextBgs = true;
					break;
			};
		}
		else {
			BBS_CA_Game_Interpreter_pluginCommand.call(this, command, args);
		}
    };
	
	// Fadeout BGM - need to update BGM Saved Audio.
	var BBS_CA_GameInterpreter_command242 = Game_Interpreter.prototype.command242;
	Game_Interpreter.prototype.command242 = function() {
		if (ignoreNextBgm === true) {
			ignoreNextBgm = false;
			return BBS_CA_GameInterpreter_command242.call(this);
		}
		
		// Make sure $gameMap exists
		if (SceneManager._scene instanceof Scene_Map) {
			$mapConditions.setBGM($gameMap.mapId(), AudioManager.makeEmptyAudioObject());
		}
		
		return BBS_CA_GameInterpreter_command242.call(this);
	};
	
	// Fadeout BGS - need to update BGS Saved Audio.
	var BBS_CA_GameInterpreter_command246 = Game_Interpreter.prototype.command246;
	Game_Interpreter.prototype.command246 = function() {
		if (ignoreNextBgs === true) {
			ignoreNextBgs = false;
			return BBS_CA_GameInterpreter_command246.call(this);
		}
		
		// Make sure $gameMap exists
		if (SceneManager._scene instanceof Scene_Map) {
			$mapConditions.setBGS($gameMap.mapId(), AudioManager.makeEmptyAudioObject());
		}
		
		return BBS_CA_GameInterpreter_command246.call(this);
	};
	
	//=============================================================================
	// Map_Conditions
	//=============================================================================
	function Map_Conditions() {
		this.initialize.apply(this, arguments);
	};
	
	Map_Conditions.prototype.initialize = function() {
		this._savedBGMs = {};
		this._savedBGSs = {};
	};
	
	Map_Conditions.prototype = Object.create(Map_Conditions.prototype);
	Map_Conditions.prototype.constructor = Map_Conditions;	
	
	Map_Conditions.prototype.getBGM = function(mapId) {
		console.log(this._savedBGMs);
        if (this._savedBGMs[mapId] !== undefined) {
            return this._savedBGMs[mapId];
        }
		console.log("getBGM with mapId " + mapId + " not found.");
        return undefined;
    };
	
	Map_Conditions.prototype.getBGS = function(mapId) {
        if (this._savedBGSs[mapId] !== undefined) {
            return this._savedBGSs[mapId];
        }
		console.log("getBGS with mapId " + mapId + " not found.");
        return undefined;
    };
	
	Map_Conditions.prototype.setBGM = function(mapId, bgm) {
		this._savedBGMs[mapId] = {
			name: bgm.name,
			volume: bgm.volume,
			pitch: bgm.pitch,
			pan: bgm.pan,
			pos: 0
		};
		
	};
	
	Map_Conditions.prototype.setBGS = function(mapId, bgs) {		
		this._savedBGSs[mapId] = {
			name: bgs.name,
			volume: bgs.volume,
			pitch: bgs.pitch,
			pan: bgs.pan,
			pos: 0
		};
	};

	//=============================================================================
	// Game_Player
	//=============================================================================	
	var BBS_CA_performTransfer = Game_Player.prototype.performTransfer;
	Game_Player.prototype.performTransfer = function() {
		AudioManager.fadeOutBgm(universalDuration);
		AudioManager.fadeOutBgs(universalDuration);
		BBS_CA_performTransfer.call(this);
	};
	
	//=============================================================================
	// Data_Manager
	//=============================================================================	
	var BBS_CA_DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = BBS_CA_DataManager_makeSaveContents.call(this);
		contents.savedBGMs = $mapConditions._savedBGMs;
		contents.savedBGSs = $mapConditions._savedBGSs;
		
		if (debugging === true) {
			console.log("Saved BGM and BGS conditions.");
		}
		
        return contents;
    };
	
	var BBS_CA_DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        BBS_CA_DataManager_extractSaveContents.call(this, contents);
		$mapConditions = new Map_Conditions();
		
		console.log(contents.savedBGMs);
		$mapConditions._savedBGMs = contents.savedBGMs;
		$mapConditions._savedBGSs = contents.savedBGSs;
		
		if (debugging === true) {
			console.log("Extracted BGM and BGS saved conditions.");
		}
    };
    
	var BBS_CA_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        BBS_CA_DataManager_createGameObjects.call(this);
        // Create global map conditions class
        $mapConditions = new Map_Conditions();
		
		if (debugging === true) {
			console.log("Created Map Conditions object.");
		}
    };
	
	//=============================================================================
	// Game_System
	//=============================================================================	
	// For handling custom data...
	Game_System.prototype.storeBgm = function(mapId) {
		if (ignoreNextBgm === true) {
			ignoreNextBgm = false;
			return;
		}
		
		var bgm = AudioManager.saveBgm();
		$mapConditions.setBGM(mapId, bgm);
		
		if (debugging === true) {
			console.log("Stored BGM for " + mapId);
			
			console.log(mapId);
			console.log(JSON.stringify(bgm));
		}
	};
	
	Game_System.prototype.storeBgs = function(mapId) {
		if (ignoreNextBgs === true) {
			ignoreNextBgs = false;
			return;
		}
		
		var bgs = AudioManager.saveBgs();
		$mapConditions.setBGS(mapId, bgs);
		
		if (debugging === true) {
			console.log("Stored BGS for " + mapId);

			console.log(mapId);
			console.log(JSON.stringify(bgs));
		}
	};
	
	Game_System.prototype.retrieveBgm = function(mapId) {
		console.log($mapConditions.getBGM(mapId));
		var bgm = $mapConditions.getBGM(mapId);
		
		console.log($dataMap);
		
		// If we don't already have the BGM logged, log the BGM of the current map.  If that's not set, play nothing.
		if (bgm === undefined) {
			if ($dataMap.autoplayBgm) {
				bgm = $dataMap.bgm;
			} else {
				bgm = AudioManager.makeEmptyAudioObject();
			}
		}
		
		AudioManager.playBgm(bgm, bgm.pos);
		AudioManager.fadeInBgm(universalDuration);
	};
	
	Game_System.prototype.retrieveBgs = function(mapId) {
		var bgs = $mapConditions.getBGS(mapId);
		
		// If we don't already have the BGS logged, log the BGS of the current map.  If that's not set, play nothing.
		if (bgs === undefined) {
			if ($dataMap.autoplayBgs) {
				bgs = $dataMap.bgs;
			} else {
				bgs = AudioManager.makeEmptyAudioObject();
			}
		}

		AudioManager.playBgs(bgs, bgs.pos);
		AudioManager.fadeInBgs(universalDuration);
	};
	
	//=============================================================================
	// AudioManager
	//=============================================================================
	var BBS_CA_AudioManager_initialize = AudioManager.initialize;
	AudioManager.initialize = function() {
		BBS_CA_AudioManager_initialize.call(this);
		AudioManager._replayFadeTime = universalDuration;
	};

	var BBS_CA_AudioManager_playBgm = AudioManager.playBgm;
	AudioManager.playBgm = function(bgm, pos) {
		BBS_CA_AudioManager_playBgm.call(this, bgm, pos);
		
		if (SceneManager._scene instanceof Scene_Map) {
			$gameSystem.storeBgm($gameMap.mapId());
		}
		
		this.fadeInBgm(universalDuration);
	};
	
	var BBS_CA_AudioManager_playBgs = AudioManager.playBgs;
	AudioManager.playBgs = function(bgs, pos) {
		BBS_CA_AudioManager_playBgs.call(this, bgs, pos);
		
		if (SceneManager._scene instanceof Scene_Map) {
			$gameSystem.storeBgs($gameMap.mapId());
		}
		
		this.fadeInBgs(universalDuration);
	};
	
	var BBS_CA_AudioManager_stopBgm = AudioManager.stopBgm;
	AudioManager.stopBgm = function() {
		BBS_CA_AudioManager_stopBgm.call(this);
		//$gameSystem.storeBgm(this.makeEmptyAudioObject(), 0);
	};
	
	var BBS_CA_AudioManager_stopBgs = AudioManager.stopBgs;
	AudioManager.stopBgs = function() {
		BBS_CA_AudioManager_stopBgs.call(this);
		//$gameSystem.storeBgs(this.makeEmptyAudioObject(), 0);
	};

	//=============================================================================
	// Game_Map
	//=============================================================================	
	// Overwrite necessary to force loading of correct audio!
	Game_Map.prototype.autoplay = function() {
		var mapId = $gameMap.mapId();
		
		$gameSystem.retrieveBgm(mapId);
		$gameSystem.retrieveBgs(mapId);
	};

	//=============================================================================
	// Scene_Map
	//============================================================================= 
	Scene_Map.prototype.reloadCondition = function() {
		$gameSystem.retrieveBgm($gameMap.mapId());
		$gameSystem.retrieveBgs($gameMap.mapId());
	}
	
	Scene_Map.prototype.saveCondition = function() {
		$gameSystem.storeBgm($gameMap.mapId());
		$gameSystem.storeBgs($gameMap.mapId());
	};
	
	// Save current state of map before transitioning to another map, to battle, or to menu.
	var BBS_CTW_Scene_Map_updateScene = Scene_Map.prototype.updateScene;
	Scene_Map.prototype.updateScene = function() {
		this.checkGameover();		// Do not save condition if game over.
		this.saveCondition();
		
		BBS_CTW_Scene_Map_updateScene.call(this);
	};

})(BBS.ConsistentAudio);
//=============================================================================
// End of File
//=============================================================================
