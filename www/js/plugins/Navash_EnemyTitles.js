
//=============================================================================
// Navash Plugins - Random Encounter Bar
// Navash_EncounterBar.js
//=============================================================================

var Imported = Imported || {};
Imported.Navash_EnemyTitle = true;

var Navash = Navash || {};
Navash.EnT = Navash.EnT || {};
Navash.EnT.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Displays a text next to an enemy's name when highlighted.
 * @author Navash
 *
 *
 * @param Title X Offset
 * @desc X Offset of the title.
 * @default 0
 *
 * @param Title Y Offset
 * @desc Y Offset of the title.
 * @default 0
 *
 * @param Title Text Size
 * @desc Font size of the title.
 * @default 28
 *
 * @param Title Text Color
 * @desc Font color of the title.
 * @default 14
 *
 * @param Title Text Align
 * @desc Text alignment of the title.
 * left      center      right
 * @default center
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to show a text in addition to the enemy's name when
 * selecting them. Can be used as titles for enemies.
 *
 * This plugin requires YEP_BattleEngineCore. Please place this plugin anywhere
 * below the YEP_BattleEngineCore plugin.
 *
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * Title X Offset   and   Title Y Offset
 *
 * These parameters allow you to change the position of the displayed text.
 * These should be numbers.
 * 
 * 
 * Title Text Size
 *
 * The font size used for the text. This should be a number.
 * 
 *
 * Title Text Color
 *
 * The font color used for the text. This should be a number.
 *
 *
 * Title Text Align
 *
 * The alignment used for the text. Can be left, center or right.
 *
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * To define the text shown, use the following notetag:
 *
 *   <Enemy Title: text>
 *
 * Where text is the text you wish to display.
 *
 * Example: <Enemy Title: Boss>
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * - Free for use in both commercial and non-commercial projects.
 * - Credit is not required, but if you wish to do so, credit me as Navash.
 *
 */

//==============================================================================
// Plugin Parameters
//==============================================================================

Navash.Parameters = PluginManager.parameters('Navash_EnemyTitles');
Navash.Param = Navash.Param || {};

Navash.Param.EnTTextX = Number(Navash.Parameters['Title X Offset']);
Navash.Param.EnTTextY = Number(Navash.Parameters['Title Y Offset']);

Navash.Param.EnTTextSize = Number(Navash.Parameters['Title Text Size']);
Navash.Param.EnTTextColor = Number(Navash.Parameters['Title Text Color']);
Navash.Param.EnTTextAlign = String(Navash.Parameters['Title Text Align']);

//==============================================================================
// Notetags
//==============================================================================

if (Imported.YEP_BattleEngineCore) {

Navash.EnT._isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Navash.EnT._isDatabaseLoaded.call(this)) return false;
  if (!Navash._loaded_Nav_EnemyTitles) {
    this.processEnTNotetags($dataEnemies);
    Navash._loaded_Nav_EnemyTitles = true;
  }
  return true;
};


DataManager.processEnTNotetags = function(group) {
  var titleNote = /<(?:ENEMY TITLE|enemy titles):[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj._enemyTitle = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(titleNote)) {
        obj._enemyTitle = String(RegExp.$1);
      }
    }
  }
};

//==============================================================================
// Window_EnemyVisualSelect
//==============================================================================

Navash.setBattlerAlias = Window_EnemyVisualSelect.prototype.setBattler;
Window_EnemyVisualSelect.prototype.setBattler = function(battler) {
    Navash.setBattlerAlias.call(this, battler);
    this._battlerId = battler.enemyId();
};

Navash.windowRefreshAlias = Window_EnemyVisualSelect.prototype.refresh;
Window_EnemyVisualSelect.prototype.refresh = function() {
    Navash.windowRefreshAlias.call(this);
    var enemy = $dataEnemies[this._battlerId];
    if (enemy._enemyTitle !== '') {
        var wy = this.contents.height - this.lineHeight();
        var title = enemy._enemyTitle;
        var tXOffset = Navash.Param.EnTTextX;
        var tYOffset = Navash.Param.EnTTextY;
        var tAlign = Navash.Param.EnTTextAlign;
        this.contents.fontSize = Navash.Param.EnTTextSize;
        this.changeTextColor(this.textColor(Navash.Param.EnTTextColor));
        this.drawText(title, tXOffset, tYOffset + wy - this.lineHeight(), this.contents.width, tAlign);
        this.resetFontSettings();
      }
};
    
}