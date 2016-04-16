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
    Building.call(this);
    
    this.build({
      bgLayer: {
        is: new Container()
      }
    });
    
    this.distance = 100;
    this.target = null;
    this.name = "Basic Tower";
    this.price = 100;
    
    this.health = this.maxHealth = 100;
  };
  
  extend(Tower, Building);
  
  Object.defineProperties(Tower.prototype, {
    distance: {
      set: function(value) {
        this._distance = value;
        
        if(this.distanceField) {
          this.bgLayer.removeChild(this.distanceField);
        }
        
        this.distanceField = new Circle(0x00ff00, this._distance);
        this.distanceField.alpha = 0.2;
        this.distanceField.interactive = false;
        this.distanceField.visible = false;
        
        this.bgLayer.addChild(this.distanceField);
      },
      get: function() {
        return this._distance;
      }
    }
  });
  
  Tower.prototype.next = null;
  
  Tower.prototype.locateTarget = function() {
    for(var i in this.map.entities) {
      var entity = this.map.entities[i];

      var length = new Vector(this.x - entity.x, this.y - entity.y).length();

      if(length < this.distance) {
        this.target = entity;
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
        
        if(v.length() > this.distance) {
          this.target = null;
        }
      } else {
        this.locateTarget();
      }
    }
  };
  
  Tower.prototype.shift = function() {
    if ((this.map) && (this.next)) {
      this.map.putTile(new this.next(), this.cell.x, this.cell.y, true);
    }
  };
  
  return Tower;
});
