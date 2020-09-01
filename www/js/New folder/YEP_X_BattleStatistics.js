//=============================================================================
// Yanfly Engine Plugins - Status Menu Extension - Battle Statistics
// YEP_X_BattleStatistics.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_BattleStatistics = true;

var Yanfly = Yanfly || {};
Yanfly.BStats = Yanfly.BStats || {};
Yanfly.BStats.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 (Requires YEP_StatusMenuCore.js) Logs the battle
 * statistics of actors for your players to view.
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @desc This is the text used for the command name in the Status
 * Menu command list.
 * @default Statistics
 *
 * @param Battle Count Text
 * @desc This is the category text for Battle Count.
 * @default Battles Initiated
 *
 * @param Battle Count Format
 * @desc This is how the text format will appear.
 * %1 - Actor Battles  %2 - Party Battles  %3 - Percentage
 * @default %1 out of %2 Battles (%3%)
 *
 * @param Kill Count Text
 * @desc This is the category text for Kill Count.
 * @default Kills
 *
 * @param Kill Count Format
 * @desc This is how the text format will appear.
 * %1 - Kill Ratio
 * @default %1 Kills per Battle
 *
 * @param Death Count Text
 * @desc This is the category text for Death Count.
 * @default Deaths
 *
 * @param Death Count Format
 * @desc This is how the text format will appear.
 * %1 - Death Ratio
 * @default %1 Deaths per Battle
 *
 * @param Assist Count Text
 * @desc This is the category text for Assist Count.
 * @default Assists
 *
 * @param Assist Count Format
 * @desc This is how the text format will appear.
 * %1 - Assist Ratio
 * @default %1 Assists per Battle
 *
 * @param Damage Dealt
 * @desc This is the category text for Damage Dealt.
 * @default Damage Dealt
 *
 * @param Damage Taken
 * @desc This is the category text for Damage Taken.
 * @default Damage Taken
 *
 * @param Healing Dealt
 * @desc This is the category text for Healing Dealt.
 * @default Healing Performed
 *
 * @param Healing Taken
 * @desc This is the category text for Healing Taken.
 * @default Healing Received
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_StatusMenuCore.
 * Make sure this plugin is located under YEP_StatusMenuCore in the
 * plugin list.
 *
 * If you wish to place the Battle Statistics tab in the Status Menu in a
 * specific spot, place 'Statistics' without the quotes in the Status Menu
 * Core's Command Order parameter. If it's not present there, it will
 * automatically order itself in the 'Custom' tab.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * This plugin is plug-and-play. All battle information will be recorded in the
 * Battle Statistics tab. The information will be as follows:
 *
 * Battles Initiated
 * How many battles the actor was present in the starting party and what ratio.
 *
 * Kills/Deaths/Assists
 * Displays information about how many kills, deaths, and assists performed by
 * the actor overall. Kills rise when the actor defeats an enemy. Deaths rise
 * if the actor falls in battle. Assists rise if the actor is present during an
 * enemy kill.
 *
 * Damage Dealt
 * Total amount of damage dealt by the actor over the course of the game.
 *
 * Damage Taken
 * Total amount of damage taken by the actor over the course of the game.
 *
 * Healing Dealt
 * Total amount of healing dealt by the actor over the course of the game.
 *
 * Healing Taken
 * Total amount of healing taken by the actor over the course of the game.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Calculations for recorded HP damage dealt are now calculated based on the
 * actual HP damage taken as per the results rather than based off of the raw
 * incoming value (in the event that raw value gets modified as per the effects
 * of other plugins).
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_StatusMenuCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_BattleStatistics');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BStatsCmdName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.BStatsBCountText = String(Yanfly.Parameters['Battle Count Text']);
Yanfly.Param.BStatsBCountFmt = String(Yanfly.Parameters['Battle Count Format']);
Yanfly.Param.BStatsKCountText = String(Yanfly.Parameters['Kill Count Text']);
Yanfly.Param.BStatsKCountFmt = String(Yanfly.Parameters['Kill Count Format']);
Yanfly.Param.BStatsDCountText = String(Yanfly.Parameters['Death Count Text']);
Yanfly.Param.BStatsDCountFmt = String(Yanfly.Parameters['Death Count Format']);
Yanfly.Param.BStatsACountText = String(Yanfly.Parameters['Assist Count Text']);
Yanfly.Param.BStatsACountFmt = String(Yanfly.Parameters['Assist Count Format']);
Yanfly.Param.BStatsDmgDealt = String(Yanfly.Parameters['Damage Dealt']);
Yanfly.Param.BStatsDmgTaken = String(Yanfly.Parameters['Damage Taken']);
Yanfly.Param.BStatsHealDealt = String(Yanfly.Parameters['Healing Dealt']);
Yanfly.Param.BStatsHealTaken = String(Yanfly.Parameters['Healing Taken']);

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.BStats.Game_BattlerBase_addNewState =
		Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
    if (stateId === this.deathStateId()) this.updateBattleStats();
		Yanfly.BStats.Game_BattlerBase_addNewState.call(this, stateId);
};

