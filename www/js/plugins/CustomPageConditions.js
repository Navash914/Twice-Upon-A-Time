/*:
-------------------------------------------------------------------------
@title Custom Page Conditions
@author Hime
@date Oct 24, 2015
-------------------------------------------------------------------------
@plugindesc Create your own page conditions for your events
@help 
-------------------------------------------------------------------------
== Description ==

Events are a collection of pages. Depending on which page is active,
the event will appear and behave differently. To determine which page is
active, a set of page conditions are used. If all page conditions are met,
then that page can be activated.

By default, RPG Maker provides 5 different page conditions:

- Switch is ON
- Variable is at least a certain value
- self-switch is ON
- Party has an item
- Actor is in party

But if you wanted to have a different condition, you would need to find a
way to accomplish that using only these 5 conditions. This may involve using
parallel processes to check whether conditions are met, in order to turn
on a switch or change a variable.

This plugin provides you with an easy way to define your own page
conditions without having to come up with workarounds. If you want to
check whether you have a certain weapon or armor, or whether a given
combination of actors is in the party, you can directly specify this
in your event.

By using custom page conditions, it improves productivity and makes it
easier to manage your project.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use
 
== Usage == 

To create a custom page condition, in your event, start by creating a
comment that reads

  <page condition>
  
Then create a conditional branch right under it. This conditional branch
will be treated as a page condition instead of a regular conditional branch.

You can create as many of these custom page conditions as you need.
-------------------------------------------------------------------------
 */  
var TH = TH || {};
TH.CustomPageConditions = TH.CustomPageConditions || {};

