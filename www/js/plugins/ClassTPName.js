Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());    
    var TPName = actor.currentClass().meta.TPName;  
    if (!TPName) {
      this.drawText(TextManager.tpA, x, y, 44); 
    } else {
      this.drawText(TPName, x, y, 44); 
    }
    this.changeTextColor(this.tpColor(actor));
    this.drawText(Yanfly.Util.toGroup(actor.tp), x + width - 64, y, 64,
      'right');
};
       

       