Game_BattlerBase.prototype.updateBattleStats = function() {
		if (!$gameParty.inBattle()) return;
		if (this.isActor()) this.increaseDeathCount();
		if (this.isEnemy()) {
			for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
				var actor = $gameParty.battleMembers()[i];
				if (!actor) continue;
				if (actor === BattleManager._subject) {
					actor.increaseKillCount();
				} else {
					actor.increaseAssistCount();
				}
			}
		}
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.BStats.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.BStats.Game_Battler_onBattleStart.call(this);
    if (!this.isActor()) return;
		if (this._battleCount === undefined) this.initBattleStatistics();
		if (this.isBattleMember()) this._battleCount++;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.BStats.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.BStats.Game_Actor_setup.call(this, actorId);
		this.initBattleStatistics();
};

Game_Actor.prototype.initBattleStatistics = function() {
		this._battleCount = 0;
		this._killCount = 0;
		this._deathCount = 0;
		this._assistCount = 0;
		this._totalDamageDealt = 0;
		this._totalDamageTaken = 0;
		this._totalHealingDealt = 0;
		this._totalHealingTaken = 0;
    // My Stats Below
        this._skillUseCount = [0,0,0,0,0];
        this._highestDamageDealt = 0;
        this._highestDamageTaken = 0;
        this._totalShieldingDone = 0;
        this._totalShieldingReceived = 0;
};
    
Game_Actor.prototype.resetBattleStatistics = function() {
        this.initBattleStatistics();
};

Game_Actor.prototype.battleCount = function() {
    if (this._battleCount === undefined) this.initBattleStatistics();
		return this._battleCount;
};

Game_Actor.prototype.killCount = function() {
    if (this._killCount === undefined) this.initBattleStatistics();
		return this._killCount;
};

Game_Actor.prototype.killCountRatio = function() {
    if (this._killCount === undefined) this.initBattleStatistics();
		return this._killCount / Math.max(this._battleCount, 1);
};

Game_Actor.prototype.increaseKillCount = function(value) {
    value = value || 1;
		if (this._killCount === undefined) this.initBattleStatistics();
		this._killCount += value;
};

Game_Actor.prototype.deathCount = function() {
    if (this._deathCount === undefined) this.initBattleStatistics();
		return this._deathCount;
};

Game_Actor.prototype.deathCountRatio = function() {
    if (this._deathCount === undefined) this.initBattleStatistics();
		return this._deathCount / Math.max(this._battleCount, 1);
};

Game_Actor.prototype.increaseDeathCount = function(value) {
    value = value || 1;
		if (this._deathCount === undefined) this.initBattleStatistics();
		this._deathCount += value;
};

Game_Actor.prototype.assistCount = function() {
    if (this._assistCount === undefined) this.initBattleStatistics();
		return this._assistCount;
};

