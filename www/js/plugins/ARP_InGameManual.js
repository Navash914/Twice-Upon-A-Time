//========================================
// ARP_InGameManual.js
//========================================
/*:
  @plugindesc v1.10 Creates an In-Game Manual Scene
  <ARP_InGM>
  @author Atreyo Ray

  @help
 ** Please report any bugs you find to 'atreyo.ray[at]gmail.com'
 ** Credit Atreyo Ray to use this plugin.
 ** You can use it on free or commercial games.
 ** You're free to modify it to suit your needs.
 -----------------------------------------------------------------------------
 INSTRUCTIONS
 -----------------------------------------------------------------------------
 PLEASE READ THE PDF TUTORIAL FOR DETAILED INFORMATION
 Check http://forums.rpgmakerweb.com/index.php?/topic/51730-in-game-manual/
 -----------------------------------------------------------------------------

 1) Create a 'Manual.txt' file.

 2) Inside your text file, copy, paste, and fill the following 'form' for each
 entry in your manual:

 <name> 
 <icon> 
 <title>
 <picture> 
 <subentries> 
 <text>
 
 <end entry>

 3) Inside your text file (may be above all entries), copy, paste, and complete
 the tag below to define which entries should appear when your manual opens:

 <main entries> Entry 1 Name; Entry 2 Name; Entry 3 Name

 4) Save your text file inside 'data' folder. 

 -----------------------------------------------------------------------------
 PLUGIN COMMANDS
 -----------------------------------------------------------------------------
 OpenGameManual
 HideAllManualEntries
 ShowAllManualEntries
 HideManualEntry Entry_Name
 ShowManualEntry Entry_Name

 ** REMEMBER: Entry Names with whitespaces should have them replaced by
 underscores when used on plugin commands. For example,

   (in Manual.txt)      ->   (in Plugin Commands)
 'Monsters Defeated'    ->   'Monsters_Defeated' 

 -----------------------------------------------------------------------------
 VISUAL CUSTOMIZATION
 -----------------------------------------------------------------------------
 You can use a custom background to the manual. Just place your PNG image file
 inside the 'img/system' folder and set the 'Custom Background' parameter.
 If you decide to do so, all the windows within the manual will have their
 backgrounds hidden (opacity set to 0), even if you are using custom
 windowskin files.

 Remember that windowskin files should be PNG and their extension should not
 be writen in the parameters.

 If you need to set a color that requires CSS format, you can use:
 Hexadecimal colors
 RGB colors
 RGBA colors
 HSL colors
 HSLA colors
 
 For more information on CSS color format specification check
 http://www.w3schools.com/cssref/css_colors_legal.asp

 If you need to use a system font color number (for Navigation Parameters),
 check Window.png file inside 'img/system' folder. At the right lower part of
 it, you'll see colored squares. Start counting from 0 at the upper line,
 left to right, and you'll have your system font color number.
 You can also use it below the <text> tag in your manual file by typing
 \c[NUMBER] to change the folowing text color.

 -----------------------------------------------------------------------------
 WORKING WITH CUSTOM FONTS
 -----------------------------------------------------------------------------
 Working with customized fonts in your game manual requires a little more
 work. Follow these steps:

 1) Copy the custom font file to the 'fonts' folder in your project.
 ** Make sure you either own the font file, paid for it, or have given credits
 for its usage.
 ** Tip 1: TTF (True Type Fonts) work best with RPGMaker.
 ** Tip 2: Make sure you test different caracters with your custom font before
 you start using it to avoid issues later.

 2) Inside your project fonts folder, there's a file called 'gamefont.css'.
 Edit it to include a block like the one below for each different font you are
 using:
 
 [at]font-face {
    font-family: Font Name;
    src: url("font file.ttf");
 }
 
 ** change [at] for the 'at sign' (the same you use on emails). It can't be 
 written inside the help contents.
 ** Change Font Name and "font file.ttf" accordingly.
 ** Do not remove the first block, usually:
 [at]font-face {
    font-family: GameFont;
    src: url("mplus-1m-regular.ttf");
 }
 ** To learn more about custom fonts, access:
 http://forums.rpgmakerweb.com/index.php?/topic/49757-changing-font/

 -----------------------------------------------------------------------------
 CHANGELOG
 -----------------------------------------------------------------------------
 v1.00 - First release (Nov, 27, 2015)
 v1.10 - (Dec, 02, 2015)
       - You don't need to write down tags you'll not use in an entry.
       - You can now indent comments (#) in your manual data file.
       - You can now create multiple manuals.
       - You can now hide and show entries using Plugin Commands.
       - A detailed illustrated tutorial now comes with the plugin.
       - Removed 'Manual Name' parameter.
       - Added 'Manual Names' parameter.
       - Changed how 'Show in Menu' parameter works.


@param === MAIN CONFIG ===

@param Manual Names
@desc Name shown in the main menu and in the navigation window for each manual. Use symbol:Name; symbol:Name.
@default manual: Game Manual

@param Manual File
@desc File name (with extension) of the file in 'data' folder
with manual data.     Default: Manual.txt
@default Manual.txt

@param Show In Menu
@desc Shows defined manuals in the main menu. Separate each manual symbol with a semicolon (;). Default: manual
@default manual

@param === ENTRY LIST ===

@param Entry List Width
@desc Width of the window that lists entries in the manual.
Default: 320
@default 320

@param Entry List Position
@desc Position of the window that lists entries in the manual.
Use left or right.      Default: left
@default left

@param Entry Font
@desc Font face used in the entry list. Leave blank to use default.
@default

@param Entry Size
@desc Font size used in the entry list.
Default: 28
@default 28

@param Entry Color
@desc Font color used in the entry list. Use CSS Format or leave blank to use standard.
@default

@param Entry OL Color
@desc Text Outline color. Use CSS Format or leave blank to use standard.
@default

@param === NAVIGATION ===

@param Show Navigation
@desc Shows a navigation window that informs current and 
past entries.         YES: true     NO: false
@default true

@param Navigation Position
@desc Places the navigation window. Use top or bottom.
Default: top
@default top

@param Navigation Font
@desc Font face of the navigation text. Leave blank to use standard font.
@default

@param Navigation Size
@desc Size of the font on the navigation text.
Default: 28
@default 28

@param Navigation OL Color
@desc Outline of the text. Use CSS format, or leave blank to use standard color.
@default

@param Navigation Separator
@desc Separator drawn between entries in the navigation window. Default: >
@default >

@param Current Entry Color
@desc Current entry system font color number. (see Window.png)
@default 0

@param Past Entry Color
@desc Font color number of entries that are not current. (see Window.png)
@default 7


@param === DETAILS TITLE ===

@param Title Font
@desc Font face for the title. Leave blank to use standard. See help.
@default

@param Title Size
@desc Font size for the Title in the details window.
Default: 38
@default 38

@param Title Color
@desc Title font color. Use CSS format, or leave blank
to use standard color.
@default

@param Title Outline Color
@desc Title text outline color. Use CSS format or leave
blank to use standard.
@default

@param Title Italic
@desc Title font in Italic.      YES: true      NO: false 
Default: false
@default false

@param === DETAILS LINE ===

@param Line Center Color
@desc Center color of the gradient line below the title. 
Use CSS format.    Default: rgba(255,255,255,1)
@default rgba(255,255,255,1)

@param Line Border Color
@desc Border color of the gradient line below the title.
Use CSS format.    Default: rgba(255,255,255,0)
@default rgba(255,255,255,0)

@param === MORE INFO ===

@param More Info Text
@desc Text shown below the line when there are subentries.
Default: Select entry for more information
@default Select entry for more information

@param More Info Font
@desc Font face for the 'More Info Text'. Leave blank to use standard. See help.
@default

@param More Info Size
@desc Size of the font of the 'More Info Text'
Default: 15
@default 15

@param More Info Color
@desc Color of the font of the 'More Info Text'
Use CSS format or leave blank for standard color.
@default

@param More Info OL Color
@desc 'More Info' text outline color. Use CSS format or
leave blank to use standard.
@default

@param More Info Position
@desc Position of the 'More Info Text'. 
Use right, left, or center.    Default: center
@default center

@param === DETAILS TEXT ===

@param Text Font
@desc Font face for the details text. Leave blank to use standard. See help.
@default

@param Text Size
@desc Font size for the details text.
Default: 28
@default 28

@param Text Outline Color
@desc Details text outline color. Use CSS format or leave blank to use standard.
@default

@param === BACKGROUND ===

@param Custom Background
@desc Custom background png image (don't write extension here).
Place image file inside 'img/system' folder.
@default

@param Navigation Windowskin
@desc Custom png windowskin file for the navigation window.
Place file inside 'img/system' folder. 
@default

@param Entry List Windowskin
@desc Custom png windoskin file for the entry list window.
Place file inside 'img/system' folder. 
@default

@param Details Windowskin
@desc Custom png windowskin file for the details window.
Place file inside 'img/system' folder.
@default

*/

