"use strict";

define(["input", "pixi", "animation"], function (input, PIXI, animation) {
    var Egg = function (id, x, y, stage) {
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
        var texture = new PIXI.Texture.fromImage("egg.png");
        var sprite = function() {
            // create a new Sprite using the texture            
            var eggSprite = new PIXI.Sprite(texture);
            // center the sprites anchor point
            eggSprite.anchor.x = 0.5;
            eggSprite.anchor.y = 0.5;
            return eggSprite;
        }();
        var animationSet = function() {                                     
            
            stage.addChild(sprite);
            var eggAnimationSet = new animation.AnimationSet(texture, 40, 40, {'idle': {'start': 0, 'end': 2}});
            
            return eggAnimationSet;
        }();
        var update = function(dt, keysDown, world) {
        };

        var render = function(dt) {
            var animation = animationSet.animations[currentAnimation];
            var newFrameTexture = animation.getNewFrameTexture(dt);
            if (newFrameTexture) {
                sprite.setTexture(newFrameTexture);
            }
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
        'Egg': Egg
    }
});


