define([
  './Tool',
  '../tiles/towers/CircleTower',
  '../tiles/towers/SquareTower',
  '../tiles/towers/TriangleTower'
],
function(Tool, CircleTower, SquareTower, TriangleTower) {
  
  CircleTower.prototype.next = SquareTower;
  SquareTower.prototype.next = TriangleTower;
  TriangleTower.prototype.next = CircleTower;
  
  var Build = function(Tile) {
    Tool.call(this);
    
    this._Tile = Tile;

    this.preview = new Tile();
    this.preview.showHealthBar = false;
    this.preview.distanceField.visible = true;
    this.preview.alpha = 0.5;
  };
  
  extend(Build, Tool);
  
  Build.prototype.use = function(map, point) {
    if(map.getTileAt(point.x, point.y) == null) {
      var tile = new this._Tile();
      map.putTile(tile, point.x, point.y);
      map.currentTool = null;
    }
  };
  
  return Build;
});
