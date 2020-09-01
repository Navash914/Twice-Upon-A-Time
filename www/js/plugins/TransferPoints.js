//=============================================================================
// TransferPoints.js
//=============================================================================

/*:
 * @plugindesc Displays detailed statuses of enemies.
 * @author Yoji Ojima
 *
 * @param Unknown Data
 * @desc The index name for an unknown map.
 * @default ??????
 *
 * @help
 *
 * Plugin Command:
 *   TransferPoints open         # Open the enemy book screen
 *   TransferPoints add 3        # Add enemy #3 to the enemy book
 *   TransferPoints remove 4     # Remove enemy #4 from the enemy book
 *   TransferPoints complete     # Complete the enemy book
 *   TransferPoints clear        # Clear the enemy book
 *
 * Enemy Note:
 *   <desc1:foobar>         # Description text in the enemy book, line 1
 *   <desc2:blahblah>       # Description text in the enemy book, line 2
 *   <book:no>              # This enemy does not appear in the enemy book
 */

/*:ja
 * @plugindesc モンスター図鑑です。敵キャラの詳細なステータスを表示します。
 * @author Yoji Ojima
 *
 * @param Unknown Data
 * @desc 未確認の敵キャラの索引名です。
 * @default ？？？？？？
 *
 * @help
 *
 * プラグインコマンド:
 *   EnemyBook open         # 図鑑画面を開く
 *   EnemyBook add 3        # 敵キャラ３番を図鑑に追加
 *   EnemyBook remove 4     # 敵キャラ４番を図鑑から削除
 *   EnemyBook complete     # 図鑑を完成させる
 *   EnemyBook clear        # 図鑑をクリアする
 *
 * 敵キャラのメモ:
 *   <desc1:なんとか>       # 説明１行目
 *   <desc2:かんとか>       # 説明２行目
 *   <book:no>              # 図鑑に載せない場合
 */

