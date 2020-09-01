//=============================================================================
// SAN_MapGenerator.js
//=============================================================================
// Copyright (c) 2015 Sanshiro
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc SAN_MapGenerator ver1.00 
 * Generate map and allocate events automatically.
 * @author Sanshiro https://twitter.com/rev2nym
 * 
 * @help
 * When the plugin command is called, the map is generated 
 * and the player moves to position of start(entrance) event.
 * 
 * Set following tiles and events in a position on the base map.
 * 
 * -Tiles
 *   space :{x:0, y:0}
 *   room  :{x:0, y:1}
 *   pass  :{x:0, y:2}
 *   roof  :{x:0, y:3}
 *   wall  :{x:0, y:4}
 *   rubble:{x:0, y:5}
 * 
 * -Events
 *   start:{x:1, y:0}
 *   goal :{x:1, y:1}
 *   other:other position than above
 * 
 * Appearance rate can be set as events besides the start and the goal.
 * Set as the following on a memo space of events.
 * The event which has no setting of the appearance rate isn't generated.
 * 
 * -Appearance rate
 *   each map :<MapRate: [Positive small number of less than 1.0]>
 *   each room:<RoomRate:[Positive small number of less than 1.0]>
 * 
 * -Plugin Command
 *   MapGenerator RoomAndPass # Generate map consists of rooms and passes. 
 *   MapGenerator FillRoom    # Generate map consists of a room whole the map.
 *   
 * There is no plugin parameter.
 *
 *
 * It's possible to commercial use, distribute, and modify under the MIT license.
 * But, don't eliminate and don't alter a comment of the beginning.
 * If it's good, please indicate an author name on credit.
 * 
 * Author doesn't shoulder any responsibility in all kind of damage by using this.
 * And please don't expect support. X(
 */

/*:
 * @plugindesc 自動マップ生成 ver1.00
 * 自動的にマップを生成しイベントを配置します。
 * @author サンシロ https://twitter.com/rev2nym
 * @version 1.00 2015/11/29 公開
 * 
 * @help
 * プラグインコマンドを実行するとマップが生成され
 * プレイヤーが入口イベントの地点に移動します。
 * 
 * ベースとなるマップの座標に下記のタイルとイベントをそれぞれ配置して下さい。
 * ・タイル
 *  空白:{x:0, y:0}
 *  部屋:{x:0, y:1}
 *  通路:{x:0, y:2}
 *  天井:{x:0, y:3}
 *  壁　:{x:0, y:4}
 *  瓦礫:{x:0, y:5}
 * 
 * ・イベント
 *  入口:{x:1, y:0}
 *  出口:{x:1, y:1}
 *  他　:上記以外の座標
 * 
 * 入口と出口以外のイベントには出現率を設定できます。
 * イベントのメモ欄に下記を記載して下さい。
 * 出現率設定がないイベント生成されません。
 * 
 * ・イベント出現率
 *  マップ毎の出現率:<MapRate: [1.0以下の正の小数]>
 *  部屋毎の出現率　:<RoomRate:[1.0以下の正の小数]>
 * 
 * ・プラグインコマンド
 * MapGenerator RoomAndPass # 部屋と通路から構成されるマップを生成します。
 * MapGenerator FillRoom    # マップ全体に及ぶ一つの部屋を生成します。
 * 
 * プラグインパラメータはありません。
 * 
 * MITライセンスのもと、商用利用、改変、再配布が可能です。
 * ただし冒頭のコメントは削除や改変をしないでください。
 * よかったらクレジットに作者名を記載してください。
 * 
 * これを利用したことによるいかなる損害にも作者は責任を負いません。
 * サポートは期待しないでください＞＜。
 */

var Imported = Imported || {};
Imported.SAN_MapGenerator = true;

var Sanshiro = Sanshiro || {};
Sanshiro.Game_MapGenerator = Sanshiro.Game_MapGenerator || {};

//-----------------------------------------------------------------------------
// Game_MapGenerator
//
// マップジェネレーター（大部屋）

function Game_MapGenerator() {
    this.initialize();
}

// オートタイル解析タイルidリスト
//   tileIdsFloor : 床
//   tileIdsWall  : 壁
//   candidate    : 候補タイル ID 
//   connect      : 接続タイル ID
//   noConnect    : 非接続タイル ID
Game_MapGenerator.tileIdsFloor = {};