(function() {
var parameters = $plugins.filter(function(p) {
        return p.description.contains('<ARP_InGM>');
    })[0].parameters;

var gameManualNames 			= String(parameters['Manual Names'] || '').split(';');
for(var i = 0; i < gameManualNames.length; i++){
    var sn = gameManualNames[i].split(':');
    gameManualNames[i] = {};
    gameManualNames[i].symbol = sn[0].trim().toLowerCase();
    gameManualNames[i].name = sn[1].trim();
}
var gameManualFile 				= String(parameters['Manual File'] || 'Manual.txt').trim();
var addToMainMenu 				= String(parameters['Show In Menu'] || '').split(';');
for(var i = 0; i < addToMainMenu.length; i++) {
    addToMainMenu[i] = addToMainMenu[i].trim().toLowerCase();
}

var entryListWindowWidth 		= Number(parameters['Entry List Width'] || 320);
var entryListWindowPos          = String(parameters['Entry List Position'] || 'left').trim();
var entryListTxtFont			= String(parameters['Entry Font'] || '').trim();
var entryListTxtSize			= Number(parameters['Entry Size'] || 28);
var entryListTxtColor 			= String(parameters['Entry Color'] || '').trim();
var entryListTxtOutlineColor	= String(parameters['Entry OL Color'] || '').trim();

var showNavigationWindow 		= eval(String(parameters['Show Navigation'] || 'true'));
var navigationWindowPos 		= String(parameters['Navigation Position'] || 'top').trim();
var navigationTxtFont			= String(parameters['Navigation Font'] || '').trim();
var navigationTxtSz				= Number(parameters['Navigation Size'] || 28);
var navigationTxtOutlineColor	= String(parameters['Navigation OL Color'] || '').trim();
var navigationSeparator			= String(parameters['Navigation Separator'] || '>');
var navigationCurrentColor 		= String(parameters['Current Entry Color'] || '').trim();
var navigationNotCurrentColor 	= String(parameters['Past Entry Color'] || '#696969').trim();

var titleTxtFont				= String(parameters['Title Font'] || '').trim();
var titleTxtSz 					= Number(parameters['Title Size'] || 38);
var titleTxtColor				= String(parameters['Title Color'] || '').trim();
var titleTxtOutlineColor		= String(parameters['Title Outline Color'] || '').trim();
var titleTxtItalic 				= eval(String(parameters['Title Italic'] || 'false'));

var gradientLineColorCenter 	= String(parameters['Line Center Color'] || 'rgba(255,255,255,1)').trim();
var gradientLineColorBorder 	= String(parameters['Line Border Color'] || 'rgba(255,255,255,0)').trim();

var pressEnterTxt 				= String(parameters['More Info Text'] || 'Select entry for more information');
var pressEnterTxtFont			= String(parameters['More Info Font'] || '').trim();
var pressEnterTxtSz 			= Number(parameters['More Info Size'] || 15);
var pressEnterTxtColor			= String(parameters['More Info Color'] || '').trim();
var pressEnterTxtOutlineColor	= String(parameters['More Info OL Color'] || '').trim();
var pressEnterTxtPos 			= String(parameters['More Info Position'] || 'center').trim();

var detailsTxtFont				= String(parameters['Text Font'] || '').trim();
var detailsTxtFontSz			= Number(parameters['Text Size'] || 28);
var detailsTxtOutlineColor		= String(parameters['Text Outline Color'] || '').trim();

var customBackground 			= String(parameters['Custom Background'] || '').trim();
var customNavWindowskin 		= String(parameters['Navigation Windowskin'] || '').trim();
var customListWindowskin 		= String(parameters['Entry List Windowskin'] || '').trim();
var customDetailsWindowskin     = String(parameters['Details Windowskin'] || '').trim();

///////////////////////////
// CONTROL VARIABLES
///////////////////////////
var manualEntries = {}; //object with arrays with all the entry objects for each 'manual'
var currentManual = '';
var currentEntryNames = {}; //object with arrays with names
var previousEntryNames = []; //array of arrays with names
//---------------------
var hiddenEntryNames = function(){
    if ($gameVariables.hiddenEntryNames === undefined){
        $gameVariables.hiddenEntryNames = [];
    }
    return $gameVariables.hiddenEntryNames;
}

////////////////////////////////
// WINDOW MANUAL ENTRY LIST
////////////////////////////////
function Window_ManualEntryList() {
    this.initialize.apply(this, arguments);
}

Window_ManualEntryList.prototype = Object.create(Window_Command.prototype);
Window_ManualEntryList.prototype.constructor = Window_ManualEntryList;

Window_ManualEntryList.prototype.initialize = function() {
    var x = 0;
    if(entryListWindowPos === 'right'){
        x = Graphics.boxWidth - entryListWindowWidth;
    }
    var y = 0;
    if(showNavigationWindow && navigationWindowPos === 'top'){
    	y = this.fittingHeight(1);
	}
    Window_Command.prototype.initialize.call(this, x, y);
    if (customBackground !== '') {
    	this.opacity = 0;
    }
    if (customListWindowskin !== '') {
    	this.windowskin = ImageManager.loadSystem(customListWindowskin);
    }
};

Window_ManualEntryList.prototype.windowWidth = function() {
    return entryListWindowWidth;
};

Window_ManualEntryList.prototype.windowHeight = function() {
	if (showNavigationWindow) {
    	return Graphics.boxHeight - this.fittingHeight(1);
	}
	return Graphics.boxHeight;
};

Window_ManualEntryList.prototype.makeCommandList = function() {
    for (var i = 0; i < currentEntryNames[currentManual].length; i++) {
		var name = currentEntryNames[currentManual][i];
		var symbol = name;
		var enabled = true;
        try {
		  var ext = getManualEntry(name, currentManual);
        }
        catch (e){
            console.error(e);
        }
        if (!isHidden(name)) {
		  this.addCommand(name, symbol, enabled, ext);
        }
	}
};

Window_ManualEntryList.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = 'left';
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    //draw icon
    if(this._list[index].ext.icon !== null){
    	this.drawIcon(this._list[index].ext.icon, rect.x-2, rect.y+2);
    	rect.x += 32;
    	rect.width -= 32;
    }
    this.resetFontSettings();
    if(entryListTxtFont !== ''){
    	this.contents.fontFace = entryListTxtFont;
    }
    this.contents.fontSize = entryListTxtSize;
    if(entryListTxtColor !== ''){
    	this.contents.textColor = entryListTxtColor;
    }
    if(entryListTxtOutlineColor !== ''){
    	this.contents.outlineColor = entryListTxtOutlineColor;
    }
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

Window_ManualEntryList.prototype.processOk = function() {
    if (this.isCurrentItemEnabled()) {
        var index = this.index();
        if (this._list[index].ext.subentries.length > 0){
            this.playOkSound();  
        } else {
            this.playBuzzerSound();
        }
        this.updateInputData();
        //this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
};

////////////////////////////////
// WINDOW MANUAL ENTRY DETAILS
////////////////////////////////
function Window_ManualEntryDetails() {
    this.initialize.apply(this, arguments);
}

Window_ManualEntryDetails.prototype = Object.create(Window_Base.prototype);
Window_ManualEntryDetails.prototype.constructor = Window_ManualEntryDetails;

Window_ManualEntryDetails.prototype.initialize = function() {
    var width = Graphics.boxWidth - entryListWindowWidth;
    var height = Graphics.boxHeight;
    if(showNavigationWindow){
    	height -= this.fittingHeight(1);
    }
    var x = 0;
    if(entryListWindowPos === 'left'){
        x = entryListWindowWidth;
    }
    var y = 0; 
    if(showNavigationWindow && navigationWindowPos === 'top'){
    	y = this.fittingHeight(1);	
    } 
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    if (customBackground !== '') {
    	this.opacity = 0;
    }
    if (customDetailsWindowskin !== '') {
    	this.windowskin = ImageManager.loadSystem(customDetailsWindowskin);
    }
    this._entry = null;
    this._title = '';
    this._pictureScr = null;
    this._picturePos = null;
    this._pictureUnderTxt = null;
    this._text = '';
};

Window_ManualEntryDetails.prototype.setDetails = function() {
    if (this._entry === null) {
        this._title = '';
        this._pictureScr = null;
        this._picturePos = null;
    	this._pictureUnderTxt = null;
        this._text = '';
        this.refresh();
    } else {
    	this._title = this._entry.title;
    	this._pictureScr = this._entry.picture;
    	this._picturePos = this._entry.picturePos;
    	this._pictureUnderTxt = this._entry.pictureUnderTxt;
    	this._text = this._entry.text;
    	this.refresh();
    }
};

Window_ManualEntryDetails.prototype.clear = function() {
    this.setDetails();
};

Window_ManualEntryDetails.prototype.setEntry = function(entry) {
    this._entry = entry;
    this.setDetails();
};

Window_ManualEntryDetails.prototype.refresh = function() {
    this.contents.clear();
    var contentsW = this.width - this.textPadding() - this.standardPadding()*2;
    var contentsX = this.textPadding();
    var y = 2;
    //Title
    this.resetFontSettings();
    this.contents.fontSize = titleTxtSz;
    this.contents.fontItalic = titleTxtItalic;
    if(titleTxtFont !== ''){
    	this.contents.fontFace = titleTxtFont;	
    }
    if(titleTxtColor !== ''){
    	this.contents.textColor = titleTxtColor;	
    }
    if(titleTxtOutlineColor !== ''){
    	this.contents.outlineColor = titleTxtOutlineColor;
    }
    this.drawText(this._title, contentsX, y, contentsW, 'center');
    //GradientLine
    y += this.lineHeight() + 10;
    this.drawGradientLine(y, contentsW);
    y += 10;
    //Press Enter Text
    if (this._entry.subentries.length > 0 && pressEnterTxt.trim() !== '') {
    	this.resetFontSettings();
    	this.contents.fontSize = pressEnterTxtSz;
    	this.contents.fontItalic = false;
    	if(pressEnterTxtFont !== ''){
    		this.contents.fontFace = pressEnterTxtFont;	
    	}
    	if (pressEnterTxtColor !== ''){
    		this.contents.textColor = pressEnterTxtColor;
    	}
    	if(pressEnterTxtOutlineColor !== ''){
    		this.contents.outlineColor = pressEnterTxtOutlineColor;
    	}
    	if (pressEnterTxtPos === 'right'){
    		this.drawText(pressEnterTxt, contentsX, y, contentsW - 2, pressEnterTxtPos);	
    	} else {
    		this.drawText(pressEnterTxt, contentsX, y, contentsW, pressEnterTxtPos);
    	}
    	y += this.lineHeight() + 10;
    }
    //Picture
    if (this._pictureScr !== null){
    	var pic = ImageManager.loadBitmap('img/pictures/', this._pictureScr, 0, true);
    	var sw = pic.width;
    	var sh = pic.height;
    	var dx = 0;
    	var dy = y;
    	switch(this._picturePos){
    		case 'center':
    			dx = contentsW/2 - pic.width/2;
    			break;
    		case 'right':
    			dx = contentsW - pic.width;
    			break;
    		default:
    			break;
    	}
		this.contents.blt(pic, 0, 0, sw, sh, dx, dy);
		if(!this._pictureUnderTxt){
			y += pic.height + 10;
		}
	}
	//text
	this.resetFontSettings();
	if(detailsTxtFont !== ''){
    	this.contents.fontFace = detailsTxtFont;	
    }
    this.contents.fontSize = detailsTxtFontSz;
	if(detailsTxtOutlineColor !== ''){
    	this.contents.outlineColor = detailsTxtOutlineColor;
    }
    this.drawDetailsTextEx(this._text, contentsX, y);
};


Window_ManualEntryDetails.prototype.drawGradientLine = function(y,w) {
	var ctx = this.contents.context;
	var lw = w * 2/3;
	var lx = (w - w * 2/3)/2;
	var lineargradient1 = ctx.createLinearGradient(lx,0,w/2,0);
	lineargradient1.addColorStop(0, gradientLineColorBorder);
	lineargradient1.addColorStop(1, gradientLineColorCenter);
	ctx.fillStyle = lineargradient1;
	ctx.fillRect(lx, y, lw/2, 2);
	var lineargradient2 = ctx.createLinearGradient(w/2,0,lx+lw,0);
	lineargradient2.addColorStop(0, gradientLineColorCenter);
	lineargradient2.addColorStop(1, gradientLineColorBorder);
	ctx.fillStyle = lineargradient2;
	ctx.fillRect(w/2, y, lw/2, 2);
}

Window_ManualEntryDetails.prototype.drawDetailsTextEx = function(text, x, y) {
    if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        //this.resetFontSettings();
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
};

////////////////////////////////
// WINDOW MANUAL NAVIGATION
////////////////////////////////
function Window_ManualNavigation() {
    this.initialize.apply(this, arguments);
}

Window_ManualNavigation.prototype = Object.create(Window_Base.prototype);
Window_ManualNavigation.prototype.constructor = Window_ManualNavigation;

Window_ManualNavigation.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(1);
    var x = 0;
    var y = 0;
    if (navigationWindowPos === 'bottom'){
    	y = Graphics.boxHeight - height;
    }
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    if (customBackground !== '') {
    	this.opacity = 0;
    }
    if (customNavWindowskin !== '') {
    	this.windowskin = ImageManager.loadSystem(customNavWindowskin);
    }
    this._text = '';
    var currentManualName = getManualName(currentManual);
    this._entryChain = [currentManualName];
    this.setText('\\c[' + navigationCurrentColor +']' + currentManualName);
};

Window_ManualNavigation.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_ManualNavigation.prototype.addEntry = function(entry) {
	var text = '\\c[' + navigationNotCurrentColor + ']' + this._entryChain[0];
	this._entryChain.push(entry.name);
	for(var i = 1; i < this._entryChain.length; i++){
		if (i === this._entryChain.length-1){
			text += ' ' + navigationSeparator +' \\c[' + navigationCurrentColor + ']' + this._entryChain[i];
		} else {
			text += ' '+ navigationSeparator + ' ' + this._entryChain[i];
		}
	}
	this.setText(text);
};

Window_ManualNavigation.prototype.removeLastEntry = function(){
	this._entryChain.pop();
	if (this._entryChain.length === 1){
		this.setText('\\c[' + navigationCurrentColor + ']' + this._entryChain[0]);	
		return;
	}
	var text = '\\c[' + navigationNotCurrentColor + ']' + this._entryChain[0];
	for(var i = 1; i < this._entryChain.length; i++){
		if (i === this._entryChain.length-1){
			text += ' ' + navigationSeparator + ' \\c[' + navigationCurrentColor + ']' + this._entryChain[i];
		} else {
			text += ' ' + navigationSeparator + ' ' + this._entryChain[i];
		}
	}
	this.setText(text);
};

Window_ManualNavigation.prototype.clear = function() {
    this.setText('');
};

Window_ManualNavigation.prototype.setEntry = function(entry) {
    this.setText(entry ? entry.text : '');
};

Window_ManualNavigation.prototype.refresh = function() {
    this.contents.clear();
    this.resetFontSettings();
    if(navigationTxtFont !== ''){
    	this.contents.fontFace = navigationTxtFont	
    }
    if(navigationTxtOutlineColor !== ''){
    	this.contents.outlineColor = navigationTxtOutlineColor;
    }
    this.contents.fontSize = navigationTxtSz;
    this.drawNavigationTextEx(this._text, this.textPadding(), 0);
};

Window_ManualNavigation.prototype.drawNavigationTextEx = function(text, x, y) {
    if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        //this.resetFontSettings();
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
};

///////////////////////////////
// SCENE GAME MANUAL
///////////////////////////////
function Scene_GameManual() {
    this.initialize.apply(this, arguments);
}

Scene_GameManual.prototype = Object.create(Scene_Base.prototype);
Scene_GameManual.prototype.constructor = Scene_GameManual;

Scene_GameManual.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_GameManual.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createEntryListWindow();
    this.createEntryDetailsWindow();
    this.createNavigationWindow();
    this._currentEntryIndex = -1; //to force details update
};

Scene_GameManual.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    if (customBackground === '') {
	    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	} else {
		this._backgroundSprite.bitmap = Bitmap.load('img/system/' + customBackground + '.png');
	}
    this.addChild(this._backgroundSprite);
};

