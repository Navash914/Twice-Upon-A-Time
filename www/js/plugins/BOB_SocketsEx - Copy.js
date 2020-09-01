//=============================================================================
// Bobstah Plugins
// BOB_SocketsEx.js
// Version: 1.12
//=============================================================================
var Imported = Imported || {};
Imported.BOB_SocketsEx = true;

var Bobstah = Bobstah || {};
Bobstah.SocketsEx = Bobstah.SocketsEx || {};

//=============================================================================
/*:
 * @plugindesc Implements a socketing system inspired by Diablo II.
 * @author Bobstah
 *
 * @param Socket Menu Name
 * @desc The name of the socket menu item in the main menu.
 * @default Sockets
 *
 * @param Hide Socket Items
 * @desc If 1, hide socket armors from the standard armor view. If 0, show them.
 * @default 1
 *
 * @param Socket Category
 * @desc The name of the category to show socket items under. Only shows if Hide Socket Items is 1.
 * @default Gems
 *
 * @param Empty Socket Icon
 * @desc The icon to use for empty sockets.
 * @default 160
 *
 * @param Empty Socket Text
 * @desc The text to display when a socket is empty.
 * @default Empty
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin allows you to socket armors with a type of none
 * into other weapons or armors that have sockets.
 *
 * To create socketable item or to add sockets to an item, see
 * the Notetags section below.
 *
 * ============================================================================
 * How it works
 * ============================================================================
 * Whenever you socket an item into a weapon or armor, all of the item's
 * stat changes and traits are copied onto the parent item. If you
 * unsocket the source of the stat changes and traits, they are
 * removed from the parent item.
 *
 * For example:
 * Let's say that we create an armor with a type of none, and set the 
 * <SocketEx> tag on it. It can now be socketed into weapons and armor
 * that contain sockets.
 *
 * For this exmaple, we're going to name the above item Gem. If
 * we say Gem gives +5 atk and +5 def, and we socket it into
 * a Shield, that shield gains an additional +5 atk and
 * +5 def. If Gem granted a skill and decreased Crit Rate,
 * these changes would be copied onto the source item as well.
 *
 * The icon that the Gem uses will replace the empty socket icon
 * in all item views.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 * Socket Gems must be an Armor item with a Type of 'None'. Once
 * that is set, add the following to make it a socketable item:
 * <SocketEx>
 *
 * Optionally, you can restrict it to be only for weapons or armor:
 * <SocketEx Weapon>
 * <SocketEx Armor>
 *
 * You can drill down even further and restrict it to a limited number
 * of weapon and armor types:
 * <SocketEx Weapon: ID, ID, etc>
 * <SocketEx Armor: ID, ID, etc>
 *
 * To give a weapon or armor sockets, use the following notetag:
 *  <Sockets: X>
 * Where X is the number of sockets the item has.
*/

//=============================================================================
// Parameter Variables
//=============================================================================

Bobstah.Parameters = PluginManager.parameters('BOB_SocketsEx');
Bobstah.Param = Bobstah.Param || {};

Bobstah.Param.SocketsEx_CommandName = String(Bobstah.Parameters['Socket Menu Name']);
Bobstah.Param.SocketsEx_HideSocketItems = Number(Bobstah.Parameters['Hide Socket Items']);
Bobstah.Param.SocketsEx_SocketCategory = String(Bobstah.Parameters['Socket Category']);
Bobstah.Param.SocketsEx_EmptyIcon = Number(Bobstah.Parameters['Empty Socket Icon']);
Bobstah.Param.SocketsEx_EmptyName = Bobstah.Parameters['Empty Socket Text'];

//=============================================================================
// Plugin Functions - General
//=============================================================================
Bobstah.SocketsEx.commandName = function() {
	return Bobstah.Param.SocketsEx_CommandName;
};

Bobstah.SocketsEx.commandSymbol = function() {
	return "SocketsEx";
};

//=============================================================================
// Plugin Functions - Socket Info Objects & Nodes
//=============================================================================
Bobstah.SocketsEx.createSocketInfoObject = function() {
	return new SocketsExSocketable();
};

Bobstah.SocketsEx.createSocketInfoNode = function(socketIds, evl) {
	evl = evl || false;
	var obj = {
		'ids': socketIds,
		'eval': evl
	};
	return obj;
};

