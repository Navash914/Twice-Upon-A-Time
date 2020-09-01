///Item and Skill Colors
///by SumRndmDde
///SRD_ChooseSkillColors.js

/*:
 * @plugindesc Change the color of the text for Items and Skills 
 * based on their damage Elements!
 * @author SumRndmDde
 * 
 * @param ---Affect Toggles---
 * @desc
 * @default
 *
 * @param Affect Skills?
 * @desc Set to 'yes' or 'no' depending on whether you
 * want this plugin to affect the text of Skills.
 * @default yes
 * 
 * @param Affect Items?
 * @desc Set to 'yes' or 'no' depending on whether you
 * want this plugin to affect the text of Items.
 * @default yes
 * 
 * @param ---Element IDs---
 * @desc
 * @default
 *
 * @param Element ID 1
 * @desc Sets the color for Skills/Items with damage Element ID of 1.
 * @default 0
 *
 * @param Element ID 2
 * @desc Sets the color for Skills/Items with damage Element ID of 2.
 * @default 0
 *
 * @param Element ID 3
 * @desc Sets the color for Skills/Items with damage Element ID of 3.
 * @default 0
 *
 * @param Element ID 4
 * @desc Sets the color for Skills/Items with damage Element ID of 4.
 * @default 0
 *
 * @param Element ID 5
 * @desc Sets the color for Skills/Items with damage Element ID of 5.
 * @default 0
 *
 * @param Element ID 6
 * @desc Sets the color for Skills/Items with damage Element ID of 6.
 * @default 0
 *
 * @param Element ID 7
 * @desc Sets the color for Skills/Items with damage Element ID of 7.
 * @default 0
 *
 * @param Element ID 8
 * @desc Sets the color for Skills/Items with damage Element ID of 8.
 * @default 0
 *
 * @param Element ID 9
 * @desc Sets the color for Skills/Items with damage Element ID of 9.
 * @default 0
 *
 * @param Element ID 10
 * @desc Sets the color for Skills/Items with damage Element ID of 10.
 * @default 0
 *
 * @param Element ID 11
 * @desc Sets the color for Skills/Items with damage Element ID of 11.
 * @default 0
 *
 * @param Element ID 12
 * @desc Sets the color for Skills/Items with damage Element ID of 12.
 * @default 0
 *
 * @param Element ID 13
 * @desc Sets the color for Skills/Items with damage Element ID of 13.
 * @default 0
 *
 * @param Element ID 14
 * @desc Sets the color for Skills/Items with damage Element ID of 14.
 * @default 0
 *
 * @param Element ID 15
 * @desc Sets the color for Skills/Items with damage Element ID of 15.
 * @default 0
 *
 * @param Element ID 16
 * @desc Sets the color for Skills/Items with damage Element ID of 16.
 * @default 0
 *
 * @param Element ID 17
 * @desc Sets the color for Skills/Items with damage Element ID of 17.
 * @default 0
 *
 * @param Element ID 18
 * @desc Sets the color for Skills/Items with damage Element ID of 18.
 * @default 
 *
 * @param Element ID 19
 * @desc Sets the color for Skills/Items with damage Element ID of 19.
 * @default 0
 *
 * @param Element ID 20
 * @desc Sets the color for Skills/Items with damage Element ID of 20.
 * @default 0
 *
 * @param Element ID 21
 * @desc Sets the color for Skills/Items with damage Element ID of 21.
 * @default 0
 *
 * @param Element ID 22
 * @desc Sets the color for Skills/Items with damage Element ID of 22.
 * @default 0
 *
 * @param Element ID 23
 * @desc Sets the color for Skills/Items with damage Element ID of 23.
 * @default 0
 *
 * @param Element ID 24
 * @desc Sets the color for Skills/Items with damage Element ID of 24.
 * @default 0
 *
 * @param Element ID 25
 * @desc Sets the color for Skills/Items with damage Element ID of 25.
 * @default 0
 *
 * @param Element ID 26
 * @desc Sets the color for Skills/Items with damage Element ID of 26.
 * @default 0
 *
 * @param Element ID 27
 * @desc Sets the color for Skills/Items with damage Element ID of 27.
 * @default 0
 *
 * @param Element ID 28
 * @desc Sets the color for Skills/Items with damage Element ID of 28.
 * @default 0
 *
 * @param Element ID 29
 * @desc Sets the color for Skills/Items with damage Element ID of 29.
 * @default 0
 *
 * @param Element ID 30
 * @desc Sets the color for Skills/Items with damage Element ID of 30.
 * @default 0
 *
 * @help Don't worry about it! This plugin doesn't use any plugin commands!
 * This is simply plug-in and play!
 * Don't worry about anything!
 *
 * For this plugin, you set the color for the text by inputing the color 
 * number from your "Window.png" file from the System folder. By default
 * the colors are:
 *
 * 0 = White
 * 1 = Light Blue
 * 2 = Light Red
 * 3 = Light Green
 * 4 = Blue-ish White
 * 5 = Light Gray
 * 6 = Light Yello
 * 7 = Gray
 * 8 = Slightly-light Gray
 * 9 = Blue
 * 10 = Red
 * 11 = Green
 * 12 = Lighter Blue
 * 13 = Lighter Gray
 * 14 = Yellow
 * 15 = Black
 * 16 = Foggy Blue
 * 17 = Slightly-light Yellow
 * 18 = Dark Red
 * 19 = Dark Blue
 * 20 = Brown-ish Orange
 * 21 = Orange-ish Yellow
 * 22 = Baby Blue
 * 23 = Sky Blue
 * 24 = Teal Green
 * 25 = Black-ish Pink
 * 26 = Cloudy Blue
 * 27 = Pink
 * 28 = Forest Green
 * 29 = Sea Green
 * 30 = Purple
 * 31 = Light Purple
 *
 * As for the stuff you got to input below, here's a quick run down:
 *
 * Element ID #
 * Sets the color of text of Skills or Items that do elemental
 * damage based off of the element they use.
 *
 * =========Changelog=========
 *        Version 1.01
 * - Brough total amount of supported Element IDs up to 30.
 * - Added options to disable the plugin's affects on either
 *   Items or Skills individually.
 */

var parameters = PluginManager.parameters('SRD_ElementTextColors');

var colors = new Array(31);
colors[0] = 0;

for(i = 1; i <= 30; i += 1)
{
    colors[i] = Number(parameters['Element ID ' + i] || 0);

    if(colors[i] > 31 || colors[i] < 0)
        colors[i] = 0;
}

var affectSkills = String(parameters['Affect Skills?'] || 'yes');
var affectItems = String(parameters['Affect Items?'] || 'yes');

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        if(DataManager.isSkill(item) && affectSkills == 'yes' && item.damage.elementId > 0)
        {
            this.changeTextColor(this.textColor(colors[item.damage.elementId]));
        }
        else if(DataManager.isItem(item) && affectItems == 'yes' && item.damage.elementId > 0)
        {
            this.changeTextColor(this.textColor(colors[item.damage.elementId]));
        }
        else
        {
            this.resetTextColor();
        }
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};