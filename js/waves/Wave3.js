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
    var Wave3 = function() {
        Wave.call(this);

        this.add(Walker, 10);
        this.add(Dumper, 5);

    }
    
    extend(Wave3, Wave);
    
    return Wave3;

});