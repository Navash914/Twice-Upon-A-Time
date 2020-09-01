/*=============================================================================
 * Anima - States Core
 * By Liquidize - www.mintkit.lol
 * Anima_StatesCore.js
 * Version: 1.02
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_StatesCore>
 * @author Liquidize
 *
 * @param Show Remaining Turns
 * @desc Show the turns remaining?
 * @default true
 *
 * @param Turns Remaining Size
 * @desc Font sized used to draw turns remaining.
 * @default 18
 *
 * @param Turns Remaining Y Offset
 * @desc Adjust the location of text on the Y axis.
 * @default -4
 *
 * @param Default Buff Limit
 * @desc Default amount of times a buff/debuff can be applied
 * @default 4
 *
 * @param Buff Boost Formula
 * @desc Formula used to apply the rate used for buffs and debuffs.
 * @default this._buffs[paramId] * 0.25 + 1.0;
 *
 * @param Minimum Buffs
 * @desc Minimum amount of buffs and debuffs.
 * @default 0
 *
 * @param State Reapply Rules
 * @desc Rules used to reapply states.
 * @default 1
 *
 * @param Use Decimal Placement
 * @desc Rounds the turns left on states and buffs as a decimal instead of an integer.
 * @default false
 *
 *
 * @help
 * ============================================================================
 * The Anima Framework
 * ============================================================================
 * What is it? It's a series of plugins, a 'framework' if you will, developed by
 * as a part of my contribution to the RPG Maker MV community. The
 * plugin contained within this framework are plugins that are derived
 * from the plugin request forums at RPGMakerWeb. They are requests that have been
 * found interesting/unique or potentially fun to make so I went ahead and made them.
 * Anyone is free to use these in any project provided that credit is given.
 * You are free to suggest improvements, features, suggestions, or whole plugins.
 * If I like them, or its a popular request, I will add them to my list.
 *
 * Check out my website:
 * http://mintkit.lol
 *
 * ============================================================================
 * Anima States Core
 * ============================================================================
 * This was a script I've seen requested personally in my other plugin threads,
 * or around the forums. It is based off Yanflys State Manager from VX Ace. It
 * is actually a direct port of that script to MV. This plugin allows you to see
 * the amount of turns remaining on your states, as well as enemy states. It also
 * allows you to specify a custom buff formula used to calculate the amount params
 * are buffed or debuffed. You are also able to set the maximum amount of times
 * a buff/debuff can be placed on a battler. As well as change the amount of turns
 * a state,buff,or debuff has through the use of skills and items. Basically
 * anything Yanflys original plugin could do, this can as well. The ultimate goal
 * of this plugin is to act eventually as an all in one states plugin, including
 * DoT/HoT states.
 *
 * If you are using Yanfly Battle Engine Core, you are able to see the amount
 * of turns left on your targets, as well as what states/buffs they have easier.
 * This feature will eventually make it over to non-yep_battleenginecore users
 * as well. When I get the time :)
 *
 * ============================================================================
 * Comparability
 * ============================================================================
 * This plugin overwrites functions used to handle state application, buff
 * application, and the buff rate formula, and the limit to the amount of stacks
 * a buff and debuff can have. It is therefore recommended that you place this
 * somewhere above plugins that share similar functionality. But under Yanflys
 * plugin collection, specifically Battle Engine Core.
 *
 * ============================================================================
 * NOTE TAGS
 * ============================================================================
 * The following are the possible notetags and their usage. Notetags are case
 * insensitive, so you can use all capitals,all lower case, or any combination.
 *
 * ============================================================================
 * State ONLY Notetags
 * ============================================================================
 * The following are note tags only usable for states.
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <REAPPLY RULE: x> or <STATE REAPPLY RULE: x>
 *
 * WHAT THEY DO:
 *             The above note tags can be used to set the state they're assigned
 *             to, to have a reapply rule different from the default.
 *
 * USAGE:
 *      Where 'x' is specify a value from 0 to 2, to determine the reapplication
 *      rule for this state. See the Reapplication rules section for more info.
 *
 * EXAMPLE:
 *        <Reapply Rule: 0>
 *        <Reapply Rule: 2>
 *        <STATE REAPPLY RULE: 1>
 *
 * EXPLANATION:
 *            Changes the states reapplication rule, based on the given value.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the state will use the default
 *          set in the parameters.
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * Skill and Item ONLY Notetags
 * ============================================================================
 * The following are note tags only usable for skills and items.
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <Buff Turns: BUFF,x> or <Change Buff Turns: BUFF,x>
 *
 * WHAT THEY DO:
 *             The above note tags can be used to change the amount of turns
 *             a buff has, decreasing or increasing it depending on the value
 *             of 'x'.
 *
 * USAGE:
 *      Where 'x' is specify any positive or negative integer, to add or remove
 *      that amount of turns. Negative integers will remove, while positive
 *      increase.
 *
 * VALID VALUE(S):
 *               The following are valid values to use for the "BUFF" part of
 *               the tag.
 *
 *               MAX HP
 *               MAXHP
 *               MAX MP
 *               MAXMP
 *               MAX SP (same as MaxMP)
 *               MAXSP (same as MaxMP)
 *               ATK
 *               STR (same as atk)
 *               DEF
 *               MAT
 *               INT (same as MAT)
 *               SPI (same as MAT)
 *               MDF
 *               RES (same as MDF)
 *               AGI
 *               SPD (same as AGI)
 *               LUK
 *
 *
 * EXAMPLE:
 *        <Change Buff Turns: MAXHP,+5>
 *        <Buff Turns: ATK,-3>
 *        <Buff Turns: AGI,-1>
 *
 * EXPLANATION:
 *            Changes the amount of turns a buff has given the buff type and
 *            the amount of turns.
 *
 * OPTIONAL:
 *          Yes, if not specified buff turns are not changed by the skill or
 *          item.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <Debuff Turns: DEBUFF,x> or <Change Debuff Turns: DEBUFF,x>
 *
 * WHAT THEY DO:
 *             The above note tags can be used to change the amount of turns
 *             a debuff has, decreasing or increasing it depending on the value
 *             of 'x'.
 *
 * USAGE:
 *      Where 'x' is specify any positive or negative integer, to add or remove
 *      that amount of turns. Negative integers will remove, while positive
 *      increase.
 *
 * VALID VALUE(S):
 *               The following are valid values to use for the "DEBUFF" part of
 *               the tag.
 *
 *               MAX HP
 *               MAXHP
 *               MAX MP
 *               MAXMP
 *               MAX SP (same as MaxMP)
 *               MAXSP (same as MaxMP)
 *               ATK
 *               STR (same as atk)
 *               DEF
 *               MAT
 *               INT (same as MAT)
 *               SPI (same as MAT)
 *               MDF
 *               RES (same as MDF)
 *               AGI
 *               SPD (same as AGI)
 *               LUK
 *
 *
 * EXAMPLE:
 *        <Change Debuff Turns: MAXHP,+5>
 *        <Debuff Turns: ATK,-3>
 *        <Debuff Turns: AGI,-1>
 *
 * EXPLANATION:
 *            Changes the amount of turns a debuff has given the buff type and
 *            the amount of turns.
 *
 * OPTIONAL:
 *          Yes, if not specified debuff turns are not changed by the skill or
 *          item.
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * Armor,Weapon,Class,Actor,Enemy Notetags
 * ============================================================================
 * The following are note tags only usable for armor,weapon,class,actor,or
 * enemy database object.
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <MAX BUFF: BUFF,X>
 *
 * WHAT THEY DO:
 *             The above note tags can be used to increase or decrease the amount
 *             of times a buff can be stacked.
 *
 * USAGE:
 *      Where 'x' is specify any negative or positive integer value to change
 *      the amount of times the 'BUFF' buff (parameter) can be stacked.
 *
 *               The following are valid values to use for the "BUFF" part of
 *               the tag.
 *
 *               MAX HP
 *               MAXHP
 *               MAX MP
 *               MAXMP
 *               MAX SP (same as MaxMP)
 *               MAXSP (same as MaxMP)
 *               ATK
 *               STR (same as atk)
 *               DEF
 *               MAT
 *               INT (same as MAT)
 *               SPI (same as MAT)
 *               MDF
 *               RES (same as MDF)
 *               AGI
 *               SPD (same as AGI)
 *               LUK
 *
 *
 * EXAMPLE:
 *        <Max Buff: ATK,+5>
 *        <Max Buff: MAXHP, -3>
 *
 * EXPLANATION:
 *            Changes the amount of times the buff can be stacked, if positive
 *            it adds onto the default maximum amount, if negative it takes away.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the buff will have the default
 *          stack limit set in the parameters.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <MAX Debuff: DEBUFF,X>
 *
 * WHAT THEY DO:
 *             The above note tags can be used to increase or decrease the amount
 *             of times a debuff can be stacked.
 *
 * USAGE:
 *      Where 'x' is specify any negative or positive integer value to change
 *      the amount of times the 'DEBUFF' (parameter) can be stacked.
 *
 *               The following are valid values to use for the "DEBUFF" part of
 *               the tag.
 *
 *               MAX HP
 *               MAXHP
 *               MAX MP
 *               MAXMP
 *               MAX SP (same as MaxMP)
 *               MAXSP (same as MaxMP)
 *               ATK
 *               STR (same as atk)
 *               DEF
 *               MAT
 *               INT (same as MAT)
 *               SPI (same as MAT)
 *               MDF
 *               RES (same as MDF)
 *               AGI
 *               SPD (same as AGI)
 *               LUK
 *
 *
 * EXAMPLE:
 *        <Max Debuff: ATK,+5>
 *        <Max Debuff: MAXHP, -3>
 *
 * EXPLANATION:
 *            Changes the amount of times the debuff can be stacked, if positive
 *            it adds onto the default maximum amount, if negative it takes away.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the debuff will have the default
 *          stack limit set in the parameters.
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * Armor,Weapon,Class,Actor,Enemy,Skill,Item,State Notetags
 * ============================================================================
 * The following are note tags only usable for armor,weapon,class,actor,or
 * enemy database object.
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <State Turns: STATEID,X> or <Change State Turns: STATEID,X>
 *
 * WHAT THEY DO:
 *             The above note tags can be used to increase or decrease the amount
 *             of turns a state has. If used on anything but a skill or item
 *             the turns are increased or decreased when the state is applied
 *             and reapplied. If used on a skill or item, then the turn change
 *             occurs when the skill or item is used. The target for the turn
 *             change is the one whom uses the skill.
 *
 * USAGE:
 *      Where 'x' is specify any negative or positive integer value to change
 *      the amount of turns a state has left. Where 'STATEID' is, specify the
 *      state in the database to change the turns of, if the user of the skill
 *      or item has said state.
 *
 *
 * EXAMPLE:
 *        <State Turns: 4,+5> - adds 5 turns.
 *        <State Turns: 23,-3> - removes 3 turns.
 *
 * EXPLANATION:
 *            Changes the amount of turns a state has by the given value of x.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the object does not have this tag
 *          then the amount of turns a state has is not changed.
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * State Reapplication Rules
 * ============================================================================
 * The following are rules that can be used to determine how states are reapplied.
 *
 * RULE NUMBER/TYPE = WHAT IT DOES:
 * 0 = If a state has this rule type, and the target to recieve the state already
 *     has the state, then the state is not reapplied at all.
 * 1 = State turn reset. When reapplied with this rule, the amount of turns left
 *     is reset completely.
 * 2 = Total/additive. When a state with this rule is reapplied, the remaining
 *     turns are added onto the amount that is given when reset.
 *
 * ============================================================================
 * BUFF FORMULA INFORMATION
 * ============================================================================
 * You are able to use a custom formula to specify the amount a parameter is
 * increased or decreased by when a buff is given. The following are valid
 * variables that one can use to access some information/values.
 *
 * this = the battler whom is being affected.
 * a = same as this.
 * s = $gameSwitches (Switches array)
 * v = $gameVariables (Game variables array)
 * id = the parameter id.
 *
 * When a formula fails to parse correctly, the default formula that the engine
 * uses normally is used, and it is logged to the console that it failed to
 * be evaluated. The default formula is also the formula this uses by default
 * set in the parameters.
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 *
 * Version 1.02:
 *             - Fixed a bug with obtaining the proper amount of buff turns.
 *
 * Version 1.0:
 *            - Finished Script!
 *
 *=============================================================================*/
