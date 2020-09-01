//=============================================================================
// Simple Event Fade
// SimpleEventFade.js
// Version: 0.10
// Author: Kuoushi
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc v1.0 Makes fading events in or out easier.
 * @author Kuoushi
 *
 * @param Default Fade Time
 * @desc The default number of frames to fade an event in or out.
 * @default 30
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin is meant to make events fading in or out a much simpler process
 * than having to set the opacity over and over. Not sure if anyone else has
 * that issue or not, (or if it's actually fixable in engine), but I made a
 * plugin to help simplify the process.
 *
 * In the move route of the event you want to fade, add a script call where
 * you want the fade to occur. The script call would be one of the following:
 *
 * this.fadeIn(x)
 * this.fadeOut(x)
 *
 * x is the number of frames you want the fade to last. If you just want to use
 * the default in the plugin parameters then you can just say this.fadeIn() for
 * even further convenience. The fade will start on whatever your character's
 * current opacity is set at.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * 1.01   Fixed the issue which required the call to be at the end of the
 *        route list. Now it can be called in any location in a movement route.
 * 1.00   Plugin with basic functionality created.
 *
 */
//=============================================================================

(function() {

    var Parameters      = PluginManager.parameters('SimpleEventFade');
    var DefaultFadeTime = Number(Parameters['Default Fade Time']);

    Game_CharacterBase.prototype.fadeOut = function(numFrames) {
        var time = DefaultFadeTime;
        if(numFrames)
            time = numFrames;

        var route = {};
        route.repeat = this._moveRoute.repeat;
        route.skippable = this._moveRoute.skippable;
        route.wait = this._moveRoute.wait;
        route.list = [];
        var waitObj = {};
        waitObj.code = Game_Character.ROUTE_WAIT;
        waitObj.parameters = [1];

        var step = Math.ceil(this._opacity / time);


        for(var i = this._opacity; i > -1; i -= step) {
            var command = new Object();
            command.code = Game_Character.ROUTE_CHANGE_OPACITY;
            command.parameters = [i];
            route.list.push(command);
            route.list.push(waitObj);
            if(i != 0 && (i - step) < 0) {
                var last = new Object();
                last.code = Game_Character.ROUTE_CHANGE_OPACITY;
                last.parameters = [0];
                route.list.push(last);
            }
        }

        route.list = this._moveRoute.list.slice(0,this._moveRouteIndex).concat(route.list).concat(this._moveRoute.list.slice(this._moveRouteIndex+1));
        this._moveRoute.list = route.list;
    };
    
    Game_CharacterBase.prototype.fadeIn = function(numFrames) {
        var time = DefaultFadeTime;
        if(numFrames)
            time = numFrames;

        var route = {};
        route.repeat = this._moveRoute.repeat;
        route.skippable = this._moveRoute.skippable;
        route.wait = this._moveRoute.wait;
        route.list = [];
        var waitObj = {};
        waitObj.code = Game_Character.ROUTE_WAIT;
        waitObj.parameters = [1];
    
        var step = Math.ceil((255 - this._opacity) / time);
        
        for(var i = this._opacity; i < 256; i += step) {
            var command = new Object();
            command.code = Game_Character.ROUTE_CHANGE_OPACITY;
            command.parameters = [i];
            route.list.push(command);
            route.list.push(waitObj);
            if(i != 255 && (i + step) > 255) {
                var last = new Object();
                last.code = Game_Character.ROUTE_CHANGE_OPACITY;
                last.parameters = [255];
                route.list.push(last);
            }
        }
    
        route.list = this._moveRoute.list.slice(0,this._moveRouteIndex).concat(route.list).concat(this._moveRoute.list.slice(this._moveRouteIndex+1));
        this._moveRoute.list = route.list;
    };
})();