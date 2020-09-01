//=============================================================================
// Durability.js
//=============================================================================

/*:
 * @plugindesc Adds Minecraft-like durability of weapons/armors.
 * @author KockaAdmiralac
 *
 * @help
 * This plugin allows you to manage durability of your weapons and
 * armors. It's very simple how durability is calculated :
 * 1) When you are attacked, your armor loses durability.
 * 2) When you attack, your weapons lose durability.
 * After your weapon/armor loses all durability it cracks and you don't
 * have it in equips anymore.
 * 
 * There are two notetags :
 * - Weapon and Armor notetag :
 *     <durability:x>
 *   This sets initial weapon/armor durability to a certain value.
 *   Example : <durability:1>
 *   Weapon/Armor in which this is put has durability 1.
 *   If no durability is specified, item is indestructible.
 * 
 * - Item and Skill notetag :
 *     <durability_use:x>
 *   This sets how many durability points are losed when this is used.
 *   Example : <durability_use:10>
 *   If this Item/Skill is used by actor, he loses 10 durability on his
 *   weapons. If this Item/Skill is used by enemy, actors which are attacked
 *   lose 10 durability points on their armor.
 * 
 * This plugin is made self-initiative.
 * 
 * @param Weapons
 * @desc Specify what are your weapon slots here, separated by a space
 * @default 1
 *
 * @param Armors
 * @desc Specify what are your armor slots here, separated by a space
 * @default 2 3 4 5
 * 
 * @param Default durability use
 * @desc How much durability points will item/skill take from weapon/armor
 * when none is specified?
 * @default 1
 *
 * @param Durability message
 * @desc What message will be displayed when weapon/armor cracks?
 * Set to empty to disable.
 * @default %1 cracked!
 */
(function(){

var _kocka_random_alias_apply_M7cAp2B8 = Game_Action.prototype.apply;

var _plugin_params = PluginManager.parameters("Durability");
var temp_weapons = _plugin_params["Weapons"];
var temp_armors = _plugin_params["Armors"];
var default_durability_use = Number(_plugin_params["Default durability use"]);
var durability_message = _plugin_params["Durability message"];

Game_Action.prototype.apply = function(target)
{
	_kocka_random_alias_apply_M7cAp2B8.apply(this, arguments);
	var array = ((this.subject() instanceof Game_Actor) ? temp_weapons : temp_armors).split(" ");
	var actor = (this.subject() instanceof Game_Actor) ? this.subject() : target;
	for(var i = 0; i < array.length; ++i)
	{
		var equip = actor.equips()[array[i] - 1];
		if(equip)
		{
			if(!equip.durability)equip.durability = equip.meta.durability ? equip.meta.durability : -1;
			var hasDurability = equip.durability != -1;
			if(hasDurability)equip.durability -= this.item().meta.durability_use ? this.item().meta.durability_use : default_durability_use;
			if(equip.durability <= 0 && hasDurability)
			{
				if(durability_message != "")$gameMessage.add(durability_message.format(equip.name));
				actor.changeEquipById(array[i], 0);
			}
		}
	}
}

})();