Game_Actor.prototype.assistCountRatio = function() {
    if (this._assistCount === undefined) this.initBattleStatistics();
		return this._assistCount / Math.max(this._battleCount, 1);
};

Game_Actor.prototype.increaseAssistCount = function(value) {
    value = value || 1;
		if (this._assistCount === undefined) this.initBattleStatistics();
		this._assistCount += value;
};

Game_Actor.prototype.totalDamageDealt = function() {
    if (this._totalDamageDealt === undefined) this.initBattleStatistics();
		return this._totalDamageDealt;
};

Game_Actor.prototype.increaseTotalDamageDealt = function(value) {
    value = value || 1;
		if (this._totalDamageDealt === undefined) this.initBattleStatistics();
		this._totalDamageDealt += value;
};

Game_Actor.prototype.totalDamageTaken = function() {
    if (this._totalDamageTaken === undefined) this.initBattleStatistics();
		return this._totalDamageTaken;
};

Game_Actor.prototype.increaseTotalDamageTaken = function(value) {
    value = value || 1;
		if (this._totalDamageTaken === undefined) this.initBattleStatistics();
		this._totalDamageTaken += value;
};

Game_Actor.prototype.totalHealingDealt = function() {
    if (this._totalHealingDealt === undefined) this.initBattleStatistics();
		return this._totalHealingDealt;
};

Game_Actor.prototype.increaseTotalHealingDealt = function(value) {
    value = value || 1;
		if (this._totalHealingDealt === undefined) this.initBattleStatistics();
		this._totalHealingDealt += value;
};

Game_Actor.prototype.totalHealingTaken = function() {
    if (this._totalHealingTaken === undefined) this.initBattleStatistics();
		return this._totalHealingTaken;
};

Game_Actor.prototype.increaseTotalHealingTaken = function(value) {
		value = value || 1;
		if (this._totalHealingTaken === undefined) this.initBattleStatistics();
		this._totalHealingTaken += value;
};
    
// ==================== My Stats ======================= //
    
Game_Actor.prototype.skillUseCount = function (stype) {
    if (this._skillUseCount === undefined) this.initBattleStatistics();
    return this._skillUseCount[stype];
};
    
Game_Actor.prototype.skillUseCountRatio = function (stype) {
    if (this._skillUseCount === undefined) this.initBattleStatistics();
    return this._skillUseCount[stype] / Math.max(this._battleCount, 1);
};
    
Game_Actor.prototype.increaseSkillUseCount = function (stype) {
    if (this._skillUseCount === undefined) this.initBattleStatistics();
    this._skillUseCount[stype]++;
};
    
Game_Actor.prototype.shieldingDone = function () {
    if (this._totalShieldingDone === undefined) this.initBattleStatistics();
    return this._totalShieldingDone;
};
    
Game_Actor.prototype.increaseShieldingDone = function (value) {
    if (this._totalShieldingDone === undefined) this.initBattleStatistics();
    this._totalShieldingDone += value;
};
    
Game_Actor.prototype.shieldingReceived = function () {
    if (this._totalShieldingReceived === undefined) this.initBattleStatistics();
    return this._totalShieldingReceived;
};
    
Game_Actor.prototype.increaseShieldingReceived = function (value) {
    if (this._totalShieldingReceived === undefined) this.initBattleStatistics();
    this._totalShieldingReceived += value;
};
    
Game_Actor.prototype.highestDamageDealt = function() {
    if (this._highestDamageDealt === undefined) this.initBattleStatistics();
		return this._highestDamageDealt;
};

Game_Actor.prototype.setHighestDamageDealt = function(value) {
		if (this._highestDamageDealt === undefined) this.initBattleStatistics();
        value = value || this._highestDamageDealt;
		this._highestDamageDealt = value;
};

Game_Actor.prototype.highestDamageTaken = function() {
    if (this._highestDamageTaken === undefined) this.initBattleStatistics();
		return this._highestDamageTaken;
};

