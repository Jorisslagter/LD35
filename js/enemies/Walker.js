define(["./Enemy", 'jig/shapes/Quad'], function (Enemy, Quad) {
    var Walker = function (x, y) {
        this._super([x, y]);

        var body = new Quad(0xff2222, 25, 25);
        this.addChild(body);

    }
    extend(Walker, Enemy);


    return Walker;

});