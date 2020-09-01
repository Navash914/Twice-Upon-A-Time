//==
// Recipe Crafting MV Version 1.3d
//==

/*:
 * @plugindesc Take some items.. and make them into other items! That's crafting~
 * @author Vlue (with additions from DragonPC and MuteDay)
 *
 * @param Categories
 * @desc The various categories of crafting available
 * @default "Alchemy","Blacksmith","Tailor","Dismantle"
 *
 * @param Dismantle Category
 * @desc Category name for dismantling objects (Same name as in category)
 * @default Dismantle
 *
 * @param User Definable Max Level
 * @desc Define the Maximum level the player can reach in the crafting Interface (default - 99)
 * @default 99
 *
 * @param Category Icons
 * @desc The icons (index) to use for the crafting categories
 * @default 219,223,225,242
 *
 * @param Player Level Icon
 * @desc Icon displayed by Player level (if applicable) in crafting menu
 * @default 82
 *
 * @param Crafting XP Formula
 * @desc The exp needed to determine current crafting level (lvl)
 * @default 100 * lvl
 *
 * @param Dismantling Base Rate
 * @desc Default success rate (per material) for dismantling
 * @default 80
 *
 * @param Dismantling Base Return
 * @desc Default rate of materials returned for dismantling
 * @default 50
 *
 * @param Craft Multiple
 * @desc Allow crafting of multiple items at once
 * @default true
 *
 * @param Menu Craft Options
 * @desc Whether to allow crafting from menu (off, view, craft)
 * @default craft
 * 
 * @param Display Parameters
 * @desc Include/exclude various details from the recipe window
 * @default gold:true, chance:true, plevel:true, clevel:true
 *
 * @param Main Menu String
 * @desc String displayed in the main menu for crafting
 * @default Crafting
 *
 * @param Required Level Text
 * @desc Change Required Level text. (default - Required level:)
 * @default Required level:
 *
 * @param Required Material Text
 * @desc Change Required Materials text. (default - Required materials:)
 * @default Required materials:
 * 
 * @param Returned Material Text
 * @desc Change Returned Materials text. Reverse crafting (default - Returned materials:)
 * @default Returned materials:
 *
 * @param Reverse Recipe Prefix
 * @desc String appended to recipe name for reverse recipes (defualt - Dismantle)
 * @default Dismantle
 *
 * @param Success Rate Text
 * @desc Change Success Rate text. (default - Success rate:)
 * @default Success rate:
 *
 * @param Crafting Cost Text
 * @desc Change Crafting Cost text. (default - Crafting costs:)
 * @default Crafting costs:
 *
 * @param Crafting Text
 * @desc Change Crafting Text. (default - Craft)
 * @default Craft
 *
 * @param Crafted Text
 * @desc Change Crafted Text. (default - Crafted!)
 * @default Crafted!
 *
 * @param Crafting Failed
 * @desc Change Crafting Failed Text. (default - Crafting failed!)
 * @default Crafting failed! 
 *
 * @param Dismantle Text
 * @desc Change Dismantle Text. (default - Dismantle)
 * @default Dismantle
 *
 * @param Dismantled Text
 * @desc Change Dismantling Text. (default - obtained!)
 * @default obtained!
 *
 * @param Dismantle Fail
 * @desc Change dismantling fail text (default - No items obtained!)
 * @default No items obtained!
 *
 * @param Max Level Test
 * @desc Text Displayed when reaching max level in a profession.
 * @default MAX LEVEL
 *
 * @param Success 0-20 Color
 * @desc Change Color of the Percentage     (default - 18)
 * @default 18
 *
 * @param Success 20-40 Color
 * @desc Change Color of the Percentage     (default - 20)
 * @default 20
 *
 * @param Success 40-60 Color
 * @desc Change Color of the Percentage     (default - 21)
 * @default 21
 *
 * @param Success 60-80 Color
 * @desc Change Color of the Percentage     (default - 17)
 * @default 17
 *
 * @param Success 80-100 Color
 * @desc Change Color of the Percentage     (default - 29)
 * @default 29
 *
 * @param Crafting Succeded Sound
 * @desc Change Crafting Succeeded Sound.(Case Sensitive)       (default - Item3)
 * @default Item3
 *
 * @param Success Sound Volume
 * @desc Change Crafting Succeeded Sound Volume.        (default - 90)
 * @default 90
 *
 * @param Crafting Failed Sound
 * @desc Change Crafting Failed Sound.(Case Sensitive)      (default - Scream)
 * @default Buzzer2
 *
 * @param Fail Sound Volume
 * @desc Change Crafting Failed Sound Volume.       (default - 90)
 * @default 90
 *
 * @help Recipe Crafting MV v1.3d!
 *  Follow me on twitter: https://twitter.com/DaimoniousTails
 *   Or facebook: https://www.facebook.com/DaimoniousTailsGames/
 *   for the most recent updates!
 *  Find all of my work here: http://daimonioustails.weebly.com/
 *
 * Plugin Commands:
 *  crafting call categoryName            (Example: crafting call Alchemy)
 *  crafting learn recipeID               (Example: crafting learn 1)
 *  crafting forget recipeID
 *
 * Item Tags:
 *  <learn recipe #>             (While this item is in inventory, the recipe is known)
 *
 * Script Calls:
 *  $gameParty.recipeKnown(recipeId)	  (Checks whether a certain recipe is known or not)
 *  $gameparty.getCraftLevel(craftingName)  (Returns the current level of the specific craft)
 *
 * Recipe Setup
 *  Recipes are to be created in a text file named Recipes.txt and placed in the
 *  /data folder of your project. If you notice there's no recipes you might have
 *  it in the wrong spot or not named right!
 * 
 *  <recipe#>
 *   name:recipeNameOverride
 *   result:{type:"itemtype", id:itemId, amount:numberCrafted}   
 *   <materials>                                 (itemtype is one of: "item","weapon",or "armor")
 *    {type:"itemtype", id:itemId, amount:numberRequired, cons:consumed?, rate:0-100, bonus:true/false}
 *    { + as many as you need }                          
 *   <materials>
 *   category:CategoryOfCraft                           (Name i.e. Blacksmith)
 *   goldCost:costInGold                                (Number)
 *   success:successRateBase                            (Number, 0 = 0%, 100 = 100%)
 *   successGain:successRateChangePerLevelDifference    (Number, %)
 *   level:levelRequired                                (Number)
 *   xp:craftingExpEarned                               (Number)
 *   xpDeprac:lossOfExpPerLevelDifference               (Number)
 *   craftLevel:craftingLevelRequired                   (Number)
 *   pxp:PlayerExpEarned                                (Number)
 *   reverse:whetherReverseRecipe						(Boolean i.e. true)
 *   craftMultiple:allowMultipleCrafts                  (Boolean i.e. true)
 *   known:whetherRecipeIsKnownFromStart                (Boolean i.e. true)
 *   returnRate:%ofMaterialsFromDismantle               (Number, 0 = 0%, 100 = 100%)
 *  <recipe#>
 *
 *  Everything from goldCost to craftMultiple is optional (will be set to default 0-1 values)
 *  Reverse recipes switch the result and materials value (costing results and returning materials)
 *   In reverse recipes the chance of receiveing a material is it's rate value.
 *  Bonus materials are materials that are obtained from dismantling (they are not included in crafting).
 * 
 *  Simplest recipe (example):
 *   <recipe1>
 *    recipe:{type:"armor", id:3, amount:1}
 *    <materials>
 *     {type:"armor", id:1, amount:3, cons:false}
 *    <materials>
 *    category:Blacksmith
 *   <recipe1>
 *
 *  Full Recipe (example):
 *   <recipe1>
 *    result:{type:"armor", id:3, amount:1}
 *    <materials>
 *    {type:"weapon", id:3, amount:3, cons:false}
 *    {type:"armor", id:2, amount:3, cons:false}
 *    <materials>
 *    goldCost:0
 *    success:80
 *    successGain:2
 *    level:1
 *    category:Alchemy
 *    xp:10
 *    xpDeprac:2
 *    craftLevel:1
 *    pxp:5
 *    craftMultiple:true
 *    known:true
 *   <recipe1>
 *
 */

