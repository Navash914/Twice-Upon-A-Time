
var Navash = Navash || {};
Navash.VCol = Navash.VCol || {};


Navash.VCol._isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Navash.VCol._isDatabaseLoaded.call(this)) return false;
  if (!Navash._loaded_Nav_VarianceColor) {
    this.processVColNotetags($dataItems);
    this.processVColNotetags($dataWeapons);
    this.processVColNotetags($dataArmors);
    Navash._loaded_Nav_VarianceColor = true;
  }
  return true;
};


DataManager.processVColNotetags = function(group) {
  var note = /<ADJUST WEIGHT|variance weight (.*):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.paramWeight = [1,1,1,1,1,1,1,1];
 //   obj.weightedDiff = 0;
      
    for (var i = 0; i < notedata.length; i++) {
     var line = notedata[i];
     if (line.match(note)) {
       var paramId = 8;
       var stat = String(RegExp.$1).toUpperCase();
       var value = Number(RegExp.$2);
     if (['MAXHP', 'MAX HP', 'MHP', 'HP'].contains(stat)) {
          paramId = 0;
        } else if (['MAXMP', 'MAX MP', 'MMP', 'MP'].contains(stat)) {
          paramId = 1;
        } else if (['ATK', 'STR'].contains(stat)) {
          paramId = 2;
        } else if (['DEF'].contains(stat)) {
          paramId = 3;
        } else if (['MAT', 'INT'].contains(stat)) {
          paramId = 4;
        } else if (['MDF', 'RES'].contains(stat)) {
          paramId = 5;
        } else if (['AGI', 'SPD'].contains(stat)) {
          paramId = 6;
        } else if (['LUK'].contains(stat)) {
          paramId = 7;
        }  
    obj.paramWeight[paramId] = value;
      }
    }
  }
};


ItemManager.randomizeInitialStats = function(baseItem, newItem) {
    if (baseItem.randomVariance <= 0) return;
    var diff = 0;
    var randomValue = baseItem.randomVariance * 2 + 1;
    var offset = baseItem.randomVariance;
    for (var i = 0; i < 8; ++i) {
      if (newItem.params[i] === 0) continue;
      newItem.params[i] += Math.floor(Math.random() * randomValue - offset);
      if (!Yanfly.Param.ItemNegVar && baseItem.params[i] >= 0) {
        newItem.params[i] = Math.max(newItem.params[i], 0);
      }
      var testDiff = (newItem.params[i] - baseItem.params[i]) * baseItem.paramWeight[i];
 //     console.log(String(testDiff));
      diff += (newItem.params[i] - baseItem.params[i]) * baseItem.paramWeight[i];
//      console.log(String(diff));
    }
    baseItem.weightedDiff = diff;
    console.log(String(baseItem.weightedDiff));
};

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        this.resetTextColor();
        var iconBoxWidth = Window_Base._iconWidth + 4;
        if (DataManager.isWeapon(item)) {
            var trueItem = $dataWeapons[item.baseItemId];
        } else if (DataManager.isArmor(item)) {
            var trueItem = $dataArmors[item.baseItemId];
        }
        if (trueItem.weightedDiff !== undefined) {
            var color = this.varianceTextColor(trueItem, trueItem.weightedDiff);
            this.changeTextColor(color);
        } else {
        this.resetTextColor();
        }
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        this.resetTextColor();
    }
};
      
Window_Base.prototype.varianceTextColor = function(item, diff) {
    var maxVar = 0;
    for (var i = 0; i < 8; ++i) {
        if (item.params[i] !== 0) maxVar += item.randomVariance * item.paramWeight[i];
    }
    var rate = diff / maxVar;
    var colorId = 0;
    if (rate === 1) {
        colorId = 0;
    } else if (rate > 0.9) {
      colorId = 0;
    } else if (rate > 0.8) {
      colorId = 0;
    } else if (rate > 0.7) {
      colorId = 0;
    } else if (rate > 0.6) {
      colorId = 0;
    } else if (rate > 0.5) {
      colorId = 0;
    } else if (rate > 0.4) {
      colorId = 0;
    } else if (rate > 0.3) {
      colorId = 0;
    } else if (rate > 0.2) {
      colorId = 0;
    } else if (rate > 0.1) {
      colorId = 0;
    } else if (rate > 0) {
      colorId = 0;
    } else if (rate === 0) {
      colorId = 18;
    } else if (rate > -0.1) {
      colorId = 13;
    } else if (rate > -0.2) {
      colorId = 14;
    } else if (rate > -0.3) {
      colorId = 15;
    } else if (rate > -0.4) {
      colorId = 16;
    } else if (rate > -0.5) {
      colorId = 17;
    } else if (rate > -0.6) {
      colorId = 18;
    } else if (rate > -0.7) {
      colorId = 19;
    } else if (rate > -0.8) {
      colorId = 20;
    } else if (rate > -0.9) {
      colorId = 21;
    } else if (rate === -1) {
      colorId = 22;
    } else {
      colorId = 0;
    }
    console.log(String(item.baseItemId));
//console.log(String(rate));
//if (diff !== undefined) {
console.log(String(diff));
/*} else {
console.log('diff is undefined')
}
if (maxVar !== undefined) {
console.log(String(maxVar));
} else {
console.log('maxVar is undefined')
}*/
return this.textColor(colorId);
};