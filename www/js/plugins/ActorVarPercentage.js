/*:
*
*@param Text Offset
*@plugindesc The x offset of the value of the variable
* when percentage is used.
*@default -20
*
*@help
* Add a {%} anywhere in the variable name if you wish to show
* it as a percentage.
*
*/

Window_StatusInfo.prototype.drawActorVarData = function(varId, dx, dy, dw) {
    varId = parseInt(varId);
    var name = $dataSystem.variables[varId];
    var value = $gameVariables.value(varId);
    dx += this.textPadding();
    dw -= this.textPadding() * 2;
    this._bypassResetTextColor = true;
    this.changeTextColor(this.systemColor());
    name = name.replace(/<<(.*?)>>/i, '');
    var percentage = false;
    if (name.indexOf('{%}') > -1) {
    name = name.replace(/{%}/i, '');
    percentage = true;
    }
    this.drawTextEx(name, dx, dy);
    this._bypassResetTextColor = false;
    this.resetTextColor();
    if (typeof value === 'number') value = Yanfly.Util.toGroup(value);
    if (percentage) {
        this.drawText('%', dx, dy, dw, 'right');
        dx += Number(PluginManager.parameters('ActorVarPercentage')['Text Offset']);
    }
    this.drawText(value, dx, dy, dw, 'right');
};