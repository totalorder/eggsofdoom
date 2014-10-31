"use strict";

define(function () {
    var World = function (map) {
        var move = function(width, height, x1, y1, x2, y2) {
            if (map.getTileAtPosition(x2, y2).isPassable()) {
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


