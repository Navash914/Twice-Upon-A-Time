/*:
-------------------------------------------------------------------------
@title Equip Slots Core - Yanfly ItemCore patch
@author Hime --> HimeWorks (http://himeworks.com)
@date Nov 20, 2015
@filename HIME_YanflyItemCoreEquipSlotsCore.js
@url http://himeworks.com/2015/11/equip-slots-core/

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

See Equip Slots Core plugin for my Terms of Use
* http://himeworks.com/2015/11/equip-slots-core/

See ItemCore for Yanfly's Terms of Use

== Change Log ==

Nov 20, 2015 -  initial release

== Usage ==

Place below both plugins.

-------------------------------------------------------------------------
 */ 
 Game_Actor.prototype.equipInitIndependentEquips = function(equips) {
  var slots = this.equipSlots();
  var maxSlots = slots.length;
  
  /* Just clear out the old equips */
  for (var i = 0; i < maxSlots; ++i) {
    this._equips[i].setObject(null);
  }    
  
  for (var i = 0; i < maxSlots; ++i) {
    var slotType = slots[i];
    var equip = this.grabInitEquips(equips, slotType);
    if (DataManager.isIndependent(equip) && this.canEquip(equip)) {
      var array = $gameParty.gainIndependentItem(equip, 1)
      if (array instanceof Array) {
        newItem = array[0];
        this.changeEquip(i, newItem);
      }
    } else if (this.canEquip(equip)) {
      this._equips[i].setObject(equip);
    }
  }
};