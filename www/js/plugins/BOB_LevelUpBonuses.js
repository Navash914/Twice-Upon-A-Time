//=============================================================================
// Bobstah Plugins
// BOB_LevelUpBonuses.js
// Version: 1.0.5
//=============================================================================
var Imported = Imported || {};
Imported.BOB_LevelUpBonuses = true;

var Bobstah = Bobstah || {};
Bobstah.LevelUpBonuses = Bobstah.LevelUpBonuses || {};

//=============================================================================
 /*:
 * @plugindesc Allows items, skills, states, gold, and stat bonuses
 * upon level up.
 * @author Bobstah
 *
 * ============================================================================
 * Params
 * ============================================================================
 * @param Max Level
 * @desc Change to the maximum level you are using in your game.
 * @default 99
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * Allows bonuses to be rewarded to actors upon leveling up based on
 * the following critera:
 * State applied to Actor, Actor is Class, Weapon/Armor is equipped,
 * Actor themselves
 *
 * You set the level up bonuses on the state, weapon, armor, class, or
 * actor that rewards them.
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 * This plugin was tested with all available Pre-order bonus plugins.
 *
 * ============================================================================
 * Unique Items (Yanfly's Item Core)
 * ============================================================================
 * If you're using a unique item plugin, you may experience some undesirable
 * results. Removing a weapon or armor from the party's inventory will
 * probably not work. However, if you want to replace current equipment with
 * new equipment, I've provided a workaround. Scroll down to Neat Examples
 * for more information.
 *
 * ============================================================================
 * Recommended Usage
 * ============================================================================
 * Read the Notetags, Level Options, and ID Options sectionds below.
 * This is a very powerful plugin, and you should be careful with
 * the options you set.
 *
 * That being said, granting bonuses at the Actor level should only
 * be done in rare cases. Ideally, bonuses you would want an actor
 * to gain should be set with either the Class, or the Actor's Traits.
 * In some cases, adding a bonus to an actor at a specific level is
 * justified, though.
 *
 * Remember, there is no wrong way to use RPG Maker!
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 * Actor/Class/Weapon/Armor/State
 *   <LevelUp Bonus>
 *   Level: State:+/-id, Item:+/-idXquantity, etc
 *   Level: State:+/-id
 *   Level: Item:+/-idXquantity
 *   Level: Weapon:+/-idXquantity
 *   Level: Armor:+/-idXquantity
 *   Level: Gold:+/-amount
 *   Level: atk:+5, def:-5, etc. Valid stat boosts are:
 *          mhp,mmp,atk,def,mat,mdf,agi,luk
 *          hit,eva,cri,cev,mev,mrf,cnt,hrg,mrg,trg
 *          tgr,grd,rec,pha,mcr,tcr,pdr,mdr,fdr,exr
 *   </LevelUp Bonuses>
 *
 * ============================================================================
 * Level Options
 * ============================================================================
 * You can set level to be either a number or one of the following
 * special patterns:
 *  0 - Bonus will be rewarded upon leveling up for the first time
 *      with the weapon/armor equipped, state applied, or being
 *      the class the bonus is attached to.
 * +X - Grant this bonus every X level, starting at level 1 + x.
 * -X - Grant this bonus every X level, starting at level 0 + x.
 * *X - Grant this bonus after an actor levels up X times while
 *      the bonus source (weapon, class, etc) is active.
 *
 * ============================================================================
 * ID Options
 * ============================================================================
 * You can set ID to be the ID of the bonus you want to reward. In
 * the below example, we're applying the default 'Knockout' state:
 * state: 1
 *
 * If you want a bonus to only apply while the source (a class, 
 * state, weapon, or armor) is active on the actor, append your
 * id with !, like so:
 * state: 1!
 *
 * If you're giving an item, weapon, or armor, you can provide
 * a quantity by adding Xquantity to the end of your id. In the
 * below example, pretend we are adding this bonus to the
 * 'Poisoned' state. We will reward the actor with 2 of the
 * default dispel herb items (id:3) upon level up, but only
 * if the actor is poisoned:
 * item:3!x2
 *
 * Alternatively, use the following setting to execute javascript:
 *
 * $(codeHere;)
 *
 * The code is executed when the actor learns the bonus. A 
 * recurring bonus will be executed every applicable time.
 * Whatever code is executed will need to return the following based
 * on the bonus type:
 *
 * state: $(codeHere;) - Needs to return a state ID.
 * skill: $(codeHere;) - Needs to return a skill ID.
 * atk: $(codeHere;) - Needs to return a number to add to the stat.
 *                     (This can be used with any stat bonus)
 * gold: $(codeHere;) - Needs to return a number to add to the
 *                      party's gold.
 * item: $(codeHere;) - Needs to return an item ID.
 * weapon: $(codeHere;) - Needs to return a weapon ID.
 * armor: $(codeHere;) - Needs to return an armor ID.
 *
 * The exclusivity (!) and quantity (x) rules apply to eval as well.
 * If you are evaling for an item ID, you would use quantity like so:
 * item:$(codeHere;)x5
 *
 * If you want a stat gain you are evaling to only be applied
 * while the source is active, you would do this:
 * mhp: $(codeHere;)!
 *
 * Finally, let's combine the two:
 * item: $(codeHere)!x5
 *
 * ============================================================================
 * Eval Options
 * ============================================================================
 * The following variables are available during eval:
 * a = Current Actor
 * b = Current Bonus Object (createLevelUpBonusObject for info)
 * c = Item that triggered the bonus. State/Weapon/Armor/Class/Actor
 * v = $gameVariables. Use $gameVariables.value(id) or .setValue(id)
 * s = $gameSwitches. Use $gameSwitches.value(id) or .setValue(id)
 *
 * The following functions are also provided during eval:
 * replaceWeapon(actor, oldWeaponId, newWeaponId) - Returns oldWeaponId
				See the examples section for usage.
 * replaceArmor(actor, oldWeaponId, newWeaponId) - Returns oldArmorId
 *				See the examples section for usage.
 *
 * ============================================================================
 * Examples
 * ============================================================================
 * At level 3, learn a skill:
 * 3: skill: 5
 *
 * Lose 5 gold (or any stat) every level, starting at level 2:
 * +1: gold:-5
 *
 * After wearing a Sword for 5 levels, gain 5 atk, but only while
 * the sword is equipped:
 * *5: atk:5!
 *
 * ============================================================================
 * Neat Examples
 * ============================================================================
 * Replace current weapon with the default Axe (ID:2) after the current
 * weapon has been equipped for 4 levels:
 * *4: weapon:-$(replaceWeapon(a,c.id,2);)
 *
 * Replace current armor with another one (ID:10) after the current armor
 * has been equipped for 10 levels:
 * *10: weapon:-$(replaceArmor(a,c.id,10);)
 *
 * Every level, reward the actor's level in gold to them:
 * +1: gold:$(a._level;)
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Bobstah.Parameters = PluginManager.parameters('BOB_LevelUpBonuses');
Bobstah.Param = Bobstah.Param || {};

Bobstah.Param.LevelUpBonus_MaxLevel = Number(Bobstah.Parameters['Max Level']);

Bobstah.LevelUpBonuses.paramRef = ['mhp','mmp','atk','def','mat','mdf','agi','luk'];
Bobstah.LevelUpBonuses.xparamRef = ['hit','eva','cri','cev','mev','mrf','cnt','hrg','mrg','trg'];
Bobstah.LevelUpBonuses.sparamRef = ['tgr','grd','rec','pha','mcr','tcr','pdr','mdr','fdr','exr'];

//=============================================================================
/* Check for supported unique item plugins
 * To add a different plugin, have that plugin set
 * Bobstah.LevelUpBonuses.IDs.(Item, Weapon, Armor, State) to a property name belonging
 * to the object in question.
 * 
 * Supported Unique Types:
 * Weapon, Armor, Item, State
 */
