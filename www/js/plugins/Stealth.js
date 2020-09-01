//=============================================================================
// Stealth.js
//=============================================================================

/*:
 * @plugindesc Adds stealth detection (hearing and vision) to selected events.
 * @author whitesphere
 *
 * @param Base Visual Radius
 * @desc By default, how many tiles must separate the player from an Event
 * before the player cannot be seen/noticed at all, assuming the enemy Perception
 * equals the Actor's Stealth ability, and assuming the party is not Dashing.
 * @default 8
 *
 * @param Base Hearing Radius
 * @desc By default, how many tiles must separate the player from an Event
 * before the player cannot be heard at all, assuming the enemy Perception
 * equals the Actor' Stealth ability and assuming the party is not Dashing.
 * @default 6
 *
 * @param Visual Cone
 * @desc In degrees, how wide is the visual "cone."  If someone is outside that
 * cone, they cannot be seen (but they can still be heard)
 * @default 90
 *
 * @param Stealth Gauge
 * @desc If true, show a small window at the top center which indicates how close the
 * party is to being detected.
 * @default True
 *
 * @param Detection Cooldown
 * @desc After how many turns, assuming no further detections, will the
 * Actor be "forgotten" by the Events.  Set to 0 to never cooldown.
 * @default 10
 *
 * @param Default Stealth
 * @desc A numeric value used for any unspecified Actor's Stealth skill
 * as well as an enemy's Perception.  
 * @default 50
 *
 * @param Detection Variable
 * @desc Numeric value which identifies the Variable which will contain
 * the party's current Detection level.  The value of 0=Not detected.
 * higher values mean the player is more seen/heard.
 * @default 10
 *
 * @param Search Threshold
 * @desc When this search "score" is met or exceeded, an event will start
 * Searching for the players.  This sets Self Switch C on the event and turns
 * off Self Switch D.
 * @default 30
 *
 * @param Detection Threshold
 * @desc When this search "score" is met or exceeded, an event will 
 * have found the players.  This sets Self Switch D on the event and turns off
 * Self Switch C.
 * @default 60
 *
 * @param Noise Floor
 * @desc Moving players make at least this much noise when standing still.
 * This can be raised or lowered by modifiers.
 * @default 10
 *
 * @param Max Stealth Score
 * @desc This is the highest stealth score allowed.  Used to draw the gauge
 * as well as for internal stealth calculations.
 * @default 100
 *
 * @help To enable Stealth for a map, set the appropriate Stealth tag in the
 * Map and at least one Stealth tag for one Event.  The way Stealth works is
 * as follows:
 *
 * Either type of detection (sight or sound) starts with the appropriate Radius.
 * Vision confirms the target is in the source's visual cone based on the direction
 * the source is facing.  It also confirms the Line of Sight contains no non-passable
 * tiles.  Finally, it compares the Brightness of the source's tile to the Brightness
 * of the target's tile.  The brighter the target, relative to the source, the easier
 * it is to see.
 *
 * Hearing just confirms the target is in range and applies modifiers based on the
 * loudness of the target's tile.
 *
 * All of these then degrade the "detection result" over distance, add a stiff
 * 200% penalty if the party is Dashing.  Finally, it adds in any other modifiers in the
 * Equipment, Actor, Class, States and so on.
 *
 * Also, the appropriate Perception difference modifies this Radius --- higher
 * Perception = more likely detection.    This plug-in compares Perception score to the
 * target's Stealth Skill level to create another modifier.
 *
 * The end result is a Detection Score.  The plug-in picks the highest Detection Score
 * if you have multiple party members.
 *
 * NOTE: ALL modifiers are multipliers and they ALL stack.  Therefore, using very large
 * multipliers is not a good idea in most cases.
 *
 * ============================================================================
 * Plug-in Commands
 * ============================================================================
 *
 * Stealth noise <loudness> <brightness> - creates a burst of noise and light at
 * the party's location, where loudness and brightness 100 = normal player
 * movement.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use this notetag inside of your maps.
 *
 * Map Notetags:
 *   <Brightness: 3=250,5=50> <Loudness: 4=200>
 *   Brightness is a set of Region ID paired with an adjustment factor.  The factor
 *   identifies the brightness of a tile with that Region ID.  This is compared with
 *   the brightness of the party leader's tile, defaulting to 100.
 * 
 *   Loudness is a Region ID paired with an adjustment factor.  The factor
 *   lists the loudness of a tile with that Region ID, defaulting to 100.  This allows
 *   carpet to be softer than stone.
 *
 * Actor specific Notetag:
 *  <Stealth: 10+a.lvl*2>
 *	Stealth - Function which sets the Detection skill based on a formula which is
 *  evaluated every time the Actor changes level.
 *
 * Armor/Weapon/Item/State/Actor/Class Notetag:
 *  <Detection: 3 Brightness: 50 Loudness: 125>
 *   Detection - Modifies the Detection skill.  This is an absolute value.
 *	 Brightness - Modifies Vision check.  50 = 50% harder to detect.
 *	 Loudness - Modifies Hearing check.  125 = 25% harder to detect than base.
 * All of these are optional.
 *
 * Event Notetag:
 *   <Patrol: 1 Brightness: 100 Loudness: 125 Detection: 0>
 *   Patrol is a Region ID used for patrolling.  Each Event will seek out the
 *   Region ID nearest to its current location and move towards it.  When it
 *   reaches the location, it looks for the next nearest one which has not yet
 *   been reached.  When all have been reached, the Event starts over with
 *   the entire list.  This is optional.  When the Player is detected or Searching
 *   the event leaves Patrol.
 *	 The Detection, Vision and Hearing work the same as they do for the
 *	 Item/State/Actor/Class notetags.
 *	 If none of these notetags are present, the Event will not do anything related
 *	 to Stealth.
 */