Game_Actor.prototype.setHighestDamageTaken = function(value) {
		if (this._highestDamageTaken === undefined) this.initBattleStatistics();
        value = value || this._highestDamageTaken;
		this._highestDamageTaken = value;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.BStats.Game_Action_executeHpDamage =
    Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    Yanfly.BStats.Game_Action_executeHpDamage.call(this, target, value);
    var dmg = target.result().hpDamage;
    if (this.subject().isActor()) {
      if (dmg > 0) this.subject().increaseTotalDamageDealt(dmg);
      if (dmg < 0) this.subject().increaseTotalHealingDealt(-dmg);
      if (dmg > this.subject().highestDamageDealt()) this.subject().setHighestDamageDealt(dmg);
    }
    if (target.isActor()) {
      if (dmg > 0) target.increaseTotalDamageTaken(dmg);
      if (dmg < 0) target.increaseTotalHealingTaken(-dmg);
      if (dmg > target.highestDamageTaken()) target.setHighestDamageTaken(dmg);
    }
};

var enemySelectAlias = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    enemySelectAlias.call(this);
    var actor = BattleManager.actor();
    var stype = this._actorCommandWindow.currentExt();
    if (stype >= 1) {
        actor.increaseSkillUseCount(stype);
    }
};   

//=============================================================================
// Window_StatusCommand
//=============================================================================

Yanfly.BStats.Window_StatusCommand_createCommand =
		Window_StatusCommand.prototype.createCommand;
Window_StatusCommand.prototype.createCommand = function(command) {
		if (command.toUpperCase() === 'STATISTICS') {
			var text = Yanfly.Param.BStatsCmdName;
			this.addCommand(text, 'battleStatistics', true);
		} else {
			Yanfly.BStats.Window_StatusCommand_createCommand.call(this, command);
		}
};

Yanfly.BStats.Window_StatusCommand_addCustomCommands =
		Window_StatusCommand.prototype.addCustomCommands;
Window_StatusCommand.prototype.addCustomCommands = function() {
		Yanfly.BStats.Window_StatusCommand_addCustomCommands.call(this);
		if (this.findSymbol('battleStatistics') > -1) return;
		var text = Yanfly.Param.BStatsCmdName;
		this.addCommand(text, 'battleStatistics', true);
};

//=============================================================================
// Window_StatusInfo
//=============================================================================

Yanfly.BStats.Window_StatusInfo_drawInfoContents =
		Window_StatusInfo.prototype.drawInfoContents;
Window_StatusInfo.prototype.drawInfoContents = function(symbol) {
		if (symbol === 'battleStatistics') {
			this.drawBattleStatistics();
		} else {
			Yanfly.BStats.Window_StatusInfo_drawInfoContents.call(this, symbol);
		}
};

Window_StatusInfo.prototype.drawBattleStatistics = function() {
		this.resetFontSettings();
		this.drawBattleCount();
		this.drawKDACount();
		this.drawKDARatios();
		this.drawTotalDamageHealing();
        this.drawTotalDamageShielding();
};

Window_StatusInfo.prototype.drawBattleCount = function() {
		this.drawDarkRect(0, 0, this.contents.width, this.lineHeight());
		this.changeTextColor(this.systemColor());
		var p = this.textPadding();
		var text = Yanfly.Param.BStatsBCountText;
		this.drawText(text, p, 0, this.contents.width - p * 2);
		this.changeTextColor(this.normalColor());
		var fmt = Yanfly.Param.BStatsBCountFmt;
		var n1 = Yanfly.Util.toGroup(this._actor.battleCount());
		var n2 = Yanfly.Util.toGroup($gameSystem.battleCount());
		var n3 = parseInt(100 * this._actor.battleCount() / Math.max(1,
			$gameSystem.battleCount()));
		text = fmt.format(n1, n2, n3);
		this.drawText(text, p, 0, this.contents.width - p * 2, 'right');
};