//=============================================================================
// Plugin Functions - Sockets Ex Objects & Nodes
//=============================================================================
Bobstah.SocketsEx.createSocketsExObject = function(defaultSockets, evl) {
	return new SocketsEx(defaultSockets, evl);
};

Bobstah.SocketsEx.createSocketsExNode = function() {
	return new SocketsExSocket();
	
	return obj;
};

//=============================================================================
// Plugin Objects - SocketsEx
//=============================================================================
function SocketsEx(defaultSockets, evl) {
	this._defaultSockets = defaultSockets;
	this._sockets = [],
	this._eval = evl,
	this._ready = false
}

SocketsEx.prototype.hasSockets = function() {
	return this._sockets.length > 0;
};

SocketsEx.prototype.setupSockets = function(sockets, evl) {
	if (evl === true) {
		this._defaultSockets = sockets;
		this._eval = evl;
	} else {
		this._createEmptySockets(sockets);
		this._ready = true;
	}
};

SocketsEx.prototype.isSocketFull = function(socketId) {
	if (this._sockets[socketId]) {
		return this._sockets[socketId].isFull();
	}
	return false;
};

SocketsEx.prototype.hasFullSockets = function() {
	for (var i = 0; i < this._sockets.length; i++) {
		if (this._sockets[i].isFull()) { return true; }
	}
	return false;
};

SocketsEx.prototype.fullSockets = function() {
	var fullSockets = [];
	for (var i = 0; i < this.sockets.length; i++) {
		if (this.sockets[i].isFull()) {
			fullSockets.push(this.sockets[i]);
		}
	}
	return fullSockets;
}

SocketsEx.prototype._createEmptySockets = function(number) {
	for (var i = 0; i < number; i++) {
		this._sockets.push(Bobstah.SocketsEx.createSocketsExNode());
	}
};

SocketsEx.prototype.update = function(owner) {
	for (var i = 0; i < this.sockets.length; i++) {
		if (this.processRemoval(owner, this.sockets[i])) {
			this.sockets[i].removed(owner);
		}
		if (this.processApply(owner, this.sockets[i])) {
			this.sockets[i].inserted(owner);
		}
	}
};


SocketsEx.prototype.processApply = function(owner, socket) {
	var params = socket.params();
	var changed = false;
	if (params !== null) {
		changed = true;
		for (var p = 0; p < params.length; p++) {
			owner.params[p] += params[p];
		}
	}
	var traits = socket.traits();
	if (traits !== null) {
		changed = true;
		for (var t = 0; t < traits.length; t++) {
			owner.traits.push(traits[t]);
		}
	}
	return changed;
};

SocketsEx.prototype.processRemoval = function(owner, socket) {
	var params = socket.params();
	var changed = false;
	if (params !== null) {
		changed = true;
		for (var p = 0; p < params.length; p++) {
			owner.params[p] -= params[p];
		}
	}
	var traits = socket.traits();
	if (traits !== null) {
		changed = true;
		for (var t = 0; t < traits.length; t++) {
			for (var n = 0; n < owner.traits.length; n++) {
				var oTrait = owner.traits[n];
				var sTrait = traits[t];
				if (sTrait.code === oTrait.code) {
					if (sTrait.dataId === oTrait.dataId) {
						if (sTrait.value === oTrait.value) {
							owner.traits.splice(n,1);
						}
					}
				}
			}
		}
	}
	return changed;
};

Object.defineProperties(SocketsEx.prototype, {
	sockets: {
		get: function() {
			if (this._ready === false) {
				if (this._eval === true) {
					//Do some evaling here, somehow.
				} else {
					this.setupSockets(this._defaultSockets, false);
				}
			}
			return this._sockets;
		},
		
		configurable: true
	}
});

//=============================================================================
// Plugin Objects - SocketsExSocket
//=============================================================================
function SocketsExSocket() {
	this._sourceItem = null;
	this._inserted = false;
	this._removed = false;
	this._lastItem = null;
}

SocketsExSocket.prototype.isFull = function() {
	return this._sourceItem !== null;
};

SocketsExSocket.prototype.isEmpty = function() {
	return !this.isFull();
};