//=============================================================================
Bobstah.LevelUpBonuses.IDs = {};
Bobstah.LevelUpBonuses.IDs.item = 'id';
Bobstah.LevelUpBonuses.IDs.weapon = 'id';
Bobstah.LevelUpBonuses.IDs.armor = 'id';
Bobstah.LevelUpBonuses.IDs.state = 'id';
if (Imported.YEP_ItemCore) {
	Bobstah.LevelUpBonuses.IDs.item = 'baseItemId';
	Bobstah.LevelUpBonuses.IDs.weapon = 'baseItemId';
	Bobstah.LevelUpBonuses.IDs.armor = 'baseItemId';
}

Bobstah.LevelUpBonuses.getId = function(input, objType)
{
	if (typeof(Bobstah.LevelUpBonuses.IDs[objType]) === "undefined") { return null;}
	var strId = Bobstah.LevelUpBonuses.IDs[objType];
	if (typeof(input) === "number") {
		if (input === 0) { return 0; }
		return Bobstah.LevelUpBonuses.parseGetId(input, objType, strId);
	} else {
		return input[strId];
	}
};

Bobstah.LevelUpBonuses.parseGetId = function(input, objType, strId) {
	switch (objType) {
		case "state":
			return $dataStates[input][strId] || $dataStates[input].id;
		break;
		
		case "weapon":
			return $dataWeapons[input][strId] || $dataWeapons[input].id;
		break;
		
		case "armor":
			return $dataArmors[input][strId] || $dataArmors[input].id;
		break;
		
		case "item":
			return $dataItems[input][strId] || $dataItems[input].id;
		break;
		
		default:
			return null;
		break;
	}
};

Bobstah.LevelUpBonuses.createBonusObject = function(learned, srcId, srcType, level, base) {
	return {'Learned': learned, 'srcId': srcId, 'srcType': srcType, 'level': level, 'base':base};
};

Bobstah.LevelUpBonuses.createLevelUpBonusObject = function(value, addRem, exclusive, evl, quantity, levelTimes, base) {
	base = base || false;
	return {
		'value': value,			//Value of the bonus.
		'addRem': addRem, 		//If we are adding or removing the value.
		'exclusive': exclusive, //If the bonus is exclusive to the source being 'active' (i.e. weapon equipped).
		'eval': evl, 			//If we are evaling value or not.
		'learnedBy': [], 		//Actors that have learned this bonus.
		'quantity': quantity, 	//The quantity to reward of the bonus (valid: item, weapon, armor).
		'base': base,			//If this bonus is from the database or not. Used for future plugin expansion.
		'levelTimes': levelTimes,//The number of levels this item has to be equipped to learn the bonus. 
		'learnCount': {}		//The learn counter for each actor for levelTimes.
	};
};

Bobstah.LevelUpBonuses.createLevelUpBonusStatObject = function(value, addRem, exclusive, evl, levelTimes, base, paramType, paramId) {
	base = base || false;
	return {
		'value': value,			//Value of the bonus.
		'addRem': addRem, 		//If we are adding or removing the value.
		'exclusive': exclusive, //If the bonus is exclusive to the source being 'active' (i.e. weapon equipped).
		'eval': evl, 			//If we are evaling value or not.
		'learnedBy': [], 		//Actors that have learned this bonus.
		'base': base,			//If this bonus is from the database or not. Used for future plugin expansion.
		'paramType': paramType,	//The type of param (param, xparam, sparam).
		'paramId': paramId,		//The ID of the param (1,2,3,4,etc)
		'levelTimes': levelTimes,//The number of levels this item has to be equipped to learn the bonus. 
		'learnCount': {}		//The learn counter for each actor for levelTimes.
	};
};

Bobstah.LevelUpBonuses.getValue = function(objContext, srcObj, bonus) {
	if (bonus['eval'] === true) {
		var a = objContext;
		var c = bonus || null;
		var b = srcObj || null;
		var s = $gameSwitches;
		var v = $gameVariables;
		var res = eval(bonus.value);
		return res;
	} else {
		return bonus.value;
	}
};

