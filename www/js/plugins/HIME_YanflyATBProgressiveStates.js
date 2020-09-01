/*:
-------------------------------------------------------------------------
@title Progressive States - Yanfly ATB patch
@author Hime --> HimeWorks (http://himeworks.com)
@date Nov 19, 2015
@filename HIME_YanflyATBProgressiveStates.js
@url http://himeworks.com/2015/11/progressive-states-mv/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------
@plugindesc Patch for Yanfly's ATB to support Progressive States
@help 
-------------------------------------------------------------------------
== Description ==

== Terms of Use ==

See Progressive States plugin for Terms of Use
* http://himeworks.com/2015/11/progressive-states-mv

== Change Log ==

Nov 19, 2015 -  initial release

== Usage ==

Place below both HIME Progressive States plugin and Yanfly's ATB plugin.

-------------------------------------------------------------------------
 */ 
var TH_ProgressiveStates_YanflyATB_GameBattlerBase_updateStateTicks = Game_BattlerBase.prototype.updateStateTicks;
Game_BattlerBase.prototype.updateStateTicks = function() {
  var oldStates = this._states.clone();
  TH_ProgressiveStates_YanflyATB_GameBattlerBase_updateStateTicks.call(this)
  var newStates = this._states;
  this.checkProgressiveStates(oldStates, newStates);
};