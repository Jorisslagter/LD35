define([
  'jig/shapes/Circle',
  '../Tile',
  './Tower'
],
function(Circle,
         Tile,
         Tower,
         SquareTower) {
  var CircleTower = function() {
    Tower.call(this);
    
    this.name = "Circle Tower";
    
    this.build({
      body: {
        is: new Circle(0xffaa00, (Tile.SIZE / 2) * 0.8)
      }
    });
  };
  
  extend(CircleTower, Tower);
  
  return CircleTower;
});
