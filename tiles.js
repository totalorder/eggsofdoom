"use strict";

define(["pixi"], function (PIXI) {
    var Tile = function(mapContainer, tileSize, type, x, y) {
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

    Map = function(mapDesign, mapContainer, tileSize) {
        var map = [];
        for(var rowNum = 0; rowNum < mapDesign.length; rowNum++) {
            var designRow = mapDesign[rowNum];
            var row = [];
            for(var colNum = 0; colNum < designRow.length; colNum++) {
                row.push(new Tile(mapContainer, tileSize, mapDesign[rowNum][colNum], colNum, rowNum));
            }
            map.push(row);
        }

        var getTileAtPosition = function(x, y) {
            return map[Math.floor(y / tileSize)][Math.floor(x / tileSize)];
        };

        return {
            getTileAtPosition : getTileAtPosition
        }
    };

    return {
        Map: Map
    };
});