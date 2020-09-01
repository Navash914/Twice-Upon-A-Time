//=============================================================================
// sound sepher Engine - Battle Speed Up
// SSEP_BattleSpeedUp.js
// Version: 1.00
// Translated by Zinx
//=============================================================================

var Imported = Imported || {};
Imported.SSEP_BattleSpeedUp = true;

var Sepher = Sepher || {};

//=============================================================================
/*:
 * @plugindesc A plugin to increase combat speed. YanflyEngine compatible.
 * Please place this after the Yanfly Engine.
 * @author Shoichiro Sakamoto(sound sepher)[Translated by Zinx]
 *
 * @help
 * ------------------------------------------------------------------------------
 * ■ sound sepher Engine - "Battle Speed UP" Plugin (Ver1.00 '15 10/24)
 * ------------------------------------------------------------------------------
 * Produced: Shoichiro Sakamoto (sound sepher)
 * Web： http://sepher.jp/
 * 
 * ------------------------------------------------------------------------------
 * ■ Description
 * ------------------------------------------------------------------------------
 * This plugin increases the battle speed.
 * It is compatible with both frontview and sideview.
 * Yanfly Engine’s Battle Core is also supported.
 * But, Action Sequence Pack 1 may not be supported.
 * 
 * ------------------------------------------------------------------------------
 * ■ Instructions
 * ------------------------------------------------------------------------------
 * Press the OK button to boost the battle speed.
 * Default combat speed can also be adjusted.
 * If you do not know the setting item’s meaning, please use the default 
 * settings.
 * 
 * ------------------------------------------------------------------------------
 * ■ Notes
 * ------------------------------------------------------------------------------
 * When using this script, in order to avoid conflictions with the Yanfly 
 * Engine, place this after the Yanfly Engine.
 * Support is not conducted.  Please use at your own risk.
 * Please give credit.  Following the format above is appreciated.
 * 
 * ------------------------------------------------------------------------------
 * ■Parameters Description
 * ------------------------------------------------------------------------------
 * ・BattleSpeed (Default)： When the OK button is not pressed, combat 
 *                            speed is multiplied by this value.
 *
 * ・BattleSpeed (Boost)　： When the OK button is pressed, the combat
 *                           speed is multiplied by this value.  When pressed
 *                           three or more times, the effect is canceled.
 *
 * ・StateIcon　　　　　　： Enemy state icon display speed is regulated.
 *
 * ・StateOverLay　　　　： Ally’s state animation speed is adjusted.
 *
 * ・Weapon　　　　　　　 ： Ally’s weapon animation speed in sideview.
 *
 * ・Motion　　　　　　　 ： Ally and enemy’s animation speed.
 *                            Speed of waiting and moving animation is affected.
 *                            Also, Weapon and Motion is synchronized.
 *                            To be safe, the value should be the same.
 *
 * ・Balloon　　　　　　　：Balloon’s display speed.
 *
 * ・Damage　　　　　　　 ：Damage’s numerical value frame duration.
 *
 * ・DamageMin　　　　　　：Minimum value for damage’s frame duration.
 *                            This is preventative measures since it can be hard
 *                            to see if you do early damage in the attack.
 *
 * ・LogAnime BaseDelay　 ：Battle Log’s display frame.
 *
 * ・LogAnime NextDelay　 ：Battle Log’s frame duration.
 * 
 * ★This plugin will only work if you have introduced Yanfly Engine – 
 *   Battle Core.
 *
 * ・YEP Battle Default　 ：This will affect the wait duration of the default
 *                            speed.
 *
 * ・YEP Battle Boost　　 ：This will affect the wait duration of the boost
 *                            speed.
 *
 * ・YEP Battle LogWait　 ：When using the Yanfly Engine, the Battle Log 
 *                            is ignored. Please adjust this wait value
 *                            however you like.
 * 
 * ------------------------------------------------------------------------------
 *
 * @param ---General Setting---
 * @default
 * @param BattleSpeed (Default)
 * @desc Default’s animation speed. Initial value is 1.
 * Non-weapon attack animation speed’s multiplier.
 * @default 1
 * @param BattleSpeed (Boost)
 * @desc Decision Key’s (OK) entry value animation speed.  Initial value 
 * is 2.
 * Non-weapon attack animation speed’s multiplier.
 * @default 2
 * @param ---Detail Setting---
 * @default
 * @param StateIcon
 * @desc State Icon Animation Speed value.
 * Initial value is 40.
 * @default 40
 * @param StateOverlay
 * @desc State Overlay animation speed value.
 * Initial value is 8.
 * @default 8
 * @param Weapon
 * @desc Sideview weapon attack animation speed value.
 * Initial value is 12. Should be the same value as Motion since they are 
 * synchronized.
 * @default 12
 * @param Motion
 * @desc Action motion animation speed value.
 * Initial value is 12. Should be the same value as Weapon since they are 
 * synchronized.
 * @default 12
 * @param Balloon
 * @desc Balloon animation speed value.
 * Initial value is 12.
 * @default 12
 * @param Damage
 * @desc Damage pop-up frame duration.
 * Initial value is 90. Be careful as being too early will make it 
 * invisible.
 * @default 90
 * @param DamageMin
 * @desc Minimum damage pop-up frame duration.
 * Initial value is 60. It is recommended to keep this value.
 * @default 60
 * @param LogAnime BaseDelay
 * @desc Battle Log Window display frame.
 * Initial value is 8. BattleSpeed (Default) is not impacted by this.
 * @default 8
 * @param LogAnime NextDelay
 * @desc Battle Log Window display duration.
 * Initial value is 12. BattleSpeed (Default) is not impacted by this.
 * @default 12
 * @param ---YEP BattleCore---
 * @default
 * @param YEP Battle Default
 * @desc This value can only be set if you have YEP – Battle Core.
 * Initial value is 1. The higher the value, the faster the attack 
 * animation appears.
 * @default 1
 * @param YEP Battle Boost
 * @desc This value can only be set if you have YEP – Battle Core.
 * Initial value is 20. The higher the value, the faster the attack 
 * animation appears.
 * @default 20
 * @param YEP Battle LogWait
 * @desc This value can only be set if you have YEP – Battle Core.
 * Initial value is 20. Decrease this value to have less wait.
 * @default 20
 *
 */

