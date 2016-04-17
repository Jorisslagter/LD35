define([
    'jig/Container',
    'jig/Text'
  ],
  function(Container, Text) {
    var Hit = function(value) {
      Container.call(this);
      
      this.build({
        text: new Text("-" + value, {font: 'bold 40px monospace', fill: 0xff0000})
      });
      
      this._time = 2;
      this._c_time = 0;
    };
    
    extend(Hit, Container);

    Hit.prototype.update = function(delta) {
      var t = this._c_time / this._time;
      
      //this.alpha = 1 - (t*t*t);
      //this.y -= 50 * delta;
      
      this._c_time += delta;
    };

    return Hit;
  });
