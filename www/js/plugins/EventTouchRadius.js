//=============================================================================
// EventTouchRadius.js
//=============================================================================

/*:
 * @plugindesc Events can trigger an Event Touch at greater distances.
 * @author whitesphere
 *
 * @param Default Event Radius
 * @desc If set, any non-configured event in the game will use this for their Event Touch radius.
 *
 * @help If an event has an Event Radius, the "Event Touch" type will trigger
 * when the player comes within that many tiles, in any direction, from the event's
 * center.
 *
 * The event's center is normally the tile it's standing on.  However, if the event's
 * Image is larger than 1 tile, the center is the tile that would be at the visual center
 * of the event.  This is most useful for gigantic events like Dragons.
 *
 * If this radius is not set, the event functions normally.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use this notetag inside of your events.
 *
 * Event Notetags:
 *   <EventRadius: 3>
 *   Sets the Event Touch radius for the particular Event.
 *
 * Map Notetags:
 *   <EventRadius: 3>
 *   Sets the Event Touch radius for the particular Event unless
 *   the event already has its own EventRadius tag.
 */
(function() {
 
WS_EventTouchConfig = {};

WS_EventTouchConfig.Parameters = PluginManager.parameters('EventTouchRadius');
WS_EventTouchConfig.Param = {};

//=============================================================================
// The plug-in parameters 
//=============================================================================
WS_EventTouchConfig.Param.defaultEventRadius = parseInt(WS_EventTouchConfig.Parameters['Default Event Radius']);


//=============================================================================
// Game_Event
//=============================================================================


var WS_GE_ET_init = Game_Event.prototype.initMembers;
//=============================================================================
// Add our own members
//=============================================================================
Game_Event.prototype.initMembers = function() {
	WS_GE_ET_init.call(this, arguments);
	this._playerRadius=0;
	this._eventImageXOffset=0;
	this._eventImageYOffset=0;
}

//=============================================================================
// Perform event touch initialization
//=============================================================================
Game_Event.prototype.initEventTouchRadius = function() {
	if (this.event() === undefined)
		return;
	if (this._eventRadius !== undefined)
		return;
	if (ImageManager.isBigCharacter(this._characterName)) {
		/* Need to figure out how big we are */
		var tmpBitmap=ImageManager.loadCharacter(this._characterName);
		var tw = $gameMap.tileWidth();
		var th = $gameMap.tileHeight();
		this._eventImageXOffset = bitmap.width / tw / 2;
		this._eventImageYOffset = bitmap.height / th / 2;
	}
	
	/* Load up the player and event radii */
	if (this.event() !== undefined)
	{
		meta=this.event().meta;
		if (meta) {
			if (meta.EventTouchRadius) {
				this._eventRadius=parseInt(meta.EventTouchRadius);
			}
			if (!this._eventRadius) 
			{
				// Check for the Map
				if ($dataMap.meta && $dataMap.meta.EventTouchRadius) {
					this._eventRadius=parseInt($dataMap.meta.EventTouchRadius);
				}
			}
			if (!this._eventRadius) {
				this._eventRadius=WS_EventTouchConfig.Param.defaultEventRadius;
			}
			this._eventRadius *= this._eventRadius;
		}
	}
}




var WS_GE_ET_isCollided = Game_Event.prototype.isCollidedWithPlayerCharacters;

//=============================================================================
// Perform the player touch check
//=============================================================================
Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
    if (!$gameMap.isEventRunning()) {
		if (!this.isNormalPriority()) {
			return false;
		}
		this.initEventTouchRadius();
		if (this._eventRadius > 0) {
			
			/* Adjust for large sprites */
			tmp_x = x + this._eventImageXOffset;
			tmp_y = y + this._eventImageYOffset;
			
			/* See if we are in range */
			distance=($gamePlayer.x-x)*($gamePlayer.x-x)+($gamePlayer.y-y)*($gamePlayer.y-y);
			if (distance <= this._eventRadius)
			{
				this.start();
				return true;
			}
			return false;
		}
		else
		{
			return WS_GE_ET_isCollided.call(this, x, y);
		}
	}
}


})();
//=============================================================================
// End of File
//=============================================================================
