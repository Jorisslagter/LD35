define(["jig/Container", "jig/Vector"], function (Container, Vector) {

    var Projectile = function(start, dest, speed, dmg, radius) {
        Container.call(this);

        this.x = start.x;
        this.y = start.y;

        var direction = start.getDirectionTo(dest);
        this.dx = direction.x;
        this.dy = direction.y;

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
        if(position.getDistanceTo(this.dest) <= 0) {
            this.ruin();

            this.dest.hit(this.damage);

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