//----------------------------------------------------------
// Animated Title Cirno.js
//----------------------------------------------------------

/*:
 * @plugindesc Makes your boring title screen to an animated one!
 * @author Soulpour777
 * 
 * @help
//----------------------------------------------------------
// Animated Title Cirno.js
// Author: Soulpour777
//----------------------------------------------------------
 * Plugin Help:
 * Mouse and Touch Pad Settings: 
 * Take note that when you change the locations of your command picture's x and y, 
 * you might want to consider changing some of the variables that can be found
 * in your plugin manager, because most of them are at default location where
 * your commands are. That means if you changed the position of your commands,
 * change the touchpad settings as well.
 * Change the following variables if command position is changed:
 * TouchPadXMin, TouchPadXMax, TouchPadYMin01, TouchPadXMax01,
 * TouchPadYMin02, TouchPadXMax02, TouchPadYMin03, TouchPadXMax03.
 * Each TouchPadYMin and Max values are determined which command
 * is used. If you are using separate images, bulk them into one just like
 * how the default example was made.
 * Place your images under the img/titles1 folder.

 * @param TitleCommandImagesReimu
 * @desc The list contains the names of the images of your title command.
 * @default Menu01, Menu02, Menu03
 * 
 * @param TitleCommandsX
 * @desc The x position of your title command images.
 * @default 90
 * 
 * @param TitleCommandsY
 * @desc The x position of your title command images.
 * @default 380
 *
 * @param PortraitTitle
 * @desc The portrait image you use floating on the screen. (without "" marks)
 * @default Reimu
 *
 * @param PortraitImageX
 * @desc The x position of the portrait image you use floating on the screen.
 * @default 400
 * 
 * @param PortraitImageY
 * @desc The y position of the portrait image you use floating on the screen.
 * @default 200
 * 
 * @param PortraitsOpacity
 * @desc Opacity of the Portraits you are using.
 * @default 255
 *
 * @param PortraitMovementDivider
 * @desc How many milliseconds do you want to cut off animating the portrait everytime?
 * @default 1000 
 *
 * @param TitleBackSprite
 * @desc Opacity of the Portraits you are using.
 * @default TitleBack
 *
 * @param CircleObj
 * @desc The Circle Symbol you are using (without "" marks).
 * @default CircleSymbol   
 *
 * @param CircleX
 * @desc The x position of the circle rotating on your title screen.
 * @default 620   
 *
 * @param CircleY
 * @desc The y position of the circle rotating on your title screen.
 * @default 312   
 *
 * @param CircleAnchorX
 * @desc The origin point of the sprite in x. (ex: (0,0) to (1,1).)
 * @default 0.5   
 *
 * @param CircleAnchorY
 * @desc The origin point of the sprite in y. (ex: (0,0) to (1,1).)
 * @default 0.5   
 *
 * @param CircleOpacity
 * @desc The opacity of your circle symbol rotating on your title screen.
 * @default 255
 *
 * @param CircleRotation
 * @desc The rotation speed of the circle object rotating on your title screen.
 * @default 0.005
 *
 * @param ContinueDisabled
 * @desc The image displayed if there's no save data and its under continue mark.
 * @default Menu02_B
 *
 * @param CursorDivider
 * @desc How many milliseconds do you want to cut off animating the cursor everytime?
 * @default 200 
 * 
 * @param TouchPadXMin
 * @desc The touchpad default x position minimum value range. 
 * @default 20
 *
 * @param TouchPadXMax
 * @desc The touchpad default y position maximum value range. 
 * @default 180
 *
 * @param TouchPadYMin01
 * @desc The touchpad default y position minimum value range (First Option). 
 * @default 400
 *
 * @param TouchPadYMax01
 * @desc The touchpad default y position maximum value range (First Option). 
 * @default 420
 *
 * @param TouchPadYMin02
 * @desc The touchpad default y position minimum value range (Second Option). 
 * @default 440
 *
 * @param TouchPadYMin02
 * @desc The touchpad default y position maximum value range (Second Option). 
 * @default 480
 *
 * @param TouchPadYMin03
 * @desc The touchpad default y position minimum value range (Third Option). 
 * @default 470
 *
 * @param TouchPadYMin03
 * @desc The touchpad default y position maximum value range (Third Option). 
 * @default 520
 *
 */

var Imported = Imported || {};
Imported.AnimatedTitleReimu = true;
var Soulpour777 = Soulpour777 || {};
Soulpour777.AnimatedTitleReimu = {};
Soulpour777.AnimatedTitleReimu.params = PluginManager.parameters('Animated Title Reimu'); 