SocketsExSocket.prototype.insertItem = function(item) {
	//Plugin Param to check if item given back
	var lastItem = this.removeItem();
	this._sourceItem = item;
	this._inserted = true;
	return lastItem;
};

SocketsExSocket.prototype.removeItem = function() {
	this._lastItem = this._sourceItem;
	this._removed = true;
	this._sourceItem = null;
	return this._lastItem;
};

SocketsExSocket.prototype.params = function() {
	var res = [];
	if (this._removed) {
		if (this._lastItem !== null) {
			res = this._lastItem.params;
		} else {
			res = [];
		}
	} else {
		if (this._inserted) {
			if (this._sourceItem !== null) {
				res = this._sourceItem.params;
			} else {
				res = [];
			}
		}
	}
	return res;
};
	
SocketsExSocket.prototype.traits = function() {
	var res = [];
	if (this._removed) {
		if (this._lastItem !== null) {
			res = this._lastItem.traits;
		} else {
			res = [];
		}
	} else {
		if (this._inserted) {
			if (this._sourceItem !== null) {
				res = this._sourceItem.traits;
			} else {
				res = [];
			}
		}
	}
	return res;
};

SocketsExSocket.prototype.removed = function(owner) {
	this._removed = false;
	if (this._lastItem === null) { return; }
	var headerStr = '<SocketExNotes ' + this._lastItem.id + '>';
	var trailerStr = '</SocketExNotes ' + this._lastItem.id + '>';
	var headerIndex = owner.note.indexOf(headerStr);
	var trailerIndex = owner.note.indexOf(trailerStr);
	if (headerIndex > -1 && trailerIndex > -1) {
		var trailerOffset = trailerStr.length - 1;
		owner.note = owner.note.slice(0, headerIndex) + owner.note.slice(trailerIndex + trailerOffset, owner.note.length-1);
	}
};

SocketsExSocket.prototype.inserted = function(owner) {
	this._inserted = false;
	if (this._sourceItem === null) { return; }
	var headerStr = '<SocketExNotes ' + this._sourceItem.id + '>';
	var trailerStr = '</SocketExNotes ' + this._sourceItem.id + '>';
	owner.note = owner.note + headerStr;
	owner.note = owner.note + this._sourceItem.note + '\n';
	owner.note = owner.note + trailerStr;
};

Object.defineProperties(SocketsExSocket.prototype, {
	itemId: {
		get: function() {
			return (this._sourceItem === null ? 0 : this._sourceItem.id);
		},
		configurable: true
	},
	item: {
		get: function() {
			return this._sourceItem
		},
		configurable: true
	},
	applied: {get: function() {
			return this._applied
		},
		configurable: true
	}
});

//=============================================================================
// Plugin Objects - SocketsExSocketable
//=============================================================================
function SocketsExSocketable() {
	this._weaponTypes = [];
	this._armorTypes = [];
	this._skillTypes = [];
}

SocketsExSocketable.prototype.socketTypes = function(list) {
	var res = [];
	for (var i = 0; i < list.length; i++) {
		var obj = list[i];
		if (obj['eval'] === true) {
			res.push(eval(obj.ids));
		} else {
			for (n = 0; n < obj.ids.length; n++) {
				res.push(obj.ids[n]);
			}
		}
	}
	return res;
};

SocketsExSocketable.prototype.skillTypes = function() {
		return this.socketTypes(this._skillTypes);
};

SocketsExSocketable.prototype.armorTypes = function() {
		return this.socketTypes(this._armorTypes);
};

SocketsExSocketable.prototype.weaponTypes = function() {
		return this.socketTypes(this._weaponTypes);
};

SocketsExSocketable.prototype.forSkill = function(id) {
	return this.skillTypes().indexOf(id) !== -1 || this.skillTypes().indexOf(0) !== -1;
};

SocketsExSocketable.prototype.forArmor = function(id) {
	return this.armorTypes().indexOf(id) !== -1 || this.armorTypes().indexOf(0) !== -1;
};

SocketsExSocketable.prototype.forWeapon = function(id) {
	return this.weaponTypes().indexOf(id) !== -1  || this.weaponTypes().indexOf(0) !== -1;
};

