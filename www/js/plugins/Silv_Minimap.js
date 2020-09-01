//=============================================================================
// SilvMinimap.js
// Version: 1.14a
// Requires plugin: SilvKeys (place this one below it)
//=============================================================================
/*:
 * @plugindesc v1.14a Minimap. <SilvMinimap>
 * @author Silver
 * @param -- General --
 *
 * @param Map Style
 * @desc Is the minimap scaled to fit? Or does it zoom and scroll? Autofit/Scroll
 * @default Scroll
 *
 * @param Global Map Zoom
 * @desc Only applies if MapStyle is set to: Scroll. Determines the default zoom level for all maps. A value of 1 means 1:1.
 * @default 0.25
 *
 * @param Minimap Opacity
 * @desc 0 = invisible, 255 = fully opaque.
 * @default 255
 *
 * @param Visible By Default?
 * @desc Will the minimap be visible by default. This applies to each map. If set to false, also overrides any plugin commands upon entering a new map. true/false
 * @default true
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
 * @param -- Player Blip --
 *
 * @param Render Player Blip
 * @desc Render the player blip in the minimap (=usually the center icon)? true/false
 * @default true
 *
 * @param Player Blip Graphic
 * @desc Name of the image (in /img/minimap/) to use as the blip. or use :player to use the realtime-player-graphic.
 * @default :player
 *
 * @param Player Icon Width
 * @desc Standard Window Padding
 * @default 16
 *
 * @param Player Icon Height
 * @desc Standard Window Padding
 * @default 16
 *
 * @param Player Blink Delay
 * @desc Blinks the player icon (in frames). Set to 0 to disable. Does nothing if "Draw Player Icon" is set to false
 * @default 0
 *
 * @param -- Vehicles --
 *
 * @param Show Vehicles
 * @desc Show the vehicles on the minimap? Note that the parameters below will override this one.
 * @default true
 *
 * @param Show Boat
 * @desc Show the boat on the minimap?
 * @default true
 *
 * @param Show Ship
 * @desc Show the ship on the minimap?
 * @default true
 *
 * @param Show Airship
 * @desc Show the airship on the minimap?
 * @default true
 *
 * @param Vehicle Render size
 * @desc The width and height of the vehicles on the minimap
 * @default 40 40
 *
 * @param Always Show Vehicles
 * @desc Set this parameter to true if you use custom vehicles and if you want them shown on the minimap.
 * @default false
 *
 * @param -- Menu --
 *
 * @param Menu Key
 * @desc The key used to show the map-menu. Use none to disable.
 * @default m
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
 * @param -- Passability Map --
 *
 * @param Passability Overlay Opacity
 * @desc 0 = invisible, 255 = fully opaque. 0-255
 * @default 128
 *
 * @param Passability Color
 * @desc Color for walkable tiles
 * @default #6B8E23
 *
 * @param Impassability Color
 * @desc Color for unwalkable tiles
 * @default #FF0000
 *
 * @param -- Map Generator --
 *
 * @param Map Gen Tag Colors
 * @desc 0-7, use a ####### value to ignore that terrain-tag. Default: lightgreen, blue, brown, darkgreen, lightbrown
 * @default #6B8E23 #00008B #8B4513 #006400 #F4A460 ####### ####### #FFFFFF
 *
 * @param Overworld Gen Tag Colors
 * @desc 0-7, use a ####### value to ignore that terrain-tag. Default: lightgreen, blue, brown, darkgreen, lightbrown
 * @default #6B8E23 #00008B #8B4513 #006400 #F4A460 ####### ####### #FFFFFF
 *
 * @param Map Gen Region Colors
 * @desc Use <region_id>:<hex_color> to add a color. Each entry is separated by a space. Note that regions will override tag-colors.
 * @default 10:#6B8E23 11:#00008B 12:#8B4513 13:#006400 14:#F4A460
 *
 * @param Overworld Gen Region Colors
 * @desc Use <region_id>:<hex_color> to add a color. Each entry is separated by a space. Note that regions will override tag-colors.
 * @default 10:#6B8E23 11:#00008B 12:#8B4513 13:#006400 14:#F4A460
 *
 * @param -- The rest --
 *
 * @param Allow Teleportation
 * @desc By default, allow teleportation to events/poi's that support it? true/false
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
 * @desc If enabled, add the image: /img/minimap/Overlay.png and it will be drawn on top of the minimap. true/false
 * @default true
 *
 * @param -- Fog of War --
 *
 * @param FoW Enabled
 * @desc Enable Fog of War? Can be overridden on a per-map-basis. true/false
 * @default false
 *
 * @param Default FoW Overlay
 * @desc The default Fog of War (PNG) overlay image name in "<project>/img/minimap/"
 * @default FoW
 *
 * @param Default FoW Radius
 * @desc How far into the FoW the player can see.
 * @default 5
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
 * @param Player Sprite Sourceframe Width
 * @desc Width of the playersprite sourceframe
 * @default 48
 *
 * @param Player Sprite Sourceframe Height
 * @desc Heigth of the playersprite sourceframe
 * @default 48
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
 * - If you prefer to use automatic generated maps instead, use the map-notetags and you then obviously do not require mapshots of course.
 * - To enable Fog of War, copy the new FoW.png to the <project>/img/minimap/ folder and set the parameter "FoW Enabled" to true. And make sure that the current map has a minimap of course ;).
 *   FoW also works for generated maps. POI's and Events however will always be displayed on top of the FoW. This is intended.
 *
 *--------------------------------------
 * Yanfly's Main Menu Manager Setup (optional)
 *--------------------------------------
 *
 * 1. Download & Install YEP_MainMenuManager.js
 * 2. Configure the parameters as follow:
 * Menu Name: "Map"
 * Menu Symbol: silvMap
 * Menu Show: true
 * Menu Enabled: Silv.Minimap.Menu.Enabled
 * Menu Main Bind: this.commandSilvMap.bind(this)
 *
 *--------------------------------------
 * Map notetags (most are case sensitive!)
 *--------------------------------------
 * <mm_req_itm:item_id1 item_id2 etc>
 * Example: <mm_req_itm:1, 2, 3>
 *
 * <mm_mapstyle:Scroll/Autofit>
 * Examples:
 * <mm_mapstyle:Scroll>
 * <mm_mapstyle:AutoFit>
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
 * Generate a worldmap-minimap if there is no image (does increase load-time, the first time, for the map)
 * <mm_generate_worldmap>
 * <mm_generate_overworld>
 *
 * Generate regular map (same as mm_generate_overworld but uses a different parameter-color-generator-tag)
 * <mm_generate_map>
 *
 * Generate and overlay a generated passability-map on top of the minimap
 * <mm_generate_passability_overlay>
 *
 * Change the player-blip
 * <mm_player_blip:value>
 * Example to use the realtime player graphic:
 * <mm_player_blip::player>
 * Example to use a custom blip graphic:
 * <mm_player_blip:myCustomPlayerBlip>
 * Note that in the above example, the game requires the image /img/minimap/myCustomPlayerBlip.png"
 *
 * Use another map's mapshot (handy for duplicate maps)
 * <mm_mapshot:map_id>
 * Example: <mm_mapshot:2>
 * Note: leading zero's are optional but not required.
 *
 * To use a different map-image for the map-scene:
 * <mm_menu_bg:imageName>
 * Example: <mm_menu_bg:myFantasticMap>
 * Note1: Must be in png-format
 * Note2: Must be placed in the same folder that also stores the mapshots
 * Note3: If the size differs from the real mapshot (or generated map) then positioning of objects like the player-location may occur. So respect the original size!
 *
 * <mm_fow_enabled:value> // value: true/false
 * Example: <mm_fow_enabled:false>
 * Note: overrides the default "FoW Enabled" parameter
 *
 * <mm_fow_ov:value> // value: name of PNG-image placed in <project>/img/minimap/
 * Example: <mm_fow_enabled:FoW2>
 * Note: overrides the default "Default FoW Overlay" parameter
 *
 * <mm_fow_radius:value> // value is an integer value with a minimum value of 0.
 *
 * <mm_fow_completion:value> // an integer value (positive or negative) that will add/subtract to the total amount of 'explorable' tiles count for the Fog of War. This will only affect the completion % (how many tiles the player revealed for that map).
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
 * Minimap Generate_Passability_Overlay <true/false>
 * Minimap Gen_Pass_Ov <true/false>
 * Minimap ShowMapMenu
 * Minimap SetPlayerBlip <filename/:player>
 *
 * Minimap SetFollowTarget <type> <value>
 * Minimap setcamera <type> <value>
 * Allowed types: player, event, coordinate
 * Note: the player-type has no value parameter.
 * Examples:
 * Minimap SetFollowTarget player
 * Minimap SetFollowTarget event 1
 * Minimap SetFollowTarget coordinate 10 20
 *
 * Minimap POIDesc <description>
 * Example: Minimap POIDesc An Awesome City!
 *
 * Minimap POI_TP <poi_id x_offset y_offset direction fadeType>
 * Example: Minimap POI_TP 1 1 0 0 0
 * Note that teleporting with both offsets set to 0, will teleport the player straight into the center of the poi.
 *
 * Vehicles:
 * Minimap RenderVehicle All true/false
 * Minimap RenderVehicle Boat true/false
 * Minimap RenderVehicle Ship true/false
 * Minimap RenderVehicle Airship true/false
 * Minimap RenderVehicle ForceAll true/false       // This plugin-command is for custom vehicles.
 *
 * Adding POI's (advanced plugin command!):
 * Minimap AddPOI unique_poi_id, name, real_x, real_y, bitmap folder, bitmap filename, s_x, s_y, s_w, s_h, draw_w, draw_h
 * Example that draws Actor1_3 on tile 10,10:
 * Minimap AddPOI 1 A_Friend 10 10 img/enemies/ Actor1_3 0 0 254 225 64 64
 * Note:
 * - The real_x & real_y are in maptiles and not in coordinates. 0,0 is in the upper left corner.
 * - name-value replaces underscores _  with spaces.
 *
 * Minimap FoWShowTile x y
 * Minimap FoWHideTile x y
 * Example: Minimap FoWShowTile 10 15
 * Note: no sanity-checks are performed for these 2 plugin commands. So for example: if you show/hide a tile outside of the map boundaries or supply a NaN-value or other weird value for the x&y, it's your problem.
 * 
 * Minimap FoWChangeTiles x1 y1 x2 y2 reveal // reveal: true/false
 * Example to reveal all tiles between 10,10 and 15,15:
 * Minimap FoWChangeTiles 10 10 15 15 true
 *
 * Minimap FoWRevealTiles x1, y1, x2, y2
 * Minimap FoWHideTiles x1, y1, x2, y2
 * Minimap FoWRevealAll
 *
 * To fully cover the map again in FoW:
 * Minimap FoWReset value // value is optional and defaults to true. value: true/false. When the value is set to false, the minimap won't remove the FoW around the player immediately after this plugin command.
 * Minimap FoWHideAll     // is same as "Minimap FoWReset" shown above.
 *--------------------------------------
 * Event comment-tags (case sentitive!)
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
 *
 *
 *--------------------------------------
 * Script Calls & Event triggers (for advanced users & scripters ONLY!)
 *--------------------------------------
 * Getting a reference to the minimap window:
 * Silv.Minimap.Window
 *
 * Retrieving the Fog of War completion status:
 * Silv.Minimap.getFowCompletion(mapId);
 * Note 1: mapId is optional (if a map is active) and when left out, it will be replaced with the id of the current map.
 * Note 2: It will return an object
 *
 * Silv.Minimap.Window.onFullyRevealedMap(x, y) is called whenever the map is fully revealed (no more Fog of War tiles left) by the player and the x, y are the coordinates of the last revealed tile.
 *
 *--------------------------------------
 * License / Terms
 *--------------------------------------
 * For the license and/or terms see: http://forums.rpgmakerweb.com/index.php?/topic/51307-silvers-advanced-minimap-now-with-fog-of-war/&page=1
 * They are subject to change.
 *
 *--------------------------------------
 * #Version #History:
 *--------------------------------------
 * v1.14a (17 February 2016) [Updated Parameters]
 *   - Fixed a bug that refused to render the minimap mapshots when the project is deployed.
 *   - Added support for vehicles including new parameters and plugin commands for this.
 *   - Fixed a map-generation-color-bug that I accidentally caused in v1.13.
 *   - Removed a circular reference from 1.14. RPG Maker MV is just not compatible with those...
 *
 * v1.13 (09 February 2016) [Updated Parameters]
 *   - Added a new parameter to assign the default map visibility.
 *   - The plugin command "Minimap Refresh" can now be called when there is no active minimap.
 *   - The minimap now automatically attempts to create itself upon gaining the required map-item while the player is on that same map.
 *   - Automatic map-generation can now also be performed through regions. Regions override tile-tags but both can be used simultaneously.
 *
 * v1.12 (28 January 2016)
 *   - Fixed a crash when the height of the map was bigger than it's width.
 *
 * v1.11 (03 January 2016) [Updated Parameters]
 *   - Added Fog of War with new plugin commands. It obviously also works with looping maps, comes with persistence and you can determine what maps have FoW and which don't.
 *     - You can optionally customize the Fog overlay image on a per-map-basis.
 *     - Added a sample Fog of War overlay-image (FoW.png) to the forum post. I made it using the "The Gimp".
 *     - New map-notetags: <mm_fow_enabled:value> <mm_fow_ov:value> <mm_fow_radius:value> <mm_fow_completion:value>
 *     - Added a script-call to retrieve the FoW completion status: Silv.Minimap.getFowCompletion(mapId);
 *     - Performs well even on super large (overworld) maps. It does use ~60-120MB of RAM on super large maps and only takes up to ~17kb of savegame file-size for super large maps.
 *  - Added a new help section: "Script Calls & Event triggers".
 *
 * v1.10 (30 December 2015)
 *   - Added the requested option to use a custom map-scene-image that is different from the actual map displayed in the minimap.
 *   - Added a new mapnotetag: <mm_menu_bg:customImageName>
 *
 * v1.09 (27 December 2015)
 *   - Fixed a crash that occurred when events (other than the last one) were deleted (in the map-editor) leaving behind null-values in the $dataMap.
 *   - Renamed the plugin-command alias (before, there was a possible compatibility issue with some of my other scripts).
 *   - Minor refactoring again and applied my new coding standards. Aliases are now stored outside of the anonymous function in a single variable.
 *
 * v1.08 (22 December 2015)
 *   - Fixed a crash when getting onto a vehicle in the overworld when no minimap was active (line 1099) and when getting off a vehicle.
 *   - Improved error reporting
 *   - Switched to the Imported-variable. Thus this plugin now requires Silvers Key plugin 1.02!
 *
 * v1.07 (12 December 2015)
 *   - New feature: Automatically shows vehicles on the minimap as the playerblip when entering a vehicle. Only applies if "Player Blip Graphic" is set to :player .
 *   - Fixed a crash when generating an overworld map without a minimap-image and with the passability-overlay enabled.
 *   - Is now compatible with dynamic map/dungeon generators. You can now recreate the minimap by calling: Silv.Minimap.setup(); after generating your random map.
 *
 * v1.06 (06 December 2015)
 *   - This plugin is now compatible with Yanfly's "Main Menu Manager" plugin. It also automatically disables (or even hides if you want) the map-menu-command if
 *     you do not have an active minimap or simply do not possess the required items.
 *   - Added a new mapnotetag: <mm_mapshot:map_id>. This one is used to display a mapshot from a different map in the current map. Handy in case you have duplicate maps
 *     to prevent ending up with duplicate minimap images in your project folder.
 *   - Removed a console.log() that I forgot to remove in 1.05 before release.
 *
 * v1.05 (30 November 2015)
 *   - I accidentally had some global variables declared above the window-initialization, I made them local now to save memory and to prevent incompatibility issues with other scripts.
 *   - Fixed a crash when fading the scene without an active minimap.
 *
 * v1.04 (27 November 2015) [Updated Parameters]
 *   - Disabled strict-mode (Either Javascript or RPG Maker seems not to support this fully...).
 *   - Fixed a typo that caused the minimap to not resize in height.
 *   - Grouped the player-blink parameters together and removed the unused "Draw Player Icon" parameter (v.1.03 only removed it partially).
 *   - New feature: focus the minimap-camera onto (moving-)events, coordinates or the player.
 *   - Minor refactoring.
 *
 * v1.03 (26 November 2015) [Updated Parameters]
 *   - New feature: Use custom player blip.
 *     - 2 new parameters: "Render Player Blip" & "Player Blip Graphic" and new mapnotetag: <mm_player_blip::player> and a new plugin parameter "Minimap setplayerblip <value>".
 *     - Removed parameter "Draw Player Icon".
 *   - Added a parameter to change minimap-opacity.
 *   - Added plugin commands and map-notetags to switch between AutoScroll and Autofit map-modes, <mm_mapstyle:Scroll/Autofit>
 *
 * v1.02 (25 November 2015) [Updated Parameters]
 *   - Enabled strict mode.
 *   - Added the 'Minimap ShowMapMenu' plugin-command.
 *   - New feature: can now generate overworld-minimaps (w/o requiring mapshots) with the map-notetag: <mm_generate_worldmap> or <mm_generate_overworld> or <mm_generate_map>].
 *   - New feature: generate passability overlay. Also comes with new map-notetag & plugin command. Supports 4-direction-passability.
 *   - New feature: You can now (optional) open the minimap-menu through a keybinding and also close it with that same keybinding (if the left-menu is active).
 *   - Fixed the minimap-visibility again (it was still not properly fixed in v1.01).
 *   - Now requires Silvers Keybinding script 1.01 instead of 1.00.
 *
 * v1.01 (24 November 2015) [Updated Parameters]
 *   - Fixed the player-blip becoming invisible when walking on grass. Because of this I had to add 2 more advanced parameters.
 *   - Fixed: The minimap no longer automatically shows itself again when it was manually hidden after opening a menu.
 *   - Updated the version number to 1.01 (it was still 0.91) in the plugin description.
 *   - Cleaned up some more out-commented code.
 *   - Fixed: minimap can now hide again when it contains POI's.
 *   - Fixed a bug that would not 'dispose' the minimap-window when getting rid of a minimap within a scene because the Scene_Map still had a references in it's children to the map. This also increases performance.
 *
 * v1.00 (23 November 2015)
 *   - First release.
 *
 * v0.90-0.92 (November 2015)
 *   - First alpha release.
 *
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Script start
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Imported
var Imported = Imported || {};
Imported.SILV_Minimap = 1.14;

// Dependency check
if (!('SILV_Keys' in Imported) || Imported.SILV_Keys < 1.02) { throw new Error('ERROR: Silvers Minimap requires Silvers KeyMapper v1.02 or higher. It must be placed above the minimap script.'); }

// Get Plugin #Parameters
var Silv = Silv || {};
Silv.Parameters = $plugins.filter(function(p) { return p.description.contains('<SilvMinimap>'); })[0].parameters;
Silv.Minimap = Silv.Minimap || {};
Silv.Minimap.Menu = Silv.Minimap.Menu || {};
Silv.Minimap.Generator = Silv.Minimap.Generator || {};
// Non-parameters
Silv.Minimap.Window                 = null;
Silv.Minimap.POI                    = {};
Silv.Minimap.Events                 = []; // Is an array of objects [{ Game_Event, Sprite_Character }]. USe .event and .sprite to retrieve the values.
Silv.Minimap.ScreenIsFading         = false;
Silv.Minimap.Menu.Bmp               = null;
Silv.Minimap.Menu.Markers           = [];
Silv.Minimap.Menu.Enabled           = false;
Silv.Minimap.WasLoadedFromSave      = false;
Silv.Minimap.LastMapID              = -1; // To detect when a different map is loaded. Because loading the menu-scene for example will reload the entire map again and also recreate the minimap, but we don't want to erase the POI's and such then.
Silv.Minimap.TP_Dest                = null;
Silv.Minimap.CreateFunctionIsLocked = false;
Silv.Minimap.Visible                = true;
Silv.Minimap.FoWData                = {};
Silv.TEST                           = Silv.TEST || Utils.isOptionValid('test'); // true if the project is launched from editor, false when launched after deployment
// General
Silv.Minimap.MapStyle                     = Silv.Parameters['Map Style'].toLowerCase();
Silv.Minimap.GlobalMapZoom                = parseFloat(Silv.Parameters['Global Map Zoom']);
Silv.Minimap.Window_Opacity               = parseInt(Silv.Parameters['Minimap Opacity']);
Silv.Minimap.VisibleByDefault             = Silv.Parameters['Visible By Default?'].toLowerCase() === 'true';
// Positioning & Size
Silv.Minimap.Window_X                     = parseInt(Silv.Parameters['X']);
Silv.Minimap.Window_Y                     = parseInt(Silv.Parameters['Y']);
Silv.Minimap.WindowWidth                  = parseInt(Silv.Parameters['Width']);
Silv.Minimap.WindowHeight                 = parseInt(Silv.Parameters['Height']);
Silv.Minimap.BorderWidth                  = parseInt(Silv.Parameters['Border Width']);
Silv.Minimap.BorderHeight                 = parseInt(Silv.Parameters['Border Height']);
Silv.Minimap.WindowHorizontalAlignment    = Silv.Parameters['Horizontal Alignment'].toLowerCase();
Silv.Minimap.WindowVerticalAlignment      = Silv.Parameters['Vertical Alignment'].toLowerCase();
// Player Blip
Silv.Minimap.PlayerBlipEnabled            = Silv.Parameters['Render Player Blip'].toLowerCase() === 'true';
Silv.Minimap.PlayerBlipGraphic            = Silv.Parameters['Player Blip Graphic'].toLowerCase();
Silv.Minimap.PlayerIconWidth              = parseInt(Silv.Parameters['Player Icon Width']);
Silv.Minimap.PlayerIconHeight             = parseInt(Silv.Parameters['Player Icon Height']);
Silv.Minimap.PlayerBlinks                 = parseInt(Silv.Parameters['Player Blink Delay']) > 0; // note: is not directly a parameter but uses one to calculate the value instead
Silv.Minimap.PlayerBlinkDelay             = parseInt(Silv.Parameters['Player Blink Delay']);
// Vehicles
Silv.Minimap.RenderVehicles               = Silv.Parameters['Show Vehicles'].toLowerCase() === 'true';
Silv.Minimap.RenderBoat                   = Silv.Parameters['Show Boat'].toLowerCase() === 'true';
Silv.Minimap.RenderShip                   = Silv.Parameters['Show Ship'].toLowerCase() === 'true';
Silv.Minimap.RenderAirship                = Silv.Parameters['Show Airship'].toLowerCase() === 'true';
Silv.Minimap.VehicleRenderSize            = Silv.Parameters['Vehicle Render size'].split(' ');
Silv.Minimap.AlwaysRenderVehicles         = Silv.Parameters['Always Show Vehicles'].toLowerCase() === 'true';
// Menu
Silv.Minimap.Menu.MenuKey                 = Silv.Keys.fromStringParam(Silv.Parameters['Menu Key']);
Silv.Minimap.Menu.PlayerDesc              = Silv.Parameters['Menu Player Description'];
Silv.Minimap.Menu.Zoom                    = parseFloat(Silv.Parameters['Menu Zoom']);
Silv.Minimap.Menu.WindowWidth_Left        = parseInt(Silv.Parameters['Menu Left Window Width']);
Silv.Minimap.Menu.WindowHeight_MapSection = parseInt(Silv.Parameters['Menu Topright Window Height']);
Silv.Minimap.Menu.EventRenderSize         = parseInt(Silv.Parameters['Menu Event Render Size']);
Silv.Minimap.Menu.PlayerIconSize          = parseInt(Silv.Parameters['Menu Player Icon Size']);
Silv.Minimap.Menu.ManualZoom_Min          = parseFloat(Silv.Parameters['Menu Min Manual Zoom']);
Silv.Minimap.Menu.ManualZoom_Max          = parseFloat(Silv.Parameters['Menu Max Manual Zoom']);
Silv.Minimap.Menu.ManualZoomKey_In        = Silv.Keys.fromStringParam(Silv.Parameters['Menu Zoomin Key']);
Silv.Minimap.Menu.ManualZoomKey_Out       = Silv.Keys.fromStringParam(Silv.Parameters['Menu Zoomout Key']);
Silv.Minimap.Menu.ManualZoomKey_Reset     = Silv.Keys.fromStringParam(Silv.Parameters['Menu Reset Zoom Key']);
Silv.Minimap.Menu.ManualScrollKey_Reset   = Silv.Keys.fromStringParam(Silv.Parameters['Menu Reset Scroll Key']);
// Passability Map
Silv.Minimap.PassabilityOverlayOpacity    = parseInt(Silv.Parameters['Passability Overlay Opacity']);
Silv.Minimap.PassabilityColor             = Silv.Parameters['Passability Color'];
Silv.Minimap.ImpassabilityColor           = Silv.Parameters['Impassability Color'];
// Generator
Silv.Minimap.Generator.MapColors          = Silv.Parameters['Map Gen Tag Colors'].split(' ');
Silv.Minimap.Generator.WorldColors        = Silv.Parameters['Overworld Gen Tag Colors'].split(' ');
Silv.Minimap.Generator.RegionMapColors    = Silv.Parameters['Map Gen Region Colors'].split(' ');
Silv.Minimap.Generator.RegionWorldColors  = Silv.Parameters['Overworld Gen Region Colors'].split(' ');
// The Rest
Silv.Minimap.AllowTeleportation           = Silv.Parameters['Allow Teleportation'].toLowerCase() === 'true';
Silv.Minimap.StandardPadding              = parseInt(Silv.Parameters['Standard Padding']);
Silv.Minimap.WindowSkin                   = Silv.Parameters['Window Skin'];
Silv.Minimap.MapBGFillColor               = Silv.Parameters['Fill Color'].split(' ');
Silv.Minimap.MaintainAspectRatio          = Silv.Parameters['Maintain Aspect Ratio'].toLowerCase() === 'true';
Silv.Minimap.FadeoutSpeed                 = parseInt(Silv.Parameters['Fadeout Speed']);
Silv.Minimap.GlobalRequiredItem           = parseInt(Silv.Parameters['Global Required Item']);
Silv.Minimap.EventRenderSize              = parseInt(Silv.Parameters['Event Render Size']);
Silv.Minimap.AutoClearPOI                 = Silv.Parameters['Auto Clear POI'].toLowerCase() === 'true';
Silv.Minimap.DrawOverlay                  = Silv.Parameters['Render Minimap Overlay'].toLowerCase() === 'true';
// Fog of War
Silv.Minimap.FoWEnabled                   = Silv.Parameters['FoW Enabled'].toLowerCase() === 'true';
Silv.Minimap.DefaultFoWBmpName            = Silv.Parameters['Default FoW Overlay'];
Silv.Minimap.DefaultFoWRadius             = parseInt(Silv.Parameters['Default FoW Radius']);
// Manual Scrolling
Silv.Minimap.AllowManualScrolling         = Silv.Parameters['Allow Manual Scrolling'].toLowerCase() === 'true';
Silv.Minimap.ManualScrollspeed            = parseFloat(Silv.Parameters['Manual Scrollspeed']);
Silv.Minimap.ManualScrollKeyUp            = Silv.Keys.fromStringParam(Silv.Parameters['Manual Scroll Key Up']);
Silv.Minimap.ManualScrollKeyRight         = Silv.Keys.fromStringParam(Silv.Parameters['Manual Scroll Key Right']);
Silv.Minimap.ManualScrollKeyDown          = Silv.Keys.fromStringParam(Silv.Parameters['Manual Scroll Key Down']);
Silv.Minimap.ManualScrollKeyLeft          = Silv.Keys.fromStringParam(Silv.Parameters['Manual Scroll Key Left']);
// Advanced & Debug
Silv.Minimap.PlayerSpriteSrcFrame_Width   = parseInt(Silv.Parameters['Player Sprite Sourceframe Width']);
Silv.Minimap.PlayerSpriteSrcFrame_Height  = parseInt(Silv.Parameters['Player Sprite Sourceframe Height']);
Silv.Minimap.FrameSkip                    = parseInt(Silv.Parameters['Frame Skip']);
Silv.Minimap.MapFilenameLength            = parseInt(Silv.Parameters['Mapshot Filename Length']);
Silv.Minimap.DebugMode                    = Silv.Parameters['Debug Mode'].toLowerCase() === 'true';
Silv.Minimap.DrawDebugGrid                = Silv.Parameters['Render Debug Grid'].toLowerCase() === 'true';
Silv.Minimap.DebugGridImage               = Silv.Parameters['Debug Grid Image'];

// Parameter after-care
(function()
{
	// Generator params
	var convertParams = function(param) // param SHOULD be passed by reference because it is typeof Array. But it is not when a new value is assigned to that array... Therefore we use the return value. And adding a new method to Array won't work either because you can't change "this". Fuck Javascript... Fucking half-assed language.
	{
		var newArray = [];
		for(var i=0; i<param.length; i++)
		{
			var splitValue = param[i].split(':');
			newArray[parseInt(splitValue[0])] = splitValue[1];
		}
		return newArray;
	};
	
	Silv.Minimap.Generator.RegionMapColors = convertParams(Silv.Minimap.Generator.RegionMapColors);
	Silv.Minimap.Generator.RegionWorldColors = convertParams(Silv.Minimap.Generator.RegionWorldColors);
	
	// Vehicle Render Size
	Silv.Minimap.VehicleRenderSize = { x:parseInt(Silv.Minimap.VehicleRenderSize[0]), y:parseInt(Silv.Minimap.VehicleRenderSize[0])};
})();

// Alias
Silv.Alias = Silv.Alias || {};
if (!Silv.AddAlias)
{
	Silv.AddAlias = function(alias, original_method)
	{
		if (Silv.Alias[alias]) { throw new Error('Alias already exists: ' + alias); }
		Silv.Alias[alias] = original_method;
	};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function()
{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// #Utilities & Misc
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
	var suffixPath = '/img/minimap/';
	if (!Silv.TEST) { suffixPath = '/www' + suffixPath; }
	var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, suffixPath);
	if (path.match(/^\/([A-Z]\:)/)) { path = path.slice(1); }
	path = decodeURIComponent(path);
	return path;
}

function getFullMinimapPath(filename)
{
	return minimapFolderPath() + filename;
}

// filename example: '002.png'
function minimapImageExists(filename)
{
    var fs = require('fs');
    return fs.existsSync(getFullMinimapPath(filename));
}

function dataMapGetEventByID(ev_id)
{
	for(var i=1; i< $dataMap.events.length; i++)
	{
		// $dataMap.events may contain null-values when placing several events in the editor and then deleting an even (other than the last one). Therefore the ($dataMap.events[i] !== null) check is required.
		if (($dataMap.events[i] !== null) && $dataMap.events[i].id == ev_id) { return $dataMap.events[i]; }
	}
	return null;
}

ImageManager.loadMinimap = function(filename, hue)
{
    return this.loadBitmap('img/minimap/', filename, hue, false);
};

// Do not just show the minimap on top of a faded-out screen.
Silv.AddAlias('mm_Game_Screen_updateFadeOut', Game_Screen.prototype.updateFadeOut);
Game_Screen.prototype.updateFadeOut = function()
{
	Silv.Alias.mm_Game_Screen_updateFadeOut.apply(this, arguments);
    
	if (this._brightness < 255) // (this._fadeOutDuration > 0)
	{
		Silv.Minimap.ScreenIsFading = true;
		if (Silv.Minimap.Window !== null)
		{
			Silv.Minimap.Window.opacity = this._brightness;
			Silv.Minimap.Window.contents.paintOpacity  = this._brightness;
		}
	}
	else
	{
		Silv.Minimap.ScreenIsFading = false;
	}
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Spriteset Map
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Spriteset_Map.prototype.findCharacterSpriteReversed = function(gameCharacter)
{
	for (var i = this._characterSprites.length - 1; i >= 0; i--)
	{
		if (this._characterSprites[i]._character === gameCharacter) { return this._characterSprites[i]; }
	}
	
	if (Silv.Minimap.DebugMode) { console.log('CharacterSprite not found for gameCharacter:', gameCharacter); }
	return null;
};

//------------------------------------------------------------------------------------------------------------------------------------
// Store a reference to the player graphic.
//------------------------------------------------------------------------------------------------------------------------------------
Silv.AddAlias('mm_Spriteset_Map_createCharacters', Spriteset_Map.prototype.createCharacters);
Spriteset_Map.prototype.createCharacters = function()
{
	Silv.Alias.mm_Spriteset_Map_createCharacters.apply(this, arguments);
	Spriteset_Map.prototype.playerSprite = this.findCharacterSpriteReversed($gamePlayer);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Automatically create a event-Notetag from event-comments on the active page
// Example usage: console.log($gameMap.event(1).event.silvNote);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Silv.AddAlias('mm_Game_Event_setupPage',  Game_Event.prototype.setupPage);
Game_Event.prototype.setupPage = function()
{
	Silv.Alias.mm_Game_Event_setupPage.apply(this, arguments);
	this.silvCreateNote();
};

Game_Event.prototype.silvCreateNote = function()
{
	this.silvNote = '';
	if (typeof this.page() === 'undefined') { return; }
	
	var list = this.list();
	var str = null;
	for (var commandProperty in list)
	{
		if (list.hasOwnProperty(commandProperty))
		{
			var command = list[commandProperty];
			var commandCode = command.code;
			if (commandCode == 108) // 108: new comment-item, always the first line.
			{
				if (str !== null) { this.silvNote += str; }
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
	if (this.silvNote !== '') { this.extractSilvMetadata(); }
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

Window_Minimap.prototype.loadWindowskin = function() { this.windowskin = ImageManager.loadSystem(Silv.Minimap.WindowSkin); };
Window_Minimap.prototype.standardPadding = function() { return Silv.Minimap.StandardPadding; };
//Window_Minimap.prototype.standardFontSize = function() { return Silv.Minimap.FontSize; }
Window_Minimap.prototype.bmpPreloadTotal = 1; // The amount of images to preload before the minimap can be rendered.


// #Initialization
Window_Minimap.prototype.initialize = function(x, y, width, height, mapName, minimapType)
{
	this.mapName = mapName;
	this.minimapType = minimapType;
	if ('mm_size' in $dataMap.meta)
	{
		var newSize = $dataMap.meta.mm_size.split(' ');
		this.width = parseInt(newSize[0]);
		this.height = parseInt(newSize[1]);
	}
	
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._helpWindow = null;
    this._handlers = {};
    this._touching = false;
    this.deactivate();

	this.bmpPreloadCnt = 0;
	this.finishedBmpPreloading = false;
	
	// Fog of War
	if ('mm_fow_enabled' in $dataMap.meta)
	{
		this.fowEnabled = $dataMap.meta.mm_fow_enabled.toLowerCase() === 'true';
	}
	else
	{
		this.fowEnabled = Silv.Minimap.FoWEnabled;
	}
	this.fowBmpName = ('mm_fow_ov' in $dataMap.meta) ? $dataMap.meta.mm_fow_ov : Silv.Minimap.DefaultFoWBmpName;
	if (typeof Silv.Minimap.FoWData[$gameMap._mapId] === 'undefined') // This if-statement must be placed before preloading the FoW-bitmap
	{
		this.resetFoWData();
		this.fowRequiresRefresh = false;
	}
	else
	{
		this.fowRequiresRefresh = true;
	}
	this.fowOriginalBmp = ImageManager.loadMinimap(this.fowBmpName);
	this.fowOriginalBmp.addLoadListener(function() { this.onFinishOriginalFoWBmpLoad(); }.bind(this));
	this.fowRadius = ('mm_fow_radius' in $dataMap.meta) ? parseInt($dataMap.meta.mm_fow_radius) : Silv.Minimap.DefaultFoWRadius;
	
	this.originalMapBmp = null;
	this.passabilityBmp = null;
	this.drawPassabilityOverlay = false;
	this.isFadingOut = false;
	this.isFadedOut = false;
	this.setDrawMapBmp();
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
	Silv.Minimap.Menu.Enabled = true;
	this.mapZoom = ('mm_mapzoom' in $dataMap.meta) ? parseFloat($dataMap.meta.mm_mapzoom) : Silv.Minimap.GlobalMapZoom;
	this.mapZoomInverse = 1 / this.mapZoom;
	this.isFirstProcessedUpdate = true;
	this.requiresDrawing = true; // as in AFTER isReady().
	this.isManualScrolling = false;
	this.allowManualScroll = ('mm_allowmanualscroll' in $dataMap.meta) ? $dataMap.meta.mm_allowmanualscroll.toLowerCase() === 'true' : Silv.Minimap.AllowManualScrolling;
	this.mapScroll = {x: 0, y: 0, adjustment_x: 0, adjustment_y: 0};
	this.lastPlayerLoc = {x: $gamePlayer._realX, y: $gamePlayer._realY};
	this.menuZoom = ('mm_menuzoom' in $dataMap.meta) ? $dataMap.meta.mm_menuzoom.toLowerCase() === 'true' : Silv.Minimap.Menu.Zoom;
	this.allowTeleportation = ('mm_tp_allow' in $dataMap.meta) ? $dataMap.meta.mm_tp_allow.toLowerCase() === 'true' : Silv.Minimap.AllowTeleportation;
	this.playerFrame = { x:0, y:0, width:Silv.Minimap.PlayerSpriteSrcFrame_Width, height:Silv.Minimap.PlayerSpriteSrcFrame_Height };
	this.mapStyle = ('mm_mapstyle' in $dataMap.meta) ? $dataMap.meta.mm_mapstyle.toLowerCase() : Silv.Minimap.MapStyle;	
	this.cameraFocusType = 'player'; // player / event / coordinate
	this.cameraFocusObject = null; // null / reference to event / {x:real_x, y:real_y}
	this.vehicleCharSprite = null;
	this.menuBG = ('mm_menu_bg' in $dataMap.meta) ? ImageManager.loadMinimap($dataMap.meta.mm_menu_bg) : null;
	
	// Vehicles
	this.renderVehicles       = Silv.Minimap.RenderVehicles;
	this.renderBoat           = Silv.Minimap.RenderBoat;
	this.renderShip           = Silv.Minimap.RenderShip;
	this.renderAirship        = Silv.Minimap.RenderAirship;
	this.vehicleRenderSize    = Silv.Minimap.VehicleRenderSize;
	this.alwaysRenderVehicles = Silv.Minimap.AlwaysRenderVehicles;
	
	this.initPlayerBlip();
	
	this.loadEvents();
	this.debugGridBmp = ImageManager.loadMinimap(Silv.Minimap.DebugGridImage);
		
	// The update must be called AFTER all the initialization code.
	this.update();
	
	// Default visibility
	if (!Silv.Minimap.VisibleByDefault) { this.hide(); }
};

Window_Minimap.prototype.finishBmpLoad = function()
{
	this.bmpPreloadCnt++;
	if (this.bmpPreloadCnt === this.bmpPreloadTotal) { this.finishedBmpPreloading = true; }
};

Window_Minimap.prototype.setOpacity = function()
{
	this.opacity = Silv.Minimap.Window_Opacity;
};

Window_Minimap.prototype.initPlayerBlip = function()
{
	this.playerBlipEnabled = Silv.Minimap.PlayerBlipEnabled;
	this.playerBlipGfx = Silv.Minimap.PlayerBlipGraphic;
	this.playerBlipBmp = null;
	
	if ('mm_player_blip' in $dataMap.meta) { this.setPlayerBlip($dataMap.meta.mm_player_blip); }
	else { this.setPlayerBlip(Silv.Minimap.PlayerBlipGraphic); }
};
//----------------------------------------------------------------------------------------------------
// Set Drawing Bitmaps
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.setDrawMapBmp = function()
{
	switch (this.minimapType)
	{
		case 'regular':
			if (this.originalMapBmp === null)
			{
				this.originalMapBmp = ImageManager.loadMinimap(this.mapName);
				this.mapBmp = ImageManager.loadMinimap(this.mapName);
			}
			else if (this.originalMapBmp.isReady())
			{
				this.mapBmp = new Bitmap(this.originalMapBmp.width, this.originalMapBmp.height);
				this.mapBmp.blt(this.originalMapBmp, 0, 0, this.originalMapBmp.width, this.originalMapBmp.height, 0, 0); // Because nobody knows how to clone a bitmap, we do it like this...
				this.requiresDrawing = false;
			}
			break;
		case 'generate_map':
			this.mapBmp          = this.generateMap(Silv.Minimap.Generator.MapColors, Silv.Minimap.Generator.RegionMapColors);
			this.originalMapBmp  = this.generateMap(Silv.Minimap.Generator.MapColors, Silv.Minimap.Generator.RegionMapColors);
			this.requiresDrawing = false;
			break;
		case 'generate_overworld':
			this.mapBmp          = this.generateMap(Silv.Minimap.Generator.WorldColors, Silv.Minimap.Generator.RegionWorldColors);
			this.originalMapBmp  = this.generateMap(Silv.Minimap.Generator.WorldColors, Silv.Minimap.Generator.RegionWorldColors);
			this.requiresDrawing = false;
			break;
		default:
			throw new Error('Window_Minimap.prototype.GetMapBmp has invalid switch-value: ' + this.minimapType);
	}
	
	if (this.drawPassabilityOverlay)
	{
		if (this.originalMapBmp.isReady()) { this.bltPassabilityOverlay(); }
		else { this.passabilityRequiresRedraw = true; }
	}
};
//----------------------------------------------------------------------------------------------------
// #Show & #Hide
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.hide = function()
{
	Window_Base.prototype.hide.apply(this, arguments);
	Silv.Minimap.Visible = false;
};

Window_Minimap.prototype.show = function()
{
	Window_Base.prototype.show.apply(this, arguments);
	Silv.Minimap.Visible = true;
};
//----------------------------------------------------------------------------------------------------
// #Passability #Overlay
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.bltPassabilityOverlay = function()
{
	// Generate the bitmap if it wasn't done already
	if (this.passabilityBmp === null) { this.passabilityBmp = this.generatePassabilityBmp(); }
	
	// Blt the overlay on top of the this.mapBmp
	this.mapBmp.blt(this.passabilityBmp, 0, 0, this.passabilityBmp.width, this.passabilityBmp.height, 0, 0);
	
	this.passabilityRequiresRedraw = false;
};

Window_Minimap.prototype.setPassabilityOverlay = function(enabled)
{
	this.drawPassabilityOverlay = enabled;
	this.setDrawMapBmp();
};

// Dev note: this method can be severely optimized by replacing it with a modified version of the $gameMap.checkPassage(). Calling gameMap.isPassable() 4x per tile is not effective because internally it starts looping through them 4x instead of 1.
Window_Minimap.prototype.generatePassabilityBmp = function()
{
	var tile_w = $gameMap.tileWidth();
	var tile_h = $gameMap.tileHeight();
	var bmp = new Bitmap($gameMap.width() * tile_w, $gameMap.height() * tile_h);
	bmp.paintOpacity = Silv.Minimap.PassabilityOverlayOpacity;
	var borderTickness = 8;
	
	for (var y=0; y<$dataMap.height; y++)
	{
		for (var x=0; x<$dataMap.width; x++)
		{
			var passability = {2:$gameMap.isPassable(x, y, 2), 4:$gameMap.isPassable(x, y, 4), 6:$gameMap.isPassable(x, y, 6), 8:$gameMap.isPassable(x, y, 8)};
			
			if (!passability[2] && !passability[4] && !passability[6] && !passability[8])
			{
				bmp.fillRect(x * tile_w, y * tile_h, tile_w, tile_h, Silv.Minimap.ImpassabilityColor);
			}
			else
			{
				bmp.paintOpacity = 255;
				if (!passability[8]) { bmp.fillRect(x * tile_w, y * tile_h, tile_w, borderTickness, Silv.Minimap.ImpassabilityColor); } // top
				if (!passability[6]) { bmp.fillRect(x * tile_w + tile_w - borderTickness, y * tile_h, borderTickness, tile_h, Silv.Minimap.ImpassabilityColor); } // right
				if (!passability[2]) { bmp.fillRect(x * tile_w, y * tile_h + tile_h - borderTickness, tile_w, borderTickness, Silv.Minimap.ImpassabilityColor); } // bottom
				if (!passability[4]) { bmp.fillRect(x * tile_w, y * tile_h, borderTickness, tile_h, Silv.Minimap.ImpassabilityColor); } // left
				bmp.paintOpacity = Silv.Minimap.PassabilityOverlayOpacity;
				
				bmp.fillRect(x * tile_w, y * tile_h, tile_w, tile_h, Silv.Minimap.PassabilityColor);
			}
		}
	}
	return bmp;
};

//----------------------------------------------------------------------------------------------------
// #Generate Maps
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.generateMap = function(tagColors, regionColors)
{
	var tile_w = $gameMap.tileWidth();
	var tile_h = $gameMap.tileHeight();
	var bmp = new Bitmap($gameMap.width() * tile_w, $gameMap.height() * tile_h);
	
	for (var y=0; y<$dataMap.height; y++)
	{
		for (var x=0; x<$dataMap.width; x++)
		{
			var effectiveColor = regionColors[$gameMap.regionId(x, y)];
			if (typeof effectiveColor === 'undefined') { effectiveColor = tagColors[$gameMap.terrainTag(x, y)]; }
			bmp.fillRect(x * tile_w, y * tile_h, tile_w, tile_h, effectiveColor);
		}
	}
	return bmp;
};

//----------------------------------------------------------------------------------------------------
// <Asorted>
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.showMapMenuScene = function()
{
	Silv.Minimap.Window.pushMapScene();
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
	this.mapAspRatInfo = { w: 0.0, h: 0.0, offset_x: 0.0, offset_y: 0.0, scaleDelta_x: 0.0, scaleDelta_y: 0.0 };
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
	Silv.Minimap.Events = [];
	for (var ev_idx = 1; ev_idx < $dataMap.events.length; ev_idx++) // Note: start at 1. Because the first one is always null.
	{
		if ($dataMap.events[ev_idx] !== null)
		{
			var ev = $gameMap.event(ev_idx);
			
			// Check Event Note
			if ($dataMap.events[ev_idx].note !== '' || ('mm_show' in ev))
			{
				var cmds = $dataMap.events[ev_idx].note.toLowerCase().split(' ');
				if ((cmds.indexOf('mm_show') > -1) ||  ('mm_show' in ev))
				{
					this.addEvent(ev);
				}
			}
		}
	}
	if (Silv.Minimap.DebugMode) { console.log('Loaded Events:', Silv.Minimap.Events); }
};

Window_Minimap.prototype.addEvent = function(event)
{
	var new_ev = {event: event, sprite: this.getEventCharacterSprite(event.eventId())};
	Silv.Minimap.Events.push(new_ev); // Add event to the array so we can render it on the minimap
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
	throw new Error('getEventCharacterSprite() did not find a match for ev_id: ' + ev_id);
};
	
// #update
Window_Minimap.prototype.update = function()
{
	// Do nothing if some images haven't finished loading yet
	if (!this.finishedBmpPreloading) { return; }
	
	if (!this.skipFrame() && (this.originalMapBmp === null || this.originalMapBmp.isReady()))
	{
		Window_Base.prototype.update.call(this);
		this.updateFadeOut();
		this.updateInput();
		if (Silv.Minimap.PlayerBlinks) { this.updatePlayerBlink(); }
		this.updateMapScroll(this.isFirstProcessedUpdate);
		this.playerInfo = this.getPlayerBitmap();
		if (this.requiresDrawing) { this.setDrawMapBmp(); }
		this.drawMinimap();
		this.lastPlayerLoc.x  = $gamePlayer._realX;
		this.lastPlayerLoc.y  = $gamePlayer._realY;
		this.isFirstProcessedUpdate = false;
		
		// Teleport
		if (Silv.Minimap.TP_Dest !== null)
		{
			this.teleport(Silv.Minimap.TP_Dest);
			Silv.Minimap.TP_Dest = null;
		}
		
		if (this.passabilityRequiresRedraw && this.originalMapBmp.isReady()) { this.bltPassabilityOverlay(); }
	}
	
	if (Input.isTriggered(Silv.Minimap.Menu.MenuKey)) { this.showMapMenuScene(); }
};

//----------------------------------------------------------------------------------------------------
// Get #Player #Blip Bitmap
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.getPlayerBitmap = function()
{
	if (this.vehicleCharSprite === null)
	{
		var playerSpr = Spriteset_Map.prototype.playerSprite;
		// Player is not in bush, so return the regular player-graphic
		if (playerSpr._bushDepth == 0 || playerSpr._lowerBody === null)
		{
			return { bmp:playerSpr._bitmap, src:playerSpr._frame };
		}

		// Create Bush graphic (which is divided into 2 graphics by the RM-code..)
		var playerBmp = new Bitmap(Silv.Minimap.PlayerSpriteSrcFrame_Width, Silv.Minimap.PlayerSpriteSrcFrame_Height);
		playerBmp.blt(Spriteset_Map.prototype.playerSprite._lowerBody._bitmap, Spriteset_Map.prototype.playerSprite._lowerBody._frame.x, Spriteset_Map.prototype.playerSprite._lowerBody._frame.y, Spriteset_Map.prototype.playerSprite._lowerBody._frame.width, Spriteset_Map.prototype.playerSprite._lowerBody._frame.height,
					  0, Silv.Minimap.PlayerSpriteSrcFrame_Height - playerSpr._bushDepth, Silv.Minimap.PlayerIconSize, Silv.Minimap.PlayerIconSize);
		playerBmp.blt(Spriteset_Map.prototype.playerSprite._upperBody._bitmap, Spriteset_Map.prototype.playerSprite._upperBody._frame.x, Spriteset_Map.prototype.playerSprite._upperBody._frame.y, Spriteset_Map.prototype.playerSprite._upperBody._frame.width, Spriteset_Map.prototype.playerSprite._upperBody._frame.height,
					  0, 0, Silv.Minimap.PlayerIconSize, Silv.Minimap.PlayerIconSize);
		
		return {bmp:playerBmp, src:this.playerFrame};
	}
	else // return vehicle instead
	{
		return { bmp:this.vehicleCharSprite._bitmap, src:this.vehicleCharSprite._frame };
	}
};
//----------------------------------------------------------------------------------------------------
// #Vehicle Compatibility for Player Blip Bitmap
//----------------------------------------------------------------------------------------------------
Silv.AddAlias('mm_Game_Vehicle_getOnVehicle', Game_Vehicle.prototype.getOn);
Game_Vehicle.prototype.getOn = function()
{
	Silv.Alias.mm_Game_Vehicle_getOnVehicle.apply(this, arguments);
	
	if (Silv.Minimap.Window)
	{
		var charSprites = SceneManager._scene._spriteset._characterSprites;
		for (var i = charSprites.length - 1; i >= 0; i--)
		{
			if (charSprites[i]._character == this)
			{
				Silv.Minimap.Window.vehicleCharSprite = charSprites[i];
				break;
			}
		}
		
		if (Silv.Minimap.Window.vehicleCharSprite === null)
		{
			console.log("ERROR: can't find vehicle sprite for:");
			console.log(this);
			throw new Error("ERROR: Couldn't find vehicle sprite.");
		}
	}
};

Silv.AddAlias('mm_Game_Vehicle_getOffVehicle', Game_Vehicle.prototype.getOff);
Game_Vehicle.prototype.getOff = function()
{
	Silv.Alias.mm_Game_Vehicle_getOffVehicle.apply(this, arguments);
	if (Silv.Minimap.Window) { Silv.Minimap.Window.vehicleCharSprite = null; }
};
//----------------------------------------------------------------------------------------------------
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

//----------------------------------------------------------------------------------------------------
// #Scroll
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.updateMapScroll = function(force)
{
	switch (this.cameraFocusType)
	{
		case 'player':
			if (this.playerLocChanged() || force) // Only update mapscroll if the player changed location. This way manual-scrolling is made possible.
			{
				this.isManualScrolling = false;
				this.scrollToMapObject($gamePlayer._realX, $gamePlayer._realY);
			}
			break;
		case 'event':
			this.isManualScrolling = false;
			this.scrollToMapObject(this.cameraFocusObject._realX, this.cameraFocusObject._realY);
			break;
		case 'coordinate':
			this.isManualScrolling = false;
			this.scrollToMapObject(this.cameraFocusObject.x, this.cameraFocusObject.y);
			break;
		default:
			throw new Error('Invalid switch-value in updateMapScroll(). Value: ' + this.cameraFocusType);
	}
};

Window_Minimap.prototype.setCameraFollowTarget = function(followType, value)
{
	this.cameraFocusType = followType; // Must be set before calling updateMapScroll()
	switch (followType)
	{
		case 'player':
			this.cameraFocusObject = null;
			this.updateMapScroll(true); // refresh the camera to focus on the player. Because he may not be moving when this was called.
			break;
		case 'event':
			this.cameraFocusObject = $gameMap.event(parseInt(value));
			if (typeof this.cameraFocusObject === 'undefined') { throw 'setCameraFollowTarget() invalid event-id: ' + value; }
			break;
		case 'coordinate':
			if (Object.prototype.toString.call( value ) !== '[object Array]') { throw 'setCameraFollowTarget() value-param must be an array. Received type: ' + typeof value; }
			this.cameraFocusObject = { x:value[0], y:value[1] };
			break;
		default:
			throw new Error('Invalid switch-value in setCameraFollowTarget(). Value: ' + followType);
	}
	
};

Window_Minimap.prototype.scrollToMapObject = function(real_x, real_y)
{
	this.setMapScroll(real_x * $gameMap.tileWidth() - (this.drawAreaWidth / 2 * this.mapZoomInverse), real_y * $gameMap.tileHeight() - (this.drawAreaHeight / 2 * this.mapZoomInverse));
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
//----------------------------------------------------------------------------------------------------

Window_Minimap.prototype.manualScroll = function(scroll_x, scroll_y)
{
	this.setMapScroll(scroll_x, scroll_y);
	this.isManualScrolling = true;
};

// Skips frame (returns true) if frameSkipCnt > frameSkip
Window_Minimap.prototype.skipFrame = function()
{
	if (this.frameSkip === 0) { return false; } // process frame
	
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

//----------------------------------------------------------------------------------------------------
// Window Fading
//----------------------------------------------------------------------------------------------------
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
// This method is required for compatibility with Yanfly's Main Menu Manager.
Scene_Menu.prototype.commandSilvMap = function()
{
	Silv.Minimap.Window.pushMapScene();
};

Silv.AddAlias('mm_Scene_Map_callMenu', Scene_Map.prototype.callMenu);
Scene_Map.prototype.callMenu = function()
{
	if (Silv.Minimap.Menu.Enabled) { Silv.Minimap.Window.createMenuData(); }
	Silv.Alias.mm_Scene_Map_callMenu.apply(this, arguments);
};

Window_Minimap.prototype.createMenuData = function()
{
	this.createMenuBmp();
	this.createMenuMarkers();
};

Window_Minimap.prototype.pushMapScene = function()
{
	this.createMenuData();
	if (Silv.Minimap.Menu.Enabled)
	{
		if (Silv.Minimap.Menu.Bmp !== null) { SceneManager.push(Scene_MiniMap); }
		else { throw new Error('pushMapScene() was called, the minimap-menu was enabled BUT Silv.Minimap.Menu.Bmp equals null?'); }
	}
	else
	{
		throw new Error('pushMapScene() was called but the Minimap (menu) was not enabled.');
	}
};
//----------------------------------------------------------------------------------------------------
// Create #Menu Bitmap
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.createMenuBmp = function()
{
	Silv.Minimap.Menu.Bmp = new Bitmap(this.mapBmp.width * this.menuZoom, this.mapBmp.height * this.menuZoom);
	
	this.tileInfo = {
			w: $gameMap.tileWidth(), hw: $gameMap.tileWidth() / 2.0, zhw: ($gameMap.tileWidth() / 2.0) * this.menuZoom,
			h: $gameMap.tileHeight(), hh: $gameMap.tileHeight() / 2.0, zhh: ($gameMap.tileHeight() / 2.0) * this.menuZoom
		};
	
	// Draw Map
	var backgroundBmp = (this.menuBG) ? this.menuBG : this.mapBmp;
	Silv.Minimap.Menu.Bmp.blt(backgroundBmp, 0, 0, backgroundBmp.width, backgroundBmp.height, 0, 0, Silv.Minimap.Menu.Bmp.width, Silv.Minimap.Menu.Bmp.height);
	
	// Draw Debug Grid
	if (Silv.Minimap.DrawDebugGrid)
	{
		for (var i=0; i < $gameMap.width(); i++)
		{
			for (var j=0; j < $gameMap.height(); j++)
			{
				var debugTileLoc = this.translateLocationMenu(this, i, j, this.tileInfo.w * this.menuZoom, this.tileInfo.h * this.menuZoom);
				Silv.Minimap.Menu.Bmp.blt(this.debugGridBmp, 0, 0, this.tileInfo.w, this.tileInfo.h, debugTileLoc.x, debugTileLoc.y, this.tileInfo.w * this.menuZoom, this.tileInfo.h * this.menuZoom);
			}
		}
	}
	
	// Draw POI's
	for (var i = 0; i < this.getAllPOI().length; i++)
	{
		var poi = this.getPOIByIdx(i);
		var poiLoc = this.translateLocationMenu(this, poi.real_x, poi.real_y, poi.destSize.w, poi.destSize.h);
		Silv.Minimap.Menu.Bmp.blt(poi.bmp, poi.src.x, poi.src.y, poi.src.w, poi.src.h,
							      poiLoc.x, poiLoc.y, poi.destSize.w, poi.destSize.h);
	}
	
	// Draw Events
	for (var i=0; i < Silv.Minimap.Events.length; i++)
	{
		var ev = Silv.Minimap.Events[i].event;
		var ev_sprite = Silv.Minimap.Events[i].sprite;
		var evMapLoc = this.translateLocationMenu(this, ev._realX, ev._realY, Silv.Minimap.Menu.EventRenderSize, Silv.Minimap.Menu.EventRenderSize);
		Silv.Minimap.Menu.Bmp.blt(ev_sprite._bitmap, ev_sprite._frame.x, ev_sprite._frame.y, ev_sprite._frame.width, ev_sprite._frame.height, evMapLoc.x, evMapLoc.y, Silv.Minimap.Menu.EventRenderSize, Silv.Minimap.Menu.EventRenderSize);
	}
	
	// Draw Vehicles
	if (this.renderVehicles) { this.drawVehicles(Silv.Minimap.Menu.Bmp, this.translateLocationMenu); }
	
	// Draw Player
	if (this.playerBlipEnabled)
	{
		this.drawPlayerBlip(Silv.Minimap.Menu.Bmp, this.translateLocationMenu, this.playerInfo.src.x, this.playerInfo.src.y, this.playerInfo.src.width, this.playerInfo.src.height,
							Silv.Minimap.Menu.PlayerIconSize, Silv.Minimap.Menu.PlayerIconSize);
	}
};
//----------------------------------------------------------------------------------------------------
// Menu Create #Markers
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.createMenuMarkers = function()
{
	Silv.Minimap.Menu.Markers = [];
	
	// Player
	var playerMapLoc = this.translateLocationMenu(this, $gamePlayer._realX, $gamePlayer._realY, Silv.Minimap.Menu.PlayerIconSize, Silv.Minimap.Menu.PlayerIconSize);
	Silv.Minimap.Menu.Markers.push({text:'Player', map_x:playerMapLoc.x, map_y:playerMapLoc.y, w:Silv.Minimap.Menu.PlayerIconSize, h:Silv.Minimap.Menu.PlayerIconSize, desc:Silv.Minimap.Menu.PlayerDesc, tp:null});
	
	// POI's
	for (var i = 0; i < this.getAllPOI().length; i++)
	{
		var poi = this.getPOIByIdx(i);
		var poiLoc = this.translateLocationMenu(this, poi.real_x, poi.real_y, poi.destSize.w, poi.destSize.h);
		
		var tp = poi.tp.slice(0); // slice(0) clones it
		if (this.allowTeleportation && (poi.tp !== null))
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
		var dataMapEvent = dataMapGetEventByID(ev._eventId);
		if (dataMapEvent)
		{
			var evMapLoc = this.translateLocationMenu(this, ev._realX, ev._realY, Silv.Minimap.Menu.EventRenderSize, Silv.Minimap.Menu.EventRenderSize);
			
			var desc = '';
			if ('mm_desc' in ev) { desc = ev.mm_desc.join(' '); }
			
			var tp = null;
			if (this.allowTeleportation && ('mm_tp' in ev))
			{
				tp = ev.mm_tp.slice(0); // slice(0) clones it
				tp[0] = parseInt(tp[0]) + parseInt(ev._x);
				tp[1] = parseInt(tp[1]) + parseInt(ev._y);
			}

			Silv.Minimap.Menu.Markers.push({ text:dataMapEvent.name, map_x:evMapLoc.x, map_y:evMapLoc.y, w:Silv.Minimap.Menu.EventRenderSize, h:Silv.Minimap.Menu.EventRenderSize, desc:desc, tp:tp });
		}
	}
};
//----------------------------------------------------------------------------------------------------
// #FoW / #Fog of War
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.onFinishOriginalFoWBmpLoad = function()
{
	this.cloneOriginalFoWBmpToCurrent();
	
	this.fowSection_w = this.fowCurrentBmp.width;
	this.fowSection_h = this.fowCurrentBmp.height;
	
	this.finishBmpLoad();
	
	if (this.fowRequiresRefresh)
	{
		this.refreshFoWBmp();
		this.fowRequiresRefresh = false;
	}
	
	// The line below reveals the tiles around the player for when the player enters a map for the first time
	if (this.fowEnabled) { this.updateFoW(); }
};

// 'Clone' the original bitmap over the current one.
Window_Minimap.prototype.cloneOriginalFoWBmpToCurrent = function()
{
	this.fowCurrentBmp = new Bitmap($gameMap.width() * $gameMap.tileWidth(), $gameMap.height() * $gameMap.tileHeight());//new Bitmap(this.fowOriginalBmp.width, this.fowOriginalBmp.height);
	this.fowCurrentBmp.blt(this.fowOriginalBmp, 0, 0, this.fowOriginalBmp.width, this.fowOriginalBmp.height, 0, 0, this.fowCurrentBmp.width, this.fowCurrentBmp.height);
};

// Renders the current FoW bmp onto the specified bmp
// src_x and src_y are the UNSCALED x&y source-locations of the this.fowCurrentBmp.
Window_Minimap.prototype.applyFoWSection = function(toThisBmp, borderOffset_x, borderOffset_y, src_x, src_y, scale_x, scale_y, isAutoFitMode, src_w, src_h)
{
	var srcCalcBmp = isAutoFitMode ? this.fowCurrentBmp : toThisBmp;
	
	var dest_w = toThisBmp.width - borderOffset_x * 2;
	var dest_h = toThisBmp.height - borderOffset_y * 2;
	
	if (src_w === null) { src_w = srcCalcBmp.width / scale_x; }
	if (src_x + src_w > this.fowCurrentBmp.width) { src_w -= (src_x + src_w) - this.fowCurrentBmp.width; }
	if (src_h === null) { src_h = srcCalcBmp.height / scale_y; }
	if (src_y + src_h > this.fowCurrentBmp.height) { src_h -= (src_y + src_h) - this.fowCurrentBmp.height; }
	
	toThisBmp.blt(this.fowCurrentBmp, src_x, src_y, src_w, src_h, borderOffset_x, borderOffset_y, dest_w, dest_h);
};

// Note: does NOT reset the this.fowCurrentBmp
Window_Minimap.prototype.resetFoWData = function()
{
	Silv.Minimap.FoWData[$gameMap._mapId] = {};
	
	// Create a new 2d array: Silv.Minimap.FoWData[$gameMap._mapId].tiles[x][y]
	Silv.Minimap.FoWData[$gameMap._mapId].tiles = new Array($gameMap.width());	
	var mapHeight = $gameMap.height();
	for (var i=0; i<Silv.Minimap.FoWData[$gameMap._mapId].tiles.length; i++) { Silv.Minimap.FoWData[$gameMap._mapId].tiles[i] = new Array(mapHeight); }
	
	// Fill the arrays with: false instead of the default undefined.
	// Note that the loop must start with x instead of y because of how the length in the 2nd loop is calculated
	for(var x=0; x<Silv.Minimap.FoWData[$gameMap._mapId].tiles.length; x++)
	{
		for(var y=0; y<Silv.Minimap.FoWData[$gameMap._mapId].tiles[x].length; y++)
		{
			Silv.Minimap.FoWData[$gameMap._mapId].tiles[x][y] = false;
		}
	}
	
	// Create the Completion Data
	this.resetFoWCompletion();
};

Window_Minimap.prototype.resetFoWCompletion = function()
{
	var adjust = ('mm_fow_completion' in $dataMap.meta) ? adjust = parseInt($dataMap.meta.mm_fow_completion) : 0;
	
	var totalTileCnt = $gameMap.width() * $gameMap.height() + adjust;
	Silv.Minimap.FoWData[$gameMap._mapId].completion =
	{
		totalTiles:totalTileCnt,
		emptyTileCnt:totalTileCnt,
		completedTileCnt:0,
		completePerc:0.00
	};
};

// Reveal tiles when the player arrived on a new tile
Silv.AddAlias('mm_Game_Player_updateMove', Game_Player.prototype.updateMove);
Game_Player.prototype.updateMove = function()
{
	Silv.Alias.mm_Game_Player_updateMove.apply(this, arguments);
	if (!this.isMoving()) { this.preUpdateFoW(); }
};

// Reveal tiles after a transfer
// code below wont work because the image isnt loaded at that point anyway, like ever
// Silv.AddAlias('mm_Game_Player_clearTransferInfo', Game_Player.prototype.clearTransferInfo);
// Game_Player.prototype.clearTransferInfo = function()
// {
	// Silv.Alias.mm_Game_Player_clearTransferInfo.apply(this, arguments);
	// this.preUpdateFoW();
// };

Game_Player.prototype.preUpdateFoW = function()
{
	if (Silv.Minimap.Window && Silv.Minimap.Window.fowEnabled) { Silv.Minimap.Window.updateFoW(); }
};

Window_Minimap.prototype.updateFoW = function()
{
	// Do nothing if the player has no radius and also do nothing if the bitmaps have not yet finished loading
	if ((this.fowRadius < 1) || !this.finishedBmpPreloading) { return; }
	
	//Reveal the tiles within the player's radius, if not already revealed.
	for (var delta_y = -this.fowRadius + 1; delta_y<this.fowRadius; delta_y++)
	{
		for (var delta_x = -this.fowRadius + 1; delta_x<this.fowRadius; delta_x++)
		{
			if (Math.abs(delta_x) + Math.abs(delta_y) < this.fowRadius) // this if-statement transforms the 'reveal-square' into a 45 degree rotated 'reveal-square'
			{
				var x = this.clamp($gamePlayer._x + delta_x, 0, $gameMap.width() - 1);
				var y = this.clamp($gamePlayer._y + delta_y, 0, $gameMap.height() - 1);
				this.updateFoWTile(x, y, true);
			}
		}
	}
};

Window_Minimap.prototype.updateFoWTile = function(x, y, value)
{
	if (Silv.Minimap.FoWData[$gameMap._mapId].tiles[x][y] !== value)
	{
		Silv.Minimap.FoWData[$gameMap._mapId].tiles[x][y] = value;
		(value) ? this.fowRevealTileInBmp(x, y) : this.fowHideTileInBmp(x, y);
		
		// Modify completion data
		var completionValue = (value) ? 1 : -1;
		Silv.Minimap.FoWData[$gameMap._mapId].completion.emptyTileCnt     -= completionValue;
		Silv.Minimap.FoWData[$gameMap._mapId].completion.completedTileCnt += completionValue;
		Silv.Minimap.FoWData[$gameMap._mapId].completion.completePerc      = Math.min(1.0, Silv.Minimap.FoWData[$gameMap._mapId].completion.completedTileCnt / parseFloat(Silv.Minimap.FoWData[$gameMap._mapId].completion.totalTiles));
		if (Silv.Minimap.FoWData[$gameMap._mapId].completion.completePerc === 1.0) { this.onFullyRevealedMap(x, y); }
	}
};

Window_Minimap.prototype.fowRevealTileInBmp = function(x, y)
{
	var tile_w = $gameMap.tileWidth();
	var tile_h = $gameMap.tileHeight();
	this.fowCurrentBmp.clearRect(x * tile_w, y * tile_h, tile_w, tile_h);
};

Window_Minimap.prototype.fowHideTileInBmp = function(x, y)
{
	var tile_w = $gameMap.tileWidth();
	var tile_h = $gameMap.tileHeight();
	var dest_x = x * tile_w;
	var dest_y = y * tile_h;
	var zoom_x = this.fowOriginalBmp.width / parseFloat(this.fowCurrentBmp.width);
	var zoom_y = this.fowOriginalBmp.height / parseFloat(this.fowCurrentBmp.height);
	
	this.fowCurrentBmp.blt(this.fowOriginalBmp, dest_x * zoom_x, dest_y * zoom_y, tile_w * zoom_x, tile_h * zoom_y, dest_x, dest_y, tile_w, tile_h);
};

// Recalculates the entire this.fowCurrentBmp from the Silv.Minimap.FoWData
Window_Minimap.prototype.refreshFoWBmp = function()
{
	this.cloneOriginalFoWBmpToCurrent();
	for (var y=0; y<$gameMap.height(); y++)
	{
		for (var x=0; x<$gameMap.width(); x++)
		{
			if (Silv.Minimap.FoWData[$gameMap._mapId].tiles[x][y]) { this.fowRevealTileInBmp(x, y); }
		}
	}
};

// Reveals OR hides all the tiles between 2 tile-coordinates. Note that the tile-coordinates itself are also included.
Window_Minimap.prototype.fowChangeTilesBetweenCoords = function(x1, y1, x2, y2, value)
{
	for (var y=y1; y<=y2; y++)
	{
		for (var x=x1; x<=x2; x++)
		{
			this.updateFoWTile(x, y, value);
		}
	}
};

Window_Minimap.prototype.getFowCompletion = function(mapId)
{
	if (!mapId) { mapId = $gameMap._mapId; }
	if (!Silv.Minimap.FoWData[mapId]) { return 0; }
	return Silv.Minimap.FoWData[mapId].completion;
};

Window_Minimap.prototype.fowRevealEntireMap = function()
{
	for(var y=0; y<Silv.Minimap.FoWData[$gameMap._mapId].tiles.length; y++)
	{
		for(var x=0; x<Silv.Minimap.FoWData[$gameMap._mapId].tiles[y].length; x++)
		{
			Silv.Minimap.FoWData[$gameMap._mapId].tiles[x][y] = true;
		}
	}
	
	// Reveal Bitmap
	this.fowCurrentBmp = new Bitmap(this.fowCurrentBmp.width, this.fowCurrentBmp.height);
	
	// Modify completion data
	Silv.Minimap.FoWData[$gameMap._mapId].completion.emptyTileCnt     = 0;
	Silv.Minimap.FoWData[$gameMap._mapId].completion.completedTileCnt = Silv.Minimap.FoWData[$gameMap._mapId].completion.totalTiles;
	Silv.Minimap.FoWData[$gameMap._mapId].completion.completePerc     = 1.0;
	this.onFullyRevealedMap($gameMap.width() - 1, $gameMap.height() - 1);
};

Window_Minimap.prototype.fowHideEntireMap = function(revealTilesAroundPlayer)
{
	this.resetFoWData();
	this.cloneOriginalFoWBmpToCurrent();
	if (revealTilesAroundPlayer) { this.updateFoW(); }
};

Window_Minimap.prototype.onFullyRevealedMap = function(x, y){};

//----------------------------------------------------------------------------------------------------
// #Rendering #Drawing
//----------------------------------------------------------------------------------------------------
Window_Minimap.prototype.setPlayerBlip = function(filename)
{
	this.usePlayerBlipGfx = (filename == ':player');
	if (this.usePlayerBlipGfx) { this.playerBlipBmp = null; }
	else { this.playerBlipBmp = ImageManager.loadMinimap(filename);	}
};

Window_Minimap.prototype.drawPlayerBlip = function(destBmp, translateFunc, src_x, src_y, src_w, src_h, dest_w, dest_h)
{
	var playerMapLoc = translateFunc(this, $gamePlayer._realX, $gamePlayer._realY, dest_w, dest_h);
	if (this.usePlayerBlipGfx)
	{
		destBmp.blt(this.playerInfo.bmp, src_x, src_y, src_w, src_h, playerMapLoc.x, playerMapLoc.y, dest_w, dest_h);
	}
	else
	{
		// Use custom player blip graphic
		if (this.playerBlipBmp.isReady())
		{
			destBmp.blt(this.playerBlipBmp, 0, 0, this.playerBlipBmp.width, this.playerBlipBmp.height, playerMapLoc.x, playerMapLoc.y, dest_w, dest_h);
		}
	}
};

Window_Minimap.prototype.drawMinimap = function()
{
	this.contents.clear();
	
	// BG fill colour, if applicable
	this.contents.fillRect(Silv.Minimap.BorderWidth, Silv.Minimap.BorderHeight, this.drawAreaWidth, this.drawAreaHeight, Silv.Minimap.MapBGFillColor);
	
	switch(this.mapStyle)
	{
		case 'autofit':
			this.drawstyleAutofit();
			break;
		case 'scroll':
			this.drawstyleScroll();
			break;	
		default:
			throw new Error('Window_Minimap.prototype.drawMinimap invalid switch value: ' + this.mapStyle);
	}
};

// #Vehicles
// Store the vehicle characterSprite into the vehicle-object.
Silv.AddAlias('mm_Scene_Map_createSpriteset', Scene_Map.prototype.createSpriteset);
Scene_Map.prototype.createSpriteset = function()
{
	Silv.Alias.mm_Scene_Map_createSpriteset.apply(this, arguments);
	
	Silv.Minimap.VehicleCharacterSprites = {};
	
	var vehicles = $gameMap._vehicles;
	for (var vehicleIdx=0; vehicleIdx<vehicles.length; vehicleIdx++)
	{
		var vehicle = vehicles[vehicleIdx];
		// vehicle.characterSprite = this._spriteset.findCharacterSpriteReversed(vehicle);
		Silv.Minimap.VehicleCharacterSprites[vehicle._type] = this._spriteset.findCharacterSpriteReversed(vehicle);
		
		if (Silv.Minimap.VehicleCharacterSprites[vehicle._type] === null) { throw new Error('Vehicle characterSprite can\'t be null for verhicle:', vehicle.characterName()); }
	}
};

// Render all vehicles that are located on the current active map.
// Note: vehicles are typeof GameVehicle which inherits from GameCharacter. It's not an event and therefore can't be added to the list of events to render. Therefore it requires it's own logic which this function provides.
Window_Minimap.prototype.drawVehicles = function(destBmp, translateFunc)
{	
	var vehicles = $gameMap._vehicles;
	for (var vehicleIdx=0; vehicleIdx<vehicles.length; vehicleIdx++)
	{
		var vehicle = vehicles[vehicleIdx];
		if ((vehicle._mapId === $gameMap._mapId) && !vehicle._driving) // Only render vehicles that are on this map and do not render it if the player is currently driving it.
		{
			if ((vehicle.isBoat() && this.renderBoat) || (vehicle.isShip() && this.renderShip) || (vehicle.isAirship() && this.renderAirship) || this.alwaysRenderVehicles) // Only render the vehicles that we want rendered
			{
				var charSprite = Silv.Minimap.VehicleCharacterSprites[vehicle._type];
				var srcBmp = charSprite._bitmap;
				var srcFrame = charSprite._frame;
				var vehicleLoc = translateFunc(this, vehicle._realX, vehicle._realY, srcFrame.width, srcFrame.height);
				
				if (srcBmp.isReady())
				{
					destBmp.blt(srcBmp, srcFrame.x, srcFrame.y, srcFrame.width, srcFrame.height, vehicleLoc.x, vehicleLoc.y, Silv.Minimap.VehicleRenderSize.x, Silv.Minimap.VehicleRenderSize.y);
				}
			}
		}
	}
};

Window_Minimap.prototype.drawstyleAutofit = function()
{
	// Opacity
	this.contents.paintOpacity = this.opacity = Silv.Minimap.Window_Opacity;
	
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
	if (this.fowEnabled) { this.applyFoWSection(this.contents, Silv.Minimap.BorderWidth, Silv.Minimap.BorderHeight, 0, 0, this.mapAspRatInfo.w, this.mapAspRatInfo.h, true, null, null); }

	// Debug Grid (if applicable)
	if (Silv.Minimap.DrawDebugGrid)
	{
		for (var i=0; i < $gameMap.width(); i++)
		{
			for (var j=0; j < $gameMap.height(); j++)
			{
				var debugTileLoc = this.translateLocationAutofit(this, i, j, this.tileInfo.w * this.mapAspRatInfo.w, this.tileInfo.h * this.mapAspRatInfo.h);
				this.contents.blt(this.debugGridBmp, 0, 0, this.tileInfo.w, this.tileInfo.h, debugTileLoc.x, debugTileLoc.y, this.tileInfo.w * this.mapAspRatInfo.w, this.tileInfo.h * this.mapAspRatInfo.h);
			}
		}
	}
	
	// Draw POI's
	for (var i = 0; i < this.getAllPOI().length; i++)
	{
		var poi = this.getPOIByIdx(i);
		var poiLoc = this.translateLocationAutofit(this, poi.real_x, poi.real_y, poi.destSize.w, poi.destSize.h);
		this.contents.blt(poi.bmp, poi.src.x, poi.src.y, poi.src.w, poi.src.h,
		                  poiLoc.x, poiLoc.y, poi.destSize.w, poi.destSize.h);
	}
	
	// Draw Events
	for (var i=0; i < Silv.Minimap.Events.length; i++)
	{
		var ev = Silv.Minimap.Events[i].event;
		var ev_sprite = Silv.Minimap.Events[i].sprite;
		var evMapLoc = this.translateLocationAutofit(this, ev._realX, ev._realY, Silv.Minimap.EventRenderSize, Silv.Minimap.EventRenderSize);
		this.contents.blt(ev_sprite._bitmap, ev_sprite._frame.x, ev_sprite._frame.y, ev_sprite._frame.width, ev_sprite._frame.height, evMapLoc.x, evMapLoc.y, Silv.Minimap.EventRenderSize, Silv.Minimap.EventRenderSize);
	}
	
	// Draw Vehicles
	if (this.renderVehicles) { this.drawVehicles(this.contents, this.translateLocationAutofit); }
	
	// Draw Player
	if (this.playerBlipEnabled && this.playerBlink_IsVisible)
	{
		this.drawPlayerBlip(this.contents, this.translateLocationAutofit, this.playerInfo.src.x, this.playerInfo.src.y, this.playerInfo.src.width, this.playerInfo.src.height,
		                    Silv.Minimap.PlayerIconWidth, Silv.Minimap.PlayerIconHeight);
	}
	
	// Overlay (if applicable)
	if (Silv.Minimap.DrawOverlay) { this.drawOverlay(); }
};

Window_Minimap.prototype.drawstyleScroll = function()
{
	// Opacity
	this.contents.paintOpacity = this.opacity = Silv.Minimap.Window_Opacity;
	
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
	// var map_src_rect = { x:0.0, y:0.0, w:0.0, h:0.0};
	// map_src_rect.x = this.mapScroll.x;
	// map_src_rect.y = this.mapScroll.y;
	// map_src_rect.w = this.drawAreaWidth * this.mapZoomInverse;
	// map_src_rect.h = this.drawAreaHeight * this.mapZoomInverse;
	// Draw Map
	this.contents.blt(this.mapBmp, this.mapScroll.x, this.mapScroll.y, this.drawAreaWidth * this.mapZoomInverse, this.drawAreaHeight * this.mapZoomInverse, Silv.Minimap.BorderWidth, Silv.Minimap.BorderHeight, this.drawAreaWidth, this.drawAreaHeight);
	if (this.fowEnabled) { this.applyFoWSection(this.contents, Silv.Minimap.BorderWidth, Silv.Minimap.BorderHeight, this.mapScroll.x - 0, this.mapScroll.y - 0, this.mapZoom, this.mapZoom, false, this.drawAreaWidth * this.mapZoomInverse, this.drawAreaHeight * this.mapZoomInverse); }
	
	// Debug Grid (if applicable)
	if (Silv.Minimap.DrawDebugGrid)
	{
		for (var i=0; i < $gameMap.width(); i++)
		{
			for (var j=0; j < $gameMap.height(); j++)
			{
				var debugTileLoc = this.translateLocationScroll(this, i, j, this.tileInfo.w * this.mapZoom, this.tileInfo.h * this.mapZoom);
				this.contents.blt(this.debugGridBmp, 0, 0, this.tileInfo.w, this.tileInfo.h, debugTileLoc.x, debugTileLoc.y, this.tileInfo.w * this.mapZoom, this.tileInfo.h * this.mapZoom);
			}
		}
	}
	
	// Draw POI's
	for (var i = 0; i < this.getAllPOI().length; i++)
	{
		var poi = this.getPOIByIdx(i);
		var poiLoc = this.translateLocationScroll(this, poi.real_x, poi.real_y, poi.destSize.w, poi.destSize.h);
		this.contents.blt(poi.bmp, poi.src.x, poi.src.y, poi.src.w, poi.src.h,
		                  poiLoc.x, poiLoc.y, poi.destSize.w, poi.destSize.h);
	}

	// Draw Events
	for (var i=0; i < Silv.Minimap.Events.length; i++)
	{
		var ev = Silv.Minimap.Events[i].event;
		var ev_sprite = Silv.Minimap.Events[i].sprite;
		var evMapLoc = this.translateLocationScroll(this, ev._realX, ev._realY, Silv.Minimap.EventRenderSize, Silv.Minimap.EventRenderSize);
		this.contents.blt(ev_sprite._bitmap, ev_sprite._frame.x, ev_sprite._frame.y, ev_sprite._frame.width, ev_sprite._frame.height, evMapLoc.x, evMapLoc.y, Silv.Minimap.EventRenderSize, Silv.Minimap.EventRenderSize);
	}
	
	// Draw Vehicles
	if (this.renderVehicles) { this.drawVehicles(this.contents, this.translateLocationScroll); }
	
	// Draw Player
	if (this.playerBlipEnabled && this.playerBlink_IsVisible)
	{
		this.drawPlayerBlip(this.contents, this.translateLocationScroll, this.playerInfo.src.x, this.playerInfo.src.y, this.playerInfo.src.width, this.playerInfo.src.height,
						    Silv.Minimap.PlayerIconWidth, Silv.Minimap.PlayerIconHeight);
	}
	
	// Overlay (if applicable)
	if (Silv.Minimap.DrawOverlay) { this.drawOverlay(); }
};

Window_Minimap.prototype.drawOverlay = function()
{
	this.contents.blt(this.overlayBmp, 0, 0, this.overlayBmp.width, this.overlayBmp.height, 0, 0, this.width, this.height);
};
//----------------------------------------------------------------------------------------------------
// #Translate functions
// Important: Because the translate functions are assigned to a variable, the this-keyword will be undefined! Therefore this can not be used and that's why I used "that" as a parameter :P. Also Silv.Minim.Window may be null so it must be a parameter.
// For more info see: http://stackoverflow.com/questions/4011793/this-is-undefined-in-javascript-class-methods
//----------------------------------------------------------------------------------------------------
// returns {x, y}
Window_Minimap.prototype.translateLocationScroll = function(that, obj_real_x, obj_real_y, obj_w, obj_h)
{
	var obj_x = (obj_real_x * that.tileInfo.w + that.tileInfo.hw) * that.mapZoom - that.mapScroll.x * that.mapZoom - obj_w / 2.0 + Silv.Minimap.BorderWidth;
	var obj_y = (obj_real_y * that.tileInfo.h + that.tileInfo.hh) * that.mapZoom - that.mapScroll.y * that.mapZoom - obj_h / 2.0 + Silv.Minimap.BorderHeight;
	return {x: obj_x, y: obj_y}; 
};

// returns {x, y}
Window_Minimap.prototype.translateLocationAutofit = function(that, obj_real_x, obj_real_y, obj_w, obj_h)
{
	var obj_x = (obj_real_x * that.tileInfo.w + that.tileInfo.hw) * that.mapAspRatInfo.scaleDelta_x * that.mapAspRatInfo.w - obj_w / 2.0 + that.mapAspRatInfo.offset_x + Silv.Minimap.BorderWidth;
	var obj_y = (obj_real_y * that.tileInfo.h + that.tileInfo.hh) * that.mapAspRatInfo.scaleDelta_y * that.mapAspRatInfo.h - obj_h / 2.0 + that.mapAspRatInfo.offset_y + Silv.Minimap.BorderHeight;
	return {x: obj_x, y: obj_y};
};

// returns {x, y}
Window_Minimap.prototype.translateLocationMenu = function(that, obj_real_x, obj_real_y, obj_w, obj_h)
{
	var obj_x = (obj_real_x * that.tileInfo.w + that.tileInfo.hw) * that.menuZoom - obj_w / 2.0;
	var obj_y = (obj_real_y * that.tileInfo.h + that.tileInfo.hh) * that.menuZoom - obj_h / 2.0;
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
	throw new Error('getPOIByID(' + id + ') not found.');
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// #Create the Minimap window
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------
// Scene Map (alias): Create Display Objects
//----------------------------------------------------------------------------------------------------
Silv.AddAlias('mm_Scene_Map_createDisplayObjects', Scene_Map.prototype.createDisplayObjects);
Scene_Map.prototype.createDisplayObjects = function()
{
	Silv.Alias.mm_Scene_Map_createDisplayObjects.apply(this, arguments);
	Silv.Minimap.setup();
};
//----------------------------------------------------------------------------------------------------
// Setup Minimap
// Call this method to create or re-create the minimap, if required. It does only create a minimap
// if it passes all the checks.
// Example: Silv.Minimap.setup();
//----------------------------------------------------------------------------------------------------
Silv.Minimap.setup = function()
{
	var didMapChange = $gameMap._mapId != this.LastMapID;
	if (didMapChange)
	{
		if (this.WasLoadedFromSave)
		{
			this.WasLoadedFromSave = false;
		}
		else
		{
			if (this.AutoClearPOI) { this.POI[$gameMap._mapId] = []; }
		}
	}
	
	// Create empty POI array if it's not defined yet for this map
	if (typeof this.POI[$gameMap._mapId] === 'undefined') { this.POI[$gameMap._mapId] = []; }

	SceneManager._scene.attemptToCreateMinimap();
	this.LastMapID = $gameMap._mapId;
};
//----------------------------------------------------------------------------------------------------
// Attempt To Create Minimap
//----------------------------------------------------------------------------------------------------
Scene_Map.prototype.attemptToCreateMinimap = function()
{
	var mapName = lpad_mapname($gameMap._mapId, '0') + '.png';
	if ('mm_mapshot' in $dataMap.meta)
	{
		if (Silv.Minimap.DebugMode) { console.log('A mapshot-notetag was found:' + $dataMap.meta.mm_mapshot + '.'); }
		mapName = lpad_mapname($dataMap.meta.mm_mapshot, '0') + '.png';
	}
	
	var createMinimap = false;
	var minimapType = null;
	var hasRequiredItems = this.MinimapHasRequiredItems();
	
	if (Silv.Minimap.Window !== null)
	{
		// #Dispose
		// This is required for values like "Silv.Minimap.Window.visible" to get 'reset' properly. Otherwise they keep the values from an old map which can lead to nasty bugs.
		this.removeWindow(Silv.Minimap.Window); // Required because the Scene_Map still holds a reference to the old minimap, effectively creating 2 or more minimaps if this method creates another one now...
		Silv.Minimap.Window = null;
		Silv.Minimap.Menu.Enabled = false;
		Silv.Minimap.Menu.Bmp = null;
		Silv.Minimap.Menu.Markers = [];
	}
	
	var windowWasVisible = Silv.Minimap.Visible;
	if (minimapImageExists(mapName))
	{
		if (hasRequiredItems)
		{
			createMinimap = true;
			minimapType = 'regular';
		}
	}
	else
	{
		if (Silv.Minimap.DebugMode) { console.log('No minimap \'' + mapName + '\' found for map with map-id: ' + $gameMap._mapId + '.'); }
		
		if (hasRequiredItems)
		{
			if (('mm_generate_worldmap' in $dataMap.meta) || ('mm_generate_overworld' in $dataMap.meta))
			{
				if (Silv.Minimap.DebugMode && !$gameMap.isOverworld()) { console.log('Current map is NOT an overworld map but the minimap is set to treat it like a regular one.'); }
				createMinimap = true;
				minimapType = 'generate_overworld';
			} else if ('mm_generate_map' in $dataMap.meta)
			{
				if (Silv.Minimap.DebugMode && $gameMap.isOverworld()) { console.log('Current map is an overworld map but the minimap is set to treat it like an overworld map.'); }
				createMinimap = true;
				minimapType = 'generate_map';
			}
		}
	}
	
	if (createMinimap)
	{
		this.createMinimapWindow(mapName.replace('.png', ''), minimapType);
		if (!windowWasVisible) { Silv.Minimap.Window.hide(); } // This is to prevent the minimap from showing itself again after opening a menu or when recreating the minimap while staying on the same map.
		if ('mm_generate_passability_overlay' in $dataMap.meta) { Silv.Minimap.Window.setPassabilityOverlay(true); }
	}
	// else
	// {
		//'Dispose'	
		//This is required for values like "Silv.Minimap.Window.visible" to get 'reset' properly. Otherwise they keep the values from an old map which can lead to nasty bugs. 
		// Silv.Minimap.Window = null;
	// }
};
//----------------------------------------------------------------------------------------------------
// Scene_Base: Remove Window
//----------------------------------------------------------------------------------------------------
// Omg why does RPG Maker not have this method by default...
Scene_Base.prototype.removeWindow = function(window)
{
	var index = this.children.indexOf(window);
	if (index > -1) { this.children.splice(index, 1); }
};
//----------------------------------------------------------------------------------------------------
// Create Minimap Window
//----------------------------------------------------------------------------------------------------
Scene_Map.prototype.createMinimapWindow = function(mapname, minimapType)
{
	var x = 0;
	if (Silv.Minimap.WindowHorizontalAlignment == 'right') { x = Graphics.width - Silv.Minimap.WindowWidth; }
	var y = 0;
	if (Silv.Minimap.WindowVerticalAlignment == 'bottom') { y = Graphics.height - Silv.Minimap.WindowHeight; }
	
	Silv.Minimap.Window = new Window_Minimap(x + Silv.Minimap.Window_X, y + Silv.Minimap.Window_Y, Silv.Minimap.WindowWidth, Silv.Minimap.WindowHeight, mapname, minimapType);
	Silv.Minimap.Window.resetFade();
	
	// override frameskip (map-specific frameskip)
	if ('mm_frameskip' in $dataMap.meta)
	{
		Silv.Minimap.Window.frameSkip = parseInt($dataMap.meta.mm_frameskip);
		if (Silv.Minimap.DebugMode) { console.log('Global frameskip: ' + Silv.Minimap.FrameSkip + ' was overriden by the map-specific frameskip of: ' + $dataMap.meta.mm_frameskip + '.'); }
	}
	
	this.addChildAt(Silv.Minimap.Window, 1);
};
//----------------------------------------------------------------------------------------------------
// Has Required Items
//----------------------------------------------------------------------------------------------------
Scene_Map.prototype.MinimapHasRequiredItems = function()
{
	// Check global item
	if (Silv.Minimap.GlobalRequiredItem > 0)
	{
		if (!$gameParty.hasItem($dataItems[Silv.Minimap.GlobalRequiredItem], false))
		{
			if (Silv.Minimap.DebugMode) { console.log('Minimap (or mapshot-notetag) was found but party does not possess the required global item: ' + $dataItems[Silv.Minimap.GlobalRequiredItem].name); }
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
// Show Map upon gaining the required item
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Silv.AddAlias('mm_Game_Interpreter_command126', Game_Interpreter.prototype.command126);
Game_Interpreter.prototype.command126 = function()
{
    var retVal = Silv.Alias.mm_Game_Interpreter_command126.apply(this, arguments);
	
	if ((Silv.Minimap.Window === null) && SceneManager._scene.MinimapHasRequiredItems())
	{
		SceneManager._scene.attemptToCreateMinimap(false);
	}
    
	return retVal;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Saving & Loading #Save #Saving #Loading
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Silv.AddAlias('mm_DataManager_makeSaveContents', DataManager.makeSaveContents);
DataManager.makeSaveContents = function()
{
	contents = Silv.Alias.mm_DataManager_makeSaveContents.apply(this, arguments);
	
	contents.minimap = {};
	contents.minimap.poi = {};
	
	// POI
	for (var mapID in Silv.Minimap.POI)
	{
		if (Silv.Minimap.POI.hasOwnProperty(mapID))
		{
			if(Silv.Minimap.POI[mapID].length > 0) { contents.minimap.poi[mapID] = []; }
			for(var poi_idx=0; poi_idx<Silv.Minimap.POI[mapID].length; poi_idx++)
			{
				contents.minimap.poi[mapID].push(Silv.Minimap.Window.getPOIByIdx(poi_idx).makeSaveContents());
			}
		}
	}
	
	// FoW
	contents.minimap.fowData = Silv.Minimap.FoWData;
	
	return contents;
};

Silv.AddAlias('mm_DataManager_extractSaveContents', DataManager.extractSaveContents);
DataManager.extractSaveContents = function(contents)
{
	Silv.Alias.mm_DataManager_extractSaveContents.apply(this, arguments);

	// POI
	Silv.Minimap.POI = {};
	for (var mapID in contents.minimap.poi)
	{
		if (contents.minimap.poi.hasOwnProperty(mapID))
		{
			if(contents.minimap.poi[mapID].length > 0) { Silv.Minimap.POI[mapID] = []; }
			for(var poi_idx=0; poi_idx<contents.minimap.poi[mapID].length; poi_idx++)
			{
				var poi = contents.minimap.poi[mapID][poi_idx];
				var newPOI = new MM_POI(poi.id, poi.name, poi.desc, poi.real_x, poi.real_y, poi.folderPath, poi.filename, poi.src.x, poi.src.y, poi.src.w, poi.src.h, poi.destSize.w, poi.destSize.h);
				newPOI.tp = poi.tp;
				Silv.Minimap.POI[mapID].push(newPOI);
			}
		}
	}
	
	// FoW
	Silv.Minimap.FoWData = contents.minimap.fowData;
	
	// Prevent the minimap from autoclearing it's POI's (if AutoClearPOI is enabled) when loading a savegame
	Silv.Minimap.WasLoadedFromSave = true;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// #Plugin Command
// Note: The items are separated by spaces. The command is the first word and any following words are args. args is an array.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Silv.AddAlias('mm_Game_Interpreter_pluginCommand', Game_Interpreter.prototype.pluginCommand);
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
	Silv.Alias.mm_Game_Interpreter_pluginCommand.apply(this, arguments);
	if (command.toLowerCase() == 'minimap') { PluginCommand(command, args); }
};

function PluginCommand(cmd, args)
{
	var arg0 = args[0].toLowerCase();
	if ((Silv.Minimap.Window === null) && (arg0 !== 'refresh')) { throw new Error('Minimap Plugin Commands can not be used when there is no active minimap. Either create one from a mapshot or generate one automatically'); }
	
	switch(arg0)
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
			SceneManager._scene.attemptToCreateMinimap(false);
			break;
		case 'addpoi': // addpoi id, name, desc, real_x, real_y, bitmap folder, bitmap filename, s_x, s_y, s_w, s_h, draw_w, draw_h
		    Silv.Minimap.POI[$gameMap._mapId].push(new MM_POI(args[1], args[2].replace('_', ' '), '', parseFloat(args[3]), parseFloat(args[4]), args[5], args[6], parseInt(args[7]), parseInt(args[8]), parseInt(args[9]), parseInt(args[10]), parseInt(args[11]), parseInt(args[12])));
			SceneManager._scene.attemptToCreateMinimap(false);
			break;
		case 'deletepoi':
			Silv.Minimap.POI[$gameMap._mapId] = Silv.Minimap.POI[$gameMap._mapId].filter(function(poi) { return poi.id != args[1]; });
			break;
		case 'poidesc':
			  Silv.Minimap.Window.getPOIByID(parseInt(args[1])).desc = args.join(' ').substr(2 + args[0].length + args[1].length);
			break;
		case 'poi_tp': // POI_TP <poi_id x_offset, y_offset, direction, fadeType>
			Silv.Minimap.Window.getPOIByID(parseInt(args[1])).tp = [parseInt(args[2]), parseInt(args[3]), parseInt(args[4]), parseInt(args[5])];
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
		case 'generate_passability_overlay':
		case 'gen_pass_ov':
			Silv.Minimap.setPassabilityOverlay(args[1].toLowerCase() == 'true');
			break;
		case 'showmapmenu':
			Silv.Minimap.Window.showMapMenuScene();
			break;
		case 'setplayerblip':
			Silv.Minimap.Window.setPlayerBlip(args[1]);
			break;
		case 'setmapstyle':
			Silv.Minimap.Window.mapStyle = args[1].toLowerCase();
			break;
		case 'setfollowtarget':
		case 'setcamera':
			var followType = args[1].toLowerCase();
			if (followType == 'coordinate')
			{
				Silv.Minimap.Window.setCameraFollowTarget(followType, [parseInt(args[2]), parseInt(args[3])]);
			}
			else
			{
				Silv.Minimap.Window.setCameraFollowTarget(followType, args[2]);
			}
			break;
		case 'fowshowtile':
			if (Silv.Minimap.Window && Silv.Minimap.Window.fowEnabled) { Silv.Minimap.Window.updateFoWTile(parseInt(args[1]), parseInt(args[2]), true); }
			break;
		case 'fowhidetile':
			if (Silv.Minimap.Window && Silv.Minimap.Window.fowEnabled) { Silv.Minimap.Window.updateFoWTile(parseInt(args[1]), parseInt(args[2]), false); }
			break;
		case 'fowrevealtiles':
			if (Silv.Minimap.Window && Silv.Minimap.Window.fowEnabled) { Silv.Minimap.Window.fowChangeTilesBetweenCoords(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]), parseInt(args[4]), true); }
			break;
		case 'fowhidetiles':
			if (Silv.Minimap.Window && Silv.Minimap.Window.fowEnabled) { Silv.Minimap.Window.fowChangeTilesBetweenCoords(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]), parseInt(args[4]), false); }
			break;
		case 'fowchangetiles':
			if (Silv.Minimap.Window && Silv.Minimap.Window.fowEnabled) { Silv.Minimap.Window.fowChangeTilesBetweenCoords(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]), parseInt(args[4]), (args[5].toLowerCase() === 'true')); }
			break;
		case 'fowrevealall':
			if (Silv.Minimap.Window && Silv.Minimap.Window.fowEnabled) { Silv.Minimap.Window.fowRevealEntireMap(); }
			break;
		case 'fowreset':
		case 'fowhideall':
			var showTilesAroundPlayer = (typeof args[1] === 'undefined') ? true : (args[1].toLowerCase() === 'true');
			if (Silv.Minimap.Window && Silv.Minimap.Window.fowEnabled) { Silv.Minimap.Window.fowHideEntireMap(showTilesAroundPlayer); }
			break;
		case 'rendervehicle':
			switch(args[1].toLowerCase())
			{
				case 'all':
					Silv.Minimap.Window.renderVehicles = args[2].toLowerCase() === 'true';
					break;
				case 'boat':
					Silv.Minimap.Window.renderBoat = args[2].toLowerCase() === 'true';
					break;
				case 'ship':
					Silv.Minimap.Window.renderShip = args[2].toLowerCase() === 'true';
					break;
				case 'airship':
					Silv.Minimap.Window.renderAirship = args[2].toLowerCase() === 'true';
					break;
				case 'forceall':
					Silv.Minimap.Window.alwaysRenderVehicles = args[2].toLowerCase() === 'true';
					break;
				default:
					throw new Error('Unknown parameterfor "Minimap RenderVehicle": ' + args[1]);
			}
			break;
		default:
			throw new Error('Minimap, unknown Plugin Command: ' + args[0]);
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
	SoundManager.playOk();
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
	if (marker.tp !== null) { tp_text = '\nTeleports you to: ' + marker.tp[0] + ',' + marker.tp[1]; }
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
		if(marker.tp !== null)
		{
			// Add the teleport location to the minimap and dequeue this scene to return to the previous scene
			SoundManager.playOk();
			Silv.Minimap.TP_Dest = marker.tp;
			SceneManager.pop();
		}
	}
	
	if (Input.isTriggered(Silv.Minimap.Menu.MenuKey))
	{
		SoundManager.playCancel();
		SceneManager.pop();
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
	this.setCursorRect(0, 0, 0, 0);
};

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
};

Window_MapSection.prototype.setMarker = function(marker)
{
    if (this._marker !== marker)
	{
        this._marker = marker;
		this.centerOnMarker(marker);
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