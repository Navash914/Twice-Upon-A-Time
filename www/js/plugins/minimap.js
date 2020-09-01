//=============================================================================
// SilvMinimap.js
// Version: 1.00
// Requires plugin: SilvKeys (place this one below it)
//=============================================================================
/*:
 * @plugindesc v0.91 Minimap. <SilvMinimap>
 * @author Silver
 *
 * @param Map Style
 * @desc Is the minimap scaled to fit? Or does it zoom and scroll? Autofit/Scroll
 * @default Scroll
 *
 * @param Global Map Zoom
 * @desc Only applies if MapStyle is set to: Scroll. Determines the default zoom level for all maps. A value of 1 means 1:1.
 * @default 0.25
 *
 * @param -- Positioning & Size --
 *
 * @param X
 * @desc x-location of minimap window. If window-alignment is set to Right, this will act as an offset value instead
 * @default -2
 *
 * @param Y
 * @desc y-location of minimap window. If window-alignment is set to Top, this will act as an offset value instead
 * @default 2
 *
 * @param Horizontal Alignment
 * @desc Left/Right
 * @default Right
 *
 * @param Vertical Alignment
 * @desc Top/Bottom
 * @default Bottom
 *
 * @param Width
 * @desc width of the minimap
 * @default 320
 *
 * @param Height
 * @desc height of the minimap
 * @default 320
 *
 * @param Border Width
 * @desc Border width of the minimap
 * @default 12
 *
 * @param Border Height
 * @desc Border height of the minimap
 * @default 12
 *
 * @param -- Menu --
 *
 * @param Menu Player Description
 * @desc The description of the player marker in the menu. Spaces are allowed.
 * @default You
 *
 * @param Menu Zoom
 * @desc Map Zoomlevel for the menu
 * @default 0.3. A value of 1 means 1:1
 *
 * @param Menu Left Window Width
 * @desc Width of the left window
 * @default 240
 *
 * @param Menu Topright Window Height
 * @desc Height of the topright window
 * @default 510
 *
 * @param Menu Event Render Size
 * @desc How big the events are that are drawn onto the menu map
 * @default 24
 *
 * @param Menu Player Icon Size
 * @desc How big the player is drawn onto the menu map
 * @default 64
 *
 * @param Menu Min Manual Zoom
 * @desc How far the player can zoom out
 * @default 0.20
 *
 * @param Menu Max Manual Zoom
 * @desc How far the player can zoom in
 * @default 10.0
 *
 * @param Menu Zoomin Key
 * @desc Key for zooming in. 33 = pageup
 * @default pageup
 *
 * @param Menu Zoomout Key
 * @desc Key for zooming out. 34 = pagedown
 * @default pagedown
 *
 * @param Menu Reset Zoom Key
 * @desc Key for resetting the zoom. 36 = home
 * @default home
 *
 * @param Menu Reset Scroll Key
 * @desc Key to reset the mapscroll
 * @default end
 *
 * @param -- The rest --
 *
 * @param Allow Teleportation
 * @desc By default, allow teleportation to events/poi's that support it? true/falee
 * @default true
 *
 * @param Standard Padding
 * @desc Standard Window Padding. Best to leave at 0
 * @default 0
 *
 * @param Window Skin
 * @desc Name of the window skin to use for this window
 * @default Window_Minimap
 *
 * @param Player Icon Width
 * @desc Standard Window Padding
 * @default 16
 *
 * @param Player Icon Height
 * @desc Standard Window Padding
 * @default 16
 *
 * @param Draw Player Icon
 * @desc Draw player on the map? true/false
 * @default true
 *
 * @param Player Blink Delay
 * @desc Blinks the player icon (in frames). Set to 0 to disable. Does nothing if "Draw Player Icon" is set to false
 * @default 0
 *
 * @param Fill Color
 * @desc Color to fill the background of the minimap with for 'odd aspect ratios'. Use 0 0 0 0 to disable. R G B A.
 * @default 0 0 0 255
 *
 * @param Maintain Aspect Ratio
 * @desc Maintains minimap aspect ratio if set to true. true/false
 * @default true
 *
 * @param Fadeout Speed
 * @desc How fast the minimap fades out
 * @default 3
 *
 * @param Global Required Item
 * @desc Item ID of the item that the player must have in their INVENTORY for any map to be displayed. Requires map to be reloaded if item is acquired or call the plugin command "Minimap Refresh" (w/o quotes). A value of 0 disables this
 * @default 0
 *
 * @param Event Render Size
 * @desc How big the events are that are drawn onto the minimap
 * @default 16
 *
 * @param Auto Clear POI
 * @desc Automatically clear POI's between map transfers? true/false
 * @default false
 *
 * @param Render Minimap Overlay
 * @desc If enabled, add the image: /img/Minimap/Overlay.png and it will be drawn on top of the minimap. true/false
 * @default true
 *
 * @param -- Manual Scrolling --
 *
 * @param Allow Manual Scrolling
 * @desc true/false
 * @default true
 *
 * @param Manual Scrollspeed
 * @desc How fast the map is scrolled
 * @default 24
 *
 * @param Manual Scroll Key Up
 * @desc Key for scrolling the map upwards. Default: u  http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
 * @default u
 *
 * @param Manual Scroll Key Right
 * @desc Key for scrolling the map upwards. Default: k
 * @default k
 *
 * @param Manual Scroll Key Down
 * @desc Key for scrolling the map upwards. Default: j
 * @default j
 *
 * @param Manual Scroll Key Left
 * @desc Key for scrolling the map upwards. Default: h
 * @default h
 *
 * @param -- Advanced & Debug --
 *
 * @param Frame Skip
 * @desc Skips some minimap calculations&rendering if set to value > 0 to safe performance. The value equals the amount of frames skipped.
 * @default 0
 *
 * @param Mapshot Filename Length
 * @desc Length of the mapshot filenames. A value of 3 would equal to: 001.png, 002.png, 016.png, etc. And a value of 2 would equal: 01.png, etc. A value of 0 disables it
 * @default 3
 *
 * @param Debug Mode
 * @desc Prints extra info if set to true. true/false
 * @default false
 *
 * @param Render Debug Grid
 * @desc Draws a debug grid. Requires "/img/Minimap/DebugGrid.png" which is 48x48 in size. Drains a lot of performance!
 * @default false
 *
 * @param Debug Grid Image
 * @desc Name of the debug-grid image
 * @default DebugGrid01
 *
 * @help
 * 1. Make a mapshot of your map. You may use http://forums.rpgmakerweb.com/index.php?/topic/49711-orange-mapshot/
 * 2. Install this script: http://pastebin.com/FF6jh3S0 and make sure to put it above the minimap script.
 * 3. Copy the files to:
 * 4. /img/minimap/Overlay.png
 * 5. /img/minimap/DebugGrid01.png
 * 6. /img/system/Window_Minimap.png
 * 7. Place your mapshots in the /img/minimap/ directory and rename them 001.png, 002.png etc. (matching the id of your map)
 * 
 * To show the menu make a script call and place this in it (you can place this in a common event):
 * Silv.Minimap.Window.pushMapScene();
 *
 *--------------------------------------
 * Map notetags (case sensitive!)
 *--------------------------------------
 * <mm_req_itm:item_id1 item_id2 etc>
 * Example: <mm_req_itm:1, 2, 3>
 *
 * <mm_frameskip:value>
 * Example: <mm_frameskip:1>
 * Note: overrides the global frameskip parameter for this map
 *
 * <mm_mapzoom:value>
 * Example: <mm_mapzoom:0.15>
 * Note: overrides the global mapzoom parameter for this map
 *
 * <mm_allowmanualscroll:value>
 * Example: <mm_allowmanualscroll:false>
 * Allowed values: true/false
 * Note: overrides the global "Allow Manual Scrolling" parameter for this map
 *
 * <mm_menuzoom:value>
 * Example: <mm_menuzoom:0.75>
 * Note: overrides the global "Menu Zoom" parameter for this map
 *
 * <mm_size:x y>
 * Example: <mm_size:128 128>
 * Note: overrides the global "Width" and "Height" parameters for this map
 *
 * Allow/disallow teleportation.
 * <mm_tp_allow:value>
 * Example: <mm_tp_allow:false>
 * Note: overrides the global "Allow Teleportation" parameter for this map
 *
 *--------------------------------------
 * Event notetags (not case sensitive)
 *--------------------------------------
 * mm_show
 *
 *--------------------------------------
 * Plugin Commands (not case-sensitive)
 *--------------------------------------
 * Minimap Hide
 * Minimap Show
 * Minimap FadeOut
 * Minimap FadeReset
 * Minimap Refresh
 * Minimap RefreshEvents
 * Minimap IncreaseScroll <x> <y>
 * Minimap SetScroll <x> <y>
 * Minimap DeletePOI <poi_id>
 *
 * Minimap POIDesc <description>
 * Example: Minimap POIDesc An Awesome City!
 *
 * Minimap POI_TP <poi_id x_offset y_offset direction fadeType>
 * Example: Minimap POI_TP 1 1 0 0 0
 * Note that teleporting with both offsets set to 0, will teleport the player straight into the center of the poi.
 *
 * Adding POI's (advanced plugin command!):
 * Minimap AddPOI unique_poi_id, name, real_x, real_y, bitmap folder, bitmap filename, s_x, s_y, s_w, s_h, draw_w, draw_h
 * Example that draws Actor1_3 on tile 10,10:
 * Minimap AddPOI 1 A_Friend 10 10 img/enemies/ Actor1_3 0 0 254 225 64 64
 * Note:
 * - The real_x & real_y are in maptiles and not in coordinates. 0,0 is in the upper left corner.
 * - name-value replaces underscores _  with spaces.
 *
 
 *
 *--------------------------------------
 * Comment-tags (case sentitive!)
 *--------------------------------------
 * To show an event on the minimap:
 * <mm_show>
 *
 * To add a description to an event (for the minimap-scene)
 * <mm_desc>
 *
 * To add teleport to the event:
 * <mm_tp:offset_x offset_y direction fadeType>
 * Example: <mm_tp:1 0 2 0>
 * Notes: 
 *        - Offset is the offset in tiles with the event-location itself being 0 0
 *        - Possible direction values: 2 (down), 4 (left), 6 (right), 8 (up). Or use a value of 0 to maintain the current player-facing-direction
 *        - Possible fadeType values: 0 (black), 1 (white), 2 (none)
 * 
 *
 * Note to other scripters: You can access the variable that contains the window through this: "Silv.Minimap.Window" w/o the quotes.
 */
 