SocketsExSocketable.prototype.addNode = function(socketType, socketNode) {
	switch (socketType.toLowerCase()) {
		case "weapon":
			this._weaponTypes.push(socketNode);
		break;
		
		case "armor":
			this._armorTypes.push(socketNode);
		break;
		
		case "skill":
			this._skillTypes.push(socketNode);
		break;
		
		case "all":
			this._weaponTypes.push(socketNode);
			this._armorTypes.push(socketNode);
			this._skillTypes.push(socketNode);
		break;
	}
};

//=============================================================================
// DataManager
//=============================================================================
Bobstah.SocketsEx.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Bobstah.SocketsEx.DataManager_isDatabaseLoaded.call(this)) return false;
	DataManager.processBobstahSocketExSockets($dataWeapons);
	DataManager.processBobstahSocketExSockets($dataArmors);
	
	DataManager.processBobstahSocketExSocketables($dataArmors);
	return true;
};

DataManager.processBobstahSocketExSocketables = function(group) {
	var socketregex = /<SocketEx\s*([A-z]*)\s*:?\s*(.*)\s*>/ig;
	var commaregex = /(\d+)/ig;
	var evalregex = /^\$\((.+)\)$/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		
		if (obj.atypeId === 0) {
			var evl = false;
			obj.socketInfo = Bobstah.SocketsEx.createSocketInfoObject();
			while(info = socketregex.exec(obj.note)) {
				var socketType = info[1] || 'all';
				
				if (info[2].indexOf('$(') !== -1) {
					info[2].match(evalregex);
					var socketIds = RegExp.$1;
					evl = true;
				} else if (info[2].indexOf(',') !== -1) {
					var socketIds = [];
					while (id = commaregex.exec(info[2])) {
						socketIds.push(id[1]);
					}
				} else {
					var socketIds = (info[2].length > 0 ? [Number(info[2])] : [0]);
				}
				var socketNode = Bobstah.SocketsEx.createSocketInfoNode(socketIds, evl);
				obj.socketInfo.addNode(socketType, socketNode);
			}
		}
	}
};

DataManager.processBobstahSocketExSockets = function(group) {
	var socketregex = /<Sockets\s*:\s*(.+)>/i;
	var evalregex = /^\$\((.+)\)$/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];

		obj.socketsEx = Bobstah.SocketsEx.createSocketsExObject();
		if (obj.atypeId === 0) { continue; }
		if (obj.note.match(socketregex)) {
			var sockets = RegExp.$1;
			if (sockets.indexOf('$()') !== -1) {
				var evl = true;
			} else {
				var evl = false;
			}
			obj.socketsEx.setupSockets(sockets, evl);
		}
		
	}
};

//=============================================================================
// Game_Actor
//=============================================================================
Game_Actor.prototype.sockets = function() {
	var sockets = [];
	var equips = this.equips();
	for (var i = 0; i < equips.length; i++) {
		item = equips[i];
		if (item === null) { continue; }
		if (item.socketsEx.hasFullSockets()) {
			sockets = sockets.concat(item.socketsEx.fullSockets());
		}
	}
	return sockets;
};

Game_Actor.prototype.socketedItems = function() {
	return this.sockets().map(function(socket) {
		return socket.item;
	});
}

//=============================================================================
// Window_Base
//=============================================================================
Window_Base.prototype.drawSockets = function(item, x, y, width, height) {
	height = height || 36;
	var numberWidth = (typeof(this.numberWidth) !== "undefined" ? this.numberWidth() : 0);
	var sockets = Array.prototype.slice.call(item.socketsEx.sockets).reverse();
	var ix = (x + width) - numberWidth - Window_Base._iconWidth;
	var iy = y;
	for (var i = 0; i < sockets.length; i++) {
		var socket = sockets[i];
		if (socket.isFull()) {
			var icon = socket.item.iconIndex;
		} else {
			var icon = Bobstah.Param.SocketsEx_EmptyIcon;
		}
		this.drawIcon(icon, ix, iy);
		ix -= Window_Base._iconWidth;
	}
};

//=============================================================================
// Window_MenuCommand
//=============================================================================
Bobstah.SocketsEx.WindowMenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
Window_MenuCommand.prototype.addMainCommands = function() {
	var enabled = this.areMainCommandsEnabled();
	if (this.needsCommand('sockets')) {
        this.addCommand(Bobstah.Param.SocketsEx_CommandName, 'SocketsEx', enabled);
    }
	return Bobstah.SocketsEx.WindowMenuCommand_addMainCommands.call(this);
};