Scene_GameManual.prototype.createEntryListWindow = function() {
	this._entryListWindow = new Window_ManualEntryList();
	this._entryListWindow.setHandler('ok',     this.onEntryOk.bind(this));
    this._entryListWindow.setHandler('cancel', this.onEntryCancel.bind(this));
    this.addWindow(this._entryListWindow);
};

Scene_GameManual.prototype.createEntryDetailsWindow = function() {
	this._entryDetailsWindow = new Window_ManualEntryDetails();
	this.addWindow(this._entryDetailsWindow);
};

Scene_GameManual.prototype.createNavigationWindow = function() {
	this._navigationWindow = new Window_ManualNavigation();
	this.addWindow(this._navigationWindow);
	if (!showNavigationWindow){
		this._navigationWindow.hide();	
	}
};

Scene_GameManual.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if (this._entryListWindow.index() !== this._currentEntryIndex){
    	var currentEntry = this._entryListWindow.currentExt();
    	if (currentEntry !== null){
    		this._entryDetailsWindow.setEntry(currentEntry);	
    	}
    	this._currentEntryIndex = this._entryListWindow.index();
    }
};

Scene_GameManual.prototype.onEntryOk = function(){
	var currentEntry = this._entryListWindow.currentExt();
	if (currentEntry.subentries.length === 0){
		this._entryListWindow.activate();
		return;
	}
	previousEntryNames.push(currentEntryNames[currentManual]);
	currentEntryNames[currentManual] = currentEntry.subentries;
	this._navigationWindow.addEntry(currentEntry);
	this._entryListWindow.refresh();
	this._entryListWindow.activate();
	this._entryListWindow.select(0);
	this._currentEntryIndex = -1; //to force details update
}

