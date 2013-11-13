spa.checkin = (function() {
	'use strict';
  var configMap = {
    main_html: String()
      + '<div class="check-in">'
        + '<form class="form-inline">'
          + '<fieldset>'
            + '<legend>Check-in</legend>'
            + '<input type="text" placeholder="Digite o ID…">'
            + '<button type="submit" class="btn">Procurar</button>'
          + '</fieldset>'
        + '</form>'
        + '<label>Data:</label>'
        + '<div id="date"></div>'
        + '<form class="form-button">'
          + '<button class="btn btn-primary">Check-in</button>'
        + '</form>'
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
      $checkIn: $container.find('.check-in')
    }
  };

  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
  };

  removeComponent = function() {
    if (jqueryMap.$checkIn) {
      jqueryMap.$checkIn.remove();
      jqueryMap = {};
    }
    stateMap.$container = null;
  }

  return {
    initModule: initModule,
    removeComponent: removeComponent
  };
}());