// Global Variables


Sepher.Parameters = PluginManager.parameters('SSEP_BattleSpeedUp');
Sepher.Param = Sepher.Param || {};

Sepher.Param.BattleSpeedDefault	= String(Sepher.Parameters['BattleSpeed (Default)']);
Sepher.Param.BattleSpeedBoost	= String(Sepher.Parameters['BattleSpeed (Boost)']);
Sepher.Param.StateIcon			= String(Sepher.Parameters['StateIcon']);
Sepher.Param.StateOverlay		= String(Sepher.Parameters['StateOverlay']);
Sepher.Param.Weapon				= String(Sepher.Parameters['Weapon']);
Sepher.Param.Balloon			= String(Sepher.Parameters['Balloon']);
Sepher.Param.Motion				= String(Sepher.Parameters['Motion']);
Sepher.Param.Damage				= String(Sepher.Parameters['Damage']);
Sepher.Param.DamageMin			= String(Sepher.Parameters['DamageMin']);
Sepher.Param.LogBase			= String(Sepher.Parameters['LogAnime BaseDelay']);
Sepher.Param.LogNext			= String(Sepher.Parameters['LogAnime NextDelay']);
Sepher.Param.YEPLogWait			= String(Sepher.Parameters['YEP Battle LogWait']);
Sepher.Param.YEPMotionDefault	= String(Sepher.Parameters['YEP Battle Default']);
Sepher.Param.YEPMotionBoost		= String(Sepher.Parameters['YEP Battle Boost']);

Sprite_StateIcon.prototype.animationWait = function() {
	var speed = Sepher.Param.StateIcon / Sepher.Param.BattleSpeedDefault;
    return speed;
};

Sprite_StateOverlay.prototype.animationWait = function() {
	var speed = Sepher.Param.StateOverlay / Sepher.Param.BattleSpeedDefault;
    return speed;
};

Sprite_Weapon.prototype.animationWait = function() {
	var speed = Sepher.Param.Weapon / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok')){
		speed = speed / Sepher.Param.BattleSpeedBoost;
	}
    return speed;
};

Sprite_Balloon.prototype.waitTime = function() {
	var speed = Sepher.Param.Balloon / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok')){
		speed = speed / Sepher.Param.BattleSpeedBoost;
	}
    return speed;
};

// Alias - startMove

