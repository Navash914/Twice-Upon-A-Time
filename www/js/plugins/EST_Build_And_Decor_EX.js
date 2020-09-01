/*:
@plugindesc This plugin is the MANAGER to swap event with building / decorations based on item.
<EST_BUILD_AND_DECOR>
@author Estriole

@param VarIdForSelection
@desc Variable ID to be used to item selection
@default 7

@param DecorMoveSwitchId
@desc Switch ID to mark decor is being moved. also to stop player movement, open save, open menu
@default 7

@param DecorMoveSelfSwitch
@desc The self switch to flip when finishing decor movement
A, B, C, or D
@default C


@help
 ■ Information      ╒══════════════════════════╛
 EST - Build And Decor EX
 Version: 1.0
 By Estriole
 File name: EST_Build_And_Decor_EX.js

 ■ Introduction     ╒══════════════════════════╛
	Conversion of my EST - BUILD AND DECOR SERIES script from ACE.
 Mainly this script make you can have 'decoration' item that you 
 can place to customize your map. if you're using my EST - EVENT SIZE AND TRIGGER
 plugin... you can also make the decoration as building. this plugin also include
 EST - DECOR MOVEMENT conversion from ACE instead making it separate plugin. 
 thus this plugin named: EST - Build And Decor EX

 ■ Features         ╒══════════════════════════╛
 - bind 'decoration'/'building' to item.
 it's actually event in template map.
 - you can separate decoration by category. ex: building, wall, furniture, etc
 - you can move the decoration freely using parallel event page and selfswitch

 ■ Changelog       ╒══════════════════════════╛
   v1.0 2015.11.10           Initial Release

 ■ Plugin Download ╒══════════════════════════╛
 https://www.dropbox.com/s/mwht3kmvjpu2v2c/EST_Build_And_Decor_EX.js?dl=0
 
 ■ How to use       ╒══════════════════════════╛
 1) Make Decoration Item
 create an item in database... give it notetags:
 
 mandatory:
 <decor_map: mapId>
 <decor_id: eventId>
 <decor_type: type>
 
 optional:
 <decor_xmod: x>
 <decor_xmod: y>

 change mapId => your template map id... you can have more than 1 template map
 change eventId => event in in your template map you want to place as your decoration
 change type => any string to mark the decoration type.
 change x => to any number of tiles you want the new decoration to shift it's placement. 
 			 positive value = right, negative value = left
 change y => to any number of tiles you want the new decoration to shift it's placement.
 			 positive value = down, negative value = up
 
 <decor_xmod: x>
 <decor_xmod: y>
 will be ignored if in your decor selection call you add posfix value 
 (it will be placed in posfix coordinate instead) 

 example notetags:
 <decor_map: 8>
 <decor_id: 12>
 <decor_type: Building>
 <decor_xmod: 1>
 <decor_xmod: -1>
 
 the item is listed in decor selection for "Building"
 when that item is selected in decor selection...
 it will grab event from map 8 event id 12
 and place it in the position of event that called it
 but will shift it x by 1 and y by -1

 2) Giving Decoration Item to player...
 just give the item using event command / monster drop / anything

 3) Placing the Decoration using Decor Selection
 plugin command
	DECOR_SELECT decortype delete? posfix
 
 or script Call
 	this.decorSelect(decortype,delete?,posfix)

 mandatory:
 decortype => will only list item with the decortype in script call this require
 			  you to pass a string... so wrap it in "". in plugin command
 			  it's not necessary. since all become string in plugin command.

 optional:
 delete? => delete the calling event / not. true = delete, false = don't delete.
            if you don't fill it... it will defaulted to true
 posfix => array containing [x,y] coordinate of where the new event placed.
 		   if you using this the <decor_xmod: x> and <decor_ymod: y>
		   will be ignored... since the event will be FIXED to placed in that coordinate

 you can choose to not using the optional parameter. just don't fill anything and it works

 Some example:
 Plugin command: 	decor_select building
 Script Call   : 	this.decorSelect("building");
 
 yes the DECOR_SELECT is not case sensitive... i make it caps above so people read it better.
 will list all item which have <decor_type: building> (not case sensitive. so BuIlDiNG works fine)
 
 Plugin command: 	decor_select building false
 Script Call   : 	this.decorSelect("building", false);
 
 will list all item which belong to building type. also will NOT delete the calling event

 Plugin command: 	decor_select building false [10,3]
 Script Call   : 	this.decorSelect("building",false,[10,3]);

 will list all item which belong to building type. also will NOT delete the calling event
 and will PLACED the event at x = 10, y = 3 coordinate

 
 4) Removing Decoration
 plugin command:
 	REMOVE_DECOR mastermap masteritem xmod ymod
 or script call:
    this.rmvDecoration(mastermap, masteritem, xmod, ymod)
 
 ALL is optional:
 fill this parameter only if you want the deleted decoration REPLACED by other event.
 for example replace the event to event that call decor_selection again.

 mastermap => map id for event which will replace deleted event
 masteritem => event id for event which will replace deleted event
 xmod => when placing replacement event it will shift x tiles from deleted event position
 		 positive value = right, negative value = left
 ymod => when placing replacement event it will shift y tiles from deleted event position

 it's optional so you don't need to fill it
 
 examples:
 Plugin command: 	remove_decor
 Script Call   : 	this.rmvDecoration();
 
 will delete the decoration and that's it.

 Plugin command: 	remove_decor 8 3
 Script Call   : 	this.rmvDecoration(8,3);
 
 will delete the decoration and replace it with event from map 8 event 3

 Plugin command: 	remove_decor 8 3 6 7
 Script Call   : 	this.rmvDecoration(8,3,6,-7);
 
 will delete the decoration and replace it with event from map 8 event 3
 and shift x by 6 tiles to right and shift y by 7 tiles above

 5) Moving Decoration
 make a page in existing decoration event. make it activate when selfSwitch C activated
 (you can change the selfSwitch in plugin parameter. but C is the default value)

 change it to Paralles Process. and make sure it's same as character priority
 you can add the plugin command / script call in the event page.

 plugin command FORMAT:
	DECOR_MOVE selfSwitchEnd
 or script call:
	this.decor_move(selfSwitchEnd);

 selfSwitchEnd => the selfswitch (default 'C') value when the decor move ENDED.
                  true / false. 

                  it depend on how you set the event page...
				  > if decor movement placed in an event page that have selfSwitch C = ON as condition
				  and your "other" page is in page without condition. so you want selfSwitch C => OFF
				  at end of decor movement... use false.
				  > if decor movement placed in an event page that have no condition and the "other"
				  event page is the one with condition selfSwitch C = ON. so you want selfSwitch C => ON
				  at end of decor movement... use true.

example:
 Plugin command:     decor_move false
 Script Call   :     this.decor_move(false);
  will move the decoration... when the decor movement end... it will flip selfSwitch you set in parameter to false (OFF).

 Plugin command:     decor_move true
 Script Call   :     this.decor_move(true);
  will move the decoration... when the decor movement end... it will flip selfSwitch you set in parameter to true (ON).

 Plugin command:     decor_move
 Script Call   :     this.decor_move();
  if you didn't fill true / false like above... it will defaulted to true (selfSwitch ON).

 XXX) FOR OTHER SCRIPTER that want to make compatibility patch for this plugin.
 check EST.Build_And_Decor exist or not.
 ex: 
 if(EST && EST.Build_And_Decor) {
  place your code here.
 }
 
 ■ Dependencies     ╒══════════════════════════╛
 mandatory:
 EST - SAVE MAP EVENT
 EST - CLONE TRANSFORM DELETE EVENT
 optional:
 EST - EVENT SIZE AND TRIGGER
 EST - GRAPHIC SHIFT

 ■ Compatibility    ╒══════════════════════════╛
 I'm new in JS... and MV is new engine... so i cannot say for sure. 
 but it should be compatible with most things. 

 ■ Parameters       ╒══════════════════════════╛
  > VarIdForSelection
		Variable ID to be used to item selection
        default 7

  > DecorMoveSwitchId
        Switch ID to mark decor is being moved. also to stop player movement, open save, open menu
        default 7

  > DecorMoveSelfSwitch
    	The self switch to flip when finishing decor movement
		A, B, C, or D
        default C

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
 This is FINAL part of the EST - DECOR AND BUILD SERIES.
*/
var EST = EST || {};
EST.Build_And_Decor = EST.Build_And_Decor || {};