Window_StatusInfo.prototype.drawKDACount = function() {
		var p = this.textPadding();
		var lh = this.lineHeight();
		var dw = this.contents.width / 2;
		this.drawDarkRect(0, lh * 1, dw, lh);
		this.drawDarkRect(0, lh * 2, dw, lh);
		this.drawDarkRect(0, lh * 3, dw, lh);
        this.drawDarkRect(0, lh * 4, dw * 2, lh);
		this.changeTextColor(this.systemColor());
		var text = Yanfly.Param.BStatsKCountText;
		this.drawText(text, p, lh, this.contents.width - p * 2);
        lh += this.lineHeight();
    
        if (this._actor.addedSkillTypes().contains(1)) {
		text = 'Combat Skills Used';
		this.drawText(text, p, lh, this.contents.width - p * 2);
        lh += this.lineHeight();
        }
        if (this._actor.addedSkillTypes().contains(2)) {
		text = 'Special Skills Used';
		this.drawText(text, p, lh, this.contents.width - p * 2);
        lh += this.lineHeight();
        }
        if (this._actor.addedSkillTypes().contains(3)) {
		text = 'Magic Skills Used';
		this.drawText(text, p, lh, this.contents.width - p * 2);
        lh += this.lineHeight();
        }
    
		text = 'Break Skills Used';
		this.drawText(text, p, lh, this.contents.width - p * 2);
        lh = this.lineHeight();
    
		this.changeTextColor(this.normalColor());
		text = Yanfly.Util.toGroup(this._actor.killCount());
		this.drawText(text, p, lh, dw - p * 2, 'right');
        lh += this.lineHeight();
        
        
        if (this._actor.addedSkillTypes().contains(1)) {
		this.changeTextColor(this.normalColor());
    	text = Yanfly.Util.toGroup(this._actor.skillUseCount(1));
		this.drawText(text, p, lh, dw - p * 2, 'right');
        lh += this.lineHeight();
        }
    
        if (this._actor.addedSkillTypes().contains(2)) {
		this.changeTextColor(this.normalColor());
		text = Yanfly.Util.toGroup(this._actor.skillUseCount(2));
		this.drawText(text, p, lh, dw - p * 2, 'right');
        lh += this.lineHeight();
        }
    
        if (this._actor.addedSkillTypes().contains(3)) {
		this.changeTextColor(this.normalColor());
		text = Yanfly.Util.toGroup(this._actor.skillUseCount(3));
		this.drawText(text, p, lh, dw - p * 2, 'right');
        lh += this.lineHeight();
        }
    
		this.changeTextColor(this.normalColor());
		text = Yanfly.Util.toGroup(this._actor.skillUseCount(4));
		this.drawText(text, p, lh, dw * 2 - p * 2, 'right');
};

Window_StatusInfo.prototype.drawKDARatios = function() {
		var p = this.textPadding();
		var lh = this.lineHeight();
		var dw = this.contents.width / 2;
		this.drawDarkRect(dw, lh * 1, dw, lh);
		this.drawDarkRect(dw, lh * 2, dw, lh);
		this.drawDarkRect(dw, lh * 3, dw, lh);
	//	this.drawDarkRect(dw, lh * 4, dw, lh);
		this.changeTextColor(this.normalColor());
		var fmt = Yanfly.Param.BStatsKCountFmt;
		var ratio = Yanfly.Util.toGroup(this._actor.killCountRatio().toFixed(2));
		var text = fmt.format(ratio);
		this.drawText(text, dw + p, lh * 1, dw - p * 2, 'right');
        lh += this.lineHeight();
    
    
        if (this._actor.addedSkillTypes().contains(1)) {
		fmt = Yanfly.Param.BStatsDCountFmt;
		ratio = Yanfly.Util.toGroup(this._actor.skillUseCountRatio(1).toFixed(2));
		text = fmt.format(ratio);
		this.drawText(text, dw + p, lh, dw - p * 2, 'right');
        lh += this.lineHeight();
        }
    
        if (this._actor.addedSkillTypes().contains(2)) {
		fmt = Yanfly.Param.BStatsACountFmt;
		ratio = Yanfly.Util.toGroup(this._actor.skillUseCountRatio(2).toFixed(2));
		text = fmt.format(ratio);
		this.drawText(text, dw + p, lh, dw - p * 2, 'right');
        lh += this.lineHeight();
        }
    
        if (this._actor.addedSkillTypes().contains(3)) {
		fmt = Yanfly.Param.BStatsACountFmt;
		ratio = Yanfly.Util.toGroup(this._actor.skillUseCountRatio(3).toFixed(2));
		text = fmt.format(ratio);
		this.drawText(text, dw + p, lh, dw - p * 2, 'right');
        lh += this.lineHeight();
        }
    
	/*	fmt = Yanfly.Param.BStatsACountFmt;
		ratio = Yanfly.Util.toGroup(this._actor.skillUseCountRatio(4).toFixed(2));
		text = fmt.format(ratio);
		this.drawText(text, dw + p, lh, dw - p * 2, 'right');
    */
};