Bobstah.LevelUpBonuses.evalReplace = function(actor, oldId, newId, eId, equip, dataList) {
	if (equip.id === oldId) {
		var newItem = $gameParty.gainItem(dataList[newId], 1) || false;
		if (newItem !== false) {
			var addedItemId = newItem[0].id || newItem.id || 0;
			actor.changeEquip(eId, dataList[addedItemId]);
		} else {
			actor.changeEquip(eId, dataList[newId]);
		}
		return oldId;
	}
	return 0;
};

//=============================================================================
// Supporting functions for eval
//=============================================================================
function replaceWeapon(actor, oldWeaponId, newWeaponId) {
	var equips = actor.equips();
	for (var eId = 0; eId < equips.length; eId++) {
		var equip = equips[eId];
		if (equip === null) { continue; }
		if (equip.etypeId === 1) {
			return Bobstah.LevelUpBonuses.evalReplace(actor, oldWeaponId, newWeaponId, eId, equip, $dataWeapons);
		}
	}
	return 0;
}

function replaceArmor(actor, oldArmorId, newArmorId) {
	var equips = actor.equips();
	for (var eId = 0; eId < equips.length; eId++) {
		var equip = equips[eId];
		if (equip === null) { continue; }
		if (equip.etypeId !== 1) {
			return Bobstah.LevelUpBonuses.evalReplace(actor, oldArmorId, newArmorId, eId, equip, $dataArmors);
		}
	}
	return 0;
}

function getId(input, objType) {
	return Bobstah.LevelUpBonuses.getId(input, objType);
}
//=============================================================================
// DataManager
//=============================================================================
Bobstah.LevelUpBonuses.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Bobstah.LevelUpBonuses.DataManager_isDatabaseLoaded.call(this)) return false;
	DataManager.processBobstahLevelUpBonusNotes($dataActors);
    DataManager.processBobstahLevelUpBonusNotes($dataClasses);
	DataManager.processBobstahLevelUpBonusNotes($dataWeapons);
	DataManager.processBobstahLevelUpBonusNotes($dataArmors);
	DataManager.processBobstahLevelUpBonusNotes($dataStates);
	
	return true;
};

DataManager.processBobstahLevelUpBonusNotes = function(group) {
	var lubregex = /<LevelUp Bonus>[\s]+([\s\S]*?)[\s]+<\/LevelUp Bonus>/i;
	var lstregex = /([+|\-|*]?[\d]+):[\s]*(\S*)/ig;
	var bonregex = /([A-z]+):[\s]*(([+-]?)\$\((.+)\)|([+-])?([\d]+))x*(\d+!?|!?)/ig;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];

		obj.levelUpBonus = {};
		var notedata = obj.note.match(lubregex);
		if (notedata === null) { continue; }
		while (bonuslist = lstregex.exec(notedata[1])) {
			var strLevel = bonuslist[1];
			var levels = null;
			var levelTimes = 0;
			if (strLevel.match(/[+](\d+)/)) {
				levels = [];
				levelGain = Number(RegExp.$1);
				for (var l = 1; l <= Bobstah.Param.LevelUpBonus_MaxLevel; l+=levelGain) {
					levels.push(l);
				}
			} else if (strLevel.match(/[-](\d+)/)){
				levels = [];
				levelGain = Number(RegExp.$1);
				for (var l = 0; l <= Bobstah.Param.LevelUpBonus_MaxLevel; l+=levelGain) {
					levels.push(l);
				}
			} else if (strLevel.match(/[*](\d+)/)) {
				levels = [0];
				levelTimes = Number(RegExp.$1);
			} else {
				levels = [strLevel];
			}
			for (var lIndex = 0; lIndex < levels.length; lIndex++) {
				var level = levels[lIndex];
				obj.levelUpBonus[level] = obj.levelUpBonus[level] || {};
				while (bonuses = bonregex.exec(bonuslist[2])) {
					var param = bonuses[1].toLowerCase();
					if (bonuses[2].indexOf("$") > -1) {
						var addRem = bonuses[3] || "+";
						var bonus = bonuses[4];
						var evl = true;
					} else {
						var addRem = bonuses[5] || "+";
						var bonus = bonuses[6];
						var evl = false;;
					}
					var exc = (bonuses[7] === '!' ? true : false);
					var qty = bonuses[8] || 1;
					switch (param) {
						case "state":
							obj.levelUpBonus[level].States = obj.levelUpBonus[level].States || [];
							obj.levelUpBonus[level].States.push(Bobstah.LevelUpBonuses.createLevelUpBonusObject(bonus, addRem, exc, evl, qty, levelTimes, true));
						break;
						
						case "skill":
							obj.levelUpBonus[level].Skills = obj.levelUpBonus[level].Skills || [];
							obj.levelUpBonus[level].Skills.push(Bobstah.LevelUpBonuses.createLevelUpBonusObject(bonus, addRem, exc, evl, qty, levelTimes, true));
						break;
						
						case "item":
							obj.levelUpBonus[level].Items = obj.levelUpBonus[level].Items || [];
							obj.levelUpBonus[level].Items.push(Bobstah.LevelUpBonuses.createLevelUpBonusObject(bonus, addRem, exc, evl, qty, levelTimes, true));
						break;
						
						case "weapon":
							obj.levelUpBonus[level].Weapons = obj.levelUpBonus[level].Weapons || [];
							obj.levelUpBonus[level].Weapons.push(Bobstah.LevelUpBonuses.createLevelUpBonusObject(bonus, addRem, exc, evl, qty, levelTimes, true));
						break;
						
						case "armor":
							obj.levelUpBonus[level].Armors = obj.levelUpBonus[level].Armors || [];
							obj.levelUpBonus[level].Armors.push(Bobstah.LevelUpBonuses.createLevelUpBonusObject(bonus, addRem, exc, evl, qty, levelTimes, true));
						break;
						
						case "gold":
							obj.levelUpBonus[level].Golds = obj.levelUpBonus[level].Golds || [];
							obj.levelUpBonus[level].Golds.push(Bobstah.LevelUpBonuses.createLevelUpBonusObject(bonus, addRem, exc, evl, qty, levelTimes, true));
						break;
						
						//Stat processing
						default:
							var prm = Bobstah.LevelUpBonuses.paramRef.indexOf(param);
							var xprm = Bobstah.LevelUpBonuses.xparamRef.indexOf(param);
							var sprm = Bobstah.LevelUpBonuses.sparamRef.indexOf(param);
							if (prm != -1) {
								obj.levelUpBonus[level].Stats = obj.levelUpBonus[level].Stats || {};
								obj.levelUpBonus[level].Stats[param] = Bobstah.LevelUpBonuses.createLevelUpBonusStatObject(bonus, addRem, exc, evl, levelTimes, true, 'param', prm);
							} else if (xprm != -1) {
								obj.levelUpBonus[level].Stats = obj.levelUpBonus[level].Stats || {};
								obj.levelUpBonus[level].Stats[param] = Bobstah.LevelUpBonuses.createLevelUpBonusStatObject(Number(bonus*0.01), addRem, exc, evl, levelTimes, true, 'xparam', xprm);
							} else if (sprm >= -1) {
								obj.levelUpBonus[level].Stats = obj.levelUpBonus[level].Stats || {};
								obj.levelUpBonus[level].Stats[param] = Bobstah.LevelUpBonuses.createLevelUpBonusStatObject(Number(bonus*0.01), addRem, exc, evl, levelTimes, true, 'sparam', sprm);
							}
						break;
					}
				}
			}
		}
	}
};
//=============================================================================
// Game_BattlerBase
//=============================================================================
Bobstah.LevelUpBonuses.GameBattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
	var res = Bobstah.LevelUpBonuses.GameBattlerBase_addNewState .call(this, stateId);
	
	if (!this.isActor()) { return res; }
	var state = $dataStates[stateId];
	//States
	this.validateLevelUpBonuses(this.bonusLearned.States, 'state', 'state', state);
	
	//Skills
	this.validateLevelUpBonuses(this.bonusLearned.Skills, 'skill', 'state', state);
	
	//Stats
	this.validateLevelUpBonuses(this.bonusLearned.Stats, 'stat', 'state', state);
	
	return res;
};

