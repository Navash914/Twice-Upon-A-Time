Sprite_HUDFace.prototype.drawFace = function(faceIndex, width, height) {
	width = width || Window_Base._faceWidth;
	height = height || Window_Base._faceHeight;
	var pw = Window_Base._faceWidth;
	var ph = Window_Base._faceHeight;
	var sx = faceIndex % 4 * pw + (pw - pw) / 2;
	var sy = Math.floor(faceIndex / 4) * ph + (ph - ph) / 2;
    //this.refreshProperties();
    var value = this.getActorId();
	var act = $gameActors.actor(value);
	var face = act.faceName();
	this._oBitmap = ImageManager.loadFace(face);
	this.bitmap.blt(this._oBitmap, sx, sy, pw, ph, 0, 0, width, height);
};