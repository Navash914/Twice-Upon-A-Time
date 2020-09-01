//=================================================================================
// Scene_Item
//=================================================================================

Scene_Item.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCategoryWindow();
    this.createItemWindow();
    this.createActorWindow();
    this.createSubCategoryWindow(); // Create the subcategory window
};

Scene_Item.prototype.createCategoryWindow = function() {
    this._categoryWindow = new Window_ItemCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.y = this._helpWindow.height;
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
 //   this._categoryWindow.setHandler('subItem',     this.onCategorySubOk.bind(this));
 //   this._categoryWindow.setHandler('subWeapon',     this.onCategorySubOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};

Scene_Item.prototype.createSubCategoryWindow = function() {
    this._subcategoryWindow = new Window_ItemSubcategory();
    this._subcategoryWindow.setHelpWindow(this._helpWindow);
    this._subcategoryWindow.y = this._helpWindow.height;
    this._subcategoryWindow.setHandler('ok',     this.onSubCategoryOk.bind(this));
    this._subcategoryWindow.setHandler('cancel', this.onSubCategoryCancel.bind(this));
    this.addWindow(this._subcategoryWindow);
    this._categoryWindow.setItemWindow(this._subcategoryWindow);
    this._subcategoryWindow.deselect();
    this._subcategoryWindow.hide();
};

Scene_Item.prototype.createItemWindow = function() {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._subcategoryWindow.setItemWindow(this._itemWindow);
};

Scene_Item.prototype.onCategoryOk = function() {
    this._subcategoryWindow.show();
    this._subcategoryWindow.activate();
    this._subcategoryWindow.selectLast();
 //   this._itemWindow.activate();
 //    this._itemWindow.selectLast();
};

Scene_Item.prototype.onSubCategoryOk = function() {
    this._itemWindow.activate();
     this._itemWindow.selectLast();
};

Scene_Item.prototype.onSubCategoryCancel = function() {
    this._subcategory.deselect();
    this._subcategory.hide();
    this._categoryWindow.activate();
//   this._categoryWindow.selectLast();
};


Scene_Item.prototype.onItemOk = function() {
    $gameParty.setLastItem(this.item());
    this.determineItem();
};

Scene_Item.prototype.onItemCancel = function() {
    this._itemWindow.deselect();
    this._subcategoryWindow.activate();
};


//=================================================================================
// Window_ItemCategory
//=================================================================================

Window_ItemCategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};

Window_ItemCategory.prototype.makeCommandList = function() {
    this.addCommand(TextManager.item,    'item');
    this.addCommand(TextManager.weapon,  'weapon');
    this.addCommand(TextManager.armor,   'armor');
    this.addCommand(TextManager.keyItem, 'keyItem');
};

Window_ItemCategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
    this.update();
};

//=================================================================================
// Window_ItemSubcategory
//=================================================================================

Window_ItemSubcategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};

Window_ItemSubcategory.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
     //   this.resetScroll();
    }
};

Window_ItemSubcategory.prototype.makeCommandList = function() {
    switch (this._category) {
        case 'item':
        this.addCommand('Consumables',    'consume');
        this.addCommand('Battle',    'battle');
        break;
        case 'weapon':
        this.addCommand('Sword',    'sword');
        this.addCommand('Staff',    'staff');
        break;
        case 'armor':
        this.addCommand('Male Armor',    'Marmor');
        this.addCommand('Female Armor',    'Farmor');
        break;
        case 'accessory':
        this.addCommand('Belt',    'belt');
        this.addCommand('Earring',    'ear');
        break;
        default:
        break;
    }
};

Window_ItemSubcategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
    this.update();
};

//=================================================================================
// Window_ItemList
//=================================================================================

Window_ItemList.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        this.resetScroll();
    }
};

Window_ItemList.prototype.includes = function(item) {
    switch (this._category) {
    case 'consume':
        return DataManager.isItem(item) && item.itypeId === 1;
    case 'battle':
        return DataManager.isWeapon(item);
    case 'sword':
        return DataManager.isArmor(item);
    case 'staff':
        return DataManager.isItem(item) && item.itypeId === 2;
    case 'Marmor':
        return DataManager.isItem(item) && item.itypeId === 2;
    case 'Farmor':
        return DataManager.isItem(item) && item.itypeId === 2;
    case 'belt':
        return DataManager.isItem(item) && item.itypeId === 2;
    case 'ear':
        return DataManager.isItem(item) && item.itypeId === 2;
    default:
        return false;
    }
};