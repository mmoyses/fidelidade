spa.home = (function() {
  'use strict';
  var configMap = {
    main_html: String() +
      '<div class="main">' +
        '<h1>Bem vindo ao Programa de Recompensas</h1>' +
      '</div>'
  },
  stateMap = {
    $container: null
  },
  jqueryMap = {},
  setJqueryMap, initModule, removeComponent, setParameters;

  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $main: $container.find('.main')
    };
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
  };

  setParameters = function() {
  };

  return {
    initModule: initModule,
    removeComponent: removeComponent,
    setParameters: setParameters
  };
}());
