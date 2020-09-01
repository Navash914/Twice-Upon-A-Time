/*:
-------------------------------------------------------------------------
@title Actor Battle Commands
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.1
@date Dec 6, 2015
@filename HIME_ActorBattleCommands.js
@url http://himeworks.com/2015/12/actor-battle-commands/

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
@plugindesc Provides you with tools to customize and manage actor
battle commands.
@help 
-------------------------------------------------------------------------
== Description ==

This plugin allows you to manage each and every one of your actors'
battle commands.

You can hide them or show them at anytime.
You can disable them or enable them whenever you want.

You can even choose which commands your actors will be able to use
during battle!

If you are a plugin developer, you can also create your own commands
easily and allow other game developers to use them in their games!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.1 - Dec 6, 2015
  * added support for tagging classes with battle commands.
1.0 - Dec 6, 2015
  * initial release

== Usage ==

Before we begin, we will need to understand how commands are structured.
Every command comes with 3 pieces of information

  1. Display Name
  2. Symbol
  3. Extra Data
  
The "display name" is the name that is drawn on the screen that the player
can see. You can change the display name at anytime.

The "symbol" is the name that the code uses to identify a certain type
of command. For example, "item" is the name of the Item command. You can
have the item command displayed as "Backpack", but it will still use
"item" internally.

Thre "Extra data" is information that the game uses to determine how to
handle a command. Different commands may need different extra data.

Anyways, let's start adding some commands for your actors.

  -- Initializing Commands --
  
You can initialize commands for each actor. This plugin offers a 
basic note-tag:

  <battle command: SYMBOL EXT />
 
Where the SYMBOL is the name of a pre-defined battle command. The ones
available by default are

  attack          - the "attack" command
  guard           - the "guard" command  
  skill_list      - all skill types the actor can use
  item            - the "item" command
  skill_type ID   - a specific skill type. Specify the skill type ID

You can also tag classes with battle commands. The actual commands
the actor will receive are as follows

1. If the actor has commands, it will use those commands
2. Otherwise, it will check its class for commands.
3. Otherwise, it will use default commands
  
Now, let's take a look at these commands.

  -- Command: attack --
  
This is your basic "Attack" command. It just uses the "Attack" skill,
or whatever skill is assigned to the "attack" command. You can add it
by writing

  <battle command: attack />
  
  -- Command: guard --
  
This is your basic "Guard" command. It just uses the "Guard" skill,
or whatever skill is assigned to the "guard" command". You can add it
by writing

  <battle command: guard />
  
  -- Command: skill_list --
  
This command adds all of the skill types that your actor can use.
For example, if it can use "Magic" and "Special" skills, both will be
added to your list of commands automatically. You can add this by
writing
  
  <battle command: skill_list />
  
  -- Command: item --
  
This command let's you use the "item" command, which will bring up the
item window. You can add this by writing

  <battle command: item />
  
  -- Command: skill_type --
  
This is a new command provided by this plugin. It allows you to display
a certain skill type. For example, if you had "Magic" as skill type 1 and
"Special" as skill type 2, you can add "Special" to your actors by writing

  <battle command: skill_type 2 />
  
Note the use of the number 2 as extra data.

  == Managing Commands using Events ==
  
A number of script calls are available for managing commands during the game.
You can add or remove commands, hide or show commands, enable or disable
commands, and so on.
  
  -- Hiding or Showing Commands --
  
When a command is hidden, it won't be shown to the player.
  
You can hide or show battle commands for each actor during the game.
To hide or show a command, use the script call

  hide_actor_command(ID, SYMBOL)
  show_actor_command(ID, SYMBOL)
  
Where the ID is the ID of the actor, and the SYMBOl is the symbol
of the command. If the actor doesn't have that command, nothing will happen.

For example if you want to hide the item command for actor 4, use

  hide_actor_command(4, "item")
  
If you need to specify extra data, you can specify extra data like this

  hide_actor_command(ID, SYMBOL, EXT)
  show_actor_command(ID, SYMBOL, EXT)
  
Where the EXT is your extra data.

  -- Enabling or Disabling Commands --
  
When a command is disabled, it cannot be selected. If the player tries
to select it, the game will simply play a buzzer sound. To enable or
disable a command, use the script calls

  enable_actor_command(ID, SYMBOL)
  disable_actor_command(ID, SYMBOL)
  
Where the ID is the ID of the actor, and the SYMBOl is the symbol
of the command. If the actor doesn't have that command, nothing will happen.

For example if you want to disable all skill commands for actor 5, use

  disable_actor_command(5, "skill_list")
  
If you need to specify extra data, you can specify extra data like this

  hide_actor_command(ID, SYMBOL, EXT)
  show_actor_command(ID, SYMBOL, EXT)
  
Where the EXT is your extra data.
-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.ActorBattleCommands = 1;
TH.ActorBattleCommands = TH.ActorBattleCommands || {};

function Data_BattlerCommand() {
  this.initialize.apply(this, arguments);
}

(function ($) {

  Data_BattlerCommand.prototype.initialize = function(name, symbol, ext) {
    this._name = name;
    this._symbol = symbol;
    this._ext = ext;
    this._enabled = true;
    this._visible = true;    
  };
  
  Data_BattlerCommand.prototype.name = function() {
    return this._name;
  };
  
  Data_BattlerCommand.prototype.setName = function(name) {
    this._name = name;
  };
  
  Data_BattlerCommand.prototype.symbol = function() {
    return this._symbol;
  };
  
  Data_BattlerCommand.prototype.ext = function() {
    return this._ext;
  };
  
  /* Whether this command is enabled or not */
  Data_BattlerCommand.prototype.isEnabled = function() {
    return this._enabled;
  };
  
  Data_BattlerCommand.prototype.setEnabled = function(bool) {
    this._enabled = bool
  };
  
  /* Whether this command is visible or not */
  Data_BattlerCommand.prototype.isVisible = function() {
    return this._visible;
  };
  
  Data_BattlerCommand.prototype.setVisible = function(bool) {
    this._visible = bool
  };
  
  /***************************************************************************/
  
  $.Regex = /<battle[-_ ]command:\s*(\w+?)(?:\s+(\w+))?\s*\/>/img
  $.ExtRegex = /<battle[-_ ]command>([\s\S]*?)<\/battle[-_ ]command>/img
  
  $.battlerCommands = function(obj) {
    if (obj.battlerCommands === undefined) {
      this.loadNotetagBattlerCommands(obj);
    }
    return obj.battlerCommands;
  };
  
  $.loadNotetagBattlerCommands = function(obj) {
    obj.battlerCommands = []
    var res;
    while (res = $.Regex.exec(obj.note)) {
      var symbol = res[1];
      var ext = res[2];
      var cmd = $.makeCommand(symbol, ext);
      obj.battlerCommands.push(cmd);
    }
    
    while (res = $.ExtRegex.exec(obj.note)) {
      var data = new Function("return {" + res[1] + "}")();
      var name = data.name;
      var symbol = data.symbol.toLowerCase();
      var ext = data.ext;
      var cmd = $.makeCommand(symbol, ext);
      if (name) {        
        cmd.setName(name)
      }      
      obj.battlerCommands.push(cmd)
    }
  };
  
  $.makeCommand = function(symbol, ext) {
    var methodName = "makeCommand_" + symbol;
    if (this[methodName]) {
      return this[methodName](symbol, ext);
    }
    else {
      throw new Error("Invalid battle command type: " + symbol);
    }
  };
  
  $.makeCommand_attack = function(symbol, ext) {    
    return new Data_BattlerCommand(TextManager.attack, symbol);
  };
  
  $.makeCommand_guard = function(symbol, ext) {
    return new Data_BattlerCommand(TextManager.guard, symbol);
  };
  
  $.makeCommand_skill_type = function(symbol, ext) {
    var stypeId = Math.floor(ext);
    name = $dataSystem.skillTypes[stypeId];
    return new Data_BattlerCommand(name, symbol, stypeId);
  };
  
  $.makeCommand_skill_list = function(symbol, ext) {
    return new Data_BattlerCommand("", symbol);
  };
  
  $.makeCommand_item = function(symbol, ext) {
    return new Data_BattlerCommand(TextManager.item, symbol);
  };  
  
  /***************************************************************************/
  
  var TH_GameBattler_initialize = Game_Battler.prototype.initialize;
  Game_Battler.prototype.initialize = function() {
    TH_GameBattler_initialize.call(this);
    this._battleCommands = [];
  };
  
  
  Game_Battler.prototype.initBattleCommands = function() {
  };
  
  Game_Battler.prototype.battleCommands = function() {
    return this._battleCommands;
  };
  
  /* Sorts battle commands based on their priority
   * specified for the battler
   */
  Game_Battler.prototype.sortBattleCommands = function() {
    // TO DO
  };
  
  Game_Battler.prototype.addBattleCommand = function(symbol, ext) {    
    var cmd = $.makeCommand(symbol, ext);
    this.battleCommands.push(cmd);
    this.sortBattleCommands();
  };
  
  Game_Battler.prototype.removeBattleCommand = function(symbol, ext) {
    var cmds = this.battleCommands();
    for (var i = cmds.length - 1; i > -1; i--) {
      var cmd = cmds[i];
      if (cmd.symbol() === symbol && (!ext || (ext && cmd.ext() === ext))) {
        this._battleCommands.splice(i, 1);
      }
    }
  };
  
  Game_Battler.prototype.setBattleCommandEnabled = function(bool, symbol, ext) {
    var cmds = this.battleCommands();
    for (var i = 0, len = cmds.length; i < len; i++) {
      var cmd = cmds[i];
      if ((cmd.symbol() === symbol) && (!ext || (ext && cmd.ext() === ext))) {
        cmd.setEnabled(bool);
      }
    }
  };
  
  Game_Battler.prototype.setBattleCommandVisible = function(bool, symbol, ext) {
    var cmds = this.battleCommands();
    for (var i = 0, len = cmds.length; i < len; i++) {
      var cmd = cmds[i];
      if (cmd.symbol() === symbol && (!ext || (ext && cmd.ext() === ext))) {
        cmd.setVisible(bool);
      }
    }
  };
  
  /***************************************************************************/
  
  Game_Actor.prototype.initBattleCommands = function() {
    Game_Battler.prototype.initBattleCommands.call(this);
    var cmds = $.battlerCommands(this.actor())
    if (cmds.length == 0) {
      cmds = $.battlerCommands(this.currentClass())
    }
    this._battleCommands = cmds;
  };
  
  var TH_GameActor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function(actorId) {
    TH_GameActor_setup.call(this, actorId);
    this.initBattleCommands();
  };
  
  /***************************************************************************/

  /* Overwrite. Generate commands from actor's list */
  var TH_WindowActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
  Window_ActorCommand.prototype.makeCommandList = function() {   
    if (this._actor) {
      var cmds = this._actor.battleCommands();
      var len = cmds.length;
      if (len > 0) {
        for (var i = 0; i < len; i++) {
          var cmd = cmds[i];        
          if (this.isVisible(cmd)) {
            this.addBattleCommand(cmd);
          }
        }
      }
      else {
        TH_WindowActorCommand_makeCommandList.call(this);
      }     
    }
  };
  
  Window_ActorCommand.prototype.addBattleCommand = function(cmd) {
    var methodName = "addBattleCommand_" + cmd.symbol();
    this[methodName](cmd);
  };
  
  /* New. Determine command visibility from the command */
  Window_ActorCommand.prototype.isVisible = function(cmd) {
    return cmd.isVisible();
  };
  
  /* New */
  Window_ActorCommand.prototype.addBattleCommand_attack = function(cmd) {
    var enabled = cmd.isEnabled() && this._actor.canAttack();    
    this.addCommand(cmd.name(), cmd.symbol(), enabled);
  };
  
  Window_ActorCommand.prototype.addBattleCommand_guard = function(cmd) {
    var enabled = cmd.isEnabled() && this._actor.canGuard();    
    this.addCommand(cmd.name(), cmd.symbol(), enabled);
  };
  
  Window_ActorCommand.prototype.addBattleCommand_item = function(cmd) {
    var enabled = cmd.isEnabled();
    this.addCommand(cmd.name(), cmd.symbol(), enabled);
  };
  
  Window_ActorCommand.prototype.addBattleCommand_skill_list = function(cmd) {
    var enabled = cmd.isEnabled();
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b) {
        return a - b;
    });
    skillTypes.forEach(function(stypeId) {
        var name = $dataSystem.skillTypes[stypeId];
        this.addCommand(name, 'skill_type', enabled, stypeId);
    }, this);
  };
  
  Window_ActorCommand.prototype.addBattleCommand_skill_type = function(cmd) {
    var enabled = cmd.isEnabled();
    this.addCommand(cmd.name(), cmd.symbol(), enabled, cmd.ext());
  };
  
  /* An extra binding for clarity */
  var TH_SceneBattle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function() {
    TH_SceneBattle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler('skill_type',  this.commandSkill.bind(this));
  };
  
  /***************************************************************************/
  
  hide_actor_command = function(id, symbol, ext) {
    $gameActors.actor(id).setBattleCommandVisible(false, symbol, ext)
  };
  
  show_actor_command = function(id, symbol, ext) {
    $gameActors.actor(id).setBattleCommandVisible(true, symbol, ext)
  };
  
  enable_actor_command = function(id, symbol, ext) {
    $gameActors.actor(id).setBattleCommandEnabled(true, symbol, ext)
  };
  
  disable_actor_command = function(id, symbol, ext) {
    $gameActors.actor(id).setBattleCommandEnabled(false, symbol, ext)
  };
})(TH.ActorBattleCommands);