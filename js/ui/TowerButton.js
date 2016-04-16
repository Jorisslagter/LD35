define([
  'jig/Container',
  'jig/shapes/Quad',
  'jig/Text',
  'jig/Button'
],
function(Container,
         Quad,
         Text,
         Button) {
           
  var TowerButton = function(Tile) {
    var buttonContent = new Container();
    
    var tile = new Tile();
    
    buttonContent.build({
      back: {
        is: new Quad(0x888888, 140, 200),
        y: 30,
        alpha: 0.6
      },
      image: {
        is: tile,
        interactive: false
      },
      name: {
        is: new Text(tile.name, {font: "bold 30px monospace", fill: 0xffffff}),
        y: 80
      },
      price: {
        is: new Text('$' + tile.price, {font: "bold 20px monospace", fill: 0xeeeeee}),
        y: 110
      }
    });
    
    this._super([buttonContent]);
  };
  
  extend(TowerButton, Button);
  
  return TowerButton;
});
