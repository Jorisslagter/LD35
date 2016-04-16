define([
  'jig/Container',
  'jig/shapes/Quad',
  './tiles/Tile',
  './tiles/Grass',
  './tiles/Base'
],
function(Container,
         Quad,
         Tile,
         Grass,
         Base) {
  var Map = function(width, height) {
    this._super();
    
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
    
    this.interactive = this.buttonMode = true;
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
    
    if(this._map[tile.x][tile.y]) {
      this._map[tile.x][tile.y].highlight();
    }
  }
  
  Map.prototype.mousedown = function(event) {
    var point = event.data.getLocalPosition(this, event.data.global);
    var tile = this.getTileCoord(point);
    
    this.putTile(new Grass(), tile.x, tile.y);
  };
  
  Map.prototype.putTile = function(tile, cellX, cellY) {
    if(this._map[cellX][cellY] !== null) {
      this.removeTile(cellX, cellY);
    }
    this._map[cellX][cellY] = tile;
    tile.position.set(cellX * Tile.SIZE, cellY * Tile.SIZE);
    this.addChild(tile);
  };
  
  Map.prototype.removeTile = function(cellX, cellY) {
    var tile = this._map[cellX][cellY];
    
    if(tile) {
      this._map[cellX][cellY] = null;
      this.removeChild(tile);
    }
  };
  
  return Map;
});
