/*:
@plugindesc This plugin automatically set text color and Word correction
<EST_AUTO_TEXT_COLOR_PLUS>
@author Estriole

@param AutoColorSwitch
@desc The switch to turn on autocolor (set to 0 to always on)
@default 0

@param ReturnColor
@desc return to this color after the text finished. # default 0
@default 0

@param CorrectCapSwitch
@desc Switch to activate the auto capitalization correction.
(will use the key you defined instead) (set to 0 to always on)
@default 0

@param StartAutoColor
@desc start with Auto Color's switch switched ON automatically.
(true / false)
@default true

@param StartAutoCorrect
@desc start with Auto Correct's switch switched ON automatically.
(true / false)
@default true


@param --- Add Entry Below ---
@desc no need to fill this... it's only separator
@default Blank for no entry

@param Starting_Entry 1
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default Nobita; 2

@param Starting_Entry 2
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default Doraemon; 3

@param Starting_Entry 3
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default Giant; 4

@param Starting_Entry 4
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default Suneo; 5

@param Starting_Entry 5
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default Shizuka; 6

@param Starting_Entry 6
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default Mag;10

@param Starting_Entry 7
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 8
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 9
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 10
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 11
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 12
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 13
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 14
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 15
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 16
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 17
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 18
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 19
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param Starting_Entry 20
@desc Format: Yourtext; colorid
separate them with semi colon (;)
@default

@param --- How to add more entry? ---
@desc you can add in game too... read how to use section
@default read help

@help
 ■ Information      ╒══════════════════════════╛
 EST - AUTO TEXT COLOR PLUS
 Version: 1.0
 By Estriole
 File name: EST_AUTO_TEXT_COLOR_PLUS.js

 ■ Introduction     ╒══════════════════════════╛
   This Plugin created based on conversion of my ACE script with same name. 
 
   the original script created because i got tired adding \c[4]Nobita\c[0] in the show message box. 
 so i want to make it automatic. each time i wrote Nobita it will change the color to what i set. 
 useful to color actor names or places or important things. i also add capitalization correction too. 
 so if you write nobita. it could fixed to Nobita(what you set in the config) if you want.
 both auto color and auto caps correct can be binded to switch too if you don't
 want to always using it. 

 ■ Features         ╒══════════════════════════╛
 - Auto Color Text
 - Auto Correct Text (will corrected to what you SET though)
 - Have individual switch for controling when you want some feature activated.
 - SMART Search so XXXword / wordXXX or XXXwordXXX will not included.
 - NOT case sensitive... so it can recognize DoraEmon or DorAEMON.

 ■ Changelog       ╒══════════════════════════╛
   v1.0 2015.11.05           Initial Release

 ■ Plugin Download ╒══════════════════════════╛
 https://www.dropbox.com/s/h8pnjrziv1cwfmz/EST_AUTO_TEXT_COLOR_PLUS.js?dl=0   

 ■ How to use       ╒══════════════════════════╛
 1) Fill the plugin parameter... see Parameter section for more detail
 add your entry from plugin manager.

 2) To control Auto Color / Auto Correct... just turn ON/OFF the coresponding switch.

 3) if the data entry from plugin manager is not enough (20 built in). you can also add it inside
 the game... using this:
 Plugin Command:
    UPDATE_AC_ENTRY yourtexthere ; coloridhere
       >>> space(s) before and after ; will be deleted. 
        example:
        UPDATE_AC_ENTRY estriole cool     ;    8
            "estriole cool" will be colored to 8

 or Script Call:
    $gameSystem.add_AC_Entry(yourtexthere, coloridhere);
        example:
        $gameSystem.add_AC_Entry("Dragon Ball", 10);
            "Dragon Ball" will colored by 10;

 ■ Dependencies     ╒══════════════════════════╛
 None

 ■ Compatibility    ╒══════════════════════════╛
 I'm new in JS... and MV is new engine... so i cannot say for sure. 
 but it should be compatible with most things. 

 ■ Parameters       ╒══════════════════════════╛
 AutoColorSwitch = switchId     
      >>> default 0
      >>> switch to turn on autocolor
      >>> set to 0 for ALWAYS autocolor
 ReturnColor = number
      >>> return to this color after replacing the color.
 CorrectCapSwitch = switchId
      >>> default 0
      >>> switch to turn on autocorrect
      >>> set to 0 for ALWAYS autocorrect
 StartAutoColor = true / false
      >>> default true   
      >>> if set to true will auto flip ON the Auto color switch.
          at start of the game
 StartAutoCorrect = true / false
      >>> default true   
      >>> if set to true will auto flip ON the Auto color switch.
          at start of the game
 Starting_Entry X = YourText ; ColorId
      >>> example: Doraemon ; 4
      will auto color to 4 and auto correct to the entry...
      so if you use: dOrAeMoN ; 4
      when using auto correct it will become dOrAeMoN
 I provide BUILD IN 20 starting entry... if you don't want to use it...
 left it blank and it won't be added to entry.

 if 20 still not enough... read how to use on the way
 to add new entry inside the game using plugin command call.

 ■ License          ╒══════════════════════════╛
 Free to use in all project (except the one containing pornography)
 as long as i credited (ESTRIOLE). 

 ■ Support          ╒══════════════════════════╛
 While I'm flattered and I'm glad that people have been sharing and 
 asking support for scripts in other RPG Maker communities, I would 
 like to ask that you please avoid posting my scripts outside of where 
 I frequent because it would make finding support and fixing bugs 
 difficult for both of you and me.
   
 If you're ever looking for support, I can be reached at the following:
 [ http://forums.rpgmakerweb.com/ ]
 pm me : estriole

 ■ Author's Notes   ╒══════════════════════════╛
 JS regexp is suck compared to ruby. :D. many regexp not working in JS

*/

