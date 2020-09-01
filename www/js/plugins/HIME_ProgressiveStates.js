/*:
-------------------------------------------------------------------------
@title Progressive States
@author Hime --> HimeWorks (http://himeworks.com)
@date Nov 20, 2015
@filename HIME_ProgressiveStates.js
@url http://himeworks.com/2015/11/progressive-states-mv/

If you enjoy my work, consider supporting me on Patreon!

https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------
@plugindesc Allows you to create states where whenever the state is
removed due to expiry, a new state will be added afterwards.
@help 
-------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=9vjzhg36GqU

Do you have states that automatically change into other states after
a certain amount of turns or actions have elapsed?

For example, you have a Doom state that counts down every turn,
and when the countdown reaches 0, the battler will automatically die.

Or perhaps you have a Poison state that will worsen if it's not
treated, and after walking around for 50 steps, the poison state
automatically turns into a deadlier poison state.

Or perhaps you have a Frozen state that prevents the battler from
moving, but if it gets hit by any damage, it will immediately die.

This plugin allows you to set up your states so that when the state is
removed automatically, new states will be added.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 20, 2015 - refactored code to make it easier to check states
Nov 19, 2015 - initial release

== Usage ==

To specify what states will be added when a state is automatically
removed, add the note-tag

  <progressive state: ID>
  
Where the ID is the ID of the state that will be added. You can add
multiple states by adding additional notetags.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.ProgressiveStates = 1;
TH.ProgressiveStates = TH.ProgressiveStates || {};

(function ($) {

  $.Regex = /<progressive[-_ ]state:\s*(\d+)\s*>/img

  $.getProgressiveStates = function(state) {
    if (state.progressiveStates !== undefined) {
      return state.progressiveStates;
    }
    state.progressiveStates = [];
    var res;    
    while (res = $.Regex.exec(state.note)) {
      var id = Math.floor(res[1]);
      state.progressiveStates.push(id);
    }
    return state.progressiveStates;
  };
  
  /* Remove by walking */
  var TH_ProgressiveStates_GameBattler_updateStateSteps = Game_Actor.prototype.updateStateSteps;
  Game_Actor.prototype.updateStateSteps = function(state) {
    TH_ProgressiveStates_GameBattler_updateStateSteps.call(this, state);
    if (!this.isStateAffected(state.id)) {
      this.addProgressiveStates(state);
    }
  };

  /* Remove by damage */
  var TH_ProgressiveStates_GameBattler_removeStatesByDamage = Game_Battler.prototype.removeStatesByDamage;
  Game_Battler.prototype.removeStatesByDamage = function() {
    var oldStates = this._states.clone();
    TH_ProgressiveStates_GameBattler_removeStatesByDamage.call(this);
    var newStates = this._states;
    this.checkProgressiveStates(oldStates, newStates);
  };

  /* Remove by turn end and action end */
  var TH_ProgressiveStates_GameBattler_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;
  Game_Battler.prototype.removeStatesAuto = function(timing) {
    var oldStates = this._states.clone();
    TH_ProgressiveStates_GameBattler_removeStatesAuto.call(this, timing);
    var newStates = this._states;    
    this.checkProgressiveStates(oldStates, newStates);
  };
  
  Game_Battler.prototype.checkProgressiveStates = function(oldStates, newStates) {
    for (var i = 0, len = oldStates.length; i < len; i++) {
      var stateId = oldStates[i];
      var state = $dataStates[stateId];
      if (!newStates.contains(stateId)) {
        this.addProgressiveStates(state);
      }
    }
  };
  
  Game_Battler.prototype.addProgressiveStates = function(state) {
    var progStates = $.getProgressiveStates(state);
    for (var i = 0, len = progStates.length; i < len; i++) {
      this.addState(progStates[i]);
    }
  };
})(TH.ProgressiveStates);