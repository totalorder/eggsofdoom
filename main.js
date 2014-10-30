"use strict";

require(["pixi", "underscore", "loop", "input", "tiles", "player", "animation"],
    function (PIXI, _, loop, input, tiles, player, animation) {

    var loader = new PIXI.AssetLoader(["penguin.png", "tile.png", "tile_hard.png"]);
    loader.onComplete = function() {
    
        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);    
                
        // create a renderer instance.
        var renderer = PIXI.autoDetectRenderer(400, 300);
    
        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

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

        // create a texture from an image path
        var tex = new PIXI.Texture.fromImage("penguin.png");

        var texture = new PIXI.Texture(tex, new PIXI.Rectangle(0,0,40,40));

        // create a new Sprite using the texture
        var bunny = new PIXI.Sprite(texture);

        // center the sprites anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        stage.addChild(bunny);

        var keys = input.keyMapping;
        var inputDevice = new input.InputDevice([keys.LEFT, keys.RIGHT, keys.UP, keys.DOWN]);
        var playerAnimationSet = new animation.AnimationSet(tex, 40, 40, {'idle': {'start': 0, 'end': 2}});
        var players = [];
        players.push(new player.Player(0, 0, 0, bunny, playerAnimationSet));

        var gameLoop = new loop.Loop(30, function(dt) {
            _.forEach(players, function(player) {
                player.update(dt, inputDevice.keysDown);
            });
        });

        var startTime = new Date().getTime();
        var lastStartTime = startTime;
        var render = function() {
            lastStartTime = startTime;
            startTime = new Date().getTime();
            var dt = (startTime - lastStartTime) / 1000;
            requestAnimFrame(render);
            _.forEach(players, function(player) {
                player.render(dt);
            });
            renderer.render(stage);
        };

        requestAnimFrame(render);

        gameLoop.start();
    };
});