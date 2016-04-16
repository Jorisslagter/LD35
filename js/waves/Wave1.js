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
    var Wave1 = function() {
        Wave.call(this);

        this.add(Walker, 2);
        this.add(Dumper, 2);

    }
    
    extend(Wave1, Wave);
    
    return Wave1;

});