
var initMembersAlias = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    initMembersAlias.call(this);
    this.clearXBuffs();
};

Game_BattlerBase.prototype.clearXBuffs = function() {
    this._xBuffs = [0,0,0,0,0,0,0,0,0,0];
};

var battlerDieAlias = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    battlerDieAlias.call(this);
    this.clearXBuffs();
};

Game_BattlerBase.prototype.xparam = function(xparamId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId) + this.xBuff(xparamId);
};

Game_BattlerBase.prototype.xBuff = function(xparamId) {
    return this._xBuffs[xparamId];
};

Game_BattlerBase.prototype.addXBuff = function(xparamId, value) {
    this._xBuffs[xparamId] += value;
    this.refresh();
};

Game_BattlerBase.prototype.setXBuff = function(xparamId, value) {
    this._xBuffs[xparamId] = value;
    this.refresh();
};