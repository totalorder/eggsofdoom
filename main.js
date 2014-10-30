"use strict";

require(["pixi", "underscore", "loop", "input", "tiles", "player", "animation", "world"],
    function (PIXI, _, loop, input, tiles, player, animation, world) {

    var loader = new PIXI.AssetLoader(["penguin.png", "tile.png", "tile_hard.png"]);
    loader.onComplete = function() {
    
        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);    
                
        // create a renderer instance.
        var renderer = PIXI.autoDetectRenderer(400, 300);
    
        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

        var levelBuilder = new tiles.LevelBuilder();
        var mapContainer = new PIXI.DisplayObjectContainer();
        var map = levelBuilder.createMap(mapContainer, 32);

        var gameWorld = world.World(map);

        // render the tilemap to a render texture
        var mapTexture = new PIXI.RenderTexture(renderer.width, renderer.height);
        mapTexture.render(mapContainer);

        // create a single background sprite with the texture
        var background = new PIXI.Sprite(mapTexture);

        // add the background to the stage
        stage.addChild(background);

        // create a texture from an image path
        var texture = new PIXI.Texture.fromImage("penguin.png");

        // create a new Sprite using the texture
        var bunny = new PIXI.Sprite(texture);

        // center the sprites anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        stage.addChild(bunny);

        var keys = input.keyMapping;
        var inputDevice = new input.InputDevice([keys.LEFT, keys.RIGHT, keys.UP, keys.DOWN]);
        var playerAnimationSet = new animation.AnimationSet(texture, 40, 40, {'idle': {'start': 0, 'end': 2}});
        var players = [];
        players.push(new player.Player(0, 0, 0, bunny, playerAnimationSet));

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