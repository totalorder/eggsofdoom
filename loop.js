"use strict";

define(function () {
    var Loop = function (ticksPerSecond, run) {
        var milliSecondsPerTick = (1 / ticksPerSecond) * 1000;
        var lastStartTime;
        var startTime;

        var scheduleRun = function() {
            lastStartTime = startTime;
            startTime = new Date().getTime();
            run((startTime - lastStartTime) / 1000);
            setTimeout(scheduleRun, Math.max(0, milliSecondsPerTick - (new Date().getTime() - startTime)))
        };

        var start = function() {
            lastStartTime = new Date().getTime();
            startTime = lastStartTime;
            scheduleRun();
        };

        return {
            'start': start
        }
    };

    return {
        'Loop': Loop
    }
});


