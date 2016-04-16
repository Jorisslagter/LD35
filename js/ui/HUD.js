define([
  'jig/Container',
  'jig/shapes/Quad',
  './TowerButton',
  './ShiftButton',
  '../tiles/towers/CircleTower',
  '../tiles/towers/SquareTower',
  '../tiles/towers/TriangleTower',
  '../tools/Build'
],
function(Container,
         Quad,
         TowerButton,
         ShiftButton,
         CircleTower,
         SquareTower,
         TriangleTower,
         Build) {
  
  var HUD = function() {
    this._super();
    
    var towers = [CircleTower, SquareTower, TriangleTower];
    
    this.build({
      buttons: {
        is: new Container()
      },
      shiftButton: {
        is: new ShiftButton(),
        x: 800
      }
    });
    
    this.shiftButton.action = (function() {
      this.emit('shift');
    }).bind(this);
    
    this._buttons = [];
    
    for(var i in towers) {
      var btn = new TowerButton(towers[i]);
      btn.y = (btn.height + 10) * i;
      btn.action = (function(thisArg, Tower) {
        return (function(){
          this.emit('tool', new Build(Tower));
        }).bind(thisArg);
      })(this, towers[i]);
      
      this.buttons.addChild(btn);
      
      this._buttons.push(btn);
    };
    
    this.buttons.x = -800;
    this.buttons.y = -this.buttons.height / 2;
  };
  
  extend(HUD, Container);
  
  return HUD;
})
