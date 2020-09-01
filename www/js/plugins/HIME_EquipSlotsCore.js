/*:
-------------------------------------------------------------------------
@title Equip Slots Core
@author Hime --> HimeWorks (http://himeworks.com)
@date Nov 20, 2015
@filename HIME_EquipSlotsCore.js
@url http://himeworks.com/2015/11/equip-slots-core/

If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/
-------------------------------------------------------------------------
@plugindesc Provides you with tools to set up custom equip slots for
each actor individually.
@help 
-------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=fXcA0IdPsPg

By default, RPG Maker gives you 5 equip types to work with:

  Weapon
  Shield
  Head
  Body
  Accessory
  
You also have the ability to add and modify equip slots directly in
the database.

However, one problem you might notice is that every actor will have
those equip slots, even if they can't use any of the equips that you've
designed for those slots.

Another problem is you can't add multiple copies of the same slot to
an actor: they can only have one of each. Want to wear two accessories?
Can't be done.

This plugin solves that problem. It provides ways for you to customize
your actors' equip slots, allowing you to choose exactly which slots
they will have in the game.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 20, 2015 - updated to support enemy equips
Nov 18, 2015 - updated to support Yanfly's EquipCore
Nov 12, 2015 - initial release

== Usage ==

-- Adding equip slots --

First, if you are using this plugin, the default "Initial equipment" box
will no longer be used. Instead, you will manage all actor equip slots
using note-tags.

To add an equip slot, use the following note tag:

  <equip slot: ETYPE>
  
The ETYPE, which is short for "equip type", is one of the equip types
that you have set up for your project. You can see this in the Types tab.

You can either write the ID of the etype, or you can write the exact name
of the etype. For example, Weapon is equip type 1, so you can write either

  <equip slot: 1>
  <equip slot: Weapon>
  
Depending on your preferences. I would recommend writing out the full
name so that it is clearer, but if you ever change your equip types names
you will need to remember to update these note-tags.

If you would like to add more equip slots, just add more note-tags.
Want 3 weapons and 2 rings, assuming they are in the database?

  <equip slot: Weapon>
  <equip slot: Weapon>
  <equip slot: Weapon>
  <equip slot: Ring>
  <equip slot: Ring>

-- Specifying Initial Equip --

Because the Initial Equipment box is no longer used, you will need to
find another way to specify them.

The equip slot note-tag supports initial equip, using something called an
"Item Code", and is written like this:

  <equip slot: ETYPE ITEMCODE>

An Item code is a quick way to reference a particular weapon, armor, or
item. They look like this:

  a1 - armor 1
  w3 - weapon 3
  i5 - item 5
  
So for example, if you want your actor to have a weapon slot with
weapon 4 from the database as its initial equip, use the note-tag

  <equip slot: Weapon w4>
 
-- Custom Scenes --

This plugin provides bare-bones equip slot functionality. The purpose
is to be able to use it with *any* equip scene, whether it is the
default scene or a custom scene.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.EquipSlotsCore = 1;
TH.EquipSlotsCore = TH.EquipSlotsCore || {};

function Game_EquipSlot() {
  this.initialize.apply(this, arguments);
};

(function ($) {

  Game_EquipSlot.prototype.initialize = function() {
    this._etypeId = 1;
    this._item = new Game_Item();
  };

  Game_EquipSlot.prototype.setEtypeId = function(etypeID) {
    this._etypeId = etypeID;
  };

  Game_EquipSlot.prototype.etypeId = function() {
    return this._etypeId;
  };

  Game_EquipSlot.prototype.setObject = function(item) {
    this._item.setObject(item);
  };

  Game_EquipSlot.prototype.object = function() {
    return this._item.object();
  };

  Game_EquipSlot.prototype.setEquip = function(isWeapon, item) {
    this._item.setEquip(isWeapon, item);
  };
  
  /***************************************************************************/

  $.Regex = /<equip[-_ ]slot:\s+(\w+)(?:\s+(\w)(\d+))?>/img
  
  $.etypeNameToId = function(etypeName) {
    if (!$.etypeMap) {
      $.etypeMap = {}
      for (var i = 1; i < $dataSystem.equipTypes.length; i++) {
        var name = $dataSystem.equipTypes[i].toUpperCase();
        $.etypeMap[name] = i;      
      }
    }   
    return $.etypeMap[etypeName.toUpperCase()];
  }
  
  /***************************************************************************/
  
  var TH_EquipSlotsCore_GameBattler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    this._equips = [];
    TH_EquipSlotsCore_GameBattler_initMembers.call(this);    
  };
  
  /* New. We maintain our own equip slots for each actor */
  Game_Battler.prototype.equipSlots = function() {
    var slots = [];
    for (var i = 0; i < this._equips.length; i++) {
      slots.push(this._equips[i].etypeId());
    }
    return slots;
  };
  
  Game_Battler.prototype.equips = function() {
    return this._equips.map(function(item) {
        return item.object();
    });
  };
  
  Game_Battler.prototype.initEquips = function(equips) {    
    var baseSlots = this.baseSlots();
    var maxSlots = baseSlots.length;
    this._equips = [];
    for (var i = 0; i < maxSlots; i++) {
      this._equips[i] = JsonEx.makeDeepCopy(baseSlots[i]);      
    }
    this.releaseUnequippableItems(true);
    this.refresh();
  };
  
  /* Base equip slots for the battler */
  Game_Battler.prototype.baseSlots = function() {
    return [];
  }  
  
  Game_Battler.prototype.getBaseSlots = function(battler) {
    if (!battler.baseEquipSlots) {      
      battler.baseEquipSlots = [];
      var res;
      while (res = $.Regex.exec(battler.note)) {
        var equipSlot = new Game_EquipSlot();
        var etypeId = res[1];
        var itemType = res[2];
        var itemID = res[3];
              
        // /* Not a number. Assume it's the name of an equip type */
        if (isNaN(etypeId)) {
          etypeId = $.etypeNameToId(etypeId);
        }
        else {
          etypeId = Math.floor(etypeId)
        }
        
        equipSlot.setEtypeId(etypeId);        
        if (itemType) {
          equipSlot.setEquip(itemType.toLowerCase() === "w", Math.floor(itemID));
        }
        
        battler.baseEquipSlots.push(equipSlot);
      }
    }
    return battler.baseEquipSlots;
  };
  
  Game_Battler.prototype.weapons = function() {
    return this.equips().filter(function(item) {
      return item && DataManager.isWeapon(item);
    });
  };

  Game_Battler.prototype.armors = function() {
    return this.equips().filter(function(item) {
      return item && DataManager.isArmor(item);
    });
  };
  
  /***************************************************************************/
  
  /* Overwrite. Logic moved into parent class */
  Game_Actor.prototype.equipSlots = function() {
    return Game_Battler.prototype.equipSlots.call(this);
  };
  
  /* Overwrite. Logic moved into parent class */
  Game_Actor.prototype.equips = function() {
    return Game_Battler.prototype.equips.call(this);
  };
  
  /* Overwrite. Logic moved into parent class */
  Game_Actor.prototype.weapons = function() {
    return Game_Battler.prototype.weapons.call(this);
  };

  /* Overwrite. Logic moved into parent class */
  Game_Actor.prototype.armors = function() {
    return Game_Battler.prototype.armors.call(this);
  };
  
  /* Overwrite. Slots are pulled from the actor */
  Game_Actor.prototype.initEquips = function(equips) {    
    Game_Battler.prototype.initEquips.call(this, equips);
  };
  

  /* By default, we check the actor for any equip slots */
  Game_Actor.prototype.baseSlots = function() {
    var slots = Game_Battler.prototype.baseSlots.call(this);
    return slots.concat(this.getBaseSlots(this.actor()))
  };
})(TH.EquipSlotsCore);