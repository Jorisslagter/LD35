define([
  './Tile',
  './Building',
  'jig/shapes/Quad'
],
function(Tile,
         Building,
         Quad) {
  var Base = function() {
    this._super();
    
    this.addChild(new Quad(0xffff00, Tile.SIZE, Tile.SIZE));
  };
  
  extend(Base, Building);
  
  return Base;
});