//=============================================================================
// Game_Battler
//=============================================================================
Bobstah.LevelUpBonuses.GameBattler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
	var res = Bobstah.LevelUpBonuses.GameBattler_removeState.call(this, stateId);
	
	if (!this.isActor()) { return res; }
	var state = $dataStates[stateId];
	//States
	this.validateLevelUpBonuses(this.bonusLearned.States, 'state', 'state', null, state);

	
	//Skills
	this.validateLevelUpBonuses(this.bonusLearned.Skills, 'skill', 'state', null, state);
	
	//Stats
	this.validateLevelUpBonuses(this.bonusLearned.Stats, 'stat', 'state', null, state);
};

//=============================================================================
// Game_Actor
//=============================================================================
Bobstah.LevelUpBonuses.GameActor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	Bobstah.LevelUpBonuses.GameActor_setup.call(this, actorId);
	
	//Load Initial Bonuses
	this.levelUpBonus = $dataActors[actorId].levelUpBonus;
};

Bobstah.LevelUpBonuses.GameActor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
	Bobstah.LevelUpBonuses.GameActor_initMembers.call(this);
	this.levelUpBonusBusy = {'class': false, 'weapon':false, 'armor':false, 'state':false};
	this.bonusLearned = {
		States: {},
		Skills: {},
		Stats: {},
		Items: {},
		Weapons: {},
		Armors: {},
		Golds: {}
	};
};

Bobstah.LevelUpBonuses.GameActor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId) {
    var value = Bobstah.LevelUpBonuses.GameActor_paramPlus.call(this, paramId);
	var bonusType = 'param';
	value += this.addLevelUpBonusStats(paramId, bonusType);
	return value;
};

Bobstah.LevelUpBonuses.GameActor_xparam = Game_Actor.prototype.xparam;
Game_Actor.prototype.xparam = function(xparamId) {
    var value = Bobstah.LevelUpBonuses.GameActor_xparam.call(this, xparamId);
	var bonusType = 'xparam';
	value += this.addLevelUpBonusStats(xparamId, bonusType);
	return value;
};

Bobstah.LevelUpBonuses.GameActor_sparam = Game_Actor.prototype.sparam;
Game_Actor.prototype.sparam = function(sparamId) {
	var value = Bobstah.LevelUpBonuses.GameActor_sparam.call(this, sparamId);
	var bonusType = 'sparam';
	value += this.addLevelUpBonusStats(sparamId, bonusType);
	return value;
};

Game_Actor.prototype.addLevelUpBonusStats = function(paramId, bonusType) {
	var value = 0;
	if (typeof(this.bonusLearned.Stats) === "undefined") { return value; }
	for (statId in this.bonusLearned.Stats) {
		stat = this.bonusLearned.Stats[statId];
		if (stat.paramType != bonusType) { continue; }
		if (stat.paramId != paramId) { continue; }
		for (var bId = 0; bId < stat.bonuses.length; bId++) {
			var bonus = stat.bonuses[bId];
			if (bonus.Active === false) { continue; }
			value += Number(bonus.amount);
		}
	}
	return value;
};

Bobstah.LevelUpBonuses.GameActor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
	Bobstah.LevelUpBonuses.GameActor_levelUp.call(this);
	this.applyLevelUpBonuses();
	this.applyNewLevelUpBonuses();
};

Bobstah.LevelUpBonuses.GameActor_levelDown = Game_Actor.prototype.levelDown;
Game_Actor.prototype.levelDown = function() {
    Bobstah.LevelUpBonuses.GameActor_levelDown.call(this);
	this.applyLevelUpBonuses();
};

