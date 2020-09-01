//=========================================================
// Sensor SelfSwitch
// Sensor SelfSwitch.js
// Version: 2.1
//=========================================================

var Imported = Imported || {};
Imported.LSensor = true;

var Lyson = Lyson || {};
Lyson.Sensor = Lyson.Sensor || {};

/*:
 * @author Lyson
 * @plugindesc Allows events to flip a self switch when a
 * player is in range.
 *
 * @param Event Self Switch
 * @desc The self switch to flip when the player is in range of event tags.
 * A, B, C, or D
 * @default D
 *
 * @param Comment Self Switch
 * @desc The self switch to flip when the player is in range of comment tags.
 * A, B, C, or D
 * @default D
 *
 * @help
 * =============================================================================
 * What does it do?
 * =============================================================================
 *
 * This plugin activates a self switch when a player is in a certain proximity
 * of an event. It uses a notetag in the note of the event to set the proximity.
 *
 * =============================================================================
 * Usage
 * =============================================================================
 *
 * In the plugin parameters, set the self switch to be triggered on the event
 * when a player enters the range. Options are A, B, C, and D. Default is D.
 *
 * Event tags provide 2 way functionality, they will turn off the switch when
 * the player leaves the event's range.
 *
 * Comment tags only provide 1 way switching, they will NOT turn off the Self
 * Switch when the player leaves the event's range.
 *
 * -----------------------------------------------------------------------------
 * Notetags
 * -----------------------------------------------------------------------------
 *
 * These notetags go in the note box for the event or in a comment on an event
 * page.
 *
 *    <Sensor: x>
 *
 * Where x is the number of tiles away that the selfswitch will be triggered.
 *
 *
 *    <SensorLV: x>
 *
 * This makes it so that the selfswitch will only be triggered in a straight
 * line in the direction the event is facing.
 * Where x is the number of tiles away that the selfswitch will be triggered.
 *
 *    <SensorVar: x>
 *
 * This makes it so that the selfswitch range is set to the value of variable
 * x.
 * Where x is the number of tiles away that the selfswitch will be triggered.
 *
 *    <SensorLVar: x>
 *
 * This makes it so that the selfswitch will only be triggered in a straight
 * line in the direction the event is facing, and the range is set by 
 * variable x.
 * Where x is the number of tiles away that the selfswitch will be triggered.
 *
 *
 * -----------------------------------------------------------------------------
 * Special Thanks to Gilles!
 * ----------------------------------------------------------------------------
 * =============================================================================
 */

Lyson.Parameters = PluginManager.parameters('Sensor SelfSwitch');
Lyson.Param = Lyson.Param || {};

Lyson.Param.SelfSwitch = String(Lyson.Parameters['Event Self Switch']);
Lyson.Param.CommentSwitch = String(Lyson.Parameters['Comment Self Switch']);

Lyson.Sensor.playerMoved = false;

Lyson.Sensor.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function () {
    Lyson.Sensor.Game_Event_setupPage.call(this);
    this.setupSensor();
};



Game_Event.prototype.setupSensor = function () {
    this._sensorRange = 0;
};

Lyson.Sensor.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function () {
    Lyson.Sensor.Game_Event_update.call(this);
    this.updateSensor();
};

Game_Event.prototype.updateSensor = function () {
    if (this._erased) return;
    if (!this._sensorRange) { this._sensorRange = 0 };
    if (this._sensorRange < 0) return;
    Lyson.Sensor.playerMoved = $gamePlayer.isMoving();
    if (!Lyson.Sensor.playerMoved) { return; }
    Lyson.Sensor.processEventNotetags.call(this);
    Lyson.Sensor.proccessPageComments.call(this);
};

