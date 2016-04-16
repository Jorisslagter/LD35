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
    
    this.health = this.maxHealth = 1000;
  };
  
  extend(Base, Building);
  
  return Base;
});
