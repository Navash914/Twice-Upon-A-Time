//=============================================================================
// SaveFileExtras.js
//=============================================================================

/*:
 * @plugindesc v1.05 Show extra information in the save screen, 
 * including location, level, and gold.
 * Options to hide information you don't want to see (information is still saved in savegame.)
 * Configure colors and positions.
 * @author Amuseum
 *
 * @param Show Location
 * @desc Show location?
 * true | false
 * @default true
 *
 * @param Location Color
 * @desc Location text color
 * Use system colors
 * @default 0
 *
 * @param Location X
 * @desc Location X position
 * Default: this.width / 2
 * @default this.width / 2
 *
 * @param Location Y
 * @desc Location Y position
 * Default: rect.y + lineHeight
 * @default rect.y + lineHeight
 *
 * @param Show Level
 * @desc Show levels?
 * true | false
 * @default true
 *
 * @param Level Color
 * @desc Level text color
 * Use system colors
 * @default 0
 *
 * @param Level X
 * @desc Level X position
 * Default: this.width / 2
 * @default this.width / 2
 *
 * @param Level Y
 * @desc Level Y position
 * Default: rect.y + lineHeight * 2
 * @default rect.y + lineHeight * 2
 *
 * @param Show Gold
 * @desc Show gold?
 * true | false
 * @default true
 *
 * @param Gold Color
 * @desc Gold text color
 * Use system colors
 * @default 6
 *
 * @param Gold X
 * @desc Gold X position
 * Default: this.width * 0.66
 * @default this.width * 0.66
 *
 * @param Gold Y
 * @desc Gold Y position
 * Default: rect.y + lineHeight * 2
 * @default rect.y + lineHeight * 2
 *
 * @param Show Title
 * @desc Show title?
 * true | false
 * @default true
 *
 * @param Title Color
 * @desc Title text color
 * Use system colors
 * @default 0
 *
 * @param Title X
 * @desc Title X position
 * Default: this.width / 2
 * @default this.width / 2
 *
 * @param Title Y
 * @desc Title Y position
 * Default: rect.y
 * @default rect.y
 *
 * @param Show Playtime
 * @desc Show playtime?
 * true | false
 * @default true
 *
 * @param Playtime Color
 * @desc Playtime text color
 * Use system colors
 * @default 0
 *
 * @param Playtime X
 * @desc Playtime X position
 * Default: rect.x
 * @default rect.x
 *
 * @param Playtime Y
 * @desc Playtime Y position
 * Default: rect.y + lineHeight * 2
 * @default rect.y + lineHeight * 2
 *
 * @param Show Characters
 * @desc Show characters?
 * true | false
 * @default true
 *
 * @param Characters X
 * @desc Characters X position
 * Default: rect.x + 220
 * @default rect.x + 220
 *
 * @param Characters Y
 * @desc Characters Y position
 * Default: rect.y + rect.height - 4
 * @default rect.y + rect.height - 4
 *
 * @param Show Faces
 * @desc Show faces?
 * true | false  (true overrides Show Characters)
 * @default false
 *
 * @param Faces X
 * @desc Faces X position
 * Default: rect.x + 192
 * @default rect.x + 192
 *
 * @param Faces Y
 * @desc Faces Y position
 * Default: rect.y + faceHeight
 * @default rect.y + faceHeight
 *
 * @param Face Margin
 * @desc Distance between faces
 * Scaling factor (1.0 means show 100% of each face) 
 * @default 0.66
 
 * @help 
 * While playing the game, save the game.
 * At the title screen, load a game. You should see additional information for the location
 * and the first character's level at the time the game was saved.
 *
 * Options in the plugins manager:
 * Hide specific information. Configure text colors. Position each element.
 * 
 * This plugin does not provide plugin commands.
 */

