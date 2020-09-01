		Scene_Name.prototype.setLetters = function() {
			for(var i = 48; i <= 57; i++) {
				Input.keyMapper[i] = _.numberz.substring(i-48,i-47);
			}
			for(var i = 65; i <= 90; i++) {
				Input.keyMapper[i] = _.letterz.substring(i-65,i-64);
			}
			Input.keyMapper[8] = "backspace";
			Input.keyMapper[13] = "enter";
			Input.keyMapper[32] = "space";
			this._lettersSet = true;
			Input.resetAllKeystrokes();
		}