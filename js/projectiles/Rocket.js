define([
    "./Projectile",
    "jig/shapes/Quad"
], function (
    Projectile,
    Quad
) {
    var Rocket = function (weapon) {
        this._super([weapon]);

        this.speed = 250;
        this.hitRadius = 25;
        this.damage = 50;

        var bullet = new Quad(0xffffff, 8, 8);
        this.addChild(bullet);

    }
    extend(Rocket, Projectile);


    return Rocket;

});
