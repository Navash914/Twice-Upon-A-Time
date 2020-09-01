//=============================================================================
// Navash Plugins - Random Encounter Bar v1.20
// Navash_EncounterBar.js
//=============================================================================

var Imported = Imported || {};
Imported.Navash_EncounterBar = true;

var Navash = Navash || {};
Navash.EncBar = Navash.EncBar || {};
Navash.EncBar.version = 1.20;

//=============================================================================
 /*:
 * @plugindesc v1.10 Displays a gauge on the map that fills up the closer
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
 * @desc This is the width of the Encounter Bar Window.
 * Input a formula or a number.
 * @default Graphics.boxWidth / 4
 *
 * @param Window Height
 * @desc This is the height of the Encounter Bar Window.
 * Input a formula or a number.
 * @default this.fittingHeight(1)
 *
 * @param Window X Offset
 * @desc This is the X Offset of the Encounter Bar Window.
 * Input a number.
 * @default 0
 *
 * @param Window Y Offset
 * @desc This is the Y Offset of the Encounter Bar Window.
 * Input a number.
 * @default 0
 *
 * @param Window Opacity
 * @desc This is the opacity of the Encounter Bar Window. Set to 0
 * to make window transparent (player will see gauge only).
 * @default 255
 *
 * @param Message Hide Bar
 * @desc Automatically hide Encounter Gauge when message window
 * is open?
 * @default true
 *
 * @param --- Gauge Settings ---
 * @default
 *
 * @param Gauge Color 1
 * @desc This is color 1 of the Encounter Gauge if rate based colors
 * are not used.
 * @default 14
 *
 * @param Gauge Color 2
 * @desc This is color 2 of the Encounter Gauge if rate based colors
 * are not used.
 * @default 17
 *
 * @param - Rate Based Colors -
 * @default
 *
 * @param Use Rate Based Colors?
 * @desc Change color of gauge based on how filled it is? All of
 * the following rate parameters must be filled if set to true.
 * @default false
 *
 * @param Rate > 90%
 * @desc The gauge colors when the gauge is more than 90% filled.
 * Format: color1, color2.  Example: 18, 10
 * @default 18, 10
 *
 * @param Rate 80% to 89%
 * @desc The gauge colors when the gauge is between 80-89% filled.
 * Format: color1, color2.  Example: 18, 10
 * @default 18, 10
 *
 * @param Rate 70% to 79%
 * @desc The gauge colors when the gauge is between 70-79% filled.
 * Format: color1, color2.  Example: 14, 10
 * @default 14, 10
 *
 * @param Rate 60% to 69%
 * @desc The gauge colors when the gauge is between 60-69% filled.
 * Format: color1, color2.  Example: 14, 10
 * @default 14, 10
 *
 * @param Rate 50% to 59%
 * @desc The gauge colors when the gauge is between 50-59% filled.
 * Format: color1, color2.  Example: 14, 17
 * @default 14, 17
 *
 * @param Rate 40% to 49%
 * @desc The gauge colors when the gauge is between 40-49% filled.
 * Format: color1, color2.  Example: 14, 17
 * @default 14, 17
 *
 * @param Rate 30% to 39%
 * @desc The gauge colors when the gauge is between 30-39% filled.
 * Format: color1, color2.  Example: 22, 23
 * @default 22, 23
 *
 * @param Rate 20% to 29%
 * @desc The gauge colors when the gauge is between 20-29% filled.
 * Format: color1, color2.  Example: 22, 23
 * @default 22, 23
 *
 * @param Rate 10% to 19%
 * @desc The gauge colors when the gauge is between 10-19% filled.
 * Format: color1, color2.  Example: 11, 3
 * @default 11, 3
 *
 * @param Rate < 10%
 * @desc The gauge colors when the gauge is less than 10 filled.
 * Format: color1, color2.  Example: 11, 3
 * @default 11, 3
 *
 * @param --- Custom Background Settings ---
 * @default
 *
 * @param Use Custom Image?
 * @desc Use a custom image behind the encounter bar?
 * Window is automatically made transparent if custom image is used.
 * @default false
 *
 * @param Image Filename
 * @desc The filename for the custom image.
 * @default Encounter Bar
 *
 * @param Image X Offset
 * @desc The X offset for the custom image.
 * @default 0
 *
 * @param Image Y Offset
 * @desc The Y offset for the custom image.
 * @default 0
 *
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a window with a gauge on the game map.
 * The gauge fills up as the player gets closer to an encounter. Encounter is
 * triggered when the gauge is full.
 *
 * The bar only appears if the map has random encounters designated on it
 * and encounters are enabled (so if the party has the no encounter flag, for
 * example, the bar will not be shown).
 *
 * Note that this plugin does not affect the way encounters are handled.
 * Encounters are still handled by the default system (step count in map).
 * It merely gives a visual representation of how close the next encounter is.
 *
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * Show Window
 *
 * This parameter defines whether the encounter window will be shown by default.
 * 
 * Message Hide Bar
 *
 * This decides whether the encounter bar will automaticall be hidden
 * whenever the message window is open. This is either true or false.
 *
 * It is recommended to keep this true, as the gauge would otherwise
 * be drawn over the message window, which does not look pretty.
 *
 * 
 * Window Width   and   Window Height
 *
 * The window width and height of the encounter bar. These can be a formula.
 * Example: Graphics.boxWidth / 4
 * 
 * Use the Window Width and Window Height Parameters to edit the size of the
 * encounter bar window.
 *
 *
 * Window X Offset   and    Window Y Offset
 *
 * The X and Y offset of the encounter bar. These are numbers.
 *
 * By default, the window is set at the bottom right corner of the screen.
 * You can use these parameters to move the window to a position of your choosing.
 *
 *
 * Window Opacity
 *
 * This is the opacity setting for the encounter bar window (this does
 * not affect the opacity of the gauge). This is a number.
 *
 * You can use this value to set the opacity of the window behind the gauge.
 * This parameter can be set to 0 so that only the gauge is visible.
 *
 *
 * Gauge Color 1   and   Gauge Color 2
 *
 * These are the gauge colors for the encounter gauge. These are numbers
 * representing the text color.
 * Gauge color 1 is the color to the left of the gauge.
 * Gauge color 2 is the color to the right of the gauge.
 *
 * If rate based colors are used, these parameters are ignored.
 *
 *
 * -- Rate Based Colors --
 *
 * You can make the gauge change color based on how filled it is.
 * The following parameters are available for customizing the colors.
 *
 * Use Rate Based Colors?
 *
 * Sets whether the color will change based on the gauge rate.
 * If set to false, the gauge will be the same color regardless of rate.
 * (The colors from parameter Gauge Color 1 and Gauge Color 2 will be used).
 *
 * If set to true, the gauge will change color based on the rate.
 * All of the rate parameters must be filled if this is set to true.
 *
 *
 * Rate >= 90%
 * Rate 80% to 89%
 * ...
 * Rate 10% to 19%
 * Rate <= 10%
 *
 * These parameters define the gauge color when it is filled as per the
 * defined rate. For example, if the gauge is 57% filled, it will use the
 * color defined in the 'Rate 50% to 59%' parameter, and so on.
 *
 * These paramters should be filled in the form color1, color2.
 * color1 is the gauge color 1 for that rate.
 * color2 is the gauge color 2 for that rate.
 *
 * Example: 14, 17.      
 * This sets gauge color 1 to 14 and gauge color 2 to 17 for that rate boundary.
 *
 * If rate colors are not used ('Use Rate Colors?' parameter is set to false),
 * these parameters can be ignored.
 *
 *
 *  --------  Using Custom Backgrounds  ------------
 *
 * If you wish to use a custom background for the encounter bar, place the
 * image in your projects img/system folder.
 *
 * The following paramters are available to adjusting the image.
 *
 *
 * Use Custom Image?
 *
 * Set to true if you wish to use a custom background for the encounter bar.
 * Encounter bar window is automatically made transparent if set to true.
 *
 * Image Filename
 *
 * The Filename of the custom background you want to use.
 * Do not include the file extension. The image file should be placed in the
 * img/system folder.
 *
 * Image X Offset   and   Image Y Offset
 *
 * By default, the custom image is drawn from where the window would start.
 * Use these parameters to move your custom image around to fit your project.
 * These should be numbers.
 *
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * To show or hide the Encounter Bar, use the following Plugin Commands:
 *
 *   HideEncounterGauge
 *   ShowEncounterGauge
 *
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * - Free for use in both commercial and non-commercial projects, as long
 *   as credit is given.
 * - Credit me as Navash.
 *
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.20:
 * - Added ability to set gauge color based on rate.
 * - Removed some redundant code I forgot to remove earlier.
 *
 * Version 1.10:
 * - Added ability to add custom backgrounds for the encounter gauge.
 *
 * Version 1.00:
 * - Initial Release.
 */
