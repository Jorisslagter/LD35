define([
  './Tile',
  '../ui/HealthBar'
],
function(Tile,
         HealthBar) {
  var Building = function() {
    Tile.call(this);
    
    this.health = this.maxHealth = 100;
  };
  
  extend(Building, Tile);
  
  Object.defineProperties(Building.prototype, {
    maxHealth: {
      set: function(value) {
        this._maxHealth = value;
        
        if(this.healthBar) {
          this.removeChild(this.healthBar);
        }
        
        this.healthBar = new HealthBar(200, 20, this._maxHealth);
        this.healthBar.y = -100;
        this.addChild(this.healthBar);
      },
      get: function() {
        return this._maxHealth || 0;
      }
    },
    health: {
      set: function(value) {
        this._health = Math.min(value, this.maxHealth);
        this.healthBar.value = this._health;
      },
      get: function() {
        return this._health || 0;
      }
    }
  });
  
  Building.prototype.hit = function(hitPoints) {
    this.health -= hitPoints;
    
    if(this.health <= 0) {
      this.ruin();
    }
  };
  
  Building.prototype.ruin = function() {
    this.parent.removeChild(this);
  };
  
  return Building;
});
