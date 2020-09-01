/*:
 * @plugindesc Applies pixi filter to the background of menus
 * @author Cristian Carlesso <kentaromiura>

 * @param Blur
 * @desc applies the blur filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param BlurX
 * @desc applies the blur x filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param BlurY
 * @desc applies the blur y filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param ColorMatrix
 * @desc applies the color matrix filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param ColorStep
 * @desc applies the color step filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param CrossHatch
 * @desc applies the cross hatch filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param DotScreen
 * @desc applies the dot screen filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param Gray
 * @desc applies the gray filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param Invert
 * @desc applies the invert filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param Pixelate
 * @desc applies the pixelate filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param RGBSplit
 * @desc applies the rgb split filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param Sepia
 * @desc applies the sepia filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param Twist
 * @desc applies the twist filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0

 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin allows you to apply some predefined filters
 * to your menu background.
 * The filters can be placed in any order,
 * just set the preferred order in the parameter configuration
 *
 * The filters will only be visible in environment supporting a webGL context,
 * where this is not avaiable they will simply not show.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Sometimes you may want to change the filters applied to the background
 * for this the following plugin commands are available:
 *
 * Plugin Command
 *   RemoveMenuBackgroundFilter $filter Removes the specif filter if exists
 *   RemoveAllMenuBackgroundFilters Removes any filter applied
 *   AppendMenuBackgroundFilter $filter Adds a filter at the end of the list
 *   PrependMenuBackgroundFilter $filter Adds a filter at the begin of the list
 *
 * where $filter can be any of the following:
 * Blur, BlurX, BlurY, ColorMatrix, ColorStep, CrossHatch, DotScreen, Gray,
 * Invert, Pixelate, RGBSplit, Sepia, Twist
 * ============================================================================
* released under MIT, see https://github.com/kentaromiura/RPGMV-Plugins/blob/master/LICENSE
 */
(function(c,d){var a={},b=function(f){var e=a[f];if(!e){e=a[f]={};var g=e.exports={};c[f].call(g,b,e,g,d)}return e.exports};b('0')}({'0':function(b,g,h,d){b('1')();b('2')();var e=b('3');var c=e();var a=[];function f(b){a.push(new PIXI[b])}Object.keys(c).reduce(function(d,e){var b=e+'Filter';if(b in PIXI){var a=c[e]-0;if(!isNaN(a)&&a>0){d.push(a+':'+b)}}return d},[]).sort().forEach(function(a){f(a.split(':')[1])});d.addEventListener('backgroundCreated',function(c){var b=c.detail.context;if(a.length){b._backgroundSprite.filters=a}else{if(b._backgroundSprite.filters&&b._backgroundSprite.filters.length===0){delete b._backgroundSprite.filters}}});d.addEventListener('commandInvoked',function(h){var d=h.detail.args;var e=d[0];var c=d[1];switch(e){case'RemoveMenuBackgroundFilter':var b=c[0]+'Filter';if(b in PIXI){var g=PIXI[b];a=a.filter(function(a){return!(a instanceof g)})}break;case'RemoveAllMenuBackgroundFilters':a=[];break;case'AppendMenuBackgroundFilter':var b=c[0]+'Filter';if(b in PIXI){f(b)}break;case'PrependMenuBackgroundFilter':var b=c[0]+'Filter';if(b in PIXI){a.unshift(new PIXI[b])}break}})},'1':function(b,c,d,e){var a=b('5');c.exports=function(){return a(Scene_MenuBase.prototype,'createBackground','backgroundCreated')}},'2':function(b,c,d,e){var a=b('5');c.exports=function(){return a(Game_Interpreter.prototype,'pluginCommand','commandInvoked')}},'3':function(b,c,d,e){var a=b('4');c.exports=function(){return PluginManager.parameters(a())}},'4':function(b,a,c,d){a.exports=function(){return/([^\/]+)\.js$/.exec(document.currentScript.src)[1]}},'5':function(d,g,h,a){var e=d('6');var f=d('7');var b=a._kenta||(a._kenta={});var c=b.patchedMethods||(b.patchedMethods={});g.exports=function b(b,d,h){var i=f(b);var g=i+':'+h;if(c[g])return b[d];c[g]=true;var j=b[d];b[d]=function(){var b=e(arguments);var c=j.apply(this,b);a.dispatchEvent(new CustomEvent(h,{'detail':{args:b,result:c,context:this}}));return c};return b[d]}},'6':function(b,a,c,d){a.exports=Function.prototype.call.bind(Array.prototype.slice)},'7':function(c,d,f,g){var b=c('8');var a='🍕';function e(c){return c.hasOwnProperty(a)?c[a]:Object.defineProperty(c,a,{enumerable:false,configurable:false,writable:false,value:b()})[a]}d.exports=e},'8':function(c,b,d,e){var a=0;b.exports=Utils.uniqueId||(Utils.uniqueId=function(){return(a++).toString(36)})}},this))