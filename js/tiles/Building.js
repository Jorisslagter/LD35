define([
  './Tile',
  '../components/Health'
],
function(Tile,
         Health) {
  var Building = function() {
    Tile.call(this);
    this.addComponent(Health);
    
    this.health = this.maxHealth = 100;
  };
  
  extend(Building, Tile);
  
  Building.prototype.death = function() {
    this.parent.removeChild(this);
  };
  
  return Building;
});
