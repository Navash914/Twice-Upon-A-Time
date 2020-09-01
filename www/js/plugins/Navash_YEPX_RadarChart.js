// Numbers over Fill
// Actor Specific Colors
// Parameter Names + Icons
// Parameter Stats
// Top Text

var Navash = Navash || {};
Navash.RCH = Navash.RCH || {};
Navash.RCH.version = 1.00;


Bitmap.prototype.fillPolygon = function(points, color) {
    var context = this._context;
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(points[0], points[1]);
    for (var i = 2; i < points.length - 1; i += 2) {
       context.lineTo(points[i], points[i+1]); 
    }
    context.closePath();
    context.fill();
    context.restore();
    this._setDirty();
};

Bitmap.prototype.drawPolygon = function(points, color) {
    var context = this._context;
    context.save();
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(points[0], points[1]);
    for (var i = 2; i < points.length - 1; i += 2) {
       context.lineTo(points[i], points[i+1]); 
    }
    context.closePath();
    context.lineWidth = 1;
    context.stroke();
    context.restore();
    this._setDirty();
};

Window_StatusInfo.prototype.drawParameters = function() {
    this.drawBackChart();
    this.drawBackSkeleton();
    this.drawBackPointMarks();
    this.drawParamIcons();
    var points = [];
    var centerX = 210;
    var centerY = 206;
    var angle = Math.PI / 3;
    var buffer = 132 * 0.3;
    var remain = 132 - buffer;
    
    // Attack:
    var rate = this.calcParamRate(2);
    var x = centerX - (buffer + remain * rate) * Math.cos(angle);
    var y = centerY - (buffer + remain * rate) * Math.sin(angle);
    points.push(x,y);
    this.drawParamNumber(2, x+5, y-5);
    // Magic Attack:
    var rate = this.calcParamRate(4);
    var x = centerX + (buffer + remain * rate) * Math.cos(angle);
    var y = centerY - (buffer + remain * rate) * Math.sin(angle);
    points.push(x,y);
    this.drawParamNumber(4, x-10, y-5);
    // Agility:
    var rate = this.calcParamRate(6);
    var x = centerX + buffer + remain * rate;
    var y = centerY;
    points.push(x,y);
    this.drawParamNumber(6, x-20, y-15);
    // Magic Defense:
    var rate = this.calcParamRate(5);
    var x = centerX + (buffer + remain * rate) * Math.cos(angle);
    var y = centerY + (buffer + remain * rate) * Math.sin(angle);
    points.push(x,y);
    this.drawParamNumber(5, x-10, y-30);
    // Defense:
    var rate = this.calcParamRate(3);
    var x = centerX - (buffer + remain * rate) * Math.cos(angle);
    var y = centerY + (buffer + remain * rate) * Math.sin(angle);
    points.push(x,y);
    this.drawParamNumber(3, x+5, y-30);
    // Focus:
    var rate = this.calcParamRate(7);
    var x = centerX - (buffer + remain * rate);
    var y = centerY;
    points.push(x,y);
    this.drawParamNumber(7, x+10, y-15);
    
   // var color = 'rgba(0,128,0,1)';
   // var color = 'rgba(128,0,0,1)'; // Red
    
   // for (var i = 0; i < points.length - 1; i += 2) {
   // this.contents.drawCircle(points[i], points[i + 1], 3, color);
   // }
    
    var color = 'rgba(0,128,0,0.6)';
    var color = 'rgba(128,0,0,0.4)'; // Red
    this.contents.drawPolygon(points, color);
    this.contents.fillPolygon(points, color);
};

Window_StatusInfo.prototype.drawParamNumber = function(paramId, x, y) {
    this.changeTextColor(this.normalColor());
    this.contents.fontSize = 16;
    var param = this._actor.param(paramId);
    if (paramId === 2 || paramId === 7 || paramId === 3) var align = 'right';
    if (paramId === 4 || paramId === 5 || paramId === 6) var align = 'left';
    this.drawText(param, x, y, 20, align);
    this.resetFontSettings();
};

Window_StatusInfo.prototype.drawBackChart = function() {
    var color = 'rgba(128,128,128,0.6)';
    
    var x1 = 78;
    var x2 = 144;
    var x3 = 276;
    var x4 = 342;
    
    var y1 = 92;
    var y2 = 206;
    var y3 = 320;
    
    var points = [x2,y1,x3,y1,x4,y2,x3,y3,x2,y3,x1,y2];
    
    this.contents.fillPolygon(points, color);
};

