if (Imported.YEP_BuffsStatesCore) {
var buffAlias = Game_BattlerBase.prototype.paramBuffRate;
Game_BattlerBase.prototype.paramBuffRate = function(paramId) {
    if (this.isStateAffected(150)) {
    Yanfly.Param.BSCBuffFormula = eval(Yanfly.Param.BSCBuffFormula);
    Yanfly.Param.BSCBuffFormula /= 2;
    console.log(Yanfly.Param.BSCBuffFormula);
    var text = eval(Yanfly.Param.BSCBuffFormula);
    console.log(text);
    }
    buffAlias.call(this, paramId);
};
}