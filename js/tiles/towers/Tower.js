define([
  'jig/Container',
  'jig/shapes/Circle',
  'jig/shapes/Quad',
  'jig/Vector',
  'jig/components/Schedule',
  '../Tile',
  '../Building',
  '../../weapons/Pistol'
],
function(Container,
         Circle,
         Quad,
         Vector,
         Schedule,
         Tile,
         Building,
         Pistol) {
  var Tower = function() {
    this._super([], [Schedule]);
    
    this.distance = 300;
    
    this.build({
      distanceField: {
        is: new Circle(0x00ff00, this.distance),
        alpha: 0.2,
        interactive: false,
        visible: false
      },
      tower: {
        is: new Container(),
        build: {
          body: {
            is: new Circle(0xff8800, (Tile.SIZE/2)*0.9)
          },
          gun: {
            is: new Quad(0xff0000, Tile.SIZE/2, 10),
            x: -Tile.SIZE/4+5
          }
        }
      }
    });
    
    
    this.target = null;
    this.name = "Basic Tower";
    this.price = 100;
    
    this.health = this.maxHealth = 100;
  };
  
  extend(Tower, Building);
  
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
        
        this.tower.rotation = v.atan2();
        
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
