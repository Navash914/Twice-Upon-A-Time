//=============================================================================
// Change Equip On Battle, ver0.1.0
//   by Unconnected42
// Based on ChangeWeaponOnBattle, by Kannazuki Sasuke
//
// UNCO_ChangeEquipOnBattle.js
// Last Updated : 2015/11/19
//=============================================================================

var Imported = Imported || {};
Imported.UNCO_ChangeEquip = true;

var Unco = Unco || {};
Unco.CEB = Unco.CEB || {};


//=============================================================================
 /*:
 * @plugindesc  Allows player to change certain slots of equipment during battle.
 * <Unco Equip>
 * @author Unconnected42
 *
 * @param Equip Command Name
 * @desc  Name of the equip command in actor battle menu.
 * @default Equip
 *
 * @param Equip Command Icon
 * @desc  Id of the icon to be displayed in front of Equip command when Bobstah's
 * Battle Command List is present.
 * @default 76
 *
 * @param Equip Skip Turn
 * @desc  'full'=turn skipped as soon as one equip changed. 'half'=turn skipped when leaving equip menu. 'none'=no skip.
 * @default full
 *
 * @param Equip Skill Id
 * @desc  The Id of the dummy skill that the actor will use after changing equipment, when turn is consumed.
 * @default 7
 *
 * @help
 * ============================================
 * Introduction
 * ============================================
 * 
 * This plug-in is based on the official plug-in ChangeWeaponOnBattle,
 * with the following differences:
 * - allow maker to decide each equipments may be changed, for each class.
 * - guarantees a minimum level of compatibility with Bobstah's Battle
 *   Command List plug-in (equip command can have an icon, but cannot
 *   currently be moved freely at any place in the command list).
 * - guarantee compatibility with Ammunition System.
 * - also provide some compatibility with EquipCore.
 * - changing equipment can consume actor's turn.
 * 
 * ============================================
 * Known Compatibility Issues
 * ============================================
 *
 * This plug-in should be placed below any other plug-in that it
 * interacts with, namely: Battle Command List, EquipCore,
 * Ammunition System.
 * 
 * ============================================
 * Use
 * ============================================
 * 
 * Lines to put in class notebox :
 * <Battle Change Equip: s1,s2,...>
 * ...where 's1,s2,...' are the equip slots that the actor will be
 * able to change during battle.
 * For ex. : <Battle Change Equip: 1,2,5> will allow any actor having 
 * the class whete the tag is put to change the three listed equip slots 
 * (in that case, probably weapon, shield and some accessory).
 * Please note that if no 'Battle Change Equip' tag is given for a class,
 * the equip command will not appear for the concerned actors.
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================


(function() {
   Unco.Parameters = $plugins.filter(function(p) {
          return p.description.contains('<Unco Equip>');
      })[0].parameters; //Copied from Ellye, who thanks Iavra
   Unco.Param = Unco.Param || {};

   Unco.Param.equipCommandName = String(Unco.Parameters['Equip Command Name']) || 'Equip';
   Unco.Param.equipConsumeTurn = String(Unco.Parameters['Equip Skip Turn']).toLowerCase() || 'full';
   Unco.Param.equipIconId = parseInt(Unco.Parameters['Equip Command Icon']) || 76;
   Unco.Param.equipSkillId = parseInt(Unco.Parameters['Equip Skill Id']) || 7;

  //=============================================================================
  // DataManager
  //  * Tags Processing
  //=============================================================================

   Unco.CEB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
   DataManager.isDatabaseLoaded = function() {
      if (!Unco.CEB.DataManager_isDatabaseLoaded.call(this)) return false;
      this.processUncoEquipChangeNotetags($dataClasses);
      return true;
   };

   DataManager.processUncoEquipChangeNotetags = function(group) {
      for (var n = 1; n < group.length; n++) {
         var obj = group[n];
         var notedata = obj.note.split(/[\r\n]+/);
         obj.equipChangeSlots = [];
         for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:BATTLE)[ ](?:CHANGE)[ ](?:EQUIP):[ ](.*)>/i)) {
               var slotList = String(RegExp.$1).split(',');
               for (var i in slotList) {
                  var slot = parseInt(slotList[i])
                  if (!isNaN(slot) && (slot > 0)) obj.equipChangeSlots.push(slot);
               }
            }
         }
      }
   };


   //=============================================================================
   // Window_BattleEquipStatus
  //  * Display Equip Bonuses
   //=============================================================================
   function Window_BattleEquipStatus() {
      this.initialize.apply(this, arguments);
   }

   Window_BattleEquipStatus.prototype =
      Object.create(Window_EquipStatus.prototype);
   Window_BattleEquipStatus.prototype.constructor = Window_BattleEquipStatus;

   Window_BattleEquipStatus.prototype.initialize = function(x, y) {
      Window_EquipStatus.prototype.initialize.call(this, x, y);
   };

   Window_BattleEquipStatus.prototype.numVisibleRows = function() {
      return 7;
   };
   
   //=============================================================================
   // Window_BattleEquipItem
  //  * One-column Equip Item Window
   //=============================================================================
   function Window_BattleEquipItem() {
      this.initialize.apply(this, arguments);
   }

   Window_BattleEquipItem.prototype = Object.create(Window_EquipItem.prototype);
   Window_BattleEquipItem.prototype.constructor = Window_BattleEquipItem;

   Window_BattleEquipItem.prototype.initialize  = function(x, y, width, height) {
      Window_EquipItem.prototype.initialize.call(this, x, y, width, height);
   };

   Window_BattleEquipItem.prototype.maxCols = function() {
      return 1;
   };

   //=============================================================================
   // Window_BattleEquipSlot
  //  * Tiny Equip Slot, with slot list based on the contents of Battle Change Equip Tag.
   //=============================================================================
   function Window_BattleEquipSlot() {
      this.initialize.apply(this, arguments);
   }

   Window_BattleEquipSlot.prototype = Object.create(Window_EquipSlot.prototype);
   Window_BattleEquipSlot.prototype.constructor = Window_BattleEquipSlot;

   Window_BattleEquipSlot.prototype.initialize  = function(x, y, width, height) {
      Window_EquipSlot.prototype.initialize.call(this, x, y, width, height);
   };

   Window_BattleEquipSlot.prototype.maxItems = function() {
      return this._actor ? ($dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots.length) : 0;
   };

   Window_BattleEquipSlot.prototype.update = function() {
      Window_Selectable.prototype.update.call(this);
      if (this._itemWindow) {
         if ( this._actor) {
            if (Imported.YEP_EquipCore === true) {
               Yanfly.Equip.Window_EquipItem_setSlotId.call(this._itemWindow , $dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots[this.index()]-1);
            } else {
               this._itemWindow.setSlotId( $dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots[this.index()]-1 );
            }
         } else this._itemWindow.setSlotId( this.index() );
      }
   };

   Window_BattleEquipSlot.prototype.item = function() {
      return this._actor ? this._actor.equips()[ $dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots[this.index()]-1 ] : null;
   };

   Window_BattleEquipSlot.prototype.drawItem = function(index) {
      if (this._actor) {
         var realIndex = $dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots[index]-1;
         var rect = this.itemRectForText(index);
         this.changeTextColor(this.systemColor());
         this.changePaintOpacity(this.isEnabled(realIndex));
         this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
         var item = this._actor.equips()[realIndex];
         if ((item === null) && (Window_EquipSlot.prototype.drawEmptySlot)) {
            this.drawEmptySlot(rect.x + 138, rect.y, rect.width - 138);
         } else {
            this.drawItemName(item, rect.x + 138, rect.y);
         }
         this.changePaintOpacity(true);
      }
   };

   Window_BattleEquipSlot.prototype.slotName = function(index) {
      var slots = this._actor.equipSlots();
      return this._actor ? $dataSystem.equipTypes[slots[ $dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots[index]-1 ]] : '';
   };

   Window_BattleEquipSlot.prototype.show = function() {
      Window_EquipSlot.prototype.show.call(this);
      this.showHelpWindow();
   };

   Window_BattleEquipSlot.prototype.hide = function() {
      Window_EquipSlot.prototype.hide.call(this);
      this.hideHelpWindow();
   };

   
   //=============================================================================
   // Scene_Battle
   //  * Adding the new windows to Scene_Battle, and managing turn skipping.
   //=============================================================================
   var _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
   Scene_Battle.prototype.isAnyInputWindowActive = function() {
      if (_Scene_Battle_isAnyInputWindowActive.call(this)) {
         return true;
      }
      return (this._equipSlotWindow.active || this._equipItemWindow.active);
   };
   
   var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
   Scene_Battle.prototype.createAllWindows = function() {
      _Scene_Battle_createAllWindows.call(this);
      this.createEquipStatusWindow();
      this.createEquipSlotWindow();
      this.createEquipItemWindow();
   };

   Scene_Battle.prototype.createEquipStatusWindow = function() {
      this._equipStatusWindow = new Window_BattleEquipStatus(0, this._helpWindow.height);
      this._equipStatusWindow.hide();
      this.addWindow(this._equipStatusWindow);
   };

   Scene_Battle.prototype.createEquipSlotWindow = function() {
      var wx = this._equipStatusWindow.width;
      var wy = this._helpWindow.height;
      var ww = Graphics.boxWidth - this._equipStatusWindow.width;
      var wh = Window_Base.prototype.lineHeight()*3;
      this._equipSlotWindow = new Window_BattleEquipSlot(wx, wy, ww, wh);
      this._equipSlotWindow.setHelpWindow(this._helpWindow);
      this._equipSlotWindow.setStatusWindow(this._equipStatusWindow);
      this._equipSlotWindow.setHandler('ok', this.onEquipSlotOk.bind(this));
      this._equipSlotWindow.setHandler('cancel', this.onEquipSlotCancel.bind(this));
      this._equipSlotWindow.hide();
      this.addWindow(this._equipSlotWindow);
   };

   Scene_Battle.prototype.createEquipItemWindow = function() {
      var wx = this._equipStatusWindow.width;
      var wy = this._equipStatusWindow.y + Window_Base.prototype.lineHeight()*3;
      var ww = Graphics.boxWidth - wx;
      var wh = Graphics.boxHeight - wy - this._statusWindow.height;
      this._equipItemWindow = new Window_BattleEquipItem(wx, wy, ww, wh);
      this._equipItemWindow.setHelpWindow(this._helpWindow);
      this._equipItemWindow.setStatusWindow(this._equipStatusWindow);
      this._equipItemWindow.setHandler('ok',     this.onEquipItemOk.bind(this));
      this._equipItemWindow.setHandler('cancel', this.onEquipItemCancel.bind(this));
      this._equipSlotWindow.setItemWindow(this._equipItemWindow);
      this._equipItemWindow.hide();
      this.addWindow(this._equipItemWindow);
   };

   var _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
   Scene_Battle.prototype.createActorCommandWindow = function() {
      _Scene_Battle_createActorCommandWindow.call(this);
      this._actorCommandWindow.setHandler('equip', this.commandEquip.bind(this));
   };

   var _Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
   Window_ActorCommand.prototype.makeCommandList = function() {
      _Window_ActorCommand_makeCommandList.call(this);
      if (this._actor && ($dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots.length > 0) ) {
         this.addEquipCommand();
      }
   };

   Window_ActorCommand.prototype.addEquipCommand = function() {
      if (Imported.BOB_BattleCommandList === true) {
         this.addCommand(Unco.Param.equipCommandName, 'equip', true, null, Unco.Param.equipIconId);
       } else {
         this.addCommand(Unco.Param.equipCommandName, 'equip');
       }
   };

   Scene_Battle.prototype.refreshActor = function() {
      var actor = BattleManager.actor();
      this._equipStatusWindow.setActor(actor);
      this._equipSlotWindow.setActor(actor);
      this._equipItemWindow.setActor(actor);
   };

   Scene_Battle.prototype.commandEquip = function() {
      this.refreshActor();
      if (Imported.UNCO_AmmunitionSystem === true) {
         this._ammoWindow.hide();
      }
      this._equipStatusWindow.show();
      this._equipItemWindow.refresh();
      this._equipItemWindow.show();
      this._equipSlotWindow.refresh();
      this._equipSlotWindow.show();
      this._equipSlotWindow.activate();
      this._equipSlotWindow.select(0);
      if (this._equipsChanged) delete this._equipsChanged;
   };

   Scene_Battle.prototype.onEquipSlotOk = function() {
      this._equipItemWindow.activate();
      this._equipItemWindow.select(0);
   };

   Scene_Battle.prototype.onEquipSlotCancel = function() {
      this._equipStatusWindow.hide();
      this._equipItemWindow.hide();
      this._equipSlotWindow.hide();
      if (Unco.Param.equipConsumeTurn === 'half' && this._equipsChanged) {
         var skill = $dataSkills[Unco.Param.equipSkillId];
         var action = BattleManager.inputtingAction();
         action.setSkill(skill.id);
         BattleManager.actor().setLastBattleSkill(skill);
         this.onSelectAction();
      } else {
         if (Imported.UNCO_AmmunitionSystem === true) {
            this.showAmmoWindow();
         }
         this._actorCommandWindow.activate();
         this._actorCommandWindow.select(0);
      }
   };

   Scene_Battle.prototype.onEquipItemOk = function() {
      SoundManager.playEquip();
      this._equipsChanged = true;
      BattleManager.actor().changeEquip(  $dataClasses[$dataActors[this._equipSlotWindow._actor._actorId].classId].equipChangeSlots[this._equipSlotWindow.index()]-1 , this._equipItemWindow.item());
      if (Unco.Param.equipConsumeTurn === 'full') {
         this._equipItemWindow.deselect();
         this._equipStatusWindow.hide();
         this._equipItemWindow.hide();
         this._equipSlotWindow.hide();
         var skill = $dataSkills[Unco.Param.equipSkillId];
         var action = BattleManager.inputtingAction();
         action.setSkill(skill.id);
         BattleManager.actor().setLastBattleSkill(skill);
         this.onSelectAction();
      } else {
         this._equipSlotWindow.activate();
         this._equipSlotWindow.refresh();
         this._equipItemWindow.deselect();
         this._equipItemWindow.refresh();
         this._equipStatusWindow.refresh();
      }
   };

   Scene_Battle.prototype.onEquipItemCancel = function() {
      this._equipSlotWindow.activate();
      this._equipItemWindow.deselect();
   };

})();