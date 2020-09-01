/*:
-------------------------------------------------------------------------
@title Random Repeats
@author Hime
@date Nov 5, 2015
-------------------------------------------------------------------------
@plugindesc Allows you to have skills or items repeat a random number
of times
@help 
-------------------------------------------------------------------------
== Description ==

By default, RPG Maker allows you to have skills or items repeat a
certain amount of times when you use them. For example, if you want
an attack to always hit two times, you would set the "repeat"
field to 2.

However, what if you wanted to create a skill or item that will
repeat a random number of times between a given range?

This plugin gives you the ability to do just that quickly and easily!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 5, 2015 -  initial release

== Usage ==

Note-tag skills or items with

   <random repeats: min max>
   
Where the min is the minimum number of times the skill will
repeat, and the max is the maximum number of times the skill
will repeat.

A random number is generated from this range.

For example, if you want a skill to repeat between 0 and 5 times,
you can note-tag the skill with

   <random repeats: 0 5>
   
For advanced users, you can edit the plugin to customize the way
the random number is generated. Currently it uses a very simple
non-uniform distribution dependent on javascript's random function.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} 
var TH = TH || {};
Imported.RandomRepeats = 1;
TH.RandomRepeats = TH.RandomRepeats || {};

(function ($) {

  $.Regex = /<random[-_ ]repeats:\s+(\d+)\s+(\d+)>/i

  $.readNotetagRandomRepeats = function(item) {
    item.minRandomRepeats = item.repeats;
    item.maxRandomRepeats = item.repeats;
    var res = $.Regex.exec(item.note)    
    if (res) {
      item.minRandomRepeats = Math.floor(res[1]);
      item.maxRandomRepeats = Math.floor(res[2]);
    }    
  };
  
  /* Returns a random repeat amount generated
     from the skill's random repeat range */
  $.randomRepeats = function(item) {
    if (item.maxRandomRepeats === undefined) {
      $.readNotetagRandomRepeats(item);
    }
    return $.generateRandomRepeat(item);
  }
  
  /* Generates a random number from the given interval.
     You can customize the algorithm used to generate a
     random number if needed */
  $.generateRandomRepeat = function(item) {
    var min = item.minRandomRepeats;
    var max = item.maxRandomRepeats
    if (min === max) {
      return min;
    }
    else {
      // Maybe you can customize this
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }

  /* Overwrite. Use a range rather than a static value */
  Game_Action.prototype.numRepeats = function() {
    var repeats = $.randomRepeats(this.item());
    console.log(repeats)
    if (this.isAttack()) {
        repeats += this.subject().attackTimesAdd();
    }
    return Math.floor(repeats);
  };
  
})(TH.RandomRepeats);