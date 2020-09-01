//=============================================================================
// WebLoad.js
//=============================================================================

/*:
 * @plugindesc Loads data from web.
 * @author EvilCat
 * @email soevilcat@mail.ru
 * @version 0.1
 
 * @param Base URL
 * @desc Web folder with game data
 * @default http://pokeliga.com/test/
 
 * @help
 * Use Plugin Command:
 * WebLoad loadEvent <filename>
 * ('.json' extension added automatically)
 * Creative Commons 3.0 Attribution license
 */

"use strict";

if (!EvilCat) throw new Error('Requires EvilCat Utils plugin!');

{
	let WebLoad=class WebLoad extends EvilCat.Plugin
	{
		constructor()
		{
			super();
			this._loadingEvents={};
		}
		
		makeCommandsList() { this.validCommands=['loadEvent']; }
		
		loadFile(filename, callback, error_callback)
		{
			var xhr = new XMLHttpRequest();
			var url = this.makeUrl(filename);
			xhr.open('GET', url);
			xhr.overrideMimeType('application/json');
			xhr.onload = function()
			{
				if (xhr.status < 400) callback(JSON.parse(xhr.responseText));
				else if (error_callback) error_callback();
			};
			xhr.send();
		}
		makeUrl(filename)
		{
			return this.paramString('Base URL')+filename+'.json';
		}
		
		loadEvent(target, filename)
		{
			if (this.isEventLoading(target)) return;
			this.eventIsLoading(target);
			this.loadFile(filename, (function(json)
				{
					this.clearEventLoading(target);
					json.id=target.eventId();
					var x=target.x, y=target.y;
					target.event=function() { return json; }
					target.initMembers();
					target.locate(x, y);
					target.refresh();
				}).bind(this),
				function() { throw new Error('Can\'t load event!'); }
			);
		}
		isEventLoading(event)		{ return this._loadingEvents[event.eventId()];		}
		eventIsLoading(event)		{ return this._loadingEvents[event.eventId()]=true;	}
		clearEventLoading(event)	{ delete this._loadingEvents[event.eventId()];		}
	};
	WebLoad=EvilCat.WebLoad=new WebLoad();

}