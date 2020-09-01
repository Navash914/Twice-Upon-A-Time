//=============================================================================
// Linked Variables
// by Shaz
// Last Updated: 2015.11.11
//=============================================================================

/*:
 * @plugindesc Allows a variable to be linked to a statement to be evaluated
 * @author Shaz
 *
 * @help
 * This plugin allows you to link a variable with a command.  When the value
 * of the variable is checked (in a Conditional Branch, for example), the
 * command will be run, and the result will be returned as the variable value.
 *
 * Links can be set up in two different ways:
 * You can use a plugin command to link a variable with a command.  This means
 * you don't have to touch any Javascript code, but it means the commands
 * will be saved in the save file, slightly increasing the size, and making
 * it visible to players who could attempt to edit it.
 * Or you can add the links within the plugin code.  This means you have to
 * change the script, but it keeps the commands out of the save files and
 * away from the player.
 *
 * To add a link using a plugin call, enter it in the following format:
 *   LinkVAriable variableId command
 * For example:
 *   LinkVariable 8 $gameParty.leader().hp
 * When variable 8 is used in a conditional branch, it will be replaced with
 * the hp of the party leader.
 *
 * To add a link to the script, modify the section below marked "Add variable
 * commands here" as follows:
 *   variableLinks[variableId] = 'command'
 * For example:
 *   variableLinks[8] = '$gameParty.leader().hp'
 *
 * Note that these variables that are linked may not be reliable when used in
 * conditions on event pages, as event page conditions are only checked when
 * the map needs refreshing.  In the example above, variable 8 could not be used
 * in the conditions section because the map is not refreshed when the party
 * leader's hp changes.
 */

(function() {

  var variableLinks = []
  //===========================================================================
  // Add variable commands here to build with the game rather than in save file
  // eg:
  // variableLinks[1] = '$gameParty.leader().hp'
  //===========================================================================

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command.toUpperCase() === 'LINKVARIABLE') {
      var variableId = parseInt(args.shift());
      var cmd = args.join(' ');
      variableLinks[variableId] = cmd;
    }
  };

  var _Game_Variables_value = Game_Variables.prototype.value;
  Game_Variables.prototype.value = function(variableId) {
    if (variableLinks[variableId] || null) {
      return eval(variableLinks[variableId]);
    } else {
      return _Game_Variables_value.call(this, variableId);
    }
  }
})();