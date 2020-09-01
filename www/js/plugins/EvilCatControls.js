//=============================================================================
// EvilCatControls.js
//=============================================================================

/*:
 * @plugindesc Adds keyboard and other control functionality to EvilCat Utils.
 * @author EvilCat
 * @email soevilcat@mail.ru
 * @version 1.0
 
 * @help
 * This plugins is intended to ease some of scripting needs.
 * Please refer to code comments.
 * Creative Commons 3.0 Attribution license
 */

"use strict";

if (!EvilCat) throw new Error('Requires EvilCat Utils plugin!');
{
	let Controls = EvilCat.Controls = class Controls extends EvilCat.Plugin
	{
	}
	Controls = EvilCat.Controls = new Controls();
	
	EvilCat.parsers.Key=function(param)
	{
		if (param instanceof Key) return param;
		return Key.parse(param);
	}
	
	EvilCat.parsers.Keys=function(param)
	{
		if (param instanceof Keys) return param;
		return Keys.parse(param);
	}
	
	let Key = EvilCat.Key = class Key
	{
		constructor(code)
		{
			this.code=code;
		}
		
		recognize(event) // recognizes the key in JavaScript event
		{
			return false;
			// overload me!
		}
		
		static parse(code)
		{
			return KeyCode.parse(code);	// only one method yet
		}
	}
	
	// corresponds with keycode as interpreted by JavaScript; as such, both Ctrls are the same key, but numpad buttons are different acording to Num Lock.
	let KeyCode = EvilCat.KeyCode = class KeyCode extends Key
	{
		constructor(code) { super(code); }
		
		recognize(event)
		{
			return event.keyCode && event.keyCode===this.code;
		}
		
		static parse(code)
		{
			if (code instanceof KeyCode) return code;
			if (typeof code !== 'string') throw new Error('bad key code');
			code=code.toLowerCase().replace(/[ _]/g, '');
			for (var key in KeyCode.codes)
			{
				if (KeyCode.codes[key].some(function(syn, index)
				{
					return index>0 && code===syn;
				})) return new KeyCode(KeyCode.codes[key][0]);
			}
			throw new Error('unknown key');
		}
	}
	
	KeyCode.codes=
	{
		BACKSPACE:	[8,	'backspace', 'bspace'],
		TAB:		[9, 'tab'],
		ENTER:		[13, 'enter', 'return'],
		SHIFT:		[16, 'shift'],
		CTRL:		[17, 'ctrl'],
		ALT:		[18, 'alt'],
		PAUSE_BREAK: [19, 'pause', 'break', 'pause/break'],
		CAPS_LOCK:	[20, 'capslock', 'caps'],
		ESCAPE:		[27, 'escape', 'esc'],
		PAGEUP:		[33, 'pgup', 'pageup'],
		PAGEDOWN:	[34, 'pgdown', 'pagedown'],
		END:		[35, 'end'],
		HOME:		[36, 'home'],
		LEFT:		[37, 'left', 'leftarrow'],
		UP:			[38, 'up', 'uparrow'],
		RIGHT:		[39, 'right', 'rightarrow'],
		DOWN:		[40, 'down', 'downarrow'],
		INSERT:		[45, 'insert', 'ins'],
		DELETE:		[46, 'delete', 'del'],
		0:			[48, '0'],
		1:			[49, '1'],
		2:			[50, '2'],
		3:			[51, '3'],
		4:			[52, '4'],
		5:			[53, '5'],
		6:			[54, '6'],
		7:			[55, '7'],
		8:			[56, '8'],
		9:			[57, '9'],
		A:			[65, 'a'],
		B:			[66, 'b'],
		C:			[67, 'c'],
		D:			[68, 'd'],
		E:			[69, 'e'],
		F:			[70, 'f'],
		G:			[71, 'g'],
		H:			[72, 'h'],
		I:			[73, 'i'],
		J:			[74, 'j'],
		K:			[75, 'k'],
		L:			[76, 'l'],
		M:			[77, 'm'],
		N:			[78, 'n'],
		O:			[79, 'o'],
		P:			[80, 'p'],
		Q:			[81, 'q'],
		R:			[82, 'r'],
		S:			[83, 's'],
		T:			[84, 't'],
		U:			[85, 'u'],
		V:			[86, 'v'],
		W:			[87, 'w'],
		X:			[88, 'x'],
		Y:			[89, 'y'],
		Z:			[90, 'z'],
		WIN:		[91, 'win', 'windows', 'winleft', 'windowsleft', 'leftwin', 'leftwindows'],
		MENU:		[92, 'menu', 'winmenu', 'windowsmenu', 'winright', 'windowsright', 'rightwin', 'rightwindows'],
		NUM_0:		[96, 'num0'],
		NUM_1:		[97, 'num1'],
		NUM_2:		[98, 'num2'],
		NUM_3:		[99, 'num3'],
		NUM_4:		[100, 'num4'],
		NUM_5:		[101, 'num5'],
		NUM_6:		[102, 'num6'],
		NUM_7:		[103, 'num7'],
		NUM_8:		[104, 'num8'],
		NUM_9:		[105, 'num9'],
		MULTIPLY:	[106, 'multiply', 'mult', '*'],						// numpad
		ADD:		[107, 'add', 'plus', '+'],							// numpad
		SUBSTRACT:	[109, 'minus', 'substract', 'sub'],					// numpad
		DECIMAL_POINT:	[110, 'numpoint', 'numpt', 'decimal', 'dec'],	// numpad
		DIVIDE:		[111, 'div', 'backslash', 'backwardslash'],			// numpad
		F1:			[112, 'f1', 'help'],
		F2:			[113, 'f2'],
		F3:			[114, 'f3'],
		F4:			[115, 'f4'],
		F5:			[116, 'f5'],
		F6:			[117, 'f6'],
		F7:			[118, 'f7'],
		F8:			[119, 'f8'],
		F9:			[120, 'f9'],
		F10:		[121, 'f10'],
		F11:		[122, 'f11'],
		F12:		[123, 'f12'],
		NUM_LOCK:	[144, 'numlock', 'num'],
		SCROLL_LOCK: [145, 'scrolllock', 'scroll'],
		SEMI_COLON:	[186, 'semicolon', ';'],
		EQUAL:		[187, 'equals', 'equal', '='],
		COMMA:		[188, 'comma', ','],
		DASH:		[189, 'dash', '-'],
		PERIOD:		[190, 'period', '.'],
		FORWARD_SLASH:	[191, 'forwardslash', '/'],
		GRAVE_ACCENT:	[192, 'graveaccent', '`'],
		OPEN_BRACKET:	[219, 'openbracket', '['],
		BACKSLASH:		[220, 'backslash', '\\'],
		CLOSE_BRACKET:	[221, 'closebracket', ']'],
		SINGLE_QUOTE:	[222, 'quote', 'singlequote', '\'']
	}
	
	let Keys = EvilCat.Keys = class Keys extends Key
	{
		constructor(keys)
		{
			this.keys=Keys.keys_from_codes(keys);
		}
		
		static parse(code)
		{
			if (typeof code === 'string') code=code.trim().split(/\s*,\s*/);
			else if (! code instanceof Array) code=[code];
			return new Keys(code);
		}
		
		static keys_from_codes(codes)
		{
			return codes.map(function(subcode)
			{
				if (subcode instanceof Key) return subcode;
				return Key.parse(subcode);
			});
		}
		
		recognize(event)
		{
			return this.keys.some(function(key) { return key.recognize(event); });
		}
	}
}