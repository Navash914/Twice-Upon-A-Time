//=======================================
//ARP_CommandIcons.js
//=======================================
/*Updates:
v1.01 - Fixed Draw Weapon Icon always being true
v1.00 - First release (Nov, 18, 2015)
*/
/*:
  @plugindesc v1.01 Adds Icons to command windows
  <ARP_ComIcons>
  @author Atreyo Ray

  @help
 ** Please report any bugs you find to 'atreyo.ray[at]gmail.com'
 ** There's no need to credit me for using this plugin.
 ** You can use it on free or commercial games.
 ** You're free to modify it to suit your needs.
 -----------------------------------------------------------------------------
 INSTRUCTIONS
 -----------------------------------------------------------------------------
 ** Place this plugin BELOW other plugins that change how scenes and command
   windows are drawn (like Yanfly's Main Menu Manager).

 Write within the Command Icons Batches any number of combinations of command
 names and icons, following this structure:

 Command Name: icon index, Command Name: icon index, Command Name: icon index

 For example, if you want the command 'Skill' to have icon 25, and 'Item' to 
 have icon 30:

 Skill: 25, Item: 30

 **You have to separate each combination of Command and Icon with a comma.
 **Use capital letters where necessary.
 **You may write any amount of combinations within each batch. In fact, you 
   may write all your combinations in a single batch! I have created 6 
   batches only for the purpose of keeping things organized.

 -----------------------------------------------------------------------------
 Weapon Unique Icons Parameter
 -----------------------------------------------------------------------------
 If you want the icons drawn for the command 'Attack' in battle to be 
 different from the icons of the equiped weapons, use a number on this 
 parameter equal to the difference of the index to the icon you want to be 
 drawn.

 For example, if the icons you want to be drawn for each weapon are exactly 
 one line after your weapon icons in IconSet.png, set this parameter to 16.
 Or, if the icons you want to be drawn for are exactly after each weapon icon
 in IconSet.png, set this parameter to 1.

 @param Scenes To Draw
 @desc The Scenes where icons should appear in command windows.
 Separate them with a single space.
 @default Scene_Menu Scene_Battle Scene_Title

 @param Command Icons Batch 1
 @desc First batch of commands and icons. Follow the example:
 Command Name:Icon, Command Name:Icon, Command Name:Icon

 @param Command Icons Batch 2
 @desc Second batch of commands and icons. Follow the example:
 Command Name:Icon, Command Name:Icon, Command Name:Icon

 @param Command Icons Batch 3
 @desc Third batch of commands and icons. Follow the example:
 Command Name:Icon, Command Name:Icon, Command Name:Icon

 @param Command Icons Batch 4
 @desc Forth batch of commands and icons. Follow the example:
 Command Name:Icon, Command Name:Icon, Command Name:Icon

 @param Command Icons Batch 5
 @desc Fifth batch of commands and icons. Follow the example:
 Command Name:Icon, Command Name:Icon, Command Name:Icon

 @param Command Icons Batch 6
 @desc Sixth batch of commands and icons. Follow the example:
 Command Name:Icon, Command Name:Icon, Command Name:Icon

 @param === WEAPON ICONS ===

 @param Draw Weapon Icon
 @desc Determines if on Battle Scene, the equiped weapon icon
 should be drawn on Attack command - true/false
 @default true

 @param Barehanded Icon
 @desc If drawing weapon icons, but the actor is barehanded,
 draw this icon instead
 @default 106

 @param Weapon Unique Icons
 @desc Use this if you want the weapon icons in battle to differ
 from the actual icon of the equipped weapon. See help.
 @default 0
*/
(function() {
var parameters = $plugins.filter(function(p) {
        return p.description.contains('<ARP_ComIcons>');
    })[0].parameters;

var scenesToDraw 	= String(parameters['Scenes To Draw'] || 'Scene_Menu Scene_Battle Scene_Title').split(' ');
	for(var i = 0; i < scenesToDraw.length; i++){ scenesToDraw[i] = eval(scenesToDraw[i]);}
var drawWeaponIcon 	= String(parameters['Draw Weapon Icon'] 	|| true);
var barehandIcon	= Number(parameters['Barehanded Icon'] 		|| 106);
var weaponIconOffset = Number(parameters['Weapon Unique Icons']	|| 0);
var commandIcon1 = String(parameters['Command Icons Batch 1'] || '').split(',');
var commandIcon2 = String(parameters['Command Icons Batch 2'] || '').split(',');
var commandIcon3 = String(parameters['Command Icons Batch 3'] || '').split(',');
var commandIcon4 = String(parameters['Command Icons Batch 4'] || '').split(',');
var commandIcon5 = String(parameters['Command Icons Batch 5'] || '').split(',');
var commandIcon6 = String(parameters['Command Icons Batch 6'] || '').split(',');
var commandIconPrep = [];
if(commandIcon1[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon1);}
if(commandIcon2[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon2);}
if(commandIcon3[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon3);}
if(commandIcon4[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon4);}
if(commandIcon5[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon5);}
if(commandIcon6[0] !== ''){commandIconPrep = commandIconPrep.concat(commandIcon6);}
var commandIcon = {};
for(i = 0; i < commandIconPrep.length; i++){
	if (['',' '].indexOf(commandIconPrep[i]) < 0) {
		var prep = commandIconPrep[i].match(/\s*(.*)/)[1];
		prep = prep.split(':');
		commandIcon[prep[0]] = Number(prep[1]);
	}
}


Window_Command.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    if(scenesToDraw.indexOf(SceneManager._scene.constructor) >= 0){
    	var commandName = this.commandName(index);
	    if (eval(drawWeaponIcon) && 
	    	   SceneManager._scene.constructor === Scene_Battle && 
	    	   commandName === TextManager.attack ){
	    	this.drawIcon($gameTemp.weaponIconARPCI, rect.x-4, rect.y+2);
	    	rect.x += 30;
	    	rect.width -= 30;
	    } else if ( commandIcon[commandName] ) {
	    	this.drawIcon(commandIcon[commandName], rect.x-4, rect.y+2);
	    	rect.x += 30;
	    	rect.width -= 30;
	    }
	}

    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};


Window_ActorCommand.prototype.addAttackCommand = function() {
	if (this._actor.weapons()[0]){
		$gameTemp.weaponIconARPCI = this._actor.weapons()[0].iconIndex + weaponIconOffset;
	} else {
		$gameTemp.weaponIconARPCI = barehandIcon;
	}
    this.addCommand(TextManager.attack, 'attack', this._actor.canAttack());
};


}());