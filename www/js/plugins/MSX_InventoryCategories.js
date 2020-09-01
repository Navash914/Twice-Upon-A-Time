//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// MSX Inventory Categories
// Version: 1.2
// Author: Melosx
// Last Update: November 8th, 2016  08:16
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

var Imported = Imported || {};
Imported.MSX_InventoryCategories = true;

var MSX = MSX || {};
MSX.InventoryCategories = MSX.InventoryCategories || {};

 /*:
 * @plugindesc v1.2 Add new categories to inventory
 * @author Melosx
 *
 * @param Two-Level Menu
 * @desc Enable(true) or Disable(false) the new Item category menu.
 * true -> ENABLE      false -> DISABLE
 * @default true

 * @param Show/Hide Default Categories
 * @desc Show/Hide defaults categories excluding Key Item Category.
 * true -> SHOW        false -> HIDE
 * @default true
 *
 * @param Item Categories
 * @desc This is the order in which the categories will appear. Use
 * a comma to separate the each category.
 * @default Potions & Cures,PowerUps
 *
 * @param Weapon Categories
 * @desc This is the order in which the categories will appear. Use
 * a comma to separate the each category.
 * @default Swords,Maces,Wands
 *
 * @param Armor Categories
 * @desc This is the order in which the categories will appear. Use
 * a comma to separate the each category.
 * @default Shields,Head,Body
 *
 * @help
 * #=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
 * Introduction
 * #=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
 * This plugin allow you to add new categories in your inventory.
 * Also provide a notetag to set the correct category for the item.
 *
 * #=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
 * Parameters
 * #=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
 * Two-Level Menu
 *
 * Add a new layer in the Item Menu.
 * - Default Items command now contain the list of all categories
 *   related to Items.
 * - Default Weapons command now contain the list of all categories
 *   related to Weapons.
 * - Default Armors command now contain the list of all categories
 *   related to Armors.
 * - Key Item command is now inside Item categories list, at the
 *   end.
 *
 *
 * Show/Hide Default Categories
 *
 * - Default categories Items, Weapons, Armors can now be hidden.
 * - Default category Key Items is is always shown, at the end of
 *   all categories.
 *
 * #=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
 * !!IMPORTANT NOTES!!
 * #=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
 * If default command are hidden or Two Level Menu is enabled all
 * uncategorized item aren't shown in the list.
 *
 * #=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
 * Notetag
 * #=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
 *
 * Item/Weapon/Armor Notetag:
 *
 * 	 <Category: X>
 * 	 Where X is the name of the category you want the item.
 *   Example:
 * 	 <Category: Cooking>
 *
 * #=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
 * Changelog
 * #=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
 *
 * v1.2   Add -> Change the way the categories are read by the plugin.
 *               Can now have category names with more than one word.
 *
 * v1.1.2 Fix -> Game freeze caused by onSellCancel function.
 *
 * v1.1.1 Fix -> Game freeze caused by onItemCancel function.
 *               Actor window now appear correctly over other windows.
 *
 * v1.1   Add -> Weapon and Armor categorization.
 *               Enable/Disable two-level menu.
 *               Show/Hide default categories.
 *
 * v1.0 Initial release.
 */

var params = PluginManager.parameters("MSX_InventoryCategories");

MSX.InventoryCategories.TwoLevelMenu = String(params["Two-Level Menu"]);
MSX.InventoryCategories.DefaultCategories = String(params["Disable Default Categories"]);
MSX.InventoryCategories.ItemCategories = String(params["Item Categories"]);
MSX.InventoryCategories.WeaponCategories = String(params["Weapon Categories"]);
MSX.InventoryCategories.ArmorCategories = String(params["Armor Categories"]);


MSX.InventoryCategories.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!MSX.InventoryCategories.DataManager_isDatabaseLoaded.call(this)) return false;
  this.setItemCategory($dataItems);
  this.setItemCategory($dataWeapons);
  this.setItemCategory($dataArmors);
  return true;
};

DataManager.setItemCategory = function(items) {
	for(var n = 1; n < items.length; n++){
		var itm = items[n];
		var notedata = itm.note.split(/[\r\n]+/);
		itm.customCategory = '';
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<(?:Category):[ ](.*)>/i)) {
				itm.customCategory = String(RegExp.$1).toLowerCase();
			}
		}
	}
};

