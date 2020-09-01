/*:
-------------------------------------------------------------------------
@title Enemy Equips
@author Hime --> HimeWorks (http://himeworks.com)
@date Nov 20, 2015
@filename HIME_EnemyEquips.js
@url http://himeworks.com/2015/11/enemy-equips/

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
@plugindesc Allows you to give enemies equips. Provides functionality
for managing enemy equips.
@help 
-------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=HRZp2narUWU

Do you have a game where players can visually see what enemies are using?
For example, depending on what armor they wear, their appearance will
change.

Or perhaps you have a stealing mechanic that allows you to steal enemy
weapons and armors, which would lower the enemy's strength and defense
after those equips have been pilfered!

This plugin provides you with the ability to give enemies equips.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 20, 2015 -  initial release

== Required ==

* Equip Slots Core
  http://himeworks.com/2015/11/equip-slots-core/

== Usage ==

-- Setting up Equip Slots --

For details information on how to set up equip slots, please see
the usage section for Equip Slots Core.

If you already know how to set up equip slots, basically just
note-tag enemies with

  <equip slot: ETYPE>
  
If you want to set up initial equipment, use the note-tag:

  <equip slot: ETYPE ITEM_CODE>
  
-- Setting up Equip Traits --

Like actors, enemies will need to have the appropriate "equip" features
so that they can actually equip weapons and armors.
  
-- Changing Equips During the Game --

To change enemy equips during the game, you can use script calls.
To access the enemy, you will need to use this script call

  var enemy = $gameTroop.members()[INDEX];
  
Where the INDEX is the index of the enemy you want to choose.
0 is the first enemy, 1 is the second enemy, and so on.

Once you have your enemy, you will need a weapon or an armor.
Let's say you wanted to get weapon 3 from the database. You
would use this script call

  var weapon = $dataWeapons[3];
  
Next, you just need to have the enemy change equips, using the
following script call:

  enemy.changeEquip(SLOT_INDEX, EQUIP);
  
Where the SLOT_ID is which slot you want to set the equip to.
0 is the first slot, 1 is the second slot, and so on.

So the whole script call would look something like this:

  var enemy = $gameTroop.members()[INDEX];
  var weapon = $dataWeapons[3];
  enemy.changeEquip(0, weapon);
  
If successful, your equip will now be using weapon 3.
  
-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.EnemyEquips = 1;
TH.EnemyEquips = TH.EnemyEquips || {};

(function ($) {

  var TH_GameEnemy_setup = Game_Enemy.prototype.setup;
  Game_Enemy.prototype.setup = function(enemyId, x, y) {
    TH_GameEnemy_setup.call(this, enemyId, x, y);
    this.initEquips([]);
  };
  
  Game_Enemy.prototype.baseSlots = function() {
    var slots = Game_Battler.prototype.baseSlots.call(this);
    return slots.concat(this.getBaseSlots(this.enemy()))
  };
  
  Game_Enemy.prototype.paramPlus = function(paramId) {
    var value = Game_Battler.prototype.paramPlus.call(this, paramId);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item) {
            value += item.params[paramId];
        }
    }
    return value;
  };
  
  Game_Enemy.prototype.changeEquip = function(slotId, item) {
    if (!item || this.equipSlots()[slotId] === item.etypeId) {
      this._equips[slotId].setObject(item);
      this.refresh();
    }
  };
  
  Game_Enemy.prototype.releaseUnequippableItems = function(forcing) {
    for (;;) {
      var slots = this.equipSlots();
      var equips = this.equips();
      var changed = false;
      for (var i = 0; i < equips.length; i++) {
          var item = equips[i];
          if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
            console.log("remove", item);
             /* We need support for troop inventory */
              // if (!forcing) {
                  // this.tradeItemWithParty(null, item);
              // }
              this._equips[i].setObject(null);
              changed = true;
          }
      }
      if (!changed) {
          break;
      }
    }
  };
  
  var TH_GameEnemy_performAttack = Game_Enemy.prototype.performAttack;
  Game_Enemy.prototype.performAttack = function() {
    TH_GameEnemy_performAttack.call(this);
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
      if (attackMotion.type === 0) {
          this.requestMotion('thrust');
      } else if (attackMotion.type === 1) {
          this.requestMotion('swing');
      } else if (attackMotion.type === 2) {
          this.requestMotion('missile');
      }
      this.startWeaponAnimation(attackMotion.weaponImageId);
    }
  }
  
  var TH_GameEnemy_traitObjects = Game_Enemy.prototype.traitObjects;
  Game_Enemy.prototype.traitObjects = function() {
    var objects = TH_GameEnemy_traitObjects.call(this);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item) {
            objects.push(item);
        }
    }
    return objects;
  };  
  
  var TH_GameEnemy_isSkilLWtypeOk = Game_Enemy.prototype.isSkillWtypeOk;
  Game_Enemy.prototype.isSkillWtypeOk = function(skill) {
    var res = TH_GameEnemy_isSkilLWtypeOk.call(this, skill);
    if (!res) {
      return false;
    }
    var wtypeId1 = skill.requiredWtypeId1;
    var wtypeId2 = skill.requiredWtypeId2;
    if ((wtypeId1 === 0 && wtypeId2 === 0) ||
          (wtypeId1 > 0 && this.isWtypeEquipped(wtypeId1)) ||
          (wtypeId2 > 0 && this.isWtypeEquipped(wtypeId2))) {
      return true;
    } else {
      return false;
    }
  };
  
  Game_Enemy.prototype.isWtypeEquipped = function(wtypeId) {
    return this.weapons().some(function(weapon) {
        return weapon.wtypeId === wtypeId;
    });
  };
})(TH.EnemyEquips);