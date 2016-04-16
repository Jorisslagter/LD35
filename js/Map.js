define([
  'jig/Container',
  'jig/shapes/Quad',
  './tiles/Tile',
  './tiles/Grass',
  './tiles/Base',
  './enemies/Walker'
],
function(Container,
         Quad,
         Tile,
         Grass,
         Base,
         Walker) {
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
    
    this.currentTool = null;
  };
  
  extend(Map, Container);
  
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
      if(this._map[tile.x][tile.y]) {
        this._map[tile.x][tile.y].highlight();
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

      var entity = new type(this, x, y);

      var target = this.getTileAt(0,0);
      entity.setGoal(target);

      this.entities.push(entity);
      this.addChild(entity);


  }
  
  return Map;
});
