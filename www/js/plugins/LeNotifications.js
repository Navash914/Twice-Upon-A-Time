/*
#=============================================================================
# Notifications System
# LeNotifications.js
# By Lecode
# Version 1.1
#-----------------------------------------------------------------------------
# TERMS OF USE
#-----------------------------------------------------------------------------
# - Credit required
# - Keep this header
# - Contact me for commercial use
#=============================================================================
*/
var Imported = Imported || {};
Imported.Lecode_Notifications = true;
/*:
 * @plugindesc Show some notifications according to different events in game
 * @author Lecode
 * @version 1.0
 * 
 * @param Background Color
 * @desc CSS Format
 * Default: Black ( #000000 )
 * @default #000000
 *
 * @param Text Color
 * @desc CSS Format
 * Default: White ( #FFFFFF )
 * @default #FFFFFF
 *
 * @param Font Size
 * @desc Font size
 * Default: 18
 * @default 18
 *
 * @param Font Italic ?
 * @desc Font italic ?
 * Default: false
 * @default false
 *
 * @param Text Outline Color
 * @desc Text Outline Color
 * Default: None ( # )
 * @default #
 *
 * @param Text Outline Width
 * @desc Text Outline Width
 * Default: 0
 * @default 0
 *
 * @param Opacity
 * @desc Layout's opacity (0-255)
 * Default: 180
 * @default 180
 *
 * @param Position
 * @desc Layout's position. top-left, bottom-left, top-right, bottom-right
 * Default: top-left
 * @default top-left
 *
 * @param Left-Right Padding
 * @desc Horizontal padding
 * Default: 4
 * @default 4
 *
 * @param Up-Down Padding
 * @desc Vertical padding
 * Default: 4
 * @default 4
 *
 * @param Move Speed
 * @desc The move speed
 * Default: 6
 * @default 6
 *
 * @param Fade Speed
 * @desc The fade speed
 * Default: 4
 * @default 4
 *
 * @param Life Time
 * @desc Duration (in frames)
 * Default: 200
 * @default 200
 *
 * @param Life Time Auto ?
 * @desc If true, the life time is based on the length of the text.
 * ( So, the previous param doesn't matter)
 * Default: true
 * @default true
 *
 * @param Sound Filename
 * @desc Sound to play when a notification appears
 * Default: Book1
 * @default Book1
 *
 * @param Notif Gain Gold
 * @desc Set false to disable.
 * Default: Gold: +[value]
 * @default Gold: +[value]
 *
 * @param Notif Lose Gold
 * @desc Set false to disable.
 * Default: Gold: -[value]
 * @default Gold: -[value]
 *
 * @param Notif Gain Item
 * @desc Set false to disable.
 * Default: Obtained [name] x[amount]
 * @default Obtained [name] x[amount]
 *
 * @param Notif Lose Item
 * @desc Set false to disable.
 * Default: Lost [name] x[amount]
 * @default Lost [name] x[amount]
 *
 * @param Notif Gain Exp
 * @desc Set false to disable.
 * Default: [name]: +[value] Exp
 * @default [name]: +[value] Exp
 *
 * @param Notif Lose Exp
 * @desc Set false to disable.
 * Default: [name]: -[value] Exp
 * @default [name]: -[value] Exp
 *
 * @param Notif LevelUp
 * @desc Set false to disable.
 * Default: [name]: level up !
 * @default [name]: level up !
 *
 * @param Notif LevelDown
 * @desc Set false to disable.
 * Default: [name]: level down !
 * @default [name]: level down !
 *
 * @param Notif BGM
 * @desc Set 'false' to disable
 * Default: Playing '[name]'
 * @default Playing '[name]'
 *
 * @help
 * Plugin Commands:
 *   -> Notification Clear                  ( Delete all notifications )
 *   -> Notification Enable true/false      ( Enable or disable notifications )
 *   -> Notification Position value         ( Change next notifications position )
 *   -> Notification TextColor value        ( Change text color )
 *   -> Notification FontSize value         ( Change font size )
 *   -> Notification FontItalic true/false  ( Change text italic property )
 *   -> Notification OutlineColor value     ( Change outline color set value to '' to remove )
 *   -> Notification OutlineWidth value     ( Change outline width )
 *   -> Notification ResetParameters        ( Reset all parameters )
 * Script call:
 *   -> this.newNotif(text)                 ( Draw a custom text )
*/
//#=============================================================================

