define([
    "jig/Container",
    "jig/Vector",
    "../tiles/Tile",
    "../components/Hitable",
    "../components/Health",
    "../explosions/Explosion"
    ],
    function (
        Container,
        Vector,
        Tile,
        Hitable,
        Health,
        Explosion
    ) {
    var Enemy = function (container, x, y) {
        Container.call(this);
        
        this.addComponents([Health, Hitable]);
        
        this.hitType = 'enemy';
        this.hitRadius = 10;

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

    Enemy.prototype.death = function() {
      this.ruin();    

    }

    Enemy.prototype.ruin = function() {
        if(this.health == 0) {
            return;
        }

        this.health = 0;
        if(this.parent) {
            this.parent.addChild(new Explosion(this, 100, 1));

            this.parent.entities.splice(this.parent.entities.indexOf(this), 1);
            this.parent.removeChild(this);
        }

    }

    Enemy.prototype.equipWeapon = function(weapon) {
        this.weapon = weapon;
        this.weapon.hitTypes = ['ally'];

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