//=============================================================================

//==============================================================================
// Plugin Parameters
//==============================================================================

Navash.Parameters = PluginManager.parameters('Navash_EncounterBar');
Navash.Param = Navash.Param || {};

Navash.Param.EBWindowShow = eval(String(Navash.Parameters['Show Window']));

Navash.Param.EncBarWindowWidth = String(Navash.Parameters['Window Width']);
Navash.Param.EncBarWindowHeight = String(Navash.Parameters['Window Height']);
Navash.Param.EncBarWindowX = Number(Navash.Parameters['Window X Offset']);
Navash.Param.EncBarWindowY = Number(Navash.Parameters['Window Y Offset']);
Navash.Param.EncBarWindowOpacity = Number(Navash.Parameters['Window Opacity']);

Navash.Param.EncBarGaugeC1 = Number(Navash.Parameters['Gauge Color 1']);
Navash.Param.EncBarGaugeC2 = Number(Navash.Parameters['Gauge Color 2']);

Navash.Param.EncBarUseCustomImage = eval(String(Navash.Parameters['Use Custom Image?']));
Navash.Param.EncBarCustomImage = String(Navash.Parameters['Image Filename']);
Navash.Param.EncBarImageX = Number(Navash.Parameters['Image X Offset']);
Navash.Param.EncBarImageY = Number(Navash.Parameters['Image Y Offset']);

