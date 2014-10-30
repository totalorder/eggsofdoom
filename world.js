"use strict";

define(function () {
    var World = function (map) {
        var move = function(width, height, x1, y1, x2, y2) {
            console.log(Math.floor(x1/32), Math.floor(y1/32));
            var tile = map[Math.floor(x1/32)][Math.floor(y1/32)];
            if (tile.isPassable()) {
                return {'x': x2, 'y': y2};
            } else {
                return {'x': x1, 'y': y1};
            }
        };

        return {
            'move': move
        }
    };

    return {
        'World': World
    }
});


