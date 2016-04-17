define([
  'pixi',
  'jig/Container',
  './ui/HUD',
  './Map',
  './tiles/towers/Tower',
  './ui/GameOver'
],
function(PIXI,
         Container,
         HUD,
         Map,
         Tower,
         GameOver) {
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
    
    this.map.base.on('death', (function() {
      this.map.updating = false;
      this.map.filters = [new PIXI.filters.BlurFilter()];
      
      this.hud.animAlpha(1, 0, 1, null, function() {
        this.parent.removeChild(this);
      });
      
      this.addChild(new GameOver());
    }).bind(this));
    
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
