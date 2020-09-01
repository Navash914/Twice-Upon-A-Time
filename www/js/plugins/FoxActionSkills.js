//=============================================================================
// FoxActionSkills
// by Fox536
// Creation Date: 11/4/2015  
// Last Update: 11/27/15
// FoxActionSkills.js
// Version: 1.1.1
//=============================================================================
  
 
/*:
 * @plugindesc Action Skills System
 * @author Fox536
 *
 * @param MPIconIndex
 * @desc The Index of the MP Icon
 * @default 165
 
 * @param TPIconIndex
 * @desc The Index of the MP Icon
 * @default 164
 
 * @param ShowBoth
 * @desc Whether the system should show both MP and TP or not. (default:true)
 * @default true
 
 * @param ShowTP
 * @desc Whether the system should show TP or not. (default:true)
 * @default true
 
 * @param SelfSwitchId
 * @desc The Index of the MP Icon
 * @default A
 
 * @param CursorFileName
 * @desc The name of the Cursor File
 * @default $Cursor
 
 * @param MainRegionCommonEvent
 * @desc The index of the Common Event to call when a region was hit with a skill
 * @default 1
 
 * @param GameVariableId_RegionId
 * @desc The index of the Game Variable that will be set to the RegionId while illiterating through the Region Ids
 * @default 1
 
 * @param GameVariableId_PointX
 * @desc The index of the Game Variable that will be set to the Point's X while illiterating through the Region Ids
 * @default 2
 
 * @param GameVariableId_PointY
 * @desc The index of the Game Variable that will be set to the Point's Y while illiterating through the Region Ids
 * @default 3
 
 * @param IsEnabled
 * @desc Whether the system should be enabled from the start or not
 * @default true
 
 * @param UseMPTPIcons
 * @desc Whether the system should use icons for MP and TP
 * @default true
 
 * @param OpenInterfaceButton
 * @desc The button to open the interface. (default: pageup)
 * @default pageup
 
 * @param HudIconId
 * @desc The Index of the Icon for the Hud Interface Button
 * @default 79
 
 * @param HudIconX
 * @desc The X Location of the Hud Interface Button (can be any script code)
 * @default Graphics.boxWidth - 32;
 
 * @param HudIconY
 * @desc The Y Location of the Hud Interface Button (can be any script code)
 * @default 0;
 
 
 * @help Allows the use of skills on the Map.
 *      
 *Plugin commands:
 *
 *Note Tags: Put this in the Skill's or Item's Note field
 * <FAS>
 * <FAS_RangeH:value>
 * <FAS_RangeV:value>
 * <FAS_Type:value>
 *
 * rangeH: the range to the left and right of the player's current facing.
 * rangeV: the range in front of the player.
 * the tags will even fit into one line now
 *
 *Note Tags: Put this in the Event's Note field
 * <FAS>
 *
 *Script Conditionals
 * ActionSkill.skillId == id
 * ActionSkill.itemId  == id
 *
 *Script Commands
 * ActionSkill.enable()  // enables the plugin
 * ActionSkill.disable() // disables the plugin
 
 *Plugin Commands (for those who can't click the script command button I guess lol)
 * FoxActionSkills enable
 * FoxActionSkills disable
 
 */
  
            
// Declare Global Array for API Methods, and Variables
var ActionSkill = {};

