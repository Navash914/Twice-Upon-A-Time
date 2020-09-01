/*:

 PH - Video Title
 @plugindesc This plugin allows you to put a video at the background of the Title Screen instead of a static image.
 @author PrimeHover
 @version 1.0
 @date 11/02/2015

 ---------------------------------------------------------------------------------------
 This work is licensed under the Creative Commons Attribution 4.0 International License.
 To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/
 ---------------------------------------------------------------------------------------

 @param Video Name
 @desc Name and extension of the video (See Help Section) | (E.g. "myVideo.webm")

 @param Video Muted
 @desc Mutes the video in the title (0: No, 1: Yes)
 @default 0

 @param Video Loop
 @desc Makes the video plays in a loop (0: No, 1: Yes)
 @default 1

 @param Video Poster Name
 @desc Name and extension of the image to be shown when the video is loading (E.g. "poster.png")

 @param Video Width
 @desc Width of the video in the canvas (Default: 816)
 @default 816

 @param Video Height
 @desc Height of the video in the canvas (Default: 624)
 @default 624

 @param Video Coord X
 @desc Coordinate X of the video in the canvas (Default: 0)
 @default 0

 @param Video Coord Y
 @desc Coordinate Y of the video in the canvas (Default: 0)
 @default 0

 @help

 The video you want to play in background must be inside the "movies" folder in your project.
 Supported extensions: "webm" and "mp4" ("webm" is more recommended once it is the new standard for HTML5; "mp4" extensions may not work in some computers).

 The poster you want to show while the video is not ready must be inside the "pictures" folder in your project.

 */

(function() {

    /* Getting the parameters */
    var parameters = PluginManager.parameters('PH_VideoTitle');
    var videoName = String(parameters['Video Name']);
    var posterName = String(parameters['Video Poster Name']);
    var videoMuted = Number(parameters['Video Muted']);
    var videoLoop = Number(parameters['Video Loop']);
    var videoWidth = Number(parameters['Video Width']);
    var videoHeight = Number(parameters['Video Height']);
    var videoX = Number(parameters['Video Coord X']);
    var videoY = Number(parameters['Video Coord Y']);

    /* Video Title Class */
    var PH_VideoTitle = null;

    function VideoTitle() {
        this.name = videoName;
        this.posterName = posterName;

        /* Creating video tag */
        this._video = document.createElement('video');
        this._video.id = 'VideoTitle_' + this.name.replace(/[^A-Z0-9]+/ig, "_");
        this._video.src = 'movies/' + this.name;
        this._video.style.width = 0;
        this._video.style.height = 0;
        this._video.autoPlay = false;

        /* Control Options */
        this.setControlOptions();

        /* Appending the video at the body tag */
        document.body.appendChild(this._video);

        /* Starts video and creates the texture */
        this.setVideoTexture();
    }
    VideoTitle.prototype.constructor = VideoTitle;

    VideoTitle.prototype.setControlOptions = function() {
        if (videoLoop == 1) {
            this._video.loop = true;
        } else {
            this._video.loop = false;
        }

        if (videoMuted == 1) {
            this._video.muted = true;
        } else {
            this._video.muted = false;
        }

        if (posterName.trim() != '') {
            this._video.poster = 'img/pictures/' + this.posterName;
        }
    };

    VideoTitle.prototype.setVideoTexture = function() {
        this._texture = PIXI.VideoTexture.textureFromVideo(this._video);
        this._spriteVideo = new PIXI.Sprite(this._texture);
        this._spriteVideo.width = videoWidth;
        this._spriteVideo.height = videoHeight;
        this._spriteVideo.x = videoX;
        this._spriteVideo.y = videoY;
    };

    VideoTitle.prototype.pauseVideo = function() {
        this._video.pause();
    };

    VideoTitle.prototype.playVideo = function() {
        this._video.play();
    };


    /* Overwritten Scene_Title methods */
    Scene_Title.prototype.create = function() {

        /* Prevent the video to be duplicated */
        if (PH_VideoTitle === null) {
            PH_VideoTitle = new VideoTitle();
        }
        this.videoTitle = PH_VideoTitle;
        this.videoTitle.playVideo();
        this.addChild(this.videoTitle._spriteVideo);
        this.createForeground();
        this.createWindowLayer();
        this.createCommandWindow();
    };

    Scene_Title.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        SceneManager.clearStack();
        if (videoMuted == 1) {
            this.playTitleMusic();
        }
        this.startFadeIn(this.fadeSpeed(), false);
    };

    Scene_Title.prototype.terminate = function() {
        Scene_Base.prototype.terminate.call(this);
        this.videoTitle.pauseVideo();
        SceneManager.snapForBackground();
    };

})();