Game_MapGenerator.tileIdsFloor.candidate =
    [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
     12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
     24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
     36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

Game_MapGenerator.tileIdsFloor.connect = {
    1:[ 0,  1,  2,  3,  4,  5,  6,  7, 16, 17, 18, 19,
       20, 21, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35,
       36, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],         // 1:左下
    2:[ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
       12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
       24, 25, 26, 27, 32, 34, 35, 36, 37, 42, 47],         // 2:下
    3:[ 0,  1,  2,  3,  8,  9, 10, 11, 16, 17, 20, 22,
       24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36,
       37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],         // 3:右下
     4:[ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
        12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 26, 27,
        28, 29, 30, 31, 33, 36, 37, 38, 39, 45, 47],         // 4:左
    6:[ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
       12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
       28, 29, 30, 31, 33, 34, 35, 40, 41, 43, 47],         // 6:右
    7:[ 0,  2,  4,  6,  8, 10, 12, 14, 16, 17, 18, 19,
       20, 21, 22, 23, 24, 25, 28, 30, 32, 33, 34, 35,
       36, 37, 38, 40, 41, 42, 43, 44, 45, 46, 47],         // 7:左上
    8:[ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
       12, 13, 14, 15, 16, 17, 18, 19, 24, 25, 26, 27,
       28, 29, 30, 31, 32, 38, 39, 40, 41, 44, 47],         // 8:上
    9:[ 0,  1,  4,  5,  8,  9, 12, 13, 16, 18, 20, 21,
       22, 23, 24, 25, 26, 27, 28, 29, 32, 33, 34, 35,
       36, 37, 38, 39, 40, 42, 43, 44, 45, 46, 47]          // 9:右上
};

Game_MapGenerator.tileIdsFloor.noConnect = {
    1:[ 8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
       22, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35,
       37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],         // 1:左下
    2:[28, 29, 30, 31, 33, 38, 39, 40, 41, 43, 44, 45, 46], // 2:下
    3:[ 4,  5,  6,  7, 12, 13, 14, 15, 18, 19, 21, 23,
       24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36,
       37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],         // 3:右下
    4:[16, 17, 18, 19, 32, 34, 35, 40, 41, 42, 43, 44, 46], // 4:左
    6:[24, 25, 26, 27, 32, 36, 37, 38, 39, 42, 44, 45, 46], // 6:右
    7:[ 1,  3,  5,  7,  9, 11, 13, 15, 16, 17, 18, 19,
       20, 21, 22, 23, 26, 27, 29, 31, 32, 33, 34, 35,
       36, 37, 39, 40, 41, 42, 43, 44, 45, 46, 47],         // 7:左上
    8:[20, 21, 22, 23, 33, 34, 35, 36, 37, 42, 43, 45, 46], // 8:上
    9:[ 2,  3,  6,  7, 10, 11, 14, 15, 17, 19, 20, 21,
       22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35,
       36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47]          // 9:右上
};

Game_MapGenerator.tileIdsWall = {};

Game_MapGenerator.tileIdsWall.candidate =
    [ 0,  1,  2,  3,  4,  5,  6,  7,
      8,  9, 10, 11, 12, 13, 14, 15];

Game_MapGenerator.tileIdsWall.connect = {
    2:[ 0,  1,  2,  3,  4,  5,  6,  7],  // 2:下
    4:[ 0,  2,  4,  6,  8, 10, 12, 14],  // 4:左
    6:[ 0,  1,  2,  3,  8,  9, 10, 11],  // 6:右
    8:[ 0,  1,  4,  5,  8,  9, 12, 13]   // 8:上
};

Game_MapGenerator.tileIdsWall.noConnect = {
    2:[ 8,  9, 10, 11, 12, 13, 14, 15],  // 2:下
    4:[ 1,  3,  5,  7,  9, 11, 13, 15],  // 4:左
    6:[ 4,  5,  6,  7, 12, 13, 14, 15],  // 6:右
    8:[ 2,  3,  6,  7, 10, 11, 14, 15]   // 8:上
};

// 初期化
Game_MapGenerator.prototype.initialize = function() {
    this._wallHeight = 1;
    this._startXY = {x:0, y:0};
    this._goalXY  = {x:0, y:0};
    this._blocks  = [];
    this._rooms   = [];
    this._passes  = [];
    this._data    = [];
    this._isReady = false;
};

// マップ生成
Game_MapGenerator.prototype.setup = function() {
    $gameMap._events = [];
    for (key in $gameSelfSwitches._data) {
        if (key.split(",")[0] === String($gameMap.mapId())) {
            delete $gameSelfSwitches._data[key];
        }
    }
    this._isReady = false;
    this._blocks  = [];
    this._rooms   = [];
    this._passes  = [];
    this._startXY = {x:0, y:0};
    this._goalXY  = {x:0, y:0};
    this._data    = [];
    this.initSymbolTable();
    this.initSymbolMap();
    this.generateMap();
    this.refreshWallAndRoof();
    this.makeData();
    this.setStart();
    this.setGoal();
    this.setRateEvents();
    SceneManager._scene.createDisplayObjects();
    this._isReady = true;
}

// シンボル定義表の初期化
Game_MapGenerator.prototype.initSymbolTable = function() {
    // シンボル定義
    //  refXY      : シンボルに対応するタイルのツクールのマップ上の座標
    //  baseTileId : シンボルに対応するタイル ID 
    //  dispChar   : 生成したマップを文字列として表示する際の文字 
    this._symbolTable = {
        player: {refXY:{x:0, y:0}, baseTileId:[], dispChar:'＠'},
        space:  {refXY:{x:0, y:0}, baseTileId:[], dispChar:'　'},
        room:   {refXY:{x:0, y:1}, baseTileId:[], dispChar:'□'},
        pass:   {refXY:{x:0, y:2}, baseTileId:[], dispChar:'■'},
        roof:   {refXY:{x:0, y:3}, baseTileId:[], dispChar:'＃'},
        wall:   {refXY:{x:0, y:4}, baseTileId:[], dispChar:'＝'},
        rubble: {refXY:{x:0, y:5}, baseTileId:[], dispChar:'＊'}, 
        start:  {refXY:{x:1, y:0}, baseTileId:[], dispChar:'△'},
        goal:   {refXY:{x:1, y:1}, baseTileId:[], dispChar:'▽'}//,
    //  fence:  {refXY:{x:0, y:6}, baseTileId:[], dispChar:'只'},
    //  pond:   {refXY:{x:0, y:7}, baseTileId:[], dispChar:'○'},
    //  hole:   {refXY:{x:0, y:8}, baseTileId:[], dispChar:'●'},
    //  brink:  {refXY:{x:0, y:9}, baseTileId:[], dispChar:'＾'},
    //  enemy:  {refXY:{x:1, y:2}, baseTileId:[], dispChar:'＄'},
    //  crawler:{refXY:{x:0, y:1}, baseTileId:[], dispChar:'＆'}
    };
    for (symbol in this._symbolTable) {
        var x = this._symbolTable[symbol].refXY.x;
        var y = this._symbolTable[symbol].refXY.y;
        for (var z = 0; z < 6; z ++) {
            // z0:タイルA下層, z1:タイルA上層, z2:タイルB下層, z3:タイルB上層, z4:影, z5:リージョン
            this._symbolTable[symbol].baseTileId[z] = this.baseAutoTileId(x, y, z);
        }
    }
};

// オートタイルタイルの基点タイルID 
Game_MapGenerator.prototype.baseAutoTileId = function(x, y, z) {
    if ($gameMap.tileId(x, y, z) >= Tilemap.TILE_ID_A1) {
        return (Math.floor(($gameMap.tileId(x, y, z) - Tilemap.TILE_ID_A1) / 48)) * 48 + Tilemap.TILE_ID_A1;
    } else {
        return $gameMap.tileId(x, y, z);
    }
};

// シンボルで表現されるマップの初期化（初期化時はスペースで埋める）
Game_MapGenerator.prototype.initSymbolMap = function() {
    this._symbolMap = new Array($gameMap.width());
    for (var x = 0; x < $gameMap.width(); x++) {
        this._symbolMap[x] = new Array($gameMap.height());
        for (var y = 0; y < $gameMap.height(); y++) {
            this._symbolMap[x][y] = 'space';
        }
    }
};

// シンボルによる通行可能判定（通行可否定義）
Game_MapGenerator.prototype.isPassable = function(x, y) {
    if (!this._symbolMap[x] || !this._symbolMap[x][y]) {
        return false;
    }
    return ['room', 'pass', 'start', 'goal', 'crawler'].indexOf(this._symbolMap[x][y]) !== -1;
};

// マップ上における通行可能タイルの割合
Game_MapGenerator.prototype.passableRatio = function() {
    var passableCount = 0;
    for(var x = 0; x < $gameMap.width(); x++) {
        for(var y = 0; y < $gameMap.height(); y++) {
            if (this.isPassable(x, y)) {
                passableCount++;
            }
        }
    }
    return passableCount / ($gameMap.width() * $gameMap.height());
};

// シンボルマップ生成
Game_MapGenerator.prototype.generateMap = function() {
    var room = {x:0, y:0, w:0, h:0};
    room.x = 1;
    room.y = 1 + this._wallHeight;
    room.w = $dataMap.width - 2;
    room.h = $dataMap.height - (this._wallHeight + 1) * 2;
    for (var oX = 0; oX < room.w; oX++) {
        for (var oY = 0; oY < room.h; oY++) {
            this._symbolMap[oX + room.x][oY + room.y] = 'room';
        }
    }
    this._rooms.push(room);
}

// イベントの設置
Game_MapGenerator.prototype.setEvent = function(event, targetSymbols, targetArea) {
    targetSymbols = targetSymbols || ['room'];
    targetArea = targetArea || {x:0, y:0, w:$dataMap.width, h:$dataMap.height};
    var canSet = false;
    for (var x = targetArea.x; x < targetArea.x + targetArea.w && !canSet; x++) {
        for (var y = targetArea.y; y < targetArea.y + targetArea.h && !canSet; y ++) {
            canSet = (targetSymbols.indexOf(this._symbolMap[x][y]) !== -1);
        }
    }
    if (canSet) {
        for (var i = 0; i < Math.pow(targetArea.w * targetArea.h, 2); i++) {
            var x = targetArea.x + Math.randomInt(targetArea.w);
            var y = targetArea.y + Math.randomInt(targetArea.h);
            if ($gameMap.eventsXy(x, y).length === 0 &&
                targetSymbols.indexOf(this._symbolMap[x][y]) !== -1)
            {
                break;
            }
        }
        $gameMap._events.push(event);
        event._eventId = $gameMap._events.indexOf(event);
        event.setPosition(x, y);
        return {x:x, y:y}
    } else {
        return undefined;
    }
};

// 座標によるイベントデータの配列
Game_MapGenerator.prototype.dataMapEventsXy = function(x, y) {
    return $dataMap.events.filter(function(event) {
        return (!!event && event.x === x && event.y === y);
    }, this);
};

// スタート地点イベントの設置
Game_MapGenerator.prototype.setStart = function() {
    var refXY = this._symbolTable['start'].refXY;
    var event = new Game_Event($gameMap.mapId(), this.dataMapEventsXy(refXY.x, refXY.y)[0].id);
    this._startXY = this.setEvent(event);
    $gamePlayer.locate(this._startXY.x, this._startXY.y);
    $gamePlayer.reserveTransfer($gameMap.mapId(), this._startXY.x, this._startXY.y);
    $gameMap._interpreter.setWaitMode('transfer')
};

// ゴール地点イベントの設置
Game_MapGenerator.prototype.setGoal = function() {
    var refXY = this._symbolTable['goal'].refXY;
    var event = new Game_Event($gameMap.mapId(), this.dataMapEventsXy(refXY.x, refXY.y)[0].id);
    this._goalXY = this.setEvent(event);
};

// 確率イベントの設置
Game_MapGenerator.prototype.setRateEvents = function() {
    var mapDataRateMapEvents = $dataMap.events.filter(function(event) {
        return !!event && !!event.meta.RateMap;
    });
    mapDataRateMapEvents.forEach(function(mapDataEvent) {
        if (this.randBool(parseFloat(mapDataEvent.meta.RateMap))) {
            var event = new Game_Event($gameMap.mapId(), mapDataEvent.id);
            this.setEvent(event);
        }
    }, this);
    var mapDataRateRoomEvents = $dataMap.events.filter(function(event) {
        return !!event && !!event.meta.RateRoom;
    });
    mapDataRateRoomEvents.forEach(function(mapDataEvent) {
        this._rooms.forEach(function(room) {
            if (this.randBool(parseFloat(mapDataEvent.meta.RateRoom))) {
                var event = new Game_Event($gameMap.mapId(), mapDataEvent.id);
                this.setEvent(event, 'room', room);
            }
        }, this);
    }, this);
};

//ランダムブール
//probability : true が返る確立
Game_MapGenerator.prototype.randBool = function(probability) {
    return Math.random() < probability;
};

// シンボルマップの壁と天井を設置：マップ全体
// 床と通路だけのシンボルマップに壁と天井を追加する
Game_MapGenerator.prototype.refreshWallAndRoof = function() {
    for (var x = 0; x < this._symbolMap.length; x++) {
        for (var y = 0; y < this._symbolMap[x].length; y++) {
            if (!this.isPassable(x, y)) {
                continue;
            }
            this.refreshWallAndRoofUpperSide(x - 1, y - 1);  // 左上
            this.refreshWallAndRoofUpper(x, y - 1);          // 上
            this.refreshWallAndRoofUpperSide(x + 1, y - 1);  // 右上
            this.refreshWallAndRoofSide(x - 1, y);           // 左
            this.refreshWallAndRoofSide(x + 1, y);           // 右
            this.refreshWallAndRoofDowner(x - 1, y + 1);     // 左下
            this.refreshWallAndRoofDowner(x, y + 1);         // 下
            this.refreshWallAndRoofDowner(x + 1, y + 1);     // 右下
        }
    }
    for (var x = this._symbolMap.length - 1; x >= this._symbolMap.length; x--) {
        for (var y = this._symbolMap[x].length - 1; y >= this._symbolMap[x].length; y--) {
            if (this._symbolMap[x][y] === 'roof' && this._symbolMap[x][y - 1] === 'wall') {
                this._symbolMap[x][y - 1] = 'roof';
            }
        }
    }
};

// シンボルマップの壁と天井を設置：上
Game_MapGenerator.prototype.refreshWallAndRoofUpper = function(x, y) {
    if (!this._symbolMap[x] || !this._symbolMap[x][y] || this.isPassable(x, y)) {
        return;
    }
    for (var h = 0; h < y && !this.isPassable(x, y - h); h++);
    if (h > this._wallHeight) {
        for (var wH = 0; wH < this._wallHeight; wH++) {
            this._symbolMap[x][y - wH] = 'wall';
        }
        this._symbolMap[x][y - this._wallHeight] = 'roof';
    } else {
        for (var wH = 0; wH < h; wH++) {
            if (this._symbolMap[x][y - wH] === 'space') {
                this._symbolMap[x][y - wH] = 'rubble';
            }
        }
    }
};

// シンボルマップの壁と天井を設置：下
Game_MapGenerator.prototype.refreshWallAndRoofDowner = function(x, y) {
    if (!this._symbolMap[x] || !this._symbolMap[x][y] || this.isPassable(x, y)) {
        return;
    }
    for (var h = 0; h + y < $gameMap.height() && !this.isPassable(x, y + h); h++);
    if (h > this._wallHeight) {
        this._symbolMap[x][y] = 'roof';
        for (var wH = 0; wH < this._wallHeight; wH++) {
            if (this._symbolMap[x][y + wH + 1] !== 'roof') {
                this._symbolMap[x][y + wH + 1] = 'wall';
            }
        }
    } else {
        for (var wH = 0; wH < h; wH++) {
            if (this._symbolMap[x][y + wH] === 'space') {
                this._symbolMap[x][y + wH] = 'rubble';
            }
        }
    }
};

//シンボルマップの壁と天井を設置：横
Game_MapGenerator.prototype.refreshWallAndRoofSide = function(x, y) {
    if (!this._symbolMap[x] || !this._symbolMap[x][y] || this.isPassable(x, y)) {
        return;
    }
    if (this.isPassable(x, y + 1)) {
        this.refreshWallAndRoofUpper(x, y);
    } else {
        this.refreshWallAndRoofDowner(x, y);
    }
};

// シンボルマップの壁と天井を設置：斜め上
Game_MapGenerator.prototype.refreshWallAndRoofUpperSide = function(x, y) {
    if (!this._symbolMap[x] || !this._symbolMap[x][y] || this.isPassable(x, y)) {
        return;
    }
    this.refreshWallAndRoofDowner(x, y - this._wallHeight);
};

// オートタイルを考慮したタイルID
Game_MapGenerator.prototype.autoTileId = function(x, y, z) {
    if ((x < 0 || x >= $dataMap.width) || (y < 0 || y >= $dataMap.height)) {
        return 0;
    } else if (z === 4) {
        return this.shadow(x, y);
    } else if ((z !== 0 && z !== 1) || this._symbolTable[this._symbolMap[x][y]].baseTileId[z] === 0) {
        return this._symbolTable[this._symbolMap[x][y]].baseTileId[z];
    }
    var candidateTileIds = [];
    if (this._symbolMap[x][y] !== 'wall') {
        // 壁以外の場合
        candidateTileIds = Game_MapGenerator.tileIdsFloor.candidate.concat();
        [1, 2, 3, 4, 6, 7, 8, 9].forEach (function(direction) {
            var dx = x + Math.floor((direction - 1) % 3) - 1;
            var dy = y - Math.floor((direction - 1) / 3) + 1;
            if ((dx < 0 || dx >= $dataMap.width) || (dy < 0 || dy >= $dataMap.height)) {
                return; // マップ範囲外なら判定しない
            }
            if (this._symbolMap[x][y] === this._symbolMap[dx][dy]) {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsFloor.connect[direction].indexOf(Id) !== -1;
                }); // 同種シンボルの場合候補タイルIDから接続タイルIDを選択
            } else {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsFloor.noConnect[direction].indexOf(Id) !== -1;
                }); // 異種シンボルの場合候補タイルIDから非接続タイルIDを選択
            }
        }, this);
    } else {
        // 壁の場合
        candidateTileIds = Game_MapGenerator.tileIdsWall.candidate.concat();
        for (var by = y; this._symbolMap[x][y] === this._symbolMap[x][by + 1]; by++);  // 壁の下端
        for (var ty = y; this._symbolMap[x][y] === this._symbolMap[x][ty - 1]; ty--);  // 壁の上端
        // 上下の処理
        [2, 8].forEach(function(direction) {
            var dx = x + Math.floor((direction - 1) % 3) - 1;
            var dy = y - Math.floor((direction - 1) / 3) + 1;
            if ((dx < 0 || dx >= $dataMap.width) || (dy < 0 || dy >= $dataMap.height)) {
                return; // マップ範囲外なら判定しない
            }
            if (this._symbolMap[x][y] === this._symbolMap[dx][dy]) {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsWall.connect[direction].indexOf(Id) !== -1;
                }); // 同種シンボルの場合候補タイルIDから接続タイルIDを選択
            } else {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsWall.noConnect[direction].indexOf(Id) !== -1;
                }); // 異種シンボルの場合候補タイルIDから非接続タイルIDを選択
            }
        }, this);
        // 左右の処理
        [4, 6].forEach(function(direction) {
            var dx = x + Math.floor((direction - 1) % 3) - 1;
            var dy = y - Math.floor((direction - 1) / 3) + 1;
            if ((dx < 0 || dx >= $dataMap.width) || (dy < 0 || dy >= $dataMap.height)) {
                return; // マップ範囲外なら判定しない
            }
            if ((this._symbolMap[dx][ty] === 'wall' || this._symbolMap[dx][ty] === 'roof') &&
                (this._symbolMap[dx][by] === 'wall' || this._symbolMap[dx][by] === 'roof'))
            {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsWall.connect[direction].indexOf(Id) !== -1;
                });　// 壁の下端の両横隣が壁または天井でかつ上端の両横隣が壁または天井でなければ接続タイルIDを選択
            } else {
                candidateTileIds = candidateTileIds.filter(function(Id) {
                    return Game_MapGenerator.tileIdsWall.noConnect[direction].indexOf(Id) !== -1;
                });　// 非接続タイルIDを選択
            }
        }, this);
    }
    return this._symbolTable[this._symbolMap[x][y]].baseTileId[z] + candidateTileIds[0];
};