// Get Plugin Parameters
var Silv = Silv || {};
Silv.Plugins = Silv.Plugins || {};
Silv.Plugins.Minimap = 1.00;
if (!('Keys' in Silv.Plugins) || Silv.Plugins.Keys < 1.00) { throw 'ERROR: Silvers Minimap requires Silvers KeyMapper v1.00 or higher. It must be placed above the minimap script.'; }
Silv.Parameters = $plugins.filter(function(p) { return p.description.contains('<SilvMinimap>'); })[0].parameters;
Silv.Minimap = Silv.Minimap || {};
Silv.Minimap.Menu = Silv.Minimap.Menu || {};
// Non-parameters
Silv.Minimap.Window = null;
Silv.Minimap.POI = {};
Silv.Minimap.Events = new Array(); // Is an array of objects [{ Game_Event, Sprite_Character }]. USe .event and .sprite to retrieve the values.
Silv.Minimap.ScreenIsFading = false;
Silv.Minimap.Menu.Bmp = null;
Silv.Minimap.Menu.Markers = new Array();
Silv.Minimap.WasLoadedFromSave = false;
Silv.Minimap.LastMapID = -1; // To detect when a different map is loaded. Because loading the menu-scene for example will reload the entire map again and also recreate the minimap, but we don't want to erase the POI's and such then.
Silv.Minimap.TP_Dest = null;
// Minimap Style and Zoom
Silv.Minimap.MapStyle = Silv.Parameters['Map Style'].toLowerCase();
Silv.Minimap.GlobalMapZoom = parseFloat(Silv.Parameters['Global Map Zoom']);
// Positioning & Size
Silv.Minimap.Window_X = parseInt(Silv.Parameters['X']);
Silv.Minimap.Window_Y = parseInt(Silv.Parameters['Y']);
Silv.Minimap.WindowWidth = parseInt(Silv.Parameters['Width']);
Silv.Minimap.WindowHeight = parseInt(Silv.Parameters['Height']);
Silv.Minimap.BorderWidth = parseInt(Silv.Parameters['Border Width']);
Silv.Minimap.BorderHeight = parseInt(Silv.Parameters['Border Height']);
Silv.Minimap.WindowHorizontalAlignment = Silv.Parameters['Horizontal Alignment'].toLowerCase();
Silv.Minimap.WindowVerticalAlignment = Silv.Parameters['Vertical Alignment'].toLowerCase();
// Menu
Silv.Minimap.Menu.PlayerDesc = Silv.Parameters['Menu Player Description'];
Silv.Minimap.Menu.Zoom = parseFloat(Silv.Parameters['Menu Zoom']);
Silv.Minimap.Menu.WindowWidth_Left = parseInt(Silv.Parameters['Menu Left Window Width']);
Silv.Minimap.Menu.WindowHeight_MapSection = parseInt(Silv.Parameters['Menu Topright Window Height']);
Silv.Minimap.Menu.EventRenderSize = parseInt(Silv.Parameters['Menu Event Render Size']);
Silv.Minimap.Menu.PlayerIconSize = parseInt(Silv.Parameters['Menu Player Icon Size']);
Silv.Minimap.Menu.ManualZoom_Min = parseFloat(Silv.Parameters['Menu Min Manual Zoom']);
Silv.Minimap.Menu.ManualZoom_Max = parseFloat(Silv.Parameters['Menu Max Manual Zoom']);
Silv.Minimap.Menu.ManualZoomKey_In = Silv.Keys.fromStringParam(Silv.Parameters['Menu Zoomin Key']);
Silv.Minimap.Menu.ManualZoomKey_Out = Silv.Keys.fromStringParam(Silv.Parameters['Menu Zoomout Key']);
Silv.Minimap.Menu.ManualZoomKey_Reset = Silv.Keys.fromStringParam(Silv.Parameters['Menu Reset Zoom Key']);
Silv.Minimap.Menu.ManualScrollKey_Reset = Silv.Keys.fromStringParam(Silv.Parameters['Menu Reset Scroll Key']);
// The Rest
Silv.Minimap.AllowTeleportation = Silv.Parameters['Allow Teleportation'].toLowerCase() == 'true';
Silv.Minimap.StandardPadding = parseInt(Silv.Parameters['Standard Padding']);
Silv.Minimap.WindowSkin = Silv.Parameters['Window Skin'];
Silv.Minimap.PlayerIconWidth = parseInt(Silv.Parameters['Player Icon Width']);
Silv.Minimap.PlayerIconHeight = parseInt(Silv.Parameters['Player Icon Height']);
Silv.Minimap.DrawPlayerIcon = Silv.Parameters['Draw Player Icon'].toLowerCase() == 'true';
Silv.Minimap.PlayerBlinks = parseInt(Silv.Parameters['Player Blink Delay']) > 0;
Silv.Minimap.PlayerBlinkDelay = parseInt(Silv.Parameters['Player Blink Delay']);
Silv.Minimap.MapBGFillColor = Silv.Parameters['Fill Color'].split(' ');
Silv.Minimap.MaintainAspectRatio = Silv.Parameters['Maintain Aspect Ratio'].toLowerCase() == 'true';
Silv.Minimap.FadeoutSpeed = parseInt(Silv.Parameters['Fadeout Speed']);
Silv.Minimap.GlobalRequiredItem = parseInt(Silv.Parameters['Global Required Item']);
Silv.Minimap.EventRenderSize = parseInt(Silv.Parameters['Event Render Size']);
Silv.Minimap.AutoClearPOI = Silv.Parameters['Auto Clear POI'].toLowerCase() == 'true';
Silv.Minimap.DrawOverlay = Silv.Parameters['Render Minimap Overlay'].toLowerCase() == 'true';
// Manual Scrolling
Silv.Minimap.AllowManualScrolling = Silv.Parameters['Allow Manual Scrolling'].toLowerCase() == 'true';
Silv.Minimap.ManualScrollspeed = parseFloat(Silv.Parameters['Manual Scrollspeed']);
Silv.Minimap.ManualScrollKeyUp = Silv.Keys.fromStringParam(Silv.Parameters['Manual Scroll Key Up']);
Silv.Minimap.ManualScrollKeyRight = Silv.Keys.fromStringParam(Silv.Parameters['Manual Scroll Key Right']);
Silv.Minimap.ManualScrollKeyDown = Silv.Keys.fromStringParam(Silv.Parameters['Manual Scroll Key Down']);
Silv.Minimap.ManualScrollKeyLeft = Silv.Keys.fromStringParam(Silv.Parameters['Manual Scroll Key Left']);
// Advanced & Debug
Silv.Minimap.FrameSkip = parseInt(Silv.Parameters['Frame Skip']);
Silv.Minimap.MapFilenameLength = parseInt(Silv.Parameters['Mapshot Filename Length']);
Silv.Minimap.DebugMode = Silv.Parameters['Debug Mode'].toLowerCase() == 'true';
Silv.Minimap.DrawDebugGrid = Silv.Parameters['Render Debug Grid'].toLowerCase() == 'true';
Silv.Minimap.DebugGridImage = Silv.Parameters['Debug Grid Image'];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Input.isNumeric = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