var EST = EST || {};
EST.AutoColor = EST.AutoColor || {};

EST.AutoColor.param = $plugins.filter(function(p) { 
	return p.description.contains('<EST_AUTO_TEXT_COLOR_PLUS>'); })[0].parameters;
EST.AutoColor.setting = EST.AutoColor.setting || {};

for (key of Object.keys(EST.AutoColor.param))
{
	if (key == 'AutoColorSwitch') EST.AutoColor.ColorSwitch = Number(EST.AutoColor.param[key]);
	if (key == 'ReturnColor') EST.AutoColor.ReturnColor = Number(EST.AutoColor.param[key]);
	if (key == 'CorrectCapSwitch') EST.AutoColor.CorrectCapSwitch = Number(EST.AutoColor.param[key]);
	if (key == 'StartAutoColor') EST.AutoColor.StartAutoColor = EST.AutoColor.param[key];
	if (key == 'StartAutoCorrect') EST.AutoColor.StartAutoCorrect = EST.AutoColor.param[key];
	if (key.match(/Starting_Entry/im) && EST.AutoColor.param[key] != "") 
	{
		var entry = EST.AutoColor.param[key].split(/\s+;\s+|;\s+|\s+;/);
		EST.AutoColor.setting[entry[0]] = Number(entry[1]);
	}
}

// if switch value error it will set it to 0 (no switch)
if (isNaN(EST.AutoColor.ColorSwitch)) EST.AutoColor.ColorSwitch = 0;
if (isNaN(EST.AutoColor.CorrectCapSwitch)) EST.AutoColor.CorrectCapSwitch = 0;

var est_auto_text_color_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  est_auto_text_color_Game_System_initialize.call(this);
  this._AC_setting = JsonEx.makeDeepCopy(EST.AutoColor.setting);
};

Game_System.prototype.AutoColorOk = function() {
    if (EST.AutoColor.ColorSwitch <= 0) return true;
    return $gameSwitches.value(EST.AutoColor.ColorSwitch);
    if (EST.AutoColor.ColorSwitch > 0 && EST.AutoColor.ColorSwitch < $dataSystem.switches.length)
        return $gameSwitches.value(EST.AutoColor.ColorSwitch);
    return false;
};
Game_System.prototype.AutoCorrectOk = function() {
    if (EST.AutoColor.CorrectCapSwitch > 0 && EST.AutoColor.CorrectCapSwitch < $dataSystem.switches.length)
        return $gameSwitches.value(EST.AutoColor.CorrectCapSwitch);
    return false;
};

var est_auto_text_color_Game_Switches_init = Game_Switches.prototype.initialize; 
Game_Switches.prototype.initialize = function() {
    est_auto_text_color_Game_Switches_init.call(this);
    if (EST.AutoColor.StartAutoColor === 'true' && EST.AutoColor.ColorSwitch > 0 && 
    		EST.AutoColor.ColorSwitch < $dataSystem.switches.length) this._data[EST.AutoColor.ColorSwitch] = true;

    if (EST.AutoColor.StartAutoCorrect === 'true' && EST.AutoColor.CorrectCapSwitch > 0 && 
    		EST.AutoColor.CorrectCapSwitch < $dataSystem.switches.length) this._data[EST.AutoColor.CorrectCapSwitch] = true;
};

var est_auto_text_color_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	var xtext = est_auto_text_color_Window_Base_convertEscapeCharacters.call(this,text);
    var word, use, regex;
    for (key in $gameSystem._AC_setting)
    {
        regex = new RegExp("\\b("+String(key)+")\\b",'img');
        xtext = xtext.replace(regex, function(x){
            use = $gameSystem.AutoCorrectOk() ? key : x;
            if ($gameSystem.AutoColorOk()) return "\\c["+$gameSystem._AC_setting[key]+"]"+use+"\\c["+EST.AutoColor.ReturnColor+"]";
            if (!$gameSystem.AutoColorOk()) return use;
        });
    }
    xtext = est_auto_text_color_Window_Base_convertEscapeCharacters.call(this,xtext);

	return xtext;
};

Game_System.prototype.add_AC_Entry = function(name, color) {
    this._AC_setting[name] = color;
};

//alias method to create plugin command
  var est_auto_color_GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    est_auto_color_GameInterpreter_pluginCommand.call(this, command, args);
     if (command.toUpperCase() === 'UPDATE_AC_ENTRY') 
      {
       alert_msg = "wrong plugin command\ncorrect format> ADD_AC_ENTRY ENTRYNAME ; COLORID"
       var setting = args.join(" ").split(/\s+;\s+|;\s+|\s+;/);
       $gameSystem.add_AC_Entry(setting[0],Number(setting[1]));
      };
  };