// 影の算出
Game_MapGenerator.prototype.shadow = function(x, y) {
    if (!this._symbolMap[x - 1] ||
        this._symbolMap[x][y] === 'space'||
        this._symbolMap[x][y] === 'roof' ||
        this._symbolMap[x][y] === 'wall')
    {
        return 0;
    } else if (this._symbolMap[x - 1][y] === 'roof') {
        if (this._symbolMap[x - 1][y - 1] === 'roof' ||
            this._symbolMap[x - 1][y - 1] === 'wall')
        {
            return 5;
        }
    }  else if (this._symbolMap[x - 1][y] === 'wall') {
        return 5;
    }
    return 0;
};

//マップデータ作成
Game_MapGenerator.prototype.makeData = function() {
    var width = $dataMap.width;
    var height = $dataMap.height;
    for (var x = 0; x < this._symbolMap.length; x++) {
        for (var y = 0; y < this._symbolMap[x].length; y++) {
            for (var z = 0; z < 6; z++) {
                this._data[(z * height + y) * width + x] = this.autoTileId(x, y, z);
            }
        }
    }
};

// マップデータ
Game_MapGenerator.prototype.data = function() {
    return this._data;
};

// タイルID
Game_MapGenerator.prototype.tileId = function(x, y, z) {
    return this._data[(z * $dataMap.height + y) * $dataMap.width + x];
};

