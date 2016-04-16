define([
    "./Projectile",
    "jig/shapes/Quad"
], function (
    Projectile,
    Quad
) {
    var Bullet = function (weapon, start, dest) {
        this._super([weapon, start, dest, 200, 1, 5]);

        var bullet = new Quad(0xffffff, 2, 2);
        this.addChild(bullet);

    }
    extend(Bullet, Projectile);;


    return Bullet;

});