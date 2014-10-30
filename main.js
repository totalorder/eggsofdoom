<<<<<<< HEAD
require(["pixi", "tiles"], function (PIXI, tiles) {
    var levelBuilder = new tiles.LevelBuilder();
    var level = levelBuilder.createMap();
    
=======
"use strict";

require(["pixi", "underscore", "loop", "input"], function (PIXI, _, loop, input) {
>>>>>>> abc4769303d48361b560b7bf41c81c1c6c14191f
    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x66FF99);

    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(400, 300);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    requestAnimFrame( animate );

    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("penguin.png");
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // move the sprite t the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);
    
    function animate() {
        requestAnimFrame( animate );

        // just for fun, lets rotate mr rabbit a little
        // bunny.rotation += 0.1;

        // render the stage
        renderer.render(stage);
    }
    var keys = input.keyMapping;
    var inputDevice = new input.InputDevice([keys.LEFT, keys.RIGHT, keys.UP, keys.DOWN]);

    var gameLoop = new loop.Loop(30, function(dt) {
        if (inputDevice.keysDown[keys.LEFT]) {
            bunny.position.x -= 100 * dt;
        }
        if (inputDevice.keysDown[keys.RIGHT]) {
            bunny.position.x += 100 * dt;
        }

        if (inputDevice.keysDown[keys.UP]) {
            bunny.position.y -= 100 * dt;
        }
        if (inputDevice.keysDown[keys.DOWN]) {
            bunny.position.y += 100 * dt;
        }
    });

    gameLoop.start();
});