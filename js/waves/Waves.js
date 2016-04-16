define(["jig/Container"], function (Container) {
    var Waves = function (options, map) {
        Container.call(this);

        this.map = map;
        this.waves = [];
        this.setup(options.sequence);

    }
    extend(Waves, Container);

    Waves.prototype.setup = function(waves) {
        this.waves = waves;

    };

    Waves.prototype.getNextWave = function() {
        var next = this.waves[0];
        return next;

    };

    Waves.prototype.execute = function(next) {
        this.currentWave = next;

    };

    Waves.prototype.update = function (delta) {

        if(this.waves.length > 0) {
            if (!this.currentWave) {
                var next = this.getNextWave();
                this.execute(next);

            } else {

                if (!this.currentWave.isDoneSpawning()) {
                    this.currentWave.spawn(this.map, delta);
                }

                if (this.currentWave.isAllDead()) {
                    this.currentWave = null;
                    this.waves.splice(0, 1);

                }

            }

        }

    };

    return Waves;

});