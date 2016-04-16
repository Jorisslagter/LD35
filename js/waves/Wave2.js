define([
    "jig/Container",
    "./Wave",
    "../Enemies/Walker",
    "../Enemies/Dumper"
], function (
    Container,
    Wave,
    Walker,
    Dumper
) {
    var Wave2 = function() {
        Wave.call(this);

        this.add(Walker, 10);
        this.add(Dumper, 5);

    }
    
    extend(Wave2, Wave);
    
    return Wave2;

});