//=============================================================================
// ShadowedCharacters.js
//=============================================================================

/*:
 * @plugindesc Shadows characters depending on shadow brush
 * @author EvilCat
 * @email soevilcat@mail.ru
 * @version 1.1
 
 * @param Shadow Color
 * @desc Hex RGB value of default shadow color.
 * @default #646464
 * @help
 * Characters walking through shadows are shadowed.
 * Shadow color can be tweaked with <Shadow Color:0xFFAA00> tags in notes of
 * maps, events, and actors. By default, tiles and objects are not affected
 * by shadows. Shadows can be explicitly turned off and on by placing
 * <Is Shadowed:on> or <Is Shadowed:off> tag in event's or actor's notes.
 * Creative Commons 3.0 Attribution license
 * See http://www.w3schools.com/tags/ref_colorpicker.asp for hex color picker.
 */

"use strict";
 
 if (!EvilCat) throw new Error('ShadowedCharacters plugin requires EvilCatUtils');
 if (!EvilCat.Color) throw new Error('Requires EvilCat Utils Colors plugin!');
 
 {
	let ShadowedCharacters=class ShadowedCharacters extends EvilCat.Plugin { }
	ShadowedCharacters.extendType('Color');
	EvilCat.ShadowedCharacters=ShadowedCharacters=new ShadowedCharacters();
	
	ShadowedCharacters.DEFAULT_SHADOW_COLOR=EvilCat.Color.createFromHex(0x646464);
	
	// a character now also stores shadow value, depending on how surrounded by shadows the character is.
	let oldInit=Game_Character.prototype.initMembers;
	Game_Character.prototype.initMembers=function()
	{
		oldInit.apply(this, arguments);
		this.shadowValue=null;
	}
	
	// determines whether the character is affected by shadows
	Game_Character.prototype.shadowedOn=function()
	{
		if (this.getMeta)
		{
			var param=this.getMeta('Is Shadowed', 'Bool', undefined);
			if (param!==undefined) return param;
		}
		return !this.isTile() && !this.isObjectCharacter();
	}
	
	// determines shadow color; probably expensive.
	Game_Character.prototype.shadowColor=function()
	{
		var param
		if (this.getMeta)
		{
			param=this.getMeta('Shadow Color', EvilCat.parsers.Color, undefined);
			if (param!==undefined) return param;
		}
		
		param=$gameMap.getMeta('Shadow Color', EvilCat.parsers.Color, undefined);
		if (param!==undefined) return param;
		
		return ShadowedCharacters.paramColor('Shadow Color', ShadowedCharacters.DEFAULT_SHADOW_COLOR);
	}
	
	// determines character's "center" coordinates inside the grid square.
	Game_Character.prototype.realCenterX=function() { return this._realX+0.5; }
	Game_Character.prototype.realCenterY=function() { return this._realY+0.5; }
	
	// determines shadow value; probably expensive;
	Game_Character.prototype.updateShadowing=function()
	{
		var shadow_points=[], shadow_x, shadow_y;
		var center_x=this.realCenterX(), center_y=this.realCenterY();
		
		if (center_x % 1 <0.25) shadow_x=Math.floor(center_x)-0.25;
		else shadow_x=Math.floor(center_x)+0.25;
		if (center_y % 1 <0.25) shadow_y=Math.floor(center_y)-0.25;
		else shadow_y=Math.floor(center_y)+0.25;
		
		this.appendShadowPoint(shadow_points, shadow_x, shadow_y);
		this.appendShadowPoint(shadow_points, shadow_x+0.5, shadow_y);
		this.appendShadowPoint(shadow_points, shadow_x, shadow_y+0.5);
		this.appendShadowPoint(shadow_points, shadow_x+0.5, shadow_y+0.5);
		
		if (shadow_points.length==0) this.shadowValue=0;
		else
		{
			var sum=shadow_points.reduce(function(s, data) { return s+data.weight; }, 0);
			this.shadowValue=shadow_points.reduce(function(s, data) { return s+data.value*(data.weight/sum); }, 0);
		}
	}
	
	// adds a point data to the array of shadow points, if the point is valid.
	Game_Character.prototype.appendShadowPoint=function(target, shadow_x, shadow_y)
	{
		if (shadow_x<0 || shadow_y<0 || shadow_x>$gameMap.width()+1 || shadow_y>$gameMap.height()+1) return;
		if (Math.abs(shadow_x-this.realCenterX())>1 || Math.abs(shadow_y-this.realCenterY())>1) return;
		target.push({
			x:		shadow_x,
			y:		shadow_y,
			weight:	1-pointDistance(shadow_x, shadow_y, this.realCenterX(), this.realCenterY()),
			value:	Number($gameMap.hasShadow(shadow_x, shadow_y))
		});
	}
	 
	 // update() now also updates shadow value.
	let oldCharUpdate=Game_Character.prototype.update; 
	Game_Character.prototype.update=function()
	{
		var prevX=this._realX, prevY=this._realY;
		oldCharUpdate.apply(this, arguments);
		if (this._needsShadowRefresh) this._needsShadowRefresh = this._needsShadowRefresh==1 ? 2 : false;
		// since this param is set to "true" for at least one full update, all sprites should handle their refreshes no matter at which point the request was made. sometimes they will do this twice, but the refreshing doesn't happen often.
		if (this.shadowedOn() && (this.shadowValue===null || prevX!=this._realX || prevY!=this._realY) ) this.updateShadowing();
		// shadows are only updated if the character has moved.
	}
	
	
	// some Game_Character subclasses call refresh() on major changes (such as page flip of an Event) which can also affect shadows.
	
	Game_Character.prototype.requestShadowRefresh=function()
	{
		this._needsShadowRefresh=1;
		// when this param is set, Sprites are informed that they need to update their shadow data.
	}
	
	let oldFollowerRefresh=Game_Follower.prototype.refresh;
	Game_Follower.prototype.refresh=function()
	{
		oldFollowerRefresh.apply(this, arguments);
		this.requestShadowRefresh();
	}
	
	let oldPlayerRefresh=Game_Player.prototype.refresh;
	Game_Player.prototype.refresh=function()
	{
		oldPlayerRefresh.apply(this, arguments);
		this.requestShadowRefresh();
	}
	
	// it seems that presently Vehicle can't change image or meta during the game, but if some plugin does that, it should also be compatible.
	let oldVehicleRefresh=Game_Vehicle.prototype.refresh;
	Game_Vehicle.prototype.refresh=function()
	{
		oldVehicleRefresh.apply(this, arguments);
		this.requestShadowRefresh();
	}
	
	let oldEventRefresh=Game_Event.prototype.refresh;
	Game_Event.prototype.refresh=function()
	{
		oldEventRefresh.apply(this, arguments);
		this.requestShadowRefresh();
	}
	
	
	// sprite now stores shadow data.
	let oldSpriteInitMembers=Sprite_Character.prototype.initMembers;
	Sprite_Character.prototype.initMembers=function()
	{
		oldSpriteInitMembers.apply(this, arguments);
		this.shadowValue=null;
		this.shadowColor=null;
		this.shadowedOn=null;
	}
	
	// shadow data is refreshed on character's init or change.
	let oldSpriteSetCharacter=Sprite_Character.prototype.setCharacter;
	Sprite_Character.prototype.setCharacter=function()
	{
		oldSpriteSetCharacter.apply(this, arguments);
		this.refreshShadowing();
	}
	
	Sprite_Character.prototype.refreshShadowing=function()
	{
		if (!this._character) return;
		this.shadowedOn=this._character.shadowedOn();
		this.shadowColor=this._character.shadowColor();
		this.shadowValue=null; // forgets previous shadow value (if any) and forces to update.
		if (!this.shadowedOn) this.tint=0xFFFFFF;
	}
	
	// updates tint only if something has changed.
	// tint doesn't seem to be in use by any RPG Maker components, so this plugin can safely usurp it... however, if another plugin or effect will require tint manipulation, they will cancel each other. there's no interface or convention about it, so I have no solution yet.
	let oldSpriteUpdate=Sprite_Character.prototype.update;
	Sprite_Character.prototype.update=function()
	{
		oldSpriteUpdate.apply(this, arguments);
		if (this._character._needsShadowRefresh || !this.shadowColor) this.refreshShadowing();
		if (this.shadowedOn && this.shadowValue!==this._character.shadowValue)
		{
			this.shadowValue=this._character.shadowValue;
			this.tint=this.shadowColor.mergeWithWhite(1-this.shadowValue).toHex();
		}
	}
	
	// an utility function (no such function seems to exist by default).
	let pointDistance=function(x1, y1, x2, y2)
	{
		return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2));
	}
	
	// determines whether a point on the map has shadow. the coords should end in .25 or .75.
	Game_Map.prototype.hasShadow=function(x, y)
	{
		if (x<0 || y<0 || x>$dataMap.width+1 || y>$dataMap.height+1) return false;
		var bytemask;
		     if (x % 1 == 0.25 && y % 1 == 0.25) bytemask=0b00000001;
		else if (x % 1 == 0.75 && y % 1 == 0.25) bytemask=0b00000010;
		else if (x % 1 == 0.25 && y % 1 == 0.75) bytemask=0b00000100;
		else if (x % 1 == 0.75 && y % 1 == 0.75) bytemask=0b00001000;
		else throw new Error('bad shadow coordinates');
		
		var offset=$dataMap.width*$dataMap.height*4;
		return Boolean($dataMap.data[offset+Math.floor(x)+Math.floor(y)*$dataMap.width] & bytemask);
	}
	
 }