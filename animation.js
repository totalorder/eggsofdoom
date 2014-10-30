"use strict";

define(["pixi", "underscore"], function (PIXI, _) {
    var Animation = function (animationSpeed, frames) {
        var currentFrame = 0;
        var getCurrentFrameTexture = function (dt) {
            currentFrame = (currentFrame + dt * animationSpeed) % frames.length;
            return frames[Math.floor(currentFrame)];
        };

        return {
            getCurrentFrameTexture: getCurrentFrameTexture
        }
    };

    var AnimationSet = function (texture, frameWidth, frameHeight, animationsConfig) {
        var animations = {};

        _.forEach(animationsConfig, function(config, animationName) {
            var frames = [];
            for(var i = config.start; i <= config.end; i++) {
                console.log([i % (texture.width / frameWidth) * frameWidth,
                    Math.floor(i / (texture.width / frameWidth)) * frameHeight, frameWidth, frameHeight]);
                frames.push(new PIXI.Texture(texture, new PIXI.Rectangle(
                    (i % (texture.width / frameWidth)) * frameWidth,
                    Math.floor(i / (texture.width / frameWidth)) * frameHeight, frameWidth, frameHeight)));
            }
            animations[animationName] = new Animation(10, frames);
        });

        return {
            animations: animations
        }
    };

    return {
        'AnimationSet': AnimationSet
    };
});