(function() {
/*-------------------------------------------------------------------------
* Get Parameters
-------------------------------------------------------------------------*/
var parameters = PluginManager.parameters('LeNotifications');
var pBgColor = String(parameters['Background Color'] || '#000000');
var pTextColor = String(parameters['Text Color'] || '#FFFFFF');
var pFontSize = Number(parameters['Font Size'] || 18);
var pFontItalic = ((parameters['Font Italic ?'] || 'false') === 'true');
var pTextOutlineColor = String(parameters['Text Outline Color'] || '#');
var pTextOutlineWidth = Number(parameters['Text Outline Width'] || 0);
var pOpacity = Number(parameters['Opacity'] || 180);
var pPos = String(parameters['Position'] || 'top-left');
var pXPadding = Number(parameters['Left-Right Padding'] || 4);
var pYPadding = Number(parameters['Up-Down Padding'] || 4);
var pMoveSpeed = Number(parameters['Move Speed'] || 6);
var pFadeSpeed = Number(parameters['Fade Speed'] || 6);
var pLifeTime = Number(parameters['Life Time'] || 200);
var pLifeTimeAuto = ((parameters['Life Time Auto ?'] || 'true') === 'true');
var pSoundFile = String(parameters['Sound Filename'] || 'Book1');
var pNotifGainGold = String(parameters['Notif Gain Gold'] || 'Gold: +[value]');
var pNotifLoseGold = String(parameters['Notif Lose Gold'] || 'Gold: -[value]');
var pNotifGainItem = String(parameters['Notif Gain Item'] || 'Obtained [name] x[amount]');
var pNotifLoseItem = String(parameters['Notif Lose Item'] || 'Lost [name] x[amount]');
var pNotifGainExp = String(parameters['Notif Gain Exp'] || '[name]: +[value] Exp');
var pNotifLoseExp = String(parameters['Notif Lose Exp'] || '[name]: -[value] Exp');
var pNotifLevelUp = String(parameters['Notif LevelUp'] || '[name]: level up !');
var pNotifLevelDown = String(parameters['Notif LevelDown'] || '[name]: level down !');
var pNotifBgm = String(parameters['Notif BGM'] || "Playing '[name]'");


/*-------------------------------------------------------------------------
* Notification Item Bitmap <- Bitmap
-------------------------------------------------------------------------*/
function LeNotifItemBitmap(type,w,h) {
	Bitmap.call(this,w,h);
	//- Set bitmap properties according to type
	this.textColor = pTextColor;
    this.fontSize = pFontSize;
    this.fontItalic = pFontItalic;
    this.outlineColor = pTextOutlineColor;
    this.OutlineWidth = pTextOutlineWidth;
}

//- Heritage (Bitmap)
LeNotifItemBitmap.prototype = Object.create(Bitmap.prototype);
LeNotifItemBitmap.prototype.constructor = LeNotifItemBitmap;


/*-------------------------------------------------------------------------
* Notification Item <- Sprite
-------------------------------------------------------------------------*/
function LeNotifItem(text,type) {
    this.initialize.apply(this, arguments);
}

//---- Heritage (Sprite)
LeNotifItem.prototype = Object.create(Sprite.prototype);
LeNotifItem.prototype.constructor = LeNotifItem;

//---- Initialization
LeNotifItem.prototype.initialize = function(text,type) {
    Sprite.prototype.initialize.call(this, new LeNotifItemBitmap(type,1,1));
	this.text = text;
    this.type = type;
    this.destX = 0;
    this.destY = 0;
    this.canFade = false;
    this.canDecreaseLifeTime = false;
    this.onScene = false;
    this.dead = false;
    this.setLifeTime();
	this.createBitmap();
    this.iniPosition();
}

//---- Set Life Time
LeNotifItem.prototype.setLifeTime = function() {
    if (pLifeTimeAuto) {
        this.lifeTime = this.text.length*12;
    } else {
        this.lifeTime = pLifeTime;
    }
}

//---- Create Bitmap
LeNotifItem.prototype.createBitmap = function() {
	var w = this.bitmap.measureTextWidth(this.text);
    w += pXPadding*2;
    var h = this.bitmap.fontSize + pYPadding*2;
    this.bitmap = new LeNotifItemBitmap(this.typpe,w,h);
    this.bitmap.fillAll(pBgColor);
    this.opacity = pOpacity;
    h = this.bitmap.fontSize + 2;
    this.bitmap.drawText(this.text,pXPadding,pYPadding,w,h);
}

//---- Initialize Position
LeNotifItem.prototype.iniPosition = function() {
    switch (pPos) {
        case 'top-left':
            this.x = -this.width;
            this.y = 0;
            this.destX = 0;
            this.destY = this.y;
            break;
        case 'bottom-left':
            this.x = -this.width;
            this.y = Graphics.height - this.height;
            this.destX = 0;
            this.destY = this.y;
            break;
        case 'top-right':
            this.x = Graphics.width;
            this.y = 0;
            this.destX = Graphics.width - this.width;
            this.destY = this.y;
            break;
        case 'bottom-right':
            this.x = Graphics.width;
            this.y = Graphics.height - this.height;
            this.destX = Graphics.width - this.width;
            this.destY = this.y;
            break;
    }
}

//---- Update
LeNotifItem.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateMove();
    this.updateLifeTime();
    this.updateFade();
}

//---- Update Move
LeNotifItem.prototype.updateMove = function() {
    if (this.moveFinished()) {
        return;
    }
    //- Moving x
    if (this.destX > this.x) {
        this.x += pMoveSpeed;
        if (this.x > this.destX) this.x = this.destX;
    } else {
        this.x -= pMoveSpeed;
        if (this.x < this.destX) this.x = this.destX;
    }
    //- Moving y
    if (this.destY > this.y) {
        this.y += pMoveSpeed;
        if (this.y > this.destY) this.y = this.destY;
    } else {
        this.y -= pMoveSpeed;
        if (this.y < this.destY) this.y = this.destY;
    }
    //- Call onMoveFinished
    if (this.moveFinished()) {
        this.onMoveFinished();
    }
}

//---- Move Finished ?
LeNotifItem.prototype.moveFinished = function() {
    if (this.x == this.destX && this.y == this.destY) {
        return true;
    } else {
        return false;
    }
}

//---- When move is finished
LeNotifItem.prototype.onMoveFinished = function() {
    this.canDecreaseLifeTime = true;
}

//---- Update life time
LeNotifItem.prototype.updateLifeTime = function() {
    if (!this.canDecreaseLifeTime) {
        return;
    }
    this.lifeTime -= 1;
    if (this.lifeTime <= 0) {
        this.onDeath();
    }
}

//---- When dead
LeNotifItem.prototype.onDeath = function() {
    this.canDecreaseLifeTime = false;
    this.canFade = true;
}

//---- Update Fade
LeNotifItem.prototype.updateFade = function() {
    if (!this.canFade) {
        return;
    }
    this.opacity -= pFadeSpeed;
    if (this.opacity <= 0) {
        this.opacity = 0;
        this.canFade = false;
        this.onFadeFinished();
    }
}

//---- When fade is finished
LeNotifItem.prototype.onFadeFinished = function() {
    this.visible = false;
    this.dead = true;
}

//---- Shift Down
LeNotifItem.prototype.shiftDown = function(y) {
    this.y += y;
    this.destY += y;
}


/*-------------------------------------------------------------------------
* Notification Manager
-------------------------------------------------------------------------*/
function LeNotifManager() {
    throw new Error('This is a static class');
}
LeNotifManager.notifs = [];
LeNotifManager.enabled = true;

//---- New Notification
LeNotifManager.add = function(text,type) {
    if (!this.enabled) {
        return;
    }
    type = (typeof type !== 'undefined') ? type : "default";
    notif = new LeNotifItem(text,type);
    if (pPos == 'top-left' || pPos == 'top-right') {
        this.notifs.forEach(function(n) {
            n.shiftDown(notif.height);
        });
    } else if (pPos == 'bottom-left' || pPos == 'bottom-right') {
        var y = 0;
        this.notifs.forEach(function(n) {
            y += n.height;
        });
        notif.shiftDown(-y);
    }
    this.notifs.push(notif);
}

//---- Update
LeNotifManager.update = function() {
    this.addNotifsToScene();
    this.notifs.forEach(function(n) {
        if (n.onScene) { n.update; }
    });
    this.removeDeadNotifs();
}

//---- Add notifs to Scene_Map
LeNotifManager.addNotifsToScene = function() {
    this.notifs.forEach(function(n) {
        if (!n.onScene) {
            n.onScene = true;
            SceneManager._scene.addChild(n);
            //- Play a sound
            var audio = {};
            audio.name = pSoundFile;
            audio.pitch = 100;
            audio.volume = 90;
            audio.pan = 0;
            AudioManager.playSe(audio);
        }
    });
}

//---- Remove dead notifs
LeNotifManager.removeDeadNotifs = function() {
    var toDelete = [];
    this.notifs.forEach(function(n) {
        if (n.dead) {
            SceneManager._scene.removeChild(n);
            toDelete.push(n);
        }
    });
    for(var i = 0; i < toDelete.length; i++){
        var n = toDelete[i];
        var index = this.notifs.indexOf(n);
        this.compactNotifs(index,n);
        this.notifs.splice(index,1);
    }
}

//---- Compact notification when some are removed
LeNotifManager.compactNotifs = function(index,notif) {
    if (pPos == 'top-left' || pPos == 'top-right') {
        this.notifs.forEach(function(n) {
            if (n.y > notif.y) {
                n.shiftDown(-notif.height);
            }
        });
    } else if (pPos == 'bottom-left' || pPos == 'bottom-right') {
        this.notifs.forEach(function(n) {
            if (n.y < notif.y) {
                n.shiftDown(notif.height);
            }
        });
    }
}

//---- Clear
LeNotifManager.clear = function() {
    this.notifs.forEach(function(n) {
        SceneManager._scene.removeChild(n);
    });
    this.notifs = [];
}


/*-------------------------------------------------------------------------
* Game_Map
-------------------------------------------------------------------------*/
//---- Update
var oldUpdateFunc_GM = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    oldUpdateFunc_GM.call(this,sceneActive);
    if (sceneActive) {
        LeNotifManager.update();
    }
}


