//=============================================================================
// BossBar.js
//=============================================================================
//v2.0 
/*:
 * @plugindesc Makes boss hp bar appear in battle if you have note tag on the boss. 
 * @author Jeremy Cannady
 *
 * @param Boss Border X
 * @desc Select x position adjust.Positive to go right, negative to go left.
 * @default 50
 *
 * @param Boss Border Y
 * @desc Select the y position adjust. Poistive to go down, negative to go up.
 * @default 350
 *
 * @param Boss Bar X
 * @desc Select x position adjust.Positive to go right, negative to go left.
 * @default 202
 *
 * @param Boss Bar Y
 * @desc Select the y position adjust. Poistive to go down, negative to go up.
 * @default 400
 *
 * @param Turn Opacity
 * @desc Opacity of the bars when you are attacking, etc. 255 is visible 0 is invisible.
 * @default 255
 *
 * @param Input Opacity
 * @desc Opacity of the bars when you are selcting actions to do. 255 is visible 0 is invisible.
 * @default 100
 *
 * @param Scale
 * @desc Scales both of the images. 1.2 is 20% increase. 0.8 is 80% of original. 1 is no scale.
 * @default 1
 *
 * @help
 * Put <Boss:1> in the enemy note tag to activate. No Spaces.
 *This will get the image BossBar1.png and BossFill1.png from the img/pictures
 *and display this during battle.Please note if you scale the image you need to adjust the x and y values.
 *
*/

(function(){
//=============================================================================
// Create variables.
//=============================================================================
	var parameters = PluginManager.parameters('BossBar');
	var bossbx = Number(parameters['Boss Border X'] || 50);
	var bossby = Number(parameters['Boss Border Y'] || 350);
	var bossbgx = Number(parameters['Boss Bar X'] || 202);
	var bossbgy = Number(parameters['Boss Bar Y'] || 400);
	var inputOpacity = Number(parameters['Input Opacity'] || 255);
	var turnOpacity = Number(parameters['Turn Opacity'] || 255);
	var scale = Number(parameters['Scale'] || 1);
	Game_Troop.prototype.currentBossID = 0;
	Game_Troop.prototype.currentBossTroopID = 0;
	Game_Troop.prototype.currentBossMetaID = 0;
	Game_Troop.prototype.haveBoss = false;
//=============================================================================
// Create sprite layer to display boss gauge.
//=============================================================================
	var alias_BossGauge_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer
	Spriteset_Battle.prototype.createLowerLayer = function() {
		alias_BossGauge_createLowerLayer.call(this);
		var haveBoss = 0;
		for(var i = 0; i < $gameTroop._enemies.length; i++){
			if ($dataEnemies[$gameTroop._enemies[i]._enemyId].meta.Boss){
				$gameTroop.currentBossTroopID = i;
				$gameTroop.currentBossID = $gameTroop._enemies[i]._enemyId;
				$gameTroop.currentBossMetaID = $dataEnemies[$gameTroop.currentBossID].meta.Boss;
				$gameTroop.haveBoss = true;	
				haveBoss += 1;
			};
			if(haveBoss === 0){
				$gameTroop.haveBoss = false;		
			}
		};
		if($gameTroop.haveBoss){
			this.createBossGauge();
		};
	}
//=============================================================================
// Create update function to update the gauge.
//=============================================================================
	var alias_SSB_update = Spriteset_Battle.prototype.update
	Spriteset_Battle.prototype.update = function() {
		alias_SSB_update.call(this);
		if($gameTroop.haveBoss){
			this.updateBossGauge();
		};
	}
//=============================================================================
// Create the bitmaps and add them.
//=============================================================================
	Spriteset_Battle.prototype.createBossGauge = function() {
		this.bitmap1 = new Sprite(ImageManager.loadPicture("BossBar"+$dataEnemies[$gameTroop.currentBossID].meta.Boss));
		this.bitmap2 = new Sprite(ImageManager.loadPicture("BossBarFill"+$dataEnemies[$gameTroop.currentBossID].meta.Boss));
		this.bitmap1.x = bossbx;
		this.bitmap1.scale.x = scale;
		this.bitmap1.y = bossby;
		this.bitmap1.scale.y = scale;
		this.bitmap2.x = bossbgx;
		this.bitmap2.scale.x = scale;
		this.bitmap2.y = bossbgy
		this.bitmap2.scale.y = scale;
		this.addChild(this.bitmap1);
		this.addChild(this.bitmap2);	
	};
//=============================================================================
// Update the gauge based on boss HP.
//=============================================================================
	Spriteset_Battle.prototype.updateBossGauge = function() {
		if(BattleManager._phase == 'input'){
			this.bitmap1.opacity = inputOpacity;
			this.bitmap2.opacity = inputOpacity;
		}else{
			this.bitmap1.opacity = turnOpacity;
			this.bitmap2.opacity = turnOpacity;
		};
		
		var rate = $gameTroop._enemies[$gameTroop.currentBossTroopID]._hp/$dataEnemies[$gameTroop.currentBossID].params[0];	
		if(rate > 1){rate = 1};
		
		this.bitmap2.setFrame(0, 0, this.bitmap2.bitmap.width * rate, this.bitmap2.height);
		if ($gameTroop._enemies[$gameTroop.currentBossTroopID]._hp == 0 ){
			this.bitmap1.opacity = 0;
			this.bitmap2.opacity = 0;
		};
	};
})();