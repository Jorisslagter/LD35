define(["jig/Container", "../tiles/Tile"], function (Container, TILE) {
    var Enemy = function (x, y) {
        Container.call(this);

        this.x = x * TILE.SIZE;
        this.y = y * TILE.SIZE;

        this.speed = 10;
        this.health = 100;

        this.vx = 0;
        this.vy = 0;
    }
    extend(Enemy, Container);

    Object.defineProperties(Enemy.prototype, {

    });

    Enemy.prototype.getDistanceTo = function(tile) {
        var dx = tile.x - this.x;
        var dy = tile.y - this.y;

        var length = Math.sqrt(dx * dx + dy * dy);

        return length;

    }

    Enemy.prototype.getDirectionTo = function(tile) {
        var dx = tile.x - this.x;
        var dy = tile.y - this.y;

        var length = this.getDistanceTo(tile);

        var x = dx / length;
        var y = dy / length;

        return {x: x, y:  y};

    }

    Enemy.prototype.moveTo = function(tile) {
        var direction = this.getDirectionTo(tile);

        this.vx = direction.x;
        this.vy = direction.y;

    }

    Enemy.prototype.lookAt = function(tile) {
        

    }

    Enemy.prototype.setGoal = function(dest) {
        this.dest = dest;
    }

    Enemy.prototype.update = function (delta) {

        if(this.dest) {
            this.moveTo(this.dest);

            this.x += this.vx * this.speed * delta;
            this.y += this.vy * this.speed  * delta;

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