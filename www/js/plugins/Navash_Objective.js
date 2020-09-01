var pluginCommandAlias = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  pluginCommandAlias.call(this, command, args);
  if (command === 'DisableObjective') {
    $gameSystem.setObjWindowVisibility(false);
  } else if (command === 'EnableObjective') {
    $gameSystem.setObjWindowVisibility(true);
  }
};

// =================================================

var systemInitAlias = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    systemInitAlias.call(this);
    this.initObjWindow();
};

Game_System.prototype.initObjWindow = function() {
    this._showObjWindow = true;
};

Game_System.prototype.isShowObjWindow = function() {
    if (this._showObjWindow === undefined) this.initObjWindow();
    return this._showObjWindow;
};

Game_System.prototype.setObjWindowVisibility = function(value) {
    if (this._showObjWindow === undefined) this.initObjWindow();
    this._showObjWindow = value;
};

//=======================================================

var windowCreateAlias = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    windowCreateAlias.call(this);
    this.createObjectiveWindow();
};

Scene_Map.prototype.createObjectiveWindow = function() {
    this._objWindow = new Window_Objective();
    this.addChild(this._objWindow);
};

function Window_Objective() {
    this.initialize.apply(this, arguments);
}

Window_Objective.prototype = Object.create(Window_Base.prototype);
Window_Objective.prototype.constructor = Window_Objective;

Window_Objective.prototype.initialize = function() {
    var wx = this.standardPadding() * -1;
   // var wy = Graphics.boxHeight - this.fittingHeight(2) - this.standardPadding();
    var wy = this.lineHeight();
    var ww = Graphics.boxWidth + this.standardPadding() * 2;
    var wh = this.fittingHeight(2);
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.initText();
    this._visibility = false;
};

Window_Objective.prototype.initText = function() {
    this._text = '';
};

Window_Objective.prototype.standardFontSize = function() {
    return 28;
};

Window_Objective.prototype.updateObjVisibility = function() {
    if (this._visibility === this.isObjVisible()) return;
    this._visibility = this.isObjVisible();
    this.visible = this.isObjVisible();
};

Window_Objective.prototype.isObjVisible = function() {
    if ($gameMessage.isBusy()) return false;
    if ($gameMap.isEventRunning()) return false;
    return $gameSystem.isShowObjWindow();
};

Window_Objective.prototype.update = function() {
    Window_Base.prototype.update.call(this);
this.updateObjVisibility();

if (this.isObjVisible()) {
if (this.isFading()) {
 if (this._fadeIn) this.updateFadeIn();
 if (this._fadeOut) this.updateFadeOut();
} else {
    if (Input.isRepeated('pageup')) {
    if (this.contentsOpacity >= 255) {
        this._fadeOut = true;
        this._fadeIn = false;
    } else if (this.contentsOpacity <= 0) {
        this._fadeIn = true;
        this._fadeOut = false;
    }
    }
    if (this.contentsOpacity <= 0) {
        this.updateText();
        this.refresh();
    }
}
}
};

Window_Objective.prototype.isFading = function() {
    if (this._fadeIn) return true;
    if (this._fadeOut) return true;
    return false;
};

Window_Objective.prototype.updateFadeIn = function() {
    this.contentsOpacity += 16;
    if (this.contentsOpacity >= 255) this._fadeIn = false;
};

Window_Objective.prototype.updateFadeOut = function() {
    this.contentsOpacity -= 16;
    if (this.contentsOpacity <= 0) this._fadeOut = false;
};

Window_Objective.prototype.updateText = function() {
    if (this._text === undefined) this.initText();
    this._text = $gameVariables.value(18);
};

Window_Objective.prototype.refresh = function() {
    this.contents.clear();
    this.drawObjectiveBackground();
    this.drawObjectiveText();
  //  this.clear();
};



var maskAlias =
    WindowLayer.prototype._webglMaskWindow;
WindowLayer.prototype._webglMaskWindow = function(renderSession, win) {
    if (win._ignoreMask) return;
    maskAlias.call(this, renderSession, win);
};



Window_Objective.prototype.drawObjectiveBackground = function() {
    var width = this.contentsWidth();
    this.drawBackground(0, 0, width, this.lineHeight() * 2);
};

Window_Objective.prototype.dimColor1 = function() {
    return 'rgba(0, 0, 0, 0.6)';
};

Window_Objective.prototype.dimColor2 = function() {
    return 'rgba(0, 0, 0, 0.3)';
};

Window_Objective.prototype.drawBackground = function(wx, wy, ww, wh) {
    var color1 = this.dimColor1();
    var color2 = this.dimColor2();
    var ww1 = Math.ceil(ww * 0.25)
    var ww2 = Math.ceil(ww * 0.75)
    this.contents.gradientFillRect(wx, wy, ww1, wh, color1, color1);
    this.contents.gradientFillRect(ww1, wy, ww2, wh, color1, color2);
};

Window_Objective.prototype.drawObjectiveText = function() {
    var text = '\\i[407]' + this._text;
    var wx = this.standardPadding();
    var wy = this.contents.height / 2 - this.lineHeight() / 2;
    this.drawTextEx(text, wx, wy);
};