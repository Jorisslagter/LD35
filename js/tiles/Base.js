define([
  './Tile',
  './Building',
  'jig/shapes/Quad',
  '../components/Hitable'
],
function(Tile,
         Building,
         Quad,
         Hitable) {
  var Base = function() {
    this._super([], [Hitable]);
    
    this.hitRadius = Tile.SIZE / 2;
    this.hitType = 'ally';
    
    this.addChild(new Quad(0xffff00, Tile.SIZE, Tile.SIZE));
    
    this.health = this.maxHealth = 1000;
  };
  
  extend(Base, Building);
  
  Base.prototype.ruin = function() {
    
  };
  
  return Base;
});
