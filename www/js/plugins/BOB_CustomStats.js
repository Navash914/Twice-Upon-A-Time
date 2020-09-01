//=============================================================================
// Bobstah Plugins
// BOB_CustomStats.js
// Version: 1.3.2
//=============================================================================

var Imported = Imported || {};
Imported.BOB_CustomStats = true;

var Bobstah = Bobstah || {};
Bobstah.CustomStats = Bobstah.CustomStats || {};

//=============================================================================
 /*:
 * @plugindesc Allows you to create custom stats for damage formulas or any other use.
 * @author Bobstah
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * A simple custom stat plugin. Does not display the stats in
 * the actor Status window. You can assign the stats to an
 * actor or class, and modify them with a weapon, armor,
 * state, or item.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 * Actor/Enemy/Class
 * <CustomStat: statName=statValue>
 * statName - The name you want to reference this stat with.
 * statValue - The default value of your stat. Must be a number.
 * Options - You can append a percent sign to the end of statValue
 * to have it calculated as a percentage (statValue * 0.01)
 *
 * Weapon/Armor/State/Item
 * <CustomStat: statName+statValue>
 * <CustomStat: statName-statValue>
 *
 * You can also eval the statValue by surrounding your code with $():
 * <CustomStat: statName=$(yourCode();)
 * <CustomStat: statName+$(yourCode();)
 * <CustomStat: statName-$(yourCode();)
 *
 * You can combine percentage stats and eval, too:
 * <CustomStat: statName+$(a.level;)%>
 *
 * ============================================================================
 * Eval Variables
 * ============================================================================
 * The following variables are available during eval:
 * a - The actor the stat is being added to.
 * b - The source the stat is coming from (state, item, etc)
 * c - The stat object itself (find function createCustomStatNode for info)
 *
 * ============================================================================
 * Eval Notes
 * ============================================================================
 * Weapons, Armors, and States that use an eval have their code
 * executed every time the stat is calculated. What this means
 * is that if Actor#1 is Level 1 and has a sword with the following
 * notetag:
 * <CustomStat: Stat+$(a.level;)>
 *
 * At level 1, the actor will gain +1 stat. At level 2, the actor
 * will automatically gain +2 stat, and so on.
 *
 * Items that use an eval have their code executed when the
 * bonus is applied, as it is not considered an active
 * effect. Using the above example, and if the item was
 * consumed at level 1, the actor's basic modifier for
 * Stat would be increased by 1, even after leveling to 2.
 *
 * If you desire an item to have a continuous effect on
 * an actor, have that item apply a state instead.
 *
 * ============================================================================
 * Examples
 * ============================================================================
 * After setting a custom stat to an actor/enemy, you reference
 * it in damage formulas or other code just like any other
 * stat. Below is a sample damage formula for the a stat
 * named 'sanity':
 * 100 + a.sanity
 *
 * Let's say you gave the enemy a stat named 'insanity':
 * (100+ a.sanity) - b.insanity
 *
 * To have a shield give +10 sanity, use the following notetag on the sword:
 * <CustomStat: sanity+10>
 *
 * To have a state remove 6 sanity, use the following notetag on the state:
 * <CustomStat: sanity-6>
 *
 * To have an item give a permanent boost of 6 to sanity, use this notetag:
 * <CustomStat: sanity+6>
 *
 */

Bobstah.CustomStats.statList = {};
Bobstah.CustomStats.objContext = null;

Bobstah.CustomStats.defineStat = function(name, percent) {
	var newObj = Bobstah.CustomStats.statList[name] = {
		'name': name,
		'percent': percent
	};
	if (typeof(Bobstah.CustomStats[name]) === "undefined") {
		Bobstah.CustomStats[name] = newObj;
	} else {
		if (Bobstah.CustomStats[name].percent !== percent) {
			console.warn("Conflicting percentage information for "+name+"!");
			Bobstah.CustomStats[name].percent = true;
		}
	}
};

Bobstah.CustomStats.createStatNode = function(baseValue, op, evl, percent) {
	if (op === "-") {
		op = -1;
	} else {
		op = 1;
	}
	evl = evl || false;
	percent = percent || false;
	var obj = {
		'baseValue': baseValue,
		'eval': evl,
		'modifiers': {},
		'modifier': 0,
		'percent': percent,
		'op': op
	};
	return obj;
};

Bobstah.CustomStats.doEval = function(src, val) {
	var a = src;
	var b = Bobstah.CustomStats.objContext;
	var c = stat;
	var value = Number(eval(val));
	return value;
};
 
Bobstah.CustomStats.getValue = function(src, stat) {
	if (stat.baseValue === null) { return null; }
	if (stat['eval'] === true) {
		var value = Bobstah.CustomStats.doEval(src, stat);
	} else {
		var value = stat.baseValue;
	}
	var modifier = stat.modifier;
	for (var i in stat.modifiers) {
		var mod = stat.modifiers[i];
		if (mod['eval'] === true) {
			var val = Bobstah.CustomStats.doEval(src, mod.baseValue);
		} else {
			var val = mod.value;
		}
		modifier += (val * mod.op);
	}
	value += modifier;
	if (stat.percent === true) { value = value * 0.01; }
	return value;
};