Bobstah.SocketsEx.WindowMenuCommand_needsCommand = Window_MenuCommand.prototype.needsCommand;
Window_MenuCommand.prototype.needsCommand = function(name) {
	if (name === "sockets") {
		return true;
	} else {
		return Bobstah.SocketsEx.WindowMenuCommand_needsCommand.call(this, name);
	}
};

//=============================================================================
// Window_ItemCategory
//=============================================================================
Bobstah.SocketsEx.WindowItemCommand_makeCommandList = Window_ItemCategory.prototype.makeCommandList;
Window_ItemCategory.prototype.makeCommandList = function() {
    Bobstah.SocketsEx.WindowItemCommand_makeCommandList.call(this);
	if (Bobstah.Param.SocketsEx_HideSocketItems === 1) {
		this.addCommand(Bobstah.Param.SocketsEx_SocketCategory, 'socketsEx');
	}
};

//=============================================================================
// Window_ItemList
//=============================================================================
Bobstah.SocketsEx.WindowItemList_drawItem = Window_ItemList.prototype.drawItem;
Window_ItemList.prototype.drawItem = function(index) {
	item = this._data[index];
	if (item && (DataManager.isWeapon(item) || DataManager.isArmor(item))) {
		if (item.socketsEx.hasSockets()) {
			var rect = this.itemRect(index);
			this.drawSockets(item, rect.x, rect.y, rect.width, rect.height);
		}
	}
	Bobstah.SocketsEx.WindowItemList_drawItem.call(this, index);
};

Bobstah.SocketsEx.WindowEquipItem_includes = Window_EquipItem.prototype.includes;
Window_EquipItem.prototype.includes = function(item) {
	if (item !== null) {
		if (Bobstah.Param.SocketsEx_HideSocketItems === 1) {
			if (typeof(item.socketInfo) !== "undefined") {
				return false;
			}
		}
	}
	return Bobstah.SocketsEx.WindowEquipItem_includes.call(this, item);
};

Bobstah.SocketsEx.WindowItemList_includes = Window_ItemList.prototype.includes;
Window_ItemList.prototype.includes = function(item) {
	if (item !== null) {
		if (this._category === 'socketsEx') {
			if (typeof(item.socketInfo) !== 'undefined') {
				return true;
			} else {
				return false;
			}
		} else if (this._category === 'armor') {
			if (typeof(item.socketInfo) !== 'undefined') {
				return false;
			} else {
				return Bobstah.SocketsEx.WindowItemList_includes.call(this, item);
			}
		} else {
			return Bobstah.SocketsEx.WindowItemList_includes.call(this, item);
		}
	} else {
		return Bobstah.SocketsEx.WindowItemList_includes.call(this, item);
	}
};

//=============================================================================
// Window_EquipSlot
//=============================================================================
Bobstah.SocketsEx.WindowEquipSlot_drawItemName = Window_EquipSlot.prototype.drawItemName;
Window_EquipSlot.prototype.drawItemName = function(item, x, y, w) {
	if (item && (DataManager.isWeapon(item) || DataManager.isArmor(item))) {
		if (item.socketsEx.hasSockets()) {
			this.drawSockets(item, x, y, w);
		}
	}
	Bobstah.SocketsEx.WindowEquipSlot_drawItemName.call(this, item, x, y, w);
};


//=============================================================================
// Scene_Menu
//=============================================================================
Bobstah.SocketsEx.SceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	Bobstah.SocketsEx.SceneMenu_createCommandWindow.call(this);
	this._commandWindow.setHandler('SocketsEx',   this.commandSocketsEx.bind(this));
};

Scene_Menu.prototype.commandSocketsEx = function() {
    SceneManager.push(Scene_SocketEx);
};

//=============================================================================
// Window_SocketExCategory
//=============================================================================
function Window_SocketExCategory() {
    this.initialize.apply(this, arguments);
}

Window_SocketExCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_SocketExCategory.prototype.constructor = Window_SocketExCategory;

Window_SocketExCategory.prototype.makeCommandList = function() {
	//this.addCommand('Skills',    'item');
    this.addCommand(TextManager.weapon,  'weapon');
    this.addCommand(TextManager.armor,   'armor');
};

