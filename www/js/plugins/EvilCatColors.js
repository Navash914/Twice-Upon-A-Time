//=============================================================================
// EvilCatColors.js
//=============================================================================

/*:
 * @plugindesc Adds color functionality to EvilCat Utils.
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

	EvilCat.parsers.Color=function Color(param)
	{
		if (param instanceof EvilCat.Color) return param;
		return EvilCat.Color.parse(param);
	}
	// apply with <Plugin_class>.extendType('Color');
	
	// A simple class to handle color transformations.
	let Color=EvilCat.Color=class Color
	{
		constructor(r, g, b)
		{
			this.r=Math.floor(r);
			this.g=Math.floor(g);
			this.b=Math.floor(b);
		}
		
		// accepts string values: #FFF, #FFEEGG, rgb(x, y, z), CSS color code; and [r, g, b] array.
		static parse(value, recursive)
		{
			if (value instanceof Color)  return value;
			if (value instanceof Array)  return new Color(value[0], value[1], value[2]);
			if (EvilCat.isNumber(value)) return Color.createFromHex(Number(value));
			
			value=value.toLowerCase().trim();
			
			if (/^#([\da-f]{3})$/.exec(value)) return new Color (parseInt(value[1].repeat(2), 16), parseInt(value[2].repeat(2), 16), parseInt(value[3].repeat(2), 16));
			
			if (/^#([\da-f]{6})$/.exec(value)) return new Color(parseInt(value.substr(1, 2), 16), parseInt(value.substr(3, 2), 16), parseInt(value.substr(5, 2), 16));
			
			var matches=/^rgb\s*\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\s*\)$/.exec(value);
			if (matches) return new Color(Number(matches[1]), Number(matches[2]), Number(matches[3]));
			
			if (recursive) throw new Error('Unknown color: '+value);
			
			var div=document.createElement('div');
			div.style.color=value;
			document.body.appendChild(div);
			var color=window.getComputedStyle(div).color;
			color=Color.parse(color, true);
			color.name=value;
			document.body.removeChild(div);
			return color;
		}
		
		static createFromHex(hex)
		{
			return new Color(
				Math.floor(hex/0x10000),
				Math.floor(hex/0x100) % 0x100,
				hex % 0x100
			);
		}

		mergeWithColor(other_color, value)
		{
			other_color=this.constructor.parse(other_color);
			return new Color(
				this.r+(other_color.r-this.r)*value,
				this.g+(other_color.g-this.g)*value,
				this.b+(other_color.b-this.b)*value
			);
		}
		
		mergeWithWhite(value) { return this.mergeWithColor(Color.WHITE, value); }
		
		toHex()
		{
			return this.r*0x10000+this.g*0x100+this.b;
		}
		
		toCSS()
		{
			if (this.name) return this.name;
			var str=this.toHex().toString(16);
			if (str.length<6) str='0'.repeat(6-str.length)+str;
			return '#'+str;
		}
		
		toArray()
		{
			return [this.r, this.g, this.b];
		}
	}
	
	Color.WHITE=new Color(255, 255, 255);
}