Scene_GameManual.prototype.onEntryCancel = function(){
	if (previousEntryNames.length === 0){
		SceneManager.pop();
		return;
	}
	currentEntryNames[currentManual] = previousEntryNames.pop();
	this._navigationWindow.removeLastEntry();
	this._entryListWindow.refresh();
	this._entryListWindow.activate();
	this._entryListWindow.select(0);
	this._currentEntryIndex = -1; //to force details update
}

//////////////////////////
// ADD TO MAIN MENU
//////////////////////////
_Window_MenuCommand_addOriginalCommands_ARIGM = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_Window_MenuCommand_addOriginalCommands_ARIGM.call(this);
    for(var i = 0; i < addToMainMenu.length; i++) {
        if (addToMainMenu[i] !== '') {
            var name = getManualName(addToMainMenu[i]);
            var symbol = 'gamemanual' + addToMainMenu[i];
            this.addCommand(name, symbol , true);        
        }
    }	
};

_Scene_Menu_createCommandWindow_ARIGM = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow_ARIGM.call(this);
    for(var i = 0; i < addToMainMenu.length; i++) {
        if (addToMainMenu[i] !== '') {
            var symbol = 'gamemanual' + addToMainMenu[i];
            this._commandWindow.setHandler(symbol, this.commandGameManual.bind(this,addToMainMenu[i]));        
        }
    }
};

