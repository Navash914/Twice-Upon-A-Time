//-----------------------------------------------------------------------------
//  Galv's Balloon Sound Effects
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_BalloonSoundEffects.js
//-----------------------------------------------------------------------------
//  2015-11-29 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_BalloonSoundEffects = true;

var Galv = Galv || {};            // Galv's main object
Galv.BSE = Galv.BSE || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Set sound effects to play whenever balloons are shown above characters
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Exclamation
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Flash1,80,150
 *
 * @param Question
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Jump1,80,120
 *
 * @param Music Note
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Up3,80,150
 *
 * @param Heart
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Sound2,80,150
 *
 * @param Anger
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Push,80,150
 *
 * @param Sweat
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Miss,80,150
 *
 * @param Cobweb
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Wind4,80,150
 *
 * @param Silence
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default 
 *
 * @param Light Bulb
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Load,80,150
 *
 * @param Zzz
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default
 *
 * @param User-defined 1
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Item1,80,150
 *
 * @param User-defined 2
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Item2,80,150
 *
 * @param User-defined 3
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Item3,80,150
 *
 * @param User-defined 4
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Reflection,80,150
 *
 * @param User-defined 5
 * @desc Sound effect played when this ballon is displayed.
 * FileName,volume,pitch.
 * @default Reflection,80,100
 *
 * @help
 *   Galv's Balloon Sound Effects
 * ----------------------------------------------------------------------------
 * Set balloon sound effects that play whenever each balloon is popped up.
 * These are set up as FileName,volume,pitch in the plugin settings for each
 * balloon. The volume by default is 0-100 and pitch is 50-150.
 * Leave it blank if you dont want any SE for a balloon.
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.BSE.makeSound = function(txt) {
	if (!txt || txt === "") {
		txt = ",0,0";
	};
	var arr = txt.split(",");
	var obj = {
		name: arr[0],
		pan: 0,
		pitch: Number(arr[2]),
		volume: Number(arr[1])
	};
	return obj;
};

Galv.BSE.balloonSe = function() {
	var sounds = ["Exclamation","Question","Music Note","Heart","Anger","Sweat","Cobweb","Silence","Light Bulb","Zzz","User-defined 1","User-defined 2","User-defined 3","User-defined 4","User-defined 5"];
	var arr = [];
	for (var i = 0;i < sounds.length; i++) {
		arr[i] = Galv.BSE.makeSound(PluginManager.parameters('GALV_BalloonSoundEffects')[sounds[i]]);
	};
	return arr;
}();

Game_CharacterBase.prototype.startBalloon = function() {
	AudioManager.playSe(Galv.BSE.balloonSe[this._balloonId - 1]);
    this._balloonId = 0;
    this._balloonPlaying = true;
};

})();