Window_StatusInfo.prototype.drawTotalDamageHealing = function() {
		var lh = this.lineHeight();
		var p = this.textPadding();
        var dw = this.contents.width / 2;
		this.drawDarkRect(0, lh * 5, dw, lh);
		this.drawDarkRect(0, lh * 6, dw, lh);
		this.drawDarkRect(0, lh * 7, dw, lh);
		this.drawDarkRect(0, lh * 8, dw, lh);
		this.changeTextColor(this.systemColor());
		var text = Yanfly.Param.BStatsDmgDealt;
		this.drawText(text, p, lh * 5, dw - p * 2);
		text = Yanfly.Param.BStatsDmgTaken;
		this.drawText(text, p, lh * 6, dw - p * 2);
		text = Yanfly.Param.BStatsHealDealt;
		this.drawText(text, p, lh * 7, dw - p * 2);
		text = Yanfly.Param.BStatsHealTaken;
		this.drawText(text, p, lh * 8, dw - p * 2);
		this.changeTextColor(this.normalColor());
		text = Yanfly.Util.toGroup(this._actor.totalDamageDealt());
		this.drawText(text, p, lh * 5, dw - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.totalDamageTaken());
		this.drawText(text, p, lh * 6, dw - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.totalHealingDealt());
		this.drawText(text, p, lh * 7, dw - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.totalHealingTaken());
		this.drawText(text, p, lh * 8, dw - p * 2, 'right');
};
    
Window_StatusInfo.prototype.drawTotalDamageShielding = function() {
		var lh = this.lineHeight();
		var p = this.textPadding();
        var dw = this.contents.width / 2;
		this.drawDarkRect(dw, lh * 5, dw, lh);
		this.drawDarkRect(dw, lh * 6, dw, lh);
		this.drawDarkRect(dw, lh * 7, dw, lh);
		this.drawDarkRect(dw, lh * 8, dw, lh);
		this.changeTextColor(this.systemColor());
		var text = 'Highest Damage Dealt';
		this.drawText(text, dw + p, lh * 5, dw - p * 2);
		text = 'Highest Damage Taken';
		this.drawText(text, dw + p, lh * 6, dw - p * 2);
		text = 'Total Shielding Performed';
		this.drawText(text, dw + p, lh * 7, dw - p * 2);
		text = 'Total Shielding Received'
		this.drawText(text, dw + p, lh * 8, dw - p * 2);
		this.changeTextColor(this.normalColor());
		text = Yanfly.Util.toGroup(this._actor.highestDamageDealt());
		this.drawText(text, dw + p, lh * 5, dw - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.highestDamageTaken());
		this.drawText(text, dw + p, lh * 6, dw - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.shieldingDone());
		this.drawText(text, dw + p, lh * 7, dw - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.shieldingReceived());
		this.drawText(text, dw + p, lh * 8, dw - p * 2, 'right');
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
		Yanfly.Util.toGroup = function(inVal) {
				return inVal;
		}
};

//=============================================================================
// End of File
//=============================================================================
};
