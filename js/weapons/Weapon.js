define(["jig/Container", "jig/Vector"], function (Container, Vector) {
    var Weapon = function() {
        Container.call(this);

        this.projectile = null;
        this.cooldownTimer = this.cooldown = 1;
        this.ROF = 1;
        this.readyToShoot = false;

        this.projectiles = [];

    }
    extend(Weapon, Container);

    Weapon.prototype.setProjectile = function(type) {
        this.projectile = type;
    }

    Weapon.prototype.setCooldown = function(cooldown){
        this.cooldown = cooldown;
    }

    Weapon.prototype.setRateOfFire = function(rateOfFire){
        this.ROF = rateOfFire;
    }

    Weapon.prototype.shoot = function(dest) {
        this.readyToShoot = false;
        this.cooldownTimer = this.cooldown;

        this.createProjectile(dest);
    }

    Weapon.prototype.createProjectile = function(dest) {
        var position = new Vector(this.x, this.y);
        var Projectile = new this.projectile(position, dest);

        this.addChild(Projectile);

        this.projectiles.push(Projectile);

    }

    Weapon.prototype.update = function(delta) {
        if(this.cooldownTimer <= 0 && !this.readyToShoot) {
            this.readyToShoot = true;
        } else {
            this.cooldownTimer -= delta;
        }
    }

    

    return Weapon;

})