Scene_Menu.prototype.commandGameManual = function(manualSymbol) {
    currentManual = manualSymbol;
    SceneManager.push(Scene_GameManual);
};



//////////////////////////
// DATA MANAGEMENT
//////////////////////////
DataManager.loadGameManual = function() {
    loadCustomFonts();
    loadCustomBackground();
	var xhr = new XMLHttpRequest();
	var url = 'data/' + gameManualFile;
	xhr.overrideMimeType('text/plain');
	
	xhr.open('GET', url);
	
	xhr.onload = function() {
		if (xhr.status < 400){
			DataManager.parseGameManual(xhr.responseText);
		} else {
			console.error("Error loading Manual File (HTML status is 400+): " + xhr.statusText);
		}
	};
	xhr.onerror = function(s) {
		console.error("Failed to load Manual File: " + xhr.statusText);
	}
	xhr.send();
};

DataManager.parseGameManual = function(manualText) {
	var lines = manualText.split('\n');
	var entry = {};
	var readText = false;
	var text = '';
    var manuals = [];
	for(var i = 0; i < lines.length; i++ ) {
		line = lines[i];
		if (line === null || line.trim()[0] === '#'){
			continue;
		}
		if (line.trim() === '' && readText === false){
			continue;
		}
        if (line.contains('<main entries>')) {
            parseMainEntriesTag(line);
            continue;
        }
        if (line.contains('<main entries of')) {
            parseMainEntriesTag(line);
        }
        if (line.contains('<at>')) {
            manuals = parseAtTag(line);
            continue;
        }
		if (line.contains('<name>')) {
			entry.name = line.match(/<name>(.*)/i)[1].trim();
			continue;
		}
		if (line.contains('<icon>')) {
            var icon = line.match(/<icon>(.*)/i)[1].trim();
			if (icon === ''){
				entry.icon = null;
			} else {
				entry.icon = Number(icon);
			}
			continue;
		}
		if (line.contains('<title>')) {
			entry.title = line.match(/<title>(.*)/i)[1].trim();
			continue;
		}
		if (line.contains('<picture>')) {
			var picInfo = line.match(/<picture>(.*)/i)[1].split(';');
			entry.picture = picInfo[0].trim();	
			if (picInfo[1]){
				entry.picturePos = picInfo[1];
			} else {
				entry.picturePos = 'center';
			}
			if (picInfo[2] && picInfo[2].trim() === 'true') {
				entry.pictureUnderTxt = true;
			} else {
				entry.pictureUnderTxt = false;
			}
			if (entry.picture === '') {
				entry.picture = null;
			} else {
				//Load Pictures
				ImageManager.loadBitmap('img/pictures/', entry.picture, 0, true);
			}
            continue;
		}
		if (line.contains('<subentries>')) {
			entry.subentries = [];
			parseSubentriesTag(entry, line);
			continue;
		}
		if (line.contains('<text>')) {
			readText = true;
			continue;
        }
		if (line.contains('<end entry>')) {
			entry.text = text.substring(0, text.length-1); //removes last '\n'
            includeOptionalTags(entry);
            addEntry(entry,manuals);
            entry = {};
            readText = false;
            text = '';
			manuals = [];
			continue;
		}
        if (readText){
            text += line + '\n';
            continue;
        }
	}
};

