"use strict";

require(["pixi", "underscore", "loop", "input", "tiles", "player", "animation"],
        function (PIXI, _, loop, input, tiles, player, animation) {
    var levelBuilder = new tiles.LevelBuilder();
    levelBuilder.createMap();

    var loader = new PIXI.AssetLoader(["penguin.png"]);
    loader.onComplete = function() {
        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);

        // create a renderer instance.
        var renderer = PIXI.autoDetectRenderer(400, 300);

        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

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
    loader.load();
});