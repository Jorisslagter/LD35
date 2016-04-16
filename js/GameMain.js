define([
  'jig/Container',
  './Map'
],
function(Container,
         Map) {
  var GameMain = function() {
    this._super();
    
    this.map = new Map(10, 10);
    this.addChild(this.map);
  };
  
  extend(GameMain, Container);
  
  return GameMain;
});