Window_SocketExCategory.prototype.setGemWindow = function(gemWindow) {
	if (gemWindow) { this._gemWindow = gemWindow; }
};

Window_SocketExCategory.prototype.select = function(index) {
	Window_ItemCategory.prototype.select.call(this, index);
	this.updateGemWindow();
};

Window_SocketExCategory.prototype.updateGemWindow = function() {
	if (this._gemWindow) {
		this._gemWindow.setItemCategory(this.currentSymbol());
	}
};

//=============================================================================
// Window_SocketExList
//=============================================================================
function Window_SocketExList() {
    this.initialize.apply(this, arguments);
}

Window_SocketExList.prototype = Object.create(Window_ItemList.prototype);
Window_SocketExList.prototype.constructor = Window_SocketExList;

Window_SocketExList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._category = 'none';
    this._data = [];
};

Window_SocketExList.prototype.makeItemList = function() {
	Window_ItemList.prototype.makeItemList.call(this);
};

Window_SocketExList.prototype.maxCols = function() {
    return 1;
};

Window_SocketExList.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    this.callUpdateSocketList();
};

Window_SocketExList.prototype.includes = function(item) {
    switch (this._category) {
		case 'weapon':
			if (DataManager.isWeapon(item)) {
				if (item) {
					return item.socketsEx.hasSockets();
				}
				return true;
			}
		break;
		
		case 'armor':
			if (DataManager.isArmor(item)) {
				if (item) {
					return item.socketsEx.hasSockets();
				}
				return true;
			}
		break;
		
		default:
			return false;
		break;
    }
};

Window_SocketExList.prototype.isEnabled = function(item) {
	return true;
}

Window_SocketExList.prototype.setSocketWindow = function(socketWindow) {
	if (socketWindow) {
		this._socketWindow = socketWindow;
	}
};

Window_SocketExList.prototype.setGemWindow = function(gemWindow) {
	if (gemWindow) {
		this._gemWindow = gemWindow;
	}
};

Window_SocketExList.prototype.callUpdateSocketList = function() {
	if (this.active) {
        if (this._socketWindow) { this.updateSocket(); }
		if (this._gemWindow) { this.updateGems(); }
    }
};

Window_SocketExList.prototype.updateSocket = function() {
	 this.setSocketWindowItem(this.item());
};

Window_SocketExList.prototype.updateGems = function() {
	 this.setGemWindowItem(this.item());
};

Window_SocketExList.prototype.setSocketWindowItem = function(item) {
	if (this._socketWindow) {
        this._socketWindow.setItem(item);
    }
};

Window_SocketExList.prototype.setGemWindowItem = function(item) {
	if (this._gemWindow) {
        this._gemWindow.setItem(item);
    }
};

//=============================================================================
// Window_SocketExSockets
//=============================================================================
function Window_SocketExSockets() {
    this.initialize.apply(this, arguments);
}

Window_SocketExSockets.prototype = Object.create(Window_Selectable.prototype);
Window_SocketExSockets.prototype.constructor = Window_SocketExSockets;

Window_SocketExSockets.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._itemRef = null;
    this._data = [];
};

Window_SocketExSockets.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    this.callUpdateHelpWindow();
};

Window_SocketExSockets.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_SocketExSockets.prototype.maxCols = function() {
    return 1;
};

Window_SocketExSockets.prototype.maxItems = function() {
    return this._data ? this._data.length : 2;
};

Window_SocketExSockets.prototype.itemTextAlign = function() {
	return 'left';
};

Window_SocketExSockets.prototype.itemNumberWidth = function() {
	return this.textWidth('000');
};

Window_SocketExSockets.prototype.makeItemList = function() {
	if (this._itemRef === null) { this._data = []; return; }
	this._data = this._itemRef.socketsEx.sockets;
};

Window_SocketExSockets.prototype.setItem = function(item) {
	item = item || null;
	this._itemRef = item;
	this._index = 0;
	this.refresh();
	this.resetScroll();
};

Window_SocketExSockets.prototype.setGemWindow = function(gemWindow) {
	if (gemWindow) {
		this._gemWindow = gemWindow;
	}
};

