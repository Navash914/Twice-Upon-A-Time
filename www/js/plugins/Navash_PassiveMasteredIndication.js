var Imported = Imported || {};
Imported.Navash_PassiveMasteredIndication = true;

var Navash = Navash || {};
Navash.PMI = Navash.PMI || {};
Navash.PMI.version = 1.00;

/*:
 *
 * @param Mastery Icon
 * @desc Move the 'new' icon horizonatally this number of pixels.
 * @default 16
 *
 */

Navash.Parameters = PluginManager.parameters('Navash_PassiveMasteredIndication');
Navash.Param = Navash.Param || {};

Navash.Param.MasteryIcon = Number(Navash.Parameters['Mastery Icon']);

Navash.PMI._drawItem = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, x, y, width) {
    Navash.PMI._drawItem.call(this, item, x, y, width);
    if (SceneManager._scene instanceof Scene_Equip) this.drawMasteryIcon(item, x, y, width);
};

Window_Base.prototype.drawMasteryIcon = function(item, wx, wy, ww) {
    var icon = Navash.Param.MasteryIcon;
    if (icon <= 0) return;
    if (!item) return;
    if (!DataManager.isWeapon(item) && !DataManager.isArmor(item)) return;
    var actor = this._actor;
    if (!actor) return;
    var skillLearned = this.isPassiveMastered(actor, item);
    if (!skillLearned) return;
    this.drawIcon(icon, wx + 2, wy + 2);
};

Window_Base.prototype.isPassiveMastered = function(actor, item) {
    if (item.eqlSkill.length <= 0) return false;
    var condition = false;
    for (var i = 0; i < item.eqlSkill.length; i++) {
        if (actor.skills().contains($dataSkills[item.eqlSkill[i]])) condition = true;
    }
    console.log(condition);
    return condition;
};