EST.Build_And_Decor.parameters = $plugins.filter(function(p) { 
	return p.description.contains('<EST_BUILD_AND_DECOR>'); })[0].parameters;
EST.Build_And_Decor.varId = Number(EST.Build_And_Decor.parameters['VarIdForSelection']);
EST.Build_And_Decor.selfSwitchId = EST.Build_And_Decor.parameters['DecorMoveSelfSwitch'];
EST.Build_And_Decor.DecorMoveSwitchId = Number(EST.Build_And_Decor.parameters['DecorMoveSwitchId']);

//if plugin parameter is not correct it will show warning popup window
if (isNaN(EST.Build_And_Decor.varId)) window.alert("Wrong Variable Id in plugin Parameter");
if (isNaN(EST.Build_And_Decor.DecorMoveSwitchId)) window.alert("Wrong Variable Id in plugin Parameter");
if (['A','B','C','D'].indexOf(EST.Build_And_Decor.selfSwitchId.toUpperCase()) < 0) 
	window.alert("Wrong SelfSwitchId in plugin Parameter. only A B C D supported");

Game_Interpreter.prototype.isAnyEventOnSelf = function() {
	var this_event = $gameMap._events[this._eventId];
	var idlist = $gameMap.eventsXyNt(this_event.x, this_event.y);
	if (idlist.length > 1) return true;
	return false;
};

