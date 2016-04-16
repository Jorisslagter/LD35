define([
  './Tool'
],
function(Tool) {
  var Build = function(Tile) {
    Tool.call(this);
    
    this._Tile = Tile;
  };
  
  extend(Build, Tool);
  
  Build.prototype.use = function(map, point) {
    map.putTile(new this._Tile(), point.x, point.y);
  };
  
  return Build;
});
