//=============================================================================
// BareHanded.js
//=============================================================================

/*:
 * @plugindesc Allows unarmed characters to deal extra damage.
 * @author whitesphere
 *
 * @param Max HP
 * @desc If set, changes the maximum HP of an Actor if s/he is not using any normal weapons
 * @default 
 *
 * @param Max MP
 * @desc If set, changes the maximum MP of an Actor if s/he is not using any normal weapons
 * @default
 *
 * @param Attack
 * @desc If set, modifies the ATK skill of an Actor if s/he is not using any normal weapons
 * @default 10 + a.level * 1.5
 *
 * @param Defense
 * @desc If set, modifies the (Physical) Defensive skill of an Actor if s/he is not using any normal weapons
 * @default
 *
 * @param Magical Attack
 * @desc If set, modifies the Magical Attack skill of an Actor if s/he is not using any normal weapons
 * @default
 *
 * @param Magical Defense
 * @desc If set, modifies the Magical Defense skill of an Actor if s/he is not using any normal weapons
 * @default
 *
 * @param Agility
 * @desc If set, modifies the Agility skill of an Actor if s/he is not using any normal weapons
 * @default 6 + a.level * 1.1
 *
 * @param Luck
 * @desc If set, modifies the Luck skill of an Actor if s/he is not using any normal weapons
 * @default
 *
 * @help The formula is evaluated the same way the Damage formula is. The parameter "a"
 * represents the Actor.  Whatever the formula evaluates to is added to the Actor's
 * appropriate skill.  For example, using "2 + a.level * 4" adds 2 plus 4 times the Actor's
 * level.
 *
 * So, if the above formula were applied to Attack, the character was Level 10, and the
 * normal Attack value was 100, the unarmed attack value would be 100 + 2 + 10*4=
 * 142.
 *
 * If an Actor has a weapon equipped, the game uses the normal values for each Skill,
 * unless that weapon itself has the <barehand> modifier, which tells this plug-in
 * that the weapon is a bare-handed weapon.  For example, in Final Fantasy IV, Yang's
 * Claws would be marked as bare-handed weapons.
 *
 * This plug-in's behavior is based on Yanfly's bare-handed script for VX Ace.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 *
 * Actor specific Notetag:
 *  <barehand>
 *	If set, the Actor will use bare-handed modifiers as long as no normal weapons are equipped.
 *
 * Class specific Notetag:
 *  <barehand>
 *	If set, any Actors who are currently this Class will use bare-handed modifiers as long as no normal weapons are equipped.
 *
 * Weapon specific Notetag:
 *  <barehand>
 *	If set, the Actor may gain the bare-handed bonuses even when equipping this weapon.
 *
 * Armor specific Notetag:
 *  <barehand>
 *	If set, any Actors wearing this armor may benefit from bare-handed modifiers.
 *
 * State specific Notetag:
 *  <barehand>
 *	If set, any Actors currently in this state may benefit from bare-handed modifiers.
 */
(function() {
 
WS_BareHanded = {};

WS_BareHanded.Parameters = PluginManager.parameters('BareHanded');
WS_BareHanded.Param = {};

//=============================================================================
// The plug-in parameters 
//=============================================================================
WS_BareHanded.Param.MHP = WS_BareHanded.Parameters['Max HP'];
WS_BareHanded.Param.MMP = WS_BareHanded.Parameters['Max MP'];
WS_BareHanded.Param.ATK = WS_BareHanded.Parameters['Attack'];
WS_BareHanded.Param.DEF = WS_BareHanded.Parameters['Defense'];
WS_BareHanded.Param.MAT = WS_BareHanded.Parameters['Magical Attack'];
WS_BareHanded.Param.MDF = WS_BareHanded.Parameters['Magical Defense'];
WS_BareHanded.Param.AGI = WS_BareHanded.Parameters['Agility'];
WS_BareHanded.Param.LUK = WS_BareHanded.Parameters['Luck'];


//=============================================================================
// Game_Actor
//=============================================================================

//=============================================================================
// Returns true if the Actor is barehanded right now
//=============================================================================
Game_Actor.prototype.barehanded =function() {
	weapons=this.weapons();
	
	/* Weapons MUST be bare-handed */
	for (index=0; index<weapons.length; index++) {
		current=weapons[index];
		meta=$dataWeapons[current.id].meta;
		if (!meta || !meta.barehanded)
		{
			return false;
		}
	}
	
	// If the Actor is bare-handed, we're good
	meta=$dataActors[this.actorId()].meta;
	if (meta.barehanded)
	{
		return true;
	}
	
	// The current class
	if (this._classId)
	{
		meta=$dataClasses[this._classId].meta;
		if (meta.barehanded)
		{
			return true;
		}
	}
	
	// List of currently equipped non-weapon items
	items=this.equips();
	for (mod=0; mod<items.length; mod++)
	{
		current=items[mod];
		if (current === null || DataManager.isWeapon(current))
			continue;
		meta={};
		if (DataManager.isArmor(current))
				meta=$dataArmors[current.id].meta;
			else
				meta=$dataItems[current.id].meta;
			
		if (meta.barehanded)
		{
			return true;
		}
	}
	
	// List of the current states
	states=this.states();
	for (mod=0; mod<states.length; mod++)
	{
		current=states[mod];
		if (current === null)
			continue;
		if ($dataStates[current.id].meta.barehanded)
			return true;
	}
	return false;
}

var WS_Game_Actor_paramPlus=Game_Actor.prototype.paramPlus;

//=============================================================================
// Perform any bare-handed mods here
//=============================================================================
Game_Actor.prototype.paramPlus = function(paramId)  {
	param_result=WS_Game_Actor_paramPlus.call(this,paramId);
	if (!this.barehanded())
		return param_result;
	
	a=this;
	evalFunc=null;
	/* Perform the appropriate evaluation if necessary */
	switch (paramId) {
		case 0: // MHP
			evalFunc=WS_BareHanded.Param.MHP;
			break;
		case 1: // MMP
			evalFunc=WS_BareHanded.Param.MMP;
			break;
		case 2: // ATK
			evalFunc=WS_BareHanded.Param.ATK;
			break;
		case 3: // DEF
			evalFunc=WS_BareHanded.Param.DEF;
			break;
		case 4: // MAT
			evalFunc=WS_BareHanded.Param.MAT;
			break;
		case 5: // MDF
			evalFunc=WS_BareHanded.Param.MDF;
			break;
		case 6: // AGI
			evalFunc=WS_BareHanded.Param.AGI;
			break;
		case 7: // LUK
			evalFunc=WS_BareHanded.Param.LUK;
			break;
	}
	if (!evalFunc)
		return param_result;
	try
	{
		var result=eval(evalFunc);
		param_result += parseInt(result);
	}
	catch (err) {
		console.log("Unable to evaluate param "+paramId+": "+err);
	}
	return param_result;
}


})();
//=============================================================================
// End of File
//=============================================================================
