define([
    "./Projectile",
    "jig/shapes/Quad"
], function (
    Projectile,
    Quad
) {
    var Rocket = function (weapon, start, dest) {
        this._super([weapon, start, dest, 250, 50, 25]);

        var bullet = new Quad(0xffffff, 8, 8);
        this.addChild(bullet);

    }
    extend(Rocket, Projectile);


    return Rocket;

});