Bobstah.CustomStats.setValue = function(stat, val) {
	stat.modifier += val;
};
 
Bobstah.CustomStats.createStat = function(param, value) {
	
	var newStat = {};
	newStat[param] = {};
	newStat[param].get = function() { 
		var src = Bobstah.CustomStats.objContext || this;
		var res = Bobstah.CustomStats.getValue(this, this.customStats[param]);
		if (res !== null) {
			return res;
		} else if (typeof(this._classId) !== "undefined") {
			if ($dataClasses[this._classId][param] && $dataClasses[this._classId][param] !== null) {
				Bobstah.CustomStats.objContext = this;
				var res = $dataClasses[this._classId][param];
				this.customStats[param].baseValue = res;
				return this[param];
			} else {
				return (Bobstah.CustomStats.statList[param].percent ? 1 : 0);
			}
		} else {
			return (Bobstah.CustomStats.statList[param].percent ? 1 : 0);
		}
	};
	newStat[param].set = function(val) {
		if (this.customStats[param] && this.customStats[param] !== null) {
			Bobstah.CustomStats.setValue(this.customStats[param], val);
		} else if (typeof(this._classId) !== "undefined") {
			if ($dataClasses[this._classId][param] && $dataClasses[this._classId][param] !== null) {
				val = $dataClasses[this._classId][param] + val;
				Bobstah.CustomStats.setValue(this.customStats[param], val);
			}
		} else {
			Bobstah.CustomStats.setValue(this.customStats[param], val);
		}
	};
	newStat[param].configurable = true;
	return newStat;
};
 
Bobstah.CustomStats.applyCustomStats = function(obj) {
	obj.customStats = obj.customStats || {};
	if (typeof(Bobstah.CustomStats.statList) === "undefined") { 
		console.warn("Bobstah CustomStats statList is undefined! Custom Stats may not function properly!")
		return false; 
	}
	for (var param in Bobstah.CustomStats.statList) {
		if (typeof(obj.customStats[param]) !== "undefined") {
			//Set the initial value of the object's param
		}
		var value = obj.customStats[param] || Bobstah.CustomStats.createStatNode(null);
		if (typeof(obj[param]) !== "undefined") { continue; }
		var newStat = Bobstah.CustomStats.createStat(param, value);
		Object.defineProperties(obj,newStat);
		obj.customStats[param] = value;
	}
};
 
//=============================================================================
// DataManager
//=============================================================================
Bobstah.CustomStats.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Bobstah.CustomStats.DataManager_isDatabaseLoaded.call(this)) return false;
	DataManager.processBobstahCustomStatsNotes($dataActors);
	DataManager.processBobstahCustomStatsNotes($dataClasses);
	DataManager.processBobstahCustomStatsNotes($dataEnemies);
	
	DataManager.processBobstahCustomStatsModNotes($dataWeapons);
	DataManager.processBobstahCustomStatsModNotes($dataArmors);
	DataManager.processBobstahCustomStatsModNotes($dataStates);
	DataManager.processBobstahCustomStatsModNotes($dataItems);
	
	DataManager.processBobstahCustomStats($dataActors);
	DataManager.processBobstahCustomStats($dataClasses);
	DataManager.processBobstahCustomStats($dataEnemies);
	return true;
};

DataManager.processBobstahCustomStatsNotes = function(group) {
	var statregex = /<CustomStat:\s*([A-z]+)=(.+)\s*>/ig;
	var evlregex = /^\$\((.+)\)/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note;
		obj.customStats = obj.customStats || {};
		while(stat = statregex.exec(notedata)) {
			var param = stat[1];
			if (stat[2].indexOf('$(') !== -1) {
				var evl = true;
				stat[2].match(evlregex);
				var value = RegExp.$1;
			} else {
				var value = Number(stat[2].replace('%',''));
				var evl = false;
			}
			var op = "=";
			if (stat[2][stat[2].length-1] === '%') {
				var percent = true;
			} else {
				var percent = false;
			}
			var newStat = Bobstah.CustomStats.createStat(param, value);
			Object.defineProperties(obj,newStat);
			Bobstah.CustomStats.defineStat(param, percent);
			obj.customStats[param] = Bobstah.CustomStats.createStatNode(value, op, evl, percent);
		}
	}
};

DataManager.processBobstahCustomStatsModNotes = function(group) {
	var statregex = /<CustomStat:\s*([A-z]+)([+\-])(.+)\s*>/ig;
	var evlregex = /^\$\((.+)\)/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note;
		obj.customStats = obj.customStats || {};
		while(stat = statregex.exec(notedata)) {
			var param = stat[1];
			var op = stat[2];
			if (stat[3].indexOf('$(') !== -1) {
				var evl = true;
				stat[3].match(evlregex);
				var value = RegExp.$1;
			} else {
				var evl = false;
				var value = Number(stat[3].replace('%',''));
			}
			if (stat[3][stat[3].length-1] === '%') {
				var percent = true;
			} else {
				var percent = false;
			}
			obj.customStats[param] = Bobstah.CustomStats.createStatNode(value, op, evl, percent);
		}
	}
};

