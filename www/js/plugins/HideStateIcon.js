Game_BattlerBase.prototype.stateIcons = function() {
    return this.states().map(function(state) {
        if (!state.meta.hideIcon) return state.iconIndex;
    }).filter(function(iconIndex) {
        return iconIndex > 0;
    });
};