// Touchpad Settings
var touchpad_xmin = Number(Soulpour777.AnimatedTitleReimu.params['TouchPadXMin'] || 20); 
var touchpad_xmax = Number(Soulpour777.AnimatedTitleReimu.params['TouchPadXMax'] || 180); 
var touchpad_ymin_a = Number(Soulpour777.AnimatedTitleReimu.params['TouchPadYMin01'] || 400); 
var touchpad_ymax_a = Number(Soulpour777.AnimatedTitleReimu.params['TouchPadYMax01'] || 420); 
var touchpad_ymin_b = Number(Soulpour777.AnimatedTitleReimu.params['TouchPadYMin02'] || 440); 
var touchpad_ymax_b = Number(Soulpour777.AnimatedTitleReimu.params['TouchPadYMax02'] || 480); 
var touchpad_ymin_c = Number(Soulpour777.AnimatedTitleReimu.params['TouchPadYMin03'] || 470); 
var touchpad_ymax_c = Number(Soulpour777.AnimatedTitleReimu.params['TouchPadYMax03'] || 520); 

// Portrait Variables
var portraits_opacity = Number(Soulpour777.AnimatedTitleReimu.params['PortraitsOpacity'] || 255);
var portrait_images_list = String(Soulpour777.AnimatedTitleReimu.params['PortraitTitle']|| "Reimu");
var portrait_image_x = Number(Soulpour777.AnimatedTitleReimu.params['PortraitImageX'] || 400);
var portrait_image_y = Number(Soulpour777.AnimatedTitleReimu.params['PortraitImageY'] || 200);
var portrait_image_mov = Number(Soulpour777.AnimatedTitleReimu.params['PortraitMovementDivider'] || 1000);

//Circle Variables
var circle_sym = String(Soulpour777.AnimatedTitleReimu.params['CircleObj']|| "CircleSymbol");
var circle_sym_x = Number(Soulpour777.AnimatedTitleReimu.params['CircleX'] || 620);
var circle_sym_y = Number(Soulpour777.AnimatedTitleReimu.params['CircleY'] || 312);
var circle_sym_anchor_x = Number(Soulpour777.AnimatedTitleReimu.params['CircleAnchorX'] || 0.5);
var circle_sym_anchor_y = Number(Soulpour777.AnimatedTitleReimu.params['CircleAnchorY'] || 0.5);
var circle_sym_opacity = Number(Soulpour777.AnimatedTitleReimu.params['CircleOpacity'] || 255);
var circle_sym_rotation = Number(Soulpour777.AnimatedTitleReimu.params['CircleRotation'] || 0.005);

// Title Variables
var title_back_sprite = String(Soulpour777.AnimatedTitleReimu.params['TitleBackSprite']|| "titleBack");
var title_commands_x = Number(Soulpour777.AnimatedTitleReimu.params['TitleCommandsX'] || 90);
var title_commands_y = Number(Soulpour777.AnimatedTitleReimu.params['TitleCommandsY'] || 380);
var continue_is_disabled = String(Soulpour777.AnimatedTitleReimu.params['Menu02_B'] || "Menu02_B");
var cursor = String(Soulpour777.AnimatedTitleReimu.params['IndicatorCursor'] || "Indicator_Cursor");
var cursor_divider = Number(Soulpour777.AnimatedTitleReimu.params['CursorDivider'] || 200);

// Alias Methods
var alias_scene_title_prototype_create = Scene_Title.prototype.create;
var alias_scene_title_prototype_update = Scene_Title.prototype.update;

// Command Image Variables
var reimu_command_images = Soulpour777.AnimatedTitleReimu.params['TitleCommandImagesReimu'].split(/\s*,\s*/).filter(function(value) { return !!value; });
var titleImage = String(Soulpour777.AnimatedTitleReimu.params['TitleLogo'] || "Title_Logo");

// Instance Variables
Scene_Title.prototype.circle_object;
Scene_Title.prototype.titleScreenCommandReimu;
Scene_Title.prototype.command_option_sprite;
Scene_Title.prototype.command_continue_sprite;
Scene_Title.prototype.cursor_image;
Scene_Title.prototype._gameTitleImage;
Scene_Title.prototype.particle_object;
// Disable Drawing of Title Parameter
var disableDrawingTitle = String(Soulpour777.AnimatedTitleReimu.params['DisableDrawingOfTitle'] || "true");


Scene_Title.prototype.create = function() {
	//call original method
    alias_scene_title_prototype_create.call(this);   
    this.portrait_images = null;	
    this.create_portrait();  
    this.create_titleDrawing();
    this.create_circle_object();
    this.createCommandImages();
    this.create_indicator();
};

Scene_Title.prototype.create_portrait = function() {
    this.portrait_images = new Sprite();
    this.portrait_images.bitmap = ImageManager.loadTitle1(portrait_images_list);
    this.portrait_images.opacity = portraits_opacity;
    this.portrait_images.x = portrait_image_x;
    this.portrait_images.y = portrait_image_y;
    this.portrait_images.name = portrait_images_list;
    this.addChildAt(this.portrait_images, 4);    
}
Scene_Title.prototype.createForeground = function() {
    this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChild(this._gameTitleSprite);
    
};
Scene_Title.prototype.createBackground = function() {
    this._backSprite1 = new Sprite(ImageManager.loadTitle1(title_back_sprite));
    this._backSprite2 = new Sprite(ImageManager.loadTitle1(title_back_sprite));
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);        
};