Game_Interpreter.prototype.decorSelect = function(type, del, posfix) {
	if (type == undefined || type == null) type = null;
	if (del == undefined || del == null) del = true;
	if (posfix == undefined || posfix == null) posfix = [null,null];
	if (typeof(type) === "string") type = [type];
	$gameSystem._decorDel = del;
	$gameSystem._decorPosfix = posfix;
	$gameVariables.setValue(EST.Build_And_Decor.varId, 0);
	$gameParty._decorType = type;
	this._params = [EST.Build_And_Decor.varId];
	this.command104();
};

Game_Interpreter.prototype.addDecoration = function(mastermap, del, posfix) {
	// initing default value data
	if (mastermap == undefined || mastermap == null) mastermap = 0;
	if (del == undefined || del == null) del = true;
	if (posfix == undefined || posfix == null) posfix = [null,null];
	// check does item  selection fail or not
	if ($gameVariables[EST.Build_And_Decor.varId] == 0) return;
	// setting default x and y
	try{var x = $gameMap._events[this._eventId].x;} catch(err){var x = $gamePlayer.x};
	try{var y = $gameMap._events[this._eventId].y;}
	  catch(err){var y = $gamePlayer.y};
	var id = $gameVariables.value(EST.Build_And_Decor.varId);
	var item = $dataItems[id]
	mastermap = $gameSystem.getDecorMap(item);
	event_id = $gameSystem.getDecorEventId(item);

	if(mastermap == 0) return;
	if(event_id == 0) return;
	var xmod = $gameSystem.getDecorXmod(item);
	var ymod = $gameSystem.getDecorYmod(item);
	x += xmod; 
	y += ymod;
	if(posfix[0]) x = Number(posfix[0])
	if(posfix[1]) y = Number(posfix[1])

	$gameMap.add_event(mastermap, event_id, x, y);
	if (del) this.delete_this_event();
	$gameParty.loseItem(item, 1);
};

Game_Interpreter.prototype.rmvDecoration = function(mastermap, masteritem, xmod, ymod) {
	if (mastermap == undefined || mastermap == null) mastermap = 0;
	if (masteritem == undefined || masteritem == null) masteritem = 0;
	if (xmod == undefined || xmod == null) xmod = 0;
	if (ymod == undefined || ymod == null) ymod = 0;

	var x = $gameMap._events[this._eventId].x + xmod;
	var y = $gameMap._events[this._eventId].y + ymod;
	this.delete_this_event();
	if (mastermap == 0 || masteritem == 0) return;
	$gameMap.add_event(mastermap, masteritem, x, y);
};

Game_Interpreter.prototype.rescuePlayerStuck = function(offset_x, offset_y) {
	if (!offset_x) offset_x = 0;
	if (!offset_y) offset_y = 0;
	//place player where he don't stuck
	var eventx = $gameMap._events[this._eventId].x;
	var eventy = $gameMap._events[this._eventId].y;
	$gamePlayer.locate(eventx+offset_x, eventy+offset_y)

};