Window_StatusInfo.prototype.drawBackSkeleton = function() {
    var color = 'rgba(128,128,128,1)';
    
    var x1 = 78;
    var x2 = 144;
    var x3 = 276;
    var x4 = 342;
    
    var y1 = 92;
    var y2 = 206;
    var y3 = 320;
    
    var points = [x2,y1,x3,y1,x4,y2,x3,y3,x2,y3,x1,y2];
    this.contents.drawPolygon(points, color);
    
    var points = [x2,y1,x3,y3]; 
    this.contents.drawPolygon(points, color);
    
    var points = [x3,y1,x2,y3]; 
    this.contents.drawPolygon(points, color);
    
    var points = [x1,y2,x4,y2]; 
    this.contents.drawPolygon(points, color);
    
    var div = 1/8;
    points = [x2+132*div,y1+228*div,x3-132*div,y1+228*div,x4-264*div,y2,x3-132*div,y3-228*div,x2+132*div,y3-228*div,x1+264*div,y2];
    this.contents.drawPolygon(points, color);
    
    div += 1/8;
    points = [x2+132*div,y1+228*div,x3-132*div,y1+228*div,x4-264*div,y2,x3-132*div,y3-228*div,x2+132*div,y3-228*div,x1+264*div,y2];
    this.contents.drawPolygon(points, color);
    
    div += 1/8;
    points = [x2+132*div,y1+228*div,x3-132*div,y1+228*div,x4-264*div,y2,x3-132*div,y3-228*div,x2+132*div,y3-228*div,x1+264*div,y2];
    this.contents.drawPolygon(points, color);
    
};

Window_StatusInfo.prototype.drawBackPointMarks = function() {
    var color = 'rgba(128,128,128,1)';
    var radius = 3;
    
    var x1 = 78;
    var x2 = 144;
    var x3 = 276;
    var x4 = 342;
    
    var y1 = 92;
    var y2 = 206;
    var y3 = 320;
    
    var mPx = 132/8;
    var mPy = 228/8;
    
    for (var i = 0; i < 9; i++) {
    if (i !== 4) this.contents.drawCircle(x2 + mPx * i, y1 + mPy * i, radius, color);
    }
    
    for (var i = 0; i < 9; i++) {
    if (i !== 4) this.contents.drawCircle(x3 - mPx * i, y1 + mPy * i, radius, color);
    }
    
    mPx = 264/8;

    for (var i = 0; i < 9; i++) {
    this.contents.drawCircle(x1 + mPx * i, y2, radius, color);
    }
};

Window_StatusInfo.prototype.drawParamIcons = function() {
    var x1 = 78;
    var x2 = 144;
    var x3 = 276;
    var x4 = 342;
    
    var y1 = 92;
    var y2 = 206;
    var y3 = 320;
    
    // Attack:
    var iconId = 570;
    var x = x2 - 34;
    var y = y1 - 34;
    this.drawIcon(iconId, x, y);
    
    // Defense:
    var iconId = 571;
    var x = x2 - 34;
    var y = y3 + 2;
    this.drawIcon(iconId, x, y);
    
    // Magic Attack:
    var iconId = 572;
    var x = x3 + 2;
    var y = y1 - 34;
    this.drawIcon(iconId, x, y);
    
    // Magic Defense:
    var iconId = 573;
    var x = x3 + 2;
    var y = y3 + 2;
    this.drawIcon(iconId, x, y);
    
    // Agility:
    var iconId = 574;
    var x = x4 + 2;
    var y = y2;
    this.drawIcon(iconId, x, y);
    
    // Focus:
    var iconId = 575;
    var x = x1 - 34;
    var y = y2;
    this.drawIcon(iconId, x, y);
};

Window_StatusInfo.prototype.calcParamRate = function(paramId) {
		if (this._largestParam === this._smallestParam) return 1.0;
		var rate = parseFloat(this._actor.param(paramId) - this._smallestParam) /
							 parseFloat(this._largestParam - this._smallestParam);
//		rate *= 0.6;
//		rate += 0.4;
//        rate *= 0.8;
		return rate;
};