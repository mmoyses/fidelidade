spa.home = (function() {
  'use strict';
  var configMap = {
    main_html: String()
      + '<div class="main">'
        + '<h1>Hello World</h1>'
      + '</div>'
    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},
    setJqueryMap, initModule, removeComponent;

  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $main: $container.find('.main')
    }
  };

  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
  };

  removeComponent = function() {
    if (jqueryMap.$main) {
      jqueryMap.$main.remove();
      jqueryMap = {};
    }
    stateMap.$container = null;
  }

  return {
    initModule: initModule,
    removeComponent: removeComponent
  };
}());
