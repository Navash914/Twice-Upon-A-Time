
//=============================================================================
// Navash Plugins - Enemy Name Icons v1.00
// Navash_EncounterNameIcons.js
//=============================================================================

var Imported = Imported || {};
Imported.Navash_EnemyNameIcons = true;

var Navash = Navash || {};
Navash.ENI = Navash.ENI || {};
Navash.ENI.version = 1.00;

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

Navash.Parameters = PluginManager.parameters('Navash_EnemyNameIcons');
Navash.Param = Navash.Param || {};

Navash.Param.ENITextX = Number(Navash.Parameters['Title X Offset']);
Navash.Param.ENITextY = Number(Navash.Parameters['Title Y Offset']);

Navash.Param.ENITextSize = Number(Navash.Parameters['Title Text Size']);
Navash.Param.ENITextColor = Number(Navash.Parameters['Title Text Color']);
Navash.Param.ENITextAlign = String(Navash.Parameters['Title Text Align']);

//==============================================================================
// Notetags
//==============================================================================

if (Imported.YEP_BattleEngineCore) {

Navash.ENI._isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Navash.ENI._isDatabaseLoaded.call(this)) return false;
  if (!Navash._loaded_Nav_EnemyTitles) {
    this.processENINotetags($dataEnemies);
    Navash._loaded_Nav_EnemyTitles = true;
  }
  return true;
};


DataManager.processENINotetags = function(group) {
  var titleNote = /<(?:ENEMY STATE ICONS|enemy state icons):[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj._enemyTitle = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(titleNote)) {
        obj._enemyTitle = String(RegExp.$1).split(',');
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
        console.log('its working');
        var length = enemy._enemyTitle.length;
        var wy = this.contents.height - this.lineHeight() * 2;
        wy += Navash.Param.ENITextY;
        var iconWidth = Window_Base._iconWidth;
        var width = length * iconWidth + (length - 1) * 2;
        var wx = (this.contents.width - width) / 2;
        wx += Navash.Param.ENITextX;
        for (var i = 0; i < enemy._enemyTitle.length; ++i) {
            var state = Number(enemy._enemyTitle[i]);
            var icon = $dataStates[state].iconIndex;
            this.drawIcon(icon, wx, wy);
            wx += iconWidth + 2;
        }
      }
};
    
}