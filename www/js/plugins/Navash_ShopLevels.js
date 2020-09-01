var Navash = Navash || {};
Navash.SLV = Navash.SLV || {};
Navash.SLV.version = 1.00;

/*:
*
*
*@param Level Distribution
*
*@param Gauge Color 1
*@default 18
*
*@param Gauge Color 2
*@default 10
*
*
*/

//==============================================================================
// Plugin Parameters
//==============================================================================

Navash.Parameters = PluginManager.parameters('Navash_ShopLevels');
Navash.Param = Navash.Param || {};

Navash.Param.SLVLevelDist = String(Navash.Parameters['Level Distribution']);
var tempDist = Navash.Param.SLVLevelDist.split(',');
Navash.Param.SLVLevelDist = ['',''];
Navash.Param.SLVLevelDist = Navash.Param.SLVLevelDist.concat(tempDist);
Navash.Param.SLVGC1 = Number(Navash.Parameters['Gauge Color 1']);
Navash.Param.SLVGC2 = Number(Navash.Parameters['Gauge Color 2']);

//==============================================================================
// Scene_Shop
//==============================================================================

Navash.SLV.createShop = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    Navash.SLV.createShop.call(this);
    this.createLevelWindow();
};

Scene_Shop.prototype.createDummyWindow = function() {
    var wy = this._commandWindow.y + this._commandWindow.height;
    var wh = Graphics.boxHeight - wy - 72;
    var ww = Math.ceil(eval(Yanfly.Param.ShopListWidth));
    this._dummyWindow = new Window_Base(0, wy, ww, wh);
    this.addWindow(this._dummyWindow);
};

Scene_Shop.prototype.createStatusWindow = function() {
    var wx = this._dummyWindow.width;
    var wy = this._dummyWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._dummyWindow.height;
    this._statusWindow = new Window_ShopStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._sellWindow.setStatusWindow(this._statusWindow);
};

Scene_Shop.prototype.createLevelWindow = function() {
    var wx = 0;
    var wy = this._dummyWindow.y + this._dummyWindow.height;
    var ww = this._dummyWindow.width;
    var wh = Graphics.boxHeight - wy;
    this._levelWindow = new Window_ShopLevel(wx, wy, ww, wh);
    this.addWindow(this._levelWindow);
};

Navash.SLV.onBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    Navash.SLV.onBuy.call(this, number);
    var change = number * this.buyingPrice();
    $gameSystem.addShopExp(change);
    this._levelWindow.refresh();
};

Navash.SLV.onSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
    Navash.SLV.onSell.call(this, number);
    var change = number * this.sellingPrice();
    $gameSystem.addShopExp(change);
    this._levelWindow.refresh();
};

Scene_Shop.prototype.commandEquip = function() {  
    this._actorWindow.activate();
    this._actorWindow.show();
    this._actorWindow.select(0);
    this._levelWindow.hide();
};

Scene_Shop.prototype.onActorOk = function() {
    this.onActorCommon();
    if (this._commandWindow.currentSymbol() === 'equip') {
      SceneManager.push(Scene_Equip);
    }
};

Scene_Shop.prototype.onActorCancel = function() {
    this._actorWindow.hide();
    this._actorWindow.deselect();
    this._commandWindow.activate();
    this._levelWindow.show();
};

//==============================================================================
// Window_ShopLevel
//==============================================================================


function Window_ShopLevel() {
    this.initialize.apply(this, arguments);
}

Window_ShopLevel.prototype = Object.create(Window_Base.prototype);
Window_ShopLevel.prototype.constructor = Window_ShopLevel;

Window_ShopLevel.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this.drawShopExpGauge();
    this.drawShopLevelText();
};

Window_ShopLevel.prototype.refresh = function() {
    this.contents.clear();
    this.drawShopExpGauge();
    this.drawShopLevelText();
};

Window_ShopLevel.prototype.drawShopLevelText = function() {
    var text = 'Current Shop Level: ' + this.shopLevel();
    if (this.shopLevel() >= this.maxLevel()) text = 'Shop Level Max';
    var tx = this.textPadding();
    var ty = 0;
    var tw = this.contents.width / 2;
    this.drawText(text, tx, ty, tw, 'left');
};

