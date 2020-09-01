//=============================================================================
// Require Yanfly.Param.ItemSceneItem
//=============================================================================

if (Yanfly.Param.ItemSceneItem) {

//=============================================================================
// Window_ShopInfo
//=============================================================================

Yanfly.IPI.Window_ShopInfo_drawItemIcon =
  Window_ShopInfo.prototype.drawItemIcon;
Window_ShopInfo.prototype.drawItemIcon = function() {
  if (this.itemHasPictureImage()) {
    this.readyItemPictureImage(this._item);
  } else {
    Yanfly.IPI.Window_ShopInfo_drawItemIcon.call(this);
  }
};

Window_ShopInfo.prototype.itemHasPictureImage = function() {
  if (!this._item) return false;
  var filename = ItemManager.getItemPictureImageFilename(this._item);
  return filename !== '';
};

Window_ShopInfo.prototype.readyItemPictureImage = function(item) {
  if (item !== this._item) return;
  var bitmap = ItemManager.getItemPictureImage(item);
  if (bitmap.width <= 0) {
    return setTimeout(this.readyItemPictureImage.bind(this, item), 250);
  } else {
    this.drawItemPictureImage(bitmap);
  }
};

Window_ShopInfo.prototype.drawItemPictureImage = function(bitmap) {
  var pw = bitmap.width;
  var ph = bitmap.height;
  var sx = 0;
  var sy = 0;
  var dw = pw;
  var dh = ph;
  if (dw > Yanfly.Param.ItemImageMaxWidth) {
    var rate = Yanfly.Param.ItemImageMaxWidth / dw;
    dw = Math.floor(dw * rate);
    dh = Math.floor(dh * rate);
  }
  if (dh > Yanfly.Param.ItemImageMaxHeight) {
    var rate = Yanfly.Param.ItemImageMaxHeight / dh;
    dw = Math.floor(dw * rate);
    dh = Math.floor(dh * rate);
  }
  var dx = (Window_Base._faceWidth - dw) / 2;
  var dy = (Window_Base._faceHeight - dh) / 2;
  this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
};

}; // Yanfly.Param.ItemSceneItem