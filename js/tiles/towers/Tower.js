define([
  'jig/shapes/Circle',
  'jig/shapes/Quad',
  'jig/Vector',
  'jig/components/Schedule',
  '../Tile'
],
function(Circle,
         Quad,
         Vector,
         Schedule,
         Tile) {
  var Tower = function() {
    this._super([], [Schedule]);
    
    this.build({
      body: {
        is: new Circle(0xff8800, (Tile.SIZE/2)*0.9)
      },
      gun: {
        is: new Quad(0xff0000, Tile.SIZE/2, 10),
        x: -Tile.SIZE/4+5
      }
    });
    
    this.distance = 300;
    this.target = null;
    this.name = "Basic Tower";
    this.price = 100;
  };
  
  extend(Tower, Tile);
  
  Tower.prototype.locateTarget = function() {
    for(var i in this.map.entities) {
      var entity = this.map.entities[i];

      var length = new Vector(this.x - entity.x, this.y - entity.y).length();

      if(length < this.distance) {
        this.target = entity;
        
        this._attackTask = this.every(0.5, this.attack);
        return;
      }
    }
  };
  
  Tower.prototype.attack = function() {
    
  };
  
  Tower.prototype.update = function(delta) {
    if(this.map) {
      if(this.target) {
        var v = new Vector(this.x - this.target.x, this.y - this.target.y);
        
        this.rotation = v.atan2();
        
        if(v.length() > this.distance) {
          this.target = null;
          this.killTask(this._attackTask);
        }
      } else {
        this.locateTarget();
      }
    }
  };
  
  return Tower;
});