// 準備完了判定
Game_MapGenerator.prototype.isReady = function() {
    return this._isReady;
};

// マップのコンソール表示（デバッグ用）
Game_MapGenerator.prototype.printMap = function() {
    var dispMap = "";
    for (var y = 0; y < this._symbolMap[0].length; y++) {
        for (var x = 0; x < this._symbolMap.length; x++) {
            dispMap += this._symbolTable[this._symbolMap[x][y]].dispChar;
        }
        dispMap += "\r\n";
    }
    console.log(dispMap);
    // this.fPrintMap(dispMap);
};

// テキスト出力（デバッグ用）
Game_MapGenerator.prototype.fPrintMap = function(mapString) {
    var data = LZString.compressToBase64(mapString);
    var fs = require('fs');
    var dirPath = StorageManager.localFileDirectoryPath();
    var filePath = StorageManager.localFileDirectoryPath() + 'mapData.txt';
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    fs.writeFileSync(filePath, mapString);
};

//-----------------------------------------------------------------------------
// Game_MapGeneratorRoomAndPass
//
// マップジェネレーター（部屋と通路）

function Game_MapGeneratorRoomAndPass() {
    this.initialize.apply(this, arguments);
}

Game_MapGeneratorRoomAndPass.prototype = Object.create(Game_MapGenerator.prototype);
Game_MapGeneratorRoomAndPass.prototype.constructor = Game_MapGeneratorRoomAndPass;