var loadCustomBackground = function() {
    if (customBackground !== '') {
        ImageManager.loadSystem(customBackground);
    }
    if (customNavWindowskin !== '') {
        ImageManager.loadSystem(customNavWindowskin);
    }
    if (customDetailsWindowskin !== '') {
        ImageManager.loadSystem(customDetailsWindowskin);
    }
    if (customListWindowskin) {
        ImageManager.loadSystem(customListWindowskin);
    }
};

var loadCustomFonts = function() {
    if(titleTxtFont) {
        Graphics.loadFont(titleTxtFont, 'fonts');   
    }
    if(pressEnterTxtFont) {
        Graphics.loadFont(pressEnterTxtFont, 'fonts');  
    }
    if(detailsTxtFont) {
        Graphics.loadFont(detailsTxtFont, 'fonts');
    }
};

var parseMainEntriesTag = function(line){
    var manualSymbol;
    var entryNames;

    if (line.contains('<main entries>')){
        manualSymbol = 'manual';
        entryNames = line.match(/<main entries>(.+)/)[1].split(';');
    } else {
        m = line.match(/<main entries of (.+)>(.+)/i);
        manualSymbol = m[1].trim().toLowerCase();
        entryNames = m[2].split(';');
    }
    for (var i = 0; i < entryNames.length; i++){
        var entryName = entryNames[i].trim();
        if(entryName !== ''){
            if (currentEntryNames[manualSymbol] === undefined){
                currentEntryNames[manualSymbol] = [];
            }
            currentEntryNames[manualSymbol].push(entryName);
        }
    }
}