/*-------------------------------------------------------------------------
* Game_Interpreter
-------------------------------------------------------------------------*/
//---- Plugin Command
var old_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    old_pluginCommand.call(this, command, args);
    if (command === 'Notification') {
        switch (args[0]) {
        case 'Clear':
            LeNotifManager.clear();
            break;
        case 'Enable':
            LeNotifManager.enabled = Boolean(args[1]);
            break;
        case 'Position':
            pPos = String(args[1]);
            break;
        case 'TextColor':
            pTextColor = String(args[1]);
            break;
        case 'FontSize':
            pFontSize = Number(args[1]);
            break;
        case 'FontItalic':
            pFontItalic = Boolean(args[1]);
            break;
        case 'OutlineColor':
            pTextOutlineColor = String(args[1]);
            break;
        case 'OutlineWidth':
            pTextOutlineWidth = Number(args[1]);
            break;
        case 'ResetParameters':
            pPos = String(parameters['Position'] || 'top-left');
            pTextColor = String(parameters['Text Color'] || '#FFFFFF');
            pFontSize = Number(parameters['Font Size'] || 18);
            pFontItalic = Boolean(parameters['Font Italic ?'] || 'false');
            pTextOutlineColor = String(parameters['Text Outline Color'] || '#');
            pTextOutlineWidth = Number(parameters['Text Outline Width'] || 0);
            break;
        }
    }
};

