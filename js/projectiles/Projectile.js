define(["jig/Container", "jig/Vector"], function (Container, Vector) {

    var Projectile = function(start, dest, speed, dmg, radius) {
        Container.call(this);

        this.x = start.x;
        this.y = start.y;

        this.dx = 1;
        this.dy = 0;

        this.dest = dest;

        this.speed = speed;

        this.damage = dmg;

        this.blastRadius = radius;
        
        this.rotation = start.getAngleTo(dest);


    }

    extend(Projectile, Container);

    Projectile.prototype.update = function(delta) {

        this.x += this.dx * this.speed * delta;
        this.y += this.dy * this.speed * delta;

        var position = new Vector(this.x, this.y);
        var distance = position.getDistanceTo(this.dest);
        if(distance <= this.blastRadius / 2 + this.dest.width / 2 ) {
            this.dest.hit(this.damage);
            this.ruin();

            if(this.blastRadius) {
                // Do some checks
            }
        }

    }

    Projectile.prototype.ruin = function() {
        // Play sound
        this.parent.removeChild(this);

    }

    return Projectile;
});