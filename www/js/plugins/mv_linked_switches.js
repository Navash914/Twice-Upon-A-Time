//=============================================================================
// Linked Switches
// by Shaz
// Last Updated: 2015.11.11
//=============================================================================

/*:
 * @plugindesc Allows a switch to be linked to a statement to be evaluated
 * @author Shaz
 *
 * @help
 * This plugin allows you to link a switch with a command.  When the value
 * of the switch is checked (in a Conditional Branch, for example), the
 * command will be run, and the result will be returned as the switch value.
 *
 * Links can be set up in two different ways:
 * You can use a plugin command to link a switch with a command.  This means
 * you don't have to touch any Javascript code, but it means the commands
 * will be saved in the save file, slightly increasing the size, and making
 * it visible to players who could attempt to edit it.
 * Or you can add the links within the plugin code.  This means you have to
 * change the script, but it keeps the commands out of the save files and
 * away from the player.
 *
 * To add a link using a plugin call, enter it in the following format:
 *   LinkSwitch switchId command
 * For example:
 *   LinkSwitch 5 $gameParty.members().some(function(actor) { return actor.isLearnedSkill(12); })
 * When switch 5 is used in a conditional branch, it will be true/ON if any
 * party member has learned skill 12, and will be false/OFF if nobody has.
 *
 * To add a link to the script, modify the section below marked "Add switch
 * commands here" as follows:
 *   switchLinks[switchId] = 'command'
 * For example:
 *   switchLinks[5] = '$gameParty.members().some(function(actor) { return actor.isLearnedSkill(12); })'
 *
 * Note that these switches that are linked may not be reliable when used in
 * conditions on event pages, as event page conditions are only checked when
 * the map needs refreshing.  In the example above, switch 5 could not be used
 * in the conditions section because an actor learning or forgetting a skill
 * does not cause the map to be refreshed.
 */

(function() {

  var switchLinks = []
  //===========================================================================
  // Add switch commands here to build with the game rather than in save file
  // eg:
  // switchLinks[1] = '$gameParty.members().some(function(actor) { return actor.isLearnedSkill(12); })'
  //===========================================================================

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command.toUpperCase() === 'LINKSWITCH') {
      var switchId = parseInt(args.shift());
      var cmd = args.join(' ');
      switchLinks[switchId] = cmd;
    }
  };

  var _Game_Switches_value = Game_Switches.prototype.value;
  Game_Switches.prototype.value = function(switchId) {
    if (switchLinks[switchId] || null) {
      return eval(switchLinks[switchId]);
    } else {
      return _Game_Switches_value.call(this, switchId);
    }
  }
})();