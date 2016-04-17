define([
    "jig/Container",
    "jig/Vector",
    "../tiles/Tile",
    "../components/Health"],
    function (
        Container,
        Vector,
        Tile,
        Health
    ) {
    var Enemy = function (container, x, y) {
        Container.call(this);
        
        this.addComponent(Health);

        this.x = x * Tile.SIZE;
        this.y = y * Tile.SIZE;

        this.speed = 20;

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
      if(this.body) {
        var position = new Vector(this.x, this.y);

        var rotation = position.getAngleTo(tile);
        this.body.rotation = rotation;
      }
    }

    Enemy.prototype.aimTo = function(target) {
        if(this.weapon) {
            var position = new Vector(this.x, this.y);

            var rotation = position.getAngleTo(target);
            this.weapon.rotation = rotation;
        }

    }

    Enemy.prototype.setGoal = function(dest) {
        this.dest = dest;
    }


    Enemy.prototype.update = function (delta) {

        var position = new Vector(this.x, this.y);

        if(position.getDistanceTo(this.dest) <= (this.width / 2  + this.dest.width / 2)) {
            this.dest.hit(1);
            this.ruin();
        }

        if(this.dest) {
            this.moveTo(this.dest);
            this.lookAt(this.dest);
            this.aimTo(this.dest);

            this.x += this.vx * this.speed * delta;
            this.y += this.vy * this.speed  * delta;

        }

        if(this.canShoot()) {
            this.shoot();
        }

    }

    Enemy.prototype.hit = function(hp) {
        this.health -= hp;

        console.log(hp +" hit");

        if(this.health <= 0) {
            this.ruin();
        }

    }

    Enemy.prototype.ruin = function() {
        if(this.health == 0) {
            return;
        }

        this.health = 0;
        if(this.parent) {
            this.parent.entities.splice(this.parent.entities.indexOf(this), 1);
            this.parent.removeChild(this);
        }

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