// 初期化
Game_MapGeneratorRoomAndPass.prototype.initialize = function() {
    Game_MapGenerator.prototype.initialize.call(this);
};

// マップ（ダンジョン）自動生成
Game_MapGeneratorRoomAndPass.prototype.generateMap = function() {
    this._minRoomSize = 3;
    this._minBlockSize = this._minRoomSize + 2;
    this._minRooms = 2;
    this._maxRooms = 5;
    this._adjacentBlockIndexList = [];
    var block = {
        x:1,
        y:1 + this._wallHeight,
        w:$dataMap.width - 2,
        h:$dataMap.height - (this._wallHeight + 1) * 2
    };
    this._blocks.push(block);
    this.splitBlock(this._blocks[0]);
    this.makeAdjacentBlockIndexList();
    this.makeRooms();
    this.makePasses();
};

// 隣り合うブロックのリスト作成
Game_MapGeneratorRoomAndPass.prototype.makeAdjacentBlockIndexList = function() {
    for (var crntIndex = 0; crntIndex < this._blocks.length; crntIndex++) {
        var crntBlock = this._blocks[crntIndex];
        this._adjacentBlockIndexList[crntIndex] = {t:[], b:[], l:[], r:[]};
        for (var tgetIndex = 0; tgetIndex < this._blocks.length; tgetIndex++) {
            var tgetBlock = this._blocks[tgetIndex];
            if (crntBlock === tgetBlock) {
                continue;
            }
            var adjacentT = (crntBlock.y === tgetBlock.y + tgetBlock.h + 1);
            var adjacentB = (tgetBlock.y === crntBlock.y + crntBlock.h + 1);
            var adjacentL = (crntBlock.x === tgetBlock.x + tgetBlock.w + 1);
            var adjacentR = (tgetBlock.x === crntBlock.x + crntBlock.w + 1);
            if (!adjacentT && !adjacentB && !adjacentL && !adjacentR) {
                continue;
            }
            var matchH =
                (tgetBlock.x <= crntBlock.x + crntBlock.w && tgetBlock.x >= crntBlock.x) ||
                (tgetBlock.x + tgetBlock.w <= crntBlock.x + crntBlock.w && tgetBlock.x + tgetBlock.w >= crntBlock.x) ||
                (crntBlock.x <= tgetBlock.x + tgetBlock.w && crntBlock.x >= tgetBlock.x) ||
                (crntBlock.x + crntBlock.w <= tgetBlock.x + tgetBlock.w && crntBlock.x + crntBlock.w >= tgetBlock.x);
            var matchV =
                (tgetBlock.y <= crntBlock.y + crntBlock.h && tgetBlock.y >= crntBlock.y) ||
                (tgetBlock.y + tgetBlock.h <= crntBlock.y + crntBlock.h && tgetBlock.y + tgetBlock.h >= crntBlock.y) ||
                (crntBlock.y <= tgetBlock.y + tgetBlock.h && crntBlock.y >= tgetBlock.y) ||
                (crntBlock.y + crntBlock.h <= tgetBlock.y + tgetBlock.h && crntBlock.y + crntBlock.h >= tgetBlock.y);
            if (adjacentT && matchH) {
                this._adjacentBlockIndexList[crntIndex].t.push(tgetIndex);
                continue;
            } else if (adjacentB && matchH) {
                this._adjacentBlockIndexList[crntIndex].b.push(tgetIndex);
                continue;
            }
            if (adjacentL && matchV) {
                this._adjacentBlockIndexList[crntIndex].l.push(tgetIndex);
                continue;
            } else if (adjacentR && matchV) {
                this._adjacentBlockIndexList[crntIndex].r.push(tgetIndex);
                continue;
            }
        }
    }
};