//---- Script Call
Game_Interpreter.prototype.newNotif = function(text,type) {
    LeNotifManager.add(text,type);
}


/*-------------------------------------------------------------------------
* Game_Party
-------------------------------------------------------------------------*/
//---- Gain/Lose Gold
var oldGainGold_method = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
    oldGainGold_method.call(this,amount);
    var text = '';
    if (amount > 0) {
        if (pNotifGainGold === 'false') { return; }
        text = pNotifGainGold.replace('[value]',String(amount));
    } else if (amount < 0) {
        if (pNotifLoseGold === 'false') { return; }
        text = pNotifLoseGold.replace('[value]',String(-amount));
    }
    LeNotifManager.add(text,"gold");
};

//---- Gain/Lose Item
var oldGainItem_method = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    oldGainItem_method.call(this,item,amount,includeEquip);
    if ( item == undefined || item.name == undefined) {
        return;
    }
    var text = '';
    if (amount > 0) {
        if (pNotifGainItem === 'false') { return; }
        text = pNotifGainItem.replace('[amount]',String(amount));
    } else if (amount < 0) {
        if (pNotifLoseItem === 'false') { return; }
        text = pNotifLoseItem.replace('[amount]',String(-amount));
    }
    text = text.replace('[name]',item.name);
    LeNotifManager.add(text,"item"); 
    if (LeNotifManager.enabled == true) { console.log("Mhe"); }
}


