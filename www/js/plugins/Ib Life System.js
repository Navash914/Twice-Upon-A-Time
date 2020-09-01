// -----------------------------------------------------------------
// Ib Life System.js
// -----------------------------------------------------------------
/*:
* @plugindesc Creates a hud like the RM game Ib.
* @author Soulpour777
* 
* @param HudSwitch
* @desc Switch ID to activate the Ib Life System.
* @default 4
* 
* @param MaxLifePower
* @desc What is your max life? Number of times to be hit before you die.
* @default 3
* 
* @param HudBaseBack
* @desc The back image name of the hud you use.
* @default ib_flower
* 
* @param HudNumberImages
* @desc The image list of numbers you use. Without "" marks.
* @default zero, one, two, three
* 
* @param HudBackX
* @desc The x dimension of your hud base.
* @default 0
* 
* @param HudBackY
* @desc The y dimension of your hud base.
* @default 0
* 
* @param LifeMeterNumberX
* @desc The x dimension of your life meter number indicator.
* @default 60
* 
* @param LifeMeterNumberY
* @desc The y dimension of your life meter number indicator.
* @default 100
* 
* @param UseFadeInAnimation
* @desc Do you want to use the Fade In Animation for the hud? (true or false)
* @default true
* @help
// -----------------------------------------------------------------
// Ib Life System Documentation

Remember to put your images on the img / huds folder.

Q: Wait, why does the hud not showing? The plugin is
turned on!
A: To turn on the hud, you need to turn the switch you indicated
for the hud to appear. For example, if your HudSwitch is 4,
you need to make an event that turns Switch #004 ON.

Q: I hate that fade In animation! I want it off!
A: To turn it off, change the value from the plugin manager
from true to false, without "" marks.

Q: Can you tell me more about the Max Life Power?
A: The Max Life Power is your entire life. This means that when it
hits 0, you'll die. There is one thing you need to know though,
if you are going to make the max life power to 10, you must provide
more images for the numbers. You have to provide them in order
via HudNumberImages.

Q: About the HudNumberImages, does that mean that each number for
the life meter should be represented by the hud numbers?
A: That is correct. But I suppose you won't make your character's
life 1000, don't you? The plugin likens the life meter system to
the game Ib, after all.

Q: How can I decrease my life meter? When I damage myself via the
default life bar, it doesn't change.
A: To decrease your life meter, you need to do this on a script
call:
this.decreaseLife(x);
where x is the value you desire. For example:
this.decreaseLife(3);

Q: When I want to increase it?
A: To increase your life meter, you need to do this on a script
call:
this.increaseLife(x);
where x is the value you desire.

Q: I added a value more than my max life, does it matter?
A: Yes. When you increase your life more than your max life,
you will just be added the same value of your max life. The
same goes when you decrease your life more than the max life
you have.

Q: Is this free for commercial use?
A: But of course. Just credit me, Soulpour777.

Q: How about for IGMC?
A: Contact me from my website for me to know in which
game would it be used.

// -----------------------------------------------------------------
*/
(function(){
	var Imported = Imported || {};
	Imported.IbHud = true;
	var Soulpour777 = Soulpour777 || {};
	Soulpour777.IbHud = {};
	Soulpour777.IbHud.params = PluginManager.parameters('Ib Life System'); 
	Soulpour777.IbHud.maxLifeMeter = Soulpour777.IbHud.params['MaxLifePower'];
	Soulpour777.IbHud.hudBaseImage = Soulpour777.IbHud.params['HudBaseBack'];
	var maxLife = Number(Soulpour777.IbHud.maxLifeMeter || 3);
	var hudNumbers = Soulpour777.IbHud.params['HudNumberImages'].split(/\s*,\s*/).filter(function(value) { return !!value; });
	var hudBase = String(Soulpour777.IbHud.hudBaseImage || "ib_flower");
	var hudBaseX = Number(Soulpour777.IbHud.params['HudBackX'] || 0);
	var hudBaseY = Number(Soulpour777.IbHud.params['HudBackY'] || 0);
	var meterX = Number(Soulpour777.IbHud.params['LifeMeterNumberX'] || 60);
	var meterY = Number(Soulpour777.IbHud.params['LifeMeterNumberY'] || 100);
	var useFadeInAnimation = String(Soulpour777.IbHud.params['UseFadeInAnimation'] || "true");
	var hudUpdateSwitch = Number(Soulpour777.IbHud.params['HudSwitch'] || 4);
	ImageManager.loadHud = function(filename, hue) {
	    return this.loadBitmap('img/huds/', filename, hue, true);
	};	
	var soul_alias_game_system_iblikehud_initialize = Game_System.prototype.initialize
	Game_System.prototype.initialize = function() {
		soul_alias_game_system_iblikehud_initialize.call(this);
		this._hudX = hudBaseX;
		this._hudY = hudBaseY;
		this._hudVariableValue = maxLife;
		this._variableNumberX = meterX;
		this._variableNumberY = meterY;
		this._hudImageName = hudBase;
		this._hudVariableImageRepresentation = hudNumbers;
	}

	Game_System.prototype.decreaseLife = function(lifeValue) {
		if (lifeValue >= maxLife) {
			this._hudVariableValue -= maxLife;
		} else {
			this._hudVariableValue -= lifeValue;
		}
	}

	Game_System.prototype.increaseLife = function(lifeValue) {
		if (lifeValue >= maxLife) {
			this._hudVariableValue = maxLife;
		} else {
			this._hudVariableValue += lifeValue;
		}
	}

	Game_Interpreter.prototype.increaseLife = function(lifeValue) {
		$gameSystem.increaseLife(lifeValue);
	}

	Game_Interpreter.prototype.decreaseLife = function(lifeValue) {
		$gameSystem.decreaseLife(lifeValue);
	}



	var soul_alias_spriteset_map_iblikehud_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
	Spriteset_Map.prototype.createLowerLayer = function() {
	    soul_alias_spriteset_map_iblikehud_createLowerLayer.call(this);
	    this.createIbHud();
	};
	var soul_alias_spriteset_map_iblikehud_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function() {
	    soul_alias_spriteset_map_iblikehud_update.call(this);
	    if($gameSwitches.value(hudUpdateSwitch) === true) {
	    	this.updateIbHud();
	    } else {
	    	this.removeIbHud();
	    }

	};

	Spriteset_Map.prototype.createIbHud = function() {
		this._ibhudimage = new Sprite();
		this._ibhudimage.opacity = 0;
		this._ibhudvariableNumber = new Sprite();
		this._ibhudvariableNumber.opacity = 0;
		this.addChild(this._ibhudimage);
		this.addChild(this._ibhudvariableNumber);
	}

	Spriteset_Map.prototype.removeIbHud = function() {
		this._ibhudimage.bitmap = ImageManager.loadHud(null);
		this._ibhudimage.opacity = 0;
		this._ibhudvariableNumber.bitmap = ImageManager.loadHud(null);
		this._ibhudvariableNumber.opacity = 0;
	}

	Spriteset_Map.prototype.updateIbHud = function() {
		// creates the flower
		this._ibhudimage.bitmap = ImageManager.loadHud($gameSystem._hudImageName);
		// opacity animation
		if (useFadeInAnimation === "true") {
			if (this._ibhudimage.opacity != 255) {
				if (this._ibhudimage.opacity >= 255) {
					this._ibhudimage.opacity = 255;
				} else {
					this._ibhudimage.opacity += 10;
				}
			} 		
			if (this._ibhudvariableNumber.opacity != 255) {
				if (this._ibhudvariableNumber.opacity >= 255) {
					this._ibhudvariableNumber.opacity = 255;
				} else {
					this._ibhudvariableNumber.opacity += 10;
				}
			}
		} else {
			this._ibhudimage.opacity = 255;
			this._ibhudvariableNumber.opacity = 255;
		}

		this._ibhudimage.x = $gameSystem._hudX;
		this._ibhudimage.y = $gameSystem._hudY;
		// creates the number
		this._ibhudvariableNumber.bitmap = ImageManager.loadHud($gameSystem._hudVariableImageRepresentation[$gameSystem._hudVariableValue]);
		this._ibhudvariableNumber.x = $gameSystem._variableNumberX;
		this._ibhudvariableNumber.y = $gameSystem._variableNumberY;

		// set to game over if variable is 0
		var soul_alias_game_party_isAllDead = Game_Party.prototype.isAllDead;
		Game_Party.prototype.isAllDead = function() {
			if ($gameSystem._hudVariableValue === 0) return true;
			return soul_alias_game_party_isAllDead.call(this);
		}
	}


})();