Scene_Title.prototype.update_portrait_image_animation = function() {
    var x = new Date().getTime() / portrait_image_mov;
    this.portrait_images.y = Graphics.height / 2 - this.portrait_images.height / 4 + Math.cos(parseFloat(x)) * 70;
       
}

Scene_Title.prototype.update = function() {
    alias_scene_title_prototype_update.call(this);
    this.rotate_circle_object();
    this.update_portrait_image_animation();
    this.portrait_images.bitmap = ImageManager.loadTitle1(portrait_images_list);
    if (DataManager.isAnySavefileExists()) {
        this.command_continue_sprite.bitmap = ImageManager.loadTitle1(reimu_command_images[this._commandWindow._index]);
    } else {
        if (this._commandWindow._index == 1) {
           this.command_continue_sprite.bitmap = ImageManager.loadTitle1(continue_is_disabled);
        } else {
            this.command_continue_sprite.bitmap = ImageManager.loadTitle1(reimu_command_images[this._commandWindow._index]);
        }
    }
    this.animate_cursor();
    this.update_cursor_location();
    this.update_pad_android_tab_cursor();
};

Scene_Title.prototype.create_circle_object = function() {
	this.circle_object = new Sprite(ImageManager.loadTitle1(circle_sym));
	this.circle_object.x = circle_sym_x;
	this.circle_object.y = circle_sym_y;
	this.circle_object.anchor.x = circle_sym_anchor_x;
	this.circle_object.anchor.y = circle_sym_anchor_y;
	this.circle_object.opacity = circle_sym_opacity;
	this.addChildAt(this.circle_object, 3);
}


Scene_Title.prototype.rotate_circle_object = function() {
	this.circle_object.rotation += circle_sym_rotation;
	this.circle_object.opacity += 3;
}
var alias_soul_scene_title_prototype_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    alias_soul_scene_title_prototype_createCommandWindow.call(this);
    this._commandWindow.hide();
    this._commandWindow.x = -Graphics.boxWidth;
    this._commandWindow.y = -Graphics.boxHeight;
    this._commandWindow.visible = false;
};

Scene_Title.prototype.createCommandImages = function() {
	this.command_continue_sprite = new Sprite();
	this.command_continue_sprite.bitmap = ImageManager.loadTitle1(reimu_command_images[1]);
	this.command_continue_sprite.x = title_commands_x;
	this.command_continue_sprite.y = title_commands_y;
	this.addChildAt(this.command_continue_sprite, 6);
}

Scene_Title.prototype.create_indicator = function() {
    this.cursor_image = new Sprite();
    this.cursor_image.bitmap = ImageManager.loadTitle1(cursor);
    this.cursor_image.x = this.command_continue_sprite.x - 45;
    this.cursor_image.y = title_commands_x;
    this.addChildAt(this.cursor_image, 6);
}

Scene_Title.prototype.animate_cursor = function() {
    var x = new Date().getTime() / cursor_divider;
    this.cursor_image.x = this.command_continue_sprite.x - 45 - this.cursor_image.height / 4 + Math.cos(parseFloat(x)) * 10;
}

Scene_Title.prototype.update_cursor_location = function() {
    if (this._commandWindow._index == 0) {
        this.cursor_image.y = this.command_continue_sprite.y;
    }
    if (this._commandWindow._index == 1) {
        this.cursor_image.y = this.command_continue_sprite.y + 40;
    }
    if (this._commandWindow._index == 2) {
        this.cursor_image.y = this.command_continue_sprite.y + 80;
    }    
}

Scene_Title.prototype.create_titleDrawing = function() {
    this._gameTitleImage = new Sprite();
    this._gameTitleImage.bitmap = ImageManager.loadTitle1(titleImage);
    this.addChildAt(this._gameTitleImage, 5);
}


Scene_Title.prototype.update_pad_android_tab_cursor = function() {
    if(TouchInput.isTriggered() && TouchInput._x > this.command_continue_sprite.x - touchpad_xmin 
        && TouchInput._x < this.command_continue_sprite.x + touchpad_xmax && TouchInput._y > touchpad_ymin_a && TouchInput._y < touchpad_ymax_a) {
        this._commandWindow._index = 0;  
        SoundManager.playCursor();
        this._commandWindow.processOk();
    
    }
    if(TouchInput.isTriggered() && TouchInput._x > this.command_continue_sprite.x - touchpad_xmin 
        && TouchInput._x < this.command_continue_sprite.x + touchpad_xmax && TouchInput._y > touchpad_ymin_b && TouchInput._y < touchpad_ymax_b) {
        this._commandWindow._index = 1;  
        SoundManager.playCursor();
        this._commandWindow.processOk();
    
    }    
    if(TouchInput.isTriggered() && TouchInput._x > this.command_continue_sprite.x - touchpad_xmin 
        && TouchInput._x < this.command_continue_sprite.x + touchpad_xmax && TouchInput._y > touchpad_ymin_c && TouchInput._y < touchpad_ymax_c) {
        this._commandWindow._index = 2;  
        SoundManager.playCursor();
        this._commandWindow.processOk();
    
    }      
}