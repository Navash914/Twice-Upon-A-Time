//=============================================================================
// Kaus Ultimate Overlay
// Kaus_Ultimate_Overlay.js
// Version: 1.03
// Date Created: October 31, 2015
// Scripted By: Kaus
//=============================================================================

var Imported = Imported || {};
Imported.Kaus_Ultimate_Overlay = 1.2;

//=============================================================================
/*:
 * @plugindesc v1.03 Adds Overlay Images on the Map. (Ground,Parallax,Light,Fog)
 * @author Kaus
 *
 * @param -F I L E  N A M E S-
 * @default
 * @param Parallax Filename
 * @desc filename used for displaying Parallax Images  
 * Default: par
 * @default par
 * @param Ground Filename
 * @desc filename used for displaying Ground Images 
 * Default: ground
 * @default ground
 * @param Light Filename
 * @desc filename used for displaying Light Images 
 * Default: light
 * @default light
 * @param -S E T T I N G S-
 * @default
 * @param Light Opacity
 * @desc Opacity that Light Images use.  
 * Default:185
 * @default 185
 * @param Fog Switch ID
 * @desc Overlay Switch ID used for displaying Fog
 * Default:5
 * @default 5
 * @param Light Switch ID
 * @desc Overlay Switch ID used for displaying Light
 * Default:6
 * @default 6
 * @param Parallax Switch ID
 * @desc Overlay Switch ID used for displaying Parallax
 * Default:7
 * @default 7
 *
 *@help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets you add overlay images on your map. 
 * You have a choice of 4 different layers on the map to put your custom images
 * 
 * ============================================================================
 * Filename and Use Instructions
 * ============================================================================
 * All images must be saved in img/Parallaxes Folder.
 * ground, par and light overlays must be named designated to their mapIDs
 *
 * For example: display a parallax map and light in MapID:002
 * Name your files par2 and light 2 and save it in img/Parallaxes Folder
 *
 * Note: You must input the notetags for it to display. and have your chosen
 * Overlay Switch ID set to ON. 
 * In the example above notetags should be <par> and <light>.
 *
 *
 * ============================================================================
 * Notetags Instructions
 * ============================================================================
 * Note: Input your notetags inside the map properties. The following notetags 
 *       is case sensitive and space sensitive.
 * 
 *  <all>              display all 3 overlays (ground,par,light)
 *  <ground>           display ground layer.
 *  <par>              display parallax layer.
 *  <light>            display light layer.
 *  <fogName:filename> display the chosen fog.
 *  <fogBlend:number>  changes the blend type of fog 0:NORMAL 1:ADD
 *  <xMove:number>     moves the fog left or right (+ moves right, - moves left)
 *  <yMove:number>     moves the fog up or down (+ moves down, - moves up)
 *
 *
 * LAYERS:
 * Light Layer    is the highest layer and used for creating Light Effects such as Sunlight Rays, or Street Lights, etc.
 * Fog Layer      is used for creating a Fog Effect in much that is moving automatically by settings. Used for Mists Clouds etc.
 * Parallax Layer is used for adding an image in the map that will be OVER the character. 
 *                You can also use this Layer to create shadows for your tiles.
 * Ground Layer   like Parallax Layer it is used for creating custom images but UNDER your characters.
 *
 */

(function() {
    
var parameters = PluginManager.parameters('Kaus_Ultimate_Overlay');
var parallax_FN = String(parameters['Parallax Filename']);
var ground_FN = String(parameters['Ground Filename']);
var light_FN = String(parameters['Light Filename']);
var light_OP = Number(parameters['Light Opacity']);
var fogSwitch = Number(parameters['Fog Switch ID']);
var lightSwitch = Number(parameters['Light Switch ID']);
var parSwitch = Number(parameters['Parallax Switch ID']);


Spriteset_Map.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    map = $dataMap;
    this.createParallax();
    this.createTilemap();
    if(map.meta.ground || map.meta.all) this.createGroundMap();
    this.createCharacters();
    if(map.meta.par || map.meta.all) this.createParMap();
    if(map.meta.fogName) this.createFogMap();
    if(map.meta.light || map.meta.all) this.createLightMap();
    this.createShadow();
    this.createDestination();
    this.createWeather();
};
  
    
Spriteset_Map.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
    this.updateTileset();
    
    if(map.meta.ground || map.meta.all) this.updateGroundMap();
    this.updateParallax();
    if(map.meta.par || map.meta.all) this.updateParMap();
    if(map.meta.fogName) this.updateFogMap();
    if(map.meta.light || map.meta.all) this.updateLightMap();
    this.updateTilemap();
    this.updateShadow();
    this.updateWeather();
};    