var est_build_decor_game_system_init = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
	est_build_decor_game_system_init.call(this);
	this._decorDel = null;
	this._decorPosfix = null;
};

Game_System.prototype.getDecorMap = function(item) {
	var mastermap = 0;
	if (!item) return 0;
	var comment = item.note;
	if(comment.match(/<decor_map:\s*(\d+)?>/im)) mastermap = Number(comment.match(/<decor_map:\s*(\d+)?>/im)[1]);
	return mastermap;
};

Game_System.prototype.getDecorEventId = function(item) {
	var decorItemId = 0;
	if (!item) return 0;
	var comment = item.note;
	if(comment.match(/<decor_id:\s*(\d+)?>/im)) decorItemId = Number(comment.match(/<decor_id:\s*(\d+)?>/im)[1]);
	return decorItemId;
};
Game_System.prototype.getDecorXmod = function(item) {
	var decorXmod = 0;
	if (!item) return 0;
	var comment = item.note;
	if(comment.match(/<decor_xmod:\s*(.*)?>/im)) decorXmod = Number(comment.match(/<decor_xmod:\s*(.*)?>/im)[1]);
	return decorXmod;
};
Game_System.prototype.getDecorYmod = function(item) {
	var decorYmod = 0;
	if (!item) return 0;
	var comment = item.note;
	if(comment.match(/<decor_ymod:\s*(.*)?>/im)) decorYmod = Number(comment.match(/<decor_ymod:\s*(.*)?>/im)[1]);
	return decorYmod;
};

Game_System.prototype.getDecorType = function(item) {
	var decorType = null;
	if (!item) return null;
	var comment = item.note;
	if(comment.match(/<decor_type:\s*(.*)?>/im)) var decorType = comment.match(/<decor_type:\s*(.*)?>/im)[1];
	return decorType;
};


Game_Interpreter.prototype.delete_this_event = function (){
	if (EST && EST.Event_Size) $gameMap.open_passability(this._eventId);
	$gameMap.delete_event(this._eventId);
};

var est_build_decor_game_party_initialize = Game_Party.prototype.initialize
Game_Party.prototype.initialize = function() {
	est_build_decor_game_party_initialize.call(this);
    this._decorType = null;
    this._savingStatus = null;
};

var est_build_decor_Window_EventItem_includes = Window_EventItem.prototype.includes;
Window_EventItem.prototype.includes = function(item) {
	if($gameParty._decorType && item && $gameSystem.getDecorType(item)){
	   return $gameParty._decorType.some(function(t){
	   	if(t.toUpperCase() == $gameSystem.getDecorType(item).toUpperCase()) {
	   		return true;
	   	}
		return false;
	   });
	}
	return est_build_decor_Window_EventItem_includes(this,item);
};

var est_build_decor_window_eventitem_onok = Window_EventItem.prototype.onOk
Window_EventItem.prototype.onOk = function() {
    est_build_decor_window_eventitem_onok.call(this);
    if ($gameParty._decorType)
    {
     $gameParty._savingStatus = $gameSystem.isMenuEnabled();
	 $gameMap._interpreter.addDecoration(0, $gameSystem._decorDel, $gameSystem._decorPosfix);
	 $gameParty._decorType = null;
	 $gameSystem._decorDel = null;
	 $gameSystem._decorPosfix = null;
    }
};

// //decor movement part

//disable player movement
var est_build_decor_game_player_moveByInput = Game_Player.prototype.moveByInput
Game_Player.prototype.moveByInput = function() {
 	if($gameSwitches.value(EST.Build_And_Decor.DecorMoveSwitchId) == true) return;	
	est_build_decor_game_player_moveByInput.call(this);
};

var est_build_decor_game_event_updateselfmovement = Game_Event.prototype.updateSelfMovement
Game_Event.prototype.updateSelfMovement = function() {
 	if($gameSwitches.value(EST.Build_And_Decor.DecorMoveSwitchId) == true) return;		
	est_build_decor_game_event_updateselfmovement.call(this);
};