(function() {
	var parameters = PluginManager.parameters('SaveFileExtras');
	
	var showLocation = eval(parameters['Show Location']);
	var showLevel = eval(parameters['Show Level']);
	var showGold = eval(parameters['Show Gold']);
	var showTitle = eval(parameters['Show Title']);
	var showPlaytime = eval(parameters['Show Playtime']);
	var showCharacters = eval(parameters['Show Characters']);
	var showFaces = eval(parameters['Show Faces']);
	var faceMargin = Number(parameters['Face Margin']);
	var locationColor = Number(parameters['Location Color']);
	var levelColor = Number(parameters['Level Color']);
	var goldColor = Number(parameters['Gold Color']);
	var titleColor = Number(parameters['Title Color']);
	var playtimeColor = Number(parameters['Playtime Color']);
	var locationX = String(parameters['Location X']);
	var locationY = String(parameters['Location Y']);
	var levelX = String(parameters['Level X']);
	var levelY = String(parameters['Level Y']);
	var goldX = String(parameters['Gold X']);
	var goldY = String(parameters['Gold Y']);
	var titleX = String(parameters['Title X']);
	var titleY = String(parameters['Title Y']);
	var playtimeX = String(parameters['Playtime X']);
	var playtimeY = String(parameters['Playtime Y']);
	var charactersX = String(parameters['Characters X']);
	var charactersY = String(parameters['Characters Y']);
	var facesX = String(parameters['Faces X']);
	var facesY = String(parameters['Faces Y']);
	
	// Amuseum hook functions start
	var oldMakeSavefileInfo = DataManager.makeSavefileInfo;
	DataManager.makeSavefileInfo = function() {
		var info = oldMakeSavefileInfo.call(this);
		info.location = $dataMap.displayName != "" ? $dataMap.displayName : $dataMapInfos[$gameMap.mapId()].name;
		info.level = $gameParty.members()[0].level;
		info.gold = $gameParty.gold();
		return info;
	}; // Amuseum hook functions start
	
	// Amuseum replace functions start
	Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
		// Amuseum edit start
		var lineHeight = this.lineHeight();
		var faceScale = this.itemHeight() / Window_Base._faceHeight;
		var faceHeight = this.itemHeight();
		var faceWidth = faceScale * Window_Base._faceWidth;
		if (rect.width >= 420) {
			if (valid) {
				if (showFaces) {
					this.drawPartyFaces(info, eval(facesX), eval(facesY), faceWidth, faceHeight);
				} else if (showCharacters) {
					this.drawPartyCharacters(info, eval(charactersX), eval(charactersY));
				}
			}
		}
		if (showTitle) {
			this.changeTextColor(this.textColor(titleColor));
			var x = eval(titleX);
			this.drawGameTitle(info, x, eval(titleY), rect.width +192 - x);
			this.resetTextColor();
		}
		if (showLocation) {
			this.changeTextColor(this.textColor(locationColor));
			var x = eval(locationX);
			this.drawLocation(info, x, eval(locationY), rect.width +192 - x);
			this.resetTextColor();
		}
		if (showLevel) {
			this.changeTextColor(this.textColor(levelColor));
			var x = eval(levelX);
			this.drawLevel(info, x, eval(levelY), rect.width +192 - x);
			this.resetTextColor();
		}
		if (showGold) {
			this.changeTextColor(this.textColor(goldColor));
			var x = eval(goldX);
			this.drawGold(info, x, eval(goldY), rect.width +192 - x);
			this.resetTextColor();
		}
		if (showPlaytime) {
			this.changeTextColor(this.textColor(playtimeColor));
			this.drawPlaytime(info, eval(playtimeX), eval(playtimeY), rect.width);
			this.resetTextColor();
		}
		// Amuseum edit end
	};
	
	Game_Party.prototype.charactersForSavefile = function() {
		return this.allMembers().map(function(actor) {
			return [actor.characterName(), actor.characterIndex()];
				});
	};

	Game_Party.prototype.facesForSavefile = function() {
		return this.allMembers().map(function(actor) {
			return [actor.faceName(), actor.faceIndex()];
				});
	};
	// Amuseum replace functions end
	
	// Amuseum new functions start
	Window_SavefileList.prototype.drawLocation = function(info, x, y, width) {
		if (info.location) {
			this.drawText(info.location, x, y, width);
		}
	};
	
	Window_SavefileList.prototype.drawLevel = function(info, x, y, width) {
		if (info.level) {
			this.drawText(TextManager.levelA + " " + info.level, x, y, width);
		}
	};
	
	Window_SavefileList.prototype.drawGold = function(info, x, y, width) {
		if (info.gold) {
			this.drawText(info.gold + " " + TextManager.currencyUnit, x, y, width);
		}
	};
	
	Window_SavefileList.prototype.drawPartyFaces = function(info, x, y, width, height) {
		if (info.faces) {
			width = width || Window_Base._faceWidth;
			height = height || Window_Base._faceHeight;
			for (var i = 0; i < info.faces.length; i++) {
				var data = info.faces[i];
				this.drawFace(data[0], data[1], x + i * width * faceMargin, y - height, width, height);
			}
		}
	};
	// Amuseum new functions end

})();
