define(["./Projectile"], function (Projectile) {
    var Rocket = function (start, dest) {
        this._super([start, dest, 5, 2000, 25]);

    }
    extend(Rocket, Projectile);


    return Rocket;

});