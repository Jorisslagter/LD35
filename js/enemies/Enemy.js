define(["jig/Container", "../tiles/Tile"], function (Container, TILE) {
    var Enemy = function (x, y) {
        Container.call(this);

        this.x = x * TILE.SIZE;
        this.y = y * TILE.SIZE;

    }
    extend(Enemy, Container);

    Enemy.prototype.update = function (delta) {

    }

    return Enemy;

});