Window_SocketExSockets.prototype.drawItem = function(index) {
    var socket = this._data[index];
	var numberWidth = 15;
	var rect = this.itemRect(index);
	rect.width -= this.textPadding();
	var iw = this.itemNumberWidth();
	var nx = rect.x + iw;
	this.drawItemNumber(index, rect.x, rect.y, rect.width);
	if (socket.isFull()) {
		srcItem = socket.item;
		this.drawItemName(srcItem, nx, rect.y, rect.width - numberWidth);
	} else {
		this.drawEmptySocket(nx, rect.y, rect.width, rect.height);
	}
	this.changePaintOpacity(1);
};

Window_SocketExSockets.prototype.drawItemNumber = function(index, x, y, width) {
	this.drawText((index+1)+'.', x, y, width - this.textWidth('00'), 'left');
};

Window_SocketExSockets.prototype.drawEmptySocket = function(x, y, width, height) {
	var icon = Bobstah.Param.SocketsEx_EmptyIcon;
	var name = Bobstah.Param.SocketsEx_EmptyName;
	var nx = x + Window_Base._iconWidth
	var nw = width - Window_Base._iconWidth;
	var align =  this.itemTextAlign();
	this.drawIcon(icon, x, y);
	this.drawText(name, nx, y, nw, align);
};

Window_SocketExSockets.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_SocketExSockets.prototype.callUpdateGemList = function() {
	if (this.active) {
		if (this._gemWindow) { this.updateGems(); }
    }
};

Window_SocketExSockets.prototype.updateGems = function() {
	 this.setGemWindowItem(this.item());
};

Window_SocketExSockets.prototype.setGemWindowItem = function(item) {
	if (this._gemWindow) {
        this._gemWindow.setItem(item);
    }
};

Window_SocketExSockets.prototype.callUpdateHelpWindow = function() {
	if (this.active) {
		if (this._helpWindow) { this.updateHelp(); }
    }
};

Window_SocketExSockets.prototype.updateHelp = function() {
	if (this.item() !== null) {
		this._helpWindow.setItem(this.item());
	}
};

Window_SocketExSockets.prototype.deselect = function() {
	Window_Selectable.prototype.deselect.call(this);
	this._data = [];
}

//=============================================================================
// Window_SocketExGems
//=============================================================================
function Window_SocketExGems() {
    this.initialize.apply(this, arguments);
}

Window_SocketExGems.prototype = Object.create(Window_SocketExList.prototype);
Window_SocketExGems.prototype.constructor = Window_SocketExGems;

Window_SocketExGems.prototype.initialize = function(x, y, width, height) {
	Window_SocketExList.prototype.initialize.call(this, x, y, width, height);
};

Window_SocketExGems.prototype.includes = function(item) {
	if (item === null) { return true; }
	if (DataManager.isArmor(item)) {
		if (item.atypeId === 0) {
			switch (this._itemCategory) {
				case "weapon":
					return item.socketInfo.forWeapon(this._itemRef.wtypeId);
				break;
				
				case "armor":
					return item.socketInfo.forArmor(this._itemRef.atypeId);
				break;
				
				default:
					console.warn("Unknown category! "+this._itemCategory);
					return true;
				break;
			}
		}
	}
	return false;
};

Window_SocketExGems.prototype.makeItemList = function() {
    if (this._itemRef === null) { this._data = []; return; }
	this._data = $gameParty.armors().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) {
        this._data.push(null);
    }
};

Window_SocketExGems.prototype.setItem = function(item) {
	item = item || null;
	this._itemRef = item;
	this._index = 0;
	this.refresh();
	this.resetScroll();
};

Window_SocketExGems.prototype.setActor = function(actor) {
	if (actor) {
		this._actor = actor;
	}
};

Window_SocketExGems.prototype.select = function(index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
	this.callUpdateHelp();
};

Window_SocketExGems.prototype.setItemCategory = function(itemCategory) {
	this._itemCategory = itemCategory;
};

Window_SocketExGems.prototype.updateHelp = function() {
	if (this.item() !== null) {
		Window_SocketExList.prototype.updateHelp.call(this);
	} else {
		this._helpWindow.setText('Test Text!');
	}
}

//=============================================================================
// Scene_SocketEx
//=============================================================================
function Scene_SocketEx() {
    this.initialize.apply(this, arguments);
}

Scene_SocketEx.prototype = Object.create(Scene_ItemBase.prototype);
Scene_SocketEx.prototype.constructor = Scene_SocketEx;