(function() {
 
WS_StealthConfig = {};

WS_StealthConfig.Parameters = PluginManager.parameters('Stealth');
WS_StealthConfig.Param = {};

//=============================================================================
// The plug-in parameters 
//=============================================================================
WS_StealthConfig.Param.maxStealthScore = parseInt(WS_StealthConfig.Parameters['Max Stealth Score']);
WS_StealthConfig.Param.stealthGauge = WS_StealthConfig.Parameters['Stealth Gauge'];
WS_StealthConfig.Param.baseVisualRadius = parseInt(WS_StealthConfig.Parameters['Base Visual Radius']);
WS_StealthConfig.Param.baseAudioRadius = parseInt(WS_StealthConfig.Parameters['Base Hearing Radius']);
WS_StealthConfig.Param.visualCone = parseInt(WS_StealthConfig.Parameters['Visual Cone']);
WS_StealthConfig.Param.stealthGauge = WS_StealthConfig.Parameters['Stealth Gauge'];
WS_StealthConfig.Param.detectionCooldown = parseInt(WS_StealthConfig.Parameters['Detection Cooldown']);
WS_StealthConfig.Param.defaultStealth = parseInt(WS_StealthConfig.Parameters['Default Stealth']);
WS_StealthConfig.Param.detectionVariable = parseInt(WS_StealthConfig.Parameters['Detection Variable']);
WS_StealthConfig.Param.searchThreshold = parseInt(WS_StealthConfig.Parameters['Search Threshold']);
WS_StealthConfig.Param.detectionThreshold = parseInt(WS_StealthConfig.Parameters['Detection Threshold']);
WS_StealthConfig.Param.noiseFloor = parseInt(WS_StealthConfig.Parameters['Noise Floor']);
WS_StealthConfig.Param.noiseDecay = parseInt(WS_StealthConfig.Parameters['Noise Decay']);


//=============================================================================
// Object which confirms if a particular angle in radians is within the
// specified vision cone
// angle1 = Start of first range
// angle2 - End of first range
// angle3 - Start of second range, if defined.
// angle3 - End of second range, if defined.
//=============================================================================
function VisionCone(angle1, angle2, angle3, angle4) {
	this.angles=[];
	this.angles[0]=angle1;
	this.angles[1]=angle2;
	if (angle3 !== undefined && angle4 !== undefined)
	{
		this.angles[2]=angle3;
		this.angles[3]=angle4;
	}
}

//=============================================================================
// For debugging
//=============================================================================
VisionCone.prototype.toString = function() {
	result="cone: range 1="+this.angles[0]+" to "+this.angles[1];
	if (this.angles.length > 2)
	{
		result +=", range 2="+this.angles[2]+" to "+this.angles[3];
	}
	return result;
}

//=============================================================================
// Returns true if the angle passed in is within the vision cone
// angle - The angle to check
//=============================================================================
VisionCone.prototype.contains = function(angle) {
	if (angle >= this.angles[0] && angle <= this.angles[1])
		return true;
	if (this.angles.length < 3)
		return false;
	if (angle >= this.angles[2] && angle <= this.angles[3])
		return true;
	return false;
}

//=============================================================================
// Object which contains stealth oriented functions.  All of the functions here
// are, in effect, static since they take in all required parameters for each
// method.
//=============================================================================
function Stealth() {
	
	/* Holds the last stealth score for each stealth event */
	this.lastStealthScores=[];
	
	/* This will be the stealth window */
	this.window=undefined;
	
	/* These caches hold StealthModifiers for items, states and so on.
		This avoids having to regenerate them each check.
	*/
	this.item_cache=[];
	this.state_cache=[];
	this.class_cache=[];
	
	if (WS_StealthConfig.Param.stealthGauge) {
		this.stealth_gauge=true;
	}
	else
	{
		this.stealth_gauge=false;
	}
	/* Holds the VisionCone objects for each direction */
	this.vision_cones=[];
	
	/* Calculate the VisionCones for the 4 cardinal directions */
	/* DIRECTION VALUES: 2 = down, 4 = left, 6 = right, 8 = up */
	visual_cone=WS_StealthConfig.Param.visualCone;
	
	/* Convert to radians.  However, we want 1/2 of the value,
	because we will be adding and subtracting it from the central
	angle 
	*/
	visual_cone *= 2*Math.PI/360;
	visual_cone /= 2;
	
	/* Facing downwards */
	central_angle=Math.PI/2;
	this.vision_cones[2] = new VisionCone(central_angle-visual_cone, central_angle+visual_cone);
	
	/* Upwards */
	central_angle=-Math.PI/2;
	this.vision_cones[8] = new VisionCone(central_angle-visual_cone, central_angle+visual_cone);
	
	/* To the left */
	this.vision_cones[4] = new VisionCone(Math.PI-visual_cone, Math.PI,
	-Math.PI, -Math.PI+visual_cone);
	
	/* To the right */
	central_angle=0;
	this.vision_cones[6] = new VisionCone(0, visual_cone, central_angle-visual_cone, 0);
}

//=============================================================================
// Returns the stealth gauge
//=============================================================================
Stealth.prototype.setWindow = function(window) {
	this.window=window;
}

//=============================================================================
// For debugging
//=============================================================================
Stealth.prototype.toString = function() {
	result="Stealth: lastStealthScore="+this.stealthScore();
	return result;
}

//=============================================================================
// Returns the current stealth score
//=============================================================================
Stealth.prototype.stealthScore = function() {
	max_stealth_score=0;
	for (index=0; index<this.lastStealthScores.length; index++)
	{
		if (this.lastStealthScores[index] > max_stealth_score)
			max_stealth_score=this.lastStealthScores[index];
	}
	return max_stealth_score;
}

//=============================================================================
// Plug-in commands
//=============================================================================
var _Stealth_pluginCommand =
		Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Stealth_pluginCommand.call(this, command, args);
	if (command === 'Stealth') {
		switch (args[0]) {
		/* Makes noise and a flash of light - forcing all patrolling guards to look. */
		case 'noise':
			console.log("Creating noise: loudness="+args[1]+" brightness="+args[2]);
			$gameMap.stealth.checkAllEvents(parseInt(args[1]), parseInt(args[2]));
			$gameMap.stealth.updateGauge();
			break;
		}
	}
};

//=============================================================================
// Class which will perform all of the logic for patrol routes
//=============================================================================
function Patrol() {
	this.initialize.apply(this,arguments);
}

//=============================================================================
// The constructor.  One of these per event.
// event - The event to patrol
// region_id - Region ID associated with the route
//=============================================================================
Patrol.prototype.initialize = function(event, region_id) {
	this.region_id=region_id;
	this.remaining_set=[];
	this.full_region_set=[];
	this.event=event;
	this.load_route();
	this.reset_route();
	this.reported_critical_error=false;
	this.current_destination=this.next_point();
}

//=============================================================================
// Create the patrol route
//=============================================================================
Patrol.prototype.load_route = function() {
	width=$gameMap.width();
	height=$gameMap.height();
	this.full_region_set=[];
	for (x=0; x<width; x++) {
		for (y=0; y<height; y++) {
			if ($gameMap.regionId(x, y) == this.region_id) {
				newPoint=[];
				newPoint[0]=x;
				newPoint[1]=y;
				this.full_region_set.push(newPoint);
			}
		}
	}
	if (this.full_region_set.length == 0) {
		console.log("Stealth: Region ID "+this.region_id+" not on map - patrol disabled");
	}
}

//=============================================================================
// Reset a patrol route.  This reloads the "remaining" set.
//=============================================================================
Patrol.prototype.reset_route = function() {
	this.remaining_set=[];
	this.current_destination=null;
	for (index=0; index<this.full_region_set.length; index++) {
		this.remaining_set.push(this.full_region_set[index]);
	}
}

//=============================================================================
// Returns true if this event can patrol.  This is false if there is no
// available patrol route (i.e. region ID 7 selected but not on map)
//=============================================================================
Patrol.prototype.isActive = function() {
	return (this.full_region_set.length > 0);
}

//=============================================================================
// Returns the next way point (the closest one to the current location)
// and removes it from the remaining_set.
//=============================================================================
Patrol.prototype.next_point = function() {
	smallest_distance=null;
	result=null;
	if (this.full_region_set.length == 0) {
		if (!this.reported_critical_error) {
			this.reported_critical_error=true;
		}
		return;
	}
	
	if (!this.remaining_set || this.remaining_set.length == 0) {
		this.reset_route();
	}
	this.current_destination=null;
	matched_index=null;
	for (pointIndex=0; pointIndex<this.remaining_set.length; pointIndex++) {
		current=this.remaining_set[pointIndex];
		if (!current)
			continue;
		current_distance=(this.event.x-current[0])*(this.event.x-current[0]);
		current_distance+=(this.event.y-current[1])*(this.event.y-current[1]);
		if (smallest_distance === null || current_distance < smallest_distance)
		{
			smallest_distance=current_distance;
			result=current;
			matched_index=pointIndex;
		}
	}
	
	/* Every entry in the array has been erased */
	if (!result || matched_index === null)
	{
		this.reset_route();
		return null;
	}
	this.current_destination=result;
	this.remaining_set.splice(matched_index, 1);
	return this.current_destination;
}


//=============================================================================
// Move a single step on our patrol route 
//=============================================================================
Patrol.prototype.move = function() {
	
	// If we are at the destination, we need to get a new one
	if (this.current_destination) {
		if (this.event.x == this.current_destination[0] &&
			this.event.y == this.current_destination[1]) {
				this.current_destination=null;
			}
	}
	if (!this.current_destination) {
		if (!this.next_point() && !this.next_point())
		{
			console.log("Failed to get next route waypoint for "+this.event.eventId());
			return;
		}
	}
	new_dir=this.event.findDirectionTo(this.current_destination[0], this.current_destination[1]);
	this.event.moveStraight(new_dir);
}

//=============================================================================
// Core object representing the various modifiers which are
// associated with Stealth
//=============================================================================
function StealthModifier(parent) {
	this.initialize(parent);
}

StealthModifier.prototype.initialize= function(meta) {
	this.meta=meta;
	if (this.meta) {
		this.detection_skill=meta.Detection || 0;
		this.vision_modifier=this.meta.Brightness || 100;
		this.hearing_modifier=this.meta.Loudness || 100;
	}
	else
	{
		this.detection_skill=0;
		this.vision_modifier=100;
		this.hearing_modifier=100;
	}
	this.vision_modifier /= 100;
	this.hearing_modifier /= 100;
}

StealthModifier.prototype.detection = function() {
	return this.detection_skill;
}

StealthModifier.prototype.vision = function() {
	return this.vision_modifier;
}

StealthModifier.prototype.hearing = function() {
	return this.hearing_modifier;
}

StealthModifier.prototype.toString = function() {
	result="detection="+this.detection();
	result += ", vision="+this.vision();
	result += ", hearing="+this.hearing();
	return result;
}



//=============================================================================
// Returns a modifier based on relative brightness at source and target's location
// source = Source doing the looking
// target = What is being looked for
// target_x = Target's X position
// target_y = Target's Y position
//=============================================================================
Stealth.prototype.vision_modifier = function(source, target, target_x, target_y) {
	/* Calculate a modifier for the brightness at the source and target's location */
	source_brightness=$gameMap.brightness(source.x,source.y);
	target_brightness=$gameMap.brightness(target_x,target_y);
	if (!source_brightness)
		source_brightness=100;
	if (!target_brightness)
		target_brightness=100;
	if (target_brightness < 1)
		target_brightness=1;
	brightness_mod=100*source_brightness/target_brightness;
	return brightness_mod;
}

//=============================================================================
// Returns a modifier based on relative noise level at the target's location
// source = Source doing the looking
// target = What is being looked for
// target_x = Target's X position
// target_y = Target's Y position
//=============================================================================
Stealth.prototype.hearing_modifier = function(source, target, target_x, target_y) {
	/* Return the loudness modifier from the map at the target's location */
	return $gameMap.loudness(target_x,target_y);
}

//=============================================================================
// Checks to see if the source can see the target.  This checks line-of-sight,
// tile passability and vision cone
// source = Source doing the looking
// target = What is being looked for
// modifier = Current modifier value for the check
// distance = Distance between source and target
// x = Target's X location
// y = Target's Y location
//=============================================================================
Stealth.prototype.vision_check = function(source, target, modifier, distance, x, y) {
	
	/* Find the angle between source and target */
	
	/* NOTE: atan2 returns values as follows, on a unit circle with radius 1:
			(1,0) = 0 = 0
			(0,1) = PI/2 = 90
			(-1,0) = PI and -PI	= 180 and -180
			(0-,1) = -PI/2 = -90
			*/
			
	angle=Math.atan2(y-source.y,x-source.x);

	/* DIRECTION VALUES: 2 = down, 4 = left, 6 = right, 8 = up */
	
	/* First, check the visual cone.  If we are outside it, we cannot be seen */
	cone_object=this.vision_cones[source.direction()];
	if (cone_object)
	{
		/* Visual cone is out of range */
		switch (source.direction())
		{
			case 8:
			dir_string="up";
			break;
			
			case 2:
			dir_string="down";
			break;
			
			case 4:
			dir_string="left";
			break;
			
			case 6:
			dir_string="right";
			break;
		}
		if (!cone_object.contains(angle))
		{
			console.log("WS: DIR="+dir_string+" ANGLE (RAD)="+angle+" IS OUTSIDE "+this.vision_cones[source.direction()]);
			console.log("WS: EVENT=("+source.x+","+source.y+") PLAYER=("+x+","+y+")");
			return false;
		}
		/*
		up (Delta X=0, Delta Y: Event=13, Player=6), ANGLE=-180 = -PI/2
		*/
		console.log("WS: DIR="+dir_string+" ANGLE (RAD)="+angle+" IS INSIDE "+this.vision_cones[source.direction()]);
		console.log("WS: EVENT=("+source.x+","+source.y+") PLAYER=("+x+","+y+")");
	}
	
	check_x=source.x;
	check_y=source.y;
	x_delta=Math.cos(angle);
	y_delta=Math.sin(angle);
	a=angle*360.0/(2*Math.PI);
	console.log("WS: XD="+x_delta+", YD="+y_delta+" ANGLE (DEGREES)="+a);
	
	if (Math.abs(x_delta) > Math.abs(y_delta))
	{
		/* Moving to left */
		if (x_delta < 0)
		{
			direction=4;
		}
		else
		{
			/* Moving to right */
			direction=6;
		}
	}
	else
	{
		/* Moving up */
		if (y_delta < 0)
		{
			direction=8;
		}
		else
		{
			/* Moving down */
			direction=2;
		}
	}
	
	/* Finally, we need to trace the Line of Sight and make sure
	it is Passable */
	loop=distance-1;
	while (loop > 0)
	{
		--loop;
		if (!$gameMap.isPassable(Math.round(check_x),Math.round(check_y),direction))
		{
			console.log("WS: CANT PASS: "+Math.round(check_x)+","+Math.round(check_y)+" BY "+direction);
			return false;
		}
		check_x+=x_delta;
		check_y+=y_delta;
	}
	return true;
}

//=============================================================================
// Performs the actual Search and returns an array with a detection score from 0 to Max Stealth Score (or more)
// for the first member, and the target for the second member.  Returns null if there were
// no detections.
// source = Source performing the Search
// targets = Array of the target(s) being searched for
// base_signals = Base vision values or noise levels
// modifier_function = A function which generates a modifier (for a single target)
// check_function = Function which performs additional checks assuming the target is
// in range of the source
// x = X position of the target (since targets are Game_Actors, they have no position)
// Y = Y position of the target (since targets are Game_Actors, they have no position)
//=============================================================================
Stealth.prototype.searchBase = function(source, targets, base_signals, radius, modifier_function, check_function, x, y) {
	if (!radius)
	{
		radius=1.0;
	}
	
	max_possible_stealth_score=WS_StealthConfig.Param.maxStealthScore;
	event_meta=this.getEventMeta(source);
	event_stealth_skill=WS_StealthConfig.Param.defaultStealth;
	if (event_meta && event_meta.Detection) {
		event_stealth_skill+=event_meta.Detection;
	}
	step_scale=max_possible_stealth_score/radius;
	max_stealth_score=0;
	detected_target=null;
	stealth_score=0.0;
	for (index=0; index<targets.length; index++) {
		target=targets[index];
		actor_stealth_skill=target.stealth();
		if (!actor_stealth_skill)
			actor_stealth_skill=WS_StealthConfig.Param.defaultStealth;
		search_radius=radius;
		modifier=modifier_function.call(this, source, target, x, y) || 100.0;
		if (modifier == 0)
			continue;
		modifier /= 100.0;
		step_scale=max_possible_stealth_score/radius;
		step_scale /= modifier;
		
		/* Adjust for the relative skill levels */
		step_scale /= event_stealth_skill/actor_stealth_skill;
		/* Find the distance */
		distance=(source.x-x)*(source.x-x);
		distance += (source.y-y)*(source.y-y);
		distance=Math.sqrt(distance);
		if (!base_signals)
		{
			stealth_score=max_possible_stealth_score-(step_scale*distance);
		}
		else
		{
			stealth_score=base_signals[index]-(step_scale*distance);
		}
		
		/* This is more important for vision checks, since audio does no
		 special checks after the modifiers
		 */
		if (check_function &&
			!check_function.call(this, source, target, modifier, distance, x, y))
		{
			continue;
		}
		if (stealth_score > max_stealth_score)
		{
			detected_target=target;
			max_stealth_score=stealth_score;
		}
		
	}
	if (!detected_target)
	{
		return null;
	}
	result=[];
	result.push(max_stealth_score);
	result.push(target);
	return result;
}


//=============================================================================
// Updates the event's self-switches and so on based on the detection result
// event - Event to update
// result - The detection result from a search
//=============================================================================
Stealth.prototype.updateDetectionStatus = function(event, result)
{
	if (!event)
	{
		return;
	}
	if (result)
	{
		current_score=result[0];
		if (current_score >=  WS_StealthConfig.Param.detectionThreshold)
		{
			/* Detected */
			console.log("Detected player!");
			event.search=event.search || {};
			event.search["state"]=3;
			event.search["cooldown"]=WS_StealthConfig.Param.detectionCooldown;
			var key = [$gameMap.mapId(), event.eventId(), 'C'];
			$gameSelfSwitches.setValue(key, 'false');
			key[2]='D';
			$gameSelfSwitches.setValue(key, 'true');
			return;
		}
		else if (current_score >=  WS_StealthConfig.Param.searchThreshold)
		{
			console.log("Searching for player.");
			/* Searching but not detected */
			event.search=event.search || {};
			event.search["state"]=2;
			event.search["cooldown"]=WS_StealthConfig.Param.detectionCooldown;
			var key = [$gameMap.mapId(), event.eventId(), 'C'];
			$gameSelfSwitches.setValue(key, 'true');
			key[2]='D';
			$gameSelfSwitches.setValue(key, 'false');
			return;
		}
	}
	
	/* Do a cool down */
	if (event.search)
	{
		if (event.search["cooldown"])
		{
			--event.search["cooldown"];
			if (!event.search["cooldown"])
			{
				event.search["state"]=1;
				var key = [$gameMap.mapId(), event.eventId(), 'C'];
				$gameSelfSwitches.setValue(key, 'false');
				key[2]='D';
				$gameSelfSwitches.setValue(key, 'false');
			}
		}
	}
}

//=============================================================================
// Return event specific meta-data
//=============================================================================
Stealth.prototype.getEventMeta = function(event) 
{
	if (!event)
		return null;
	return $dataMap.events[event.eventId()].meta;
}

//=============================================================================
// Returns true if the event has stealth features enabled, false if not
//=============================================================================
Stealth.prototype.isEventStealthy = function(event)
{
	if (!event || !event.eventId)
		return false;
	eventMeta=$dataMap.events[event.eventId()].meta;
	if (!eventMeta)
	{
		return false;
	}
	/* If we have at least one valid meta-key (Patrol: 1 Vision: 100 Hearing: 125 Detection: 0), this is a stealthy event */
	return eventMeta.Detection || eventMeta.Patrol || eventMeta.Hearing ||
		event.meta.Vision;
}

//=============================================================================
// Performs the actual visual and acoustic Search and returns an array with a detection score from 0 to 100 (or more)
// for the first member, and the target for the second member.  Returns null if there were
// no detections.
// source = Source performing the Search
// targets = Array of the target(s) being searched for.  Usually a Game_Actors
// array
// noises = Noise level the targets are making.  These correspond to the targets
// entries.  0=Silence, 100=Normal movement, etc.
// brightness = Brightness level the targets are emitting.  These correspond to the targets
// entries.  0=Invisible, 100=Normal, etc.
// x = X location of the target
// y = Y location of the target
//=============================================================================
Stealth.prototype.search = function(source, targets, noises, brightness, x, y)
{
	result=[];
	
	vision_result=[];
	hearing_result=[];
	
	/* First, perform visual check using default brightness level for targets */
	vision_result=this.searchBase(source, targets, brightness, WS_StealthConfig.Param.baseVisualRadius, this.vision_modifier, Stealth.prototype.vision_check, x, y);
	
	/* Second, perform listening check using passed in noise levels */
	hearing_result=this.searchBase(source, targets, noises, WS_StealthConfig.Param.baseAudioRadius, this.hearing_modifier, null, x, y);
	
	if (!vision_result && !hearing_result)
		return null;
	if (!vision_result && hearing_result)
		return hearing_result;
	if (vision_result && !hearing_result)
		return vision_result;
	if (vision_result[0] > hearing_result[0])
		return vision_result;
	return hearing_result;
}

//=============================================================================
// Adds any events from the current map which have stealth enabled to a cache.
// Called when the map is setup
//=============================================================================
Stealth.prototype.addEvents = function() {
	this.events = [];
	this.eventMeta = [];
	this.eventPatrols = {};
	events=$gameMap.events();
	for (loop=0; loop<events.length; loop++) {
		event=events[loop];
		if (!event || event.eventId() === undefined)
			continue;
		meta=this.getEventMeta(event);
		if (!meta)
			continue;
		/* If we have at least one valid meta-key (Patrol: 1 Vision: 100 Hearing: 125 Detection: 0), this is a stealthy event */
		if (meta.Detection || meta.Patrol || meta.Hearing || meta.Vision)
		{
			this.events.push(event);
			this.eventMeta.push(meta);
			if (meta.Patrol)
			{
				this.eventPatrols[event.eventId()]= new Patrol(event, meta.Patrol);
			}
		}
	}
}

//=============================================================================
// Handle patrol movement for the passed in event
//=============================================================================
Stealth.prototype.patrol = function(event) {
	if (!event)
		return;
	patrol=this.eventPatrols[event.eventId()];
	var key = [$gameMap.mapId(), event.eventId(), 'C'];
	
	/* Don't patrol if we are already Searching or Detected */
	if ($gameSelfSwitches.value(key))
		return;
	key[2]='D';
	if ($gameSelfSwitches.value(key))
		return;
	if (patrol) {
		patrol.move();
	}
}

//=============================================================================
// Window to display stealth gauge
//=============================================================================

Window_Stealth= function() {
	this.initialize.apply(this, arguments);
    Window_Base.prototype.initialize.call(this, this.gaugeX, 0, 200, 200);
    this.opacity = 0;
    this.contentsOpacity = 192;
};

Window_Stealth.prototype = Object.create(Window_Base.prototype);

Window_Stealth.prototype.constructor = Window_Stealth;


Window_Stealth.prototype.initialize = function() {
	this.minValue=0;
	this.maxValue=WS_StealthConfig.Param.maxStealthScore;
	this.gaugeWidth=Math.floor(Graphics.boxWidth/5);
	this.gaugeValue=0;
	this.gaugeX=Math.floor(Graphics.boxWidth/2-Graphics.boxWidth/10);
}

Window_Stealth.prototype.refresh = function() {
	v=this.gaugeValue-this.minValue;
	this.drawGauge(1, 10, this.gaugeWidth, v/(this.maxValue-this.minValue), 
	this.textColor(3), this.textColor(2));
};


//=============================================================================
//=============================================================================
Window_Stealth.prototype.setGauge = function(value)
{
	if (value == this.gaugeValue)
		return;
	if (value < this.minValue)
		value=this.minValue;
	if (value > this.maxValue)
		value=this.maxValue;
	if ($gameMap.stealth && !$gameMap.stealth.stealth_gauge)
		return;
	this.gaugeValue=value;
	this.refresh();
}


//=============================================================================
// If enabled, this shows the stealth gauge onscreen
//=============================================================================
Stealth.prototype.updateGauge = function() {
	drawScore=this.stealthScore();
	drawScore=Math.round(drawScore);
	if (drawScore < 0)
		drawScore=0;
	max_possible_stealth_score=WS_StealthConfig.Param.maxStealthScore;
	if (drawScore > max_possible_stealth_score)
		drawScore=max_possible_stealth_score;
	if (this.stealth_gauge)
	{
		if (this.window)
			this.window.setGauge(drawScore);
	}
	else
	{
		if (this.window)
			this.window.hide();
	}

	console.log("Stealth Score:"+drawScore);
	$gameVariables.setValue(WS_StealthConfig.Param.detectionVariable, drawScore);
	
}

//=============================================================================
// Returns a single detection score, based on a single, passed-in event
// and the party's battle members
// event - The event doing the check
// party_noise - Party's base noise level
// party_brightness - Party's base brightness level
//=============================================================================
Stealth.prototype.checkForEvent = function(event, party_noise, party_brightness) {
	
	noise=[];
	brightness=[];
	party_noise = party_noise || WS_StealthConfig.Param.noiseFloor;
	party_brightness = party_brightness || 100;
	members=$gameParty.battleMembers();
	for (index=0; index<members.length; index++)
	{
		current=members[index];
		starting_noise=party_noise;
		modifiers=current.stealthModifiers();
		modifier_result=1.0;
		vision_modifier=1.0;
		if (modifiers)
		{
			for (var l=0; l<modifiers.length; l++)
			{
				modifier_result *= modifiers[l].hearing();
				vision_modifier *= modifiers[l].vision();
			}
		}
		noise.push(party_noise*modifier_result);
		brightness.push(party_brightness*vision_modifier);
	}
	result=this.search(event, $gameParty.battleMembers(), noise, 
		brightness, $gamePlayer.x, $gamePlayer.y);
	this.updateDetectionStatus(event, result);
	if (result)
	{
		this.lastStealthScores[event.eventId()]=result[0];
	}
	else
		this.lastStealthScores[event.eventId()]=0;
	
	/* If the event is Searching or has Detected the player, we force the
	state here */
	if (event.search && event.search["state"])
	{
		if (event.search["state"] == 2)
		{
			/* Searching, force score to Searching level */
			this.lastStealthScores[event.eventId()]=WS_StealthConfig.Param.searchThreshold;
			return this.lastStealthScores[event.eventId()];
		}
		else if (event.search["state"] == 3)
		{
			/* Detected */
			this.lastStealthScores[event.eventId()]=WS_StealthConfig.Param.detectionThreshold;
			return this.lastStealthScores[event.eventId()];
		}
	}
	if (!result)
		return 0;
	return result[0];
}

//=============================================================================
// Return true if the event_id passed in is patrolling
//=============================================================================
Stealth.prototype.isPatrolling = function(event_id) {
	if (this.eventPatrols[event_id] && this.eventPatrols[event_id].isActive())
	{
		/* If self-switch C or D is on, we do NOT do patrolling */
		var key = [$gameMap.mapId(), event_id, 'C'];
		if ($gameSelfSwitches.value(key))
		{
			return false;
		}
		key[2]='D';
		if ($gameSelfSwitches.value(key))
		{
			return false;
		}
		return true;
	}
	return false;
}

//=============================================================================
// Do patrol processing for the passed in event
//=============================================================================
Stealth.prototype.patrol = function(event_id) {
	if (this.eventPatrols[event_id])
	{
		this.eventPatrols[event_id].move();
	}
	return false;
}


//=============================================================================
// Returns a single detection score, based on all of the stealthy events on the map
// and the party's battle members.  This does NOT update detection status for each
// event and so on.
// party_noise - Party's base noise level
// brightness - Party's brightness level (defaults to 100)
//=============================================================================
Stealth.prototype.checkAllEvents = function(party_noise, brightness) {
		final_result=0;
		
		brightness = brightness || 100;
		for (eventLoop=0; eventLoop<$gameMap.stealth.events.length; eventLoop++) {
			event=$gameMap.stealth.events[eventLoop];
			temp_result=this.checkForEvent(event, party_noise, brightness);
			if (temp_result > final_result)
				final_result=temp_result;
		}
		return final_result;
}

//=============================================================================
// Both Players and Events do visual checks when they move, but Player
// movement forces checks for every Event
//=============================================================================

//=============================================================================
// Scene_Map
//=============================================================================

var WS_Scene_Map_Onload=Scene_Map.prototype.onMapLoaded;

Scene_Map.prototype.onMapLoaded = function() {
	WS_Scene_Map_Onload.call(this, arguments);
	$gameMap.stealth.setWindow(new Window_Stealth());
	this.addWindow($gameMap.stealth.window);
	$gameMap.stealth.window.refresh();
	$gameMap.stealth.window.activate();
}

//=============================================================================
// Game_Map
//=============================================================================

var WS_Game_Map_setup=Game_Map.prototype.setup;

//=============================================================================
// Reset the Stealth object for this map
//=============================================================================
Game_Map.prototype.setup = function(mapId) {
	WS_Game_Map_setup.call(this, mapId);
	this.stealth = new Stealth();
	/* Add all of the Events which have stealth of some type defined */
	this.stealth.addEvents();
	this.stealth.updateGauge();
	this._brightness=[];
	this._loudness=[];
	
	/* Load the Brightness and Loudness maps */
	if ($dataMap.meta) 
	{
		value=$dataMap.meta.Brightness;
		nvPairs=value.split(",");
		for (index=0; index<nvPairs.length; index++) {
			entry=nvPairs[index];
			pair=entry.split("=");
			console.log("Stealth: map Brightness: Region ID="+pair[0]+", Modifier="+pair[1]+"%");
			this._brightness[parseInt(pair[0])]=pair[1];
		}
		value=$dataMap.meta.Loudness;
		nvPairs=value.split(",");
		for (index=0; index<nvPairs.length; index++) {
			entry=nvPairs[index];
			pair=entry.split("=");
			console.log("Stealth: map Loudness: Region ID="+pair[0]+", Modifier="+pair[1]+"%");
			this._loudness[parseInt(pair[0])]=pair[1];
		}
	}
}

//=============================================================================
// Returns a brightness factor at the given coordinates
//=============================================================================
Game_Map.prototype.brightness = function(x, y) {
	id=$gameMap.regionId(x,y);
	result=this._brightness[id];
	if (result === null || result === undefined)
	{
		return 100;
	}
	return result;
}

//=============================================================================
// Returns a loudness factor at the given coordinates
//=============================================================================
Game_Map.prototype.loudness = function(x, y) {
	id=$gameMap.regionId(x,y);
	result=this._loudness[id];
	if (result === null || result === undefined)
	{
		return 100;
	}
	return result;
}


//=============================================================================
// Game_Actor
//=============================================================================

//=============================================================================
// Return the current stealth skill setting
//=============================================================================
Game_Actor.prototype.stealth =function() {
	this._stealth=this._stealth || WS_StealthConfig.Param.defaultStealth;
	return this._stealth;
}

//=============================================================================
// Change the current stealth skill setting.  
// stealthFunction is an expression which is passed into eval to
// return the new value
//=============================================================================
Game_Actor.prototype.setStealth = function(stealthFunction) {
	this._stealth=Math.max(eval(stealthFunction), 0);
}

//=============================================================================
// Advance Stealth skill according to a formula
//=============================================================================
var WS_Game_Actor_changeLevel=Game_Actor.prototype.changeLevel;
Game_Actor.prototype.changeLevel = function(level, show) {
	WS_Game_Actor_changeLevel.call(this, level, show);
	
	if (this.meta)
	{
		// Update the Stealth skill if applicable
		stealth(this.meta.stealth);
	}
}

//=============================================================================
// Get an overall stealth modifier for a current Actor.  Returns null if there are none.
//=============================================================================
Game_Actor.prototype.stealthModifiers = function() {
	modifier_list=[];
	
	// Start with anything tagged to the Actor
	if (!this._stealthBase) {
		meta=$dataActors[this.actorId()].meta;
		this._stealthBase=new StealthModifier(meta);
	}
	modifier_list.push(this._stealthBase);
	
	// The current class
	if (this._classId)
	{
		if (!$gameMap.stealth.class_cache[this._classId])
		{
			meta=$dataClasses[this._classId].meta;
			$gameMap.stealth.class_cache[this._classId] = 
			new StealthModifier(meta);
		}
	}
	
	modifier=$gameMap.stealth.class_cache[this._classId];
	if (modifier)
		modifier_list.push(modifier);
	
	// List of currently equipped items
	items=this.equips();
	for (mod=0; mod<items.length; mod++)
	{
		current=items[mod];
		if (current === null)
			continue;
		if ($gameMap.stealth.item_cache[current.id] === undefined)
		{
			meta={};
			if (DataManager.isWeapon(current))
				meta=$dataWeapons[current.id].meta;
			else if (DataManager.isArmor(current))
				meta=$dataArmors[current.id].meta;
			else
				meta=$dataItems[current.id].meta;
			$gameMap.stealth.item_cache[current.id]=new StealthModifier(meta);
		}
		modifier=$gameMap.stealth.item_cache[current.id];
		modifier_list.push(modifier);
	}
	
	// List of the current states
	states=this.states();
	for (mod=0; mod<states.length; mod++)
	{
		current=states[mod];
		if (current === null)
			continue;
		if (!$gameMap.stealth.state_cache[current.id])
		{
			$gameMap.stealth.state_cache[current.id]=new StealthModifier($dataStates[current.id].meta);
		}
		modifier=$gameMap.stealth.state_cache[current.id];
		modifier_list.push(modifier);
	}
	
	// Add from the current Class
	if (this.currentClass.stealth)
		modifier_list.push(current.stealth);
	
	if (modifier_list.length === 0)
		return null;
	
	return modifier_list;
	
}

//=============================================================================
// Game_CharacterBase
//=============================================================================
var WS_GC_moveStraight=Game_CharacterBase.prototype.moveStraight;
var WS_GC_moveDiagonally=Game_CharacterBase.prototype.moveDiagonally;

//=============================================================================
// Do a stealth check when an Event or the Party moves
//=============================================================================
Game_CharacterBase.prototype.moveStraight = function(d) {
	WS_GC_moveStraight.call(this, d);
	if (!this.isMovementSucceeded())
	{
		return;
	}
	
	if (this instanceof Game_Event)
	{
		// We do the search
		$gameMap.stealth.checkForEvent(this, 10);
		$gameMap.stealth.updateGauge();
	}
	else if (this instanceof Game_Player)
	{
		// Trigger every OTHER event to do the search
		$gameMap.stealth.checkAllEvents(100, 100);
		$gameMap.stealth.updateGauge();
	}
}

//=============================================================================
// Do a stealth check when an Event or the Party moves
//=============================================================================
Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
	WS_GC_moveDiagonally.call(this, horz, vert);
	if (!this.isMovementSucceeded())
	{
		return;
	}
	
	if (this instanceof Game_Event)
	{
		// We do the search
		$gameMap.stealth.checkForEvent(this, 10);
		$gameMap.stealth.updateGauge();
	}
	else if (this instanceof Game_Player)
	{
		// Trigger every OTHER event to do the search
		$gameMap.stealth.checkAllEvents(100+(100*$gamePlayer.isDashing()), 100);
		$gameMap.stealth.updateGauge();
	}
}
//=============================================================================
// Game_Event
//=============================================================================
WS_GE_updateSelf=Game_Event.prototype.updateSelfMovement;

//=============================================================================
// See if we are patrolling.  If so, use that for the movement
//=============================================================================
Game_Event.prototype.updateSelfMovement = function() {
	if ($gameMap.stealth.isPatrolling(this.eventId()))
	{
		patrol_object=$gameMap.stealth.eventPatrols[this.eventId()];
		if (patrol_object)
		{
			console.log("WS: PATROL "+this.eventId());
			patrol_object.move();
		}
		else
		{
			WS_GE_updateSelf.call(this);
		}
	}
	else
	{
		WS_GE_updateSelf.call(this);
	}
}

//=============================================================================
// Game_Player
//=============================================================================




})();
//=============================================================================
// End of File
//=============================================================================
