"use strict";

require(["pixi", "underscore", "loop", "input", "tiles"], function (PIXI, _, loop, input, tiles) {
   
    
    var assetsToLoader = ["tile.png", "tile_hard.png"];

	// create a new loader
	var loader = new PIXI.AssetLoader(assetsToLoader);

	// use callback
	loader.onComplete = onAssetsLoaded;

	
    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x66FF99);
    
    //begin load
	loader.load();
    
    function onAssetsLoaded()
	{
        var levelBuilder = new tiles.LevelBuilder();
        var levelMap = levelBuilder.createMap();
        // your tilemap container
        var mapContainer = new PIXI.DisplayObjectContainer();        
        
        // ... add all the sprites to the container
        for (var y = 0; y < levelMap.length; y++) {
            for (var x = 0; x < levelMap[y].length; x++) {
                if (parseInt(levelMap[y][x]) == 2) {
                    var tile = PIXI.Sprite.fromImage("tile.png");
                }
                if (parseInt(levelMap[y][x]) == 3) {
                    var tile = PIXI.Sprite.fromImage("tile_hard.png")
                }
                tile.x = x * 64;
                tile.y = y * 64;
                mapContainer.addChild(tile);
            }
        }
        // render the tilemap to a render texture
        var mapTexture = new PIXI.RenderTexture();
        mapTexture.render(mapContainer);

        // create a single background sprite with the texture
        var background = new PIXI.Sprite(mapTexture);

        // add the background to the stage
        stage.addChild(background);
    }
    
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