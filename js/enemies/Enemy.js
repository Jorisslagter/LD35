define([
    "jig/Container",
    "jig/Vector",
    "../tiles/Tile"],
    function (
        Container,
        Vector,
        Tile
    ) {
    var Enemy = function (container, x, y) {
        Container.call(this);

        this.x = x * Tile.SIZE;
        this.y = y * Tile.SIZE;

        this.speed = 20;
        this.health = 100;

        this.vx = 0;
        this.vy = 0;

        this.container = container;
        // this.rangeOfFire = 100;

        this.weapon = null;
    }
    extend(Enemy, Container);

    Enemy.prototype.moveTo = function(tile) {
        var position = new Vector(this.x, this.y);

        var direction = position.getDirectionTo(tile);

        this.vx = direction.x;
        this.vy = direction.y;

    }

    Enemy.prototype.lookAt = function(tile) {
        var position = new Vector(this.x, this.y);

        var rotation = position.getAngleTo(tile);
        this.rotation = rotation;

    }

    Enemy.prototype.setGoal = function(dest) {
        this.dest = dest;
    }


    Enemy.prototype.update = function (delta) {

        var position = new Vector(this.x, this.y);

        if(position.getDistanceTo(this.dest) <= 1) {
            this.dest.hit(1);
            this.ruin();
        }

        if(this.dest) {
            this.moveTo(this.dest);
            this.lookAt(this.dest);

            this.x += this.vx * this.speed * delta;
            this.y += this.vy * this.speed  * delta;

        }

        if(this.canShoot()) {
            this.shoot();
        }

    }

    Enemy.prototype.hit = function(hp) {
        this.health -= hp;

        if(this.health <= 0) {
            this.ruin();
        }

    }

    Enemy.prototype.ruin = function() {
        this.health = 0;
        
        this.parent.removeChild(this);

    }

    Enemy.prototype.equipWeapon = function(weapon) {
        this.weapon = weapon;

        this.addChild(weapon);
    }

    Enemy.prototype.canShoot = function() {
        var position = new Vector(this.x, this.y);
        if(position.getDistanceTo(this.dest) <= this.rangeOfFire &&
            this.weapon.readyToShoot) {
            return true;
        }

        return false;

    }

    Enemy.prototype.shoot = function() {
        this.weapon.shoot(this.dest);

    }


    return Enemy;

});