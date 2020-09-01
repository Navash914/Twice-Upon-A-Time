//=============================================================================
// Portraits.js
//=============================================================================

var Imported = Imported || {};
Imported.Portraits = true;
var Portraits = Portraits || {};

/*:
 * @plugindesc Display battlers portraits 1.6
 * @author Michael Dionne
 *
 * @help http://forums.rpgmakerweb.com/index.php?/topic/48633-portraits/ exotyktechnologies AT gmail.com
 *
 * @param Turn Portraits Off
 * @desc Set this to 1 to NOT show the portraits, but still use other features of this plugin. Def: 0
 * @default 0
 *
 * @param Turn Names Off
 * @desc Set this to 1 to NOT show the actors names, but still use other features of this plugin. Def: 0
 * @default 0
 *
 * @param Bars Horizontal Padding
 * @desc Use this to set horizontal alignment for bars (4 rows: -60 / 6 rows: 30 / 8 rows: 75). Def: -60
 * @default -60
 *
 * @param Global Window Vertical Margin
 * @desc Use this to set vertical alignment for the whole window. Def: 13
 * @default 13
 *
 * @param Actors Quantity
 * @desc Use this to change the quantity of actors to show in the BattleStatus window. Def: 4
 * @default 4
 *
 * @param ATB Compatibility
 * @desc Set this to 1 to be compatible with Ellye's Simple ATB plugin. Def: 0
 * @default 0
 *
 * @param TP and ATB Enabled
 * @desc Set this to 1 if you have ATB Compatibility to 1 AND also want to display TP. Def: 0
 * @default 0
 *
 * @param Hide HP
 * @desc Set this to 1 if you want to hide the HP bar. Def: 0
 * @default 0
 *
 * @param Hide MP
 * @desc Set this to 1 if you want to hide the MP bar. Def: 0
 * @default 0
 *
 * @param Hide TP
 * @desc Set this to 1 if you want to hide the TP bar. Def: 0
 * @default 0
 *
 * @param Hide AT
 * @desc Set this to 1 if you want to hide the AT bar (for Ellye's Simple ATB plugin). Def: 0
 * @default 0
 *
 *
 * @param ------------
 * @desc -just a seperator to keep parameters cleaner and more organized-
 * @default -
 *
 *
 *
 * @param Bars Offset
 * @desc Changes the offset of ALL bars (can be negative!). Def: 156
 * @default 156
 *
 * @param Bars Width
 * @desc Set the width of ALL bars. Def: 88
 * @default 88
 *
 * @param ------------
 * @desc -just a seperator to keep parameters cleaner and more organized-
 * @default -
 *
 *
 * @param Control Bars Individually
 * @desc Set this to 1 if you want to change parameters (x & y offsets & width) for each bar individually. Def: 0
 * @default 0
 *
 *
 *
 * @param HP Bar Offset X
 * @desc Set the offset for the HP bar. Def: 156
 * @default 156
 *
 * @param HP Bar Offset Y
 * @desc Set the Y offset for the HP bar. 0 = top-left of the character slot.
 * @default 0
 *
 * @param HP Bar Width
 * @desc Set the width of the HP bar. Def: 88
 * @default 88
 *
 *
 * @param MP Bar Offset X
 * @desc Set the offset for the MP bar. Def: 156
 * @default 156
 *
 * @param MP Bar Offset Y
 * @desc Set the Y offset for the MP bar. 0 = top-left of the character slot.
 * @default 0
 *
 * @param MP Bar Width
 * @desc Set the width of the MP bar. Def: 88
 * @default 88
 *
 *
 * @param TP Bar Offset X
 * @desc Set the X offset for the TP bar. Def: 156
 * @default 156
 *
 *
 * @param TP Bar Offset Y
 * @desc Set the Y offset for the TP bar. 0 = top-left of the character slot.
 * @default 0
 *
 * @param TP Bar Width
 * @desc Set the width of the TP bar. Def: 88
 * @default 88
 *
 *
 * @param AT Bar Offset X
 * @desc Set the X offset for the AT bar. Def: 156
 * @default 156
 *
 * @param AT Bar Offset Y
 * @desc Set the Y offset for the AT bar. 0 = top-left of the character slot.
 * @default 0
 *
 * @param AT Bar Width
 * @desc Set the width of the AT bar. Def: 88
 * @default 88
 *
 * @param Icons Offset X
 * @desc Set the X offset for the icons. Def: 0
 * @default 0
 *
 * @param Icons Offset Y
 * @desc Set the Y offset for the icons. Def: 0
 * @default 0
 *
 * @param ------------
 * @desc -just a seperator to keep parameters cleaner and more organized-
 * @default -
 *
 *
 *
 * @param Face Horizontal Offset
 * @desc Set the horizontal offset for the actor face. Def: 0
 * @default 0
 *
 * @param Face Vertical Offset
 * @desc Set the vertical offset for the actor face. Def: 0
 * @default 0
 *
 * @param Actor Face Width
 * @desc Set the width for the actor face. Def: 110
 * @default 110
 *
 * @param Actor Face Height
 * @desc Set the height for the actor face. Def: 142
 * @default 142
 *
 * @param ------------
 * @desc -just a seperator to keep parameters cleaner and more organized-
 * @default -
 *
 *
 * @param Battle Status Window Height
 * @desc Use this to set the quantity of lines (height) of the battlestatus window. Def: 6
 * @default 6
 */

