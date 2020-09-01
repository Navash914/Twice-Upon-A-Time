//=============================================================================
// Navash Plugins - Random Encounter Bar
// Navash_EncounterBar.js
//=============================================================================

var Imported = Imported || {};
Imported.Navash_EncounterBar = true;

var Navash = Navash || {};
Navash.EncBar = Navash.EncBar || {};
Navash.EncBar.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Displays a gauge on the map that fills up the closer
 * you are to a random encounter.
 * @author Navash
 *
 * @param --- Window Settings ---
 * @default
 *
 * @param Show Window
 * @desc Show Window by default?
 * @default true
 *
 * @param Window Width
 * @desc This is the width of the Encounter Bar Window
 * @default Graphics.boxWidth / 2
 *
 * @param Window Height
 * @desc This is the height of the Encounter Bar Window
 * @default this.fittingHeight(1)
 *
 * @param Window X Offset
 * @desc This is the X Offset of the Encounter Bar Window
 * @default 0
 *
 * @param Window Y Offset
 * @desc This is the Y Offset of the Encounter Bar Window
 * @default 0
 *
 * @param Window Opacity
 * @desc This is the opacity of the Encounter Bar Window.
 * Set to 0 to make window transparent (player will see gauge only)
 * @default 255
 *
 * @param --- Gauge Settings ---
 * @default
 *
 * @param Gauge Color 1
 * @desc This is color 1 of the Encounter Gauge.
 * @default 14
 *
 * @param Gauge Color 2
 * @desc This is color 2 of the Encounter Gauge.
 * @default 17
 *
 * @param --- Other Settings ---
 * @default
 *
 * @param Message Hide Bar
 * @desc Automatically hide Encounter Gauge when message window
 * is open?
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_BattleEngineCore. Make sure this plugin is located
 * under YEP_BattleEngineCore in the plugin list.
 *
 * For Turn-Based Battle Systems like DTB (Default Turn Battle), letting the
 * player see the turn order visually can add a whole lot more depth to the
 * battle system. This plugin will add a display of icons showing the turn
 * order of the player's party and the enemy party within a corner of the
 * screen (modifiable).
 *
 * NOTE! This plugin does NOT work with tick-based Battle Systems like ATB or
 * CTB! It is specifically made to work only with turn-based battle systems.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Insert the following notetags to give your actors and enemies unique turn
 * order icons.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *
 * Actor and Enemy Notetags:
 *
 *   <Turn Order Icon: x>
 *   - This sets the icon used for the actor/enemy to be x.
 *
 *   <Turn Order Border Color: x>
 *   - This sets the border color used for the actor/enemy to text color x.
 *
 *   <Turn Order Background Color: x>
 *   - This sets the background color used for the actor/enemy to text color x.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *
 * Actor Only Notetags:
 *
 *   <Class x Turn Order Icon: y>
 *   - This sets it so that if the actor is a specific class, the actor will
 *   get a specific icon used for the Turn Order Display. If the actor is class
 *   x, it will receive icon y.
 *
 *   <Hero Turn Order Icon: x>
 *   <Warrior Turn Order Icon: x>
 *   <Mage Turn Order Icon: x>
 *   <Priest Turn Order Icon: x>
 *   - If you prefer to use names instead of class ID's, you can use the above
 *   notetag format. If the actor is the named class, it will receive icon x.
 *   If you have multiple classes with the same name, priority will be given to
 *   the class with the highest ID.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Use the following plugin commands to control the Turn Order Display.
 *
 * Plugin Command:
 *
 *   EnableTurnOrderDisplay
 *   - Turns on the Turn Order Display to be shown in battle if the battle is
 *   a turn-based battle system can support the Turn Order Display.
 *
 *   DisableTurnOrderDisplay
 *   - Turns off the Turn Order Display to be hidden in battle.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Fixed a bug that caused enemies to endlessly have turns if dynamic actions
 * were enabled.
 *
 * Version 1.01:
 * - Fixed some bugs that caused crashes when returning to the battle scene.
 * - Fixed a bug that altered the order flow during a Surprise Attack or a
 * Preemptive Attack for battle advantage.
 * - Made turn order display not cover up certain windows.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//==============================================================================
// Plugin Parameters
//==============================================================================

Navash.Parameters = PluginManager.parameters('Nav_EncounterBar');
Navash.Param = Navash.Param || {};

Navash.Param.EBWindowShow = eval(String(Navash.Parameters['Show Window']));

Navash.Param.EncBarWindowWidth = String(Navash.Parameters['Window Width']);
Navash.Param.EncBarWindowHeight = String(Navash.Parameters['Window Height']);
Navash.Param.EncBarWindowX = Number(Navash.Parameters['Window X Offset']);
Navash.Param.EncBarWindowY = Number(Navash.Parameters['Window Y Offset']);
Navash.Param.EncBarWindowOpacity = Number(Navash.Parameters['Window Opacity']);

Navash.Param.EncBarGaugeC1 = Number(Navash.Parameters['Gauge Color 1']);
Navash.Param.EncBarGaugeC2 = Number(Navash.Parameters['Gauge Color 2']);

Navash.Param.EBMessageHide = eval(String(Navash.Parameters['Message Hide Bar']));

//==============================================================================
// Plugin Commands
//==============================================================================

Navash.EncBar.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Navash.EncBar.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'HideEncounterGauge') {
    $gameSystem.setEncounterBarVisibility(false);
  } else if (command === 'ShowEncounterGauge') {
    $gameSystem.setEncounterBarVisibility(true);
  }
};

