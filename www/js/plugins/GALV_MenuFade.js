//-----------------------------------------------------------------------------
//  Galv's Menu Fade
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MenuFade.js
//-----------------------------------------------------------------------------
//  2015-11-14 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MenuFade = true;

var Galv = Galv || {};        // Galv's main object
Galv.MF = Galv.MF || {};      // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Adds a fade in and fade out to the main menu only.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Fade Speed
 * @desc Amount of frames it takes for main menu to fade in
 *
 * @default 10
 *
 * @help
 *   Galv's Menu Fade
 * ----------------------------------------------------------------------------
 * Plug and play. Only option is to change the speed of the fading.
 * The higher the number, the slower the fading speed.
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {	

Galv.MF.fadeSpeed = Number(PluginManager.parameters('Galv_MenuFade')["Fade Speed"]);
Galv.MF.fade = true;

SceneManager._backgroundBitmapNoBlur  = null;

SceneManager.backgroundBitmapNoBlur = function() {
    return this._backgroundBitmapNoBlur;
};


var Galv_Scene_MenuBase_start = Scene_MenuBase.prototype.start;
Scene_MenuBase.prototype.start = function() {
    Galv_Scene_MenuBase_start.call(this);
	if (SceneManager.isPreviousScene(Scene_Map)) {
		if (Galv.MF.fade) {
			this.startFadeIn(Galv.MF.fadeSpeed);
			$gameTemp.fadeScene = this.constructor.name;
		};
	};
	Galv.MF.fade = false;
};


// OVERWRITE
Scene_MenuBase.prototype.createFadeSprite = function(fadeout) {
    if (!this._fadeSprite) this._fadeSprite = new Sprite();
	if (fadeout) {
		this._fadeSprite.bitmap = SceneManager.backgroundBitmapNoBlur();
	} else {
		this._fadeSprite.bitmap = SceneManager.backgroundBitmap();
	};
	this.addChild(this._fadeSprite);
};



var Galv_Scene_MenuBase_popScene = Scene_MenuBase.prototype.popScene;
Scene_MenuBase.prototype.popScene = function() {
	if ($gameTemp.fadeScene == this.constructor.name) {
		this.startFadeOut(Galv.MF.fadeSpeed,true);
	};
    Galv_Scene_MenuBase_popScene.call(this);
};


var Galv_Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	Galv_Scene_Map_start.call(this);
	Galv.MF.fade = true;
};


var Galv_SceneManager_snapForBackground = SceneManager.snapForBackground;
SceneManager.snapForBackground = function() {
    this._backgroundBitmapNoBlur = this.snap(); 
    Galv_SceneManager_snapForBackground.call(this);
};
})();