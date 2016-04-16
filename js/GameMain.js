define([
  'jig/Container',
  './ui/HUD',
  './Map'
],
function(Container,
         HUD,
         Map) {
  var GameMain = function() {
    this._super();
    
    this.build({
      map: {
        is: new Map(10, 10)
      },
      hud: {
        is: new HUD(),
        x: -800 // TODO: Should be dynamic
      }
    });
    
    this.hud.on('tool', (function(tool) {
      this.map.currentTool = tool;
    }).bind(this));
  };
  
  extend(GameMain, Container);
  
  GameMain.prototype.keyDown = function(code) {
    if(code == 27) {
      this.map.currentTool = null;
    }
  }
  
  return GameMain;
});
