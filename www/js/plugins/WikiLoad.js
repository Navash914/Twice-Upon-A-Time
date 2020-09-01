//=============================================================================
// WikiLoad.js
//=============================================================================

/*:
 * @plugindesc Loads data from MediaWiki.
 * @author EvilCat
 * @email soevilcat@mail.ru
 * @version 0.1
 
 * @param Base URL
 * @desc MediaWiki instance with game data
 * @default http://maker.rpgverse.ru/w/
 
 * @help
 * WIP
 * Creative Commons 3.0 Attribution license
 */

"use strict";

if (!EvilCat || !EvilCat.WebLoad) throw new Error('requried modules not present!');

{	
	let WikiLoad=class WikiLoad extends EvilCat.WebLoad.constructor
	{
		makeUrl(filename)
		{
			return this.paramString('Base URL')+'index.php?action=raw&maxage=300&title=JSON:'+this.wikiEncode(filename);
		}
		
		wikiEncode(title)
		{
			return encodeURIComponent(title.replace(' ', '_'));
		}
	}
	WikiLoad=EvilCat.WikiLoad=new WikiLoad();
}