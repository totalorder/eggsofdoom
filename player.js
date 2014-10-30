"use strict";

define(["input"], function (input) {
    var Player = function (id, x, y, sprite, animationSet) {
        var currentAnimation = 'idle';
        var width = 10;
        var height = 10;

        var update = function(dt, keysDown, world) {
            var newX = x,
                newY = y;
            if (keysDown[input.keyMapping.LEFT]) {
                newX -= 100 * dt;
            }
            if (keysDown[input.keyMapping.RIGHT]) {
                newX += 100 * dt;
            }

            if (keysDown[input.keyMapping.UP]) {
                newY -= 100 * dt;
            }
            if (keysDown[input.keyMapping.DOWN]) {
                newY += 100 * dt;
            }
            var newPos = world.move(width, height, x, y, newX, newY);
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