(function() {


	Window_BattleStatus.prototype.initialize = function()
	{
		Portraits.Parameters = PluginManager.parameters('Portraits');
		Portraits.Param = Portraits.Param || {};
		Portraits.Param.globalwindowverticalmargin = Number(Portraits.Parameters['Global Window Vertical Margin'] || 13);
		Portraits.Param.barshorizontalpadding = Number(Portraits.Parameters['Bars Horizontal Padding'] || -60);
		Portraits.Param.actorsquantity = Number(Portraits.Parameters['Actors Quantity'] || 4);
		Portraits.Param.atbcompatibility = Number(Portraits.Parameters['ATB Compatibility'] || 0);
		Portraits.Param.atbandtp = Number(Portraits.Parameters['TP and ATB Enabled'] || 0);
		Portraits.Param.hidehp = Number(Portraits.Parameters['Hide HP'] || 0);
		Portraits.Param.hidemp = Number(Portraits.Parameters['Hide MP'] || 0);
		Portraits.Param.hidetp = Number(Portraits.Parameters['Hide TP'] || 0);
		Portraits.Param.hideat = Number(Portraits.Parameters['Hide AT'] || 0);
		Portraits.Param.barsoffset = Number(Portraits.Parameters['Bars Offset'] || 156);
		Portraits.Param.barswidth = Number(Portraits.Parameters['Bars Width'] || 88);
		Portraits.Param.facex = Number(Portraits.Parameters['Face Horizontal Offset'] || 0);
		Portraits.Param.facey = Number(Portraits.Parameters['Face Vertical Offset'] || 0);
		Portraits.Param.facewidth = Number(Portraits.Parameters['Actor Face Width'] || 110);
		Portraits.Param.faceheight = Number(Portraits.Parameters['Actor Face Height'] || 142);
		Portraits.Param.portraitsoff = Number(Portraits.Parameters['Turn Portraits Off'] || 0);
		Portraits.Param.namesoff = Number(Portraits.Parameters['Turn Names Off'] || 0);
		Portraits.Param.lineheightx = Number(Portraits.Parameters['Battle Status Window Height'] || 6);
		//
		Portraits.Param.individualcontrol = Number(Portraits.Parameters['Control Bars Individually'] || 0);
		Portraits.Param.lockoffsety = Number(Portraits.Parameters['Lock Offset Y'] || 1);
		//
		Portraits.Param.hpbaroffsetx = Number(Portraits.Parameters['HP Bar Offset X'] || 156);
		Portraits.Param.hpbaroffsety = Number(Portraits.Parameters['HP Bar Offset Y'] || 0);
		Portraits.Param.hpbarwidth = Number(Portraits.Parameters['HP Bar Width'] || 88);
		//
		Portraits.Param.mpbaroffsetx = Number(Portraits.Parameters['MP Bar Offset X'] || 156);
		Portraits.Param.mpbaroffsety = Number(Portraits.Parameters['MP Bar Offset Y'] || 0);
		Portraits.Param.mpbarwidth = Number(Portraits.Parameters['MP Bar Width'] || 88);
		//
		Portraits.Param.tpbaroffsetx = Number(Portraits.Parameters['TP Bar Offset X'] || 156);
		Portraits.Param.tpbaroffsety = Number(Portraits.Parameters['TP Bar Offset Y'] || 0);
		Portraits.Param.tpbarwidth = Number(Portraits.Parameters['TP Bar Width'] || 88);
		//
		Portraits.Param.atbaroffsetx = Number(Portraits.Parameters['AT Bar Offset X'] || 156);
		Portraits.Param.atbaroffsety = Number(Portraits.Parameters['AT Bar Offset Y'] || 0);
		Portraits.Param.atbarwidth = Number(Portraits.Parameters['AT Bar Width'] || 88);
		//
		Portraits.Param.iconsx = Number(Portraits.Parameters['Icons Offset X'] || 0);
		Portraits.Param.iconsy = Number(Portraits.Parameters['Icons Offset Y'] || 0);
		
		
	
		var width = this.windowWidth();
		var height = this.windowHeight();
		var lineHeight = this.lineHeight();
		//var linesqt = 5;
		var linesqt = Portraits.Param.lineheightx;

		if (Portraits.Param.atbandtp == 1)
		{
			var linesqt = 7;
			
		}
		
		height = lineHeight*linesqt;
		var x = Graphics.boxWidth - width;
		var y = Graphics.boxHeight - height;
		var selectable = Window_Selectable.prototype.initialize.call(this, x, y + Portraits.Param.globalwindowverticalmargin, width, height);
		this.refresh();
		this.openness = 0;
    };


	Window_BattleStatus.prototype.drawItem = function(index)
	{
		var actor = $gameParty.battleMembers()[index];
		this.drawBasicArea(this.basicAreaRect(index), actor);
		this.drawGaugeArea(this.gaugeAreaRect(index), actor);
	};

	
	Window_BattleStatus.prototype.basicAreaRect = function(index)
	{
		var rect = this.itemRectForText(index);
		rect.width -= this.gaugeAreaWidth() + 15;
		return rect;
	};

	
	Window_BattleStatus.prototype.numVisibleRows = function()
	{
		return 1;
	};

	
	Window_BattleStatus.prototype.maxCols = function()
	{
		return Portraits.Param.actorsquantity;
	};

	
	Window_BattleStatus.prototype.gaugeAreaRect = function(index)
	{
		var rect = this.itemRectForText(index);
		rect.x += rect.width - this.gaugeAreaWidth() + Portraits.Param.barshorizontalpadding;
		rect.width = this.gaugeAreaWidth();
		return rect;
	};

	
	Window_BattleStatus.prototype.gaugeAreaWidth = function()
	{
		return 330;
	};
	

	Window_BattleStatus.prototype.drawBasicArea = function(rect, actor)
	{
		var lineHeight = this.lineHeight();
		
		if (Portraits.Param.portraitsoff == 0)
		{
			this.drawActorFace(actor, rect.x + Portraits.Param.facex, rect.y + lineHeight * 0 + Portraits.Param.facey, Portraits.Param.facewidth, Portraits.Param.faceheight);
		}
		
		if (Portraits.Param.namesoff == 0)
		{
			this.drawActorName(actor, rect.x, rect.y + lineHeight * 0, 150);
		}
		
		if (Portraits.Param.individualcontrol == 0)
		{
			this.drawActorIcons(actor, rect.x, rect.y + lineHeight * 1, 150);
		}
		
		else if (Portraits.Param.individualcontrol == 1)
		{
			this.drawActorIcons(actor, rect.x + Portraits.Param.iconsx, rect.y + Portraits.Param.iconsy, 150);
		}
		
	};

	
	Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor)
	{
		
		if ($dataSystem.optDisplayTp)
		{
			if (Portraits.Param.atbcompatibility == 0)
			{
				this.drawGaugeAreaWithTp(rect, actor);
			}
			
			else if (Portraits.Param.atbcompatibility == 1)
			{
				this.drawGaugeAreaWithTpWithATB(rect, actor);
			}
		}
		
		else
		{
		
			if (Portraits.Param.atbcompatibility == 0)
			{
				this.drawGaugeAreaWithoutTp(rect, actor);
			}
			
			else if (Portraits.Param.atbcompatibility == 1)
			{
				this.drawGaugeAreaWithoutTpWithATB(rect, actor);
			}
		
			
		}
		
	};

	
	
	
	
	
			Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor)
			{
			
				if (Portraits.Param.individualcontrol == 0)
				{
				
					var lineHeight = this.lineHeight();
						
					if (Portraits.Param.hidehp == 0)
					{
						this.drawActorHp(actor, rect.x+Portraits.Param.barsoffset, rect.y + lineHeight * 2, Portraits.Param.barswidth);
					}
						
					if (Portraits.Param.hidemp == 0)
					{
						this.drawActorMp(actor, rect.x+Portraits.Param.barsoffset, rect.y + lineHeight * 3, Portraits.Param.barswidth);
					}
						
					if (Portraits.Param.hidetp == 0)
					{
						this.drawActorTp(actor, rect.x+Portraits.Param.barsoffset, rect.y + lineHeight * 4, Portraits.Param.barswidth);
					}
					
				}
				
				
				else if (Portraits.Param.individualcontrol == 1)
				{
			
					var lineHeight = this.lineHeight();
					
					if (Portraits.Param.hidehp == 0)
					{
						this.drawActorHp(actor, rect.x+Portraits.Param.hpbaroffsetx, Portraits.Param.hpbaroffsety, Portraits.Param.hpbarwidth);
					}
					
					if (Portraits.Param.hidemp == 0)
					{
						this.drawActorMp(actor, rect.x+Portraits.Param.mpbaroffsetx, rect.y + Portraits.Param.mpbaroffsety, Portraits.Param.mpbarwidth);
					}
					
					if (Portraits.Param.hidetp == 0)
					{
						this.drawActorTp(actor, rect.x+Portraits.Param.tpbaroffsetx, rect.y + Portraits.Param.tpbaroffsety, Portraits.Param.tpbarwidth);
					}
					
				}
				
			};
	
	
			Window_BattleStatus.prototype.drawGaugeAreaWithTpWithATB = function(rect, actor)
			{
			
				if (Portraits.Param.individualcontrol == 0)
				{
					var lineHeight = this.lineHeight();
					if (Portraits.Param.hidehp == 0)
					{
						this.drawActorHp(actor, rect.x+Portraits.Param.barsoffset, rect.y + lineHeight * 2, Portraits.Param.barswidth);
					}
					
					if (Portraits.Param.hidemp == 0)
					{
						this.drawActorMp(actor, rect.x+Portraits.Param.barsoffset, rect.y + lineHeight * 3, Portraits.Param.barswidth);
					}
					
					if (Portraits.Param.hidetp == 0)
					{
						this.drawActorTp(actor, rect.x+Portraits.Param.barsoffset, rect.y + lineHeight * 4, Portraits.Param.barswidth);
					}
					
					if (Portraits.Param.hideat == 0)
					{
						this.drawActorATB(actor, rect.x+Portraits.Param.barsoffset, rect.y + lineHeight * 5, Portraits.Param.barswidth);
					}
				}
				
				else if (Portraits.Param.individualcontrol == 1)
				{
					var lineHeight = this.lineHeight();
					if (Portraits.Param.hidehp == 0)
					{
						this.drawActorHp(actor, rect.x+Portraits.Param.hpbaroffsetx, rect.y + Portraits.Param.hpbaroffsety, Portraits.Param.hpbarwidth);
					}
					
					if (Portraits.Param.hidemp == 0)
					{
						this.drawActorMp(actor, rect.x+Portraits.Param.mpbaroffsetx, rect.y + Portraits.Param.mpbaroffsety, Portraits.Param.mpbarwidth);
					}
					
					if (Portraits.Param.hidetp == 0)
					{
						this.drawActorTp(actor, rect.x+Portraits.Param.tpbaroffsetx, rect.y + Portraits.Param.tpbaroffsety, Portraits.Param.tpbarwidth);
					}
					
					if (Portraits.Param.hideat == 0)
					{
						this.drawActorATB(actor, rect.x+Portraits.Param.atbaroffsetx, rect.y + Portraits.Param.atbaroffsety, Portraits.Param.atbarwidth);
					}
				}
				
				
			};

	
			Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor)
			{
			
				if (Portraits.Param.individualcontrol == 0)
				{
					var lineHeight = this.lineHeight();
					
					if (Portraits.Param.hidehp == 0)
					{
						this.drawActorHp(actor, rect.x + Portraits.Param.barsoffset, rect.y + lineHeight * 3, Portraits.Param.barswidth);
					}
					
					if (Portraits.Param.hidemp == 0)
					{
						this.drawActorMp(actor, rect.x + Portraits.Param.barsoffset, rect.y + lineHeight * 4, Portraits.Param.barswidth);
					}
				}
				
				else if (Portraits.Param.individualcontrol == 1)
				{
					var lineHeight = this.lineHeight();
					
					if (Portraits.Param.hidehp == 0)
					{
						this.drawActorHp(actor, rect.x + Portraits.Param.hpbaroffsetx, rect.y + Portraits.Param.hpbaroffsety, Portraits.Param.hpbarwidth);
					}
					
					if (Portraits.Param.hidemp == 0)
					{
						this.drawActorMp(actor, rect.x + Portraits.Param.mpbaroffsetx, rect.y + Portraits.Param.mpbaroffsety, Portraits.Param.mpbarwidth);
					}
				}
					
			};
	
			
			Window_BattleStatus.prototype.drawGaugeAreaWithoutTpWithATB = function(rect, actor)
			{
			
				if (Portraits.Param.individualcontrol == 0)
				{
					var lineHeight = this.lineHeight();
					
					if (Portraits.Param.hidehp == 0)
					{
						this.drawActorHp(actor, rect.x + Portraits.Param.barsoffset, rect.y + lineHeight * 2, Portraits.Param.barswidth);
					}
					
					if (Portraits.Param.hidemp == 0)
					{
						this.drawActorMp(actor, rect.x + Portraits.Param.barsoffset, rect.y + lineHeight * 3, Portraits.Param.barswidth);
					}
					
					if (Portraits.Param.hideat == 0)
					{
						this.drawActorATB(actor, rect.x + Portraits.Param.barsoffset, rect.y + lineHeight * 4, Portraits.Param.barswidth);
					}
				}
				
				if (Portraits.Param.individualcontrol == 1)
				{
					var lineHeight = this.lineHeight();
					
					if (Portraits.Param.hidehp == 0)
					{
						this.drawActorHp(actor, rect.x + Portraits.Param.hpbaroffsetx, rect.y + Portraits.Param.hpbaroffsety, Portraits.Param.hpbarwidth);
					}
					
					if (Portraits.Param.hidemp == 0)
					{
						this.drawActorMp(actor, rect.x + Portraits.Param.mpbaroffsetx, rect.y + Portraits.Param.mpbaroffsety, Portraits.Param.mpbarwidth);
					}
					
					if (Portraits.Param.hideat == 0)
					{
						this.drawActorATB(actor, rect.x + Portraits.Param.atbaroffsetx, rect.y + Portraits.Param.atbaroffsety, Portraits.Param.atbarwidth);
					}
				}
				
			};

	
	Window_Selectable.prototype.itemHeight = function()
	{
		//console.log(this.maxCols);
		return this.lineHeight();
	};

	
})();










