/*
#=============================================================================
# Menu Animated Cursor
# LeMenuCursor.js
# By Lecode
# Version 1.1
#-----------------------------------------------------------------------------
# TERMS OF USE
#-----------------------------------------------------------------------------
# - Credit required
# - Keep this header
# - Free for commercial use
#=============================================================================
*/
var Imported = Imported || {};
Imported.Lecode_LeMenuCursor = true;
/*:
 * @plugindesc Displays an image as a cursor on windows' selection field.
 * The cursor can be animated.
 * @author Lecode
 * @version 1.1
 * 
 * @param Image
 * @desc File's name ( must be in system folder)
 * Default: MenuCursor
 * @default MenuCursor
 * 
 * @param X offset
 * @desc X offset
 * Default: -30
 * @default -30
 * 
 * @param Y offset
 * @desc Y offset
 * Default: 16
 * @default 16
 * 
 * @param Animation frames
 * @desc Corresponds to the number of images to make the animations.
 * The default file uses 4 images.
 * @default 4
 * 
 * @param Animation delay
 * @desc Delay between frames of the animation
 * Default: 12
 * @default 12
 * 
 * @param Window deactive -> stop anime ?
 * @desc Stop animation when the window is deactivated ?
 * Default: true
 * @default true
 * 
 * @param Window deactive -> hide ?
 * @desc Hide cursor when the window is deactivated ?
 * Default: false
 * @default false
 *
 * @param Windows to exclude
 * @desc Disable the cursor for the following windows.
 * Separate with comma. Default: Window_BattleLog
 * @default Window_BattleLog
 *
 * @help
 * Plugin Commands:
 *   -> LeMenuCursor ON           ( Enable the script)
 *   -> LeMenuCursor OFF          ( Disable the script)
*/
//#=============================================================================

(function() {

/*-------------------------------------------------------------------------
* Parameters
-------------------------------------------------------------------------*/
var parameters = PluginManager.parameters('LeMenuCursor');
var pFileName = String(parameters['Image'] || 'MenuCursor');
var pXOffset = Number(parameters['X offset'] || -30);
var pYOffset = Number(parameters['Y offset'] || 16);
var pAnimFrames = Number(parameters['Animation frames'] || 4);
var pAnimDelay = Number(parameters['Animation delay'] || 10);
var pStopWhenDeac = (parameters['Window deactive -> stop anime ?'] || 'true') === 'true';
var pHideWhenDeac = (parameters['Window deactive -> hide ?'] || 'false') === 'true';
var pWindowsToExclude = String(parameters['Windows to exclude']);
var pEnabled = true;


/*-------------------------------------------------------------------------
* Sprite_MenuCursor
-------------------------------------------------------------------------*/
function Sprite_MenuCursor() {
    this.initialize.apply(this, arguments);
}

Sprite_MenuCursor.prototype = Object.create(Sprite.prototype);
Sprite_MenuCursor.prototype.constructor = Sprite_MenuCursor;

Sprite_MenuCursor.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.animated = true;
    this.allBitmaps = [];
    this.frame = 0;
    this.delayCount = pAnimDelay;
    this.baseX = 0;
    this.baseY = 0;
    this.visible = true;
    this.createBitmaps();
};

Sprite_MenuCursor.prototype.createBitmaps = function() {
    var bmp = ImageManager.loadSystem(pFileName);
    var w = bmp.width/pAnimFrames;
    var h = bmp.height;
    for(var f = 0; f < pAnimFrames; f++) {
        var snipBmp = new Bitmap(w,h);
        snipBmp.blt(bmp,w*f,0,w,h,0,0);
        this.allBitmaps.push(snipBmp);
    }
    this.updateBitmap();
}

Sprite_MenuCursor.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updatePosition();
    if( this.animated) {
        this.updateAnimeDelay();
        this.updateFrameCount();
    }
};

