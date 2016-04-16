define([
  'jig/shapes/Polygon',
  '../Tile',
  './Tower'
],
function(Polygon,
         Tile,
         Tower,
         CircleTower) {
  var TriangleTower = function() {
    Tower.call(this);
    
    this.name = "Triangle Tower";
    
    var size = (Tile.SIZE/2) * 0.8;
    
    this.build({
      body: {
        is: new Polygon(0x00aaff, [0, -size, -size, size, size, size])
      }
    });
  };
  
  extend(TriangleTower, Tower);
  
  return TriangleTower;
});