(function()
{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Utilities & Misc
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Example: lpad('2', '0') // result: '002'
function lpad_mapname(word, padStr)
{
    word = String(word);
    while (word.length < Silv.Minimap.MapFilenameLength) word = padStr + word;
    return word;
}

function minimapFolderPath()
{
	var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, "/img/minimap/");
	if (path.match(/^\/([A-Z]\:)/)) { path = path.slice(1); }
	path = decodeURIComponent(path);
	return path;
}

// filename example: '002.png'
function minimapImageExists(filename)
{
	var filename = minimapFolderPath() + filename;
    var fs = require('fs');
    return fs.existsSync(filename);
}

function dataMapGetEventByID(ev_id)
{
	for(var i=1; i< $dataMap.events.length; i++)
	{
		if ($dataMap.events[i].id == ev_id) { return $dataMap.events[i]; }
	}
	return null;
}

ImageManager.loadMinimap = function(filename, hue)
{
    return this.loadBitmap('img/minimap/', filename, hue, false);
};

// Do not just show the minimap on top of a faded-out screen.
var alias_silv_mm_updateFadeOut = Game_Screen.prototype.updateFadeOut;
Game_Screen.prototype.updateFadeOut = function() {
	alias_silv_mm_updateFadeOut.call(this);
    
	if (this._brightness < 255) // (this._fadeOutDuration > 0)
	{
		Silv.Minimap.ScreenIsFading = true;
		Silv.Minimap.Window.opacity = this._brightness;
		Silv.Minimap.Window.contents.paintOpacity  = this._brightness;
		//Silv.Minimap.Window.visible = false;
	}
	else
	{
		Silv.Minimap.ScreenIsFading = false;
		//Silv.Minimap.Window.visible = true;
	}
};

//------------------------------------------------------------------------------------------------------------------------------------
// Store a reference to the player graphic.
//------------------------------------------------------------------------------------------------------------------------------------
var alias_silv_mm_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function()
{
	alias_silv_mm_createCharacters.call(this);
	
	for (var i = this._characterSprites.length - 1; i >= 0; i--)
	{
		if (this._characterSprites[i]._character == $gamePlayer)
		{
			Spriteset_Map.prototype.playerSprite = this._characterSprites[i];
			break;
		}	
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Automatically create a event-Notetag from event-comments on the active page
// Example usage: console.log($gameMap.event(1).event.silvNote);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var alias_silv_mm_Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function()
{
	alias_silv_mm_Game_Event_setupPage.call(this);
	this.silvCreateNote();
};

Game_Event.prototype.silvCreateNote = function()
{
	this.silvNote = '';
	if (typeof this.page() === 'undefined') { return; }
	
	var list = this.list();
	str = null;
	for (var commandProperty in list)
	{
		if (list.hasOwnProperty(commandProperty))
		{
			var command = list[commandProperty];
			var commandCode = command.code;
			if (commandCode == 108) // 108: new comment-item, always the first line.
			{
				if (str != null) { this.silvNote += str; }
				str = command.parameters[0];
			}
			else if (commandCode == 408) // 408: comment-line, but not the first one.
			{
				this.silvNote += command.parameters[0];
			}
			else if (str) // It's not a comment-code, so add the previous str (if any) to the note.
			{
				this.silvNote += str;
				str = null;
			}
		}
	}
	if (this.silvNote != '') {this.extractSilvMetadata()};
};

// <mm_tp:1> will result in: '1'
// <mm_tp:1> will result in: ['1', '0'];
Game_Event.prototype.extractSilvMetadata = function() {
    var re = /<([^<>:]+)(:?)([^>]*)>/g;
    this.meta = {};
    for (;;)
	{
        var match = re.exec(this.silvNote);
        if (match)
		{
            if (match[2] === ':')
			{
				var value = match[3];
				if (match[3].indexOf(' ') >= 0) { value = match[3].split(' '); }
				
				this[match[1]] = value;
            }
			else
			{
				this[match[1]] = true;
            }
        }
		else
  		{
            break;
        }
    }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Minimap Window
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Window_Minimap() { this.initialize.apply(this, arguments); }
// Inherit from base window
Window_Minimap.prototype = Object.create(Window_Base.prototype);
// Set Constructor
Window_Minimap.prototype.constructor = Window_Minimap;

Window_Minimap.prototype.loadWindowskin = function() { this.windowskin = ImageManager.loadSystem(Silv.Minimap.WindowSkin); }
Window_Minimap.prototype.standardPadding = function() { return Silv.Minimap.StandardPadding; }
//Window_Minimap.prototype.standardFontSize = function() { return Silv.Minimap.FontSize; }

var mapBmp;
var drawAreaWidth;
var drawAreaHeight;
var mapWidth
var mapHeight;
var playerBlinkCnt;
var playerBlink_IsVisible;
var frameSkip;
var frameSkipCnt;
var mapAspRatInfo;
var mapZoom;
var mapZoomInverse;
var isManualScrolling;
var allowManualScroll;
var mapScroll;
var lastPlayerLoc;
var isFirstProcessedUpdate;
var debugGridBmp;
var overlayBmp;
var menuZoom;
var allowTeleportation;

// Initialization
Window_Minimap.prototype.initialize = function(x, y, width, height)
{
	if ('mm_size' in $dataMap.meta)
	{
		var newSize = $dataMap.meta.mm_size.split(' ');
		width = parseInt(newSize[0]);
		heigth = parseInt(newSize[1]);
	}
	
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._helpWindow = null;
    this._handlers = {};
    this._touching = false;
    this.deactivate();
	
	this.isFadingOut = false;
	this.isFadedOut = false;
	this.mapBmp = ImageManager.loadMinimap(lpad_mapname($gameMap._mapId, '0'));
	this.overlayBmp = ImageManager.loadMinimap('Overlay');
	this.drawAreaWidth = this.contents.width - Silv.Minimap.BorderWidth * 2;
	this.drawAreaHeight = this.contents.height - Silv.Minimap.BorderHeight * 2;
	this.mapWidth = parseFloat($gameMap.width());
	this.mapHeight = parseFloat($gameMap.height());
	this.setAspectRatio();
	this.playerBlinkCnt = Silv.Minimap.PlayerBlinkDelay;
	this.playerBlink_IsVisible = true;
	this.frameSkip = Silv.Minimap.FrameSkip;
	this.frameSkipCnt = 0;
	
	this.mapZoom = Silv.Minimap.GlobalMapZoom;
	if ('mm_mapzoom' in $dataMap.meta) { this.mapZoom = parseFloat($dataMap.meta.mm_mapzoom); }
	this.mapZoomInverse = 1 / this.mapZoom;
	this.isFirstProcessedUpdate = true;
	
	this.isManualScrolling = false;
	this.allowManualScroll = Silv.Minimap.AllowManualScrolling;
	if ('mm_allowmanualscroll' in $dataMap.meta) { this.allowManualScroll = $dataMap.meta.mm_allowmanualscroll == 'true'; }
	this.mapScroll = {x: 0, y: 0, adjustment_x: 0, adjustment_y: 0};
	this.lastPlayerLoc = {x: $gamePlayer._realX, y: $gamePlayer._realY};
	this.menuZoom = Silv.Minimap.Menu.Zoom;
	if ('mm_menuzoom' in $dataMap.meta) { this.menuZoom = $dataMap.meta.mm_menuzoom == 'true'; }
	this.allowTeleportation = Silv.Minimap.AllowTeleportation;
	if ('mm_tp_allow' in $dataMap.meta) { this.allowTeleportation = $dataMap.meta.mm_tp_allow == 'true'; }
	
	this.loadEvents();	
	this.debugGridBmp = ImageManager.loadMinimap(Silv.Minimap.DebugGridImage);
		
	// The update must be called AFTER all the initialization code.
	this.update(true);
};

Window_Minimap.prototype.clamp = function(value, min, max)
{
	return Math.min(Math.max(value, min), max);
};
	
// This function requires this.mapBmp to be fully initialized.
// #Aspect #Ratio #AspectRatio
Window_Minimap.prototype.setAspectRatio = function()
{
	// this.mapAspRatInfo.scaleDelta_x is the difference in size between the mapwidth (in pixels, NOT in tiles) and the minimap (render)width.
	this.mapAspRatInfo = { w: 0.0, h: 0.0, offset_x: 0.0, offset_y: 0.0, scaleDelta_x: 0.0, scaleDelta_y: 0.0 }
	var w = $gameMap.width();
	var h = $gameMap.height();
	
	// Map Aspect Ratio
	if (!Silv.Minimap.MaintainAspectRatio || (w == h))
	{
		this.mapAspRatInfo.w = 1.0;
		this.mapAspRatInfo.h = 1.0;
	}
	else if (w > h)
	{
		this.mapAspRatInfo.w = 1.0;
		this.mapAspRatInfo.h = h / parseFloat(w);
	}
	else // if (h > w)
	{
		this.mapAspRatInfo.w = w / parseFloat(h);
		this.mapAspRatInfo.h = 1.0;
	}
	
	this.mapAspRatInfo.scaleDelta_x = this.drawAreaWidth / parseFloat($gameMap.width() * $gameMap.tileWidth());
	this.mapAspRatInfo.scaleDelta_y = this.drawAreaHeight / parseFloat($gameMap.height() * $gameMap.tileHeight());
};

// #Events
Window_Minimap.prototype.loadEvents = function()
{
	Silv.Minimap.Events = new Array();
	for (ev_idx = 1; ev_idx < $dataMap.events.length; ev_idx++) // Note: start at 1. Because the first one is always null.
	{
		if ($dataMap.events[ev_idx] != null)
		{
			var ev = $gameMap.event(ev_idx);
			
			// Check Event Note
			if ($dataMap.events[ev_idx].note != '' || ('mm_show' in ev))
			{
				var cmds = $dataMap.events[ev_idx].note.toLowerCase().split(' ');
				if ((cmds.indexOf('mm_show') > -1) ||  ('mm_show' in ev))
				{
					var new_ev = {event: ev, sprite: this.getEventCharacterSprite(ev.eventId())};
					Silv.Minimap.Events.push(new_ev); // Add event to the array so we can render it on the minimap
				}
			}
		}
	}
	if (Silv.Minimap.DebugMode) { console.log('Loaded Events:'); console.log(Silv.Minimap.Events); }
};

Window_Minimap.prototype.getEventCharacterSprite = function(ev_id)
{
	for (var i=0; i < SceneManager._scene._spriteset._characterSprites.length; i++)
	{
		var eventSprite = SceneManager._scene._spriteset._characterSprites[i];
		if (eventSprite._character.eventId() == ev_id)
		{
			return eventSprite;
		}
	}
	throw 'getEventCharacterSprite() did not find a match for ev_id: ' + ev_id;
};
	
Window_Minimap.prototype.update = function()
{
	if (!this.skipFrame() && this.mapBmp.isReady())
	{
		Window_Base.prototype.update.call(this);
		this.updateFadeOut();
		this.updateInput();
		if (Silv.Minimap.PlayerBlinks) { this.updatePlayerBlink(); }
		this.updateMapScroll(this.isFirstProcessedUpdate);
		this.drawMinimap();
		this.lastPlayerLoc.x  = $gamePlayer._realX;
		this.lastPlayerLoc.y  = $gamePlayer._realY;
		this.isFirstProcessedUpdate = false;
		
		// Teleport
		if (Silv.Minimap.TP_Dest != null)
		{
			this.teleport(Silv.Minimap.TP_Dest);
			Silv.Minimap.TP_Dest = null;
		}
	}
};

Window_Minimap.prototype.updateInput = function()
{
	if (Input.isPressed(Silv.Minimap.ManualScrollKeyUp))    { Silv.Minimap.Window.manualScroll(Silv.Minimap.Window.mapScroll.x, Silv.Minimap.Window.mapScroll.y - Silv.Minimap.ManualScrollspeed); }
	if (Input.isPressed(Silv.Minimap.ManualScrollKeyRight)) { Silv.Minimap.Window.manualScroll(Silv.Minimap.Window.mapScroll.x + Silv.Minimap.ManualScrollspeed, Silv.Minimap.Window.mapScroll.y); }
	if (Input.isPressed(Silv.Minimap.ManualScrollKeyDown))  { Silv.Minimap.Window.manualScroll(Silv.Minimap.Window.mapScroll.x, Silv.Minimap.Window.mapScroll.y + Silv.Minimap.ManualScrollspeed); }
	if (Input.isPressed(Silv.Minimap.ManualScrollKeyLeft))  { Silv.Minimap.Window.manualScroll(Silv.Minimap.Window.mapScroll.x - Silv.Minimap.ManualScrollspeed, Silv.Minimap.Window.mapScroll.y); }
};

Window_Minimap.prototype.teleport = function(tp_info)
{
	var direction = $gamePlayer._direction;
	if (tp_info[2] != 0) { direction = parseInt(tp_info[2]); }

	$gamePlayer.reserveTransfer($gameMap._mapId, tp_info[0], tp_info[1], direction, parseInt(tp_info[3]));
};

Window_Minimap.prototype.playerLocChanged = function()
{
	return this.lastPlayerLoc.x != $gamePlayer._realX || this.lastPlayerLoc.y != $gamePlayer._realY;
};

// #Scroll
Window_Minimap.prototype.updateMapScroll = function(force)
{
	if (this.playerLocChanged() || force) // Only update mapscroll if the player changed location. This way manual-scrolling is made possible.
	{	
		this.isManualScrolling = false;
		this.setMapScroll($gamePlayer._realX * $gameMap.tileWidth() - (this.drawAreaWidth / 2 * this.mapZoomInverse), $gamePlayer._realY * $gameMap.tileHeight() - (this.drawAreaHeight / 2 * this.mapZoomInverse));
	}
};

Window_Minimap.prototype.setMapScroll = function(scroll_x, scroll_y)
{
	var old_x = this.mapScroll.x = scroll_x;
	var source_w = this.drawAreaWidth * this.mapZoomInverse;
	this.mapScroll.x = this.clamp(this.mapScroll.x, 0, this.mapBmp.width - source_w);
	this.mapScroll.adjustment_x = old_x - this.mapScroll.x; // clamp difference
	
	var old_y = this.mapScroll.y = scroll_y;
	var source_h = this.drawAreaHeight * this.mapZoomInverse;
	this.mapScroll.y = this.clamp(this.mapScroll.y, 0, this.mapBmp.height - source_h);
	this.mapScroll.adjustment_y = old_y - this.mapScroll.y; // clamp difference
};

Window_Minimap.prototype.manualScroll = function(scroll_x, scroll_y)
{
	this.setMapScroll(scroll_x, scroll_y);
	this.isManualScrolling = true;
};

// Skips frame (returns true) if frameSkipCnt > frameSkip
Window_Minimap.prototype.skipFrame = function()
{
	if (this.frameSkip == 0) { return false; } // process frame
	
	this.frameSkipCnt++;
	if (this.frameSkipCnt < this.frameSkip)
	{
		return true; // skip frame
	}
	else
	{
		this.frameSkipCnt = 0;
		return false; // process frame
	}
};

Window_Minimap.prototype.updatePlayerBlink = function()
{
	this.playerBlinkCnt--;
	if (this.playerBlinkCnt <= 0)		
	{	
		this.playerBlinkCnt = Silv.Minimap.PlayerBlinkDelay;
		this.playerBlink_IsVisible = !this.playerBlink_IsVisible;
	}
};

Window_Minimap.prototype.updateFadeOut = function()
{
	if (this.isFadedOut || Silv.Minimap.ScreenIsFading) { return; } // Do nothing if the minimap is already completely faded out or if the screen itself is being faded in/out.
	if (this.isFadingOut) {	this.fadeOut(); }
};

Window_Minimap.prototype.fadeOut = function()
{
	this.opacity = this.contentsOpacity -= Silv.Minimap.FadeoutSpeed;
	this.isFadedOut = (this.opacity <= 0);
};

Window_Minimap.prototype.resetFade = function()
{
	this.isFadingOut = false;
	this.fadeOutCnt = 0;
	this.opacity = this.contentsOpacity  = 255;
	this.isFadedOut = false;
};

Window_Minimap.prototype.fadeOutInstantly = function()
{
	this.opacity = this.contentsOpacity = 0;
	this.isFadedOut = true;
};

//----------------------------------------------------------------------------------------------------
// #Menu
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.pushMapScene = function()
{
	this.createMenuBmp();
	this.createMenuMarkers();
	SceneManager.push(Scene_MiniMap);
};
//----------------------------------------------------------------------------------------------------
// Create Menu Bitmap
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.createMenuBmp = function()
{
	Silv.Minimap.Menu.Bmp = new Bitmap(this.mapBmp.width * this.menuZoom, this.mapBmp.height * this.menuZoom);
	
	this.tileInfo = {
			w: $gameMap.tileWidth(), hw: $gameMap.tileWidth() / 2.0, zhw: ($gameMap.tileWidth() / 2.0) * this.menuZoom,
			h: $gameMap.tileHeight(), hh: $gameMap.tileHeight() / 2.0, zhh: ($gameMap.tileHeight() / 2.0) * this.menuZoom
		};
	
	// Draw Map
	Silv.Minimap.Menu.Bmp.blt(this.mapBmp, 0, 0, this.mapBmp.width, this.mapBmp.height, 0, 0, Silv.Minimap.Menu.Bmp.width, Silv.Minimap.Menu.Bmp.height);
	
	// Draw Debug Grid
	if (Silv.Minimap.DrawDebugGrid)
	{
		for (var i=0; i < $gameMap.width(); i++)
		{
			for (j=0; j < $gameMap.height(); j++)
			{
				var debugTileLoc = this.translateLocationMenu(i, j, this.tileInfo.w * this.menuZoom, this.tileInfo.h * this.menuZoom);
				Silv.Minimap.Menu.Bmp.blt(this.debugGridBmp, 0, 0, this.tileInfo.w, this.tileInfo.h, debugTileLoc.x, debugTileLoc.y, this.tileInfo.w * this.menuZoom, this.tileInfo.h * this.menuZoom);
			}
		}
	}
	
	// Draw POI's
	for (var i = 0; i < this.getAllPOI().length; i++)
	{
		var poi = this.getPOIByIdx(i);
		var poiLoc = this.translateLocationMenu(poi.real_x, poi.real_y, poi.destSize.w, poi.destSize.h);
		Silv.Minimap.Menu.Bmp.blt(poi.bmp, poi.src.x, poi.src.y, poi.src.w, poi.src.h,
							      poiLoc.x, poiLoc.y, poi.destSize.w, poi.destSize.h);
	}
	
	// Draw Events
	for (var i=0; i < Silv.Minimap.Events.length; i++)
	{
		var ev = Silv.Minimap.Events[i].event;
		var ev_sprite = Silv.Minimap.Events[i].sprite;
		var evMapLoc = this.translateLocationMenu(ev._realX, ev._realY, Silv.Minimap.Menu.EventRenderSize, Silv.Minimap.Menu.EventRenderSize);
		Silv.Minimap.Menu.Bmp.blt(ev_sprite._bitmap, ev_sprite._frame.x, ev_sprite._frame.y, ev_sprite._frame.width, ev_sprite._frame.height, evMapLoc.x, evMapLoc.y, Silv.Minimap.Menu.EventRenderSize, Silv.Minimap.Menu.EventRenderSize);
	}
	
	// Draw Player
	var playerMapLoc = this.translateLocationMenu($gamePlayer._realX, $gamePlayer._realY, Silv.Minimap.Menu.PlayerIconSize, Silv.Minimap.Menu.PlayerIconSize);
	Silv.Minimap.Menu.Bmp.blt(Spriteset_Map.prototype.playerSprite._bitmap, Spriteset_Map.prototype.playerSprite._frame.x, Spriteset_Map.prototype.playerSprite._frame.y, Spriteset_Map.prototype.playerSprite._frame.width, Spriteset_Map.prototype.playerSprite._frame.height,
				           	  playerMapLoc.x, playerMapLoc.y, Silv.Minimap.Menu.PlayerIconSize, Silv.Minimap.Menu.PlayerIconSize);
};
//----------------------------------------------------------------------------------------------------
// Menu Create #Markers
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.createMenuMarkers = function()
{
	Silv.Minimap.Menu.Markers = new Array();
	
	// Player
	var playerMapLoc = this.translateLocationMenu($gamePlayer._realX, $gamePlayer._realY, Silv.Minimap.Menu.PlayerIconSize, Silv.Minimap.Menu.PlayerIconSize);
	Silv.Minimap.Menu.Markers.push({text:'Player', map_x:playerMapLoc.x, map_y:playerMapLoc.y, w:Silv.Minimap.Menu.PlayerIconSize, h:Silv.Minimap.Menu.PlayerIconSize, desc:Silv.Minimap.Menu.PlayerDesc, tp:null});
	
	// POI's
	for (var i = 0; i < this.getAllPOI().length; i++)
	{
		var poi = this.getPOIByIdx(i);
		var poiLoc = this.translateLocationMenu(poi.real_x, poi.real_y, poi.destSize.w, poi.destSize.h);
		
		var tp = poi.tp.slice(0); // slice(0) clones it
		if (this.allowTeleportation && (poi.tp != null))
		{
			tp[0] = parseInt(tp[0]) + parseInt(poi.real_x);
			tp[1] = parseInt(tp[1]) + parseInt(poi.real_y);
		}
		
		Silv.Minimap.Menu.Markers.push({text:poi.name, map_x:poiLoc.x, map_y:poiLoc.y, w:poi.destSize.w, h:poi.destSize.h, desc:poi.desc, tp:tp});
	}
	
	// Events
	for (var i=0; i < Silv.Minimap.Events.length; i++)
	{
		var ev = Silv.Minimap.Events[i].event;
		var evMapLoc = this.translateLocationMenu(ev._realX, ev._realY, Silv.Minimap.Menu.EventRenderSize, Silv.Minimap.Menu.EventRenderSize);
		
		var desc = '';
		if ('mm_desc' in ev) { desc = ev.mm_desc.join(' '); }
		
		var tp = null;
		if (this.allowTeleportation && ('mm_tp' in ev))
		{
			tp = ev.mm_tp.slice(0); // slice(0) clones it
			tp[0] = parseInt(tp[0]) + parseInt(ev._x);
			tp[1] = parseInt(tp[1]) + parseInt(ev._y);
		}
		
		Silv.Minimap.Menu.Markers.push({text:dataMapGetEventByID(ev._eventId).name, map_x:evMapLoc.x, map_y:evMapLoc.y, w:Silv.Minimap.Menu.EventRenderSize, h:Silv.Minimap.Menu.EventRenderSize, desc:desc, tp:tp});
	}
};
//----------------------------------------------------------------------------------------------------
// #Rendering #Drawing
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.drawMinimap = function()
{
	this.contents.clear();
	
	// BG fill colour, if applicable
	this.contents.fillRect(Silv.Minimap.BorderWidth, Silv.Minimap.BorderHeight, this.drawAreaWidth, this.drawAreaHeight, Silv.Minimap.MapBGFillColor);
	
	switch(Silv.Minimap.MapStyle)
	{
		case 'autofit':
			this.drawstyleAutofit();
			break;
		case 'scroll':
			this.drawstyleScroll();
			break;	
		default:
			throw 'Window_Minimap.prototype.drawMinimap invalid switch value: ' + Silv.Minimap.MapStyle;
	}
};

Window_Minimap.prototype.drawstyleAutofit = function()
{
	var destination_w = this.drawAreaWidth  * this.mapAspRatInfo.w;
	var destination_h = this.drawAreaHeight * this.mapAspRatInfo.h;
	
	// Calculate the aspect ratio offsets
	this.mapAspRatInfo.offset_x = 0.0; // to center the map
	this.mapAspRatInfo.offset_y = 0.0; // to center the map
	if (this.mapAspRatInfo.w < 1.0) { this.mapAspRatInfo.offset_x = (this.drawAreaWidth  - destination_w) / 2.0; }
	if (this.mapAspRatInfo.h < 1.0) { this.mapAspRatInfo.offset_y = (this.drawAreaHeight - destination_h) / 2.0; }
	
	// This variable saves on calculations further down the road during this update
	// w = width, hw=  half width, zhw = zoomed half width
	this.tileInfo = {
			w: $gameMap.tileWidth(), hw: $gameMap.tileWidth() / 2.0, zhw: ($gameMap.tileWidth() / 2.0) * this.mapAspRatInfo.w,
			h: $gameMap.tileHeight(), hh: $gameMap.tileHeight() / 2.0, zhh: ($gameMap.tileHeight() / 2.0) * this.mapAspRatInfo.h
		};
	
	// Draw Map
	this.contents.blt(this.mapBmp, 0, 0, this.mapBmp.width, this.mapBmp.height, Silv.Minimap.BorderWidth + this.mapAspRatInfo.offset_x, Silv.Minimap.BorderHeight + this.mapAspRatInfo.offset_y, destination_w, destination_h);

	// Debug Grid (if applicable)
	if (Silv.Minimap.DrawDebugGrid)
	{
		for (var i=0; i < $gameMap.width(); i++)
		{
			for (j=0; j < $gameMap.height(); j++)
			{
				var debugTileLoc = this.translateLocationAutofit(i, j, this.tileInfo.w * this.mapAspRatInfo.w, this.tileInfo.h * this.mapAspRatInfo.h);
				this.contents.blt(this.debugGridBmp, 0, 0, this.tileInfo.w, this.tileInfo.h, debugTileLoc.x, debugTileLoc.y, this.tileInfo.w * this.mapAspRatInfo.w, this.tileInfo.h * this.mapAspRatInfo.h);
			}
		}
	}
	
	// Draw POI's
	for (var i = 0; i < this.getAllPOI().length; i++)
	{
		var poi = this.getPOIByIdx(i);
		var poiLoc = this.translateLocationAutofit(poi.real_x, poi.real_y, poi.destSize.w, poi.destSize.h);
		this.contents.blt(poi.bmp, poi.src.x, poi.src.y, poi.src.w, poi.src.h,
		                  poiLoc.x, poiLoc.y, poi.destSize.w, poi.destSize.h);
	}
	
	// Draw Events
	for (var i=0; i < Silv.Minimap.Events.length; i++)
	{
		var ev = Silv.Minimap.Events[i].event;
		var ev_sprite = Silv.Minimap.Events[i].sprite;
		var evMapLoc = this.translateLocationAutofit(ev._realX, ev._realY, Silv.Minimap.EventRenderSize, Silv.Minimap.EventRenderSize);
		this.contents.blt(ev_sprite._bitmap, ev_sprite._frame.x, ev_sprite._frame.y, ev_sprite._frame.width, ev_sprite._frame.height, evMapLoc.x, evMapLoc.y, Silv.Minimap.EventRenderSize, Silv.Minimap.EventRenderSize);
	}
	
	// Draw Player
	if (Silv.Minimap.DrawPlayerIcon && this.playerBlink_IsVisible)
	{
		var playerMapLoc = this.translateLocationAutofit($gamePlayer._realX, $gamePlayer._realY, Silv.Minimap.PlayerIconWidth, Silv.Minimap.PlayerIconHeight);
		this.contents.blt(Spriteset_Map.prototype.playerSprite._bitmap, Spriteset_Map.prototype.playerSprite._frame.x, Spriteset_Map.prototype.playerSprite._frame.y, Spriteset_Map.prototype.playerSprite._frame.width, Spriteset_Map.prototype.playerSprite._frame.height,
		                  playerMapLoc.x, playerMapLoc.y, Silv.Minimap.PlayerIconWidth, Silv.Minimap.PlayerIconHeight);
	}
	
	// Overlay (if applicable)
	if(Silv.Minimap.DrawOverlay) { this.drawOverlay(); }
};

Window_Minimap.prototype.drawstyleScroll = function()
{
	// The minimap is so large it would require a source-map that is bigger. Because of this the entire map fits onto the minimap anyway so might as well switch to autofit instead of displaying a black image
	if (this.mapScroll.x < 0 || this.drawAreaWidth  * this.mapZoomInverse > this.mapBmp.width ||
		this.mapScroll.y < 0 || this.drawAreaHeight * this.mapZoomInverse > this.mapBmp.height)
		{
			this.drawstyleAutofit();
			return;
		}
	
	// This variable saves on calculations further down the road during this update
	// w = width, hw=  half width, zhw = zoomed half width
	this.tileInfo = {
			w: $gameMap.tileWidth(), hw: $gameMap.tileWidth() / 2.0, zhw: ($gameMap.tileWidth() / 2.0) * this.mapZoom,
			h: $gameMap.tileHeight(), hh: $gameMap.tileHeight() / 2.0, zhh: ($gameMap.tileHeight() / 2.0) * this.mapZoom
		};
	
	// Draw Map
	var map_src_rect = { x:0.0, y:0.0, w:0.0, h:0.0};
	map_src_rect.x = this.mapScroll.x;
	map_src_rect.y = this.mapScroll.y;
	map_src_rect.w = this.drawAreaWidth * this.mapZoomInverse;
	map_src_rect.h = this.drawAreaHeight * this.mapZoomInverse;
	
	this.contents.blt(this.mapBmp, this.mapScroll.x, this.mapScroll.y, this.drawAreaWidth * this.mapZoomInverse, this.drawAreaHeight * this.mapZoomInverse, Silv.Minimap.BorderWidth, Silv.Minimap.BorderHeight, this.drawAreaWidth, this.drawAreaHeight);
	
	// Debug Grid (if applicable)
	if (Silv.Minimap.DrawDebugGrid)
	{
		for (var i=0; i < $gameMap.width(); i++)
		{
			for (j=0; j < $gameMap.height(); j++)
			{
				var debugTileLoc = this.translateLocationScroll(i, j, this.tileInfo.w * this.mapZoom, this.tileInfo.h * this.mapZoom);
				this.contents.blt(this.debugGridBmp, 0, 0, this.tileInfo.w, this.tileInfo.h, debugTileLoc.x, debugTileLoc.y, this.tileInfo.w * this.mapZoom, this.tileInfo.h * this.mapZoom);
			}
		}
	}
	
	// Draw POI's
	for (var i = 0; i < this.getAllPOI().length; i++)
	{
		var poi = this.getPOIByIdx(i);
		var poiLoc = this.translateLocationScroll(poi.real_x, poi.real_y, poi.destSize.w, poi.destSize.h);
		this.contents.blt(poi.bmp, poi.src.x, poi.src.y, poi.src.w, poi.src.h,
		                  poiLoc.x, poiLoc.y, poi.destSize.w, poi.destSize.h);
	}

	// Draw Events
	for (var i=0; i < Silv.Minimap.Events.length; i++)
	{
		var ev = Silv.Minimap.Events[i].event;
		var ev_sprite = Silv.Minimap.Events[i].sprite;
		var evMapLoc = this.translateLocationScroll(ev._realX, ev._realY, Silv.Minimap.EventRenderSize, Silv.Minimap.EventRenderSize);
		this.contents.blt(ev_sprite._bitmap, ev_sprite._frame.x, ev_sprite._frame.y, ev_sprite._frame.width, ev_sprite._frame.height, evMapLoc.x, evMapLoc.y, Silv.Minimap.EventRenderSize, Silv.Minimap.EventRenderSize);
	}
	
	// Draw Player
	if (Silv.Minimap.DrawPlayerIcon && this.playerBlink_IsVisible)
	{
/*		if (!this.isManualScrolling) // note to self, can't the player just be drawn without this if-statement?
		{
			var playerLoc_x = this.drawAreaWidth  / 2.0 + this.mapScroll.adjustment_x * this.mapZoom;
			var playerLoc_y = this.drawAreaHeight / 2.0 + this.mapScroll.adjustment_y * this.mapZoom;
			// Now center the location in the center of the tiles instead of the topleft corner
			playerLoc_x += this.tileInfo.zhw - Silv.Minimap.PlayerIconWidth / 2.0;
			playerLoc_y += this.tileInfo.zhh - Silv.Minimap.PlayerIconHeight / 2.0;
			this.contents.blt(Spriteset_Map.prototype.playerSprite._bitmap, Spriteset_Map.prototype.playerSprite._frame.x, Spriteset_Map.prototype.playerSprite._frame.y, Spriteset_Map.prototype.playerSprite._frame.width, Spriteset_Map.prototype.playerSprite._frame.height,
							  Silv.Minimap.BorderWidth + playerLoc_x, Silv.Minimap.BorderHeight + playerLoc_y, Silv.Minimap.PlayerIconWidth, Silv.Minimap.PlayerIconHeight);
		}
		else
		{*/
		var playerLoc = this.translateLocationScroll($gamePlayer._realX, $gamePlayer._realY, Silv.Minimap.PlayerIconWidth, Silv.Minimap.PlayerIconHeight);
		this.contents.blt(Spriteset_Map.prototype.playerSprite._bitmap, Spriteset_Map.prototype.playerSprite._frame.x, Spriteset_Map.prototype.playerSprite._frame.y, Spriteset_Map.prototype.playerSprite._frame.width, Spriteset_Map.prototype.playerSprite._frame.height,
						  playerLoc.x, playerLoc.y, Silv.Minimap.PlayerIconWidth, Silv.Minimap.PlayerIconHeight);			
		//}
	}
	// Overlay (if applicable)
	if(Silv.Minimap.DrawOverlay) { this.drawOverlay(); }
};

Window_Minimap.prototype.drawOverlay = function()
{
	this.contents.blt(this.overlayBmp, 0, 0, this.overlayBmp.width, this.overlayBmp.height, 0, 0, this.width, this.height);
};

// #Translate
// returns {x, y}
Window_Minimap.prototype.translateLocationScroll = function(obj_real_x, obj_real_y, obj_w, obj_h)
{
	var obj_x = (obj_real_x * this.tileInfo.w + this.tileInfo.hw) * this.mapZoom - this.mapScroll.x * this.mapZoom - obj_w / 2.0 + Silv.Minimap.BorderWidth;
	var obj_y = (obj_real_y * this.tileInfo.h + this.tileInfo.hh) * this.mapZoom - this.mapScroll.y * this.mapZoom - obj_h / 2.0 + Silv.Minimap.BorderHeight;
	return {x: obj_x, y: obj_y}; 
};

// returns {x, y}
Window_Minimap.prototype.translateLocationAutofit = function(obj_real_x, obj_real_y, obj_w, obj_h)
{
	var obj_x = (obj_real_x * this.tileInfo.w + this.tileInfo.hw) * this.mapAspRatInfo.scaleDelta_x * this.mapAspRatInfo.w - obj_w / 2.0 + this.mapAspRatInfo.offset_x + Silv.Minimap.BorderWidth;
	var obj_y = (obj_real_y * this.tileInfo.h + this.tileInfo.hh) * this.mapAspRatInfo.scaleDelta_y * this.mapAspRatInfo.h - obj_h / 2.0 + this.mapAspRatInfo.offset_y + Silv.Minimap.BorderHeight;
	return {x: obj_x, y: obj_y};
};

// returns {x, y}
Window_Minimap.prototype.translateLocationMenu = function(obj_real_x, obj_real_y, obj_w, obj_h)
{
	var obj_x = (obj_real_x * this.tileInfo.w + this.tileInfo.hw) * this.menuZoom - obj_w / 2.0;
	var obj_y = (obj_real_y * this.tileInfo.h + this.tileInfo.hh) * this.menuZoom - obj_h / 2.0;
	return {x: obj_x, y: obj_y};
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// #POI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MM_POI() { this.initialize.apply(this, arguments); }
// Set Constructor
MM_POI.prototype.constructor = MM_POI;

// Initialization
// real_x & real_y are in tiles
MM_POI.prototype.initialize = function(poi_id, name, desc, real_x, real_y, folderPath, filename, source_x, source_y, source_w, source_h, draw_w, draw_h)
{
  this.id = poi_id;
  this.name = name;
  this.desc = desc;
  this.real_x = real_x;
  this.real_y = real_y;
  this.folderPath = folderPath; // Required for saving&loading
  this.filename = filename; // Required for saving&loading
  this.bmp = ImageManager.loadBitmap(folderPath, filename, 0, false);
  this.src = { x:source_x, y:source_y, w:source_w, h:source_h };
  this.destSize = { w:draw_w, h:draw_h };
  this.tp = null;
};

// Note: Does not include the Bitmap
MM_POI.prototype.makeSaveContents = function()
{
	return 	{ id:this.id, name:this.name, desc:this.desc, real_x:this.real_x, real_y:this.real_y, src:this.src, destSize:this.destSize, folderPath:this.folderPath, filename:this.filename, tp:this.tp };
};

// Retrieves all the POI's for the current active $gameMap
Window_Minimap.prototype.getAllPOI = function()
{
	return Silv.Minimap.POI[$gameMap._mapId];
};

// Retrieves the specified POI by index for the current active $gameMap. Note this is NOT by POI id, this is by index.
Window_Minimap.prototype.getPOIByIdx = function(index)
{
	return Silv.Minimap.POI[$gameMap._mapId][index];
};

Window_Minimap.prototype.getPOIByID = function(id)
{
	for (var i=0; i<Silv.Minimap.POI[$gameMap._mapId].length; i++)
	{
		if (Silv.Minimap.POI[$gameMap._mapId][i].id == id) { return Silv.Minimap.POI[$gameMap._mapId][i]; }
	}
	throw 'getPOIByID(' + id + ') not found.';
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// #Create the Minimap window
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Scene_Map.prototype.createMinimapWindow = function()
{
	x = 0;
	if (Silv.Minimap.WindowHorizontalAlignment == 'right') { x = Graphics.width - Silv.Minimap.WindowWidth; }
	y = 0;
	if (Silv.Minimap.WindowVerticalAlignment == 'bottom') { y = Graphics.height - Silv.Minimap.WindowHeight; }
	
	Silv.Minimap.Window = this.window_Minimap = new Window_Minimap(x + Silv.Minimap.Window_X, y + Silv.Minimap.Window_Y, Silv.Minimap.WindowWidth, Silv.Minimap.WindowHeight);
	Silv.Minimap.Window.resetFade();
	
	// override frameskip (map-specific frameskip)
	if ('mm_frameskip' in $dataMap.meta)
	{
		Silv.Minimap.Window.frameSkip = parseInt($dataMap.meta.mm_frameskip);
		if (Silv.Minimap.DebugMode) { console.log('Global frameskip: ' + Silv.Minimap.FrameSkip + ' was overriden by the map-specific frameskip of: ' + $dataMap.meta.mm_frameskip + '.'); }
	}
	
	this.addChildAt(this.window_Minimap, 1);
};

Scene_Map.prototype.AttemptToCreateMinimap = function()
{
	var mapname = lpad_mapname($gameMap._mapId, '0') + '.png';
	if (minimapImageExists(mapname))
	{
		if (this.MinimapHasRequiredItems())
		{
			this.createMinimapWindow();
		}
	}
	else
	{
		if (Silv.Minimap.DebugMode) { console.log('No minimap \'' + mapname + '\' found for map with map-id: ' + $gameMap._mapId + '.'); }
	}
};

var alias_silver_mm_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function()
{
	alias_silver_mm_createDisplayObjects.call(this);
	
	if ($gameMap._mapId != Silv.Minimap.LastMapID)
	{
		if (Silv.Minimap.WasLoadedFromSave)
		{
			Silv.Minimap.WasLoadedFromSave = false;
		}
		else
		{
			if (Silv.Minimap.AutoClearPOI) { Silv.Minimap.POI[$gameMap._mapId] = new Array(); } // this must only be called during map transfer...
		}
	}
	if (typeof Silv.Minimap.POI[$gameMap._mapId] === 'undefined') {Silv.Minimap.POI[$gameMap._mapId] = new Array() };

	this.AttemptToCreateMinimap();
	Silv.Minimap.LastMapID = $gameMap._mapId;
};

Scene_Map.prototype.MinimapHasRequiredItems = function()
{
	// Check global item
	if (Silv.Minimap.GlobalRequiredItem > 0)
	{
		if (!$gameParty.hasItem($dataItems[Silv.Minimap.GlobalRequiredItem], false))
		{
			if (Silv.Minimap.DebugMode) { console.log('Minimap was found but party does not possess the required global item: ' + $dataItems[Silv.Minimap.GlobalRequiredItem].name); }
			return false;
		}
	}
	
	// Check map-specific items
	if ('mm_req_itm' in $dataMap.meta)
	{
		var req_item_ids = $dataMap.meta.mm_req_itm.split(' ').filter(Boolean); // .filter(Boolean) removes empty strings from array
		for (var i = 0; i < req_item_ids.length; i++)
		{
			if (!$gameParty.hasItem($dataItems[req_item_ids[i]], false))
			{
				if (Silv.Minimap.DebugMode) { console.log('Minimap was found but party does not possess the required map-specific item: ' + $dataItems[req_item_ids[i]].name); }
				return false;
			}
		}
	}
	
	return true;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Saving & Loading #Save #Saving #Loading
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var alias_silv_mm_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function()
{
	contents = alias_silv_mm_makeSaveContents.call(this);
	
	contents.minimap = {};
	contents.minimap.poi = {};
	
	// POI
	for (var mapID in Silv.Minimap.POI)
	{
		if (Silv.Minimap.POI.hasOwnProperty(mapID))
		{
			if(Silv.Minimap.POI[mapID].length > 0) { contents.minimap.poi[mapID] = new Array(); }
			for(var poi_idx=0; poi_idx<Silv.Minimap.POI[mapID].length; poi_idx++)
			{
				contents.minimap.poi[mapID].push(Silv.Minimap.Window.getPOIByIdx(poi_idx).makeSaveContents());
			}
		}
	}
	return contents;
};

var alias_silv_mm_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
	alias_silv_mm_extractSaveContents.call(this, contents);
	Silv.Minimap.POI = {};
	
	
	// POI
	for (var mapID in contents.minimap.poi)
	{
		if (contents.minimap.poi.hasOwnProperty(mapID))
		{
			if(contents.minimap.poi[mapID].length > 0) { Silv.Minimap.POI[mapID] = new Array(); }
			for(var poi_idx=0; poi_idx<contents.minimap.poi[mapID].length; poi_idx++)
			{
				var poi = contents.minimap.poi[mapID][poi_idx];
				var newPOI = new MM_POI(poi.id, poi.name, poi.desc, poi.real_x, poi.real_y, poi.folderPath, poi.filename, poi.src.x, poi.src.y, poi.src.w, poi.src.h, poi.destSize.w, poi.destSize.h);
				newPOI.tp = poi.tp;
				Silv.Minimap.POI[mapID].push(newPOI);
			}
		}
	}
	
	// Prevent the minimap from autoclearing it's POI's (if AutoClearPOI is enabled) when loading a savegame
	Silv.Minimap.WasLoadedFromSave = true;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// #Plugin Command
// Note: The items are separated by spaces. The command is the first word and any following words are args. args is an array.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
	_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command.toLowerCase() == 'minimap') { PluginCommand(command, args); }
};

function PluginCommand(cmd, args)
{
	switch(args[0].toLowerCase())
	{
		case 'hide':
			Silv.Minimap.Window.hide();
			break;
		case 'show':
			Silv.Minimap.Window.show();
			break;
		case 'fadeout':
			Silv.Minimap.Window.isFadingOut = true;
			break;
		case 'fadereset':
			Silv.Minimap.Window.resetFade();
			break;
		case 'refresh':
			SceneManager._scene.AttemptToCreateMinimap();
			break;
		case 'addpoi': // addpoi id, name, desc, real_x, real_y, bitmap folder, bitmap filename, s_x, s_y, s_w, s_h, draw_w, draw_h
		    Silv.Minimap.POI[$gameMap._mapId].push(new MM_POI(args[1], args[2].replace('_', ' '), '', parseFloat(args[3]), parseFloat(args[4]), args[5], args[6], parseInt(args[7]), parseInt(args[8]), parseInt(args[9]), parseInt(args[10]), parseInt(args[11]), parseInt(args[12])));
			SceneManager._scene.AttemptToCreateMinimap();
			break;
		case 'deletepoi':
			Silv.Minimap.POI[$gameMap._mapId] = Silv.Minimap.POI[$gameMap._mapId].filter(function(poi) { return poi.id != args[1]; });
			break;
		case 'poidesc':
			  Silv.Minimap.Window.getPOIByID(parseInt(args[1])).desc = args.join(' ').substr(2 + args[0].length + args[1].length);
			break;
		case 'poi_tp': // POI_TP <poi_id x_offset, y_offset, direction, fadeType>
			  Silv.Minimap.Window.getPOIByID(parseInt(args[1])).tp = [parseInt(args[2]), parseInt(args[3]), parseInt(args[4]), parseInt(args[5])]
			break;
		case 'refreshevents':
			Silv.Minimap.Window.loadEvents();
			break;
		case 'increasescroll':
			Silv.Minimap.Window.manualScroll(Silv.Minimap.Window.mapScroll.x + parseFloat(args[1]), Silv.Minimap.Window.mapScroll.y + parseFloat(args[2]));
			break;
		case 'setscroll':
			Silv.Minimap.Window.manualScroll(parseFloat(args[1]), parseFloat(args[2]));
			break;
		default:
			throw 'Minimap, unknown Plugin Command: ' + args[0];
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Map Menu #Scene
// Note: Must be placed outside of the })();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Scene_MiniMap() { this.initialize.apply(this, arguments); }

Scene_MiniMap.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MiniMap.prototype.constructor = Scene_MiniMap;

Scene_MiniMap.prototype.initialize = function()
{
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_MiniMap.prototype.create = function()
{
    Scene_MenuBase.prototype.create.call(this);
    this.createLeftWindow();
    this.createMapSectionWindow();
    this.createMapHelpWindow();
	this.refreshHelpWindow();
};

Scene_MiniMap.prototype.createLeftWindow = function()
{
    this._window_left = new Window_MinimapMenuLeft(0, 0);
    this._window_left.setHandler('ok',     this.onRangeOk.bind(this));
    this._window_left.setHandler('cancel', this.popScene.bind(this));
	this._window_left.setHandler('index_changed', this.index_changed.bind(this));
    this.addWindow(this._window_left);
};

Scene_MiniMap.prototype.createMapSectionWindow = function()
{
    var wx = this._window_left.width;
    var ww = Graphics.boxWidth - wx;
    this._mapSectionWindow = new Window_MapSection(wx, 0, ww);
    this._mapSectionWindow.setHandler('cancel', this.onEditCancel.bind(this));
    this._window_left.setMapWindow(this._mapSectionWindow);
    this.addWindow(this._mapSectionWindow);
};

Scene_MiniMap.prototype.createMapHelpWindow = function()
{
    var wx = this._mapSectionWindow.x;
    var wy = this._mapSectionWindow.height;
    var ww = this._mapSectionWindow.width;
    var wh = Graphics.boxHeight - wy;
    this._mapHelpWindow = new Window_Base(wx, wy, ww, wh);
    this.addWindow(this._mapHelpWindow);
};

Scene_MiniMap.prototype.index_changed = function()
{
    this.refreshHelpWindow();
};

Scene_MiniMap.prototype.onRangeOk = function()
{
    this._mapSectionWindow.activate();
    this._mapSectionWindow.select(0);
    this.refreshHelpWindow();
};

Scene_MiniMap.prototype.onEditCancel = function()
{
    this._window_left.activate();
    this._mapSectionWindow.deselect();
    this.refreshHelpWindow();
};

Scene_MiniMap.prototype.refreshHelpWindow = function()
{
    this._mapHelpWindow.contents.clear();
    this._mapHelpWindow.drawTextEx(this.helpText(), 4, 0);
};

Scene_MiniMap.prototype.helpText = function()
{
	var marker = this._window_left.marker();
	var tp_text = '';
	if (marker.tp != null) { tp_text = '\nTeleports you to: ' + marker.tp[0] + ',' + marker.tp[1]; }
	return this._window_left.marker().desc + tp_text;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Left Window #leftwindow
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Window_MinimapMenuLeft() { this.initialize.apply(this, arguments); }

Window_MinimapMenuLeft.prototype = Object.create(Window_Selectable.prototype);
Window_MinimapMenuLeft.prototype.constructor = Window_MinimapMenuLeft;

Window_MinimapMenuLeft.lastTopRow = 0;
Window_MinimapMenuLeft.lastIndex  = 0;

Window_MinimapMenuLeft.prototype.initialize = function(x, y)
{
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.setTopRow(Window_MinimapMenuLeft.lastTopRow);
    this.select(Window_MinimapMenuLeft.lastIndex);
    this.activate();
};

Window_MinimapMenuLeft.prototype.windowWidth = function()
{
	return Silv.Minimap.Menu.WindowWidth_Left;
};

Window_MinimapMenuLeft.prototype.windowHeight = function()
{
    return Graphics.boxHeight;
};

Window_MinimapMenuLeft.prototype.maxItems = function()
{
    return Silv.Minimap.Menu.Markers.length;
};

Window_MinimapMenuLeft.prototype.update = function()
{
    Window_Selectable.prototype.update.call(this);
    if (this._mapWindow) { this._mapWindow.setMarker(this.marker()); }
	if (this.index() != Window_MinimapMenuLeft.lastIndex)
	{
		Window_MinimapMenuLeft.lastIndex = this.index();
		this.callHandler('index_changed');
	}
	
	if (Input.isTriggered('ok'))
	{
		var marker = this.marker();
		if(marker.tp != null)
		{
			// Add the teleport location to the minimap and dequeue this scene to return to the previous scene
			SoundManager.playOk();
			Silv.Minimap.TP_Dest = marker.tp;
			SceneManager.pop();
		}
	}
};

Window_MinimapMenuLeft.prototype.marker = function()
{
	return Silv.Minimap.Menu.Markers[this.index()];
};

Window_MinimapMenuLeft.prototype.refresh = function()
{
    this.createContents();
    this.drawAllItems();
};

Window_MinimapMenuLeft.prototype.drawItem = function(index)
{
    var rect = this.itemRectForText(index);
    var text = Silv.Minimap.Menu.Markers[index].text;
    this.drawText(text, rect.x, rect.y, rect.width);
};

Window_MinimapMenuLeft.prototype.isCancelTriggered = function()
{
    return (Window_Selectable.prototype.isCancelTriggered());
};

Window_MinimapMenuLeft.prototype.processCancel = function()
{
    Window_Selectable.prototype.processCancel.call(this);
    Window_MinimapMenuLeft.lastTopRow = this.topRow();
    Window_MinimapMenuLeft.lastIndex = this.index();
};

Window_MinimapMenuLeft.prototype.setMapWindow = function(mapWindow)
{
    this._mapWindow = mapWindow;
    this.update();
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Map Section Window
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Window_MapSection() { this.initialize.apply(this, arguments); }

Window_MapSection.prototype = Object.create(Window_Selectable.prototype);
Window_MapSection.prototype.constructor = Window_MapSection;

Window_MapSection.prototype.initialize = function(x, y, width)
{
    var height = Silv.Minimap.Menu.WindowHeight_MapSection;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._marker = 1;
	this.mapScroll = {x:0, y:0};
	this.mapZoom = 1.0;
	this.centerLoc = {x:width / 2.0, y: height / 2.0};
    this.refresh();
};

// Hide the cursor
Window_MapSection.prototype.updateCursor = function()
{
	this.setCursorRect(0,0,0,0);
}

Window_MapSection.prototype.maxItems = function() { return 0; };

Window_MapSection.prototype.refresh = function()
{
    this.contents.clear();
	this.drawMap();
};

// Prevent anything from being drawn in the base-class
Window_MapSection.prototype.drawAllItems = function(){};

Window_MapSection.prototype.drawMap = function()
{
	this.contents.blt(Silv.Minimap.Menu.Bmp, 0, 0, Silv.Minimap.Menu.Bmp.width, Silv.Minimap.Menu.Bmp.height, this.mapScroll.x, this.mapScroll.y, Silv.Minimap.Menu.Bmp.width * this.mapZoom, Silv.Minimap.Menu.Bmp.height * this.mapZoom);
};

Window_MapSection.prototype.centerOnMarker = function(marker)
{
	this.mapScroll.x = this.centerLoc.x - marker.map_x - marker.w / 2.0;
	this.mapScroll.y = this.centerLoc.y - marker.map_y - marker.h / 2.0;
	this.refresh();
}

Window_MapSection.prototype.setMarker = function(marker)
{
    if (this._marker !== marker) {
        this._marker = marker;
		this.centerOnMarker(marker)
    }
};

Window_MapSection.prototype.update = function()
{
    Window_Selectable.prototype.update.call(this);
    if (this.active) {
		if (Input.isPressed('up')) { this.mapScroll.y += 10; this.refresh(); }
		if (Input.isPressed('right')) { this.mapScroll.x -= 10; this.refresh(); }
		if (Input.isPressed('down')) { this.mapScroll.y -= 10; this.refresh(); }
		if (Input.isPressed('left')) { this.mapScroll.x += 10; this.refresh(); }
		if (Input.isPressed(Silv.Minimap.Menu.ManualScrollKey_Reset)) { this.mapScroll.x = 0; this.mapScroll.y = 0; this.refresh(); }
		
		if (Input.isPressed(Silv.Minimap.Menu.ManualZoomKey_In))
		{
			this.mapZoom += 0.05;
			if (this.mapZoom > Silv.Minimap.Menu.ManualZoom_Max) { this.mapZoom = Silv.Minimap.Menu.ManualZoom_Max; }
			this.refresh();
		}
		if (Input.isPressed(Silv.Minimap.Menu.ManualZoomKey_Out))
		{
			this.mapZoom -= 0.05;
			if (this.mapZoom < Silv.Minimap.Menu.ManualZoom_Min) { this.mapZoom = Silv.Minimap.Menu.ManualZoom_Min; }
			this.refresh();
		}
		if  (Input.isPressed(Silv.Minimap.Menu.ManualZoomKey_Reset)) { this.mapZoom = 1.0; this.refresh(); }
    }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This is the end of this awesome script! Why did you even read this line ;)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////