Window_ItemCategory.prototype.makeCommandList = function() {
	this._itemCategories = MSX.InventoryCategories.ItemCategories.split(',');
	this._weaponCategories = MSX.InventoryCategories.WeaponCategories.split(',');
	this._armorCategories = MSX.InventoryCategories.ArmorCategories.split(',');
	if(eval(MSX.InventoryCategories.DefaultCategories)){
		this.addCommand(TextManager.item,    'item');
		this.addCommand(TextManager.weapon,  'weapon');
		this.addCommand(TextManager.armor,   'armor');
	}
	if(eval(MSX.InventoryCategories.TwoLevelMenu)){
		this.addCommand(TextManager.item,    'tlm_item');
		this.addCommand(TextManager.weapon,  'tlm_weapon');
		this.addCommand(TextManager.armor,   'tlm_armor');
	}
	if(!eval(MSX.InventoryCategories.TwoLevelMenu)){
		for (var i = 0; i < this._itemCategories.length; ++i) {
			this.addCommand(this._itemCategories[i], this._itemCategories[i].toLowerCase());
		}
		for (var i = 0; i < this._weaponCategories.length; ++i) {
			this.addCommand(this._weaponCategories[i], this._weaponCategories[i].toLowerCase());
		}
		for (var i = 0; i < this._armorCategories.length; ++i) {
			this.addCommand(this._armorCategories[i], this._armorCategories[i].toLowerCase());
		}
		this.addCommand(TextManager.keyItem, 'keyItem');
	}
};

MSX.InventoryCategories.Window_itemList_includes = Window_ItemList.prototype.includes;
Window_ItemList.prototype.includes = function(item) {
	if (item === null) {
		return false;
	}
	if(!item.customCategory){
		return MSX.InventoryCategories.Window_itemList_includes.call(this, item);
	}else{
		if(DataManager.isItem(item))
			return DataManager.isItem(item) && item.itypeId === 1 && item.customCategory === this._category;
		if(DataManager.isWeapon(item))
			return DataManager.isWeapon(item) && item.customCategory === this._category;
		if(DataManager.isArmor(item))
			return DataManager.isArmor(item) && item.customCategory === this._category;
	}
	return false;
};

