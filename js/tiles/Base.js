define([
  './Tile',
  'jig/shapes/Quad'
],
function(Tile,
         Quad) {
  var Base = function() {
    this._super();
    
    this.addChild(new Quad(0xffff00, Tile.SIZE, Tile.SIZE));
  };
  
  extend(Base, Tile);
  
  return Base;
});
