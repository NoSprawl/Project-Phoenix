(function(app) {
  app.Login = ng.core
    .Component({
      selector: 'nosprawl',
      template: '<h1>NoSprawl</h1><form><input><input><input type="submit"></form>'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));