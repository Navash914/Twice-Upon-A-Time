Bitmap.prototype.fillPolygon = function() {
    var context = this._context;
    context.save();
    context.fillStyle = 'rgba(0, 128, 0, 0.3)';
    context.beginPath();
    context.moveTo(50, 100);
    context.lineTo(800, 100);
    context.lineTo(650, 600);
    context.lineTo(30, 400);
    context.closePath();
    context.fill();
    context.restore();
    this._setDirty();
};

var menuCreateAlias = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    menuCreateAlias.call(this);
    this.createPolygonWindow();
};

Scene_Menu.prototype.createPolygonWindow = function() {
    this._polygonWindow = new Window_Polygon();
    this.addChild(this._polygonWindow);
};

function Window_Polygon() {
    this.initialize.apply(this, arguments);
}

Window_Polygon.prototype = Object.create(Window_Base.prototype);
Window_Polygon.prototype.constructor = Window_Polygon;

Window_Polygon.prototype.initialize = function() {
    var wx = 0;
    var wy = 0;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight;
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    //this.contentsOpacity = 50;
    //var canvas = document.createElement('canvas');
    //this._board = canvas.getContext('2d');
    this.drawTestText();
    this.drawPolygon();
};

Window_Polygon.prototype.drawPolygon = function() {
    this.contents.fillPolygon();
};

Window_Polygon.prototype.drawTestText = function() {
    var text = 'Test Text';
    this.drawText(text, 50, 50, 50, 'center');
};