var _SSEP_Battler_startMove = Sprite_Battler.prototype.startMove;
Sprite_Battler.prototype.startMove = function(x, y, duration) {
	duration = duration / Sepher.Param.BattleSpeedDefault
	if (Input.isPressed('ok')){
		duration = duration / Sepher.Param.BattleSpeedBoost;
	}
	_SSEP_Battler_startMove.call(this, x, y, duration);
};


Sprite_Actor.prototype.motionSpeed = function() {
	var speed = Sepher.Param.Motion	 / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok')){
		speed = speed / Sepher.Param.BattleSpeedBoost;
	}
    return speed;
};

// Alias - Animation setup

var _SSEP_Animation_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	delay = delay / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok')){
		delay = delay / Sepher.Param.BattleSpeedBoost;
	}
	_SSEP_Animation_setup.call(this, target, animation, mirror, delay)
};


// Alias - Animation_setupRate

var _SSEP_Animation_setupRate = Sprite_Animation.prototype.setupRate;
Sprite_Animation.prototype.setupRate = function() {
    _SSEP_Animation_setupRate;
	if (Input.isPressed('ok')){
		this._rate = this._rate / Sepher.Param.BattleSpeedBoost;
	}
};


var _SSEP_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
	_SSEP_Damage_initialize.call(this);
    this._duration = Sepher.Param.Damage / Sepher.Param.BattleSpeedDefault;
	if (Input.isPressed('ok')){
		this._duration = this._duration / Sepher.Param.BattleSpeedBoost;
	}
    if (this._duration <= Sepher.Param.DamageMin){
    	this._duration = Sepher.Param.DamageMin;
    }
};

// BattleLog Window

Window_BattleLog.prototype.animationBaseDelay = function() {
	var speed = Sepher.Param.LogBase;
    return speed;
};

Window_BattleLog.prototype.animationNextDelay = function() {
	var speed = Sepher.Param.LogNext;
    return speed;
};

//------------------------------------------------------------------------------
//To Prevent Conflict Yanfly Engine BattleCore
//------------------------------------------------------------------------------

if (Imported.YEP_BattleEngineCore){

//Overwrite updateWaitCount
Window_BattleLog.prototype.updateWaitCount = function() {
    if (this._waitCount > 0) {
		if (true == Input.isPressed('ok')){
			console.log("true");
    	    this._waitCount -= Sepher.Param.YEPMotionBoost;
     	}else{
			console.log("false");
     		this._waitCount -= Sepher.Param.YEPMotionDefault;
    	}
    	
    	if (this._waitCount < 0) {
     	this._waitCount = 0;
    	}
    	return true;
    }
    return false;
};

//Overwrite actionPerformAction
BattleManager.actionPerformAction = function() {
	wait = Sepher.Param.YEPLogWait;
	if (Input.isPressed('ok')){
		wait = wait / Sepher.Param.BattleSpeedBoost;
	}
	
    this._logWindow.performAction(this._subject, this._action);
		if (this._subject.isActor() && this._subject.isSpriteVisible) {
			this._logWindow._waitCount += wait;
			return false;
		}
    return true;
};

//Overwrite actionFloat
BattleManager.actionFloat = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    if (Input.isPressed('ok')){
		frames = frames / Sepher.Param.BattleSpeedBoost;
	}
    var pixels = 0;
    if (cmd.match(/(\d+)([%％])/i)) {
      var floatPeak = parseFloat(RegExp.$1 * 0.01);
    } else if (cmd.match(/(\d+)/i)) {
      pixels = parseInt(RegExp.$1);
      var floatPeak = 0.0;
    } else {
      var floatPeak = 1.0;
    }
    movers.forEach(function(mover) {
      var floatRate = floatPeak + (pixels / mover.spriteHeight());
      mover.spriteFloat(floatRate, frames);
    });
    return false;
};

//Overwrite actionJump
BattleManager.actionJump = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    if (Input.isPressed('ok')){
		frames = frames / Sepher.Param.BattleSpeedBoost;
	}
    var pixels = 0;
    if (cmd.match(/(\d+)([%％])/i)) {
      var jumpPeak = parseFloat(RegExp.$1 * 0.01);
    } else if (cmd.match(/(\d+)/i)) {
      pixels = parseInt(RegExp.$1);
      var jumpPeak = 0.0;
    } else {
      var jumpPeak = 1.0;
    }
    movers.forEach(function(mover) {
      var jumpRate = jumpPeak + (pixels / mover.spriteHeight());
      mover.spriteJump(jumpRate, frames);
    });
    return true;
};

}
