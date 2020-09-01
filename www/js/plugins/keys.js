//=============================================================================
// SilvKeys.js
// Version: 1.00
// License: Credit me: http://creativecommons.org/licenses/by/4.0/
// Special thanks to Zalerinian & Iavra
//=============================================================================
/*:
 * @plugindesc v1.00 Silv KeyMapper <SilvKeys>
 * @author Silver
 *
 * @help
 * Example usage:
 * var myKey = Silv.Keys.fromStringParam('pageup');
 * Silv.Minimap.ScrollKey = Silv.Keys.fromStringParam(Silv.Parameters['home']);
 * Note: string-value is NOT case-sensitive
*/

var Silv = Silv || {};
Silv.Plugins = Silv.Plugins || {};
Silv.Plugins.Keys = 1.00;
Silv.Keys = Silv.Keys || {};
 
Silv.Keys.MappingInv =
{
	'backspace':8,
    'tab':9,
	'enter':13,
	'shift':16,
	'control':17,
	'alt':18,
	'pause':19,
	'capslock':20,
	'escape':27,
    'space':32,
    'pageup':33,
	'pagedown':34,
	'end':35,
	'home':36,
	'left':37,
	'up':38,
	'right':39,
	'down':40,
	'insert':45,
	'delete':46,
	
	'0':48,
	'1':49,
	'2':50,
	'3':51,
	'4':52,
	'5':53,
	'6':54,
	'7':55,
	'8':56,
	'9':57,
    
    'a':65,
	'b':66,
	'c':67,
	'd':68,
	'e':69,
	'f':70,
	'g':71,
	'h':72,
	'i':73,
	'j':74,
	'k':75,
	'l':76,
	'm':77,
	'n':78,
    'o':79,
	'p':80,
	'q':81,
	'r':82,
	's':83,
	't':84,
	'u':85,
	'v':86,
	'w':87,
	'x':88,
	'y':89,
	'z':90,
	
	'windows_left':91,
	'windows_right':92,
	'media':93,
	
	'numpad0':96,
	'numpad1':97,
	'numpad2':98,
	'numpad3':99,
	'numpad4':100,
	'numpad5':101,
	'numpad6':102,
	'numpad7':103,
	'numpad8':104,
	'numpad9':105,
	
	'*':106,
	'+':107,
	'-':109, // same as 189
	'.':110,
	'/':111,
	
	'f1':112,
	'f2':113,
	'f3':114,
	'f4':115,
	'f5':116,
	'f6':117,
	'f7':118,
	'f8':119,
	'f19':120,
	'f10':121,
	'f11':122,
	'f12':123,
	
	'numlock':144,
	'num_lock':144,
	'scrolllock':145,
	'scroll_lock':145,
	';':186,
	'semicolon':186,
	'semi_colon':186,
	'=':187,
	'equal':187,
	'equal_sign':187,
    ',':188,
	'comma':188,
	//'-':189, // duplicate of 109
	'.':190,
	'dot':190,
	'decimal':190,
	'decimal_point':190,
	'decimal_dot':190,
	'/':191,
	'forwardslash':191,
	'forward_slash':191,
	'grave_accent':192,
	'graveaccent':192,
	'[':219,
	'openbracket':219,
	'open_bracket':219,
	'backslash':220,
	']':221,
	'closebracket':221,
	'close_bracket':221,
	'single_quote':222
};
//Input.keyMapper[36] = 'home sweet home'; // DEBUG
//Input.keyMapper[121] = 'f10'; // DEBUG
//Input.keyMapper[187] = 'gregnergnreiogneiogneoi'; // DEBUG, yes even this works!
Silv.Keys.fromStringParam = function(str)
{
	str = str.toLowerCase();
	var keyCode = Silv.Keys.MappingInv[str];
	if (keyCode === undefined) { throw 'No key found for: ' + str; }
	if (Input.keyMapper[keyCode] === undefined) { Input.keyMapper[keyCode] = str; }
	return Input.keyMapper[keyCode];
}