Sprite_MenuCursor.prototype.updatePosition = function() {
    this.x = this.baseX + pXOffset;
    this.y = this.baseY + pYOffset;
};

Sprite_MenuCursor.prototype.updateAnimeDelay = function() {
    this.delayCount -= 1;
}

Sprite_MenuCursor.prototype.updateFrameCount = function() {
    if (this.delayCount != 0) { return; }
    this.frame += 1;
    if (this.frame > this.maxFrame()) {
        this.frame = 0;
    }
    this.delayCount = pAnimDelay;
    this.updateBitmap();
}

Sprite_MenuCursor.prototype.updateBitmap = function() {
    this.bitmap = this.allBitmaps[this.frame];
}

Sprite_MenuCursor.prototype.maxFrame = function() {
    return pAnimFrames-1;
}


/*-------------------------------------------------------------------------
* Scene_Base
-------------------------------------------------------------------------*/
var oldInitializesb_method = Scene_Base.prototype.initialize;
Scene_Base.prototype.initialize = function() {
    oldInitializesb_method.call(this);
    this._menuCursors = [];
};

var oldStart_method = Scene_Base.prototype.start;
Scene_Base.prototype.start = function() {
    oldStart_method.call(this);
    for(var i = 0; i < this._menuCursors.length; i++) {
        var cursor = this._menuCursors[i];
        this.addChild(cursor);
    }
};

Scene_Base.prototype.newMenuCursor = function(cursor) {
    this._menuCursors.push(cursor);
}


/*-------------------------------------------------------------------------
* Window_Selectable
-------------------------------------------------------------------------*/
var oldInitialize_method = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(x, y, width, height) {
    this._menuCursor = new Sprite_MenuCursor();
    oldInitialize_method.call(this,x,y,width,height);
    if(this.menuCursorAllowed()){
        SceneManager._scene.newMenuCursor(this._menuCursor);
    }
};

Window_Selectable.prototype.menuCursorAllowed = function() {
    if( pWindowsToExclude == "") {
        return true;
    }
    if( !pWindowsToExclude.match(',') ) {
        return !eval('this instanceof '+pWindowsToExclude);
    }
    var arr = pWindowsToExclude.split(',');
    console.log("Array = ", arr);
    for(var i = 0; i < arr.length; i++){
        var str = 'this instanceof '+arr[i];
        if ( eval(str) ) {
            return false;
        }

    }
    return true;
}

var oldUpdate_method = Window_Selectable.prototype.update;
Window_Selectable.prototype.update = function() {
    oldUpdate_method.call(this);
    this._menuCursor.visible = true;
    this._menuCursor.animated = true;
    if (!this.visible) { this._menuCursor.visible = false;}
    if (this.isClosed()) { this._menuCursor.visible = false;}
    if (this._index == -1) { this._menuCursor.visible = false; }
    if (!pEnabled) { this._menuCursor.visible = false; }
    if (pStopWhenDeac && !this.active) { this._menuCursor.animated = false; }
    if (pHideWhenDeac && !this.active) { this._menuCursor.visible = false; }
    if (this.isOpen()) { this._menuCursor.update();} 
};

var oldUpdateCursor_method = Window_Selectable.prototype.updateCursor;
Window_Selectable.prototype.updateCursor = function() {
    oldUpdateCursor_method.call(this);
    var rect = this._cursorRect;
    this._menuCursor.baseX = rect.x + this.x;
    var h = this._menuCursor.bitmap.height;
    this._menuCursor.baseY = rect.y + this.y + rect.height/2 - h/2;
    this._menuCursor.updatePosition();
};


/*-------------------------------------------------------------------------
* Game_Interpreter
-------------------------------------------------------------------------*/
//---- Plugin Command
var old_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    old_pluginCommand.call(this, command, args);
    if (command === 'LeMenuCursor') {
        switch (args[0]) {
        case 'ON':
            pEnabled = true;
            break;
        case 'OFF':
            pEnabled = false;
            break;
        }
    }
};


})();