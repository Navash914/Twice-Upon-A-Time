/*:
-------------------------------------------------------------------------
@title Timer Pause
@author Hime --> HimeWorks (http://himeworks.com)
@date Nov 18, 2015
@filename HIME_TimerPause.js
@url http://himeworks.com/2015/11/timer-pause/

If you enjoy my work, consider supporting me on Patreon!

https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------
@plugindesc Allows you to pause and resume the timer. When the timer is
paused, it will remain on the screen but it won't count down.
@help 
-------------------------------------------------------------------------
== Description ==

Do you need your timer to temporarily stop counting down, but you still
want it to show up on the screen?

This plugin provides you with two script calls that will allow you to
easily pause and resume the game timer!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 18, 2015 -  initial release

== Usage ==

To pause the timer, use the script call

  $gameTimer.pause();
  
To resume the timer, use the script call

  $gameTimer.resume();
  
Note that this can be used on any Game_Timer object.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TimerPause = 1;
TH.TimerPause = TH.TimerPause || {};

(function ($) {
  var TH_TimerPause_GameTimer_initialize = Game_Timer.prototype.initialize;
  Game_Timer.prototype.initialize = function() {
    TH_TimerPause_GameTimer_initialize.call(this);
    this._paused = false;
  };
  
  var TH_TimerPause_GameTimer_update = Game_Timer.prototype.update;
  Game_Timer.prototype.update = function(sceneActive) {
    if (this._paused) {
      return;
    }
    TH_TimerPause_GameTimer_update.call(this, sceneActive);
  };
  
  Game_Timer.prototype.isPaused = function() {
    return this._paused;
  };

  Game_Timer.prototype.pause = function() {
    this._paused = true;
  };
  
  Game_Timer.prototype.resume = function() {
    this._paused = false;
  };
})(TH.TimerPause);