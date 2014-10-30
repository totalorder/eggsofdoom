"use strict";

define(["input"], function (input) {
    var Player = function (id, x, y, sprite, animationSet) {
        var currentAnimation = 'idle';

        var update = function(dt, keysDown) {
            if (keysDown[input.keyMapping.LEFT]) {
                x -= 100 * dt;
            }
            if (keysDown[input.keyMapping.RIGHT]) {
                x += 100 * dt;
            }

            if (keysDown[input.keyMapping.UP]) {
                y -= 100 * dt;
            }
            if (keysDown[input.keyMapping.DOWN]) {
                y += 100 * dt;
            }

            sprite.position.x = x;
            sprite.position.y = y;
        };

        var render = function(dt) {
            var animation = animationSet.animations[currentAnimation];
            sprite.setTexture(animation.getCurrentFrameTexture(dt));
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