(function() {

	var _Window_Base_new = Window_Base.prototype.create;
	
	
    Window_Base.prototype.create = function()
	{
        _Window_Base_new.call(this);
		this.createDisplayObjects();
    };
	
	
	Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2)
	{
		var fillW = Math.floor(width * rate);
		var gaugeY = y + this.lineHeight() - 19;
		var lineHeight = this.lineHeight();
		this.contents.fillRect(x, gaugeY, width, 16, this.gaugeBackColor());
		this.contents.gradientFillRect(x, gaugeY, fillW, 16, color1, color2);
	};
	
	
	Window_Base.prototype.drawActorHp = function(actor, x, y, width)
	{
		width = width || 88;
		var color1 = '#ff9933';
		var color2 = '#ffcc66';
		this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
		this.drawText(TextManager.hpA, x, y, 44);
		this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
							   this.hpColor(actor), this.normalColor());
	};
	
	
	Window_Base.prototype.drawActorMp = function(actor, x, y, width)
	{
		width = width || 88;
		var color1 = '#3399ff';
		var color2 = '#66ccff';
		this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
		this.drawText(TextManager.mpA, x, y, 44);
		this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
							   this.mpColor(actor), this.normalColor());
	};
	
	
	Window_Base.prototype.drawActorATB = function(actor, x, y, width)
	{
		width = width || 88;
		var color1 = '#3399ff';
		var color2 = '#66ccff';
		this.drawGauge(x, y, width, actor.atbRate(), color1, color2);
		this.drawText("AT", x, y, 44);
	};
	
	
	Window_Base.prototype.drawActorTp = function(actor, x, y, width)
	{
		width = width || 88;
		var color1 = this.tpGaugeColor1();
		var color2 = this.tpGaugeColor2();
		this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
		this.drawText(TextManager.tpA, x, y, 44);
		this.changeTextColor(this.tpColor(actor));
		this.drawText(actor.tp, x + width - 64, y, 64, 'right');
	};
	
	
	
})();