(function ($) {

  $.evalCustomPageCondition = function(cmd, mapId, eventId) {
    var params = cmd.parameters;
    var result = false;
    switch (params[0]) {
    case 0:  // Switch
        result = ($gameSwitches.value(params[1]) === (params[2] === 0));
        break;
    case 1:  // Variable
        var value1 = $gameVariables.value(params[1]);
        var value2;
        if (params[2] === 0) {
            value2 = params[3];
        } else {
            value2 = $gameVariables.value(params[3]);
        }
        switch (params[4]) {
        case 0:  // Equal to
            result = (value1 === value2);
            break;
        case 1:  // Greater than or Equal to
            result = (value1 >= value2);
            break;
        case 2:  // Less than or Equal to
            result = (value1 <= value2);
            break;
        case 3:  // Greater than
            result = (value1 > value2);
            break;
        case 4:  // Less than
            result = (value1 < value2);
            break;
        case 5:  // Not Equal to
            result = (value1 !== value2);
            break;
        }
        break;
    case 2:  // Self Switch
        if (eventId > 0) {
            var key = [mapId, eventId, params[1]];
            console.log(key);
            result = ($gameSelfSwitches.value(key) === (params[2] === 0));
        }
        break;
    case 3:  // Timer
        if ($gameTimer.isWorking()) {
            if (params[2] === 0) {
                result = ($gameTimer.seconds() >= params[1]);
            } else {
                result = ($gameTimer.seconds() <= params[1]);
            }
        }
        break;
    case 4:  // Actor
        var actor = $gameActors.actor(params[1]);
        if (actor) {
            var n = params[3];
            switch (params[2]) {
            case 0:  // In the Party
                result = $gameParty.members().contains(actor);
                break;
            case 1:  // Name
                console.log(actor.name());
                result = (actor.name() === n);
                break;
            case 2:  // Class
                result = actor.isClass($dataClasses[n]);
                break;
            case 3:  // Skill
                result = actor.isLearnedSkill(n);
                break;
            case 4:  // Weapon
                result = actor.hasWeapon($dataWeapons[n]);
                break;
            case 5:  // Armor
                result = actor.hasArmor($dataArmors[n]);
                break;
            case 6:  // State
                result = actor.isStateAffected(n);
                break;
            }
        }
        break;
    case 5:  // Enemy
        var enemy = $gameTroop.members()[params[1]];
        if (enemy) {
            switch (params[2]) {
            case 0:  // Appeared
                result = enemy.isAlive();
                break;
            case 1:  // State
                result = enemy.isStateAffected(params[3]);
                break;
            }
        }
        break;
    case 6:  // Character
        var character = this.character(params[1]);
        if (character) {
            result = (character.direction() === params[2]);
        }
        break;
    case 7:  // Gold
        switch (params[2]) {
        case 0:  // Greater than or equal to
            result = ($gameParty.gold() >= params[1]);
            break;
        case 1:  // Less than or equal to
            result = ($gameParty.gold() <= params[1]);
            break;
        case 2:  // Less than
            result = ($gameParty.gold() < params[1]);
            break;
        }
        break;
    case 8:  // Item
        result = $gameParty.hasItem($dataItems[params[1]]);
        break;
    case 9:  // Weapon
        result = $gameParty.hasItem($dataWeapons[params[1]], params[2]);
        break;
    case 10:  // Armor
        result = $gameParty.hasItem($dataArmors[params[1]], params[2]);
        break;
    case 11:  // Button
        result = Input.isPressed(params[1]);
        break;
    case 12:  // Script
        result = !!eval(params[1]);
        break;
    case 13:  // Vehicle
        result = ($gamePlayer.vehicle() === $gameMap.vehicle(params[1]));
        break;
    }
    return result;
  }

  var TH_CustomPageConditions_Game_Event_meetsConditions = Game_Event.prototype.meetsConditions;
  Game_Event.prototype.meetsConditions = function(page) {
    var res = TH_CustomPageConditions_Game_Event_meetsConditions.call(this, page);
    if (!res) {
      return false;
    }
    res = this.meetsCustomConditions(page);
    if (!res) {
      return false;
    }
    return true;
  };
  
  /*
   * Determines whether all custom page conditions have been met.
   */
  Game_Event.prototype.meetsCustomConditions = function(page) {
    if (page._customPageConditions === undefined) {
      this.loadCustomPageConditions(page);
    }
    var res;
    for (var i = 0; i < page._customPageConditions.length; i++) {
      res = TH.CustomPageConditions.evalCustomPageCondition(page._customPageConditions[i], this._mapId, this._eventId);
      if (res === false) {
        return res;
      }
    }
    return true;
  };
  
  /*
   * Go through event commands looking for page conditions
   */
  Game_Event.prototype.loadCustomPageConditions = function(page) {
    page._customPageConditions = [];
    var cmd, nextCmd;
    for (var i = 0; i < page.list.length; i++) {
      cmd = page.list[i];
      nextCmd = page.list[i+1];
      if (cmd.code === 108 && cmd.parameters[0].includes("<page condition>") && nextCmd.code === 111) {
        page._customPageConditions.push(nextCmd)
      }
    }
  };
  
  /*
   * Update methods to refresh the map
   */    
  var TH_CustomPageConditions_GameParty_gainGold = Game_Party.prototype.gainGold;
  Game_Party.prototype.gainGold = function(amount) {
    TH_CustomPageConditions_GameParty_gainGold.call(this, amount)
    $gameMap.requestRefresh();
  };
  
  var TH_CustomPageConditions_GameActor_setName = Game_Actor.prototype.setName;
  Game_Actor.prototype.setName = function(name) {  
    TH_CustomPageConditions_GameActor_setName.call(this, name)
    $gameMap.requestRefresh();
  };
  
  var TH_CustomPageConditions_GameActor_changeClass = Game_Actor.prototype.changeClass;
  Game_Actor.prototype.changeClass = function(classId, keepExp) {
    TH_CustomPageConditions_GameActor_changeClass.call(this, classId, keepExp);
    $gameMap.requestRefresh();
  };
  
  var TH_CustomPageConditions_GameActor_learnSkill = Game_Actor.prototype.learnSkill;
  Game_Actor.prototype.learnSkill = function(skillId) {
    TH_CustomPageConditions_GameActor_learnSkill.call(this, skillId);
    $gameMap.requestRefresh();
  };
  
  var TH_CustomPageConditions_GameBattler_refresh = Game_Battler.prototype.refresh;
  Game_Battler.prototype.refresh = function() {
    TH_CustomPageConditions_GameBattler_refresh.call(this);
    $gameMap.requestRefresh();
  };
})(TH.CustomPageConditions);