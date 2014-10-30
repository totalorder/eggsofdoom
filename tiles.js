"use strict";

define(["pixi"], function (PIXI) {
    var LevelBuilder = function () {
        var levelSize = 64,

        Tile = function(mapContainer, tileSize, type, x, y) {
            var sprite;
            if (type === 2) {
                sprite = PIXI.Sprite.fromImage("tile.png");
            } else if (type === 3) {
                sprite = PIXI.Sprite.fromImage("tile_hard.png")
            } else {
                throw "Unknown type! " + type;
            }
            sprite.x = x * tileSize;
            sprite.y = y * tileSize;
            sprite.width = tileSize;
            sprite.height = tileSize;
            mapContainer.addChild(sprite);

            var isPassable = function() {
                return type !== 3;
            };
            return {
                isPassable: isPassable,
                x: x,
                y: y
            }
        },
        
        createMap = function (mapContainer, tileSize) {
            var map = [
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],    
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],    
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],    
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],    
                [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3],
            ];

            for(var rowNum = 0; rowNum < map.length; rowNum++) {
                var row = map[rowNum];
                for(var colNum = 0; colNum < row.length; colNum++) {
                    map[rowNum][colNum] = new Tile(mapContainer, tileSize, map[rowNum][colNum], rowNum, colNum);
                }
            }
            return map;
        };
       
        return {
            createMap: createMap        
        };
    };  
    return {
        LevelBuilder: LevelBuilder
    };
});