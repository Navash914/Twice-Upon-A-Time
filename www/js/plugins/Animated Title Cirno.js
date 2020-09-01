//----------------------------------------------------------
// Animated Title Cirno.js
//----------------------------------------------------------

/*:
 * @plugindesc Animated Title Cirno
 * @author Soulpour777
 *
 * @help //----------------------------------------------------------
// [RMMV] Animated Title Cirno
// Version: 1.0
// Author: Soulpour777
//----------------------------------------------------------
 * @param TitleCommandImages
 * @desc The list contains the names of the images of your title command.
 * @default TitleMenu01, TitleMenu02, TitleMenu03
 *
 * @param ScrollingText
 * @desc The name of the scrolling text image for the title.
 * @default ScrollText
 *
 * @param ScrollingLine
 * @desc The name of the scrolling line image for the title.
 * @default ScrollLine
 * 
 * @param ContinueDisabled
 * @desc The image displayed if there's no save data and its under continue mark.
 * @default TitleMenu02_B
 *   
 * @param DisableDrawingOfTitle
 * @desc Disable the Draw Game Title, because it is annoying. True or false?
 * @default True
 *
 * @param TitleParticles
 * @desc Name of particle you are using.
 * @default Title_Particle
 * 
 * @param ParticleSpeed
 * @desc How fast the animation of the particle should go.
 * @default 0.9
 *  
 * @param PortraitImages
 * @desc The portrait array that holds all list of portrait names (without "" marks).
 * @default Cirno1, Cirno2, Cirno3
 *
 * @param ImageTitle
 * @desc The title logo you are using.
 * @default Title
 *
 * @param PortraitsOpacity
 * @desc Opacity of the Portraits you are using.
 * @default 200
 *
 * @param PortraitFadeInSpeed
 * @desc Amount of Fade In Speed when portrait is shown in the title screen.
 * @default 10 
 *
 * @param PortraitFadeOutSpeed
 * @desc Amount of Fade Out Speed when portrait is shown in the title screen.
 * @default 10  
 *
 * @param BackgroundOverlayOpacity
 * @desc The amount of opacity the overlay background on the title should be shown.
 * @default 150
 *  
 * @param TitleLogoOpacity
 * @desc Amount of opacity your title logo should be shown or appearing at.
 * @default 10
 *   
 * @param TitleLogoOpacityIncrease
 * @desc Speed of the logo's fade in when shown at the beginning of the title screen.
 * @default 1
 *    
 */

// Alias Methods
var _alias_soul_prototype_create_command_window = Scene_Title.prototype.createCommandWindow;
var _alias_soul_prototype_scene_title_update = Scene_Title.prototype.update;
var _alias_soul_prototype_scene_title_terminate = Scene_Title.prototype.terminate;
var _alias_soul_prototype_scene_title_start = Scene_Title.prototype.start;
var _alias_soul_prototype_scene_title_create = Scene_Title.prototype.create;

var Imported = Imported || {};
Imported.AnimatedTitleCirno = true;
var Soulpour777 = Soulpour777 || {};
Soulpour777.params = PluginManager.parameters('Animated Title Cirno'); 

// Parameter call
// var params = PluginManager.parameters('Animated Title Cirno'); 

// Command Parameter
var title_images_list = Soulpour777.params['TitleCommandImages'].split(/\s*,\s*/).filter(function(value) { return !!value; });

// Portraits Parameter
var portrait_images_list = Soulpour777.params['PortraitImages'].split(/\s*,\s*/).filter(function(value) { return !!value; });

// Scrolling Objects parameter
var scroll_line = String(Soulpour777.params['ScrollingLine'] || "ScrollLine");
var scroll_text = String(Soulpour777.params['ScrollingText'] || "ScrollText");

// Continue Disabled Parameter
var continue_is_disabled = String(Soulpour777.params['ContinueDisabled'] || "TitleMenu02_B");

// Disable Drawing of Title Parameter
var disableDrawingTitle = Boolean(Soulpour777.params['DisableDrawingOfTitle'] || true);

// Title Image Parameters
var titleImage = String(Soulpour777.params['ImageTitle'] || "Title");
var titleImageOpacity = Number(Soulpour777.params['TitleLogoOpacity'] || 10);
var titleImageOpacityIncreaseSpeed = Number(Soulpour777.params['TitleLogoOpacityIncrease'] || 1);

// Particle Parameters
var titleParticle = String(Soulpour777.params['TitleParticles'] || "Title_Particle");
var titleParticleSpeed = Number(Soulpour777.params['ParticleSpeed'] || 0.9);

