define([
    "./Enemy",
    "../weapons/Pistol",
    'jig/shapes/Quad',
    'jig/Vector'
], function (
    Enemy,
    Pistol,
    Quad,
    Vector
) {
    var Walker = function (x, y) {
        this._super([x, y]);

        var body = new Quad(0xff2222, 25, 25);
        this.addChild(body);

        this.rangeOfFire = 300;

        this.equipWeapon(new Pistol());
        this.weapon.position = new Vector(15, 0);
    }
    extend(Walker, Enemy);

    // Walker.prototype.update = function(delta) {
    //
    // }

    return Walker;

});