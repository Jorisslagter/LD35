define([
    "./Enemy",
    "../weapons/RocketLauncher",
    'jig/shapes/Quad',
    'jig/Vector'
], function (
    Enemy,
    RocketLauncher,
    Quad,
    Vector
) {
    var Dumper = function (container, x, y) {
        this._super([container, x, y]);

        var body = new Quad(0x22FF22, 35, 35);
        this.addChild(body);

        this.rangeOfFire = 500;
        this.speed = 50;

        this.equipWeapon(new RocketLauncher(this.container));
        this.weapon.position = new Vector(5, 0);
    }
    extend(Dumper, Enemy);

    // Walker.prototype.update = function(delta) {
    //
    // }

    return Dumper;

});