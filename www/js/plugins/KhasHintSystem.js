// This plugin was compiled from Sapphire Script v0.2 Beta
// Sapphire Script by Khas (arcthunder.blogspot.com/p/sapphire-script.html)
//=====================================================================================================================
// * KhasHintSystem
//=====================================================================================================================
if (!(Khas && Khas.Graphics && Khas.Graphics.version >= 1.0)) {
  var current_plugin = "KhasHintSystem";
  var missing_plugin = "KhasGraphics";
  var missingVersion = 1.0;
  alert("Please install " + (missing_plugin) + " v" + (missingVersion) + " in order to use " + (current_plugin) + "");
};
Khas.Hint = {};
Khas.Hint.version = 1.0;
/*:
 * @plugindesc [1.0] Hint/Tutorial System
 * 
 * @author Nilo K. (Khas - arcthunder.blogspot.com)
 * 
 * @param Font name
 * @desc The name of the font used for hints.
 * @default Arial
 *
 * @param Font size
 * @desc The size of the font used for hints.
 * @default 16
 *
 * @param Title bold
 * @desc [ON/OFF] Font style.
 * @default OFF
 *
 * @param Title italic
 * @desc [ON/OFF] Font style.
 * @default OFF
 *
 * @param Message bold
 * @desc [ON/OFF] Font style.
 * @default OFF
 *
 * @param Message italic
 * @desc [ON/OFF] Font style.
 * @default OFF
 *
 * @param Title color
 * @desc The color of the hint title.
 * An hexadecimal color (#000000 - #ffffff)
 * @default #ff9009
 *
 * @param Message color
 * @desc The color of the hint message.
 * An hexadecimal color (#000000 - #ffffff)
 * @default #ffffff
 *
 * @param Background color
 * @desc The color of the hint background.
 * An hexadecimal color (#000000 - #ffffff)
 * @default #000000
 *
 * @param Background opacity
 * @desc The opacity of the hint background.
 * A number from 0 to 100
 * @default 70
 *
 * @param Maximum width
 * @desc The maximum width for hint boxes.
 * @default 192
 *
 * @param Margin
 * @desc The margin around hint texts, in pixels.
 * @default 4
 *
 * @param Range
 * @desc The range within the hint is visible.
 * A number, in pixels.
 * @default 192
 *
 * @param Fade
 * @desc The number of pixels to smoothly 
 * fade the hint.
 * @default 96
 *
 * 
 * @help - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * [MV] Khas Hint/Tutorial System
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * By Nilo K. (Khas)
 *  * Version 1.0
 *  * Released on 05.10.2017
 * 
 *  * Social Media
 * Blog: arcthunder.blogspot.com
 * Patreon: patreon.com/khas
 * Facebook: facebook.com/khasarc
 * Twitter: twitter.com/arcthunder
 * Youtube: youtube.com/c/khasarc
 * 
 *  * Tutorials, support and more plugins!
 * arcthunder.blogspot.com/p/rpg-maker-mv-plugins.html
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Support my work
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * If you find my plugins useful and you would like to support my work, now
 * you can do it by becoming my patron! 
 * 
 * Please check my page at patreon.com/khas
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Terms of Use
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * If you want to use this plugin with a free RPG Maker game, you can do it for
 * free and there's no need to contact me. I only ask you to give credit to
 * "Khas" or "Khas Custom Scripts" somewhere in your game. You may include 
 * my blog url if you want.
 * 
 * This plugin is NOT FREE for COMMERCIAL use. If you want to use it on a
 * commercial title, please email me (see "Contact" on my blog). Alternatively, 
 * you may help me to achieve a Patreon goal to make all of them free for 
 * commercial use!
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Instructions
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Please visit my blog at the link below:
 * arcthunder.blogspot.com/p/rpg-maker-mv-plugins.html
 *
 * You will find a tutorial on how to install my plugins and how to use this
 * plugin. In addition, there are links to support threads, if you need help.
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Log
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Version 1.0 (05.10.2017)
 * First release!
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 */;
Khas.Hint.PARAMETERS = PluginManager.parameters("KhasHintSystem");
Khas.Hint.FONT_NAME = Khas.Hint.PARAMETERS["Font name"];
Khas.Hint.FONT_SIZE = Number(Khas.Hint.PARAMETERS["Font size"]);
Khas.Hint.TITLE_BOLD = Khas.Hint.PARAMETERS["Title bold"].toLowerCase() == "on";
Khas.Hint.TITLE_ITALIC = Khas.Hint.PARAMETERS["Title italic"].toLowerCase() == "on";
Khas.Hint.MESSAGE_BOLD = Khas.Hint.PARAMETERS["Message bold"].toLowerCase() == "on";
Khas.Hint.MESSAGE_ITALIC = Khas.Hint.PARAMETERS["Message italic"].toLowerCase() == "on";
Khas.Hint.TITLE_COLOR = Khas.Hint.PARAMETERS["Title color"];
Khas.Hint.MESSAGE_COLOR = Khas.Hint.PARAMETERS["Message color"];
Khas.Hint.BACKGROUND_COLOR = parseInt(Khas.Hint.PARAMETERS["Background color"].replace(/^#/, ''), 16);;
Khas.Hint.BACKGROUND_OPACITY = Number(Khas.Hint.PARAMETERS["Background opacity"]).clamp(0, 100) / 100.0;
Khas.Hint.MAX_WIDTH = Number(Khas.Hint.PARAMETERS["Maximum width"]);
Khas.Hint.MARGIN = Number(Khas.Hint.PARAMETERS["Margin"]);
Khas.Hint.RANGE = Number(Khas.Hint.PARAMETERS["Range"]);
Khas.Hint.FADE = Number(Khas.Hint.PARAMETERS["Fade"]);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game Event
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  Object.defineProperty(Game_Event.prototype, 'hintTitle', { get: function() { return this._hintTitle; }, });
  Object.defineProperty(Game_Event.prototype, 'hintMessage', { get: function() { return this._hintMessage; }, });
  Game_Event.prototype.khs_initialize = Game_Event.prototype.initialize;
  Game_Event.prototype.khs_khasScanComments = Game_Event.prototype.khasScanComments;
  Game_Event.prototype.initialize = function(mapId, eventId) {
    this.clearHint();
    this.khs_initialize(mapId, eventId);
  };
  Game_Event.prototype.clearHint = function() {
    this._hintTitle = null;
    this._hintMessage = "";
  };
  Game_Event.prototype.khasScanComments = function() {
    this.khs_khasScanComments();
    this.clearHint();
    if (this.page()) {
      var list = this.list(), khasTag;
      var hint = false;
      if (list) {
        for (var i = 0; i < list.length; i++) {
          if (list[i] && list[i].code == 108) {
            hint = false;
            var command = list[i].parameters[0];
            if (khasTag = command.khasTag()) {
              hint = khasTag[1].toLowerCase() == "hint";
            };
          } else if (list[i] && list[i].code == 408) {
            if (hint) {
              if (this._hintTitle) {
                this._hintMessage += (list[i].parameters[0] + " ");
              } else {
                this._hintTitle = list[i].parameters[0];
              };
            };
          };
        };
      };
      if (this._hintTitle && $khasGraphics.hintSystem) $khasGraphics.hintSystem.addHint(new Khas_Hint(this, this._hintTitle, this._hintMessage));
    };
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Khas Hint
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function Khas_Hint() { this.initialize.apply(this, arguments); }; 
  Object.defineProperty(Khas_Hint.prototype, 'sprite', { get: function() { return this._sprite; }, });
  Object.defineProperty(Khas_Hint.prototype, 'destroy', { get: function() { return this._destroy; }, });
  Object.defineProperty(Khas_Hint.prototype, 'event', { get: function() { return this._event; }, });
  Khas_Hint.prototype.initialize = function(event, title, message) {
    this._event = event;
    this._destroy = false;
    this._title = title;
    this._message = message;
    this._hasMessage = this._message.length > 0;
    this._sprite = new PIXI.Sprite();
    var titleStyle = new PIXI.TextStyle({ fontFamily: Khas.Hint.FONT_NAME, fontSize: Khas.Hint.FONT_SIZE, fill: Khas.Hint.TITLE_COLOR, wordWrap: true, wordWrapWidth: Khas.Hint.MAX_WIDTH });
    var messageStyle =  new PIXI.TextStyle({ fontFamily: Khas.Hint.FONT_NAME, fontSize: Khas.Hint.FONT_SIZE, fill: Khas.Hint.MESSAGE_COLOR, wordWrap: true, wordWrapWidth: Khas.Hint.MAX_WIDTH });
    if (Khas.Hint.TITLE_ITALIC) titleStyle.fontStyle = 'italic';
    if (Khas.Hint.TITLE_BOLD) titleStyle.fontWeight = 'bold';
    if (Khas.Hint.MESSAGE_ITALIC) messageStyle.fontStyle = 'italic';
    if (Khas.Hint.MESSAGE_BOLD) messageStyle.fontWeight = 'bold';
    var hintTitle = new PIXI.Text(this._title, titleStyle);
    hintTitle.x = Khas.Hint.MARGIN;
    hintTitle.y = Khas.Hint.MARGIN;
    if (this._hasMessage) {
      var hintMessage = new PIXI.Text(this._message, messageStyle);
      hintMessage.x = Khas.Hint.MARGIN;
      hintMessage.y = hintTitle.height + Khas.Hint.MARGIN * 2;
    };
    this._width = Math.max(hintTitle.width, (this._hasMessage ? hintMessage.width : 0)) + Khas.Hint.MARGIN * 2;
    this._height = hintTitle.height + (this._hasMessage ? hintMessage.height : 0) + Khas.Hint.MARGIN * (this._hasMessage ? 3 : 2);
    var hintBackground = new PIXI.Graphics();;
    hintBackground.beginFill(Khas.Hint.BACKGROUND_COLOR, Khas.Hint.BACKGROUND_OPACITY);;
    hintBackground.drawRect(0, 0, this._width, this._height);;
    hintBackground.endFill();;
    this._sprite.addChild(hintBackground);
    this._sprite.addChild(hintTitle);
    if (this._hasMessage) this._sprite.addChild(hintMessage);
  };
  Khas_Hint.prototype.setPos = function(x, y) {
    this._sprite.x = x - Math.round(this._width * 0.5);
    this._sprite.y = y - Math.round(this._height * 0.5);
  };
  Khas_Hint.prototype.setAlpha = function(a) {
    this._sprite.visible = a > 0;
    this._sprite.alpha = a.clamp(0.0, 1.0);
  };
  Khas_Hint.prototype.update = function() {
    if (this._title != this._event.hintTitle || this._message != this._event.hintMessage) this._destroy = true;
    var cx = Math.round(($gameMap.adjustX(this._event._realX) + 0.5) * $gameMap.tileWidth() + $gameScreen.shake());
    var cy = Math.round(($gameMap.adjustY(this._event._realY) + 0.5) * $gameMap.tileHeight());
    this.setPos(cx, cy);
    var dx = $gamePlayer.screenX() - cx;
    var dy = $gamePlayer.screenY() - $gameMap.tileHeight() * 0.5 - cy;
    var distance = Math.sqrt(dx * dx + dy * dy);
    this.setAlpha(1.0 - (distance - Khas.Hint.RANGE) / Khas.Hint.FADE);
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Khas HintSystem
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function Khas_HintSystem() { this.initialize.apply(this, arguments); }; 
  Object.defineProperty(Khas_HintSystem.prototype, 'layer', { get: function() { return this._layer; }, });
  Khas_HintSystem.prototype.initialize = function() {
    this._hints = [];
    this._layer = new PIXI.Container();
  };
  Khas_HintSystem.prototype.update = function() {
    for (var i = 0; i < this._hints.length; i++) {
      this._hints[i].update();
      if (this._hints[i].destroy) {
        this.deleteHint(this._hints[i]);
        i -= 1;
      };
    };
  };
  Khas_HintSystem.prototype.addHint = function(hint) {
    this._hints.push(hint);
    this._layer.addChild(hint.sprite);
  };
  Khas_HintSystem.prototype.deleteHint = function(hint) {
    this._hints.remove(hint);
    this._layer.removeChild(hint.sprite);
  };
  Khas_HintSystem.prototype.addMapHints = function() {
    var events = $gameMap.events();
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      if (event.hintTitle) this.addHint(new Khas_Hint(event, event.hintTitle, event.hintMessage));
    };
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Khas Graphics
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  Object.defineProperty(Khas_Graphics.prototype, 'hintSystem', { get: function() { return this._hintSystem; }, });
  Khas_Graphics.prototype.khs_newScene = Khas_Graphics.prototype.newScene;
  Khas_Graphics.prototype.khs_updateScene = Khas_Graphics.prototype.updateScene;
  Khas_Graphics.prototype.khs_clearScene = Khas_Graphics.prototype.clearScene;
  Khas_Graphics.prototype.newScene = function() {
    this.khs_newScene();
    switch (this._spriteset.khasType()) {
    case "map": 
      this._hintSystem = new Khas_HintSystem();
      this._hintSystem.addMapHints();
      this._spriteset.addChild(this._hintSystem.layer);
      break;
    };
  };
  Khas_Graphics.prototype.updateScene = function() {
    this.khs_updateScene();
    if (this._hintSystem) this._hintSystem.update();
  };
  Khas_Graphics.prototype.clearScene = function() {
    this._hintSystem = null;
    this.khs_clearScene();
  };
//=====================================================================================================================
// * End of Plugin
//=====================================================================================================================