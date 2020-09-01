Game_Enemy.prototype.isFloating = function() {
    if (this.isDead() && !this.enemy().sideviewFloatDeath) return false;
    return this.checkFloating();
};

Game_Enemy.prototype.checkFloating = function() {
    if (this.isStateAffected(107)) return false;
    return this.enemy().sideviewFloating;
};