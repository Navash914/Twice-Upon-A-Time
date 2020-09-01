/*:
* @plugindesc​ Automatically pauses dialogue at punctuation marks.
* @author mjshi
*
* @help 
* ------------------------------------------------------------------------------
*   Autopause at Punctuation v1.0 by mjshi
*   Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
*   Installation: Place below any message-box-related plugins.
* ------------------------------------------------------------------------------
*  You know, I bet your eyes paused for a moment at the comma in this sentence.
*  And I bet you paused, too (but longer) at that period in the sentence above.
*  What this script does is pause dialogue briefly at certain punctuation marks,
*  mimicking natural speech.
* ------------------------------------------------------------------------------
*   Currently supported punctuation:
*   [Pauses for 1/4 second] , - :
*   [Pauses for 1/2 second] . ? ! ~ ... ;
*
*   This script also pauses for 1/2 second whenever there is valid punctuation
*   followed by a " or ) or ' character.
*   For example: (this would pause.) "this too:" 'and this-' (this would not)
*   [Valid punctuation] , - : . ? ! ~ ;
* ------------------------------------------------------------------------------
*
* > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
*   try my best to help you!
*/

var _autopause_at_punctuation_window_base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\. /g, ".\\.\\. ");
    text = text.replace(/\.\.\.\\\.\\\. /g, "...\\.\\. ");
    
    text = text.replace(/([.?!~;,-:])" /g, "$&\\.\\. ");
    text = text.replace(/([.?!~;,-:])' /g, "$&\\.\\. ");
    text = text.replace(/([.?!~;,-:])\) /g, "$&\\.\\. ");
    text = text.replace(/- /g, "-\\. ");
    text = text.replace(/, /g, ",\\. ");
    text = text.replace(/: /g, ":\\. ");
    text = text.replace(/\? /g, "?\\.\\. ");
    text = text.replace(/! /g, "!\\.\\. ");
    text = text.replace(/; /g, ";\\.\\. ");
    text = text.replace(/~ /g, "~\\.\\. ");
    
    //handle newlines
    text = text.replace(/\.\n(?!$)/g, ".\\.\\.\n");
    text = text.replace(/\.\.\.\\\.\\\.\n(?!$)/g, "...\\.\\.\n");
    
    text = text.replace(/([.?!~;,-:])"\n(?!$)/g, "$&\\.\\.");
    text = text.replace(/([.?!~;,-:])'\n(?!$)/g, "$&\\.\\.");
    text = text.replace(/([.?!~;,-:])\)\n(?!$)/g, "$&\\.\\.");
    text = text.replace(/-\n(?!$)/g, "-\\.\n");
    text = text.replace(/,\n(?!$)/g, ",\\.\n");
    text = text.replace(/:\n(?!$)/g, ":\\.\n");
    text = text.replace(/\?\n(?!$)/g, "?\\.\\.\n");
    text = text.replace(/!\n(?!$)/g, "!\\.\\.\n");
    text = text.replace(/;\n(?!$)/g, ";\\.\\.\n");
    text = text.replace(/~\n(?!$)/g, "~\\.\\.\n");

    text = _autopause_at_punctuation_window_base_convertEscapeCharacters.call(this, text);
    return text;
};