Game_Actor.prototype.applyLevelUpBonuses = function() {

	//Apply existing bonuses that the actor has learned.
	//This is required due to the actor leveling Down.
	
	//States
	var bonusList = this.bonusLearned.States;
	var bonusType = 'state';
	this.validateLevelUpBonuses(bonusList, bonusType);
	
	//Skills
	var bonusList = this.bonusLearned.Skills;
	var bonusType = 'skill';
	this.validateLevelUpBonuses(bonusList, bonusType);
	
	//Stats
	var bonusList = this.bonusLearned.Stats;
	var bonusType = 'stat';
	this.validateLevelUpBonuses(bonusList, bonusType);
};

Game_Actor.prototype.applyNewLevelUpBonuses = function() {
	
	//Learn new bonuses from each eligible object.
	
	//Learn from the current Actor
	this.levelUpBonuses(this, 'actor');
	
	//Learn from active Class
	if (this.levelUpBonusBusy['class'] == false) {
		var obj = $dataClasses[this._classId];
		this.levelUpBonuses(obj, 'class');
	}
		
	//Learn from equipped Weapons
	if (this.levelUpBonusBusy['weapon'] == false) {
		var weapons = this.weapons();
		if (weapons.length > 0) {
			for (var weaponIndex = 0; weaponIndex < weapons.length; weaponIndex++)
			{
				weapon = $dataWeapons[(weapons[weaponIndex].id)];
				this.levelUpBonuses(weapon, "weapon");
			}
		}
	}
		
	//Learn from equipped Armors
	if (this.levelUpBonusBusy['armor'] == false) {
		var armors = this.armors();
		if (armors.length > 0) {
			for (var armorIndex = 0; armorIndex < armors.length; armorIndex++)
			{
				armor = $dataArmors[(armors[armorIndex].id)];
				this.levelUpBonuses(armor, "armor");
			}
		}
	}
		
	//Learn from active States
	if (this.levelUpBonusBusy['state'] == false) {
		var states = this.states();
		if (states.length > 0) {
			for (var stateIndex = 0; stateIndex < states.length; stateIndex++)
			{
				state = $dataStates[(states[stateIndex].id)];
				this.levelUpBonuses(state, "state");
			}
		}
	}
	
};

Game_Actor.prototype.levelUpBonuses = function(obj, objType) {
	var bonuses = obj.levelUpBonus;
	if (Object.keys(bonuses).length == 0) { return false; }
	var bonusList = null;
	var level = null;
	//Begin checking level up bonuses.
	for (var level in bonuses) {
		level = Number(level);
		if (level !== this._level && level !== 0) { continue; }
		
		//States:
		if (typeof(bonuses[level].States) !== "undefined") {
			bonusList = this.bonusLearned.States;
			for (var objIndex = 0; objIndex < bonuses[level].States.length; objIndex++) {
				var state = bonuses[level].States[objIndex];
				if (!state.learnCount[this._actorId]) {
					state.learnCount[this._actorId] = 0;
				}
				state.learnCount[this._actorId]++;
				if (state.learnCount[this._actorId] >= state.levelTimes) {
					if (state.learnedBy.indexOf(this._actorId) === -1) {
						var objId = Bobstah.LevelUpBonuses.getValue(this, obj, bonuses[level].States[objIndex]);
						if (objId === false) { continue; }
						state.learnedBy.push(this._actorId);
						this.addBonusLearned(state, objId, obj, objType, bonusList, this.addNewState, this.removeState);
					}
				}
			}
		}
		
		//Skills:
		if (typeof(bonuses[level].Skills) !== "undefined") {
			bonusList = this.bonusLearned.Skills;
			for (var objIndex = 0; objIndex < bonuses[level].Skills.length; objIndex++) {
				var skill = bonuses[level].Skills[objIndex];
				if (!skill.learnCount[this._actorId]) {
					skill.learnCount[this._actorId] = 0;
				}
				skill.learnCount[this._actorId]++;
				if (skill.learnCount[this._actorId] >= skill.levelTimes) {
					if (skill.learnedBy.indexOf(this._actorId) === -1) {
						var objId = Bobstah.LevelUpBonuses.getValue(this, obj, bonuses[level].Skills[objIndex]);
						if (objId === false) { continue; }
						skill.learnedBy.push(this._actorId);
						this.addBonusLearned(skill, objId, obj, objType, bonusList, this.learnSkill, this.forgetSkill);
					}
				}
			}
		}
		
		//Stats:
		if (typeof(bonuses[level].Stats) !== "undefined") {
			bonusList = this.bonusLearned.Stats;
			for (objId in bonuses[level].Stats) {
				var stat = bonuses[level].Stats[objId];
				if (!stat.learnCount[this._actorId]) {
					stat.learnCount[this._actorId] = 0;
				}
				stat.learnCount[this._actorId]++;
				if (stat.learnCount[this._actorId] >= stat.levelTimes) {
					if (stat.learnedBy.indexOf(this._actorId) === -1) {
						stat.learnedBy.push(this._actorId);
						this.addBonusStatLearned(stat, objId, obj, objType);
					}
				}
			}
		}
		
		//Items:
		if (typeof(bonuses[level].Items) !== "undefined") {
			bonusList = this.bonusLearned.Items;
			for (var objIndex = 0; objIndex < bonuses[level].Items.length; objIndex++) {
				var item = bonuses[level].Items[objIndex];
				if (!item.learnCount[this._actorId]) {
					item.learnCount[this._actorId] = 0;
				}
				item.learnCount[this._actorId]++;
				if (item.learnCount[this._actorId] >= item.levelTimes) {
					if (item.learnedBy.indexOf(this._actorId) === -1) {
						var objId = Bobstah.LevelUpBonuses.getValue(this, obj, bonuses[level].Items[objIndex]);
						if (objId === false) { continue; }
						item.learnedBy.push(this._actorId);
						this.addPartyBonusLearned(item, objId, obj, objType, bonusList, $dataItems);
					}
				}
			}
		}
		
		//Weapons:
		if (typeof(bonuses[level].Weapons) !== "undefined") {
			bonusList = this.bonusLearned.Weapons;
			for (var objIndex = 0; objIndex < bonuses[level].Weapons.length; objIndex++) {
				var item = bonuses[level].Weapons[objIndex];
				if (!item.learnCount[this._actorId]) {
					item.learnCount[this._actorId] = 0;
				}
				item.learnCount[this._actorId]++;
				if (item.learnCount[this._actorId] >= item.levelTimes) {
					if (item.learnedBy.indexOf(this._actorId) === -1) {
						var objId = Bobstah.LevelUpBonuses.getValue(this, obj, bonuses[level].Weapons[objIndex]);
						if (objId === false) { continue; }
						item.learnedBy.push(this._actorId);
						this.addPartyBonusLearned(item, objId, obj, objType, bonusList, $dataWeapons);
					}
				}
			}
		}
		
		//Armors:
		if (typeof(bonuses[level].Armors) !== "undefined") {
			bonusList = this.bonusLearned.Armors;
			for (var objIndex = 0; objIndex < bonuses[level].Armors.length; objIndex++) {
				var item = bonuses[level].Armors[objIndex];
				if (!item.learnCount[this._actorId]) {
					item.learnCount[this._actorId] = 0;
				}
				item.learnCount[this._actorId]++;
				if (item.learnCount[this._actorId] >= item.levelTimes) {
					if (item.learnedBy.indexOf(this._actorId) === -1) {
						var objId = Bobstah.LevelUpBonuses.getValue(this, obj, bonuses[level].Armors[objIndex]);
						if (objId === false) { continue; }
						item.learnedBy.push(this._actorId);
						this.addPartyBonusLearned(item, objId, obj, objType, bonusList, $dataArmors);
					}
				}
			}
		}
		
		//Gold:
		if (typeof(bonuses[level].Golds) !== "undefined") {
			bonusList = this.bonusLearned.Golds;
			for (var objIndex = 0; objIndex < bonuses[level].Golds.length; objIndex++) {
				var gold = bonuses[level].Golds[objIndex];
				if (!gold.learnCount[this._actorId]) {
					gold.learnCount[this._actorId] = 0;
				}
				gold.learnCount[this._actorId]++;
				if (gold.learnCount[this._actorId] >= gold.levelTimes) {
					if (gold.learnedBy.indexOf(this._actorId) === -1) {
						var objId = Bobstah.LevelUpBonuses.getValue(this, obj, bonuses[level].Golds[objIndex]);
						gold.learnedBy.push(this._actorId);
						this.addPartyBonusLearned(gold, objId, obj, objType, bonusList, "gold");
					}
				}
			}
		}
	}
};

