define(["jig/Container", "jig/Vector"], function (Container, Vector) {

    var Projectile = function(weapon, start, dest, speed, dmg, radius) {
        Container.call(this);

        this.weapon = weapon;

        this.alive = true;

        this.x = start.x;
        this.y = start.y;

        var direction = new Vector(start.x, start.y).getDirectionTo(dest);
        this.dx = direction.x;
        this.dy = direction.y;

        this.dest = dest;

        this.speed = speed;

        this.damage = dmg;

        this.distanceTrafeled = 0;
        this.maxDistanceTrafeled = 500;

        this.blastRadius = radius;
        
        this.rotation = start.getAngleTo(dest);


    }

    extend(Projectile, Container);

    Projectile.prototype.update = function(delta) {


        var itterations = 10;
        for(var itterate = 0; itterate <= itterations; itterate ++) {
            if(!this.alive)
                return;

            var step = this.speed / itterations;
            this.distanceTrafeled += (this.dx * step + this.dy * step) * delta;

            this.x += this.dx * step * delta;
            this.y += this.dy * step * delta;

            var position = new Vector(this.x, this.y);
            var distance = position.getDistanceTo(this.dest);
            if(distance <= this.blastRadius / 2 + this.dest.width / 2 ) {
                this.dest.hit(this.damage);
                this.ruin();

                this.alive = false;
                if(this.blastRadius) {
                    // Do some checks
                }
            }

        }

        if(this.distanceTrafeled >= this.maxDistanceTrafeled) {
            this.ruin();

        }


    }

    Projectile.prototype.ruin = function() {
        // Play sound
        this.weapon.destroyProjectile(this);

    }

    return Projectile;
});