Bobstah.CustomStats.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	$gameSystem.storeCustomStats(Bobstah.CustomStats.statList);
	return Bobstah.CustomStats.DataManager_makeSaveContents.call(this);
};

Bobstah.CustomStats.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	var res = Bobstah.CustomStats.DataManager_extractSaveContents.call(this, contents);
	Bobstah.CustomStats.statList = $gameSystem.getCustomStats();
	DataManager.processBobstahCustomStats($gameActors._data);
	return res;
};

DataManager.processBobstahCustomStats = function(group) {
	for (var n = 1; n < group.length; n++) {
		if (typeof(group[n]) !== "undefined" && group[n] !== null) {
			var obj = group[n];
			Bobstah.CustomStats.applyCustomStats(obj);
		}
	}
};

//=============================================================================
// Game_System
//=============================================================================
Game_System.prototype.storeCustomStats = function(arrayin) {
	this.customStatList = arrayin;
};

Game_System.prototype.getCustomStats = function() {
	return this.customStatList;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================
Game_BattlerBase.prototype.loadCustomStats = function(myId, datalist) {
	//Load Custom Stats
	Bobstah.CustomStats.applyCustomStats(this);
	for (var statId in this.customStats) {
		if (typeof(datalist[myId].customStats[statId]) !== "undefined") {
			if (datalist[myId].customStats[statId]['eval'] === true) {
				this.customStats[statId].modifiers[key] = datalist[myId].customStats[statId]
			} else {
				this.customStats[statId] = datalist[myId].customStats[statId];
			}
		}
	}
};

Game_BattlerBase.prototype.handleCustomStats = function(obj, opposite) {
	opposite = opposite || false;
	var key = obj.name + "-" + obj.id;
	Bobstah.CustomStats.objContext = obj;
	for (var statId in obj.customStats) {
		var stat = obj.customStats[statId];
		if (this.customStats[statId] === null) { 
			Bobstah.CustomStats.applyCustomStats(this);
		}
		if (stat['eval'] === true) {
			if (DataManager.isItem(obj)) {
				var value = (Bobstah.CustomStats.getValue(this, stat) * stat.op);
				if (opposite === true) { value = value * -1; }
				Bobstah.CustomStats.setValue(this.customStats[statId], value);
			} else {
				if (typeof(this.customStats[statId].modifiers[key]) === "undefined") {
					this.customStats[statId].modifiers[key] = stat;
				} else {
					if (opposite === true) {
						delete this.customStats[statId].modifiers[key];
					}
				}
			}
		} else { 
			var value = (Bobstah.CustomStats.getValue(this, stat) * stat.op);
			if (opposite === true) { value = value * -1; }
			Bobstah.CustomStats.setValue(this.customStats[statId], value);
		}
	}
	Bobstah.CustomStats.objContext = null;
};

Bobstah.CustomStats.GameBattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
	var res = Bobstah.CustomStats.GameBattlerBase_addNewState.call(this, stateId);
	if (stateId !== null) {
		var state = $dataStates[stateId];
		this.handleCustomStats(state);
	}
	return res;
};

//=============================================================================
// Game_Battler
//=============================================================================
Bobstah.CustomStats.GameBattler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
	var res = Bobstah.CustomStats.GameBattler_removeState.call(this, stateId);
	if (stateId !== null) {
		var state = $dataStates[stateId];
		this.handleCustomStats(state, true);
	}
	return res;
};

Bobstah.CustomStats.GameBattler_consumeItem = Game_Battler.prototype.consumeItem;
Game_Battler.prototype.consumeItem = function(item) {
    Bobstah.CustomStats.GameBattler_consumeItem.call(this, item);
	
	this.handleCustomStats(item);
};

//=============================================================================
// Game_Actor
//=============================================================================
Bobstah.CustomStats.GameActor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	Bobstah.CustomStats.GameActor_setup.call(this, actorId);
	this.loadCustomStats(actorId, $dataActors);
};

Bobstah.CustomStats.GameActor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
	if (this.equips()[slotId]) {
		var oldItem = this.equips()[slotId];
		this.handleCustomStats(oldItem, true);
	}
	var res = Bobstah.CustomStats.GameActor_changeEquip.call(this, slotId, item);
	if (item !== null) {
		this.handleCustomStats(item);
	}
	return res;
};

//=============================================================================
// Game_Enemy
//=============================================================================
Bobstah.CustomStats.GameEnemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	Bobstah.CustomStats.GameEnemy_setup.call(this, enemyId, x, y);
	this.loadCustomStats(enemyId, $dataEnemies);
};