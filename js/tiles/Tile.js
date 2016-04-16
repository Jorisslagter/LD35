define([
  'jig/Container'
],
function(Container) {
  var Tile = function() {
    Container.call(this);
    this.interactive = this.buttonMode = true;
    
    this.solid = false;
  };
  
  Tile.SIZE = 100;
  
  extend(Tile, Container);
  
  Tile.prototype.highlight = function() {
    //
  };
  
  return Tile;
});