Window_ShopLevel.prototype.drawShopExpGauge = function() {
    var gx = this.contents.width / 2;
    gx += this.textPadding();
    var gw = gx - this.textPadding() * 2;
    var color1 = this.getGaugeColor1();
    var color2 = this.getGaugeColor2();
    do {
        var rate = this.getShopExpRate();
        if (rate >= 1 && this.shopLevel() < this.maxLevel()) {
            $gameSystem.increaseShopLv();
        }
    }while(rate >= 1 && this.shopLevel() < this.maxLevel());
    this.drawGauge(gx, 0, gw, rate, color1, color2);
};

Window_ShopLevel.prototype.getGaugeColor1 = function() {
    return this.textColor(Navash.Param.SLVGC1);
};

Window_ShopLevel.prototype.getGaugeColor2 = function() {
    return this.textColor(Navash.Param.SLVGC2);
};

Window_ShopLevel.prototype.shopLevel = function() {
    return $gameSystem.currentShopLv();
};

Window_ShopLevel.prototype.currentExp = function() {
    return $gameSystem.currentShopExp();
};

Window_ShopLevel.prototype.expForLevel = function(level) {
    return Navash.Param.SLVLevelDist[level];
};

Window_ShopLevel.prototype.maxLevel = function() {
    return Navash.Param.SLVLevelDist.length - 1;
};

Window_ShopLevel.prototype.getShopExpRate = function() {
    var rate = 0;
    var level = this.shopLevel();
    if (level === this.maxLevel()) return 1.0;
    var exp = this.currentExp();
    var expBase = this.expForLevel(level);
    var expNext = this.expForLevel(level + 1);
    rate = (exp - expBase)/(expNext - expBase);
    rate = rate.clamp(0.0, 1.0);
    return rate;
};

//==============================================================================
// Window_ShopBuy
//==============================================================================

Window_ShopBuy.prototype.price = function(item) {
    var cost = this._price[this._data.indexOf(item)] || 0;
    var level = $gameSystem.currentShopLv();
    var maxLevel = level >= $gameSystem.maxShopLv();
    if (maxLevel) {
        cost *= 0.5;
    } else {
        cost *= 1 - ((level - 1) / 20);
    }
    cost = Math.floor(cost);
    console.log(cost);
    return cost;
};

Window_ShopBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];
    this._shopGoods.forEach(function(goods) {
        var item = null;
        switch (goods[0]) {
        case 0:
            item = $dataItems[goods[1]];
            break;
        case 1:
            item = $dataWeapons[goods[1]];
            break;
        case 2:
            item = $dataArmors[goods[1]];
            break;
        }
        if (item && (item.meta.ShopLevel <= $gameSystem.currentShopLv() || item.meta.ShopLevel === undefined)) {
            this._data.push(item);
            this._price.push(goods[2] === 0 ? item.price : goods[3]);
        }
    }, this);
};

//==============================================================================
// Game_System
//==============================================================================

Navash.SLV.initSystem = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    Navash.SLV.initSystem.call(this);
    this.initShopExp();
};

Game_System.prototype.initShopExp = function() {
    this._shopExp = 0;
    this._shopLv = 1;
};

Game_System.prototype.currentShopExp = function() {
    if (this._shopExp === undefined) this.initShopExp();
    return this._shopExp;
};

Game_System.prototype.addShopExp = function(value) {
    if (this._shopExp === undefined) this.initShopExp();
    this._shopExp += value;
};

Game_System.prototype.currentShopLv = function() {
    if (this._shopLv === undefined) this.initShopExp();
    return this._shopLv;
};

Game_System.prototype.increaseShopLv = function() {
    if (this._shopLv === undefined) this.initShopExp();
    this._shopLv++;
};

Game_System.prototype.maxShopLv = function() {
    return Navash.Param.SLVLevelDist.length - 1;
};