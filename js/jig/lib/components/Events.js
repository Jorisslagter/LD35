define([], function() {
  var Events = function() {
    this._listeners = {};
  };
  
  Events.prototype.addListener = function(event, callback, once) {
    this._listeners[event] = this._listeners[event] || [];
    this._listeners[event].push({
      callback: callback,
      once: once,
      remove: false
    });
  }
  
  Events.prototype.on = function(event, callback) {
    this.addListener(event, callback, false);
  };
  
  Events.prototype.once = function(event, callback) {
    this.addListener(event, callback, true);
  };
  
  Events.prototype.fire = function(event, data) {
    if(this._listeners[event]) {
      this._listeners[event].forEach(function(listener) {
        listener.callback.call(this, event, data);
        listener.remove = listener.once;
      }, true);
      
      this._listeners[event] = this._listeners.filter(function(listener) {
        return !listener.remove;
      });
    }
  };
  
  return Events;
});
