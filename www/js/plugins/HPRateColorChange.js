Window_Base.prototype.hpGaugeColor1 = function(rate) {
    var colorId = Yanfly.Param.ColorHpGauge1;
    if (rate >= 0.25) {
        colorId = Yanfly.Param.ColorHpGauge1;
    } else if (rate >= 0.1) {
        colorId = 14;
    } else {
        colorId = 18;
    }
    return this.textColor(colorId);
};

Window_Base.prototype.hpGaugeColor2 = function(rate) {
    var colorId = Yanfly.Param.ColorHpGauge2;
    if (rate >= 0.25) {
        colorId = Yanfly.Param.ColorHpGauge2;
    } else if (rate >= 0.1) {
        colorId = 17;
    } else {
        colorId = 10;
    }
    return this.textColor(colorId);
};