var parseSubentriesTag = function(entry, line) {
	var sEntries = line.match(/<subentries>(.*)/i)[1].split(';');
	for (var i = 0; i < sEntries.length; i++){
		sEntries[i] = sEntries[i].trim();
		if (sEntries[i] !== '') {
			entry.subentries.push(sEntries[i]);
		}
	}
};

var parseAtTag = function(line) {
    var manuals = [];
    var at = line.match(/<at>(.*)/i)[1].split(';');
    for (var i = 0; i < at.length; i++){
        at[i] = at[i].trim();
        if (at[i] !== '') {
            manuals.push(at[i].toLowerCase());
        }
    }
    return manuals;
}

var addEntry = function (entry, manuals) {
    if (manuals.length === 0){
        manuals[0] = 'manual';
    }
    for (var i = 0; i < manuals.length; i++){
        if (manualEntries[manuals[i]] === undefined){
            manualEntries[manuals[i]] = [];
        }
        manualEntries[manuals[i]].push(entry);
    }
};

var includeOptionalTags = function(entry){
    if (entry.icon === undefined){
        entry.icon = null;
    }
    if (entry.title === undefined){
        entry.title = entry.name;
    }
    if (entry.picture === undefined){
        entry.picture = null;
    }
    if (entry.subentries === undefined){
        entry.subentries = [];
    }
    if (entry.text === undefined){
        entry.text = '';
    }
};

