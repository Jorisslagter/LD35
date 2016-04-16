define([
  'jig/Container',
  'jig/shapes/Quad',
  './TowerButton',
  '../tiles/towers/Tower',
  '../tools/Build'
],
function(Container,
         Quad,
         TowerButton,
         Tower,
         Build) {
  
  var HUD = function() {
    this._super();
    
    this.build({
      tower: {
        is: new TowerButton(Tower)
      }
    });
    
    this.tower.action((function() {
      this.emit('tool', new Build(Tower));
    }).bind(this));
  };
  
  extend(HUD, Container);
  
  return HUD;
})
