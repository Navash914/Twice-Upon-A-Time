//=============================================================================
// Ryuk_AddItemType.js
//=============================================================================

/*:
 * @plugindesc Create and add new types of items to distinguish your items category . This plugin add "loot" type.
 *
 * @author Ryuk
 *
 * @help Welcome to AddTypeItem.
 * This plugin add news types of items. If you active this plugin, it will add 
 * "Loot" menu beneath Key Item.
 *
 * === How use it ===
 * After activate this plugin, to add your item in loot Menu, you need to go
 * on your item and write in note :
 * 		<loot>
 * For example player can drop Wings Bat and you wish distinguish this items
 * with others item. Then, write <loot> and your item will be in loot Menu!
 * Don't forget to make your item in Hidden Item, else he will be visible in 
 * Item Menu
 * 
 *
 * === More Option ===
 * As you can see, you can change the position of loot Menu. So if you want
 * put Loot Menu before Item, you need all shifted.
 * For example :
 * 		Loot 0
 * 		Item 1
 * 		Weapon 2
 * 		Armor 3
 * 		Key Item 4
 *
 *
 *
 *
 *
 * @param Position Item
 * @desc Define position of Item Menu
 * @default 0
 * 
 * @param Position Weapon
 * @desc Define position of Weapon Menu
 * @default 1
 * 
 * @param Position Armor
 * @desc Define position of Armor Menu
 * @default 2
 *
 * @param Position Key
 * @desc Define position of Key Menu
 * @default 3
 * 
 * @param Position Loop
 * @desc Define position of Loop Menu
 * @default 4


 */
(function () {
	var parameters = PluginManager.parameters('Ryuk_AddTypeItem');
	var item = String(parameters['Position Item']);
	var weapon = String(parameters['Position Weapon']);
	var armor = String(parameters['Position Armor']);
	var key = String(parameters['Position Key']);
	var loop = String(parameters['Position Loop']);

	Window_ItemCategory.prototype.makeCommandList = function() {
		for (i = 0; i < 5; i++)
		{
			if (item == i)
	    		this.addCommand(TextManager.item, 'item');
	    	else if (weapon == i)
	    		this.addCommand(TextManager.weapon, 'weapon');
	    	else if (armor == i)
	    		this.addCommand(TextManager.armor, 'armor');
	    	else if (key == i)
	    		this.addCommand(TextManager.keyItem, 'keyItem');
	    	else if (loop == i)
	    		this.addCommand('Loop', 'loop');
		}
	};

	Window_ItemList.prototype.includes = function(item) {
	    switch (this._category) {
	    case 'item':
	        return DataManager.isItem(item) && item.itypeId === 1;
	    case 'weapon':
	        return DataManager.isWeapon(item);
	    case 'armor':
	        return DataManager.isArmor(item);
	    case 'keyItem':
	        return DataManager.isItem(item) && item.itypeId === 2;
	    case 'loop':
	        return item && item.note.match(/<loop>/m) ? true : false;
	    default:
	        return false;
	    };
	};
})();