Game_Actor.prototype.removeLevelUpBonusStat = function(bonus) {
	bonus.Active = false;
};

Game_Actor.prototype.applyLevelUpBonusStat = function(bonus) {
	bonus.Active = true;
};

Game_Actor.prototype.addBonusLearned = function(bonus, bonusId, srcObj, srcType, bonusList, addFunc, remFunc) {
	var addRem = bonus.addRem;
	var level = this._level;
	var srcId = 0;
	if (bonus.base === true) {
		srcId = Bobstah.LevelUpBonuses.getId(srcObj, srcType);
	} else {
		srcId = bonus.srcId;
	}
	if (addRem == "+") {
		bonusList[bonusId] = Bobstah.LevelUpBonuses.createBonusObject(true, srcId, srcType, level, bonus.base);
		addFunc.call(this, bonusId);
	} else {
		bonusList[bonusId] = Bobstah.LevelUpBonuses.createBonusObject(false, srcId, srcType, level, bonus.base);
		remFunc.call(this, bonusId);
	}
};

Game_Actor.prototype.addPartyBonusLearned = function(bonus, bonusId, srcObj, srcType, bonusList, srcList) {
	var srcQty = bonus.quantity;
	var addRem = bonus.addRem;
	var level = this._level;
	var srcId = 0;
	if (bonus.base === true) {
		srcId = Bobstah.LevelUpBonuses.getId(srcObj, srcType);
	} else {
		srcId = bonus.srcId;
	}
	if (addRem == "+") {
		bonusList[bonusId] = Bobstah.LevelUpBonuses.createBonusObject(true, srcId, srcType, level, bonus.base);
		if (srcList === "gold") {
			$gameParty.gainGold(Number(bonusId));
		} else {
			$gameParty.gainItem(srcList[bonusId], srcQty, false);
		}
	} else {
		this.bonusLearned.Items[bonusId] = Bobstah.LevelUpBonuses.createBonusObject(false, srcId, srcType, level, bonus.base);
		if (srcList === "gold") {
			$gameParty.loseGold(Number(bonusId));
		} else {
			$gameParty.loseItem(srcList[bonusId], srcQty, true);
		}
		
	}
};

Game_Actor.prototype.addBonusStatLearned = function(stat, statType, srcObj, srcType) {
	var lvl = this._level;
	var srcId = 0;
	if (stat.base === true) {
		srcId = Bobstah.LevelUpBonuses.getId(srcObj, srcType);
	} else {
		srcId = stat.srcId;
	}
	this.bonusLearned.Stats[statType] = this.bonusLearned.Stats[statType] || {'paramType':stat.paramType, 'paramId': stat.paramId, 'bonuses':[]};
	var len = this.bonusLearned.Stats[statType].bonuses.push({'Learned': true, 'srcId': srcId, 'srcType': srcType, 'level': lvl, 'amount':0, 'Active': true, 'base':stat.base, 'exclusive':stat.exclusive, 'eval':stat.evl});
	len--;
	this.bonusLearned.Stats[statType].bonuses[len].amount = Number(stat.addRem+Bobstah.LevelUpBonuses.getValue(this, srcObj, stat));
};

