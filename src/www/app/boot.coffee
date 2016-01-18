((app) ->
  document.addEventListener 'DOMContentLoaded', ->
    ng.platform.browser.bootstrap app.Login
    
) window.app or (window.app = {})
