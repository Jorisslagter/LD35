define(["./Weapon", "../projectiles/Bullet", "jig/shapes/Quad"], function (Weapon, Bullet, Quad) {
    var Pistol = function () {
        this._super();
        // Graphics

        this.setProjectile(Bullet);
        this.setCooldown(1);

        var gun = new Quad(0x0000FF, 15, 3);
        this.addChild(gun);
    }
    extend(Pistol, Weapon);

    // Pistol.prototype.update = function (delta) {
    //
    // }



    return Pistol;

});