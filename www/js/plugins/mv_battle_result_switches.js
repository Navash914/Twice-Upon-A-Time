//=============================================================================
// Battle Result Switches
// by Shaz
// Last Updated: 2015.11.05
//=============================================================================

/*:
 * @plugindesc Turns on switches when a battle ends according to battle results
 * @author Shaz
 *
 * @param Battle Won Switch
 * @desc Switch ID to turn on if battle is won
 * @default 0
 *
 * @param Battle Lost Switch
 * @desc Switch ID to turn on if battle is lost
 * @default 0
 *
 * @param Battle Escaped Switch
 * @desc Switch ID to turn on if player escapes from battle
 * @default 0
 *
 * @param Battle Abort Switch
 * @desc Switch ID to turn on if battle is aborted
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 *
 * When calling a Battle from an event command, you can set up actions to
 * happen after the battle is over, depending on whether the party won, lost
 * or escaped.
 *
 * This can't be done by default with random encounters set up on a map,
 * as there is no calling event.
 *
 * This plugin allows you to turn on a switch when a battle is won, lost,
 * or escaped, which you can then use to control map events or common events.
 *
 * Use 0 as a parameter to indicate not to turn on a switch for that
 * condition.  All of these switches will be turned off at the start
 * of battle.
 */

(function() {

  var parameters = PluginManager.parameters('BattleResultSwitches');
  var winSwitch = Number(parameters['Battle Won Switch'] || 0);
  var loseSwitch = Number(parameters['Battle Lost Switch'] || 0);
  var escapeSwitch = Number(parameters['Battle Escaped Switch'] || 0);
  var abortSwitch = Number(parameters['Battle Abort Switch'] || 0);

  var _BattleManager_setup = BattleManager.setup;
  BattleManager.setup = function(troopId, canEscape, canLose) {
    _BattleManager_setup.call(this, troopId, canEscape, canLose);
    if (winSwitch !== 0) {
      $gameSwitches.setValue(winSwitch, false);
    }
    if (loseSwitch !== 0) {
      $gameSwitches.setValue(loseSwitch, false);
    }
    if (escapeSwitch !== 0) {
      $gameSwitches.setValue(escapeSwitch, false);
    }
    if (abortSwitch !== 0) {
      $gameSwitches.setValue(abortSwitch, false);
    }
  };

  var _BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function() {
    _BattleManager_processVictory.call(this);
    if (winSwitch !== 0) {
      $gameSwitches.setValue(winSwitch, true);
    }
  };

  var _BattleManager_processEscape = BattleManager.processEscape;
  BattleManager.processEscape = function() {
    _BattleManager_processEscape.call(this);
    if (escapeSwitch !== 0) {
      $gameSwitches.setValue(escapeSwitch, true);
    }
  };

  var _BattleManager_processDefeat = BattleManager.processDefeat;
  BattleManager.processDefeat = function() {
    _BattleManager_processDefeat.call(this);
    if (loseSwitch !== 0) {
      $gameSwitches.setValue(loseSwitch, true);
    }
  };

  var _BattleManager_processAbort = BattleManager.processAbort;
  BattleManager.processAbort = function() {
    _BattleManager_processAbort.call(this);
    // Only abort on an Abort Battle command, not when escaping
    if (abortSwitch !== 0 && !this._escaped) {
      $gameSwitches.setValue(abortSwitch, true);
    }
  }

})();