var $gameRecipes = null;
 
function Scene_Crafting() {
		this.initialize.apply(this, arguments);
	}
Scene_Crafting.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Crafting.prototype.constructor = Scene_Crafting;
 
(function() {

	var parameters = PluginManager.parameters('RecipeCrafting');
	var categoryNames = eval("[" + (parameters['Categories'] || '"Alchemy","Blacksmith","Tailor"') + "]");
	var dismantleText = parameters['Dismantle Category'] || "Dismantle";
	var categoryIcons = eval("[" + (parameters['Category Icons'] || "219,223,225,242") + "]");
	var xpFormula = parameters['Crafting XP Formula'] || "100 * lvl";
	var dsmBaseRate = Number(parameters['Dismantling Base Rate'] || 80);
	var dsmBaseReturn = Number(parameters['Dismantling Base Return'] || 50);
	var craftMultiple = (parameters['Craft Multiple'] || "true").toLowerCase() == "true";
	var craftFromMenu = parameters['Menu Craft Options'] || "craft";
	var craftingMenuString = parameters['Main Menu String'] || "Crafting"
	var tempdParam = "gold:true, chance:true, plevel:true, clevel:true"
	var displayParam = eval( "( { " + (parameters['Display Parameters'] || tempdParam) + " } )");
	var playerLevelIcon = parameters['Player Level Icon'] || 82;
	var reqlevel = parameters['Required Level Text'] || 'Required level:';
    var reqmaterial = parameters['Required Material Text'] || 'Required material:';
	var matreturn = parameters['Return Material Text'] || 'Returned materials:';
	var reversePrefix = parameters['Reverse Recipe Prefix'] || 'Dismantle';
    var sucRate = parameters['Success Rate Text'] || 'Success rate:';
    var craCost = parameters['Crafting Cost Text'] || 'Crafting costs:';
    var craText = parameters['Crafting Text'] || 'Craft';
	var dsmText = parameters['Dismantle Text'] || 'Dismantle';
    var craftedText = parameters['Crafted Text'] || 'crafted!';
	var dismantledText = parameters['Dismantled Text'] || 'obtained!'
    var craFailed = parameters['Crafting Failed'] || 'Crafting failed!';
	var dsmFailed = parameters['Dismantle Fail'] || 'No items obtained!';
    var MLT = parameters['Max Level Test'] || 'MAX LEVEL';
    var success = parameters['Crafting Succeded Sound'] || 'Item3';
    var failure = parameters['Crafting Failed Sound'] || 'Buzzer2';
    var failureVol = Number(parameters['Fail Sound Volume'] || 90);
    var successVol = Number(parameters['Success Sound Volume'] || 90);
    var UDML = Number(parameters['User Definable Max Level'] || 99);
    var colorCPV1 = Number(parameters['Success 0-20 Color'] || 18);
    var colorCPV2 = Number(parameters['Success 20-40 Color'] || 20);
    var colorCPV3 = Number(parameters['Success 40-60 Color'] || 21);
    var colorCPV4 = Number(parameters['Success 60-80 Color'] || 17);
    var colorCPV5 = Number(parameters['Success 80-100 Color'] || 29);
	
	var categoryEventName = "";
	var craftingFromMenu = false;
	
	TextManager.getErrorDetails = function() {
		if($gameMap) {
			return "[Map: " + $gameMap._mapId + "] [Event: " + $gameMap._interpreter._eventId + "] : \n"
		}
	}
	DataManager.loadRecipeFile = function() {
		var xml = new XMLHttpRequest();
		var url = "data/Recipes.txt";
		xml.onload = function() {
			if(xml.status < 400) {
				DataManager.createRecipes(xml.responseText);
			}
		}
		xml.open("GET",url,true);
		xml.send();
	}
	var crafting_DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = function() {
		crafting_DataManager_createGameObjects.call(this);
		this.loadRecipeFile();
	}
	DataManager.createRecipes = function(recipeData) {
		var recipes = [0];
		if(recipeData) {
			var numberOfRecipes = recipeData.match(/<recipe(\d+)>/g).length / 2;
			for(var i = 1;i <= numberOfRecipes;i++) {
				var recipeString = recipeData.match(new RegExp("<recipe" + i + '>([^.]+)<recipe' + i + ">"));
				if(recipeString) {
					recipes.push(new Recipe(i,this.createRecipeStruct(i, recipeString)));
				} else {
					throw new Error("Recipe list: Could not get data for recipe ID# " + i + ". Check your setup.");
				}
			}
		}
		$gameRecipes = recipes;
	}
	DataManager.createRecipeStruct = function(id, recipeData) {
		if(!recipeData[1].match(/result:/)) { 
			throw new Error("Recipe List: Recipe ID# " + id + " does not have a result.")
		}
		if(recipeData[1].match(/result:/g).length > 1) {
			throw new Error("Recipe List: Possible repeated recipe ID. (ID #" + id + ")");
		}
		var recipeStruct = {};
		recipeStruct.name = recipeData[1].match(/name:(.+)/);
		recipeStruct.result = recipeData[1].match(/result:(.+)/);
		recipeStruct.reverse = recipeData[1].match(/reverse:(.+)/);
		var materialData = recipeData[1].match(/<materials>([^.]+)<materials>/);
		if(materialData) {
			materialData = eval( "[" + materialData[1].split("}").join("},") + "]" );
		} else {
			throw new Error("Recipe List: Recipe ID# " + id + " does not have a proper material setup.")
		}
		recipeStruct.materials = materialData;
		recipeStruct.goldCost = recipeData[1].match(/goldCost:(.+)/);
		recipeStruct.success = recipeData[1].match(/success:(.+)/);
		recipeStruct.successGain = recipeData[1].match(/successGain:(.+)/);
		recipeStruct.level = recipeData[1].match(/level:(.+)/);
		recipeStruct.category = recipeData[1].match(/category:(.+)/);
		recipeStruct.xp = recipeData[1].match(/xp:(.+)/);
		recipeStruct.xpDeprac = recipeData[1].match(/xpDeprac:(.+)/);
		recipeStruct.craftLevel = recipeData[1].match(/craftLevel:(.+)/);
		recipeStruct.playerXp = recipeData[1].match(/pxp:(.+)/);
		recipeStruct.multiple = recipeData[1].match(/craftMultiple:(.+)/);
		recipeStruct.known = recipeData[1].match(/known:(.+)/);
		recipeStruct.returnRate = recipeData[1].match(/returnRate:(.+)/);
		return recipeStruct;
	}
	
	function Recipe() {
		this.initialize.apply(this, arguments);
	}
	Recipe.prototype.initialize = function(id, recipe) {
		this._id = id;
		try {
			this._result = new Material(eval("("+recipe.result[1]+")"));
		} catch(e) {
			throw new Error("Recipe List: Recipe ID# " + id + " does not have a proper result set up.")
		}
		this._name = recipe.name ? recipe.name[1] : null;
		this._returnRate = recipe.returnRate ? Number(recipe.returnRate[1]) : dsmBaseReturn;
		this._materials = [];
		for(var i = 0;i < recipe.materials.length;i++) {
			this._materials.push(new Material(recipe.materials[i], this._returnRate));
		}
		if(this._materials.length == 0) {
			throw new Error("Recipe List: Recipe ID# " + id + " does not have any set materials.")
		}
		this._goldCost = recipe.goldCost ? Number(recipe.goldCost[1]) : 0;
		this._success = recipe.success ? Number(recipe.success[1]) : 100;
		this._successGain = recipe.successGain ? Number(recipe.successGain[1]) : 0;
		this._level = recipe.level ? Number(recipe.level[1]) : 0;
		this._category = recipe.category ? recipe.category[1] : categoryNames[0];
		this._xp = recipe.xp ? Number(recipe.xp[1]) : 100;
		this._xpDeprac = recipe.xpDeprac ?  Number(recipe.xpDeprac[1]) : 0;
		this._craftLevel = recipe.craftLevel ? Number(recipe.craftLevel[1]) : 1;
		this._pxp = recipe.playerXp ? Number(recipe.playerXp[1]) : 0;
		this._craftMultiple = (recipe.multiple ? recipe.multiple[1] : "true").toLowerCase() == "true";
		this._known = (recipe.known ? recipe.known[1] : "true").toLowerCase() == "true";
		this._reverse = (recipe.reverse ? recipe.reverse[1] : "true").toLowerCase() == "true";
	}
	Recipe.prototype.name = function(reverse) { 
		return reverse ? reversePrefix + this._result.name() : this._name ? this._name : this._result.name(); 
	}
	Recipe.prototype.hasMaterials = function(reverse) {
		if(reverse) {
			if($gameParty.numItemsCrafting(this._result._item) < 1) { return false; }
		} else {
			for(var i = 0;i < this._materials.length;i++) { 
				var material = this._materials[i];
				if(material._bonus) { continue; }
				if($gameParty.numItemsCrafting(material._item) < material._amount) {return false;}
			}
		}
		return true;
	}
	Recipe.prototype.hasGold = function() { return $gameParty.gold() >= this._goldCost;}
	Recipe.prototype.hasCraftLevel = function() { return this._craftLevel <= $gameParty.craftLevel(this.categoryId());}
	Recipe.prototype.hasLevel = function() { return this._level <= $gameParty.highestLevel() && this.hasCraftLevel();}
	Recipe.prototype.craftable = function(reverse) { return this.hasGold() && this.hasMaterials(reverse) && this.hasLevel();}
	Recipe.prototype.amountCraftable = function(reverse) { 
		var amount = null;
		if(reverse) {
			return amount = $gameParty.numItemsCrafting(this._result._item);
		} else {
			for(var i = 0;i < this._materials.length;i++) {
				var material = this._materials[i];
				if(material._bonus) { continue; }
				var amountNext = 0
				if(material._consumed) {
					amountNext = $gameParty.numItemsCrafting(material._item) / material._amount
				} else {
					amountNext = $gameParty.numItemsCrafting(material._item) >= material._amount ? 99 : 0
				}
				if(amount) { 
					if(amountNext < amount) {amount = amountNext;}
				} else {
					amount = amountNext;
				}
			}
		}
		var amountGold = this._goldCost > 0 ? $gameParty.gold() / this._goldCost : 99;
		if(amountGold < amount) {amount = amountGold;}
		return Math.floor(amount);
	}
	Recipe.prototype.craft = function(failRate, reverse) {
		failRate = failRate || 0;
		if(reverse) { failRate = 0; }
		this.removeMaterials(reverse);
		if(failRate < this.successRate()) {
			return this.addResult(reverse);
		}
		return [];
	}
	Recipe.prototype.removeMaterials = function(reverse) {
		if(reverse) {
			$gameParty.gainItem(this._result._item,-1);
		} else {
			for(var i = 0;i < this._materials.length;i++) {
				var material = this._materials[i];
				if(material._bonus) { continue; }
				if(material._consumed) {
					$gameParty.gainItem(material._item, -material._amount);
				}
			}
			$gameParty.gainGold(-this._goldCost);
		}
	}
	Recipe.prototype.addResult = function(reverse) {
		var newItem = [];
		if(reverse) {
			for(var i = 0;i < this._materials.length;i++) {
				var material = this._materials[i];
				if(Math.random() < material._rate / 100) { 
					$gameParty.gainItem(material._item, material.returnAmount()); 
					newItem.push(material);
				}
			}
		} else {
			$gameParty.gainItem(this._result._item,this._result._amount);
			newItem.push(this._result);
			$gameParty.gainCraftExp(this.categoryId(), this.xpGain());
			for(var i = 0;i < $gameParty.members().length;i++) {
				$gameParty.members()[i].gainExp(this._pxp);
			}
		}
		return newItem;
	}
	Recipe.prototype.categoryId = function() { return categoryNames.indexOf(this._category);}
	Recipe.prototype.xpGain = function() {
		if($gameParty.craftLevel(this.categoryId()) > UDML) { return 0; }
		var levelDiff = $gameParty.craftLevel(this.categoryId()) - this._craftLevel;
		return Math.max(this._xp - this._xpDeprac * levelDiff,0);
	}
	Recipe.prototype.successRate = function() {
		var levelDiff = $gameParty.craftLevel(this.categoryId()) - this._craftLevel;
		return Math.min(this._success + this._successGain * levelDiff,100);
	}
	Recipe.prototype.known = function() {
		return $gameParty.recipeKnown(this._id);
	}
	
	function Material() { 
		this.initialize.apply(this, arguments);
	}
	Material.prototype.initialize = function(material, rate) {
		if(material.type == "item") {this._item = $dataItems[material.id];}
		if(material.type == "weapon") {this._item = $dataWeapons[material.id];}
		if(material.type == "armor") {this._item = $dataArmors[material.id];}
		this._amount = material.amount;
		this._consumed = material.cons != null ? material.cons : true;
		this._rate = material.rate || dsmBaseRate;
		this._returnRate = rate || 100;
		this._bonus = material.bonus != null ? material.bonus : false;
	}
	Material.prototype.name = function() {
		return this._item.name;
	}
	Material.prototype.returnAmount = function() {
		return this._bonus ? this._amount : Math.round(Math.max(1,this._amount * (this._returnRate / 100)));
	}
	
	var crafting_game_party_initialize = Game_Party.prototype.initialize;
	Game_Party.prototype.initialize = function() {
		crafting_game_party_initialize.call(this);
		this.createRecipeData();
	}
	Game_Party.prototype.createRecipeData = function() {
		this._craftingLevel = new Array(categoryNames.length);
		this._craftingExp = new Array(categoryNames.length);
		for(var i = 0;i < categoryNames.length;i++) {
			this._craftingLevel[i] = 1;
			this._craftingExp[i] = 0;
		}
		this._recipesKnown = [];
		this.resetKnownRecipes();
	}
	Game_Party.prototype.checkRecipeVariables = function() {
		if(!this._recipesKnown) { this.createRecipeData(); }
	}
	Game_Party.prototype.learnRecipe = function(id) {
		this._recipesKnown[id] = true;
	}
	Game_Party.prototype.forgetRecipe = function(id) {
		this._recipesKnown[id] = false;
	}
	Game_Party.prototype.resetKnownRecipes = function() {
		if($gameRecipes) {
			for(var i = 1;i < $gameRecipes.length;i++) {
				if($gameRecipes[i]._known) {
					this.learnRecipe($gameRecipes[i]._id);
				} else {
					this.forgetRecipe($gameRecipes[i]._id);
				}
			}
		}
	}
	Game_Party.prototype.recipeKnown = function(id) {
		return this._recipesKnown[id];
	}
	Game_Party.prototype.craftLevel = function(id) { return this._craftingLevel[id]; }
	Game_Party.prototype.craftExp = function(id) { return this._craftingExp[id]; }
	Game_Party.prototype.getCraftLevel = function(string) {
		var index = categoryNames.indexOf(string)
		if(index >= 0) {
			return this.craftLevel(categoryNames.indexOf(string));
		} else {
			throw new Error(TextManager.getErrorDetails() + string + " is not a valid crafting category!");
		}
	}
	Game_Party.prototype.craftExpNext = function(id) {
		var string = xpFormula.replace(/\lvl/g, this.craftLevel(id));
		return eval(string);
	} 
	Game_Party.prototype.gainCraftExp = function(id, value) {
		this._craftingExp[id] += value;
		while(this.craftExp(id) >= this.craftExpNext(id)) {
			this._craftingExp[id] -= this.craftExpNext(id);
			this._craftingLevel[id]++;
		}
	}
	Game_Party.prototype.numItemsCrafting = function(item) {
		if(Object.keys(PluginManager.parameters('YEP_ItemCore')).length > 0) {
			return this.numIndependentItems(item);
		} else {
			return this.numItems(item);
		}
	}
	
		var vlue_base_window_Window_Base_update = Window_Base.prototype.update;
	Window_Base.prototype.update = function() {
		vlue_base_window_Window_Base_update.call(this);
		if(this.isScrollWindow()) {
			this.processCursorScroll();
			this.processWheelScroll();
			this.clampAndCheck();
		}
	}
	Window_Base.prototype.originHeight = function() {
		return Math.max(0,this.contents.height - this.height + this.standardPadding());
	}
	Window_Base.prototype.processCursorScroll = function() {
		if(Input.isPressed('down')) {
			this.origin.y += 3;
		}
		if(Input.isPressed('up')) {
			this.origin.y -= 3;
		}
		if(Input.isTriggered('pagedown')) {
			this.origin.y += this.lineHeight() * 5;
		}
		if(Input.isTriggered('pageup')) {
			this.origin.y -= this.lineHeight() * 5;
		}
	}
	Window_Base.prototype.clampAndCheck = function() {
		this.origin.y = this.origin.y.clamp(0,this.originHeight())
		this.downArrowVisible = this.origin.y == this.originHeight() ? 0 : 255;
		this.upArrowVisible = this.origin.y == 0 ? 0 : 255;
	}
	Window_Base.prototype.processWheelScroll = function() {
		var threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this.origin.y += this.lineHeight() * 5;
        }
        if (TouchInput.wheelY <= -threshold) {
            this.origin.y -= this.lineHeight() * 5;
        }
	}
	Window_Base.prototype.isScrollWindow = function() {
		return false;
	}
	
	function Window_RecipeList() {
		this.initialize.apply(this, arguments);
	}
	Window_RecipeList.prototype = Object.create(Window_Selectable.prototype);
	Window_RecipeList.prototype.constructor = Window_RecipeList;
	Window_RecipeList.prototype.initialize = function(x, y, w, h) {
		Window_Selectable.prototype.initialize.call(this, x, y, w, h);
		this.resetRecipes();
	}
	Window_RecipeList.prototype.maxItems = function() {
		return this._data ? this._data.length : 1;
	}
	Window_RecipeList.prototype.item = function() {
		return this._data && this._index >= 0 ? this._data[this._index] : null;
	}
	Window_RecipeList.prototype.currentItemEnabled = function() {
		return this.enable(this._data[this._index]);
	}
	Window_RecipeList.prototype.include = function(item) {
		if(item == 0) { return false; }
		if(!item.known()) { return false; }
		if(!item.hasCraftLevel()) { return false; }
		if(this._category == "all") {return true;}
		if(this._category == dismantleText && item._reverse) { 
			return item.craftable(true); }
		return this._category == item._category;
	}
	Window_RecipeList.prototype.setCategory = function(category) {
		if(category == this._category) { return; }
		this._category = category;
		this.resetRecipes();
	}
	Window_RecipeList.prototype.isReverse = function() {
		return this._category == dismantleText;
	}
	Window_RecipeList.prototype.resetRecipes = function() {
		this._data = [];
		for(var i = 0;i < $gameRecipes.length;i++) {
			var recipe = $gameRecipes[i];
			if(this.include(recipe)) {this._data.push(recipe);}
		}
		this.refresh();
	}
	Window_RecipeList.prototype.isEnabled = function(item) {
		if(item) { return item.craftable(this.isReverse()); }
		return false;
	}
	Window_RecipeList.prototype.drawItem = function(index) {
		var item = this._data[index];
		if(item) {
			rect = this.itemRect(index);
			rect.width -= 4;
			this.changePaintOpacity(this.isEnabled(item));
			this.drawItemName(item, rect.x, rect.y);
			if(item.amountCraftable(this.isReverse()) > 0) {
				this.drawText("x"+String(item.amountCraftable(this.isReverse())),rect.x,rect.y,this.contents.width,"right");
			}
		}
	}
	Window_RecipeList.prototype.currentItem = function() {
		return this._index >= 0 ? this._data[this._index] : null;
	}
	Window_RecipeList.prototype.processOk = function() {
		if (this.isCurrentItemEnabled() && this.craftMenuOk()) {
			this.playOkSound();
			this.updateInputData();
			this.callOkHandler();
		} else {
			this.playBuzzerSound();
		}
	}
	Window_RecipeList.prototype.craftMenuOk = function() {
		if(craftingFromMenu) {
			if(craftFromMenu == "view") { return false; }
		}
		return true;
	}
	Window_RecipeList.prototype.refresh = function() {
		this.createContents();
		Window_Selectable.prototype.refresh.call(this);
	}
	Window_RecipeList.prototype.contentsHeight = function() {
		return this.maxItems() * this.lineHeight();
	}
	Window_RecipeList.prototype.isCurrentItemEnabled = function() {
		return this.isEnabled(this.currentItem());
	}
	Window_RecipeList.prototype.drawItemName = function(recipe, x, y, width) {
		var amount = recipe._result._amount;
		item = recipe._result._item;
		width = width || 312;
		if (item) {
			var iconBoxWidth = Window_Base._iconWidth + 4;
			this.resetTextColor();
			this.drawIcon(item.iconIndex, x + 2, y + 2);
			var string = recipe.name();
			if(amount > 1) { string += " (x" + amount + ")" }
			this.drawText(string, x + iconBoxWidth, y, width - iconBoxWidth);
		}
	};
	
	function Window_RecipeDetail() {
		this.initialize.apply(this, arguments);
	}
	Window_RecipeDetail.prototype = Object.create(Window_Base.prototype);
	Window_RecipeDetail.prototype.constructor = Window_RecipeDetail;
	Window_RecipeDetail.prototype.initialize = function(x, y, w, h) {
		Window_Base.prototype.initialize.call(this, x, y, w, h);
		this._recipe = null;
	}
	Window_RecipeDetail.prototype.setRecipe = function(recipe, reverse) {
		if(recipe == this._recipe) {return;}
		this._recipe = recipe;
		this._reverse = reverse || false;
		this.refresh();
	}
	Window_RecipeDetail.prototype.isScrollWindow = function() { return 24; }
	Window_RecipeDetail.prototype.contentsHeight = function() {
		var height = 24;
		if(this._recipe) {
			height = this.lineHeight() * 1.5;
			if(displayParam.chance) { height += this.lineHeight(); }
			if(displayParam.gold) { height += this.lineHeight(); }
			height += this.lineHeight() * this._recipe._materials.length;
		}
		return Math.max(this.height - this.standardPadding(),height);
	}
	Window_RecipeDetail.prototype.refresh = function() {
		this.createContents();
		if(this._recipe) {
			if(!this._reverse) {
				if(displayParam.clevel || displayParam.plevel) {this.drawCraftLevel();}
				var bottomY = this.contents.height - this.lineHeight() * 1.5;
				console.log(this.contents.height,bottomY);
				if(displayParam.chance) { this.drawSuccessRate(bottomY);bottomY -= this.lineHeight(); }
				if(displayParam.gold) {this.drawGoldCost(bottomY);}
			}
			this.drawMaterials();
		}
	}
	Window_RecipeDetail.prototype.drawCraftLevel = function() {
		this.changePaintOpacity(this._recipe.hasLevel());
		this.changeTextColor(this.systemColor());
		this.drawText(reqlevel,0,0,this.contents.width);
		this.changeTextColor(this.normalColor());
		var xx = 0;
		var text = "";
		if(displayParam.plevel) {
			this.drawText(String(this._recipe._level),0,0,this.contents.width,"right");
			this.drawIcon(playerLevelIcon,this.contents.width - 24 - Window_Base._iconWidth,0);
			xx += 68; //HERE
			text = String(this._recipe._craftLevel) + " |";
		} else {
			text = String(this._recipe._craftLevel);
		}
		if(displayParam.clevel) {
			this.drawText(text,0,0,this.contents.width - xx,"right");
			this.drawIcon(categoryIcons[this._recipe.categoryId()],this.contents.width - 75 - xx,0); //HERE
		}
	}
	Window_RecipeDetail.prototype.drawMaterials = function() {
		var yy = 20;
		if(displayParam.clevel || displayParam.plevel) {yy = this.contents.fontSize + 20;}
		if(this._reverse) { yy = 0; }
		this.changePaintOpacity(this._recipe.craftable(this._reverse));
		this.changeTextColor(this.systemColor());
		this.drawText(this._reverse ? matreturn : reqmaterial,0,yy,this.width);
		yy += this.contents.fontSize + this.textPadding();
		for(var i = 0;i < this._recipe._materials.length;i++) {
			var item = this._recipe._materials[i];
			if(!this._reverse && item._bonus) { continue; }
			if(!this._reverse) { this.changePaintOpacity($gameParty.numItemsCrafting(item._item) >= item._amount); }
			this.changeTextColor(this.normalColor());
			this.drawItemName(item._item,12,yy);
			var string = ""
			if(this._reverse) {
				string = "x" + String(item.returnAmount()) + " (" + String(item._rate) + "%)";
			} else {
				var itemAmount = $gameParty.numItemsCrafting(item._item);
				this.changeTextColor(this.textColor(itemAmount >= item._amount ? 3 : 18));
				this.drawText(itemAmount,0,yy,this.contents.width-72,'right');
				this.changeTextColor(this.normalColor());
				string = " / " + String(item._amount);
			}
			this.drawText(string,0,yy,this.contents.width-12,"right");
			yy += this.contents.fontSize  + this.textPadding();
		}
	}
	Window_RecipeDetail.prototype.drawSuccessRate = function(yy) {
		var successRate = this._recipe.successRate();
		this.changePaintOpacity(this._recipe.craftable(this._reverse));
		this.changeTextColor(this.systemColor());
		this.drawText(sucRate,0,yy,this.contents.width);
		var color = [colorCPV1,colorCPV2,colorCPV3,colorCPV4,colorCPV5,colorCPV5];
		this.changeTextColor(this.textColor(color[Math.floor(successRate/20)]));
		this.drawText(successRate + "%",0,yy,this.contents.width,"right");
		this.changeTextColor(this.normalColor());
	}
	Window_RecipeDetail.prototype.drawGoldCost = function(yy) {
		if(this._recipe._goldCost > 0) {
			this.changePaintOpacity(this._recipe.hasGold());
			this.changeTextColor(this.systemColor());
			this.drawText(craCost,0,yy,this.contents.width);
			this.changeTextColor(this.normalColor());
			this.drawCurrencyValue(this._recipe._goldCost,TextManager.currencyUnit,0,yy,this.contents.width)
		}
	}
	Window_RecipeDetail.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
		var unitWidth = Math.min(80, this.textWidth(unit));
		this.resetTextColor();
		this.changePaintOpacity(this._recipe.hasGold());
		this.drawText(value, x, y, width - unitWidth - 6, 'right');
		this.changeTextColor(this.systemColor());
		this.drawText(unit, x + width - unitWidth, y, unitWidth, 'right');
	}
	
	function Window_RecipeConfirm() {
		this.initialize.apply(this, arguments);
	}
	Window_RecipeConfirm.prototype = Object.create(Window_Selectable.prototype);
	Window_RecipeConfirm.prototype.constructor = Window_RecipeConfirm;
	Window_RecipeConfirm.prototype.initialize = function(x, y, w, h) {
		Window_Selectable.prototype.initialize.call(this, x, y, w, h);
		this._amount = 1;
		this.refresh();
	}
	Window_RecipeConfirm.prototype.itemMax = function() {return 1;}
	Window_RecipeConfirm.prototype.enable = function() {return true;}
	Window_RecipeConfirm.prototype.refresh = function() {
		Window_Selectable.prototype.refresh.call(this);
		this.drawText(this._reverse ? dsmText : craText,0,0,this.contents.width,"center");
		if(this._recipe && this._recipe.craftable(this._reverse)) {
			this.drawText("x" + String(this._amount),0,0,this.contents.width,"right");
		}
	}
	Window_RecipeConfirm.prototype.activate = function() {
		Window_Selectable.prototype.activate.call(this);
		this.select(0);
	}
	Window_RecipeConfirm.prototype.deactivate = function() {
		Window_Selectable.prototype.deactivate.call(this);
		this.deselect();
	}
	Window_RecipeConfirm.prototype.setRecipe = function(recipe, reverse) {
		if(recipe == this._recipe) { return; }
		this._recipe = recipe;
		this._reverse = reverse || false;
		this._amount = 1;
		this.refresh();
	}
	Window_RecipeConfirm.prototype.isCursorMovable = function() {
		return this.isOpenAndActive() && craftMultiple && this._recipe._craftMultiple;
	}
	Window_RecipeConfirm.prototype.cursorDown = function(wrap) { this.changeAmount(-10);}
	Window_RecipeConfirm.prototype.cursorUp = function(wrap) { this.changeAmount(10);}
	Window_RecipeConfirm.prototype.cursorRight = function(wrap) { this.changeAmount(1);}
	Window_RecipeConfirm.prototype.cursorLeft = function(wrap) { this.changeAmount(-1);}
	Window_RecipeConfirm.prototype.changeAmount = function(value) {
		SoundManager.playCursor();
		this._amount += value;
		this._amount = Math.min(Math.max(this._amount,1),this._recipe.amountCraftable(this._reverse));
		this.refresh();
	}
	Window_RecipeConfirm.prototype.onTouch = function(triggered) {
		if (triggered && this.isTouchOkEnabled()) {
			this.processOk();
		}
	};
	
	Scene_Crafting.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	}
	Scene_Crafting.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this._helpWindow = new Window_Help();
		var width = Graphics.width / 2;
		var height = Graphics.height - this._helpWindow.height; 
		this._listWindow = new Window_RecipeList(0,this._helpWindow.height+72,width,height-72*2);
		this._listWindow.setHandler('ok',this.listSuccess.bind(this));
		this._listWindow.setHandler('cancel',this.cancel.bind(this));
		if(!displayParam.clevel) { this._listWindow.height += this._listWindow.fittingHeight(1); }
		this._listWindow.createContents();
		this._detailWindow = new Window_RecipeDetail(width,this._listWindow.y,width,height-72*2);
		if(!displayParam.gold) { this._detailWindow.height += this._detailWindow.fittingHeight(1); }
		this._detailWindow.createContents();
		height = this._detailWindow.y + this._detailWindow.height;
		this._confirmWindow = new Window_RecipeConfirm(width,height,width,72);
		this._confirmWindow.setHandler('ok',this.craftSuccess.bind(this));
		this._confirmWindow.setHandler('cancel',this.confirmCancel.bind(this));
		if(displayParam.gold) {
			this._goldWindow = new Window_Gold();
			this._goldWindow.width = width;
			this._goldWindow.y = Graphics.height - 72; 
			this._goldWindow.x = width;
		}
		this._popupWindow = new Window_RecPopup();
		this._popupWindow.setHandler('ok',this.popupOk.bind(this));
		this._popupWindow.setHandler('cancel',this.popupOk.bind(this));
		this._commandWindow = new Window_RecCategory();
		this._commandWindow.setHandler('ok',this.commandOk.bind(this));
		this._commandWindow.setHandler('cancel',this.commandCancel.bind(this));
		if(displayParam.clevel) {this._gaugeWindow = new Window_RecGauge();}
		this.addWindow(this._helpWindow);
		this.addWindow(this._listWindow);
		this.addWindow(this._detailWindow);
		this.addWindow(this._confirmWindow);
		if(this._goldWindow) {this.addWindow(this._goldWindow);}
		this.addWindow(this._popupWindow);
		this.addWindow(this._commandWindow);
		if(this._gaugeWindow) {this.addWindow(this._gaugeWindow);}
	}
	Scene_Crafting.prototype.popupOk = function() {
		this._popupWindow.deactivate();
		this._popupWindow.close();
		this._listWindow.activate();
	}
	Scene_Crafting.prototype.update = function() {
		Scene_Base.prototype.update.call(this);
		if(this._listWindow.currentItem()) {this._helpWindow.setText(this._listWindow.currentItem()._result._item.description);}
		if(this._commandWindow.isOpenAndActive()) {
			this._helpWindow.setText("");
		}
		this._detailWindow.setRecipe(this._listWindow.currentItem(),this._listWindow.isReverse());
		this._confirmWindow.setRecipe(this._listWindow.currentItem(),this._listWindow.isReverse());
		this._listWindow.setCategory(categoryNames[this._commandWindow._index]);
		if(this._gaugeWindow) { this._gaugeWindow.setCategory(categoryNames[this._commandWindow._index]);}
		if(this._listWindow.currentItem()) {
			if(this._listWindow.currentItem().craftable(this._listWindow.isReverse())) {
				this._confirmWindow.opacity = 255;
				this._confirmWindow.contentsOpacity = 255;
			} else {
				this._confirmWindow.opacity = 75;
				this._confirmWindow.contentsOpacity = 75;
			}
		}
	}
	Scene_Crafting.prototype.listSuccess = function() {
		this._listWindow.deactivate();
		if(this._goldWindow) {this._goldWindow.close();}
		this._confirmWindow.activate();
	}
	Scene_Crafting.prototype.craftSuccess = function() {
		var amount = 0;
		var items = [];
		for(var i = 0;i < this._confirmWindow._amount;i++) {
			Array.prototype.push.apply(items, this._listWindow.currentItem().craft(Math.random() * 100,this._listWindow.isReverse()));
		}
		if(items.length > 0) {
			this._popupWindow.setText(items, amount, this._listWindow.isReverse());
		} else {
			this._popupWindow.setTextFail(this._listWindow.isReverse());
		}
		this._confirmWindow.changeAmount(-1000);
		if(this._goldWindow) {this._goldWindow.refresh();}
		this._listWindow.resetRecipes();
		if(this._gaugeWindow) {this._gaugeWindow.refresh();}
		this._popupWindow.activate();
		this._detailWindow.refresh();
	}
	Scene_Crafting.prototype.confirmCancel = function() {
		this._confirmWindow.deactivate();
		if(this._goldWindow) {this._goldWindow.open();}
		this._listWindow.activate();
	}
	Scene_Crafting.prototype.commandCancel = function() {
		craftingFromMenu = false;
		this.popScene();
	}
	Scene_Crafting.prototype.cancel = function() {
		this._listWindow.select(-1);
		this._helpWindow.setText("");
		this._commandWindow.activate();
	}
	Scene_Crafting.prototype.commandOk = function() {
		this._listWindow.select(0);
		this._listWindow.activate();
	}
	
	function Scene_CraftingSpecific() {
		this.initialize.apply(this, arguments);
	}
	Scene_CraftingSpecific.prototype = Object.create(Scene_Crafting.prototype);
	Scene_CraftingSpecific.prototype.constructor = Scene_CraftingSpecific;
	Scene_CraftingSpecific.prototype.initialize = function() {
		Scene_Crafting.prototype.initialize.call(this);
	}
	Scene_CraftingSpecific.prototype.create = function() {
		Scene_Crafting.prototype.create.call(this);
		this._commandWindow._index = categoryNames.indexOf(categoryEventName);
		this._commandWindow.deactivate();
		this._commandWindow.visible = false;
		this._listWindow.height += this._listWindow.fittingHeight(1);
		this._listWindow.y -= this._listWindow.fittingHeight(1);
		this._detailWindow.height += this._listWindow.fittingHeight(1);
		this._detailWindow.y -= this._listWindow.fittingHeight(1);
		this._listWindow.createContents();
		this._detailWindow.createContents();
		this._listWindow.select(0);
		this._listWindow.activate();
	}
	Scene_CraftingSpecific.prototype.cancel = function() { this.popScene(); }
	
	
	function Window_RecCategory() {
		this.initialize.apply(this, arguments);
	}
	Window_RecCategory.prototype = Object.create(Window_HorzCommand.prototype);
	Window_RecCategory.prototype.constructor = Window_RecCategory;
	Window_RecCategory.prototype.initialize = function() {
		Window_HorzCommand.prototype.initialize.call(this, 0, this.fittingHeight(2));
	}
	Window_RecCategory.prototype.windowWidth = function() { return Graphics.width; }
	Window_RecCategory.prototype.windowHeight = function() { return this.fittingHeight(1); }
	Window_RecCategory.prototype.makeCommandList = function() {
		for(var i = 0;i < categoryNames.length;i++) {
			this.addCommand(categoryNames[i],categoryNames[i]);
		}
	}
	Window_RecCategory.prototype.itemWidth = function() {return this.width / 5;}
	Window_RecCategory.prototype.drawItem = function(index) {
		this.changePaintOpacity(this.isCommandEnabled(index));
		var rect = this.itemRectForText(index);
		this.drawText(this.commandName(index),rect.x,rect.y,rect.width);
		this.drawIcon(categoryIcons[index],rect.x-Window_Base._iconWidth,rect.y+2);
	}
	Window_RecCategory.prototype.itemRectForText = function(index) {
		var rect = this.itemRect(index);
		rect.x += Window_Base._iconWidth;		
		rect.width -= Window_Base._iconWidth;
		return rect;
	}
	
	function Window_RecPopup() {
		this.initialize.apply(this, arguments);
	}
	Window_RecPopup.prototype = Object.create(Window_Selectable.prototype);
	Window_RecPopup.prototype.constructor = Window_RecPopup;
	Window_RecPopup.prototype.initialize = function() {
		Window_Selectable.prototype.initialize.call(this, Graphics.width/2-this.windowWidth()/2,Graphics.height/2-this.windowHeight()/2,120,this.fittingHeight(1)); 
		this.openness = 0;
		this.deactivate();
	}
	Window_RecPopup.prototype.windowWidth = function() {return 120;} 
	Window_RecPopup.prototype.windowHeight = function() {return this.fittingHeight(1);}
	Window_RecPopup.prototype.setText = function(results, amount, reverse) {
		this.contents.clear();
		AudioManager.playSe({name:success,volume:successVol,pitch:100,pan:0})
		var texts = [];
		var width = 0;
		var weapons = [];
		var armors = [];
		var items = [];
		for(var i = 0;i < results.length;i++) {
			var item = results[i];
			var container = item.type == "weapon" ? weapons : item.type == "armor" ? armors : items;
			if(!container[item._item.id]) { container[item._item.id] = [item._item,0]; }
			container[item._item.id][1] += item.returnAmount();
		}
		var containers = [weapons, armors, items];
		for(var i = 0;i < containers.length;i++) {
			for(var j = 0; j < containers[i].length;j++) {
				var item = containers[i][j];
				var widthNew = 0;
				if(item) {
					var string = String(item[1]) + "x " + item[0].name + " " 
					string += reverse ? dismantledText : craftedText;
					texts.push([string,item[0].iconIndex]);
					widthNew = this.textWidth(string) + Window_Base._iconWidth;
					if(widthNew > width) { width = widthNew; }
				}
			}
		}
		this.width = width + this.standardPadding() * 2;
		this.height = this.fittingHeight(texts.length)
		this.x = (Graphics.width-this.width)/2;
		this.y = (Graphics.height-this.height)/2;
		this.createContents();
		for(var i = 0;i < texts.length;i++) {
			this.drawText(texts[i][0],Window_Base._iconWidth,i*this.lineHeight(),this.contents.width);
			this.drawIcon(texts[i][1],0,i*this.lineHeight());
		}
		this.open();
	}
	Window_RecPopup.prototype.setTextFail = function(reverse) {
		this.contents.clear();
		AudioManager.playSe({name:failure,volume:failureVol,pitch:100,pan:0})
		var text = reverse ? dsmFailed : craFailed;
		var width = this.textWidth(text);
		this.width = width + this.standardPadding() * 2;
		this.height = this.fittingHeight(1);
		this.x = (Graphics.width-width)/2;
		this.createContents();
		this.drawText(text,0,0,this.contents.width);
		this.open();
	}
	Window_RecPopup.prototype.processOk = function() {
		if (this.isCurrentItemEnabled()) {
			this.updateInputData();
			this.deactivate();
			this.callOkHandler();
		} else {
			this.playBuzzerSound();
		}
	}
	
	function Window_RecGauge() {
		this.initialize.apply(this, arguments);
	}
	Window_RecGauge.prototype = Object.create(Window_Base.prototype);
	Window_RecGauge.prototype.constructor = Window_RecGauge;
	Window_RecGauge.prototype.initialize = function() {
		Window_Selectable.prototype.initialize.call(this, 0,Graphics.height-this.fittingHeight(1),Graphics.width/2,this.fittingHeight(1));
		this._category = "all";
	}
	Window_RecGauge.prototype.refresh = function() {
		this.contents.clear();
		if(this._category == "all") {return;}
		if(this._category == dismantleText) { return; }
		this.drawIcon(categoryIcons[this.catIndex()],0,0);
		this.drawText($gameParty.craftLevel(this.catIndex()),Window_Base._iconWidth,0,this.contents.width);
		var rate = $gameParty.craftExp(this.catIndex()) / $gameParty.craftExpNext(this.catIndex());
		if($gameParty.craftLevel(this.catIndex()) == UDML) {
			this.changeTextColor(this.textColor(20));
			this.drawText(MLT,0,0,this.contents.width,"right");
			this.changeTextColor(this.normalColor());
		} else {
			this.drawGauge(96,-3,this.contents.width-96,rate,this.tpGaugeColor1(),this.tpGaugeColor2());
			text = String($gameParty.craftExp(this.catIndex())) + "/" + String($gameParty.craftExpNext(this.catIndex()));
			this.drawText(text,0,0,this.contents.width,"right");
		}
	}
	Window_RecGauge.prototype.setCategory = function(cat) {
		if(cat == this._category) {return;}
		this._category = cat;
		this.refresh();
	}
	Window_RecGauge.prototype.catIndex = function() {
		return categoryNames.indexOf(this._category);
	}
	
	var crafting_window_menucommand_addoriginalcommands = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		crafting_window_menucommand_addoriginalcommands.call(this);
		if(craftFromMenu != "off") { this.addCommand(craftingMenuString,"crafting"); }
	}
	
	var crafting_scene_menu_createcommandwindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		crafting_scene_menu_createcommandwindow.call(this);
		this._commandWindow.setHandler("crafting",this.commandRecipe.bind(this));
	}
	Scene_Menu.prototype.commandRecipe = function() {
		craftingFromMenu = true;
		SceneManager.push(Scene_Crafting);
	}
	
	var RecipeCrafting_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		RecipeCrafting_Game_Interpreter_pluginCommand.call(this, command, args);
		if(command === 'crafting') {
			if(args[0] === 'call') {
				categoryEventName = args[1]
				if(categoryNames.indexOf(categoryEventName) >= 0) { 
					SceneManager.push(Scene_CraftingSpecific); 
				} else {
					throw new Error(TextManager.getErrorDetails() + "Incorrect category name");
				}
			}
			if(args[0] === 'learn') {
				$gameParty.learnRecipe(args[1]);
			}
			if(args[0] === 'forget') {
				$gameParty.forgetRecipe(args[1]);
			}
		}
	}
	
	var recipe_game_party_gainItem = Game_Party.prototype.gainItem;
	Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
		recipe_game_party_gainItem.call(this, item, amount, includeEquip);
		if(item) {
			var recipe = item.note.match(/<learn recipe (\d+)>/);
			if(recipe) { 
				if(amount > 0) {
					console.log(recipe);
					$gameParty.learnRecipe(Number(recipe[1]));
				} else if (amount < 0) { 
					$gameParty.forgetRecipe(Number(recipe[1]));
				}
			}
		}
	};
	
	var recipe_scene_load_onloadsuccess = Scene_Load.prototype.onLoadSuccess;
	Scene_Load.prototype.onLoadSuccess = function() {
		recipe_scene_load_onloadsuccess.call(this);
		$gameParty.checkRecipeVariables();
	};
		
	//YEP-ITEMCORE
	Game_Party.prototype.numIndependentItems = function(item) {
		if(!item) return null;
		if (DataManager.isIndependent(item)) {
			if (DataManager.isItem(item)) var group = this.items();
			if (DataManager.isWeapon(item)) var group = this.weapons();
			if (DataManager.isArmor(item)) var group = this.armors();
			var baseItemId = item.id;
			var amount = 0;
			for (var i = 0; i < group.length; ++i) {
				var item = group[i];
				if (!item) continue;
				if (!item.baseItemId) continue;
				if (item.baseItemId !== baseItemId) continue;
				if (this.checkItemIsEquipped(item)) continue;
				amount++;
			}
			return amount;
		} else {
			return this.numItems(item);
		}
	}
	

	
	
})();