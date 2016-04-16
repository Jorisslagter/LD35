define([
    "./Projectile",
    "jig/shapes/Quad"
], function (
    Projectile,
    Quad
) {
    var Bullet = function (start, dest) {
        this._super([start, dest, 1000, 10]);

        var bullet = new Quad(0xffffff, 2, 2);
        this.addChild(bullet);
    }
    extend(Bullet, Projectile);;
    

    return Bullet;

});