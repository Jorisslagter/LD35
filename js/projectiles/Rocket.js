define(["./Projectile"], function (Projectile) {
    var Rocket = function (weapon, start, dest) {
        this._super([weapon, start, dest, 200, 20, 25]);

    }
    extend(Rocket, Projectile);


    return Rocket;

});