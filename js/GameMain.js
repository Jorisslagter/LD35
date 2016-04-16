define([
  'jig/Container',
  './ui/HUD',
  './Map',
  './tiles/towers/Tower'
],
function(Container,
         HUD,
         Map,
         Tower) {
  var GameMain = function() {
    this._super();
    
    this.build({
      map: {
        is: new Map(10, 10)
      },
      hud: {
        is: new HUD()
      }
    });
    
    this.hud.on('tool', (function(tool) {
      this.map.currentTool = tool;
    }).bind(this));
    
    this.hud.on('shift', (function() {
      this.map.queryTiles(function(tile) {
        return tile instanceof Tower
      }).forEach(function(tile) {
        tile.shift();
      })
    }).bind(this));
  };
  
  extend(GameMain, Container);
  
  GameMain.prototype.keyDown = function(code) {
    if(code == 27) {
      this.map.currentTool = null;
    }
  };
  
  return GameMain;
});