var Imported = Imported || {};
var Anima = Anima || {};
Anima.StatesCore = Anima.StatesCore || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_StatesCore>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_StatesCore parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};

    $.Param.buffFormula = String($.Parameters['Buff Boost Formula']);
    $.Param.defaultBuffLimit = Number($.Parameters['Default Buff Limit'] || 4);
    $.Param.minimumBuffs = Number($.Parameters['Minimum Buffs'] || 0);
    $.Param.stateReapplyRule = Number($.Parameters['State Reapply Rules'] || 1);
    $.Param.showActorIcons = eval($.Parameters['Show Remaining Turns']);
    $.Param.actorIconTurnFontSize = Number($.Parameters['Turns Remaining Size'] || 12);
    $.Param.actorIconTurnYOffset = Number($.Parameters['Turns Remaining Y Offset'] || 4);
    $.Param.useDeciamlPlacement = eval($.Parameters['Use Decimal Placement']);

    //============================================================================
    // Database Manager
    //============================================================================

    // DatabaseManager loading
    var shadowPartnerDataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!shadowPartnerDataManager_isDatabaseLoaded.call(this)) return false;
        this.processStateCoreNotetags($dataStates);
        this.processStateCoreNotetags($dataSkills);
        this.processStateCoreNotetags($dataItems);
        this.processStateCoreNotetags($dataEnemies);
        this.processStateCoreNotetags($dataActors);
        this.processStateCoreNotetags($dataClasses);
        this.processStateCoreNotetags($dataWeapons);
        this.processStateCoreNotetags($dataArmors);
        return true;
    };

    // Process state notetags.
    DataManager.processStateCoreNotetags = function (group) {
        var note1 = /<(?:MAX BUFF):[ ](.*),([\+\-]\d+)>/i;
        var note2 = /<(?:MAX DEBUFF):[ ](.*),([\+\-]\d+)>/i;
        var note3 = /<(?:STATE TURNS|CHANGE STATE TURNS):[ ](\d+),([\+\-]\d+)>/i;
        var note4 = /<(?:BUFF TURNS|CHANGE BUFF TURNS):[ ](.*),([\+\-]\d+)>/i;
        var note5 = /<(?:DEBUFF TURNS|CHANGE DEBUFF TURNS):[ ](.*),([\+\-]\d+)>/i;
        var note6 = /<(?:STATE REAPPLY RULE|REAPPLY RULE):[ ]([0-2])>/i;
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.statecore = {};
            obj.statecore.maxbuffs = [0, 0, 0, 0, 0, 0, 0, 0];
            obj.statecore.maxdebuffs = [0, 0, 0, 0, 0, 0, 0, 0];
            obj.statecore.stateturns = [];
            obj.statecore.buffturns = [0, 0, 0, 0, 0, 0, 0, 0];
            obj.statecore.debuffturns = [0, 0, 0, 0, 0, 0, 0, 0];
            obj.statecore.reapplyrules = $.Param.stateReapplyRule;
            var paramId = 0;
            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    var buff = String(RegExp.$1);
                    if (buff.toLowerCase() === "all") {
                        for (var b = 0; b < 8; b++) {
                            obj.statecore.maxbuffs[b] = Number(RegExp.$2);
                        }
                    } else {
                         paramId = Anima.StatesCore.getParamId(buff);
                        if (paramId !== -1) obj.statecore.maxbuffs[paramId] = Number(RegExp.$1);
                    }
                } else if (line.match(note2)) {
                    var debuff = String(RegExp.$1);
                    if (debuff.toLowerCase() === "all") {
                        for (var d = 0; d < 8; d++) {
                            obj.statecore.maxdebuffs[d] = Number(RegExp.$2);
                        }
                    } else {
                         paramId = Anima.StatesCore.getParamId(debuff);
                        if (paramId !== -1) obj.statecore.maxdebuffs[paramId] = Number(RegExp.$1);
                    }
                } else if (line.match(note3)) {
                    var stateid = Number(RegExp.$1);
                    obj.statecore.stateturns[stateid] =  Number(RegExp.$2);
                } else if (line.match(note4)) {
                     paramId = Anima.StatesCore.getParamId(RegExp.$1);
                    if (paramId !== -1) obj.statecore.buffturns[paramId] = Number(RegExp.$2);
                } else if (line.match(note5)) {
                     paramId = Anima.StatesCore.getParamId(RegExp.$1);
                    if (paramId !== -1) obj.statecore.debuffturns[paramId] = Number(RegExp.$2);
                } else if (line.match(note6)){
                    obj.statecore.reapplyrules = Number(RegExp.$1);
                }

            }

        }

    };

    //=============================================================================
    // Static Functions
    //=============================================================================

    Anima.StatesCore.getParamId = function (paramString) {
        paramString = paramString.toUpperCase();
        switch (paramString) {
            case 'MAXHP':
            case 'MAX HP':
                return 0;
                break;
            case 'MAXMP':
            case 'MAX MP':
            case 'MAXSP':
            case 'MAX SP':
                return 1;
                break;
            case 'ATK':
            case 'STR':
                return 2;
                break;
            case 'DEF':
                return 3;
                break;
            case 'MAT':
            case 'INT':
            case 'SPI':
                return 4;
                break;
            case 'MDF':
            case 'RES':
                return 5;
                break;
            case 'AGI':
            case 'SPD':
                return 6;
                break;
            case 'LUK':
                return 7;
                break;
                return -1;
        }
    };


    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    Game_BattlerBase.prototype.maxBuffLimit = function (paramId) {
        if (paramId === -1) return -1;

        var limit = $.Param.defaultBuffLimit;
        if (this.isActor()) {
            limit += this.actor().statecore.maxbuffs[paramId];
            limit += this.currentClass().statecore.maxbuffs[paramId];

            for (var e = 0; e < this.equips().length; e++) {
                if (this.equips()[e] !== null) limit += this.equips()[e].statecore.maxbuffs[paramId];
            }
        } else {
            limit += this.enemy().statecore.maxbuffs[paramId];
        }

        for (var s = 0; s < this.states().length; s++) {
            limit += this.states()[s].statecore.maxbuffs[paramId];
        }
        return limit >= $.Param.minimumBuffs ? limit : $.Param.minimumBuffs;

    };

    Game_BattlerBase.prototype.maxDebuffLimit = function (paramId) {
        if (paramId === -1) return -1;

        var limit = $.Param.defaultBuffLimit;
        if (this.isActor()) {
            limit += this.actor().statecore.maxdebuffs[paramId];
            limit += this.currentClass().statecore.maxdebuffs[paramId];

            for (var e = 0; e < this.equips().length; e++) {
                if (this.equips()[e] !== null) limit += this.equips()[e].statecore.maxdebuffs[paramId];
            }
        } else {
            limit += this.enemy().statecore.maxdebuffs[paramId];
        }

        for (var s = 0; s < this.states().length; s++) {
            limit += this.states()[s].statecore.maxdebuffs[paramId];
        }
        return limit >= $.Param.minimumBuffs ? limit : $.Param.minimumBuffs;

    };

    Game_BattlerBase.prototype.paramBuffRate = function(paramId) {
        try {
            var a = this;
            var id = paramId;
            var s = $gameSwitches;
            var v = $gameVariables;
            var value = eval($.Param.buffFormula);
            return value;
        } catch(e){
            console.warn("Anima_StatesCore: Failed to parse buff formula. The stack is below:");
            console.warn(e);
            return this._buffs[paramId] * 0.25 + 1.0;
        }
    };

    Game_BattlerBase.prototype.isMaxBuffAffected = function (paramId) {
        return this._buffs[paramId] === this.maxBuffLimit(paramId);
    };

    Game_BattlerBase.prototype.isMaxDebuffAffected = function(paramId){
        return this._buffs[paramId] === -this.maxDebuffLimit(paramId);
    };

    Game_BattlerBase.prototype.buffTurns = function (paramId) {
        return this._buffTurns[paramId] !== undefined ? this._buffTurns[paramId] : 0;
    };

    Game_BattlerBase.prototype.buffLevel = function (paramId) {
        return this._buffs[paramId] !== null ? this._buffs[paramId] : 0;
    };

    Game_BattlerBase.prototype.buffChangeTurns = function (paramId, value) {
        if (this._buffTurns[paramId] === undefined) this._buffTurns[paramId] = 0;
        this._buffTurns[paramId] = Math.round(Math.max(value, 0));

    };

    Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
        if (!$dataStates[stateId]) return;
        this._stateTurns[stateId] = this.stateTurnMod(stateId);
    };

    Game_BattlerBase.prototype.stateTurnMod = function(stateId){
        if (!$dataStates[stateId]) return;

        var state = $dataStates[stateId];
        var n = state.minTurns + Math.randomInt(1 + Math.max(state.maxTurns - state.minTurns,0));
        if (this.isActor()){
            if (this.actor().statecore.stateturns[stateId] !== undefined){
                n += this.statecore.stateturns[stateId];
            }
            if (this.currentClass().statecore.stateturns[stateId] !== undefined){
                n += this.currentClass().statecore.stateturns[stateId];
            }

            for (var i = 0; i < this.equips().length; i++){
                if (this.equips()[i] !== null){
                    if (this.equips()[i].statecore.stateturns[stateId] !== undefined){
                        n += this.equips()[i].statecore.stateturns[stateId];
                    }
                }
            }
        } else {
            if (this.enemy().statecore.stateturns[stateId] !== undefined){
                n += this.enemy().statecore.stateturns[stateId];
            }
        }

        for (var s = 0; s < this.states().length; s++){
            if (this.states()[s].statecore.stateturns[stateId] !== undefined){
                n += this.states()[s].statecore.stateturns[stateId];
            }
        }
        return Math.max(n,0);

    };


    Game_BattlerBase.prototype.totalStateCounts = function(stateId){
        var state = $dataStates[stateId];
        if (!state) return;
        var value = this.stateTurnMod(stateId);
        this.stateChangeTurns(stateId,value + this.stateTurns(stateId));
    };


    Game_BattlerBase.prototype.stateTurns = function(stateId){
      if (!$dataStates[stateId]) return;
        return this._stateTurns[stateId] !== undefined ? this._stateTurns[stateId] : 0;
    };

    Game_BattlerBase.prototype.stateChangeTurns = function(stateId,value){
         var state = $dataStates[stateId];
        if (!state) return;
        this._stateTurns[stateId] = Math.max(value,0);
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================


    Game_Battler.prototype.addState = function(stateId) {
        if (this.isStateAddable(stateId)) {
            var staterules = $dataStates[stateId].statecore.reapplyrules;
            if (staterules === 0 && this.isStateAffected(stateId)) return;
            if (!this.isStateAffected(stateId)) {
                this.addNewState(stateId);
                this.refresh();
            }
            if (staterules == 1)  this.resetStateCounts(stateId);
            if (staterules == 2) this.totalStateCounts(stateId);
            this._result.pushAddedState(stateId);
        }
    };


    //=============================================================================
    // Game_Action
    //=============================================================================

    var animaStatesCore_GameAction_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        animaStatesCore_GameAction_applyItemUserEffect.call(this,target);
        this.applyStateTurnChanges(target);
        this.applyBuffTurnChanges(target);
        this.applyDebuffTurnChanges(target);
    };

    Game_Action.prototype.applyBuffTurnChanges = function(target){
        if (this.item() === null || this.item() === undefined) return;
        if ($gameParty.inBattle() !== true) return;
        for (var i = 0; i < this.item().statecore.buffturns.length; i++){
            if (this.subject().buffLevel(i) > 0){
                this.subject().buffChangeTurns(i,this.subject().buffTurns(i) + this.item().statecore.buffturns[i]);
                if (this.subject().buffTurns(i) < 0) this.subject().removeBuff(i);
            }
        }
    };

    Game_Action.prototype.applyDebuffTurnChanges = function(target){
        if (this.item() === null || this.item() === undefined) return;
        if ($gameParty.inBattle() !== true) return;
        for (var i = 0; i < this.item().statecore.debuffturns.length; i++){
            if (this.subject().buffLevel(i) < 0){
                this.subject().buffChangeTurns(i,this.subject().buffTurns(i) + this.item().statecore.debuffturns[i]);
                if (this.subject().buffTurns(i) < 0) this.subject().removeBuff(i);
            }
        }
    };

    Game_Action.prototype.applyStateTurnChanges = function(target){
      if (this.item() === undefined || this.item() === null) return;
      if ($gameParty.inBattle() != true) return;
        for (var i = 0; i < this.item().statecore.stateturns.length;i++) {
            if (!$dataStates[i]) continue;
            if (!$dataStates[i].autoRemovalTiming > 0) continue;
            if (this.subject().isStateAffected(i)) {
                this.subject().stateChangeTurns(i, this.subject().stateTurns(i) + this.item().statecore.stateturns[i]);
                if (this.subject().stateTurns(i) <= 0) this.subject().removeState(i);
            }
        }
    };

    //=============================================================================
    // Window_Base
    //=============================================================================

    var stateCoreWindowBase_drawActorIcons = Window_Base.prototype.drawActorIcons;
    Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
        stateCoreWindowBase_drawActorIcons.call(this,actor,x,y,width);
        this.drawActorIconTurns(actor,x,y,width);
    };

    Window_Base.prototype.drawActorIconTurns = function(actor,x,y,width){
      if ($.Param.showActorIcons === false) return;
        if (SceneManager._scene instanceof Scene_Battle === false) return;
        this.resetFontSettings();
        this.contents.fontSize = $.Param.actorIconTurnFontSize;
        y += $.Param.actorIconTurnYOffset;
        var bx = x;
        for (var i = 0; i < actor.states().length; i++){
            if (x + Window_Base._iconWidth >= width + bx) break;
            var state = actor.states()[i];
            if (state.iconIndex <= 0) continue;

            var turns = (Math.round(actor.stateTurns(state.id) * 10) / 10).toFixed(1);
            if (!$.Param.useDeciamlPlacement) turns = Math.round(turns);
             if (state.autoRemovalTiming > 0 && turns < 100){
                this.drawText(turns,x,y,Window_Base._iconWidth,'left');
            }
            x += Window_Base._iconWidth;
        }
        for (var b = 0; b < 8; b++){
            if (x + Window_Base._iconWidth >= width + bx) break;
            if (actor.buffIconIndex(actor.buffLevel(b),b) == 0) continue;
            var buffturns = (Math.round(actor.buffTurns(b) * 10) /10).toFixed(1);
            if (!$.Param.useDeciamlPlacement) buffturns = Math.round(buffturns);
            if  (buffturns < 100) {
                this.drawText(buffturns, x, y, Window_Base._iconWidth, 'left');
                x += Window_Base._iconWidth;
            }
        }
        this.resetFontSettings();

    };

    //=============================================================================
    // Window_Help
    //=============================================================================

    // If YEP_BattleEngineCore is imported, we can show the stuff on the help window
    // easily!

    if (Imported.YEP_BattleEngineCore) {

        var stateCoreWindowHelp_initialize = Window_Help.prototype.initialize;
        Window_Help.prototype.initialize = function (numLines) {
            stateCoreWindowHelp_initialize.call(this, numLines || 3);
        };

        // Overwrite Yanflys draw function, to move the text around a bit.
        // as well as draw the icons.
        Window_Help.prototype.drawBattler = function (battler) {
            var text = battler.name();
            var wx = 0;
            var wy = (this.contents.height - this.lineHeight()) / 2 - 10;
            this.drawText(text, wx, wy, this.contents.width, 'center');
            this.drawActorIcons(battler, (this.contents.width / 2) - 110, (this.contents.height / 2) + 2, this.width / 2);
        };
    }

})(Anima.StatesCore);

StatesCore = Anima.StatesCore;
Imported["Anima_StatesCore"] = 1.02;