AudioManager.playMe = function(me) {
    this.stopMe();
    if (me.name) {
        if (this._bgmBuffer && this._currentBgm) {
            if (SceneManager._scene instanceof Scene_Battle) {
                this._currentBgm.pos = this._bgmBuffer.seek();
                this._bgmBuffer.stop();
            } else {
                this._prevVol = this._currentBgm.volume;
                this._currentBgm.volume = this._prevVol * 0.4;
                this.updateBgmParameters(this._currentBgm);
            }
        }
        this._meBuffer = this.createBuffer('me', me.name);
        this.updateMeParameters(me);
        this._meBuffer.play(false);
        this._meBuffer.addStopListener(this.stopMe.bind(this));
    }
};

AudioManager.stopMe = function() {
    if (this._meBuffer) {
        this._meBuffer.stop();
        this._meBuffer = null;
        if (this._prevVol !== undefined) {
            if (this._currentBgm.volume !== this._prevVol) {
                this._currentBgm.volume = this._prevVol;
                this.updateBgmParameters(this._currentBgm);
                this._prevVol = undefined;
            }
        }
        if (this._bgmBuffer && this._currentBgm && !this._bgmBuffer.isPlaying()) {
            this._bgmBuffer.play(true, this._currentBgm.pos);
            this._bgmBuffer.fadeIn(this._replayFadeTime);
        }
    }
};