// 部屋作成
Game_MapGeneratorRoomAndPass.prototype.makeRooms = function() {
    this._blocks.forEach(function(block) {
        var roomW = this._minRoomSize + Math.randomInt(block.w - this._minRoomSize - 2);
        var roomH = this._minRoomSize + Math.randomInt(block.h - this._minRoomSize - 2);
        var roomX = block.x + 1 + Math.randomInt(block.w - roomW - 2);     
        var roomY = block.y + 1 + Math.randomInt(block.h - roomH - 2);     
        var room = {x:roomX, y:roomY, w:roomW, h:roomH};
        this._rooms.push(room);
    }, this);
    this._rooms.forEach(function(room) {
        for (var y = 0; y < room.h; y++) {
            for (var x = 0 ; x < room.w; x++) {
                this._symbolMap[room.x + x][room.y + y] = 'room';
            }
        }
    }, this);
};

// 通路作成
Game_MapGeneratorRoomAndPass.prototype.makePasses = function() {
    var cache = {};
    for (var crntIndex = 0; crntIndex < this._adjacentBlockIndexList.length; crntIndex++ ) {
        cache[crntIndex] = [];
        var crngBlock = this._blocks[crntIndex];
        for(var direction in this._adjacentBlockIndexList[crntIndex]) {
            var tgetIndexList = this._adjacentBlockIndexList[crntIndex][direction];
            tgetIndexList.forEach(function(tgetIndex) {
                if (cache[tgetIndex] !== undefined && cache[tgetIndex].indexOf(crntIndex) !== -1)
                {
                    return;
                }
                cache[crntIndex].push(tgetIndex);
                var tgetBlock = this._blocks[tgetIndex];
                var crntRoom = this._rooms[crntIndex];
                var tgetRoom = this._rooms[tgetIndex];
                var crntPass = {};
                var tgetPass = {};
                var bordPass = {};
                switch (direction) {
                case 't':
                    crntPass.x = crntRoom.x + 1 + Math.randomInt(crntRoom.w - 2);
                    crntPass.y = crngBlock.y;
                    crntPass.w = 1;
                    crntPass.h = crntRoom.y - crngBlock.y;
                    tgetPass.x = tgetRoom.x + 1 + Math.randomInt(tgetRoom.w - 2);
                    tgetPass.y = tgetRoom.y + tgetRoom.h;
                    tgetPass.w = 1;
                    tgetPass.h = crngBlock.y - tgetPass.y;
                    bordPass.x = Math.min(crntPass.x, tgetPass.x);
                    bordPass.y = crngBlock.y - 1;
                    bordPass.w = Math.max(crntPass.x, tgetPass.x) - bordPass.x + 1;
                    bordPass.h = 1;
                    break;
                case 'b':
                    crntPass.x = crntRoom.x + 1 + Math.randomInt(crntRoom.w - 2);
                    crntPass.y = crntRoom.y + crntRoom.h;
                    crntPass.w = 1;
                    crntPass.h = tgetBlock.y - crntPass.y;
                    tgetPass.x = tgetRoom.x + 1 + Math.randomInt(tgetRoom.w - 2);
                    tgetPass.y = tgetBlock.y;
                    tgetPass.w = 1;
                    tgetPass.h = tgetRoom.y - tgetBlock.y;
                    bordPass.x = Math.min(crntPass.x, tgetPass.x);
                    bordPass.y = tgetBlock.y - 1;
                    bordPass.w = Math.max(crntPass.x, tgetPass.x) - bordPass.x + 1;
                    bordPass.h = 1;
                    break;
                case 'l':
                    crntPass.x = crngBlock.x - 1;
                    crntPass.y = crntRoom.y + 1 + Math.randomInt(crntRoom.h - 2);
                    crntPass.w = crntRoom.x - crntPass.x;
                    crntPass.h = 1;
                    tgetPass.x = tgetRoom.x + tgetRoom.w;
                    tgetPass.y = tgetRoom.y + 1 + Math.randomInt(tgetRoom.h - 2);
                    tgetPass.w = crntPass.x - tgetRoom.x - tgetRoom.w;
                    tgetPass.h = 1;
                    bordPass.x = crngBlock.x - 1;
                    bordPass.y = Math.min(crntPass.y, tgetPass.y);
                    bordPass.w = 1;
                    bordPass.h = Math.max(crntPass.y, tgetPass.y) - bordPass.y + 1;
                    break;
                case 'r':
                    crntPass.x = crntRoom.x + crntRoom.w
                    crntPass.w = tgetBlock.x - 1 - crntRoom.x - crntRoom.w
                    crntPass.y = crntRoom.y + 1 + Math.randomInt(crntRoom.h - 2);
                    crntPass.h = 1;
                    tgetPass.x = tgetBlock.x - 1;
                    tgetPass.y = tgetRoom.y + 1 + Math.randomInt(tgetRoom.h - 2);
                    tgetPass.w = tgetRoom.x - tgetPass.x;
                    tgetPass.h = 1;
                    bordPass.x = tgetBlock.x - 1;
                    bordPass.y = Math.min(crntPass.y, tgetPass.y);
                    bordPass.w = 1;
                    bordPass.h = Math.max(crntPass.y, tgetPass.y) - bordPass.y + 1;
                    break;
                }
                this._passes.push(crntPass);
                this._passes.push(tgetPass);
                this._passes.push(bordPass);
            }, this);
        }
    }
    this._passes.forEach(function(pass) {
        for (var y = 0; y < pass.h; y++) {
            for (var x = 0; x < pass.w; x++) {
                this._symbolMap[pass.x + x][pass.y + y] = 'pass';
            }
        }
    }, this);
};

