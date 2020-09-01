/*:
 * @param Fill Text
 * @default Hello World
 *
 * @param Text Size
 * @default 28
 *
 * @param Text Color
 * @default 0
 *
 * @param Text Italic
 * @default true
 *
 * @param Window Height
 * @default 1
 *
 * @param Window Opacity
 * @default 255
 *
 * @param Window X Offset
 * @default 0
 *
 * @param Window Y Offset
 * @default 0
 *
 */

var parameters = PluginManager.parameters('TitleWorkInProgress');

var fillText = String(parameters['Fill Text']);
var textSize = Number(parameters['Text Size']);
var textColor = Number(parameters['Text Color']);
var textItalic = Number(parameters['Text Italic']);
textItalic = eval(textItalic);
var windowHeight = Number(parameters['Window Height']);
var opac = Number(parameters['Window Opacity']);
var xShift = Number(parameters['Window X Offset']);
var yShift = Number(parameters['Window Y Offset']);

var Nav_TitleWIP = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    Nav_TitleWIP.call(this);
    this.createWIPWindow();
};

Scene_Title.prototype.createWIPWindow = function() {
    this._WIPWindow = new Window_TitleWIP();
    this.addWindow(this._WIPWindow);
};

function Window_TitleWIP() {
    this.initialize.apply(this, arguments);
};

Window_TitleWIP.prototype = Object.create(Window_Base.prototype);
Window_TitleWIP.prototype.constructor = Window_TitleWIP;

Window_TitleWIP.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(windowHeight);
    var y = Graphics.boxHeight - height;
    var x = 0;
    x += xShift;
    y += yShift;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.fillContent();
    this.setOpac();
};

Window_TitleWIP.prototype.fillContent = function() {
    var text = fillText;
//    this.changeTextColor(color);
    var textWidth = this.textWidthEx(text);
    var x = this.contents.width - textWidth;
    x += textColor;
    this.drawTextEx(text, x, 0);
//    this.resetFontSettings();
};

Window_TitleWIP.prototype.setOpac = function() {
    this.opacity = opac;
};