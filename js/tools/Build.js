define([
  './Tool'
],
function(Tool) {
  var Build = function(Tile) {
    Tool.call(this);
    
    this._Tile = Tile;
    
    this.preview = new Tile();
    this.preview.distanceField.visible = true;
    this.preview.alpha = 0.5;
  };
  
  extend(Build, Tool);
  
  Build.prototype.use = function(map, point) {
    if(map.getTileAt(point.x, point.y) == null) {
      map.putTile(new this._Tile(), point.x, point.y);
    }
  };
  
  return Build;
});
