define([
  'jig/Container',
  'jig/shapes/Quad',
  './tiles/Tile',
  './tiles/Grass',
  './tiles/Base',
  './enemies/Walker',
  './ui/BuildForbidden'
],
function(Container,
         Quad,
         Tile,
         Grass,
         Base,
         Walker,
         BuildForbidden) {
  var Map = function(width, height) {
    this._super();
    this.minTileX = -width/2;
    this.maxTileX = width/2;
    this.minTileY = -height/2;
    this.maxTileY = height/2;
  
    this.entities = [];

    var background = new Quad(0x222222, width * Tile.SIZE, height * Tile.SIZE);
    this.addChild(background);
    
    this._map = {};
    
    for(var i = -width / 2; i < width / 2; i++) {
      this._map[i] = {};
      
      for(var j = -height / 2; j < height / 2; j++) {
        this._map[i][j] = null;
      }
    }

    this.putTile(new Base(), 0, 0);

    // Spawning some enemy Walkers
    for(var k = 0; k < 10; k ++) {
      var randomX = Math.random() * 20 + -10;
      var randomY = Math.random() * 20 + -10;
      this.spawn(randomX, randomY, Walker);
    }

    this.interactive = this.buttonMode = true;
    
    this._currentTool = null;
    
    this._buildForbidden = new BuildForbidden();
  };
  
  extend(Map, Container);
  
  Object.defineProperties(Map.prototype, {
    currentTool: {
      set: function(value) {
        if(this._currentTool && this._currentTool.preview) {
          this.removeChild(this._currentTool.preview);
        }
        
        this._currentTool = value;
        
        if(this._currentTool && this._currentTool.preview) {
          this._currentTool.preview.visible = false;
          this.addChild(this._currentTool.preview);
        }
      },
      get: function() {
        return this._currentTool;
      }
    }
  })
  
  Map.prototype.getTileCoord = function(point) {
    return {
      x: Math.floor((point.x + Tile.SIZE / 2) / Tile.SIZE),
      y: Math.floor((point.y + Tile.SIZE / 2) / Tile.SIZE)
    };
  };
  
  Map.prototype.mousemove = function(event) {
    var point = event.data.getLocalPosition(this, event.data.global);
    var tile = this.getTileCoord(point);
    
    if((tile.x > this.minTileX) && (tile.x < this.maxTileX) && (tile.y > this.minTileY) && (tile.y < this.maxTileY)) {
      
      if(this.currentTool && this.currentTool.preview) {
        this.currentTool.preview.position.set(tile.x * Tile.SIZE, tile.y * Tile.SIZE);
        
        if(!(this.currentTool.preview.visible = (this._map[tile.x][tile.y] == null))) {
          this._buildForbidden.position.set(tile.x * Tile.SIZE, tile.y * Tile.SIZE);
          this.addChild(this._buildForbidden);
        }else{
          this.removeChild(this._buildForbidden);
        }
      } else {
        this.removeChild(this._buildForbidden);
        
        if(this._map[tile.x][tile.y]) {
          this._map[tile.x][tile.y].highlight();
        }
      }
    }
  }
  
  Map.prototype.mousedown = function(event) {
    var point = event.data.getLocalPosition(this, event.data.global);
    var tile = this.getTileCoord(point);
    
    if(this.currentTool) {
      this.currentTool.use(this, tile);
    }
  };
  
  Map.prototype.putTile = function(tile, cellX, cellY) {
    if(this._map[cellX][cellY] !== null) {
      this.removeTile(cellX, cellY);
    }
    this._map[cellX][cellY] = tile;
    tile.position.set(cellX * Tile.SIZE, cellY * Tile.SIZE);
    tile.map = this;
    this.addChild(tile);
  };
  
  Map.prototype.removeTile = function(cellX, cellY) {
    var tile = this._map[cellX][cellY];
    
    if(tile) {
      this._map[cellX][cellY] = null;
      this.removeChild(tile);
      tile.map = null;
    }
  };

  Map.prototype.getTileAt = function(cellX, cellY) {
    var tile = this._map[cellX][cellY];

    if(!tile) {
      return null;
    }

    return this._map[cellX][cellY];

  }

  Map.prototype.spawn = function(x, y, type) {

      var entity = new type(x, y);

      var target = this.getTileAt(0,0);
      entity.setGoal(target);

      this.entities.push(entity);
      this.addChild(entity);


  }
  
  return Map;
});