Scene_SocketEx.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
	this._itemWidth = (Graphics.boxWidth * 0.7);
};

Scene_SocketEx.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCategoryWindow();
    this.createItemWindow();
	this.createSocketWindow();
	this.createGemWindow();
};

Scene_SocketEx.prototype.createHelpWindow = function() {
	Scene_ItemBase.prototype.createHelpWindow.call(this);
	//this._helpWindow.width = this._itemWidth;
};

Scene_SocketEx.prototype.createCategoryWindow = function() {
	this._categoryWindow = new Window_SocketExCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.y = this._helpWindow.height;
	this._categoryWindow.width = this._helpWindow.width;
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};

Scene_SocketEx.prototype.createItemWindow = function() {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_SocketExList(0, wy, this._itemWidth, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
};

Scene_SocketEx.prototype.createSocketWindow = function() {
    var wy = this._itemWindow.y;
    var wh = this._itemWindow.height * 0.5;
	var wx = this._itemWindow.x + this._itemWindow.width;
	var ww = Graphics.boxWidth - wx;
    this._socketWindow = new Window_SocketExSockets(wx, wy, ww, wh);
    this._socketWindow.setHelpWindow(this._helpWindow);
    this._socketWindow.setHandler('ok',     this.onSocketOk.bind(this));
    this._socketWindow.setHandler('cancel', this.onSocketCancel.bind(this));
    this.addWindow(this._socketWindow);
    this._itemWindow.setSocketWindow(this._socketWindow);
};

Scene_SocketEx.prototype.createGemWindow = function() {
    var wy = this._socketWindow.y + this._socketWindow.height;
    var wh = this._socketWindow.height;
	var wx = this._socketWindow.x;
	var ww = this._socketWindow.width;
    this._gemWindow = new Window_SocketExGems(wx, wy, ww, wh);
    this._gemWindow.setHelpWindow(this._helpWindow);
    this._gemWindow.setHandler('ok',     this.onGemOk.bind(this));
    this._gemWindow.setHandler('cancel', this.onGemCancel.bind(this));
    this.addWindow(this._gemWindow);
    this._categoryWindow.setGemWindow(this._gemWindow);
	this._itemWindow.setSocketWindow(this._socketWindow);
	this._itemWindow.setGemWindow(this._gemWindow);
	this._socketWindow.setGemWindow(this._gemWindow);
};

Scene_SocketEx.prototype.onCategoryOk = function() {
	this._itemWindow.activate();
    this._itemWindow.selectLast();
};

Scene_SocketEx.prototype.onItemOk = function() {
	if (this._socketWindow.item()) {
		this._socketWindow.activate();
		//this._socketWindow.selectLast();
	} else {
		SoundManager.playBuzzer();
		this._itemWindow.activate();
		this._itemWindow.selectLast();
	}
};

Scene_SocketEx.prototype.onItemCancel = function() {
	this._itemWindow.deselect();
	this._socketWindow.setItem(null);
	this._socketWindow.refresh();
	this._gemWindow.setItem(null);
	this._gemWindow.refresh();
    this._categoryWindow.activate();
};

Scene_SocketEx.prototype.onSocketOk = function() {
	this._gemWindow.select(0);
	this._gemWindow.activate();
};

Scene_SocketEx.prototype.onSocketCancel = function() {
    this._socketWindow.deselect();
    this._itemWindow.activate();
};

Scene_SocketEx.prototype.onGemOk = function() {
	var socket = this._socketWindow.item();
	var item = this._socketWindow._itemRef;
	var socketItem = this._gemWindow.item();
	if (socketItem === null) {
		var oldItem = socket.removeItem();
	} else {
		var oldItem = socket.insertItem(socketItem);
		$gameParty.loseItem(socketItem, 1, false);
	}
	if (oldItem) { $gameParty.gainItem(oldItem, 1); }
	item.socketsEx.update(item);
	SoundManager.playEquip();
	this._itemWindow.refresh();
	this._socketWindow.refresh();
	this._gemWindow.refresh();
	this._gemWindow.deselect();
	this._socketWindow.activate();
};

Scene_SocketEx.prototype.onGemCancel = function() {
    this._gemWindow.deselect();
    this._socketWindow.activate();
};