/*:
* @param Minimum Element Rate
* @desc The lowest that an element rate can go.
* (Lower element rates mean greater resistance)
* @default 0.75
*/

var parameters = PluginManager.parameters('Element_Rate_Calc');

var minimumEleRate = Number(parameters['Minimum Element Rate']);

Game_BattlerBase.prototype.traitsDif = function(code, id) {
    return this.traitsWithId(code, id).reduce(function(r, trait) {
        return r + (trait.value - 1);
    }, 0);
};

Game_BattlerBase.prototype.elementRate = function(elementId) {
    var rate = 1 + this.traitsDif(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId);
    rate = Math.max(minimumEleRate, rate);
    return rate;
};