// ブロック分割：ランダム
Game_MapGeneratorRoomAndPass.prototype.splitBlock = function(block) {
    if (this.randBool(0.5)) {
        if (this.isSplitableH(block)) {
            this.splitBlockH(block);
        }
        if (this.isSplitableV(block)) {
            this.splitBlockV(block);
        }
    } else {
        if (this.isSplitableV(block)) {
            this.splitBlockV(block);
        }
        if (this.isSplitableH(block)) {
            this.splitBlockH(block);
        }
    }
};

//ブロック分割：横分割
Game_MapGeneratorRoomAndPass.prototype.splitBlockH = function(block) {
    var width1 = 0;
    var width2 = 0;
    while (width1 < this._minBlockSize || width2 < this._minBlockSize) {
        width1 = Math.floor(block.w / 4 + block.w * Math.random() / 2);
        width2 = block.w - width1 - 1;
    }
    block.w = width1;
    var newBlock = {x:block.x + width1 + 1, y:block.y, w:width2, h:block.h};
    this._blocks.push(newBlock);
    this.splitBlock(block);
    this.splitBlock(newBlock);
};

// ブロック分割：縦分割
Game_MapGeneratorRoomAndPass.prototype.splitBlockV = function(block) {
    var height1 = 0;
    var height2 = 0;
    while (height1 < this._minBlockSize || height2 < this._minBlockSize) {
        height1 = Math.floor(block.h / 4 + block.h * Math.random() / 2);
        height2 = block.h - height1 - 1;
    }
    block.h = height1;
    var newBlock = {x:block.x, y:block.y + height1 + 1, w:block.w, h:height2};
    this._blocks.push(newBlock);
    this.splitBlock(block);
    this.splitBlock(newBlock);
};