Game_Actor.prototype.validateLevelUpBonuses = function(bonusList, bonusType, filterSrcType, filterObjAdd, filterObjRem) {
	var filterIdAdd = 0;
	var filterIdRem = 0;
	filterSrcType = filterSrcType || null;
	if (filterSrcType === null && (typeof(filterObjAdd) !== "undefined" || typeof(filterObjRem) !== "undefined")) { return false; }
	if (filterObjAdd !== null) {
		filterIdAdd = Bobstah.LevelUpBonuses.getId(filterObjAdd, filterSrcType);
	}
	if (filterObjRem !== null) {
		filterIdRem = Bobstah.LevelUpBonuses.getId(filterObjRem, filterSrcType);
	} 
	for (var bonusId in bonusList) {
		var bonus = bonusList[bonusId];
		if (typeof(bonus.srcType) !== "undefined") { 
			if (filterSrcType !== null && bonus.srcType !== filterSrcType) { continue; }
		} else if (typeof(bonus.bonuses) !== "undefined") {
			for (var bId = 0; bId < bonus.bonuses.length; bId++) {
				var statBonus = bonus.bonuses[bId];
				if (filterSrcType !== null && statBonus.srcType !== filterSrcType) { continue; }
				var res = this.processLevelUpBonusValidation(statBonus, filterSrcType, filterIdAdd, filterIdRem);
				if (res === false) {
					continue;
				} else if (res === "apply") {
					this.applyLevelUpBonus(statBonus, bId, bonusType);
				} else if (res === "remove") {
					this.removeLevelUpBonus(statBonus, bId, bonusType);
				}
			}
		} else {
			var res = this.processLevelUpBonusValidation(bonus, filterSrcType, filterIdAdd, filterIdRem);
			if (res === false) {
				continue;
			} else if (res === "apply") {
				this.applyLevelUpBonus(bonusList, bonusId, bonusType);
			} else if (res === "remove") {
				this.removeLevelUpBonus(bonusList, bonusId, bonusType);
			}
		}
	}
};
Game_Actor.prototype.processLevelUpBonusValidation = function(bonus, filterSrcType, filterIdAdd, filterIdRem) {
	if (this.levelUpBonusValid(bonus)) { 
		if (filterIdAdd !== 0) {
			if (bonus.srcId === filterIdAdd) {
				return "apply";
			} else {
				return false;
			}
		}
		return "apply";
	} else {
		if (filterIdRem !== 0) {
			if (bonus.srcId === filterIdRem) {
				return "remove";
			} else {
				return false;
			}
		}
		return "remove";
	}
	return false;
};


Game_Actor.prototype.levelUpBonusValid = function(bonus)
{
	if (bonus.Learned == false) { return false; }
	if (this._level < bonus.level) { return false; }
	if (typeof(bonus.learnCount) !== "undefined") {
		if (typeof(bonus.learnCount[this._actorId]) === "undefined") { return false; }
		if (bonus.learnCount[this._actorId] <= bonus.levelTimes)
		{
			return false;
		}
	}
	if (bonus.exclusive === false) { return true; }
	return this.validateLevelUpBonusBySource(bonus);
};

Game_Actor.prototype.validateLevelUpBonusBySource = function(bonus) {
	switch (bonus.srcType) {
		case "class":
			if (this._classId === bonus.srcId) { return true; }
		break;
		
		case "state":
			return this.levelUpBonusValidLoop(bonus, 'state', this.states());
		break;
		
		case "weapon":
			return this.levelUpBonusValidLoop(bonus, 'weapon', this.weapons());
		break;
		
		case "armor":
			return this.levelUpBonusValidLoop(bonus, 'armor', this.armors());
		break;
		
		default:
			return false;
		break;
	}
};

Game_Actor.prototype.levelUpBonusValidLoop = function(bonus, srcType, source)
{
	for (var i = 0; i < source.length; i++) {
		var obj = source[i];
		if (bonus.base === true) {
			var objId = Bobstah.LevelUpBonuses.getId(obj,srcType);
			if (objId === bonus.srcId) {
				return true;
			} else if (objId === Bobstah.LevelUpBonuses.getId(bonus.srcId, bonus.srcType)) {
				return true;
			}
		} else if (obj.id === bonus.srcId) {
			return true;
		}
	}
	return false;
};

Game_Actor.prototype.applyLevelUpBonus = function(objList, objId, objType) {
	switch(objType) {
		case "state":
			this.addNewState(objId);
		break;
		
		case "skill":
			this.learnSkill(objId);
		break;
		
		case "stat":
			this.applyLevelUpBonusStat(objList);
		break;
	}
};

Game_Actor.prototype.removeLevelUpBonus = function(objList, objId, objType) {
	switch(objType) {
		case "state":
			this.removeState(objId);
		break;
		
		case "skill":
			this.forgetSkill(objId);
		break;
		
		case "stat":
			this.removeLevelUpBonusStat(objList);
		break;
	}
};

Bobstah.LevelUpBonuses.GameActor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
	var objType = (this.equipSlots()[slotId] === 1 ? 'weapon' : 'armor');
	var oldItemId = this._equips[slotId]._itemId || 0;
	var oldItem = null;
	if (oldItemId !== 0) {
		if (objType === 'weapon') {
			oldItem = $dataWeapons[oldItemId];
		} else {
			oldItem = $dataArmors[oldItemId];
		}
	}
	item = item || {'id': 0};
	this.levelUpBonusBusy[objType] = true;
	var res = Bobstah.LevelUpBonuses.GameActor_changeEquip.call(this, slotId, item);
	this.checkEquipLevelUpBonus(slotId, item, objType, oldItem);
	this.levelUpBonusBusy[objType] = false;
	return res;
};

