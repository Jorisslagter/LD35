define([
  'jig/shapes/Quad',
  'jig/Vector',
  './Tile'
],
function(Quad,
         Vector,
         Tile) {
  var Tower = function() {
    this._super();
    
    this.addChild(new Quad(0xffff00, Tile.SIZE, Tile.SIZE));
    
    this.distance = 300;
    this.target = null;
  };
  
  extend(Tower, Tile);
  
  Tower.prototype.locateTarget = function() {
    if(this.map) {
      for(var i in this.map.entities) {
        var entity = this.map.entities[i];
        
        if(new Vector(this.x - entity.x, this.y - entity.y).length() < this.distance) {
          this.target = entity;
          return;
        }
      }
    }
  };
  
  Tower.prototype.attack = function() {
    
  };
  
  Tower.prototype.update = function(delta) {
    if(this.target) {
      if(new Vector(this.x - this.target.x, this.y - this.target.y) > this.distance) {
        this.target = null;
      } else {
        this.attack();
      }
    } else {
      this.locateTarget();
    }
  };
  
  return Tower;
});