Navash.Param.EBMessageHide = eval(String(Navash.Parameters['Message Hide Bar']));

Navash.Param.EBUseRateColor = eval(String(Navash.Parameters['Use Rate Based Colors?']));
Navash.Param.EBRateColor90 = String(Navash.Parameters['Rate > 90%']);
Navash.Param.EBRateColor90 = Navash.Param.EBRateColor90.split(',');
Navash.Param.EBRateColor80 = String(Navash.Parameters['Rate 80% to 89%']);
Navash.Param.EBRateColor80 = Navash.Param.EBRateColor80.split(',');
Navash.Param.EBRateColor70 = String(Navash.Parameters['Rate 70% to 79%']);
Navash.Param.EBRateColor70 = Navash.Param.EBRateColor70.split(',');
Navash.Param.EBRateColor60 = String(Navash.Parameters['Rate 60% to 69%']);
Navash.Param.EBRateColor60 = Navash.Param.EBRateColor60.split(',');
Navash.Param.EBRateColor50 = String(Navash.Parameters['Rate 50% to 59%']);
Navash.Param.EBRateColor50 = Navash.Param.EBRateColor50.split(',');
Navash.Param.EBRateColor40 = String(Navash.Parameters['Rate 40% to 49%']);
Navash.Param.EBRateColor40 = Navash.Param.EBRateColor40.split(',');
Navash.Param.EBRateColor30 = String(Navash.Parameters['Rate 30% to 39%']);
Navash.Param.EBRateColor30 = Navash.Param.EBRateColor30.split(',');
Navash.Param.EBRateColor20 = String(Navash.Parameters['Rate 20% to 29%']);
Navash.Param.EBRateColor20 = Navash.Param.EBRateColor20.split(',');
Navash.Param.EBRateColor10 = String(Navash.Parameters['Rate 10% to 19%']);
Navash.Param.EBRateColor10 = Navash.Param.EBRateColor10.split(',');
Navash.Param.EBRateColor00 = String(Navash.Parameters['Rate < 10%']);
Navash.Param.EBRateColor00 = Navash.Param.EBRateColor00.split(',');

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
    return this._totalEncounterSteps - this._encounterCount;
};

//==============================================================================
// Scene_Map
//==============================================================================

Navash.EncBarCreate = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    Navash.EncBarCreate.call(this);
    if ($gameMap.encounterList().length > 0) this.createEncounterWindow();
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
    width = Math.max(45, width);
    var height = eval(Navash.Param.EncBarWindowHeight);
    height = Math.max(40, height);
    var x = Navash.Param.EncBarWindowX + Graphics.boxWidth - width;
    var y = Navash.Param.EncBarWindowY + Graphics.boxHeight - height; 
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    if (Navash.Param.EncBarUseCustomImage) {
    var filename = Navash.Param.EncBarCustomImage;
    var imgx = Navash.Param.EncBarImageX;
    var imgy = Navash.Param.EncBarImageY;
    this.createCustomBackground(filename, imgx, imgy);
    }
    this._visibility = false;
    if (Navash.Param.EBUseRateColor) {
    this._gaugeC1 = this.setRateColor1(0);
    this._gaugeC2 = this.setRateColor2(0);
    } else {
    this._gaugeC1 = this.textColor(Navash.Param.EncBarGaugeC1);
    this._gaugeC2 = this.textColor(Navash.Param.EncBarGaugeC2);
    }
    this._gaugeW = this.contents.width;
    this._gaugeW = Math.max(9, this._gaugeW);
    this._gaugeH = this.contents.height;
    this._gaugeH = Math.max(4, this._gaugeH);
    this.drawEncounterGauge(0, 0, this._gaugeW, this._gaugeH, 0, this._gaugeC1, this._gaugeC2);
    this.setOpacity();
};

