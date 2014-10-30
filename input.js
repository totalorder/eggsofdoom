"use strict";

define(["underscore"], function() {
    var keyMapping = {
        'LEFT' : 37,
        'RIGHT' : 39,
        'UP' : 38,
        'DOWN': 40
    };

    var InputDevice = function (keys) {
        var keysDown = {};
        _.forEach(keys, function(key) {
            keysDown[key] = false;
        });

        document.addEventListener('keydown', function(event) {
            if(keysDown[event.keyCode] !== undefined) {
                keysDown[event.keyCode] = true;
            }
        });

        document.addEventListener('keyup', function(event) {
            if(keysDown[event.keyCode] !== undefined) {
                keysDown[event.keyCode] = false;
            }
        });

        return {
            keysDown : keysDown
        }
    };

    return {
        InputDevice : InputDevice,
        keyMapping: keyMapping
    }
});

