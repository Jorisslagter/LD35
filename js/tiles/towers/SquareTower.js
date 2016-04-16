define([
  'jig/shapes/Quad',
  '../Tile',
  './Tower'
],
function(Quad,
         Tile,
         Tower,
         TriangleTower) {
  var SquareTower = function() {
    Tower.call(this);
    
    this.name = "Square Tower";
    
    this.build({
      body: {
        is: new Quad(0x00ffaa, Tile.SIZE * 0.8, Tile.SIZE * 0.8)
      }
    });
  };
  
  extend(SquareTower, Tower);
  
  return SquareTower;
});