//==============================================================================
// Game_System
//==============================================================================

Navash.EncBar.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Navash.EncBar.Game_System_initialize.call(this);
    this.initEncounterBar();
};

Game_System.prototype.initEncounterBar = function() {
    this._showEncBar = Navash.Param.EBWindowShow;
};

Game_System.prototype.isShowEncounterBar = function() {
    if (this._showEncBar === undefined) this.initEncounterBar();
    return this._showEncBar;
};

Game_System.prototype.setEncounterBarVisibility = function(value) {
    if (this._showEncBar === undefined) this.initEncounterBar();
    this._showEncBar = value;
};
    
//==============================================================================
// Game_Player
//==============================================================================

Navash.InitGamePlayer = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    Navash.InitGamePlayer.call(this);
    this._totalEncounterSteps = 0;
};

Game_Player.prototype.makeEncounterCount = function() {
    var n = $gameMap.encounterStep();
    this._encounterCount = Math.randomInt(n) + Math.randomInt(n) + 1;
    this._totalEncounterSteps = this._encounterCount;
};

Game_Player.prototype.getTotalEncounterSteps = function() {
    return this._totalEncounterSteps;
};

Game_Player.prototype.getCurrentEncounterSteps = function() {
//    return this._currentEncounterSteps;
    return this._totalEncounterSteps - this._encounterCount;
};

//==============================================================================
// Scene_Map
//==============================================================================

Navash.EncBarCreate = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    Navash.EncBarCreate.call(this);
    if ($gamePlayer.canEncounter() && $gameMap.encounterList().length > 0) this.createEncounterWindow();
};

Scene_Map.prototype.createEncounterWindow = function() {
    this._encounterWindow = new Window_EncounterBar();
    this.addWindow(this._encounterWindow)
};

//==============================================================================
// Window_EncounterBar
//==============================================================================

function Window_EncounterBar() {
    this.initialize.apply(this, arguments);
}

Window_EncounterBar.prototype = Object.create(Window_Base.prototype);
Window_EncounterBar.prototype.constructor = Window_EncounterBar;

Window_EncounterBar.prototype.initialize = function() {
    var width = eval(Navash.Param.EncBarWindowWidth);
    var height = eval(Navash.Param.EncBarWindowHeight);
    height = Math.max(40, height);
    var x = Navash.Param.EncBarWindowX + Graphics.boxWidth - width;
    var y = Navash.Param.EncBarWindowY + Graphics.boxHeight - height; 
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._visibility = false;
    this._gaugeC1 = this.textColor(Navash.Param.EncBarGaugeC1);
    this._gaugeC2 = this.textColor(Navash.Param.EncBarGaugeC2);
    this._gaugeW = this.contents.width;
    this._gaugeW = Math.max(10, this._gaugeW);
    this._gaugeH = this.contents.height;
    this._gaugeH = Math.max(4, this._gaugeH);
    this.drawEncounterGauge(0, 0, this._gaugeW, this._gaugeH, 0, this._gaugeC1, this._gaugeC2);
    this.setOpacity();
};

Window_EncounterBar.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateEncBarVisible();
    var rate = $gamePlayer.getCurrentEncounterSteps() / $gamePlayer.getTotalEncounterSteps();
    this.drawEncounterGauge(0, 0, this._gaugeW, this.contents.height, rate, this._gaugeC1, this._gaugeC2);
};

Window_EncounterBar.prototype.encounterBarVisible = function() {
    if ($dataMap.note.match(/<\s*Hide\s*Encounter\s*Bar|Gauge\s*>/i)) return false;
    if (Navash.Param.EBMessageHide && $gameMessage.isBusy()) return false;
    if (!$gamePlayer.canEncounter()) return false;
    return $gameSystem.isShowEncounterBar();
};
    
Window_EncounterBar.prototype.updateEncBarVisible = function() {
    if (this._visibility === this.encounterBarVisible()) return;
    this._visibility = this.encounterBarVisible();
    this.visible = this.encounterBarVisible();
};

Window_EncounterBar.prototype.drawEncounterBar = function() {
    var width = this.contents.width;
    var height = this.contents.height;
    height = Math.max(5, height);
    var x = this.contents.width - width;
    var y = 0;
    var color1 = this.textColor(14);
    var color2 = this.textColor(17);
    var rate = $gamePlayer.getCurrentEncounterSteps() / $gamePlayer.getTotalEncounterSteps();
    this.drawEncounterGauge(x, y, width, height, rate, color1, color2);
};

Window_EncounterBar.prototype.setOpacity = function() {
    this.opacity = Navash.Param.EncBarWindowOpacity;
};

Window_EncounterBar.prototype.drawEncounterGauge = function(dx, dy, dw, dh, rate, color1, color2) {
  var color3 = this.gaugeBackColor();
  var fillW = Math.floor(dw * rate).clamp(0, dw);
  var gaugeH = dh;
  var gaugeY = dy;
  if (Imported.YEP_CoreEngine && eval(Yanfly.Param.GaugeOutline)) {
    color3.paintOpacity = this.translucentOpacity();
    gaugeY = Math.max(1, gaugeY);
    this.contents.fillRect(dx, gaugeY - 1, dw, gaugeH, color3);
    fillW = Math.max(fillW - 2, 0);
    gaugeH -= 2;
    dx += 1;
  } else {
    var fillW = Math.floor(dw * rate);
    var gaugeY = dy;
    this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
  }
  this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
};

//==============================================================================
// End Of File
//==============================================================================