// ブロック分割可能判定：部屋数
Game_MapGeneratorRoomAndPass.prototype.isSplitableByRoomNum = function() {
    if (this._blocks.length >= this._maxRooms) {
        return false;
    }
    if (this._blocks.length >= this._minRooms &&
        this.randBool((this._blocks.length - this._minRooms + 1) / (this._maxRooms - this.minRooms + 1)))
    {
        return false;
    }
    return true;
};

// ブロック分割可能判定：横分割
Game_MapGeneratorRoomAndPass.prototype.isSplitableV = function(block) {
    return (block.h > (this._minRoomSize + 2) * 2 + 1) && this.isSplitableByRoomNum();
};

// ブロック分割可能判定：縦分割
Game_MapGeneratorRoomAndPass.prototype.isSplitableH = function(block) {
    return (block.w > (this._minRoomSize + 2) * 2 + 1) && this.isSplitableByRoomNum();
};

// 座標によって部屋を取得
Game_MapGeneratorRoomAndPass.prototype.roomByXY = function(x, y) {
    this._rooms.forEach(function(room) {
        if (room.x <= x && x <= room.x + room.w && room.y <= y && y <= room.y + room.h) {
            return result = room;
        }
    }, this);
    return undefined;
};

//-----------------------------------------------------------------------------
// Game_Map
//
// マップクラス

// マップクラスの初期化
Sanshiro.Game_MapGenerator.Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    Sanshiro.Game_MapGenerator.Game_Map_initialize.call(this);
};

// マップクラスのセットアップ
Sanshiro.Game_MapGenerator.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Sanshiro.Game_MapGenerator.Game_Map_setup.call(this, mapId)
    this._mapGenerator = null;
};

// マップクラスのタイルID
Sanshiro.Game_MapGenerator.Game_Map_tileId = Game_Map.prototype.tileId
Game_Map.prototype.tileId = function(x, y, z) {
    if (!!this._mapGenerator && this._mapGenerator.isReady()) {
        return this._mapGenerator.tileId(x, y, z);
    } else {
        return Sanshiro.Game_MapGenerator.Game_Map_tileId.call(this, x, y, z);
    }
};

// マップクラスのマップデータ
Sanshiro.Game_MapGenerator.Game_Map_data = Game_Map.prototype.data
Game_Map.prototype.data = function() {
    if (!!this._mapGenerator && this._mapGenerator.isReady()) {
        return this._mapGenerator.data();
    } else {
        return Sanshiro.Game_MapGenerator.Game_Map_data.call(this);
    }
};

// マップクラスのマップ自動生成
Game_Map.prototype.generateMap = function(mapType) {
    mapType = mapType || 'FillRoom';
    switch (mapType) {
    case 'RoomAndPass':
        this._mapGenerator = new Game_MapGeneratorRoomAndPass();
        break;
    case 'FillRoom':
        this._mapGenerator = new Game_MapGenerator();
        break;
    }
    this._mapGenerator.setup();
    if (Imported.SAN_AnalogMove) {
        Game_CollideMap.setup();
    }
};

//-----------------------------------------------------------------------------
// Game_Event
//
// イベントクラス

// イベントクラスの初期化
Sanshiro.Game_MapGenerator.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    this._dataEventId = eventId;
    Sanshiro.Game_MapGenerator.Game_Event_initialize.call(this, mapId, eventId);
};

// イベントクラスのデータベースのイベントデータ
Game_Event.prototype.event = function() {
    return $dataMap.events[this._dataEventId];
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// インタープリタークラス

// プラグインコマンド
Sanshiro.Game_MapGenerator.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Sanshiro.Game_MapGenerator.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'MapGenerator') {
        $gameMap.generateMap(args[0]);
    }
};
