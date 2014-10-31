"use strict";

define(["input"], function (input) {
    var Player = function (id, x, y, sprite, animationSet) {
        var currentAnimation = 'idle';
        var width = 20;
        var height = 20;
        var getBoundingBox = function() {
            return {
                'x': x - width / 2,
                'y': y - height / 2,
                'x2': x + width / 2,
                'y2': y + height / 2
            };
        };
        var update = function(dt, keysDown, world) {
            var diffY = 0,
                diffX = 0;

            if (keysDown[input.keyMapping.LEFT]) {
                diffY = -100 * dt;
            }
            if (keysDown[input.keyMapping.RIGHT]) {
                diffY = 100 * dt;
            }
            if (keysDown[input.keyMapping.UP]) {
                diffX = -100 * dt;
            }
            if (keysDown[input.keyMapping.DOWN]) {
                diffX = 100 * dt;
            }

            var newPos = world.move(getBoundingBox(), x, y, diffY, diffX);
            x = newPos.x;
            y = newPos.y;
            sprite.position.x = x;
            sprite.position.y = y;
        };

        var render = function(dt) {
            var animation = animationSet.animations[currentAnimation];
            sprite.setTexture(animation.getCurrentFrameTexture(dt)); // TODO: Should not update texture if not changed
        };

        return {
            'id': id,
            'x': x,
            'y': y,
            'render': render,
            'update': update
        }
    };

    return {
        'Player': Player
    }
});