Game_Actor.prototype.checkEquipLevelUpBonus = function(slotId, item, objType, oldItem) {
	
	//States
	this.validateLevelUpBonuses(this.bonusLearned.States, 'state', objType, item, oldItem);
	
	//Skills
	this.validateLevelUpBonuses(this.bonusLearned.Skills, 'skill', objType, item, oldItem);
	
	//Stats
	this.validateLevelUpBonuses(this.bonusLearned.Stats, 'stat', objType, item, oldItem);
};

Bobstah.LevelUpBonuses.GameActor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    var objType = (this.equipSlots()[slotId] === 1 ? 'weapon' : 'armor');
	var oldItemId = this._equips[slotId]._itemId || 0;
	var oldItem = null;
	if (oldItemId !== 0) {
		if (objType === 'weapon') {
			oldItem = $dataWeapons[oldItemId];
		} else {
			oldItem = $dataArmors[oldItemId];
		}
	}
	this.levelUpBonusBusy[objType] = true;
	Bobstah.LevelUpBonuses.GameActor_forceChangeEquip.call(this, slotId, item);
	if (item != null)
	{
		this.checkEquipLevelUpBonus(slotId, item, objType, oldItem);
	} else {
		this.checkEquipLevelUpBonus(slotId, {id: 0}, objType, oldItem);
	}
	this.levelUpBonusBusy[objType] = false;
};

//Overwrite this function to call this.checkEquipLevelUpBonus on each slot.
Bobstah.LevelUpBonuses.GameActor_releaseUnequippableItems = Game_Actor.prototype.releaseUnequippableItems;
Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
    for (;;) {
        var slots = this.equipSlots();
        var equips = this.equips();
        var changed = false;
        for (var i = 0; i < equips.length; i++) {
            var item = equips[i];
            if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
                if (!forcing) {
                    this.tradeItemWithParty(null, item);
                }
				var objType = (i === 1 ? 'weapon' : 'armor');
				var oldItemId = equips[i]._itemId || 0;
				var oldItem = null;
				if (oldItemId !== 0) {
					if (objType === 'weapon') {
						oldItem = $dataWeapons[oldItemId];
					} else {
						oldItem = $dataArmors[oldItemId];
					}
				}
				equips[i].setObject(null);
				this.checkEquipLevelUpBonus(i, {id: 0}, objType, item);
                changed = true;
            }
        }
        if (!changed) {
            break;
        }
    }
};

Bobstah.LevelUpBonuses.GameActor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
	this.levelUpBonusBusy['class'] = true;
	var oldClass = this._classId;
	res = Bobstah.LevelUpBonuses.GameActor_changeClass.call(this, classId, keepExp);
	var thisChanging = 'class';
	if (oldClass != classId)
	{
		//States
		this.validateLevelUpBonuses(this.bonusLearned.States, 'state', 'class', classId, oldClass);

		//Skills
		this.validateLevelUpBonuses(this.bonusLearned.Skills, 'skill', 'class', classId, oldClass);
		
		//Stats
		this.validateLevelUpBonuses(this.bonusLearned.Stats, 'stat', 'class', classId, oldClass);
	}
	this.levelUpBonusBusy['class'] = false;
	return res;
};

//SocketsEx plugin compatibility
if (Imported.BOB_SocketsEx) {
	
	Bobstah.LevelUpBonuses.IDs.socket = 'baseItemId';
	
	Bobstah.SocketsEx.aliasParseGetId = Bobstah.LevelUpBonuses.parseGetId;
	Bobstah.LevelUpBonuses.parseGetId = function(input, objType, strId) {
		if (objType === 'socket') {
			return $dataArmors[input][strId] || $dataArmors[input].id;
		} else {
			return Bobstah.SocketsEx.aliasParseGetId.call(this, input, objType, strId);
		}
	};
	
	Bobstah.SocketsEx.GameActor_applyNewLevelUpBonuses = Game_Actor.prototype.applyNewLevelUpBonuses;
	Game_Actor.prototype.applyNewLevelUpBonuses = function() {
		Bobstah.SocketsEx.GameActor_applyNewLevelUpBonuses.call(this);
		
		if (this.levelUpBonusBusy['weapon'] == false && this.levelUpBonusBusy['armor'] == false) {
			var sockets = this.sockets();
			if (sockets.length > 0) {
				for (var socketIndex = 0; socketIndex < sockets.length; socketIndex++) {
					var socket = sockets[socketIndex];
					this.levelUpBonuses(socket.item, "socket");
				}
			}
		}
	};
	
	Bobstah.SocketsEx.validateLevelUpBonusBySource = Game_Actor.prototype.validateLevelUpBonusBySource;
	Game_Actor.prototype.validateLevelUpBonusBySource = function(bonus) {
		if (bonus.srcType === 'socket') {
			return this.levelUpBonusValidLoop(bonus, 'socket', this.socketedItems());
		} else {
			return Bobstah.SocketsEx.validateLevelUpBonusBySource.call(this, bonus);
		}
	};
	
	Bobstah.SocketsEx.checkEquipLevelUpBonus = Game_Actor.prototype.checkEquipLevelUpBonus;
	Game_Actor.prototype.checkEquipLevelUpBonus = function(slotId, item, objType, oldItem) {
		Bobstah.SocketsEx.checkEquipLevelUpBonus.call(this, slotId, item, objType, oldItem);

		var oldSockets = (oldItem === null || oldItem.id === 0 ? [] : oldItem.socketsEx.sockets);
		var newSockets = (item === null || item.id === 0 ? [] : item.socketsEx.sockets);
		var length = (oldSockets.length > newSockets.length ? oldSockets.length : newSockets.length);
		for (var i = 0; i < length; i++) {
			if (typeof(oldSockets[i]) !== 'undefined') {
				var oldSocket = oldSockets[i].item;
			} else {
				var oldSocket = {id: 0};
			}
			if (typeof(newSockets[i]) !== 'undefined') {
				var newSocket = newSockets[i].item;
			} else {
				var newSocket = {id: 0}; 
			}
				Bobstah.SocketsEx.checkEquipLevelUpBonus.call(this, slotId, newSocket, 'socket', oldSocket);
		}
	}
}