var getManualEntry = function(entryName, manualSymbol) {
    if (manualSymbol === undefined){
        var manualSymbol = 'manual';
    }
    for (var i = 0; i < manualEntries[manualSymbol].length; i++){
		if (manualEntries[manualSymbol][i].name === entryName){
			return manualEntries[manualSymbol][i];
		}
	}
	throw 'Error trying to read current entries of ' + manualSymbol + '. Entry not found: ' + entryName;
};

var getManualName = function(symbol) {
    for(var i = 0; i < gameManualNames.length; i++){
        if(gameManualNames[i].symbol === symbol){
            return gameManualNames[i].name;
        }
    }
}

///////////////////////////////////////
// DYNAMIC CONTROL
//////////////////////////////////////

var isHidden = function(entryName) {
    return hiddenEntryNames().contains(entryName);
};

var hideEntry = function(entryName) {
    if (!isHidden(entryName)) {
        hiddenEntryNames().push(entryName);
    }
};

var showEntry = function(entryName) {
    var iToDelete = null;
    for (var i = 0; i < hiddenEntryNames().length; i++) {
        if (hiddenEntryNames()[i] === entryName) {
            iToDelete = i;
        }
    }
    if(iToDelete !== null){
        delete hiddenEntryNames()[iToDelete];
    }
};

var hideAllEntries = function(manualSymbol) {
    for (var i = 0; i < manualEntries[manualSymbol].length; i++) {
        hideEntry(manualEntries[manualSymbol][i].name);
    }
};

var showAllEntries = function(manualSymbol) {
    for(var i = 0; i < manualEntries[manualSymbol].length; i++) {
        showEntry(manualEntries[manualSymbol][i].name);
    }
};


//////////////////////////////////
// MANUAL MANAGEMENT
//////////////////////////////////
SceneManager.openGameManual = function(manualSymbol) {
    if(manualSymbol === undefined) {
        var manualSymbol = 'manual';
    }
    currentManual = manualSymbol;
	SceneManager.push(Scene_GameManual);
};

_Game_Interpreter_pluginCommand_ARIGM = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand_ARIGM.call(this, command, args);
    if(command.contains('OpenGameManual')) {
        if (args.length === 0) {
            SceneManager.openGameManual('manual');    
        } else {
            SceneManager.openGameManual(args[0].trim().toLowerCase());
        }
    }
    if(command.contains('ShowAllManualEntries')) {
        if (args.length === 0) {
            showAllEntries('manual');
        } else {
            showAllEntries(args[0].trim().toLowerCase());
        }
    }
    if(command.contains('HideAllManualEntries')) {
        if (args.length === 0) {
            hideAllEntries('manual');
        } else {
            hideAllEntries(args[0].trim().toLowerCase());
        }
    }
    if(command.contains('ShowManualEntry') || command.contains('ShowManualEntries')) {
        for (var i = 0; i < args.length; i ++) {
            args[i] = args[i].replace('_', ' ');
            showEntry(args[i]);
        }
    }
    if(command.contains('HideManualEntry') || command.contains('HideManualEntries')) {
        for(var i = 0; i < args.length; i++) {
            args[i] = args[i].replace('_', ' ');
            hideEntry(args[i]);
        }
    }
};


////////////////////////////////
DataManager.loadGameManual();
////////////////////////////////
})();