(function() {

    var parameters = PluginManager.parameters('TransferPoints');
    var unknownData = String(parameters['Unknown Data'] || '??????');

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'TransferPoints') {
            switch (args[0]) {
            case 'open':
                SceneManager.push(Scene_TransferPoints);
                break;
            case 'add':
                $gameSystem.addToTransferPoints(Number(args[1]));
                break;
            case 'remove':
                $gameSystem.removeFromTransferPoints(Number(args[1]));
                break;
            case 'complete':
                $gameSystem.completeTransferPoints();
                break;
            case 'clear':
                $gameSystem.clearTransferPoints();
                break;
            }
        }
    };

    Game_System.prototype.addToTransferPoints = function(mapId) {
        if (!this._transferPointsFlags) {
            this.clearTransferPoints();
        }
        this._transferPointsFlags[mapId] = true;
    };

    Game_System.prototype.removeFromTransferPoints = function(mapId) {
        if (this._transferPointsFlags) {
            this._transferPointsFlags[mapId] = false;
        }
    };

    Game_System.prototype.completeTransferPoints = function() {
        this.clearTransferPoints();
        for (var i = 1; i < $dataMapInfos.length; i++) {
            this._transferPointsFlags[i] = true;
        }
    };

    Game_System.prototype.clearTransferPoints = function() {
        this._transferPointsFlags = [];
    };

    Game_System.prototype.isInTransferPoints = function(map) {
        if (this._transferPointsFlags && map) {
            return !!this._transferPointsFlags[map.id];
        } else {
            return false;
        }
    };


    function Scene_TransferPoints() {
        this.initialize.apply(this, arguments);
    }

    Scene_TransferPoints.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_TransferPoints.prototype.constructor = Scene_TransferPoints;

    Scene_TransferPoints.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_TransferPoints.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._indexWindow = new Window_TransferPointsIndex(0, 0);
        this._indexWindow.setHandler('cancel', this.popScene.bind(this));
        var wy = this._indexWindow.height;
        var ww = Graphics.boxWidth;
        var wh = Graphics.boxHeight - wy;
        this._statusWindow = new Window_TransferPointsStatus(0, wy, ww, wh);
        this.addWindow(this._indexWindow);
        this.addWindow(this._statusWindow);
        this._indexWindow.setStatusWindow(this._statusWindow);
    };

    function Window_TransferPointsIndex() {
        this.initialize.apply(this, arguments);
    }

    Window_TransferPointsIndex.prototype = Object.create(Window_Selectable.prototype);
    Window_TransferPointsIndex.prototype.constructor = Window_TransferPointsIndex;

    Window_TransferPointsIndex.lastTopRow = 0;
    Window_TransferPointsIndex.lastIndex  = 0;

    Window_TransferPointsIndex.prototype.initialize = function(x, y) {
        var width = Graphics.boxWidth;
        var height = this.fittingHeight(6);
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.setTopRow(Window_TransferPointsIndex.lastTopRow);
        this.select(Window_TransferPointsIndex.lastIndex);
        this.activate();
    };

    Window_TransferPointsIndex.prototype.maxCols = function() {
        return 3;
    };

    Window_TransferPointsIndex.prototype.maxItems = function() {
        return this._list ? this._list.length : 0;
    };

    Window_TransferPointsIndex.prototype.setStatusWindow = function(statusWindow) {
        this._statusWindow = statusWindow;
        this.updateStatus();
    };

    Window_TransferPointsIndex.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.updateStatus();
    };

    Window_TransferPointsIndex.prototype.updateStatus = function() {
        if (this._statusWindow) {
            var map = this._list[this.index()];
            this._statusWindow.setMap(map);
        }
    };

    Window_TransferPointsIndex.prototype.refresh = function() {
        this._list = [];
        for (var i = 1; i < $dataMapInfos.length; i++) {
            var map = $dataMapInfos[i];
            if (map.name && map.meta.book !== 'no') {
                this._list.push(map);
            }
        }
        this.createContents();
        this.drawAllItems();
    };

    Window_TransferPointsIndex.prototype.drawItem = function(index) {
        var map = this._list[index];
        var rect = this.itemRectForText(index);
        var name;
        if ($gameSystem.isInTransferPoints(map)) {
            name = map.name;
        } else {
            name = unknownData;
        }
        this.drawText(name, rect.x, rect.y, rect.width);
    };

    Window_TransferPointsIndex.prototype.processCancel = function() {
        Window_Selectable.prototype.processCancel.call(this);
        Window_TransferPointsIndex.lastTopRow = this.topRow();
        Window_TransferPointsIndex.lastIndex = this.index();
    };

    function Window_TransferPointsStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_TransferPointsStatus.prototype = Object.create(Window_Base.prototype);
    Window_TransferPointsStatus.prototype.constructor = Window_TransferPointsStatus;

//    Window_TransferPointsStatus.prototype.initialize = function(x, y, width, height) {
//        Window_Base.prototype.initialize.call(this, x, y, width, height);
//        this._enemy = null;
//        this._enemySprite = new Sprite();
//        this._enemySprite.anchor.x = 0.5;
//        this._enemySprite.anchor.y = 0.5;
//        this._enemySprite.x = width / 2 - 20;
//       this._enemySprite.y = height / 2;
//        this.addChildToBack(this._enemySprite);
//        this.refresh();
//    };

    Window_TransferPointsStatus.prototype.setMap = function(map) {
        if (this._map !== map) {
            this._map = map;
            this.refresh();
        }
    };

//    Window_TransferPointsStatus.prototype.update = function() {
//        Window_Base.prototype.update.call(this);
//        if (this._enemySprite.bitmap) {
//            var bitmapHeight = this._enemySprite.bitmap.height;
//            var contentsHeight = this.contents.height;
//            var scale = 1;
//            if (bitmapHeight > contentsHeight) {
//                scale = contentsHeight / bitmapHeight;
//            }
//            this._enemySprite.scale.x = scale;
//            this._enemySprite.scale.y = scale;
//        }
//    };

    Window_TransferPointsStatus.prototype.refresh = function() {
        var map = this._map;
        var x = 0;
        var y = 0;
        var lineHeight = this.lineHeight();

        this.contents.clear();

        if (!map || !$gameSystem.isInTransferPoints(map)) {
            this._mapSprite.bitmap = null;
            return;
        }

        var name = map.name;
        this.resetTextColor();
        this.drawText(map.name, x, y);

        x = this.textPadding();
        y = lineHeight + this.textPadding();

        for (var i = 0; i < 8; i++) {
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.param(i), x, y, 160);
            this.resetTextColor();
            y += lineHeight;
        }



    };

})();
