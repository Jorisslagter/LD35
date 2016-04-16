define(["jig/Container", "../tiles/Tile"], function (Container, TILE) {
    var Enemy = function (x, y) {
        Container.call(this);

        this.x = x * TILE.SIZE;
        this.y = y * TILE.SIZE;

        this.speed = 1;
        this.health = 100;

        this.vx = 0;
        this.vy = 0;
    }
    extend(Enemy, Container);

    Enemy.prototype.moveTo = function(tile) {
        var dx = tile.x - this.x;
        var dy = tile.y - this.y;

        // How whould I implement moveTo?

        this.vx = dx;
        this.vy = dy;
    }

    Enemy.prototype.lookAt = function(tile) {


    }

    Enemy.prototype.setGoal = function(dest) {
        this.dest = dest;
    }

    Enemy.prototype.update = function (delta) {

        if(this.dest) {
            this.moveTo(this.dest);

            this.x += this.vx * delta;
            this.y += this.vy * delta;

        }

    }

    Enemy.prototype.hit = function(hp) {
        this.health -= hp;

        if(this.health <= 0) {
            this.ruin();
        }

    }

    Enemy.prototype.ruin = function() {
        this.parent.removeChild(this);

    }

    return Enemy;

});