//=============================================================================
// MalElementEX
// MalElementsEX.js
// version 1.1
//=============================================================================
/*:
 * @plugindesc Allows Actors, enemies, weapons, classes, armors and states to affect elements boosting skill effects by a set amount.
 * Also allows elements to be lessened and further to allow element absorbtion.
 *
 * @author Maliki79
 *
 * @help
 * Actor, Enemy, Class, Weapon, Armor and State Notetags :
 * <element_boost: elementID boost>
 * <element_Dboost: elementID boost>
 *   -
 *  When battler uses a skill with iD equal to elementId (you can find 
 *  element iDs in Types section in Database) the value of the attack will
 *  be multiplied by the boost amount.
 * 
 *     Repeats of the tags on weapons, armors, states, classes will have a cumulative effect.
 *     Examples:
 *     Notetag: <element_boost: 1 2>
 *     Result: If the attack normally does 100 damage, this tag will raise the damage to 300.  (100 + 200 bonus)
 *             If this tag were used on a state applied first, the damae would become 500.
 *
 *     Notetag: <element_Dboost: 1 0.25> 
 *     Result: If the attack normally does 100 damage, this tag would lower the damage to 75. (100 - 25)
 *
 *     Notetag: <element_Dboost: 1 1>  
 *     Result: If the attack normally does 100 damage, this tag would lower the damage to 0. (100 - 100) 
 *             If this tag were used on a state applied first, the damae would become -100. (100 - 200) 
 *             This damage would be converted to healing and absorbed.
 *
 *   Note that while only one of each of these notetags can be applied to a single object, you can have many apply via states or equips
 *   
 */


//-----------------------------------------------------------------------------
// Game_Action
//
// The game object class for a battle action.


var MalElements = Game_Action.prototype.makeDamageValue
Game_Action.prototype.makeDamageValue = function(target, critical)
{
    var EleA = 1;
	var EleD = 1;
	var item = this.item();
    var baseValue = this.evalDamageFormula(target);
	value = Math.round(value);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) value *= target.pdr;
    if (this.isMagical()) value *= target.mdr;
    if (baseValue < 0) value *= target.rec;
    if (critical) value = this.applyCritical(value);
    //Element attack bonus
	EleA += this.ElementAttackBoost((this.subject().isActor() ? ($dataActors[this.subject().actorId()]) : ($dataEnemies[this.subject().enemyId()])).meta.element_boost);
     if(this.subject().isActor())
    {
    	EleA += this.ElementAttackBoost(this.subject().currentClass().meta.element_boost);
    	for(var i = 0; i < this.subject().equips().length; ++i)if(this.subject().equips()[i])EleA += this.ElementAttackBoost(this.subject().equips()[i].meta.element_boost);
    }
    for(var i = 0; i < this.subject().states().length; ++i) value *= this.ElementAttackBoost(this.subject().states()[i].meta.element_boost);
	//Element Defence bonus
	EleD -= this.ElementDBoost((target.isActor() ? ($dataActors[target.actorId()]) : ($dataEnemies[target.enemyId()])).meta.element_Dboost);
    if(target.isActor())
    {
    	EleD -= this.ElementDBoost(target.currentClass().meta.element_Dboost);
    	for(var i = 0; i < target.equips().length; ++i)if(target.equips()[i])EleD -= this.ElementDBoost(target.equips()[i].meta.element_Dboost);
    }
    for(var i = 0; i < target.states().length; ++i) EleD -= this.ElementDBoost(target.states()[i].meta.element_Dboost);
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value *= EleA;
	value *= EleD;
	console.log("EleA is: " + EleA);
	console.log("EleD is: " + EleD);
	value = Math.round(value);
    return value;
};

Game_Action.prototype.ElementAttackBoost = function(meta)
{
	if(meta)
	{
		var metaSplit = meta.split(" ");
		console.log(Number(metaSplit[2]));
		return (this.item().damage.elementId === Number(metaSplit[1])) ? 0 : Number(metaSplit[2]);
	}
	else return 0;
}

Game_Action.prototype.ElementDBoost = function(meta)
{
	if(meta)
	{
		var metaSplit = meta.split(" ");
		console.log("Meta test");
		console.log(Number(metaSplit[2]));
		return (this.item().damage.elementId === Number(metaSplit[1])) ? 0 : Number(metaSplit[2]);
	}
	else return 0;
}