Window_EncounterBar.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateEncBarVisible();
    var rate = $gamePlayer.getCurrentEncounterSteps() / $gamePlayer.getTotalEncounterSteps();
    if (Navash.Param.EBUseRateColor) {
        this._gaugeC1 = this.setRateColor1(rate);
        this._gaugeC2 = this.setRateColor2(rate);
    }
    this.drawEncounterGauge(0, 0, this._gaugeW, this.contents.height, rate, this._gaugeC1, this._gaugeC2);
};

Window_EncounterBar.prototype.encounterBarVisible = function() {
    if (Navash.Param.EBMessageHide && $gameMessage.isBusy()) return false;
    if (!$gamePlayer.canEncounter()) return false;
    return $gameSystem.isShowEncounterBar();
};
    
Window_EncounterBar.prototype.updateEncBarVisible = function() {
    if (this._visibility === this.encounterBarVisible()) return;
    this._visibility = this.encounterBarVisible();
    this.visible = this.encounterBarVisible();
};

Window_EncounterBar.prototype.setOpacity = function() {
    if (Navash.Param.EncBarUseCustomImage) {
        this.opacity = 0;
    } else {
    this.opacity = Navash.Param.EncBarWindowOpacity;
    }
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

Window_EncounterBar.prototype.createCustomBackground = function(filename, imgx, imgy) {
    this._EncBarImage = new Sprite();
    this._EncBarImage.bitmap = ImageManager.loadSystem(filename);
    this._EncBarImage.anchor.x = 0;
    this._EncBarImage.anchor.y = 0;
    var width = this._EncBarImage.width;
    var height = this._EncBarImage.height;
    this._EncBarImage.move(imgx, imgy);
    this.addChildToBack(this._EncBarImage);
};


Window_EncounterBar.prototype.setRateColor1 = function(rate) {
    var colorId = 0;
    if (rate >= 0.9) {
        colorId = Number(Navash.Param.EBRateColor90[0]);
    } else if (rate >= 0.8) {
        colorId = Number(Navash.Param.EBRateColor80[0]);
    } else if (rate >= 0.7) {
        colorId = Number(Navash.Param.EBRateColor70[0]);
    } else if (rate >= 0.6) {
        colorId = Number(Navash.Param.EBRateColor60[0]);
    } else if (rate >= 0.5) {
        colorId = Number(Navash.Param.EBRateColor50[0]);
    } else if (rate >= 0.4) {
        colorId = Number(Navash.Param.EBRateColor40[0]);
    } else if (rate >= 0.3) {
        colorId = Number(Navash.Param.EBRateColor30[0]);
    } else if (rate >= 0.2) {
        colorId = Number(Navash.Param.EBRateColor20[0]);
    } else if (rate >= 0.1) {
        colorId = Number(Navash.Param.EBRateColor10[0]);
    } else {
        colorId = Number(Navash.Param.EBRateColor00[0]);
    }
    return this.textColor(colorId);
};

Window_EncounterBar.prototype.setRateColor2 = function(rate) {
    var colorId = 0;
    if (rate >= 0.9) {
        colorId = Number(Navash.Param.EBRateColor90[1]);
    } else if (rate >= 0.8) {
        colorId = Number(Navash.Param.EBRateColor80[1]);
    } else if (rate >= 0.7) {
        colorId = Number(Navash.Param.EBRateColor70[1]);
    } else if (rate >= 0.6) {
        colorId = Number(Navash.Param.EBRateColor60[1]);
    } else if (rate >= 0.5) {
        colorId = Number(Navash.Param.EBRateColor50[1]);
    } else if (rate >= 0.4) {
        colorId = Number(Navash.Param.EBRateColor40[1]);
    } else if (rate >= 0.3) {
        colorId = Number(Navash.Param.EBRateColor30[1]);
    } else if (rate >= 0.2) {
        colorId = Number(Navash.Param.EBRateColor20[1]);
    } else if (rate >= 0.1) {
        colorId = Number(Navash.Param.EBRateColor10[1]);
    } else {
        colorId = Number(Navash.Param.EBRateColor00[1]);
    }
    return this.textColor(colorId);
};


//==============================================================================
// End Of File
//==============================================================================