(function() {
	var parameters = PluginManager.parameters('FoxActionSkills');
	
	//----------------------------------------
	//{ System Variables
	var ActionSkillTag 			= "FAS";
	var ActionSkillTag_RangeH 	= ActionSkillTag + "_" + "RangeH";
	var ActionSkillTag_RangeV 	= ActionSkillTag + "_" + "RangeV";
	var ActionSkillTag_Type		= ActionSkillTag + "_" + "Type";
	
	// System API Variables
	ActionSkill.SystemActive = false;
	ActionSkill.skillId = -1;
	ActionSkill.itemId 	= -1;
	ActionSkill.AffectedRegionIds = {};
	
	var ActionSkill_isEnabled 		= (parameters.IsEnabled === 'true');
	var ActionSkill_UseMPTPIcons 	= (parameters.UseMPTPIcons === 'true');
	var ActionSkill_SelfSwitch 		= parameters.SelfSwitchId;
	var ActionSkill_MPIcon 			= parameters.MPIconIndex;
	var ActionSkill_TPIcon 			= parameters.TPIconIndex;
	var ActionSkill_ShowBoth 		= (parameters.ShowBoth === 'true');
	var ActionSkill_ShowTP 			= (parameters.ShowTP === 'true');
	var ActionSkill_CursorFileName 	= parameters.CursorFileName;
	var ActionSkill_InterfaceButton = parameters.OpenInterfaceButton;
	
	var ActionSkill_HudIconId 		= parameters.HudIconId;
	var ActionSkill_HudIconX 		= parameters.HudIconX;
	var ActionSkill_HudIconY 		= parameters.HudIconY;
	
	
	// Parameters - System Variables
	var System_RegionIdVariable = parameters.GameVariableId_RegionId;
	var System_RegionXVariable  = parameters.GameVariableId_PointX;
	var System_RegionYVariable  = parameters.GameVariableId_PointY;
	var MainRegionCommonEvent 	= parameters.MainRegionCommonEvent;
	
	
	var ActionSkill_MainTarget = null;
	var ActionSkill_ActiveAnimationObject = null;
	
	var ActionSkill_State  = 0;
	
	var ActionSkill_Open_Window_Party = false;
	var ActionSkill_Open_Window_ConfirmPrompt = false;
	
	var ActionSkill_TargetCharacterObjects = [];
	var ActionSkill_Actors = [];
	
	
	//}
	//----------------------------------------
	
	//----------------------------------------
	//{ Plugin Commands
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'FoxActionSkills' && args[0] === 'enable') {
			ActionSkill.enable();
        } else if (command === 'FoxActionSkills' && args[0] === 'disable') {
			ActionSkill.disable();
        }
    };
	//}
	//----------------------------------------
	
	//----------------------------------------
	//{ Utility
	
	//{ Utility - Tag Functions 
	//  Utility - Tag Functions - Checks if tag is present in item
	function TagCheck(item, tag) {
		if (item == null) {
			return false;
		}
		return MVC.getProp(item.meta, tag);
	}
	//  Utility - Tag Functions - Gets tag Data from item
	function GetTagData(item, tag) {
		if (!TagCheck(item, tag)) {
			return -1;
		} else if (item == null) {
			return -1;
		}
		var value = MVC.getProp(item.meta, tag);
		if (!value) {
			return -1;
		}
		return value;
	}
	//}
	
	//{ Utility - Debug Functions
	var ActionSkill_CodeReminder = false;
	var CodeReminders = function(str) {
		if (ActionSkill_CodeReminder) {
			console.log("%c CodeReminder: " + str, 'color: #0000FF');
		}
	}
	var ActionSkill_Debug = false;
	var Debug = function(str) {
		if (ActionSkill_Debug) {
			console.log("%c Debug: " + str, 'color: #009900');
		}
	}
	//}
	//}
	//----------------------------------------
	
	//----------------------------------------
	//{ Local Functions
	//  Local Functions - Gets the Data from the skill Tags
	function ActionSkill_GetSkillRange(item) {
		//if (item.isSkill())
		if (TagCheck(item, ActionSkillTag)) {
			// Get Range Data
			var rangeData = [];
			rangeData.rangeH = GetTagData(item, ActionSkillTag_RangeH);
			rangeData.rangeV = GetTagData(item, ActionSkillTag_RangeV);
			rangeData.rangeType = GetTagData(item, ActionSkillTag_Type);
			
			return rangeData;
		}
	}
	
	//  Local Functions - Gets the Affected Range of the skill using the Range Data
	function ActionSkill_GetAffectedRange(rangeData, direction) {
		if (typeof rangeData ==  'undefined' || typeof rangeData.rangeType ==  'undefined' || rangeData.rangeType == -1) {
			Debug("Invalid Skill Range Type!");
			return [];
		}
			
		// Type: 0
		// Line
		if (rangeData.rangeType == 0) {
			var rangeArray = [];
			// Start 1 tile Away from Player
			if (direction == 2) {
				// for Down x has to be odd
				if (rangeData.rangeH % 2 == 0) {
					rangeData.rangeH -= 1;
				}
				if (rangeData.rangeH > 1) {
					for (var x = -(rangeData.rangeH-1)/2; x <= (rangeData.rangeH-1)/2; x++) { 
						for (var y = 0; y < rangeData.rangeV; y++) { 
							rangeArray.push([x, y+1]);
						}
					}
				}
				else {
					var x = 0;
					for (var y = 0; y < rangeData.rangeV; y++) { 
						rangeArray.push([x, y+1]);
					}
				}
				
			} else if (direction == 4) {
				// for Left y has to be odd
				if (rangeData.rangeH % 2 == 0) {
					rangeData.rangeH -= 1;
				}
				if (rangeData.rangeH > 1) {
					for (var y = -(rangeData.rangeH-1)/2; y <= (rangeData.rangeH-1)/2; y++) { 
						for (var x = 0; x < rangeData.rangeV; x++) { 
							rangeArray.push([-x-1, y]);
						}
					}
				}
				else {
					var y = 0;
					for (var x = 0; x < rangeData.rangeV; x++) { 
						rangeArray.push([-x-1, y]);
					}
				}
				
			} else if (direction == 6) {
				// for Right y has to be odd
				if (rangeData.rangeH % 2 == 0) {
					rangeData.rangeH -= 1;
				}
				if (rangeData.rangeH > 1) {
					for (var y = -(rangeData.rangeH-1)/2; y <= (rangeData.rangeH-1)/2; y++) { 
						for (var x = 0; x < rangeData.rangeV; x++) { 
							rangeArray.push([x+1, y]);
						}
					}
				}
				else {
					var y = 0;
					for (var x = 0; x < rangeData.rangeV; x++) { 
						rangeArray.push([x+1, y]);
					}
				}
				
			} else if (direction == 8) {
				// for Up x has to be odd
				if (rangeData.rangeH % 2 == 0) {
					rangeData.rangeH -= 1;
				}
				if (rangeData.rangeH > 1) {
					for (var x = -(rangeData.rangeH-1)/2; x <= (rangeData.rangeH-1)/2; x++) { 
						for (var y = 0; y < rangeData.rangeV; y++) { 
							rangeArray.push([x, -y-1]);
						}
					}
				}
				else {
					var x = 0;
					for (var y = 0; y < rangeData.rangeV; y++) { 
						rangeArray.push([x, -y-1]);
					}
				}
			}
			
			return rangeArray;
		}
		
		// Type: 1
		// Triangle
		if (rangeData.rangeType == 1) {
			Debug("Triangle");
			Debug("Not supported yet!");
			Debug("aborted!");
			
			
		}
		
		// Type: 2
		// Circle
		if (rangeData.rangeType == 2) {
			Debug("Circle");
			Debug("Not supported yet!");
			Debug("aborted!");
			
		}
		
	}

	//  Local Functions - Adjusts the Range Array based on Current map Location
	function ActionSkill_AdjustRangeArray(mapX, mapY, rangeArray) {
		if (typeof rangeArray == 'undefined') {
			return [];
		}
		for (var i = 0; i < rangeArray.length; i++) {
			rangeArray[i][0] = rangeArray[i][0] + mapX;
			rangeArray[i][1] = rangeArray[i][1] + mapY;
		}
		
		return rangeArray;
	}
	
	//  Local Functions - Gets any Affected Events in the RangeArray
	function ActionSkill_GetAffectedEvents(rangeArray) {
		// Create Array for EventIds
		var eventIds = [];
		// Loop through RangeArray
		for (var i = 0; i < rangeArray.length; i++) {
			// Check for event at Specified Location
			var event = $gameMap.eventsXy(rangeArray[i][0], rangeArray[i][1])[0];
			// Check if Event Exists
			if (typeof event !== 'undefined') {
				// Set Event to the $DataEvent, to read Note Data
				event = $dataMap.events[event.eventId()];
				// Check if NoteData has Tag
				if (TagCheck(event, ActionSkillTag)) {
					// Add EventId to the EventIds
					eventIds.push(event.id);
				}
			}
		}
		// Return the EventIds
		return eventIds;
	}
	
	//  Local Functions - Gets the Affected Region Ids
	function ActionSkill_GetAffectedRegions(rangeArray) {
		var regionIds = {};
		for (var i = 0; i < rangeArray.length; i++) {
			var regionId = $gameMap.regionId(rangeArray[i][0], rangeArray[i][1]);
			if (regionId >= 0) {
				regionIds[regionId] = regionIds[regionId] || [];
				regionIds[regionId].push([rangeArray[i][0], rangeArray[i][1]]);
			}
		}
		
		return regionIds;
	}
	
	//  Local Functions - Get Action Skills
	function ActionSkill_GetActionSkills() {
		var ActiveMembersArr = $gameParty.battleMembers();
		var ActiveMembersSkills = [];
		for (var i = 0; i < ActiveMembersArr.length; i++) { 
			// Check all Active Party Members
			for (var j = 0; j < ActiveMembersArr[i]._skills.length; j++) { 
				var skill = $dataSkills[ActiveMembersArr[i]._skills[j]];
				// Tag Check for any usable Skills
				if (TagCheck(skill, ActionSkillTag)) {
					if (!ActiveMembersSkills.contains($dataSkills[ActiveMembersArr[i]._skills[j]]))
						ActiveMembersSkills.push($dataSkills[ActiveMembersArr[i]._skills[j]]);
				}
			}
		}
		
		// Return the Skills found
		return ActiveMembersSkills;
	}
	
	function ActionSkill_GetActionItems() {
		var activeItems = [];
		var items = $gameParty.items();
		for (var i = 0; i < items.length; i++) { 
			var item = $dataItems[items[i].id];
			// Tag Check for any usable Skills
			if (TagCheck(item, ActionSkillTag)) {
				if (!activeItems.contains(items[i]))
					activeItems.push(items[i]);
			}
		}
		
		return activeItems;
	}
	
	function ActionSkill_GetActionSkillsAndItems() {
		var skills = ActionSkill_GetActionSkills();
		var items = ActionSkill_GetActionItems();
		var both = skills.concat(items);
		return both;
	}
	
	//  Local Functions - Generates the Range Array (Needs Cleaning)
	function ActionSkill_GetRangeArray(mapX, mapY, direction, skillId) {
		// Clear old Targets
		ActionSkill_ClearTargets();
		
		// Check Skill Range
		var rangeData 	= ActionSkill_GetSkillRange(skillId);
		
		// Get Range Array
		var rangeArray = ActionSkill_GetAffectedRange(rangeData, direction);
		
		// Adjust the Range Array based on the player's location
		rangeArray = ActionSkill_AdjustRangeArray(mapX, mapY, rangeArray);
		
		// Get EventIds
		var eventIds = ActionSkill_GetAffectedEvents(rangeArray);
		
		// Set RegionIds Info
		ActionSkill.AffectedRegionIds = ActionSkill_GetAffectedRegions(rangeArray);
		
		// Store rangeArray for later use
		ActionSkill.RangeArray = rangeArray;
		
		// Store eventIds for later use
		ActionSkill.EventIds = eventIds;
		
		// Show the Targets (Target Area)
		ActionSkill_ShowTargets(rangeArray);
	}
	
	//  Local Functions - Plays the Action Skill's Animation (Needs Cleaning)
	function ActionSkill_PlaySkillAnimation() {
		var rangeArray = ActionSkill.RangeArray;
		var skillId = ActionSkill.skillId;
		
		var rangeData = [];
			rangeData.rangeH = 1
			rangeData.rangeV = 1
			rangeData.rangeType = 0
		var point = ActionSkill_GetAffectedRange(rangeData, $gamePlayer.direction());
		point = ActionSkill_AdjustRangeArray($gamePlayer._x, $gamePlayer._y, point)
		
		// Hide Targets
		ActionSkill_SetTargets_Hidden();
		
		ActionSkill_MainTarget[1].show();
		
		GetPlayerDirectionLocation($gamePlayer.direction());
		var animation = $dataAnimations[ActionSkill.item.animationId];
		ActionSkill_MainTarget[1].startAnimation(animation, false, 0);
		ActionSkill_ActiveAnimationObject = ActionSkill_MainTarget[1];
		
		ActionSkill_SetState(5);
		
		return;
		
	}
	
	//  Local Functions - Uses the Action Skill
	function ActionSkill_UseSkill() {
		// Get EventIds
		var eventIds = ActionSkill.EventIds;
		// Loop through EventIds
		for (var i = 0; i < eventIds.length; i++) {
			// Turn on Event's Selfswitch
			$gameSelfSwitches.setValue([$gameMap.mapId(), eventIds[i], ActionSkill_SelfSwitch], true);
		}
		
		// Use the Resource, from the selected Party Member
		var item = ActionSkill.item;
		if (DataManager.isItem(item)) {
			$gameParty.loseItem(item, 1);
		} else if (DataManager.isSkill(item)) {
			ActionSkill_Actors[ActionSkill.Window_Party.index()].paySkillCost(item);
		}
		
		ActionSkill_SetState(0);
		
		
		// Call Region Common Event
		$gameTemp.reserveCommonEvent(MainRegionCommonEvent);
		
		// Allow Player to move again
		ActionSkill.CloseInterface();
	}
	
	//{ Local Functions - Targetting Functions
	
	// Shows the Current Targets
	function ActionSkill_ShowTargets(rangeArray) {
		// Clear Old Targets
		ActionSkill_ClearTargets();
		
		// Create Targets as necessary
		if (ActionSkill_TargetCharacterObjects.length < rangeArray.length) {
			for (var i = ActionSkill_TargetCharacterObjects.length; i < rangeArray.length; i++) {
				ActionSkill_TargetCharacterObjects[i] = ActionSkill_CreateTarget(0, 0);
			}
		}
		
		// Show Targets
		for (var i = 0; i < rangeArray.length; i++) {
			var x = rangeArray[i][0];
			var y = rangeArray[i][1];
			
			var character = ActionSkill_TargetCharacterObjects[i][0];
			var sprite = ActionSkill_TargetCharacterObjects[i][1];
			
			// Update Position and Animation
			character.setPosition(x, y);
			character.straighten()
			character.update();
			
			// Add Object to the Update Array
			Scene_Map.addUpdatableObject(ActionSkill_TargetCharacterObjects[i]);
			SceneManager._scene.addChild(sprite);
			
			// Show Sprite
			sprite.show()// = true;
		}	
	}
	
	// Clears the Current Targets
	function ActionSkill_ClearTargets(affectCursor) {
		// Loop through All Targets and remove them
		for (var i = 0; i < ActionSkill_TargetCharacterObjects.length; i++) {
			var character = ActionSkill_TargetCharacterObjects[i][0];
			var sprite = ActionSkill_TargetCharacterObjects[i][1];
			
			// Remove Character from Update Array
			Scene_Map.removeUpdatableObject(ActionSkill_TargetCharacterObjects[i]);
			// Remove Sprite from Scene
			SceneManager._scene.removeChild(sprite);
			// Set Sprite to invisible
			sprite.hide()// = false;
		}
		if (affectCursor) {
			// Remove Character from Update Array
			Scene_Map.removeUpdatableObject(ActionSkill_MainTarget[0]);
			// Remove Sprite from Scene
			SceneManager._scene.removeChild(ActionSkill_MainTarget[1]);
			// Set Sprite to invisible
			ActionSkill_MainTarget[1].hide()// = false;
		}
	}
	
	// Updates Current Targets
	function ActionSkill_UpdateTargets() {
		// Clear Old Targets
		ActionSkill_ClearTargets();
		
		// Get new Target Point 
		var playerX = $gamePlayer._x;
		var playerY = $gamePlayer._y;
		
		// Get skillId
		//var skillId = ActionSkill.skillId;
		var item = ActionSkill.item;
		
		// Get Direction
		direction = $gamePlayer.direction();
		
		// Sets the target Array and calls ActionSkill_ShowTargets
		ActionSkill_GetRangeArray(playerX, playerY, direction, item);
	}
	
	// Creates Target Characters and Sprites
	function ActionSkill_CreateTarget(mapX, mapY) {
		// Create Character
		var gameCharacter = new Game_Character();
		
		// Setup Character
		gameCharacter.setImage(ActionSkill_CursorFileName, 0);
		gameCharacter.setPosition(mapX, mapY);
		gameCharacter.setStepAnime(true);
		gameCharacter.setMoveSpeed(3);
		gameCharacter.setMoveFrequency(3);
		
		// Create Sprite
		var sprite = new Sprite_Character(gameCharacter);
		
		// Return the Created Character and Sprite
		return [gameCharacter, sprite];
	}
	
	//{ Local Functions - Target Graphics Functions
	function ActionSkill_SetTargets_Normal(affectCursor) {
		// Loop through Target Objects
		if (!affectCursor) {
			for (var i = 0; i < ActionSkill_TargetCharacterObjects.length; i++) { 
				var obj = ActionSkill_TargetCharacterObjects[i];
				// Set Direction to Normal
				obj[0].setDirection(2);
			}
		}
		ActionSkill_MainTarget[0].setDirection(2);
	}
	function ActionSkill_SetTargets_Flash(affectCursor) {
		// Loop through Target Objects
		if (!affectCursor) {
			for (var i = 0; i < ActionSkill_TargetCharacterObjects.length; i++) { 
				var obj = ActionSkill_TargetCharacterObjects[i];
				// Set Direction to Flashing
				obj[0].setDirection(4);
			}
		}
		ActionSkill_MainTarget[0].setDirection(4);
	}
	function ActionSkill_SetTargets_Highlight(affectCursor) {
		// Loop through Target Objects
		if (!affectCursor) {
			for (var i = 0; i < ActionSkill_TargetCharacterObjects.length; i++) { 
				var obj = ActionSkill_TargetCharacterObjects[i];
				// Set Direction to Highlight
				obj[0].setDirection(6);
			}
		}
		ActionSkill_MainTarget[0].setDirection(6);
	}
	function ActionSkill_SetTargets_Hidden() {
		// Loop through Target Objects
		for (var i = 0; i < ActionSkill_TargetCharacterObjects.length; i++) { 
			var obj = ActionSkill_TargetCharacterObjects[i];
			// Set Direction to Hidden
			obj[0].setDirection(8);
		}
		ActionSkill_MainTarget[0].setDirection(8);
	}
	//}
	
	//}
	
	//----------------------------------------
	//{ Local Functions - Highlight Functions
	//----------------------------------------
	//  Local Functions - Update the Target to directly in front of player.
	function GetPlayerDirectionLocation(direction) {
		var newDirection;
		if (typeof direction == 'undefined') {
			return;
		} else if (direction == 0) {
			return;
		} else {
			newDirection = direction;
		}
		var rangeData = [];
			rangeData.rangeH = 1
			rangeData.rangeV = 1
			rangeData.rangeType = 0
		var point = ActionSkill_GetAffectedRange(rangeData, newDirection);
		point = ActionSkill_AdjustRangeArray($gamePlayer._x, $gamePlayer._y, point)
		
		// Update Position and Animation
		ActionSkill_MainTarget[0].setPosition(point[0][0], point[0][1]);
	}
	
	//  Local Functions - Get the Direction of the Mouse (Either the Clicked, or the hover Position)
	function ActionSkill_TouchInput_GetDirection(notTrigger) {
		var mouseX = TouchInput.x;
		var mouseY = TouchInput.y;
		if (notTrigger) {
			var mousePos = GetMousePosition();
			mouseX = mousePos[0];
			mouseY = mousePos[1];
		}
		
		// Down
		if (($gamePlayer.screenX()-24 < mouseX && mouseX < $gamePlayer.screenX() + 24) && ($gamePlayer.screenY() < mouseY && $gamePlayer.screenY() + 48 > mouseY)) {
			return 2;
			
		// Left
		} else if (($gamePlayer.screenY()-48 < mouseY && mouseY < $gamePlayer.screenY()) && ($gamePlayer.screenX()-24 > mouseX && $gamePlayer.screenX() - 24 - 48 < mouseX)) {
			return 4;
			
		// Right
		} else if (($gamePlayer.screenY()-48 < mouseY && mouseY < $gamePlayer.screenY()) && ($gamePlayer.screenX() +24 < mouseX && $gamePlayer.screenX() + 24 + 48 > mouseX)) {
			return 6;
			
		// Up
		} else if (($gamePlayer.screenX()-24 < mouseX && mouseX < $gamePlayer.screenX() + 24) && ($gamePlayer.screenY() - 48 > mouseY && $gamePlayer.screenY() - 48 - 48 < mouseY)) {
			return 8;
			
		// None
		} else {
			return 0;
		}
	}
	
	//  Local Functions - Handles the Target Choice Update
	function ActionSkill_TouchInput_TargetUpdate() {
		// Get newDirection
		var newDirection = ActionSkill_TouchInput_GetDirection();
		// Make sure that newDirection is a valid Direction
		if (newDirection > 0) {
			// if direciton equals newDirection
			if ($gamePlayer.direction() == newDirection)
				// Change State
				ActionSkill_TargetChoosen();
			else {
				// Turn Player
				$gamePlayer.setDirection(newDirection);
				// Update Targets
				ActionSkill_UpdateTargets();
			}
		}
	}
	
	//  Local Functions - Handles the Highlight of the Cursor
	function ActionSkill_TouchInput_UpdateTargetState(oldState, highlightCurrent) {
		var touchDirection = ActionSkill_TouchInput_GetDirection(true);
		GetPlayerDirectionLocation(touchDirection);
		if (touchDirection > 0) {
			ActionSkill_MainTarget[1].show()// = true;
			if (touchDirection == $gamePlayer.direction()) {
				ActionSkill_MainTarget[1].hide()// = false;
				if (highlightCurrent) {
					// Set Targets to Highlight State
					ActionSkill_SetTargets_Highlight();
				}
			} else {
				// Show Highlight Cursor
				ActionSkill_SetTargets_Highlight(true);
				
			}
		} else {
			// Set Targets to Flashing State
			if (oldState == "flashing") {
				ActionSkill_SetTargets_Flash();
			// Set Targets to Normal State
			} else {
				ActionSkill_SetTargets_Normal();
			}
			ActionSkill_MainTarget[1].hide()// = false;
		}
	}
	
	//  Local Functions - Handles the Event of Choosing the Target Location
	function ActionSkill_TargetChoosen() {
		if (!ActionSkill.Window_Party.active && ActionSkill_State == 2) {
			
			if (ActionSkill.itemId > 1) {
				// Set the System State
				ActionSkill_SetState(4);
			} else {
				// Set the System State
				ActionSkill_SetState(3);
			}
		}
	}
	//}
	//----------------------------------------
	
	
	//}
	//----------------------------------------
	
	//----------------------------------------
	//{ Window Functions
	//----------------------------------------	
	//  Window Functions - Creates System Windows
	function ActionSkill_CreateWindows() {
		//-------------------------------
		//{ Create Description Window
		ActionSkill.Window_Description = Create_Window(ActionSkill.Window_Description, 0, 0);
		
		// Get Position Info
		var height 	= 100;
		var width 	= Graphics.boxWidth;
		var ypos 	= Graphics.boxHeight - height;
		
		// Set x, y, width, height
		ActionSkill.Window_Description.move(0, ypos, width, height);
		// Setup Window.Contents
		ActionSkill.Window_Description.createContents();
		
		// Set Window Info
		ActionSkill.Window_Description.drawText("\\I[1] Description", 0, 0, 500, "left");
		ActionSkill.Window_Description.drawText("Description2", 0, 32, 500, "left");
		
		// Hide Window
		ActionSkill.Window_Description.hide();
		
		// Add Window to Scene
		Window_AddWindowsToScene(ActionSkill.Window_Description);
		//}
		//-------------------------------
		
		//-------------------------------
		//{ Create Window_Party
		ActionSkill.Window_Party = Create_SelectableWindow(ActionSkill.Window_Party, 0, 0);
		
		// Get Position Info
		var height 	= 250;
		var width   = 450;
		if (!ActionSkill_ShowBoth) {
			width = 330;
		} else if (ActionSkill_ShowTP) {
			width = 450;
		} else {
			width = 330;
		}
		var ypos 	= Graphics.boxHeight - height;
		
		// Set x, y, width, height
		ActionSkill.Window_Party.move(Graphics.boxWidth-width, 0, width, height);
		
		// Methods
		ActionSkill.Window_Party.lineHeight 	= Window_Party_LineHeight;
		ActionSkill.Window_Party.maxCols 		= Window_Party_MaxCols;
		ActionSkill.Window_Party.maxItems 		= Window_Party_MaxItems;
		ActionSkill.Window_Party.numVisibleRows = Window_Party_NumVisibleRows;
		
		// Handlers
		ActionSkill.Window_Party.setHandler('ok',  		Window_Party_InputHandler.bind(ActionSkill.Window_Party,  'ok'));
		ActionSkill.Window_Party.setHandler('cancel',  	Window_Party_InputHandler.bind(ActionSkill.Window_Party,  'cancel'));
		
		// Set to InActive
		ActionSkill.Window_Party.active = false;
		
		// Set Cursor Position
		ActionSkill.Window_Party.deselect();
		
		// Add Window to Scene
		Window_AddWindowsToScene(ActionSkill.Window_Party);
		//}
		//-------------------------------
		
		//-------------------------------
		//{ Create Window_SkillSelector
		ActionSkill.Window_SkillSelector = Create_CommandWindow(ActionSkill.Window_SkillSelector, 0, 0);
		
		// Get Position Info
		height = Graphics.boxHeight - ActionSkill.Window_Description.height;
		
		// Set Position
		ActionSkill.Window_SkillSelector.move(0, 0, 300, height)
		
		//{ Set the Method Overrides
		ActionSkill.Window_SkillSelector.makeCommandList 	= Window_SkillSelector_MakeCommandList;
		ActionSkill.Window_SkillSelector.processOk 			= Window_SkillSelector_ProcessOk;
		ActionSkill.Window_SkillSelector.drawItem 			= Window_SkillSelector_DrawItem;
		ActionSkill.Window_SkillSelector.addCommand 		= Window_SkillSelector_AddCommand
		//}
		
		//{ Custom Methods
		ActionSkill.Window_SkillSelector.suffix 			= Window_SkillSelector_Suffix
		ActionSkill.Window_SkillSelector.suffixIcon			= Window_SkillSelector_SuffixIcon
		ActionSkill.Window_SkillSelector.select 			= Window_SkillSelector_Select;
		//}
		
		// Update Cursor Position
		ActionSkill.Window_SkillSelector.select(0);
		
		// Set Active to false
		ActionSkill.Window_SkillSelector.active = false;
		
		// Hide Window
		ActionSkill.Window_SkillSelector.hide();
		
		// Add Window to Scene
		Window_AddWindowsToScene(ActionSkill.Window_SkillSelector);
		
		// Refresh the Window
		ActionSkill.Window_SkillSelector.refresh();
		//}
		//-------------------------------
		
		//-------------------------------
		//{ Create Window_ConfirmPrompt
		ActionSkill.Window_ConfirmPrompt = Create_CommandWindow(ActionSkill.Window_ConfirmPrompt, 0, 0);
		
		ActionSkill.Window_ConfirmPrompt.active = false;
		
		// Get Position Info
		var xpos = Graphics.boxWidth - 300;
		var ypos = Graphics.boxHeight - ActionSkill.Window_Description.height - 108;
		
		// Set Position
		ActionSkill.Window_ConfirmPrompt.move(xpos, ypos, 300, 108);
		
		//{ Set the Method Overrides
		ActionSkill.Window_ConfirmPrompt.makeCommandList 	= Window_ConfirmPrompt_MakeCommandList;
		ActionSkill.Window_ConfirmPrompt.processOk 			= Window_ConfirmPrompt_ProcessOk;
		//}
		
		// Update Cursor Position
		ActionSkill.Window_ConfirmPrompt.select(0);
		
		// Set Active to false
		ActionSkill.Window_ConfirmPrompt.active = false;
		
		// Hide Window
		ActionSkill.Window_ConfirmPrompt.hide();
		
		// Add Window to Scene
		Window_AddWindowsToScene(ActionSkill.Window_ConfirmPrompt);
		
		// Refresh the Window
		ActionSkill.Window_ConfirmPrompt.refresh();
		//}
		//-------------------------------
		
	}
	
	//----------------------------------------
	//{ Window Functions - Control Functions
	//----------------------------------------
	//  Window Functions - Hide All Windows
	function ActionSkill_HideAllWindows() {
		ActionSkill.Window_Description.hide();
		ActionSkill.Window_Party.hide();
		ActionSkill.Window_SkillSelector.hide();
		ActionSkill.Window_ConfirmPrompt.hide();
	}
	//  Window Functions - Deactivate All Windows
	function ActionSkill_DeactivateAllWindows() {
		ActionSkill.Window_Party.active = false;
		ActionSkill.Window_SkillSelector.active = false;
		ActionSkill.Window_ConfirmPrompt.active = false;
	}
	//}
	//----------------------------------------
	
	//----------------------------------------
	//{ Window Functions - Create, AddToScene, ect...
	//----------------------------------------
	//  Window Functions - Create Normal Window
	function Create_Window(self, x, y) {
		if (!self) {
			self = new Window_Base(x, y, 200, 200);
		}
		
		return self;
	}
	//  Window Functions - Create Command Window
	function Create_CommandWindow(self, x, y) {
		if (!self) {
			self = new Window_Command(x, y);
		}
		
		return self;
	}
	//  Window Functions - Create Selectable Window
	function Create_SelectableWindow(self, x, y) {
		if (!self) {
			self = new Window_Selectable(x, y, 200, 200);
		}
		
		return self;
	}
	//  Window Functions - Adds Window to Scene but only once
	function Window_AddWindowsToScene(item) {
		if (!SceneManager._scene._windowLayer.children.contains(item)) {
			SceneManager._scene.addWindow(item);
		}
	}
	//}
	//----------------------------------------
	
	//----------------------------------------
	//{ Window Function - Overrides
	
	//{ Window_SkillSelector Methods & Handlers
	//  Commands & Input
	function Window_SkillSelector_MakeCommandList() {
		var ActionSkillIds = ActionSkill_GetActionSkills();
		
		for (var i = 0; i < ActionSkillIds.length; i++) { 
			var name = ActionSkillIds[i].name;
			var suffix 		= "";
			var suffixIcon 	= null;
			if (ActionSkill_UseMPTPIcons) {
				if (ActionSkillIds[i].mpCost > 0) {
					suffix = "" + ActionSkillIds[i].mpCost;
					suffixIcon = ActionSkill_MPIcon;
				} else if (ActionSkillIds[i].tpCost > 0) {
					suffix = "" + ActionSkillIds[i].tpCost;
					suffixIcon = ActionSkill_TPIcon;
				}
			} else {
				if (ActionSkillIds[i].mpCost > 0)
					suffix = ActionSkillIds[i].mpCost + " \\C[16]" + TextManager.mpA;
				else if (ActionSkillIds[i].tpCost > 0)
					suffix = ActionSkillIds[i].tpCost + " \\C[16]" + TextManager.tpA;
			}
			var iconId = ActionSkillIds[i].iconIndex;
			this.addCommand("\\I[" + iconId + "]" + name, ActionSkillIds[i], true, null, suffix, suffixIcon);
			this.setHandler(ActionSkillIds[i],  Window_SkillSelector_InputHandler.bind(this,  ActionSkillIds[i]));
		}
		
		var items = ActionSkill_GetActionItems();
		if (items.length > 0) {
			for (var i = 0; i < items.length; i++) { 
				var name = items[i].name;
				var iconId = items[i].iconIndex;
				var suffix = "x" + $gameParty.numItems(items[i]);
				this.addCommand("\\I[" + iconId + "]" + name, items[i], true, null, suffix, -1);
				this.setHandler(items[i],  Window_SkillSelector_InputHandler.bind(this,  items[i]));
				
			}
		}
	}
	function Window_SkillSelector_ProcessOk() {
		if (ActionSkill_Actors.length > 0) {
			this._lastCommandSymbol = this.currentSymbol();
			Window_Command.prototype.processOk.call(this);
			
		} else {
			// Activate Window
			this.active = true;
			// Play Buzzer Sound
			SoundManager.playBuzzer();
		}
	}
	function Window_SkillSelector_InputHandler(cmd) {
		if (ActionSkill_Actors.length > 0) {
			// Set the Skill Id for Later use
			//ActionSkill.skillId = cmd;
			
			// Set the System State
			ActionSkill_SetState(2);
			
		} else {
			// Activate Window
			this.active = true;
			// Play Buzzer Sound
			SoundManager.playBuzzer();
		}
	}
	
	//  Method Overrides
	function Window_SkillSelector_DrawItem(index) {
		var rect = this.itemRectForText(index);
		var align = this.itemTextAlign();
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		this.drawTextEx(this.commandName(index), rect.x, rect.y);
		var suffix = "";
		if (this.suffix(index)) {
			suffix = this.suffix(index);
			var offset = this.suffix(index).length * 14;
			if (this.suffixIcon(index) == -1) {
				//offset = 0;
			} else if (this.suffixIcon(index)) {
				suffix = this.suffix(index) + "\\I[" + this.suffixIcon(index) + "]";
				offset += 32
			} else {
				offset -= 14 * 6 + 7
			}
			this.drawTextEx(suffix, rect.width - offset, rect.y);
		}
	};
	function Window_SkillSelector_AddCommand(name, symbol, enabled, ext, suffix, suffixIcon) {
		if (enabled === undefined) {
			enabled = true;
		}
		if (ext === undefined) {
			ext = null;
		}
		this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext, suffix: suffix, suffixIcon: suffixIcon});
	};
	function Window_SkillSelector_Suffix(index) {
		return this._list[index].suffix;
	}
	function Window_SkillSelector_SuffixIcon(index) {
		return this._list[index].suffixIcon;
	}
	
	// Update Hook for System Windows
	function Window_SkillSelector_Select(index) {
		this._index = index;
		this._stayCount = 0;
		this.ensureCursorVisible();
		this.updateCursor();
		this.callUpdateHelp();
		
		// Added for Target Update
		var items = ActionSkill_GetActionSkillsAndItems();
		if (items !== []) {
			var item = items[index];
			ActionSkill_GetRangeArray($gamePlayer._x, $gamePlayer._y, $gamePlayer.direction(), item);
			ActionSkill.item = item;
			
			if (DataManager.isSkill(item)) {
				ActionSkill.itemId = -1;
				ActionSkill.skillId = item.id;
				ActionSkill.Window_Party.show();
			} else if (DataManager.isItem(item)) {
				ActionSkill.itemId = item.id;
				ActionSkill.skillId = -1;
				ActionSkill.Window_Party.hide();
			}
			
		}
		
		
		// Add Window Update Method
		ActionSkill_Update_Window_Description.call(ActionSkill.Window_Description, index)
		ActionSkill_Update_Window_Party.call(ActionSkill.Window_Party)
	};
	//}
	
	//{ Window_ConfirmPrompt_name
	//  Commands & Input
	function Window_ConfirmPrompt_MakeCommandList() {
		this.addCommand("Ok", 		'ok', 		true);
		this.addCommand("Cancel", 	'cancel', 	true);
		
		this.setHandler('ok',  		Window_ConfirmPrompt_InputHandler.bind(this, 'ok'));
		this.setHandler('cancel',  	Window_ConfirmPrompt_InputHandler.bind(this, 'cancel'));
	};
	function Window_ConfirmPrompt_ProcessOk() {
		this._lastCommandSymbol = this.currentSymbol();
		Window_Command.prototype.processOk.call(this);
	};
	function Window_ConfirmPrompt_InputHandler(cmd) {
		if (cmd == 'ok') {
			// Set the System State
			ActionSkill_SetState(5);
			// Play Animation of the used Skill
			ActionSkill_PlaySkillAnimation();
		} else {
			if (ActionSkill.itemId > 1) {
				// Set the System State
				ActionSkill_SetState(2);
			} else {
				// Set the System State
				ActionSkill_SetState(3);
			}
		}
	}
	//}
	
	//{ Window_Party Methods & Handlers
	//  Methods
	function Window_Party_LineHeight() {
		return 54;
	};
	function Window_Party_MaxCols() {
		return 1;
	};
	function Window_Party_MaxItems() {
		return ActionSkill_Actors.length;
	};
	function Window_Party_NumVisibleRows() {
		return ActionSkill_Actors.length;
	};
	//  Handlers
	function Window_Party_InputHandler(cmd) {
		if (cmd == 'ok') {
			// Set the System State
			ActionSkill_SetState(4);
		} else {
			// Set the System State
			ActionSkill_SetState(2);
		}
	}
	//}
	
	//}
	//----------------------------------------
	
	
	ActionSkill.usableSkills = function() {
		return this.skills().filter(function(skill) {
			return ActionSkill.canUse.call(this, skill);
		}, this);
	};
	ActionSkill.canUse = function(item) {
		if (!item) {
			return false;
		} else if (DataManager.isSkill(item)) {
			return ActionSkill.meetsSkillConditions.call(this, item);
		} else if (DataManager.isItem(item)) {
			return ActionSkill.meetsItemConditions.call(this, item);
		} else {
			return false;
		}
	};
	ActionSkill.meetsSkillConditions = function(skill) {
		return (this.canMove() &&
				this.isSkillWtypeOk(skill) && this.canPaySkillCost(skill) &&
				!this.isSkillSealed(skill.id) && !this.isSkillTypeSealed(skill.stypeId));
	};
	ActionSkill.meetsItemConditions = function(item) {
		return (this.canMove() && $gameParty.hasItem(item));
	};

	//----------------------------------------
	//{ Window Function - Update Windows
	//----------------------------------------
	function ActionSkill_Update_Window_Description(index) {
		// Clear Window
		this.contents.clear();
		
		// Get SkillId
		var skillId = 1;
		var item
		if (typeof index !== 'undefined') {
			 item = ActionSkill_GetActionSkillsAndItems()[index];
		} else {
			
		}
		
		if (typeof item == 'undefined') {
			return;
		}
		
		// Get Window Data
		var skillName 			= "{Skill.Name}";
		var skillDescription 	= "{Skill.description}";
		var skillName 			= item.name;
		var skillDescription 	= item.description;
		var skillIcon 			= item.iconIndex;
		var skillCost 			= "";
		var skillCostIcon		= "";
		if (DataManager.isSkill(item)) {
			if (item.mpCost > 0) {
				skillCost 		= "" + item.mpCost;
				if (ActionSkill_UseMPTPIcons) {
					skillCostIcon 	= "\\I[" + ActionSkill_MPIcon + "]";
				} else {
					skillCostIcon 	= " \\C[16]" + TextManager.mpA;
				}
				
			} else if (item.tpCost > 0) {
				skillCost 		= "" + item.tpCost;
				if (ActionSkill_UseMPTPIcons) {
					skillCostIcon 	= "\\I[" + ActionSkill_TPIcon + "]";
				} else {
					skillCostIcon 	= " \\C[16]" + TextManager.tpA
				}
				
			}
		}
		
		// Draw Text to the Window
		this.drawTextEx("\\I[" + skillIcon + "]" + skillName, 0,  0);
		this.drawText(skillDescription, 0, 32, this.width, "left");
		this.drawTextEx(skillCostIcon, this.contents.width - 42,  0);
		this.resetTextColor();
		this.drawText(skillCost, (this.contents.width - 42) - 100, 0, 100, "right");
	}
	function ActionSkill_Update_Window_Party() {
		// Set Window Info
		var ActiveMembersArr = $gameParty.battleMembers();
		var actors = []
		for (var i = 0; i < ActiveMembersArr.length; i++) { 
			var index = ActionSkill.Window_SkillSelector._index;
			var item = ActionSkill_GetActionSkillsAndItems()[index];
			if (DataManager.isSkill(item)) {
				if (ActionSkill.usableSkills.call(ActiveMembersArr[i]).contains(item)) {
					actors.push(ActiveMembersArr[i]);
				}
			} else if (DataManager.isItem(item)) {
				if (ActionSkill.canUse.call(ActiveMembersArr[i], item)) {
					actors.push(ActiveMembersArr[i]);
				}
			}
		}
		
		//ActionSkill.usableSkills.call(actor)
		
		if (actors.length > 0) {
			// Set Window Height
			this.height = actors.length * 54 + 32 + 10;
			
			if (!ActionSkill_ShowBoth) {
				var costType = GetCostType();
				if (costType == 0) {
					this.width = 210;
				} else {
					this.width = 330;
				}
			} else if (ActionSkill_ShowTP) {
				this.width = 450;
			} else {
				this.width = 330;
			}
			this.x = Graphics.boxWidth - this.width;
			// Setup Contents
			this.createContents();
			
			// Adjust Contents
			for (var i = 0; i < actors.length; i++) { 
				var actor = actors[i]
				// Draw Name
				this.drawText(actor._name, 52,  i * 53 + 2, 200, "left");
				// Draw Actor
				this.drawActorCharacter(actor, 24, i * 55 + 48);
				if (!ActionSkill_ShowBoth) {
					var costType = GetCostType();
					if (costType == 1) {
						this.drawActorMp(actor, 160, 0 + 54 * i - 12, 120);
					} else if (costType == 2) {
						this.drawActorTp(actor, 160, 0 + 54	* i - 12, 120);
					}
				} else {
					// Draw Actor's MP
					this.drawActorMp(actor, 160, 0 + 54 * i - 12, 120);
					if (ActionSkill_ShowTP) {
						// Draw Actor's TP
						this.drawActorTp(actor, 290, 0 + 54	* i - 12, 120);
					}
				}
			}
			
			// Set Cursor Position
			ActionSkill.Window_Party.deselect();
			
			
				
			
		} else if (ActionSkill_GetActionSkillsAndItems() == 0) {
			this.height = 96;
			this.createContents();
			this.drawText("You don't have any active skills or items." , 0,  4, 400, "left");
		} else {
			ActionSkill.Window_Party.deselect();
			this.height = 96;
			
			// Setup Contents
			this.createContents();
			
			var index = ActionSkill.Window_SkillSelector._index;
			var item = ActionSkill_GetActionSkillsAndItems()[index];
			
			var costName = "";
			if (DataManager.isSkill(item)) {
				// Draw
				if (item.mpCost > 0)
					costName = TextManager.mpA;
				else
					costName = TextManager.tpA;	
			}
			this.drawText("You don't have enough " + costName + " to use this skill." , 0,  4, 400, "left");
		}
		ActionSkill_Actors = actors;
	}
	//}
	//----------------------------------------
	//}
	//----------------------------------------
	
	function GetCostType() {
		var item = ActionSkill.item;
		if (DataManager.isSkill(item)) {
			if (item.mpCost > 0) {
				return 1;
			} else if (item.tpCost > 0) {
				return 2;
			}
		}
		return 0;
	}
	
	//----------------------------------------
	//{ System API
	//----------------------------------------
	//  System API - Opens the Skill Interface
	ActionSkill.OpenSkillInterface = function() {
		hud.hide();
		
		// Play Menu Sound
		SoundManager.playOk();
		
		// Set the Interface flag
		ActionSkill.SystemActive = true;
		
		// Create Cursor
		ActionSkill_MainTarget = ActionSkill_CreateTarget(0, 0);
		Scene_Map.addUpdatableObject(ActionSkill_MainTarget);
		SceneManager._scene.addChild(ActionSkill_MainTarget[1]);
		
		// Create System Windows
		ActionSkill_CreateWindows();
		
		// Set the System State
		ActionSkill_SetState(1);
	}
	//  System API - Closes the Skill Interface
	ActionSkill.CloseInterface = function() {
		// Hide Interface Windows
		ActionSkill.Window_Description.hide();
		ActionSkill.Window_SkillSelector.hide();
		ActionSkill.Window_ConfirmPrompt.hide();
		ActionSkill.Window_Party.hide();
		
		// Set Windows to InActive
		ActionSkill.Window_SkillSelector.active = false;
		ActionSkill.Window_ConfirmPrompt.active = false;
		
		// Set the Interface flag
		ActionSkill.SystemActive = false;
		
		// Clear the Targets
		ActionSkill_ClearTargets(true);
		
		// Set Targets to Normal
		ActionSkill_SetTargets_Normal();
		
		hud.show();
	}
	
	//  System API - Illiterates through the RegionIds Hash and sets gameVariables Accordingly
	ActionSkill.GetNextRegionSet = function() {
		var regionIds = ActionSkill.AffectedRegionIds;
		$gameVariables.setValue(System_RegionIdVariable, -1);
		for (var currentRegionId in regionIds) {
			$gameVariables.setValue(System_RegionIdVariable, Number(currentRegionId));
			var point = regionIds[currentRegionId].shift();
			
			$gameVariables.setValue(System_RegionXVariable, point[0]);
			$gameVariables.setValue(System_RegionYVariable, point[1]);
			
			if (regionIds[currentRegionId].length < 1) {
				delete regionIds[currentRegionId];
			} else {
				break;
			}
		}
	}
	
	ActionSkill.enable = function() {
		ActionSkill_isEnabled = true;
		hud.show();
	}
	ActionSkill.disable = function() {
		ActionSkill_isEnabled = false;
		hud.hide();
	}
	ActionSkill.IsEnabled = function() {
		return ActionSkill_isEnabled;
	}
	//}
	//----------------------------------------
	
	//----------------------------------------
	//{ Hooked Functions
	//----------------------------------------
	//{ Hooked Functions - Block Event Activation
	
	// Block Unwanted Events, during System Use
	ActionSkill.Game_Player_checkEventTriggerHereOriginal = Game_Player.prototype.checkEventTriggerHere;
	Game_Player.prototype.checkEventTriggerHere = function(triggers) { 
		// Run Special movement code while the Interface is Active
		if (ActionSkill.SystemActive) {
			// Code here
			return;
			
		} else {
			// Otherwise use the default code
			ActionSkill.Game_Player_checkEventTriggerHereOriginal.call(this, triggers);
		}
	}
	// Block Unwanted Events, during System Use
	ActionSkill.Game_Player_checkEventTriggerThereOriginal = Game_Player.prototype.checkEventTriggerThere;
	Game_Player.prototype.checkEventTriggerThere = function(triggers) { 
		// Run Special movement code while the Interface is Active
		if (ActionSkill.SystemActive) {
			// Code here
			return;
		} else {
			// Otherwise use the default code
			ActionSkill.Game_Player_checkEventTriggerThereOriginal.call(this, triggers);
		}
	}
	//-------------------------------------------------------------------------------
	//}
	
	//{ Hooked Functions - Block Movement
	ActionSkill.Game_Player_MoveByInputOriginal = Game_Player.prototype.moveByInput;
	Game_Player.prototype.moveByInput = function() { 
		// Run Special movement code while the Interface is Active
		if (ActionSkill.SystemActive) {
			var direction = this.getInputDirection();
			if (direction > 0) {
				if (ActionSkill_State == 2) {
					this.setDirection(direction);
					ActionSkill_UpdateTargets();
				} else if (ActionSkill_State == 3) {
					if (TouchInput.isTriggered()) {
						this.setDirection(direction);
						ActionSkill_UpdateTargets();
					}
				}
			}
		} else {
			if ((hud == null) || (!hud.isButtonTouched())) {
				// Otherwise use the default code
				ActionSkill.Game_Player_MoveByInputOriginal.call(this);
			}
		}
	}
	//}
	
	//{ Hooked Functions - Block Menu
	ActionSkill.Scene_Map_UpdateCallMenuOriginal = Scene_Map.prototype.updateCallMenu
	Scene_Map.prototype.updateCallMenu = function() {
		// Don't open Menu while the Interface is Active
		if (ActionSkill.SystemActive) {
			if ((ActionSkill_State == 4 && ActionSkill_Open_Window_ConfirmPrompt)) {
				ActionSkill.Window_ConfirmPrompt.active = true;
				ActionSkill_Open_Window_ConfirmPrompt = false;
			} else if (ActionSkill_State == 4 && !ActionSkill_Open_Window_ConfirmPrompt) {
				ActionSkill_Open_Window_ConfirmPrompt = true;
			} else if (ActionSkill_State == 3 && ActionSkill_Open_Window_Party) {
				ActionSkill.Window_Party.active = true;
				ActionSkill_Open_Window_Party = false;
			} else if (ActionSkill_State == 3 && !ActionSkill_Open_Window_Party) {
				ActionSkill_Open_Window_Party = true;
			}
			if (this.isMenuCalled()) {
				if (ActionSkill_State == 1) {
					// Close Interface
					ActionSkill.CloseInterface();
					// Play Cancel Sound
					SoundManager.playCancel();
					
				} else if (ActionSkill_State == 2) {
					// Set the System State
					ActionSkill_SetState(1);
					
					// Play Cancel Sound
					SoundManager.playCancel();
				}
			}
			return;
		} else {
			if (ActionSkill_isEnabled) {
				if (!$gamePlayer.isMoving() && Input.isTriggered(ActionSkill_InterfaceButton)) {
					ActionSkill.OpenSkillInterface();
				}
			}
				
		}
		
		if (this.isMenuCalled()) {
			hud.hide();
		}
		
		// Otherwise use the default code
		ActionSkill.Scene_Map_UpdateCallMenuOriginal.call(this);
	};
	//}
	
	//{ Hooked Functions - Get Confirm Button Triggered
	ActionSkill.Game_Player_TriggerActionOriginal = Game_Player.prototype.triggerAction;
	Game_Player.prototype.triggerAction = function() {
		if (ActionSkill.SystemActive) {
			if (ActionSkill_State == 1) {
				if (TouchInput.isTriggered()) {
					ActionSkill_TouchInput_TargetUpdate();
				}	
			} else if (ActionSkill_State == 2) {
				if (Input.isTriggered('ok'))
					ActionSkill_TargetChoosen();
				else if (TouchInput.isTriggered()) {
					ActionSkill_TouchInput_TargetUpdate();
				}
			} else if (ActionSkill_State == 3) {
				if (TouchInput.isTriggered()) {
					ActionSkill_TouchInput_TargetUpdate();
				}	
			}			
			// Disallow Event Triggers
			return false;
		}
		return ActionSkill.Game_Player_TriggerActionOriginal.call(this);
	}
	//}
	
	//{ Hooked Functions - Mouse Additions
	ActionSkill.TouchInput_onMouseMoveOrignal = TouchInput._onMouseMove;
	TouchInput._onMouseMove = function(event) {
		var x = Graphics.pageToCanvasX(event.pageX);
		var y = Graphics.pageToCanvasY(event.pageY);
		TouchInput.mouseCurrentPositionX = x;
		TouchInput.mouseCurrentPositionY = y;
		ActionSkill.TouchInput_onMouseMoveOrignal.call(this, event)
	};
	function GetMousePosition() {
		var x = TouchInput.mouseCurrentPositionX;
		var y = TouchInput.mouseCurrentPositionY;
		if (Graphics.isInsideCanvas(x, y)) {
			return [x, y];
		} else {
			return [-1, -1];
		}
	}
	//}

	//{ Hooked Functions - Updates the Targetting Sprites so they have Step Animation
	ActionSkill.Scene_MapUpdateOrignal = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		ActionSkill.Scene_MapUpdateOrignal.call(this);
		
		if (hud == null) {
			CreateHud();
		} else if (!SceneManager._scene.children.contains(hud)) {
			CreateHud();
		}
			
		
		if (ActionSkill.SystemActive) {
			// Print Debug State
			Debug(ActionSkill_State);
			
			if (typeof Scene_Map._objectsToUpdate === 'undefined')
				Scene_Map._objectsToUpdate = [];
			if (typeof Scene_Map._objectsToUpdate.length === 'undefined')
				Scene_Map._objectsToUpdate = [];
				
			for (var i = 0; i < Scene_Map._objectsToUpdate.length; i++) {
				if (Array.isArray(Scene_Map._objectsToUpdate[i])) {
					Scene_Map._objectsToUpdate[i][0].update();
				} else {
					Scene_Map._objectsToUpdate[i].update();
				}
				
			}
			
			// Clear Targets After Animation is Done
			if (ActionSkill_State == 5) {
				if (ActionSkill_ActiveAnimationObject) {
					if (!ActionSkill_ActiveAnimationObject.isAnimationPlaying()) {
						ActionSkill_ActiveAnimationObject = null;
						ActionSkill_UseSkill();
						ActionSkill_ClearTargets(true);
					}
				}
			}
			
			// check if mouse is over main target area
			if (ActionSkill_State == 1) {
				ActionSkill_TouchInput_UpdateTargetState("normal", false);
				
			} else if (ActionSkill_State == 2) {
				ActionSkill_TouchInput_UpdateTargetState("flashing", true);
				
			} else if (ActionSkill_State == 3) {
				ActionSkill_TouchInput_UpdateTargetState("normal", false);
				
			}
			
		}
	}
	// Added Methods - Adds a function Similar to addChild, used for Target Sprite Updating
	Scene_Map.addUpdatableObject = function(object) {
		if (typeof Scene_Map._objectsToUpdate === 'undefined')
			Scene_Map._objectsToUpdate = [];
		if (typeof Scene_Map._objectsToUpdate.length === 'undefined')
			Scene_Map._objectsToUpdate = [];
		
		Scene_Map._objectsToUpdate[Scene_Map._objectsToUpdate.length] = object;
	}
	// Added Methods - Adds a function Similar to the missing removeChild, used for Target Sprite Updating
	Scene_Map.removeUpdatableObject = function(object) {
		if (typeof Scene_Map._objectsToUpdate === 'undefined')
			Scene_Map._objectsToUpdate = [];
		if (typeof Scene_Map._objectsToUpdate.length === 'undefined')
			Scene_Map._objectsToUpdate = [];
		
		var i = Scene_Map._objectsToUpdate.indexOf(object);
		if(i != -1) {
			Scene_Map._objectsToUpdate.splice(i, 1);
		}
	}
	//}
	
	//}
	//----------------------------------------
	
	//----------------------------------------
	//{ SetState Functions
	//----------------------------------------
	//{ State Index
	// 0: InActive
	// 1: SkillChoice
	// 2: TargetChoice
	// 3: PartyChoice
	// 4: ConfirmChoice
	//} 5: Animation
	function ActionSkill_SetState(index) {
		// Set System State
		ActionSkill_State = index;
		switch(index) {
			case 1:
				ActionSkill_SetState_SkillChoice();
				break;
			case 2:
				ActionSkill_SetState_TargetChoice();
				break;
			case 3:
				ActionSkill_SetState_PartyChoice();
				break;
			case 4:
				ActionSkill_SetState_ConfirmChoice();
				break;
			case 5:
				ActionSkill_SetState_Animation();
				break;
			default:
				// Set System State
				ActionSkill_State = 0;
				// Close Interface
				ActionSkill.CloseInterface();
		}
	}
	function ActionSkill_SetState_SkillChoice() {
		// Hide All Windows
		ActionSkill_HideAllWindows();
		
		// Deactivate All Windows
		ActionSkill_DeactivateAllWindows();
		
		// Show Windows
		ActionSkill.Window_SkillSelector.show();
		ActionSkill.Window_Description.show();
		if (ActionSkill.itemId > 0) {
			ActionSkill.Window_Party.hide();
		} else {
			ActionSkill.Window_Party.show();
		}
				
		// Activate Window
		ActionSkill.Window_SkillSelector.active = true;
		
		// Set Cursor Index
		ActionSkill.Window_SkillSelector.select(0);
		ActionSkill.Window_Party.deselect();
		
		// Set Targets to Normal
		ActionSkill_SetTargets_Normal();
	}
	function ActionSkill_SetState_TargetChoice() {
		// Hide All Windows
		ActionSkill_HideAllWindows();
		
		// Deactivate All Windows
		ActionSkill_DeactivateAllWindows();
		
		// Show Windows
		ActionSkill.Window_Description.show();
		if (ActionSkill.itemId > 0) {
			ActionSkill.Window_Party.hide();
		} else {
			ActionSkill.Window_Party.show();
		}
		
		// Set Cursor Position
		ActionSkill.Window_Party.deselect();
		
		// Update Targets
		ActionSkill_UpdateTargets();
		
		// Flash Targets
		ActionSkill_SetTargets_Flash();
	}
	function ActionSkill_SetState_PartyChoice() {
		// Hide All Windows
		ActionSkill_HideAllWindows();
		
		// Deactivate All Windows
		ActionSkill_DeactivateAllWindows();
		
		// Show Windows
		ActionSkill.Window_Description.show();
		if (ActionSkill.itemId > 0) {
			ActionSkill.Window_Party.hide();
		} else {
			ActionSkill.Window_Party.show();
		}
		
		// Stop Target Flash
		ActionSkill_SetTargets_Normal();
		
		// Set Cursor Position
		ActionSkill.Window_Party.select(0);
	}
	function ActionSkill_SetState_ConfirmChoice() {
		// Hide All Windows
		ActionSkill_HideAllWindows();
		
		// Deactivate All Windows
		ActionSkill_DeactivateAllWindows();
		
		// Show Windows
		ActionSkill.Window_Description.show();
		if (ActionSkill.itemId > 0) {
			ActionSkill.Window_Party.hide();
		} else {
			ActionSkill.Window_Party.show();
		}
		ActionSkill.Window_ConfirmPrompt.show();
		
		// Activate Window
		ActionSkill.Window_ConfirmPrompt.active = false;
		
		// Set Cursor Index
		ActionSkill.Window_ConfirmPrompt.select(0);
		
		
	}
	function ActionSkill_SetState_Animation() {
		// Hide All Windows
		ActionSkill_HideAllWindows();
		
		// Deactivate All Windows
		ActionSkill_DeactivateAllWindows();
	}
	//}
	//----------------------------------------
	
	
	
	
	// Add Sprite here (Icon:79)
	function Hud_ClickedHandler() {
		ActionSkill.OpenSkillInterface();
	}
	
	var hud = null;
	function CreateHud() {
		// Create Sprite
		if (hud == null) {
			hud = new Sprite_Button();
		}
		hud.bitmap = Bitmap.load("img/system/iconset.png")
		
		hud.width = 64;
		hud.height = 32;
		
		var index = ActionSkill_HudIconId;
		var x = 32 * (index % 16)
		var y = 32 * Math.floor(index / 16);
		hud.setFrame(x, y, 32, 32)
		
		var getX = new Function('return '+ActionSkill_HudIconX+';');
		var getY = new Function('return '+ActionSkill_HudIconY+';');
		//x = Graphics.boxWidth - 32;
		//y = 0;
		//hud.move(ActionSkill_HudIconX, ActionSkill_HudIconY);
		hud.move(getX(), getY());
		
		hud.hide = Sprite_Base.prototype.hide;
		hud.show = Sprite_Base.prototype.show;
		hud.updateVisibility = Sprite_Base.prototype.updateVisibility;
		
		SceneManager._scene.addChild(hud);
		Scene_Map.addUpdatableObject(hud);
		
		hud.setClickHandler(Hud_ClickedHandler);
		
		if (ActionSkill_isEnabled) {
			hud.show();
		} else {
			hud.hide();
		}
		
	}
	
	
	
	
	
	
})();  // dont touch this.






