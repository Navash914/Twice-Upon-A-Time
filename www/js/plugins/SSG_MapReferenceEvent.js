//=============================================================================
// SSG_MapReferenceEvent.js
// Version 1.00
//=============================================================================

/*:
 * @plugindesc Map Reference Events
 * @author Heartbreak61
 * 
 * @param Reference Map ID
 * @desc Map ID used for storing reference events. Set -1 to disable this script.
 * @default -1
 * 
 * @help
 * ============================================================================
 * [Simple Stupid Gaming] Map Reverence Event
 * 
 * INTRODUCTION
 * I created this plugin based on Tsukihime's Reference Events for VX Ace.
 * This plugin allows you to create "reference events" on a specific map,
 * then re-use it on another map.
 * 
 * Lets say you have 10 similiar events that will trigger battle against
 * certain troop, then one day you decided to change their graphics or change
 * the troop. It will be time consuming to overwrite all of them, even with
 * copy-paste method. Using this plugin, you can create an event on your
 * "reference map" and have other 10 events referenced on that event. 
 * This way, you only have to modify single event, rather than 10 events.
 * 
 * HOW TO USE
 * Please specify your Reference Map ID by using this plugin parameter.
 * Reference map is a map where you store all reference events. After you've
 * Create your "real" event and put
 * 
 *  <ref_id:ID> where ID is your reference event's ID
 * 
 * At once your map is loaded, your "real" events will be replaced by the
 * reference event except for it's ID and location.
 *
 * PS: Sorry for my english.
 */

(function() {

	var parameters = PluginManager.parameters('SSG_MapReferenceEvent');
	var variableId = Number(parameters['Reference Map ID'] || -1);
	
	if (variableId < 1) return;
	
	var _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		_Scene_Boot_start.call(this);
		DataManager.setupReferenceMap(variableId);
	};
	
	DataManager.setupReferenceMap = function(id){
		var filename = 'Map%1.json'.format(id.padZero(3));
		DataManager.loadDataFile('$dataMapCache', filename);
	};
	
	var _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
	Game_Map.prototype.setupEvents = function(){
		this.setupRefEvent();
		_Game_Map_setupEvents.call(this);
	};
	
	Game_Map.prototype.setupRefEvent = function(){
		for (var i = 0; i < $dataMap.events.length; i++) {
			if ($dataMap.events[i]) {
				if (!(Object.keys($dataMap.events[i].meta).length === 0)) {
				var temp_x = $dataMap.events[i].x;
				var temp_y = $dataMap.events[i].y;
				var ref_ev = $dataMapCache.events[$dataMap.events[i].meta.ref_id];
				$dataMap.events[i] = JSON.parse(JSON.stringify(ref_ev));
				$dataMap.events[i].x = temp_x;
				$dataMap.events[i].y = temp_y;
				$dataMap.events[i].id = i;
				}
			}
		}
	};
	
})();