/*:
* @plugindesc v1.0 Creates a smooth scrolling camera for the player and events.
* <Soulpour777 CameraScrollEx>
* @author Soulpour777
* 
* @help
/-----------------------------------------
Camera Scroll EX
Author: Soulpour777

Plugin Commands:

follow event x
where x is the event number you want the camera to follow.

example, if the event you want the camera to chase is event no. 3...
do this on the plugin command:

follow event 3

If you want to revert the camera following you,
do this on a plugin command:

follow player

Credits: Raizen
I based this plugin on how he made the smooth scrolling camera back
in RPG Maker VX Ace.

Special Thanks: KockaAdmiralac
/-----------------------------------------
*/
(function(){
    var Imported = Imported || {};
    Imported.CameraScrollEx = true;
    var Soulpour777 = Soulpour777 || {};
    Soulpour777.CameraScrollEx = {};
    Soulpour777.CameraScrollEx.playerInitialize =  Game_Player.prototype.initialize;
    Soulpour777.CameraScrollEx.slideSpeed = 0.001; // can't be changed since this is the best scroll quickness
    Soulpour777.CameraScrollEx.pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Player.prototype.initialize = function()
    {
        Soulpour777.CameraScrollEx.playerInitialize.call(this);
        this._cameraScrollEx_slideFocus = 0;
        this.screenFocusX = null;
        this.screenFocusY = null;
    };
 
    Game_Player.prototype.updateScroll = function(lastScrolledX, lastScrolledY)
 {
        if($gameMap.isScrolling()) return;
        if (this._cameraScrollEx_slideFocus === 0)
        {
            this.screenFocusX = this.screenX();
            this.screenFocusY = this.screenY();
        }
        else
        {
            this.screenFocusX = $gameMap._events[this._cameraScrollEx_slideFocus].screenX();
            this.screenFocusY = $gameMap._events[this._cameraScrollEx_slideFocus].screenY();
            console.log((this.screenFocusX - 16) + " > " + (Graphics.height / 2) + " === " + (this.screenFocusX - 16 > Graphics.height / 2));
        }
        var scroll_xs = Math.abs((this.screenFocusX - Graphics.width / 2));
        var scroll_ys = Math.abs((this.screenFocusY - 16 - Graphics.height / 2));
        if (this.screenFocusY - 16 > Graphics.height / 2)   $gameMap.scrollDown(Soulpour777.CameraScrollEx.slideSpeed * scroll_ys);
        if (this.screenFocusX < Graphics.width / 2)         $gameMap.scrollLeft(Soulpour777.CameraScrollEx.slideSpeed * scroll_xs);
        if (this.screenFocusX > Graphics.width / 2)         $gameMap.scrollRight(Soulpour777.CameraScrollEx.slideSpeed * scroll_xs);
        if (this.screenFocusY - 16 < Graphics.height / 2)   $gameMap.scrollUp(Soulpour777.CameraScrollEx.slideSpeed * scroll_ys);
    };
 
    Game_Player.prototype.setCameraExFocus = function(value) { this._cameraScrollEx_slideFocus = value; }
 
    Game_Map.prototype.adjustSliderX = function() { return this._displayX != 0 && this._displayX != (this.width - this.screenTileX) && !this.isScrolling(); };
    Game_Map.prototype.adjustSliderY = function() { return this._displayY != 0 && this._displayY != (this.height - this.screenTileY) && !this.isScrolling(); };
 
    Spriteset_Map.prototype.updateTilemap = function()
    {
        this._tilemap.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
        this._tilemap.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
        if ($gameMap.adjustSliderX()) this._tilemap.origin.x += 1;
        if ($gameMap.adjustSliderY()) this._tilemap.origin.y += 1;
    };
    
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Soulpour777.CameraScrollEx.pluginCommand.apply(this);
        if (command === 'follow') {
            switch(args[0]){
                case 'event':
                    $gamePlayer.setCameraExFocus(args[1]);
                    break;
                case 'player':
                    $gamePlayer.setCameraExFocus(0);
                    break;
            }
        }
    };

    Game_Interpreter.prototype.setCameraExFocus = function(actionNumber) { $gamePlayer.setCameraExFocus(actionNumber); }
 
})();