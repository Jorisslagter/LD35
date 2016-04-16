define([
  './Tile',
  '../ui/HealthBar'
],
function(Tile,
         HealthBar) {
  var Building = function() {
    Tile.call(this);
    
    this._showHealthBar = true;
  };
  
  extend(Building, Tile);
  
  Object.defineProperties(Building.prototype, {
    maxHealth: {
      set: function(value) {
        this._maxHealth = value;
        
        if(this.healthBar) {
          this.removeChild(this.healthBar);
        }
        
        this.healthBar = new HealthBar(this.width * 1.2, 20, this._maxHealth);
        this.healthBar.y = -this.height/2 - 20;
        this.addChild(this.healthBar);
      },
      get: function() {
        return this._maxHealth || 0;
      }
    },
    health: {
      set: function(value) {
        this._health = Math.min(value, this.maxHealth);
        
        if(this.healthBar) {
          this.healthBar.value = this._health;
        }
      },
      get: function() {
        return this._health || 0;
      }
    },
    showHealthBar: {
      set: function(value) {
        this._showHealthBar = value;
        
        if(this.healthBar) {
          this.healthBar.visible = this._showHealthBar;
        }
      },
      get: function() {
        return this._showHealthBar;
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