// Portraits Parameter
var portraits_opacity = Number(Soulpour777.params['PortraitsOpacity'] || 200);
var portraits_fadeIn_increase = Number(Soulpour777.params['PortraitFadeInSpeed'] || 10);
var portraits_fadeIn_decrease = Number(Soulpour777.params['PortraitFadeOutSpeed'] || 10);

// Backgrounds Parameter
var secondBackgroundOpacity = Number(Soulpour777.params['BackgroundOverlayOpacity'] || 150);

Scene_Title.prototype.titleScreenCommand;
Scene_Title.prototype.particle1;
Scene_Title.prototype.scrollLine;
Scene_Title.prototype.scrollText;
Scene_Title.prototype.title_sprite1;
Scene_Title.prototype.title_sprite2;
Scene_Title.prototype.portrait_images;
Scene_Title.prototype.title_image = titleImage;
Scene_Title.prototype.particle_image;

Scene_Title.prototype.createForeground = function() {
    this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChild(this._gameTitleSprite);
    if (!disableDrawingTitle) {
        this.drawGameTitle();
    }
};

Scene_Title.prototype.create = function() {
    _alias_soul_prototype_scene_title_create.call(this);
    for(var i = 0; i < portrait_images_list.length; i++) {
        ImageManager.loadSystem(portrait_images_list[i]);
    }    
    this.portrait_images = null;
    this._lastBitmapIndex = this._commandWindow._index;
    this.create_portrait();    
};

Scene_Title.prototype.create_titleDrawing = function() {
    this._gameTitleImage = new Sprite();
    this._gameTitleImage.bitmap = ImageManager.loadSystem(this.title_image);
    this._gameTitleImage.opacity = titleImageOpacity;
    this.addChildAt(this._gameTitleImage, 7);
}

Scene_Title.prototype.create_particle = function() {
    this.particle_image = new TilingSprite();
    this.particle_image.move(0, 0, 816, 624);
    this.particle_image.bitmap = ImageManager.loadSystem(titleParticle);
    this.particle_image.opacity = secondBackgroundOpacity;
    this.addChildAt(this.particle_image, 7);
}

Scene_Title.prototype.update_particle = function() {
    this.particle_image.origin.y += titleParticleSpeed;
}


Scene_Title.prototype.createCommandWindow = function() {
	_alias_soul_prototype_create_command_window.call(this);
    this._commandWindow.x = -Graphics.width;
    this._commandWindow.y = -Graphics.height;
    this._commandWindow.visible = false;
};


Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    // this.centerSprite(this._backSprite1);
    // this.centerSprite(this._backSprite2);
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
    // new functions
    this.createCommandImages();
    this.create_scrollLineAndText();
    this.create_titleDrawing();
    this.create_particle();
};

Scene_Title.prototype.update = function() {
    _alias_soul_prototype_scene_title_update.call(this);
    if (DataManager.isAnySavefileExists()) {
        this.titleScreenCommand.bitmap = ImageManager.loadSystem(title_images_list[this._commandWindow._index]);
    } else {
        if (this._commandWindow._index == 1) {
            this.titleScreenCommand.bitmap = ImageManager.loadSystem(continue_is_disabled);
        } else {
            this.titleScreenCommand.bitmap = ImageManager.loadSystem(title_images_list[this._commandWindow._index]);
        }
    }

    //update coordinates

    if(TouchInput.isTriggered() && TouchInput._x > Graphics.width / 2 - 100 && TouchInput._x < Graphics.width / 2 + 100 
        && TouchInput._y > 440 && TouchInput._y < 480) {
        this._commandWindow._index = 0;  
        SoundManager.playCursor();
        this._commandWindow.processOk();
    
    }

    if(TouchInput.isTriggered() && TouchInput._x > Graphics.width / 2 - 140 && TouchInput._x < Graphics.width / 2 + 140 
        && TouchInput._y > 500 && TouchInput._y < 540) {
        SoundManager.playCursor();
        this._commandWindow._index = 1;
        SoundManager.playCursor();
        this._commandWindow.processOk();
    }

    if(TouchInput.isTriggered() && TouchInput._x > Graphics.width / 2 - 140 && TouchInput._x < Graphics.width / 2 + 140 
        && TouchInput._y > 540 && TouchInput._y < 560) {
        SoundManager.playCursor();
        this._commandWindow._index = 2;
        SoundManager.playCursor();
        this._commandWindow.processOk();
    }

    this._lastBitmapIndex = this._commandWindow._index;
        if(this.portrait_images.opacity <= 0){
          this.portrait_images.bitmap = ImageManager.loadSystem(portrait_images_list[this._commandWindow._index]);
          this.portrait_images.name = portrait_images_list[this._lastBitmapIndex];
        }
        this.update_portrait_image_animation();
      

    if (this._gameTitleImage.opacity < 255) {
        this._gameTitleImage.opacity += titleImageOpacityIncreaseSpeed;
    }



    this.update_particle();
    this.portrait_images.bitmap = ImageManager.loadSystem(portrait_images_list[this._commandWindow._index]);
    
    this.update_portrait_image_animation();
    this.updateTextScroll();
    this.updateScrollPosition();
    this.updateTitleScrollBG();
    this.updateTitleBGForward();
};