/*-------------------------------------------------------------------------
* Game_Interpreter
-------------------------------------------------------------------------*/
//---- Change EXP
var oldCommand315_method = Game_Interpreter.prototype.command315;
Game_Interpreter.prototype.command315 = function() {
    oldCommand315_method.call(this);
    var value = this.operateValue(this._params[2], this._params[3], this._params[4]);
    var text = '';
    if (value > 0) {
        if (pNotifGainExp === 'false') { return true; }
        text = pNotifGainExp.replace('[value]',String(value));
    } else if (value < 0) {
        if (pNotifLoseExp === 'false') { return true; }
        text = pNotifLoseExp.replace('[value]',String(-value));
    }
    if(this._params[0] === 0 && this._params[1] === 0) {
        text = text.replace('[name]','Party');
        LeNotifManager.add(text,"exp");
    } else {
        this.iterateActorEx(this._params[0], this._params[1], function(actor) {
            var text_i = text.replace('[name]',actor.name());
            LeNotifManager.add(text_i,"exp");
        }.bind(this));
    }
    return true;
};


/*-------------------------------------------------------------------------
* Game_Actor
-------------------------------------------------------------------------*/
//---- Level Up
var oldLevelUp_method = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    oldLevelUp_method.call(this);
    if (pNotifLevelUp === 'false') {
        return;
    }
    var text = pNotifLevelUp.replace('[name]',this.name());
    LeNotifManager.add(text,"levelup");
};

//---- Level Down
var oldLevelDown_method = Game_Actor.prototype.levelDown;
Game_Actor.prototype.levelDown = function() {
    oldLevelDown_method.call(this);
    if (pNotifLevelDown === 'false') {
        return;
    }
    var text = pNotifLevelDown.replace('[name]',this.name());
    LeNotifManager.add(text,"leveldown");
};


/*-------------------------------------------------------------------------
* AudioManager
-------------------------------------------------------------------------*/
//---- Play BGM
var oldPlayBgm_method = AudioManager.playBgm;
AudioManager.playBgm = function(bgm, pos) {
    oldPlayBgm_method.call(this,bgm,pos);
    if (pNotifBgm === 'false' || bgm == undefined || bgm.name == undefined) {
        return;
    }
    if (SceneManager._scene instanceof Scene_Map) {
        var text = pNotifBgm.replace('[name]',bgm.name);
        LeNotifManager.add(text,"bgm");
    }
};


/*-------------------------------------------------------------------------
* Game_Actor
-------------------------------------------------------------------------*/
//---- Change Equipment
var oldChangeEquip_method = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
    LeNotifManager.enabled = false;
    oldChangeEquip_method.call(this,slotId,item);
    LeNotifManager.enabled = true;
};

//---- Force Change Equipment
var oldForceChangeEquip_method = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    LeNotifManager.enabled = false;
    oldForceChangeEquip_method.call(this,slotId,item);
    LeNotifManager.enabled = true;
};

//---- Trade Item with Party
var oldTradewithParty_method = Game_Actor.prototype.tradeItemWithParty;
Game_Actor.prototype.tradeItemWithParty = function(newItem, oldItem) {
    LeNotifManager.enabled = false;
    var bool = oldTradewithParty_method.call(this,newItem,oldItem);
    LeNotifManager.enabled = true;
    return bool;
};

//---- Handle Yanfly's methods

if (Imported.YEP_ItemCore === true) {

var oldInitIndepenEquips_method = Game_Actor.prototype.initIndependentEquips;
Game_Actor.prototype.initIndependentEquips = function(equips) {
    LeNotifManager.enabled = false;
    oldInitIndepenEquips_method.call(this,equips);
    LeNotifManager.enabled = true;
};

var oldChangeEquipById_method = Game_Actor.prototype.changeEquipById;
Game_Actor.prototype.changeEquipById = function(etypeId, itemId) {
    LeNotifManager.enabled = false;
    oldChangeEquipById_method.call(this,etypeId,itemId);
    LeNotifManager.enabled = true;
};

} //-Yanfly check

})();