Game_Interpreter.prototype.decor_move = function (selfSwitchEnd){
	if(selfSwitchEnd === undefined) selfSwitchEnd = true;
	$gameSwitches.setValue(EST.Build_And_Decor.DecorMoveSwitchId, true);
	this.wait(5);
	var ev = $gameMap._events[this._eventId];
	if (Input.isPressed('up')) this.decor_move_up(ev);
	if (Input.isPressed('down')) this.decor_move_down(ev);
	if (Input.isPressed('left')) this.decor_move_left(ev);
	if (Input.isPressed('right')) this.decor_move_right(ev);
	if (Input.isPressed('ok') && ev._decorMove) 
		     return this.decor_move_end(ev, selfSwitchEnd);
	if (Input.isPressed('cancel') && ev._decorMove) 
		     return this.decor_move_end(ev, selfSwitchEnd);
};

Game_Interpreter.prototype.decor_move_up = function (ev){
	SoundManager.playCursor();	
	ev.moveStraight(8);
	ev._decorMove = true;
};
Game_Interpreter.prototype.decor_move_down = function (ev){
	SoundManager.playCursor();	
	ev.moveStraight(2);
	ev._decorMove = true;
};
Game_Interpreter.prototype.decor_move_left = function (ev){
	SoundManager.playCursor();	
	ev.moveStraight(4);
	ev._decorMove = true;
};
Game_Interpreter.prototype.decor_move_right = function (ev){
	SoundManager.playCursor();	
	ev.moveStraight(6);
	ev._decorMove = true;
};

Game_Interpreter.prototype.decor_move_end = function (ev, selfSwitchEnd){
	if($gamePlayer.x == ev.x && $gamePlayer.y == ev.y) return SoundManager.playBuzzer();
	SoundManager.playOk();
	$gameSelfSwitches.setValue([this._mapId,this._eventId,EST.Build_And_Decor.selfSwitchId],selfSwitchEnd);
	$gameSwitches.setValue(EST.Build_And_Decor.DecorMoveSwitchId, false);
	ev._decorMove = false;
	ev.refresh();
};

var est_build_decor_game_system_issaveenabled = Game_System.prototype.isSaveEnabled
Game_System.prototype.isSaveEnabled = function() {
 	if($gameSwitches.value(EST.Build_And_Decor.DecorMoveSwitchId) == true) return false;		
	return est_build_decor_game_system_issaveenabled.call(this);
};

var est_build_decor_game_system_ismenuenabled = Game_System.prototype.isMenuEnabled
Game_System.prototype.isMenuEnabled = function() {
 	if($gameSwitches.value(EST.Build_And_Decor.DecorMoveSwitchId) == true) return false;		
    return est_build_decor_game_system_ismenuenabled.call(this);
};

var est_build_decor_game_event_init = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    est_build_decor_game_event_init.call(this, mapId, eventId);
    this._decorMove = false;
};


  var est_build_decor_GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    est_build_decor_GameInterpreter_pluginCommand.call(this, command, args);
     if (command.toUpperCase() === 'DECOR_SELECT') 
      {
        alert_msg = "wrong plugin command\nread the help in plugins manager"
      	try{
      	var type = args[0];
      	if (args[1] && args[1].toUpperCase() == 'NULL') var del = null;
      	if (args[1] && args[1].toUpperCase() == 'TRUE') var del = true;
      	if (args[1] && args[1].toUpperCase() == 'FALSE') var del = false;
      	if (args[2] && args[2].match(/\[(.*)\]/i)) var posfix = JSON.parse(args[2]);
      	this.decorSelect(type, del, posfix);
      	}
      	catch(err){window.alert(alert_message)};
      };
     if (command.toUpperCase() === 'REMOVE_DECOR') 
      {
        alert_msg = "wrong plugin command\nread the help in plugins manager"
      	try{
      	if (args[0]) var mastermap = Number(args[0]);
      	if (args[1]) var masteritem = Number(args[1]);
      	if (args[2]) var xmod = Number(args[2]);
      	if (args[3]) var ymod = Number(args[3]);
      	this.rmvDecoration(mastermap, masteritem, xmod, ymod)
      	}
      	catch(err){window.alert(alert_message)};
      };
     if (command.toUpperCase() === 'DECOR_MOVE') 
      {
        alert_msg = "wrong plugin command\nread the help in plugins manager"
      	try{
      	if (args[0] && args[0].toUpperCase() == 'TRUE') var selfSwitchEnd = true;
      	if (args[0] && args[0].toUpperCase() == 'FALSE') var selfSwitchEnd = false;
      	this.decor_move(selfSwitchEnd);
      	}
      	catch(err){window.alert(alert_message)};
      };
  };