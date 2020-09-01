/*var Navash = Navash || {};
Navash.ObjR = Navash.ObjR || {};
Navash.ObjR.version = 1.00;
*/

Game_Action.prototype.executeHpDamage = function(target, value) {
    if (this.isDrain()) {
        value = Math.min(target.hp, value);
    }
    this.makeSuccess(target);
    if ($gameSwitches.value(5) && value > 0 && target.isActor() && target.hpRate() > 0.5 && value >= target.hp) {
        value = target.hp - 1;
    }
    target.gainHp(-value);
    if (value > 0) {
        target.onDamage(value);
    }
    this.gainDrainedHp(value);
};