Lyson.Sensor.processEventNotetags = function () {
    if (!$dataMap) {
        return;
    }
    var event = this.event();
    if (event.note) {
        var note1 = /<(?:SENSOR):[ ](\d+)>/i;
        var note2 = /<(?:SENSORLV):[ ](\d+)>/i;
        var note3 = /<(?:SENSORVAR):[ ](\d+)>/i;
        var note4 = /<(?:SENSORLVAR):[ ](\d+)>/i;

        var notedata = event.note.split(/(?:>)[ ]/);
        for (var i = 0; i < notedata.length; i++) {
            var tag = notedata[i];
            if (tag.match(note1)) {
                this._sensorRange = parseInt(RegExp.$1);
                Lyson.Sensor.basicSensor.call(this);
            }
            if (tag.match(note2)) {
                this._sensorRange = parseInt(RegExp.$1);
                Lyson.Sensor.lineSensor.call(this);
            }
            if (tag.match(note3)) {
                this._sensorRange = $gameVariables.value(parseInt(RegExp.$1));
                Lyson.Sensor.basicSensor.call(this);
            }
            if (tag.match(note4)) {
                this._sensorRange = $gameVariables.value(parseInt(RegExp.$1));
                Lyson.Sensor.lineSensor.call(this);
            }
        }
    }
};

Lyson.Sensor.proccessPageComments = function () {
    if (!$dataMap) {
        return;
    }

    var list = this.page().list;

    var note1 = /<(?:SENSOR):[ ](\d+)>/i;
    var note2 = /<(?:SENSORLV):[ ](\d+)>/i;
    var note3 = /<(?:SENSORVAR):[ ](\d+)>/i;
    var note4 = /<(?:SENSORLVAR):[ ](\d+)>/i;

    var tag;
    for (var i = 0; i < list.length; i++) {
        if (list[i].code === 108 || list[i].code === 408) {
            tag = list[i].parameters[0];
            if (tag.match(note1)) {
                this._sensorRange = parseInt(RegExp.$1);
                Lyson.Sensor.basicSensor.call(this, 'comm');
            }
            if (tag.match(note2)) {
                this._sensorRange = parseInt(RegExp.$1);
                Lyson.Sensor.lineSensor.call(this, 'comm');
            }
            if (tag.match(note3)) {
                this._sensorRange = $gameVariables.value(parseInt(RegExp.$1));
                Lyson.Sensor.basicSensor.call(this, 'comm');
            }
            if (tag.match(note4)) {
                this._sensorRange = $gameVariables.value(parseInt(RegExp.$1));
                Lyson.Sensor.lineSensor.call(this, 'comm');
            }
        }
    }
};

Lyson.Sensor.basicSensor = function (c) {
    var selfs = Lyson.Sensor.selfSwitch;
    if (c === 'comm') {var selfs =  Lyson.Sensor.selfSwitchC}

    var inRange = Math.abs(this.deltaXFrom($gamePlayer.x));
    inRange += Math.abs(this.deltaYFrom($gamePlayer.y));

    if (inRange <= this._sensorRange) {
        selfs.call(this, true);
    } else {
        selfs.call(this, false);
    };

};


Lyson.Sensor.lineSensor = function (c) {
    var selfs = Lyson.Sensor.selfSwitch;
    if (c === 'comm') { var selfs = Lyson.Sensor.selfSwitchC }

    var dir = this.direction();
    if ((dir === 2 || dir === 8) && this.x === $gamePlayer.x) {
        var inRange = this.deltaYFrom($gamePlayer.y);
        if (dir === 8) {
            if (inRange <= this._sensorRange && inRange > 0) { selfs.call(this, true); return; };
        };
        if (dir === 2) {
            if (inRange >= (0 - this._sensorRange) && inRange < 0) { selfs.call(this, true); return; };
        };
    } else if (this.y === $gamePlayer.y) {
        var inRange = this.deltaXFrom($gamePlayer.x);
        if (dir === 4) {
            if (inRange <= this._sensorRange && inRange > 0) { selfs.call(this, true); return; };
        };
        if (dir === 6) {
            if (inRange >= (0 - this._sensorRange) && inRange < 0) { selfs.call(this, true); return; };
        };
    };
    selfs.call(this, false);
};

Lyson.Sensor.selfSwitch = function (selfs) {
    $gameSelfSwitches.setValue([this._mapId, this._eventId, Lyson.Param.SelfSwitch], selfs)
};

Lyson.Sensor.selfSwitchC = function (selfs) {
    $gameSelfSwitches.setValue([this._mapId, this._eventId, Lyson.Param.CommentSwitch], selfs)
};