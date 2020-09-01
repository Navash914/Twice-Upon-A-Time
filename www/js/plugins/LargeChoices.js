// =============================================================================
// Large Choices
// =============================================================================
/*:
@plugindesc Combines multiple show choice commands into a single, large list.
@author Hime
@date Oct 23, 2015
@help 
== Description ==

By default, RPG Maker only provides you with 6 choices when you create
Show Choice commands.

This script allows you to display more than 6 choices by combining multiple
Show Choice commands into a single, large list.

In order to properly set up the choice settings such as the default choice or
the cancel choice, please read the Usage section for more information.

If you want to have two or more, separate choices, please insert a comment in
between so they aren't merged together.
 
== Usage == 

-- Combining Choices --

To combine choices, start by creating a Show Choice command and fill in your
options. To add more choices, create another Show Choice command and fill
in your options. The game will automatically combine them for you.

-- Custom Default Choice --

The default choice is relative to the choice command that the choice
belongs to.

Suppose you have 8 choices as follows, split across two choice commands:

Show Choices #1
  Choice 1
  Choice 2
  Choice 3
  Choice 4
  Choice 5
  Choice 6
Show Choices #2
  Choice 7
  Choice 8
  
And you wanted to set Choice 7 as the default choice. That is, when you
run this event, choice 7 will be highlighted by default. 

In order to accomplish this, set the default choice for the second set of
choices to "Choice 2", and set the first set to "None". The engine will
automatically update the default choice, so you need to make sure it
selects the right one.

-- Custom Cancel Choice --

Having a custom cancel choice is similar to default choices: select the
appropriate choice, and then make sure all other choices are disallowed.

If you need to use a "cancel branch", make sure that only the last set
of choices has that option, and previous cancel choices are disallowed.
 */ 
 
// =============================================================================
// Rest of Script
// =============================================================================
(function() {
  var _TH_Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
  Game_Interpreter.prototype.setupChoices = function(params) {  
    params = this.combineChoices()
    _TH_Game_Interpreter_setupChoices.call(this, params)      
  };

  Game_Interpreter.prototype.combineChoices = function(params) {  
    /* IMPORTANT If we don't clone this, we will modify the event permanently */
    this._list = JSON.parse(JSON.stringify(this._list))
    var currIndex = this._index
    var numChoices = 0;
    var firstCmd = this._list[this._index];
    this._index++;
    while (this._index < this._list.length) {
      var cmd = this._list[this._index]
      if (cmd.indent === this._indent)
      
        /* Reached "End Choices" command. See if next command is "Show Choices" */
        if (cmd.code === 404 && this._list[this._index+1].code !== 102) {
          break
        }
        else if (cmd.code === 102) {

          /* Update cancel choice.
           * -2 is "cancel"
           * -1 is "disallow"
           * 0 to 5 are zero-indexed choices
           */
          var cancelType = cmd.parameters[1]
          if (cancelType > 0) {
            firstCmd.parameters[1] = cancelType + numChoices
          }
          else if (cancelType === -2) {
            firstCmd.parameters[1] = cancelType;            
          }
          
          /* Update default choice */
          var defaultType = cmd.parameters[2]
          if (defaultType > 0) {
            firstCmd.parameters[2] = defaultType + numChoices;
          }
          
          /* Add all of the parameters to the current command */
          var options = cmd.parameters[0];                    
          for (var i = 0; i < options.length; i++) {
            firstCmd.parameters[0].push(options[i]);
          }    
          
          /* Delete the "end choice" and "show choice" commands */
          this._list.splice(this._index - 1, 2)
          this._index -= 2;
        }
        
        /* Update the branch number */
        else if (cmd.code === 402) {          
          cmd.parameters[0] = numChoices;
          numChoices++;
        }
        this._index++;
      }
    /* Go back to where we left off */
    this._index = currIndex;    
    
    /* Return the new parameters for the first choice command */
    return firstCmd.parameters;
  }  
}());