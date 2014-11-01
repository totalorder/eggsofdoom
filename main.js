"use strict";

require(["pixi", "underscore", "loop", "input", "tiles", "player", "animation", "world"],
    function (PIXI, _, loop, input, tiles, player, animation, world) {

    var loader = new PIXI.AssetLoader(["penguin.png", "tile.png", "tile_hard.png"]);
    loader.onComplete = function() {
        var tileSize = 32;
        var mapContainer = new PIXI.DisplayObjectContainer();
        var map = new tiles.Map(
            [[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
             [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 3, 3, 3, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3],
             [3, 2, 3, 3, 3, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 3, 3, 3, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3],
             [3, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3],
             [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3],
             [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]],
            mapContainer, tileSize);

        var gameWorld = world.World(map);

        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);

        // create a renderer instance.
        var renderer = PIXI.autoDetectRenderer(map.width * tileSize, map.height * tileSize);

        var mapTexture = new PIXI.RenderTexture(renderer.width, renderer.height);
        mapTexture.render(mapContainer);
        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

        var background = new PIXI.Sprite(mapTexture);
        // add the background to the stage
        stage.addChild(background);

        // create a texture from an image path
        var playerTexture = new PIXI.Texture.fromImage("penguin.png");

        // create a new Sprite using the texture
        var playerSprite = new PIXI.Sprite(playerTexture);

        // center the sprites anchor point
        playerSprite.anchor.x = 0.5;
        playerSprite.anchor.y = 0.7;
        stage.addChild(playerSprite);

        var keys = input.keyMapping;
        var inputDevice = new input.InputDevice([keys.LEFT, keys.RIGHT, keys.UP, keys.DOWN]);
        var playerAnimationSet = new animation.AnimationSet(playerTexture, 40, 40, {'idle': {'start': 0, 'end': 2}});
        var players = [];
        players.push(new player.Player(0, 50, 50, playerSprite, playerAnimationSet));

        var gameLoop = new loop.Loop(30, function(dt) {
            _.forEach(players, function(player) {
                player.update(dt, inputDevice.keysDown, gameWorld);
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
    loader.load();
});