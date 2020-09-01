/*:
-------------------------------------------------------------------------
@title Disabled Choice Conditions
@author Hime
@date Nov 3, 2015
-------------------------------------------------------------------------
@plugindesc Allows you to disable individual choices in a set of options
based on custom conditions
@help 
-------------------------------------------------------------------------
== Description ==

RPG Maker does not come with a way to disable individual choices from
a list of choices. For example, if the player shouldn't be allowed to
select a particular option, but you still want to show it, there's
basically no way to do it.

This plugin provides an easy way for you to disable each choice based
on your own custom conditions using tools that you are already
familiar with!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 2, 2105 - rewrote input methods. You can either use a script call,
              or a plugin command directly
Nov 1, 2015 - added support for plugin/conditional pair
Oct 31, 2015 -  initial release
 
== Usage == 

There are two ways to disable a choice

1. Using a plugin command

To disable a choice, simply use the plugin command

  disable_choice choiceNumber
  
Where the choiceNumber is the number of the choice that
you wish to disable

Use conditional branches and any other event commands as needed
to implement your logic.

2. Using a script call

   disable_choice( choiceNumber, formula )
   
Where the choiceNumber is the number of the choice that
you wish to disable, and the formula is a valid Javascript formula.

For example, to disable choice 3 if switch 4 is OFF, you can say

   disable_choice(3, "$gameSwitches.value(4) === false")   
   
-- When there are multiple sets of choices --

Disable conditions apply to the immediate set of choices, on the same
indentation level.

As a rule of thumb, you should declare all disable conditions
immediately before your choices. To avoid breaking up messages
and choices, you can place the disable conditions before any
messages as well.

-------------------------------------------------------------------------
 */ 
var Imported = {} 
var TH = TH || {};
Imported.DisabledChoiceConditions = 1;
TH.DisabledChoiceConditions = TH.DisabledChoiceConditions || {};

(function ($) {

  $.Regex = /<disable[-_ ]choice:\s*(\d+)\s*>/i

  /* store all indices that are disabled */
  var TH_DisableChoiceConditions_GameMessage_Clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
    TH_DisableChoiceConditions_GameMessage_Clear.call(this);
    this._DisabledChoiceConditions = {};
  };
  
  /* Returns whether the specified choice is disabled */
  Game_Message.prototype.isChoiceDisabled = function(choiceNum) {
    return this._DisabledChoiceConditions[choiceNum];
  }
  
  Game_Message.prototype.disableChoice = function(choiceNum, bool) {
    this._DisabledChoiceConditions[choiceNum] = bool;
  }

  /* After setting up choices, go and disable any that should be disabled */
  var TH_DisableChoiceConditions_WindowChoiceList_MakeCommandList = Window_ChoiceList.prototype.makeCommandList;
  Window_ChoiceList.prototype.makeCommandList = function() {
    TH_DisableChoiceConditions_WindowChoiceList_MakeCommandList.call(this);
    for (var i = 0; i < this._list.length; i++) {
      if ($gameMessage.isChoiceDisabled(i)) {
        this._list[i].enabled = false;
      }
    }
  };
  
  /* Gray out disabled choices */
  var TH_DisableChoiceConditions_WindowChoiceList_DrawItem = Window_ChoiceList.prototype.drawItem
  Window_ChoiceList.prototype.drawItem = function(index) {
    this.changePaintOpacity(this.isCommandEnabled(index));
    TH_DisableChoiceConditions_WindowChoiceList_DrawItem.call(this, index);
  };  
  
  /* Use a plugin command*/
  var TH_DisabledChoiceConditions_GameInterpreterPluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    TH_DisabledChoiceConditions_GameInterpreterPluginCommand.call(this, command, args);    
    if (command.toLowerCase() === "disable_choice") {
      var choiceNum = Math.floor(args[0] - 1);
      $gameMessage.disableChoice(choiceNum, true);
    }
    return true;
  };
  
  /* disable choice script call */
  disable_choice = function(choiceNum, formula) {
    var num = Math.floor(choiceNum) - 1;    
    $gameMessage.disableChoice(num, eval(formula));
  };
})(TH.DisabledChoiceConditions);