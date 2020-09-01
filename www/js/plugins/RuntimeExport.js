//=============================================================================
// RuntimeExport.js
//=============================================================================

/*:
 * @plugindesc Allows to export specific events while the game is running.
 * @author EvilCat
 * @email soevilcat@mail.ru
 * @version 1.0.1
 
 * @param All Events Key
 * @desc Show JSON for all current events. Refer to http://keycode.info/.
 * @default 123
 
 * @param Target by MMB
 * @desc Turn on to spy on event by Middle Mouse Button
 * @default on
 
 * @help
 * Use Middle Mouse Button to click event and get its JSON.
 * Use F12 to view all current events' JSON.
 * Creative Commons 3.0 Attribution license
 */

"use strict";

if (!EvilCat) throw new Error('Requires EvilCat Utils plugin!');

{
	var RuntimeExport=class RuntimeExport extends EvilCat.Plugin
	{
		showAllEvents()
		{
			if (SceneManager._scene instanceof Scene_Export) SceneManager.pop();
			else SceneManager.push(Scene_Export);
		}
		
		handleMMB(mouseEvent)
		{
			if (!this.paramBool('Target by MMB', true)) return;
			if (SceneManager._scene instanceof Scene_Export)
			{
				SceneManager.pop();
				return true;
			}
			if (!(SceneManager._scene instanceof Scene_Map)) return;
			
			var x = Graphics.pageToCanvasX(mouseEvent.pageX);
			var y = Graphics.pageToCanvasY(mouseEvent.pageY);
			x = $gameMap.canvasToMapX(x);
			y = $gameMap.canvasToMapY(y);
			
			var gameEvent=$gameMap.nearestEvent(x, y);
			if (gameEvent)
			{
				SceneManager.push(Scene_Export.bind(undefined, gameEvent));
				return true;
			}
		}
	}
	RuntimeExport=EvilCat.RuntimeExport=new RuntimeExport();
	
	let oldTouchMMB=TouchInput._onMiddleButtonDown;
	TouchInput._onMiddleButtonDown = function(event)
	{
		if (!RuntimeExport.handleMMB(event)) oldTouchMMB.apply(this, arguments);
	};
	
	let _SM_onKeyDown=SceneManager.onKeyDown;
	SceneManager.onKeyDown = function(event)
	{
		_SM_onKeyDown.apply(this, arguments);
		
		if (!event.ctrlKey && ! event.altKey && event.keyCode===RuntimeExport.ALL_EVENTS_KEY) RuntimeExport.showAllEvents();
	}
	
	RuntimeExport.F12=123;
	RuntimeExport.ALL_EVENTS_KEY=RuntimeExport.paramInt('All Events Key', RuntimeExport.F12);
	
	let Window_ExportCommand=class Window_ExportCommand extends Window_HorzCommand
	{
		constructor(x, y) { super(x, y); }
		
		windowWidth()		{ return Graphics.boxWidth; };
		numVisibleRows()	{ return 1; }
		maxCols()			{ return 4; }
		
		initialize()
		{
			Window_HorzCommand.prototype.initialize.apply(this, arguments);
			this.lastIndex=null;
		}
		
		makeCommandList()
		{
			this.addCommand('Prev', 'Prev');
			this.addCommand('Copy', 'Copy');
			this.addCommand('Copy All', 'Copy All');
			this.addCommand('Next', 'Next');
		}
		
		update()
		{
			this._okHandled=false;
			Window_HorzCommand.prototype.update.apply(this, arguments);
			if ( !this._okHandled && this.lastIndex!==null && this.lastIndex!==this.index()) this.callOkHandler();
			this.lastIndex=this.index();
		}
		
		callOkHandler()
		{
			this._okHandled=true;
			Window_HorzCommand.prototype.callOkHandler.apply(this, arguments);
			this.activate();
		}
	}
	
	let Sprite_DummyCharacter=class Sprite_DummyCharacter extends Sprite_Character
	{
		constructor(character, x, y)
		{
			super(character);
			this.x=x;
			this.y=y;
		}
		
		updatePosition() { } // doesn't move
	}
	
	let Scene_Export=class Scene_Export extends Scene_MenuBase
	{
		constructor(event)
		{
			super();
			if (event) this.event=event;
		}
		
		create()
		{
			Scene_MenuBase.prototype.create.apply(this, arguments);
			this.setBackgroundOpacity(100);
			this._commandWindow = new Window_ExportCommand(0, 0);
			this._commandWindow.setHandler('Prev',  this.commandPrev.bind(this));
			this._commandWindow.setHandler('Next',  this.commandNext.bind(this));
			this._commandWindow.setHandler('Copy',  this.commandCopy.bind(this));
			this._commandWindow.setHandler('Copy All',  this.commandCopyAll.bind(this));
			this.addWindow(this._commandWindow);
			
			this.event_div=document.createElement('div');
			this.event_div.className='json';
			this.event_div.style.cssText='width:400px; top: 80px; max-height:480px; left:20px; position:absolute; background-color:white; z-index:50; overflow:scroll; padding:4px; white-space:pre';
			this.fill(this.event || this.firstEvent());
			document.body.appendChild(this.event_div);
			
			this.css=document.createElement('style');
			this.css.innerHTML='\
				div.json {\
					margin: 5px;\
					outline: 1px solid #ccc;\
					padding: 5px;\
				}\
				.json .string {\
					color: green;\
				}\
				.json .number {\
					color: darkorange;\
				}\
				.json .boolean {\
					color: blue;\
				}\
				.json .null {\
					color: magenta;\
				}\
				.json .key {\
					color: red;\
				}';
			document.body.appendChild(this.css);
		}
		
		start()
		{
			this._playCursor=SoundManager.playCursor;
			this._playOk=SoundManager.playOk;
			var sfx=AudioManager.playSe.bind(AudioManager, {name: 'Cursor1', volume: 90, pitch: 100, pan: 0});
			SoundManager.playCursor=sfx;
			SoundManager.playOk=sfx;
			
			document.body.style.userSelect = '';
			document.body.style.webkitUserSelect = '';
			document.body.style.msUserSelect = '';
			document.body.style.mozUserSelect = '';
			
			Scene_MenuBase.prototype.start.apply(this, arguments);
		}
		
		stringify(obj)
		{
			if (obj===undefined) obj=this.event.event();
			if (!obj) return;
			return JSON.stringify(obj, undefined, 4);
		}
		
		commandPrev()
		{
			this.fill(this.prevEvent());
		}
		commandNext()
		{
			this.fill(this.nextEvent());
		}
		commandCopy()
		{
			if (!this.event) return;
			
			var selection, range;
			selection = window.getSelection();        
			range = document.createRange();
			range.selectNodeContents(this.event_div);
			selection.removeAllRanges();
			selection.addRange(range);
			document.execCommand('copy');
			setTimeout(selection.removeAllRanges.bind(selection), 100);
		}
		commandCopyAll()
		{
			this.event_div.innerHTML=this.JSONHighlight(this.stringify(this.allEvents()));
			this.commandCopy();
			setTimeout(this.fill.bind(this, this.event), 100);
		}
		
		firstEvent()
		{
			if (!$gameMap) return;
			for (var event of $gameMap.events())
			{
				if (event) return event;
			}
		}
		
		nextEvent()
		{
			if (!$gameMap) return;
			var first, prev;
			for (var event of $gameMap.events())
			{
				if (event && !first) first=event;
				if (prev===this.event) return event;
				prev=event;
			}
			return first;
		}
		
		prevEvent()
		{
			if (!$gameMap) return;
			var prev, events=$gameMap.events();
			for (var event of events)
			{
				if (event===this.event) return prev || events[events.length-1];
				prev=event;
			}
			return this.event;
		}
		
		allEvents()
		{
			if (!$dataMap) return;
			return $dataMap.events;
			
			/*
			var result=[];
			for (var event in $gameMap.events())
			{
				if (!event) continue;
				result.push(event.event());
			}
			return result;
			*/
		}
		
		fill(event)
		{
			this.event=event;
			if (!event)
			{
				this.event_div.innerHTML='No events found';
				if (this.event_sprite) this.event_sprite.hide();
				if (this.event_info) this.event_info.style.display='none';
				return;
			}
			
			if (!this.event_sprite)
			{
				this.event_sprite=new Sprite_DummyCharacter(event, 610, 200);
				this.event_info=this.createEventInfo();
				document.body.appendChild(this.event_info);
				this.addChild(this.event_sprite);
			}
			else if (this.event_sprite._character!==event)
			{
				this.event_sprite.show();
				this.event_sprite.setCharacter(event);
			}
			
			this.fillInfo();
			this.event_div.innerHTML=this.JSONHighlight(this.stringify());
		}
		
		createEventInfo()
		{
			var div=document.createElement('div');
			div.style.cssText='width:300px; top: 250px; max-height:250px; left:460px; position:absolute; background:transparent; color:white; z-index:50; padding:4px; white-space:pre; text-align:center';
			return div;
		}
		
		fillInfo()
		{
			this.event_info.innerHTML='';
			if (!this.event) return;
			
			this.event_info.style.display='';
			var text='';
			if (!this.event.characterName()) text+='[No image]\n';
			text+='Name: '+(this.event.event().name || '-')+'\n'+
			'x '+this.event.x+', y '+this.event.y+'\n'+
			'Page #'+(this.event._pageIndex+1)+' of '+this.event.event().pages.length+'\n';
			
			for (var c of this.selfSwitches())
			{
				var key = [this.event._mapId, this.event._eventId, c];
				if ($gameSelfSwitches.value(key)===true) text+='Switch '+c+' is on\n';
			}
			
			var note=this.event.event().note;
			if (note) text+='Note: '+note;
			this.event_info.appendChild(document.createTextNode(text));
		}
		
		selfSwitches()
		{
			return ['A', 'B', 'C', 'D'];
		}
		
		update()
		{
			if (Input.isTriggered('escape')) this.popScene();
			else if (Input.isTriggered('pageup')) this.commandPrev();
			else if (Input.isTriggered('pagedown')) this.commandNext();
			
			var threshold=20;
			if (Math.abs(TouchInput.wheelY)>=threshold) this.event_div.scrollTop+=TouchInput.wheelY;
			
			Scene_MenuBase.prototype.update.apply(this, arguments);
		}
		
		terminate()
		{
			SoundManager.playCursor=this._playCursor;
			SoundManager.playOk=this._playOk;
			Graphics._disableTextSelection();
			if (this.event_div && this.event_div.parentNode) this.event_div.parentNode.removeChild(this.event_div);
			if (this.event_info && this.event_info.parentNode) this.event_info.parentNode.removeChild(this.event_info);
			if (this.css && this.css.parentNode) this.css.parentNode.removeChild(this.css);
		}
		
		JSONHighlight(json)
		{
			json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
				var cls = 'number';
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'key';
					} else {
						cls = 'string';
					}
				} else if (/true|false/.test(match)) {
					cls = 'boolean';
				} else if (/null/.test(match)) {
					cls = 'null';
				}
				return '<span class="' + cls + '">' + match + '</span>';
			});
		}
	}
}