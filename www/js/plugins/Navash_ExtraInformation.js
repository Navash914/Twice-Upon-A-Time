
var Navash = Navash || {};
Navash.VCol = Navash.VCol || {};

/*

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
*/


Navash.SceneMenu_alias = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    Navash.SceneMenu_alias.call(this);
    this.createInformationWindow();
};


Scene_Menu.prototype.createInformationWindow = function() {
    this.addWindow(new Window_ExtraInfo());
};




function Window_ExtraInfo() {
    this.initialize.apply(this, arguments);
}

Window_ExtraInfo.prototype = Object.create(Window_Base.prototype);
Window_ExtraInfo.prototype.constructor = Window_ExtraInfo;

Window_ExtraInfo.prototype.initialize = function() {
    var y = this.fittingHeight(9);
    var height = this.fittingHeight(2);
    Window_Base.prototype.initialize.call(this, 0, y, 240, height);
    this._dy = 0;
};

Window_ExtraInfo.prototype.update = function() {
  Window_Base.prototype.update.call(this);
    this._dy = this.displayMapName(this._dy);
    this.displayPlayTime(this._dy);
};

Window_ExtraInfo.prototype.displayMapName = function(y) {
    var text = $gameMap.displayName();
    this.drawText(text, 0, y, this.contents.width, 'left');
    return y + this.lineHeight();
};

Window_ExtraInfo.prototype.displayPlayTime = function(y) {
    this.contents.clear();
    var text = $gameSystem.playtimeText();
    this.drawText(text, 0, y, this.contents.width, 'right');
};