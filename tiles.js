"use strict";

define(["pixi"], function (PIXI) {
    var Tile = function(mapContainer, tileSize, type, x, y) {
        var sprite;
        switch (type)
        {
            case 1:
                sprite = PIXI.Sprite.fromImage("tile_soft.png");
                break;
            case 2:
                sprite = PIXI.Sprite.fromImage("tile.png");
                break;
            case 3: 
                sprite = PIXI.Sprite.fromImage("tile_hard.png");
                break;
            default:
                throw "tile type not recognized" + type;
        }
        
        sprite.x = x * tileSize;
        sprite.y = y * tileSize;
        sprite.width = tileSize;
        sprite.height = tileSize;
        mapContainer.addChild(sprite);

        var isPassable = function() {
            return type === 2;
        };
        
        var isDestructable = function() {
            return type === 1;
        }
        
        
        return {
            isPassable: isPassable,
            x: x,
            y: y
        }
    },

    Map = function(mapDesign, mapContainer, tileSize) {
        var map = [];
        var width;
        var height = mapDesign.length;

        for(var rowNum = 0; rowNum < mapDesign.length; rowNum++) {
            var designRow = mapDesign[rowNum];
            var row = [];
            width = designRow.length;
            for(var colNum = 0; colNum < designRow.length; colNum++) {
                row.push(new Tile(mapContainer, tileSize, mapDesign[rowNum][colNum], colNum, rowNum));
            }
            map.push(row);
        }

        var getTileAtPosition = function(x, y) {
            return map[Math.floor(y / tileSize)][Math.floor(x / tileSize)];
        };

        return {
            width: width,
            height: height,
            getTileAtPosition : getTileAtPosition
        }
    };

    return {
        Map: Map
    };
});