/*:
-------------------------------------------------------------------------------
@title Remove State on Action
@author Hime --> HimeWorks (http://himeworks.com)
@date Nov 19, 2015
@filename HIME_RemoveStateOnAction.js
@url http://himeworks.com/2015/11/remove-state-on-action

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc Allows you to have states removed by performing actions.
@help 
-------------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=Gtxf84YmGs0

Do you have a buff state that will allow you to unleash a guaranteed
critical strike, but only for the next action that you take?

Or perhaps a state that will increase the effect of all healing spells,
but only after a healing spell has been used, the state wears off?

This plugin allows you to assign a new "auto removal" condition to your
states: Remove State On Action.

You can choose how many actions it takes for a state to disappear, and
also whether only certain actions will affect the state.

You can combine this removal condition with other auto-remove conditions
such as checking for a certain number of turns, or taking damage, and
so on.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 19, 2015 -  initial release

== Usage ==

To create states that will automatically remove themselves after a
certain number of actions have been used, note-tag the state with

  <remove by action count: minCount maxCount>
  
Where the minCount and maxCount represent a range of action counts before
the state is automatically removed. For example, you can say

  <remove by action count: 1 1>
  
If it should only last for one action. If you write

  <remove by action count: 1 3>
  
Then it can randomly last anywhere between 1 and 3 actions.

-- Check for Certain Skills --

By default, every action that you perform will update the countdown.
For example, if your state should last 2 actions, and you perform two
actions in one turn, then the state will expire.

What if the state should only consider certain skills to update it?
You can use the following note tag:

  <update action count skill: SKILL_ID>
  
Where the SKILL_ID is the ID of the skill that will affect this state.
For example, if Attack is skill 1 and Guard is skill 2, and you wanted
your state to only be removed when you actually attack, you can write

  <update action count skill: 1>
  
This way, if you just keep guarding, the action countdown won't be updated.

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.RemoveStateOnAction = 1;
TH.RemoveStateOnAction = TH.RemoveStateOnAction || {};

(function ($) {

  $.Regex = /<remove[-_ ]by[-_ ]action[-_ ]count:\s*(\d+)\s+(\d+)\s*>/im
  $.UpdateActionCountSkillRegex = /<update[-_ ]action[-_ ]count[-_ ]skill:\s*(\d+)\s*>/img

  $.isRemoveByActionCount = function(state) {
    if (state.removeByActionCount === undefined) {
      $.loadNotetag(state);
    }    
    return state.removeByActionCount;
  }
  
  $.loadNotetag = function(state) {
    state.removeByActionCount = false;
    state.hasUpdateActionCountSkills = false;
    state.updateActionCountSkills = {};
    var res = $.Regex.exec(state.note);
    if (res) {
      state.removeByActionCount = true;
      var min = Math.floor(res[1]);
      var max = Math.floor(res[2]);
      state.removeByActionCountMin = min;
      state.removeByActionCountMax = max;
    }
    
    while (res = $.UpdateActionCountSkillRegex.exec(state.note)) {
      state.hasUpdateActionCountSkills = true;
      state.updateActionCountSkills[Math.floor(res[1])] = true
    }
  }

  var TH_RemoveStateOnAction_GameBattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
  Game_BattlerBase.prototype.clearStates = function() {
    TH_RemoveStateOnAction_GameBattlerBase_clearStates.call(this);
    this._stateActionCount = {};
  };
  
  var TH_RemoveStateOnAction_GameBattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
  Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    TH_RemoveStateOnAction_GameBattlerBase_resetStateCounts.call(this, stateId);
    this.resetStateActionCount(stateId);
  };
  
  Game_BattlerBase.prototype.isStateActionCountExpired = function(stateId) {
    return this._stateActionCount[stateId] === 0;
  };
  
  Game_BattlerBase.prototype.resetStateActionCount = function(stateId) {
    var state = $dataStates[stateId];
    if ($.isRemoveByActionCount(state)) {
      var variance = 1 + Math.max(state.removeByActionCountMax - state.removeByActionCountMin, 0);
      this._stateActionCount[stateId] = state.removeByActionCountMin + Math.randomInt(variance);
    }
  };
  
  Game_BattlerBase.prototype.updateStateActionCounts = function(action) {  
    var states = this.states();
    for (var i = 0, len = states.length; i < len; i++) {      
      var state = states[i];
      if (this.canUpdateStateActionCount(state, action)) {
        this._stateActionCount[state.id]--;
      }
    }
  };
  
  Game_BattlerBase.prototype.canUpdateStateActionCount = function(state, action) {
    // Already no action counts left
    if (this._stateActionCount[state.id] === 0) {
      return false;
    }
    
    // Skills only
    if (state.hasUpdateActionCountSkills && !(action.isSkill() && state.updateActionCountSkills[action.item().id])) {
      return false;
    }    
    return true;
  };
  
  var TH_RemoveStatesOnAction_GameBattler_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;
  Game_Battler.prototype.removeStatesAuto = function(timing) {
    TH_RemoveStatesOnAction_GameBattler_removeStatesAuto.call(this, timing);
    if (timing === "remove_by_action_count") {
      var states = this.states();
      for (var i = 0, len = states.length; i< len; i++) {
        var state = states[i];
        if (this.isStateActionCountExpired(state.id) && $.isRemoveByActionCount(state)) {
          this.removeState(state.id)
        }
      }
    }    
  };
  
  /* Only update state actions if the action used should affect it */
  var TH_RemoveStateOnAction_GameBattler_performAction = Game_Battler.prototype.performAction;
  Game_Battler.prototype.performAction = function(action) {
    TH_RemoveStateOnAction_GameBattler_performAction.call(this, action);    
    this.updateStateActionCounts(action);
  };
  
  var TH_RemoveStateOnAction_GameBattler_performActionEnd = Game_Battler.prototype.performActionEnd;
  Game_Battler.prototype.performActionEnd = function() {
    TH_RemoveStateOnAction_GameBattler_performActionEnd.call(this);
    this.removeStatesAuto("remove_by_action_count");
  };
})(TH.RemoveStateOnAction);