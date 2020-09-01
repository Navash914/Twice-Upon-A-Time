//-----------------------------------------------------------------------------
//  Galv's Map Animation Effects
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MapAnimEffects.js
//-----------------------------------------------------------------------------
//  2015-12-17 - Version 1.1 - fixed to work with diagonal movement
//  2015-11-20 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MapAnimEffects = true;

var Galv = Galv || {};
Galv.MAE = Galv.MAE || {};

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Enhance the usability of animations and use them to create effects when characters stand on regions.
 *
 * @author Galv - galvs-scripts.com
 *
 * @param Region Effects
 * @desc Must be set up in a certain way - see help file for details.
 * @default 7,10,a-fly | 2,9,a+fly | 5,11,a
 *
 * @param Followers
 * @desc true or false if region effects appear for follower steps.
 * @default true
 *
 * @help
 *   Galv's Map Animation Effects     
 * ----------------------------------------------------------------------------
 * NOTE: This is not a simple 'plug and play' plugin. Not recommended for
 *       those that are looking for such.
 * If using with a Diagonal Movement plugin, place this one BELOW in the
 * plugin list.
 * ----------------------------------------------------------------------------
 * This plugin adds a few things to do with map effects using animations.
 *
 * 1. Animation settings
 *    Set individual animations to play at certain locations (including x,y or
 *    at a target's position) and not follow the target's movement as the
 *    animation plays. Also enables you to change their z value to appear over
 *    or under map objects and characters.
 *    These effects are done using a tag in the animation name (in database).
 *
 * 2. Region animation effects
 *    Set up regions to play an animation and/or a common even when the player
 *    stands on them. Global plugin settings allow you to set up regions that
 *    will work on all maps and map notetags for effects you only want on a
 *    particular map. With the above animation settings, this can be used to
 *    create effects like stepping in water. Create these in the animation
 *    editor.
 *
 * 3. Event's work too
 *    You can choose if each region effect animation will also play when an
 *    event stands on it. You can also choose if you want each region effect
 *    to run only on events with a certain note tag OR run on all events
 *    except for those with a certain notetag.
 *
 * ADVISORY: As this is using animations to play effects, I don't advise using
 * this heavily. I have tested using many events on my high performance PC and
 * there was little noticable issue, but I can imagine if you are planning to
 * release to mobile devices and the like - this might not be a good idea.
 *
 * ----------------------------------------------------------------------------
 *   GLOBAL REGION SETUP
 * ----------------------------------------------------------------------------
 * The "Region Effects" setting allows you to specify certain regions and an
 * animation that plays on the character (player or event) that steps on those
 * regions. The layout of these settings are as follows:
 *
 *    rId,aId,key,ceId | rId,aId,key,ceId | rId,aId,key,ceId
 *
 * Each region data is separated by pipes (|) and the data inside is separated
 * by commas.
 *
 * Region Data Explaination:
 * rId  = Region Id - the region number the effect takes place when stepped on
 * aId  = Animation Id - the animation number you want to play from database
 *                     - Make this 0 to not play an animation
 * key  = Restrict key - used to restrict the region to certain things:
 *                  a         - affects all
 *                  p         - the player only
 *                  e         - events only
 *                  a+Word    - player and events with <w:Word> in its note
 *                  a-Word    - player and events without <w:Word> in its note
 *                  e+Word    - only events with <w:Word> tag in its note
 *                  e-Word    - only events without <w:Word> tag in its note
 * ceId = Common event Id - a common event that runs when PLAYER stands on the
 *                          region. Events do not trigger the common event. Do
 *                          not include this or make it 0 to not call event.
 *
 * EXAMPLE:
 * 7,10,a-fly | 2,9,e+fly | 5,11,p,5
 * The above setup contains 3 region effects.
 * - region 7, plays animation 10 for ALL except events with <fly> note
 * - region 2, plays animation 9 for only events with <fly> note
 * - region 5, plays animation 11 and common event 5 only for player 
 *
 * ----------------------------------------------------------------------------
 *   MAP REGION SETUP
 * ----------------------------------------------------------------------------
 * In addition to the global regions, you can use the same settings above in
 * each map's "Notes" box. To do this, use the below layout:
 *
 *   <mEffects: rId,aId,key,ceId | rId,aId,key,ceId | rId,aId,key,ceId>
 *
 * These settings will only apply to the map they are used in and will take
 * priority over the global settings.
 *
 * ----------------------------------------------------------------------------
 *   ANIMATION NAMES
 * ----------------------------------------------------------------------------
 * Settings for animations can be added using a tag in each Animation's name in
 * the database. The tag and settings are below:
 *
 *   <z,x,y>     // The tag used to specify z, x and y values of an animation
 *               // z - default animations are 8 (above all)
 *               // x,y - the x,y position the animation will play at. 
 *               //       Leave these out to follow the target as normal.
 *               //       x,y can be:
 *               //                   X, Y numbers indicating map position
 *               //                   vID, vID  to use variables
 *
 * EXAMPLES
 * <1>           // animation plays normally at z value of 1
 * <2,feet>      // animation plays at z value 2 at the target's feet and
 *               // continues to play at that location, not following target.
 * <4,20,15>     // animation plays at z value 4 at x20 y15.
 * <3,v1,v2>     // animation plays at z value 3 and at x,y postion stored in
 *               // variables 1 and 2 respectively.
 *
 * Note: You can still name your animations and use the tag in them. eg:
 * Fire 2<2,feet>
 * ----------------------------------------------------------------------------
 * Again, use this sparingly and test a lot if you plan to release you game 
 * to slower devices such as cellphones.
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {
	
Galv.MAE.globalSettingTxt = PluginManager.parameters('Galv_MapAnimEffects')["Region Effects"];
Galv.MAE.followers = PluginManager.parameters('Galv_MapAnimEffects')["Followers"] === "true" ? true : false;

Galv.MAE.eRegions = {  // GLOBAL regions for EVENTS
	allow: [],         // Regions set to trigger region effect
	allowWords: {},    // keywords for event names that CAN trigger. region: ['word','word'],  
	denyWords: {},     // keywords for event names that CANNOT trigger. region: ['word','word'],
	trigger: {}        //  region: triggerType,  is 0 or 1. 0 = none except, 1 all excluding, 3 is player only
};


Galv.MAE.pRegions = {  // GLOBAL regions for PLAYER
	allow: [],         // Regions set to trigger region effect
	cEvents: {}        // regionId: cEvent Id
};	
	
Galv.MAE.regionAnims = {};
	

Galv.MAE.setRegions = function(obj,txt) {  // Setup Global Region restrictions
	var arr = txt.split("|");

	for (var i = 0; i < arr.length; i++) {
		var a = arr[i].split(",");
		var region = Number(a[0]);
		var anim = Number(a[1]);
		var set = a[2];
		
		// Set animation id to region id
		obj.regionAnims[region] = anim;
		obj.eRegions.allowWords[region] = obj.eRegions.allowWords[region] || [];
		obj.eRegions.denyWords[region] = obj.eRegions.denyWords[region] || [];
		obj.eRegions.trigger[region] = 4;  // 4 + is dont check keywords
		
		switch (set[0]) {
			case 'p':  // player
				obj.pRegions.allow.push(region);
				obj.eRegions.trigger[region] = 3;   // set event region trigger to 3 for player only
				if (a[3]) obj.pRegions.cEvents[region] = Number(a[3]);
				break;
			case 'a':  // all
				obj.pRegions.allow.push(region);  // No break here to continue below
				if (a[3]) obj.pRegions.cEvents[region] = Number(a[3]);
			case 'e':  // only events
				if (set[1] === "+") {
					// None except if have allow word
					obj.eRegions.trigger[region] = 2;
					var word = set.replace(" ","").substring(2);
					
					obj.eRegions.allowWords[region].push(word);
				} else if (set[1] === "-"){
					// Succes for all unless DENY WORD
					obj.eRegions.trigger[region] = 1;
					var word = set.replace(" ","").substring(2);
					obj.eRegions.denyWords[region].push(word);
				} else {
					// Add to normal allowance array.
					obj.eRegions.allow.push(region);
				};
				break;
		};
	};
};

Galv.MAE.setRegions(Galv.MAE,Galv.MAE.globalSettingTxt);  // Set global map anim settings


Galv.MAE.num = function(txt) {
	if (txt[0] === "v") {
		var varId = Number(txt.replace("v",""));
		return $gameVariables.value(varId);
	} else {
		return Number(txt);
	};
};

//-----------------------------------------------------------------------------
//   ANIMATION CHANGES
//-----------------------------------------------------------------------------

// Change animation based on settings
var Galv_Sprite_Animation_loadBitmaps = Sprite_Animation.prototype.loadBitmaps;
Sprite_Animation.prototype.loadBitmaps = function() {
	var settings = this._animation.name.match(/<(.*)>/);
	this.stationary = false;
	if (settings) {
		// Do settings
		this.updatePosition();
		settings = settings[1].split(",");
		this.z = Galv.MAE.num(settings[0]);
		if (settings[1]) {
			this.stationary = true;
			if (settings[1].toLowerCase() !== "feet") {
				this.x = Galv.MAE.num(settings[1]) * $gameMap.tileWidth();
				this.y = Galv.MAE.num(settings[2]) * $gameMap.tileHeight();
				this._ex = this.x;
				this._ey = this.y;
			} else {
				this.x = this._target.x;
				this.y = this._target.y - this._target.height / 2;
				this._ex = this.x + $gameMap.displayX() * $gameMap.tileWidth();
				this._ey = this.y + $gameMap.displayY() * $gameMap.tileHeight();
			};
		};
	} else {
		// normalize
		this.z = 8;	
		this.stationary = false;
	};
	Galv_Sprite_Animation_loadBitmaps.call(this);
};

var Galv_Sprite_Animation_updatePosition = Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function() {
	if (this.stationary) {
		this.x = this._ex - $gameMap.displayX() * $gameMap.tileWidth();
    	this.y = this._ey - $gameMap.displayY() * $gameMap.tileHeight();
		return;
	};
	Galv_Sprite_Animation_updatePosition.call(this);
};



//-----------------------------------------------------------------------------
//  REGION STEPPING - CHARACTERS
//-----------------------------------------------------------------------------

// GAME MAP

var Galv_Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	Galv_Game_Map_setup.call(this,mapId);
	this.animMapData = {}
	// Reset Map anim data for new map
	this.animMapData.eRegions = {  // MAP regions for EVENTS
		allow: [],         // Regions set to trigger region effect
		allowWords: {},    // keywords for event names that CAN trigger. region: ['word','word'],  
		denyWords: {},     // keywords for event names that CANNOT trigger. region: ['word','word'],
		trigger: {}        //  region: triggerType,  is 0 or 1. 0 = none except, 1 all excluding
	};
	this.animMapData.pRegions = {  // GLOBAL regions for PLAYER
		allow: [],         // Regions set to trigger region effect
		cEvents: {}        // regionId: cEvent Id
	};	
	this.animMapData.regionAnims = {};

	var txt = $dataMap.note.match(/<mEffects:(.*)>/);
	if (txt) Galv.MAE.setRegions(this.animMapData,txt[1]);  // Set global map anim settings

};



/* FOR FOLLOWERS BUT CAUSES PLAYER TO JITTER AT TIMES */
if (Galv.MAE.followers) {
	var Game_Follower_updateStop = Game_Follower.prototype.updateStop;
	Game_Follower.prototype.updateStop = function() {
		Game_Follower_updateStop.call(this);
		
		if (this.prepMapEffect) {
			if (this._characterName != "") this.updateNonmovingEffect();
		};
	};
};




// CHARACTER BASE
var Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function(d) {
    Game_CharacterBase_moveStraight.call(this,d);
	if (this.isMovementSucceeded()) this.prepMapEffect = true;
};

var Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
Game_CharacterBase.prototype.moveDiagonally = function(horz,vert) {
    Game_CharacterBase_moveDiagonally.call(this,horz,vert);
	if (this.isMovementSucceeded()) this.prepMapEffect = true;
};


var Game_CharacterBase_updateNonmovingEffect = Game_CharacterBase.prototype.updateNonmovingEffect;
Game_CharacterBase.prototype.updateNonmovingEffect = function() {
	this.prepMapEffect = false;
	this.doMapEffect();
};

Game_CharacterBase.prototype.doMapEffect = function() {
	// Check if region is allowed to be triggered
	var success = false;
	var rId = this.regionId();
	
	if ($gameMap.animMapData.eRegions.trigger[rId]) {
		var obj = $gameMap.animMapData;
	} else {
		var obj = Galv.MAE;
	};
	
	var trigger = obj.eRegions.trigger[rId];
	var allow = obj.eRegions.allow;
	var denyWords = obj.eRegions.denyWords[rId];
	var allowWords = obj.eRegions.allowWords[rId];

	if (trigger === 1) {
		 // if trigger is 1 - all except events with deny word (THIS WORKS)
		success = !denyWords.contains(this.mapEffectWord);
	} else if (trigger === 2) { 
		// if trigger region is 0 - none except events with allow word 
		success = allowWords.contains(this.mapEffectWord);
	} else if (trigger === 3) { 
		// If trigger is 3, it's player only. This ie event, so false.
		success = false; 
	} else {
		 // if 4 +
		success = true;
	};

	// Trigger Effect
	if (success) this.mapTriggerEffect(obj,rId);
};

Game_CharacterBase.prototype.mapTriggerEffect = function(obj,rId) {
	this._animationId = obj.regionAnims[rId];
};


// EVENT
var Galv_Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    Galv_Game_Event_initialize.call(this,mapId,eventId);
	// SETUP Allow and Deny words
	var word = $dataMap.events[eventId].note.match(/<(.*)>/i)
	this.mapEffectWord = word ? word[1].replace(" ","") : "";
};

var Game_Event_updateStop = Game_Event.prototype.updateStop;
Game_Event.prototype.updateStop = function() {
	if (this.prepMapEffect) {
        this.updateNonmovingEffect();
    };	
    Game_Event_updateStop.call(this);
};


// PLAYER
var Game_Player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
	Game_Player_update.call(this,sceneActive);

	if (this.prepMapEffect && !this.isMoving()) {
		this.updateNonmovingEffect();
	};
};

Game_Player.prototype.doMapEffect = function() {
	var rId = this.regionId();
	
	if ($gameMap.animMapData.pRegions.allow.contains(rId)) {
		var obj = $gameMap.animMapData;
	} else {
		var obj = Galv.MAE;
	};

	if(obj.pRegions.allow.contains(rId)) {
		this.mapTriggerEffect(obj,rId);
	};
};

Game_Player.prototype.mapTriggerEffect = function(obj,rId) {
	Game_CharacterBase.prototype.mapTriggerEffect.call(this,obj,rId);
	// Player only stuff here like common event calling
	if (obj.pRegions.cEvents[rId]) {
		$gameTemp.reserveCommonEvent(obj.pRegions.cEvents[rId]);
	};
};
})();