Scene_Title.prototype.create_portrait = function() {
    this.portrait_images = new Sprite();
    this.portrait_images.bitmap = ImageManager.loadSystem(portrait_images_list[this._lastBitmapIndex]);
    this.portrait_images.opacity = portraits_opacity;
    this.portrait_images.name = portrait_images_list[this._lastBitmapIndex];
    this.addChildAt(this.portrait_images, 1);    
}

Scene_Title.prototype.update_portrait_image_animation = function() {
    var x = new Date().getTime() / 1000;
    this.portrait_images.x = Graphics.width / 2 - this.portrait_images.width / 4 + Math.sin(parseFloat(x)) * 100;
    if(this.portrait_images.name !== portrait_images_list[this._lastBitmapIndex]){
      if(this.portrait_images.opacity > 0) {
        this.portrait_images.opacity -= portraits_fadeIn_decrease;
      }
    } else {
      if(this.portrait_images.opacity < 255){
        this.portrait_images.opacity += portraits_fadeIn_increase;
      }
    }    
}




Scene_Title.prototype.terminate = function() {
	this.removeChild(this.titleScreenCommand);
    _alias_soul_prototype_scene_title_terminate.call(this);
    this.removeChild(this.particle_image);
    this.removeChild(this.title_sprite1);
    this.removeChild(this.title_sprite2);
    this.removeChild(this.scrollText);
    this.removeChild(this.scrollLine);
    this.removeChild(this.portrait_images);
};

Scene_Title.prototype.updateTitleScrollBG = function() {
	this.title_sprite1.origin.x += 0.5;
}

Scene_Title.prototype.updateTitleBGForward = function() {
	this.title_sprite2.origin.x += 0;
	this.title_sprite2.origin.y += 0;
}

Scene_Title.prototype.createBackground = function() {
	// forms new title image, loops
    this.title_sprite1 = new TilingSprite();
    this.title_sprite2 = new TilingSprite();
    this.title_sprite1.bitmap = ImageManager.loadTitle1("TitleBGLoop");
    this.title_sprite2.bitmap = ImageManager.loadTitle1("TitleBG");
    this.title_sprite2.opacity = secondBackgroundOpacity;
    this.title_sprite1.move(0, 0, 816, 624);
    this.title_sprite2.move(0, 0, 816, 624);
    this.addChildAt(this.title_sprite1, 0);
    this.addChildAt(this.title_sprite2, 1);
};


Scene_Title.prototype.create_scrollLineAndText = function() {
	this.scrollLine = new Sprite();
	this.scrollText = new TilingSprite();
	this.scrollLine.bitmap = ImageManager.loadSystem(scroll_line);
	this.scrollText.bitmap = ImageManager.loadSystem(scroll_text);
	this.scrollText.move(0, 0, 816, 30);
	this.addChildAt(this.scrollLine, 3);
	this.addChildAt(this.scrollText, 4);
	this.scrollLine.x = 0;
	this.scrollLine.y = this.titleScreenCommand.y;
	this.scrollText.x = 0	
	
	this.updateScrollPosition();
}

Scene_Title.prototype.updateScrollPosition = function() {
	switch(this._commandWindow._index) {
		case 0:
			this.scrollLine.y = this.titleScreenCommand.y;
			this.scrollText.y = this.titleScreenCommand.y + 5;
			break;
		case 1:
			this.scrollLine.y = this.titleScreenCommand.y + 40;
			this.scrollText.y = this.titleScreenCommand.y + 47;
			break;
		case 2:
			this.scrollLine.y = this.titleScreenCommand.y + 75;
			this.scrollText.y = this.titleScreenCommand.y + 85;
			break;

	}
}

Scene_Title.prototype.updateTextScroll = function() {
	this.scrollText.origin.x += 1;
}

Scene_Title.prototype.createCommandImages = function() {
	this.titleScreenCommand = new Sprite();
	this.titleScreenCommand.x = Graphics.width / 2 - 90;
	this.titleScreenCommand.y = Graphics.height / 2 + 140;
	this.addChildAt(this.titleScreenCommand, 3);
}

