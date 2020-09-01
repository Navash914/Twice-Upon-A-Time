/*Window_NameInput.ALPHAONLY =
        [ 'A','B','C','D','E',  'a','b','c','d','e',
          'F','G','H','I','J',  'f','g','h','i','j',
          'K','L','M','N','O',  'k','l','m','n','o',
          'P','Q','R','S','T',  'p','q','r','s','t',
          'U','V','W','X','Y',  'u','v','w','x','y',
          'Z',' ',' ',' ',' ',  'z',' ',' ',' ',' ',
          'OK' ];

Window_NameInput.prototype.table = function() {
    if ($gameSystem.isJapanese()) {
        return [Window_NameInput.JAPAN1,
                Window_NameInput.JAPAN2,
                Window_NameInput.JAPAN3];
    } else if ($gameSystem.isRussian()) {
        return [Window_NameInput.RUSSIA];
    } else {
        return [Window_NameInput.ALPHAONLY];
    }
};

Window_NameInput.prototype.windowHeight = function() {
    return this.fittingHeight(7);
};

Window_NameInput.prototype.character = function() {
    return this._index < 60 ? this.table()[this._page][this._index] : '';
};

Window_NameInput.prototype.maxItems = function() {
    return 61;
};

Window_NameInput.prototype.isOk = function() {
    return this._index === 60;
};

Window_NameInput.prototype.cursorDown = function(wrap) {
    if (this._index === 60) {
        this._index = 0;
    } else if (this._index > 50) {
        this._index = 60;
    } else {
        this._index += 10;
    }
};

Window_NameInput.prototype.cursorUp = function(wrap) {
    if (this._index <= 9) {
        this._index = 60;
    } else {
        this._index -= 10;
    }
};

Window_NameInput.prototype.cursorRight = function(wrap) {
    if (this._index === 60) {
        this._index = 0;
    } else if (this._index % 10 < 9) {
        this._index++;
    } else if (wrap) {
        this._index -= 9;
    }
};

Window_NameInput.prototype.cursorLeft = function(wrap) {
    if (this._index === 60) {
    this._index--;
    } else if (this._index % 10 > 0) {
        this._index--;
    } else if (wrap) {
        this._index += 9;
    }
};

Window_NameInput.prototype.cursorPagedown = function() {
    this._page = (this._page + 1) % this.table().length;
    this.refresh();
};

Window_NameInput.prototype.processHandling = function() {
    if (this.isOpen() && this.active) {
        if (Input.isTriggered('shift')) {
            this.processJump();
        }
        if (Input.isRepeated('cancel')) {
            this.processBack();
        }
        if (Input.isRepeated('ok')) {
            this.processOk();
        }
    }
};

Window_NameInput.prototype.isCancelEnabled = function() {
    return true;
};

Window_NameInput.prototype.processCancel = function() {
    this.processBack();
};

Window_NameInput.prototype.processJump = function() {
    if (this._index !== 60) {
        this._index = 60;
        SoundManager.playCursor();
    }
};

Window_NameInput.prototype.processBack = function() {
    if (this._editWindow.back()) {
        SoundManager.playCancel();
    }
};
*/

Window_NameInput.ALPHAONLY =
        [ 'A','B','C','D','E',  'a','b','c','d','e',
          'F','G','H','I','J',  'f','g','h','i','j',
          'K','L','M','N','O',  'k','l','m','n','o',
          'P','Q','R','S','T',  'p','q','r','s','t',
          'U','V','W','X','Y',  'u','v','w','x','y',
          'Z',' ',' ',' ',' ',  'z',' ',' ',' ',' ',
          ' ',' ',' ',' ',' ',  ' ',' ',' ',' ','OK' ];

Window_NameInput.prototype.table = function() {
    if ($gameSystem.isJapanese()) {
        return [Window_NameInput.JAPAN1,
                Window_NameInput.JAPAN2,
                Window_NameInput.JAPAN3];
    } else if ($gameSystem.isRussian()) {
        return [Window_NameInput.RUSSIA];
    } else {
        return [Window_NameInput.ALPHAONLY];
    }
};

Window_NameInput.prototype.windowHeight = function() {
    return this.fittingHeight(7);
};

Window_NameInput.prototype.character = function() {
    return this._index < 60 ? this.table()[this._page][this._index] : '';
};

Window_NameInput.prototype.maxItems = function() {
    return 70;
};

Window_NameInput.prototype.isOk = function() {
    return this._index === 69;
};

Window_NameInput.prototype.cursorDown = function(wrap) {
    if (this._index === 69) {
        this._index = 0;
    } else if (this._index >= 50) {
        this._index = 69;
    } else {
        this._index += 10;
    }
};

Window_NameInput.prototype.cursorUp = function(wrap) {
    if (this._index <= 9) {
        this._index = 69;
    } else {
        this._index -= 10;
    }
};

Window_NameInput.prototype.cursorRight = function(wrap) {
    if (this._index === 69) {
        this._index = 0;
    } else if (this._index % 10 < 9) {
        this._index++;
    } else if (wrap) {
        this._index -= 9;
    }
};

Window_NameInput.prototype.cursorLeft = function(wrap) {
    if (this._index === 69) {
    this._index--;
    } else if (this._index % 10 > 0) {
        this._index--;
    } else if (wrap) {
        this._index += 9;
    }
};

Window_NameInput.prototype.processHandling = function() {
    if (this.isOpen() && this.active) {
        if (Input.isTriggered('shift')) {
            this.processJump();
        }
        if (Input.isRepeated('cancel')) {
            this.processBack();
        }
        if (Input.isRepeated('ok')) {
            this.processOk();
        }
    }
};

Window_NameInput.prototype.processCancel = function() {
    this.processBack();
};

Window_NameInput.prototype.processJump = function() {
    if (this._index !== 69) {
        this._index = 69;
        SoundManager.playCursor();
    }
};

Window_NameInput.prototype.processBack = function() {
    if (this._editWindow.back()) {
        SoundManager.playCancel();
    }
};