//==================== G R O U N D  M A P ======================    
Spriteset_Map.prototype.createGroundMap = function() {
    this._groundMap = new TilingSprite();
    this._groundMap.bitmap = ImageManager.loadParallax(ground_FN+$gameMap.mapId());
    this._groundMap.move(0, 0, Graphics.width, Graphics.height);
    this._groundMap.z = 1;
    this._tilemap.addChild(this._groundMap);
    };
    
Spriteset_Map.prototype.updateGroundMap = function() {
        this._groundMap.origin.x =  $gameMap.displayX() * $gameMap.tileWidth();
        this._groundMap.origin.y =  $gameMap.displayY() * $gameMap.tileHeight();
        };

        
//======================= P A R  M A P =========================    
Spriteset_Map.prototype.createParMap = function() {
    this._parMap = new TilingSprite();
    this._parMap.bitmap = ImageManager.loadParallax(parallax_FN+$gameMap.mapId());
    this._parMap.move(0, 0, Graphics.width, Graphics.height);
    this._parMap.z = 20
    this._tilemap.addChild(this._parMap);
    if($gameSwitches.value(parSwitch)== true) 
      this._parMap.opacity = 255;
     else
      this._parMap.opacity = 0;
};

Spriteset_Map.prototype.updateParMap = function() {
        this._parMap.origin.x =  $gameMap.displayX() * $gameMap.tileWidth();
        this._parMap.origin.y =  $gameMap.displayY() * $gameMap.tileHeight();
       //Switch Checking
       if($gameSwitches.value(parSwitch)== true){
        if(this._parMap.opacity < 255) this._parMap.opacity += 10; }
     else
        if(this._parMap.opacity!=0) this._parMap.opacity -= 10;
        };
    
//===================== L I G H T  M A P =======================
Spriteset_Map.prototype.createLightMap = function() {
    this._lightMap = new TilingSprite();
    this._lightMap.bitmap = ImageManager.loadParallax(light_FN+$gameMap.mapId());
    this._lightMap.move(0, 0, Graphics.width, Graphics.height);
    this._lightMap.blendMode = 1;
    this._lightMap.z = 22;
    this._tilemap.addChild(this._lightMap);
    if($gameSwitches.value(lightSwitch)== true) 
      this._lightMap.opacity = light_OP;
     else
      this._lightMap.opacity = 0;
};

Spriteset_Map.prototype.updateLightMap = function() {
        this._lightMap.origin.x =  $gameMap.displayX() * $gameMap.tileWidth();
        this._lightMap.origin.y =  $gameMap.displayY() * $gameMap.tileHeight();
        //Switch Checking
       if($gameSwitches.value(lightSwitch)== true){
        if(this._lightMap.opacity < light_OP) this._lightMap.opacity += 1; }
     else
        if(this._lightMap.opacity!=0) this._lightMap.opacity -= 1;
};
    
    
//======================= F O G  M A P ==========================
Spriteset_Map.prototype.createFogMap = function() {
    map = $dataMap;
    this._fogMap = new TilingSprite();
    this._fogMap.bitmap = ImageManager.loadParallax(map.meta.fogName);
    this._fogMap.move(0, 0, Graphics.width, Graphics.height);
    this._fogMap.blendMode = Number(map.meta.fogBlend) || 0;
    if($gameSwitches.value(fogSwitch)== true)
      this._fogMap.opacity = Number(map.meta.fogOpacity) || 125;
     else 
      this._fogMap.opacity = 0;
    this._fogMap.origin.x =  $gameMap.displayX() * $gameMap.tileWidth();
    this._fogMap.origin.y =  $gameMap.displayY() * $gameMap.tileHeight();
    this._fogMap.z = 21;
    newX = 0;
    newY = 0;
    this._tilemap.addChild(this._fogMap);
};

Spriteset_Map.prototype.updateFogMap = function() {
        map = $dataMap;
        newX += Number(map.meta.xMove) || 0;
        newY += Number(map.meta.yMove) || 0;
        if(newX!=0) this._fogMap.origin.x =  ($gameMap.displayX() * $gameMap.tileWidth()) - newX;
         else this._fogMap.origin.x =  ($gameMap.displayX() * $gameMap.tileWidth());
        if(newY!=0) this._fogMap.origin.y =  ($gameMap.displayY() * $gameMap.tileHeight()) - newY;
         else this._fogMap.origin.y =  ($gameMap.displayY() * $gameMap.tileHeight());
    //Switch Checking
     if($gameSwitches.value(fogSwitch)== true){
         defOpacity = Number(map.meta.fogOpacity) || 125;
        if(this._fogMap.opacity < defOpacity) this._fogMap.opacity += 1; }
     else
        if(this._fogMap.opacity!=0) this._fogMap.opacity -= 1;
};

})();