if(eval(MSX.InventoryCategories.TwoLevelMenu)){

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// CustomItemCategory Window
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
function Window_CustomItemCategory() {
    this.initialize.apply(this, arguments);
}

Window_CustomItemCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_CustomItemCategory.prototype.constructor = Window_CustomItemCategory;

Window_CustomItemCategory.prototype.makeCommandList = function() {
	this._itemCategories = MSX.InventoryCategories.ItemCategories.split(',');
	for (var i = 0; i < this._itemCategories.length; ++i) {
		this.addCommand(this._itemCategories[i], this._itemCategories[i].toLowerCase());
	}

    this.addCommand(TextManager.keyItem, 'keyItem');
};

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// CustomWeaponCategory Window
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
function Window_CustomWeaponCategory() {
    this.initialize.apply(this, arguments);
}

Window_CustomWeaponCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_CustomWeaponCategory.prototype.constructor = Window_CustomWeaponCategory;

Window_CustomWeaponCategory.prototype.makeCommandList = function() {
	this._weaponCategories = MSX.InventoryCategories.WeaponCategories.split(',');
	for (var i = 0; i < this._weaponCategories.length; ++i) {
		this.addCommand(this._weaponCategories[i], this._weaponCategories[i].toLowerCase());
	}
};


//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// CustomArmorCategory Window
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
function Window_CustomArmorCategory() {
    this.initialize.apply(this, arguments);
}

Window_CustomArmorCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_CustomArmorCategory.prototype.constructor = Window_CustomArmorCategory;

Window_CustomArmorCategory.prototype.makeCommandList = function() {
	this._armorCategories = MSX.InventoryCategories.ArmorCategories.split(',');
	for (var i = 0; i < this._armorCategories.length; ++i) {
		this.addCommand(this._armorCategories[i], this._armorCategories[i].toLowerCase());
	}
};

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Menu Mod
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
MSX.InventoryCategories.Scene_Item_create = Scene_Item.prototype.create;
 Scene_Item.prototype.create = function() {
	MSX.InventoryCategories.Scene_Item_create.call(this);
    this.createCustomCategoriesWindow();
    this.createActorWindow();
};

Scene_Item.prototype.createCustomCategoriesWindow = function() {
	this.createCustomItemCategoryWindow();
	this.createCustomWeaponCategoryWindow();
	this.createCustomArmorCategoryWindow();
};

Scene_Item.prototype.createCustomItemCategoryWindow = function() {
    this._customItemCategoryWindow = new Window_CustomItemCategory();
    this._customItemCategoryWindow.setHelpWindow(this._helpWindow);
    this._customItemCategoryWindow.y = this._helpWindow.height;
	this._customItemCategoryWindow.hide();
	this._customItemCategoryWindow.deactivate();
    this._customItemCategoryWindow.setHandler('ok',     this.onCustomCategoryOk.bind(this));
    this._customItemCategoryWindow.setHandler('cancel', this.onCustomCategoryCancel.bind(this));
    this.addWindow(this._customItemCategoryWindow);
};

Scene_Item.prototype.createCustomWeaponCategoryWindow = function() {
    this._customWeaponCategoryWindow = new Window_CustomWeaponCategory();
    this._customWeaponCategoryWindow.setHelpWindow(this._helpWindow);
    this._customWeaponCategoryWindow.y = this._helpWindow.height;
	this._customWeaponCategoryWindow.hide();
	this._customWeaponCategoryWindow.deactivate();
    this._customWeaponCategoryWindow.setHandler('ok',     this.onCustomCategoryOk.bind(this));
    this._customWeaponCategoryWindow.setHandler('cancel', this.onCustomCategoryCancel.bind(this));
    this.addWindow(this._customWeaponCategoryWindow);
};

Scene_Item.prototype.createCustomArmorCategoryWindow = function() {
    this._customArmorCategoryWindow = new Window_CustomArmorCategory();
    this._customArmorCategoryWindow.setHelpWindow(this._helpWindow);
    this._customArmorCategoryWindow.y = this._helpWindow.height;
	this._customArmorCategoryWindow.hide();
	this._customArmorCategoryWindow.deactivate();
    this._customArmorCategoryWindow.setHandler('ok',     this.onCustomCategoryOk.bind(this));
    this._customArmorCategoryWindow.setHandler('cancel', this.onCustomCategoryCancel.bind(this));
    this.addWindow(this._customArmorCategoryWindow);
};

MSX.InventoryCategories.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function() {
	MSX.InventoryCategories.Scene_Item_createItemWindow.call(this);
    this._categoryWindow.setItemWindow();
};

Scene_Item.prototype.onCategoryOk = function() {
	this._categoryWindow.hide();
	this._categoryWindow.deactivate();
	switch(this._categoryWindow.currentSymbol()){
		case 'tlm_item':
			this._customItemCategoryWindow.setItemWindow(this._itemWindow);
			this._customItemCategoryWindow.activate();
			this._customItemCategoryWindow.show();
			break;
		case 'tlm_weapon':
			this._customWeaponCategoryWindow.setItemWindow(this._itemWindow);
			this._customWeaponCategoryWindow.activate();
			this._customWeaponCategoryWindow.show();
			break;
		case 'tlm_armor':
			this._customArmorCategoryWindow.setItemWindow(this._itemWindow);
			this._customArmorCategoryWindow.activate();
			this._customArmorCategoryWindow.show();
			break;
	};
	this._itemWindow.refresh();
};

Scene_Item.prototype.onCustomCategoryOk = function() {
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};

Scene_Item.prototype.onCustomCategoryCancel = function() {
    this._customItemCategoryWindow.hide();
    this._customItemCategoryWindow.deactivate();
	this._customItemCategoryWindow.setItemWindow();
    this._customWeaponCategoryWindow.hide();
    this._customWeaponCategoryWindow.deactivate();
	this._customWeaponCategoryWindow.setItemWindow();
    this._customArmorCategoryWindow.hide();
    this._customArmorCategoryWindow.deactivate();
	this._customArmorCategoryWindow.setItemWindow();
	this._itemWindow.contents.clear();
    this._categoryWindow.activate();
    this._categoryWindow.show();
};

Scene_Item.prototype.onItemCancel = function() {
    this._itemWindow.deselect();
	switch(this._categoryWindow.currentSymbol()){
		case 'tlm_item':
			this._customItemCategoryWindow.activate();
			break;
		case 'tlm_weapon':
			this._customWeaponCategoryWindow.activate();
			break;
		case 'tlm_armor':
			this._customArmorCategoryWindow.activate();
			break;
	};
};

//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
// Shop Mod
//#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
MSX.InventoryCategories.Scene_Shop_create = Scene_Shop.prototype.create;
 Scene_Shop.prototype.create = function() {
	MSX.InventoryCategories.Scene_Shop_create.call(this);
    this.createCustomCategoriesWindow();
};

Scene_Shop.prototype.createCustomCategoriesWindow = function() {
	this.createCustomItemCategoryWindow();
	this.createCustomWeaponCategoryWindow();
	this.createCustomArmorCategoryWindow();
};

Scene_Shop.prototype.createCustomItemCategoryWindow = function() {
    this._customItemCategoryWindow = new Window_CustomItemCategory();
    this._customItemCategoryWindow.setHelpWindow(this._helpWindow);
    this._customItemCategoryWindow.y = this._dummyWindow.y;

	this._customItemCategoryWindow.hide();
	this._customItemCategoryWindow.deactivate();
    this._customItemCategoryWindow.setHandler('ok',     this.onCustomCategoryOk.bind(this));
    this._customItemCategoryWindow.setHandler('cancel', this.onCustomCategoryCancel.bind(this));
    this.addWindow(this._customItemCategoryWindow);
};

Scene_Shop.prototype.createCustomWeaponCategoryWindow = function() {
    this._customWeaponCategoryWindow = new Window_CustomWeaponCategory();
    this._customWeaponCategoryWindow.setHelpWindow(this._helpWindow);
    this._customWeaponCategoryWindow.y = this._dummyWindow.y;
	this._customWeaponCategoryWindow.hide();
	this._customWeaponCategoryWindow.deactivate();
    this._customWeaponCategoryWindow.setHandler('ok',     this.onCustomCategoryOk.bind(this));
    this._customWeaponCategoryWindow.setHandler('cancel', this.onCustomCategoryCancel.bind(this));
    this.addWindow(this._customWeaponCategoryWindow);
};

Scene_Shop.prototype.createCustomArmorCategoryWindow = function() {
    this._customArmorCategoryWindow = new Window_CustomArmorCategory();
    this._customArmorCategoryWindow.setHelpWindow(this._helpWindow);
    this._customArmorCategoryWindow.y = this._dummyWindow.y;
	this._customArmorCategoryWindow.hide();
	this._customArmorCategoryWindow.deactivate();
    this._customArmorCategoryWindow.setHandler('ok',     this.onCustomCategoryOk.bind(this));
    this._customArmorCategoryWindow.setHandler('cancel', this.onCustomCategoryCancel.bind(this));
    this.addWindow(this._customArmorCategoryWindow);
};

Scene_Shop.prototype.onCategoryOk = function() {
   this._categoryWindow.hide();
	this._categoryWindow.deactivate();
	switch(this._categoryWindow.currentSymbol()){
		case 'tlm_item':
			this._customItemCategoryWindow.setItemWindow(this._sellWindow);
			this._customItemCategoryWindow.activate();
			this._customItemCategoryWindow.show();
			break;
		case 'tlm_weapon':
			this._customWeaponCategoryWindow.setItemWindow(this._sellWindow);
			this._customWeaponCategoryWindow.activate();
			this._customWeaponCategoryWindow.show();
			break;
		case 'tlm_armor':
			this._customArmorCategoryWindow.setItemWindow(this._sellWindow);
			this._customArmorCategoryWindow.activate();
			this._customArmorCategoryWindow.show();
			break;
	}
	this._sellWindow.refresh();
};

Scene_Shop.prototype.onCustomCategoryOk = function() {
    this.activateSellWindow();
    this._sellWindow.select(0);
};

Scene_Shop.prototype.onSellCancel = function() {
    this._sellWindow.deselect();
	switch(this._categoryWindow.currentSymbol()){
		case 'tlm_item':
			this._customItemCategoryWindow.activate();
			break;
		case 'tlm_weapon':
			this._customWeaponCategoryWindow.activate();
			break;
		case 'tlm_armor':
			this._customArmorCategoryWindow.activate();
			break;
	};
    this._statusWindow.setItem(null);
    this._helpWindow.clear();
};

Scene_Shop.prototype.onCustomCategoryCancel = function() {
    this._customItemCategoryWindow.hide();
    this._customItemCategoryWindow.deactivate();
	this._customItemCategoryWindow.setItemWindow();
    this._customWeaponCategoryWindow.hide();
    this._customWeaponCategoryWindow.deactivate();
	this._customWeaponCategoryWindow.setItemWindow();
    this._customArmorCategoryWindow.hide();
    this._customArmorCategoryWindow.deactivate();
	this._customArmorCategoryWindow.setItemWindow();
	this._sellWindow.contents.clear();
    this._categoryWindow.activate();
    this._categoryWindow.show();
};

MSX.InventoryCategories.Scene_Shop_createSellWindow = Scene_Shop.prototype.createSellWindow;
Scene_Shop.prototype.createSellWindow = function() {
    MSX.InventoryCategories.Scene_Shop_createSellWindow.call(this);
    this._categoryWindow.setItemWindow();
};

}



