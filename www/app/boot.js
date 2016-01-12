(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.Login);
  });
})(window.app || (window.app = {}));