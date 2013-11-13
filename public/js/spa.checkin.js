spa.checkin = (function() {
	'use strict';
  var configMap = {
    main_html: String()
      + '<div class="check-in">'
        + '<form class="form-inline">'
          + '<fieldset>'
            + '<legend>Check-in</legend>'
            + '<input type="text" id="id" name="id" placeholder="Digite o ID…">'
            + '<button type="submit" class="btn">Procurar</button>'
          + '</fieldset>'
        + '</form>'
        + '<form class="form-button form-horizontal">'
          + '<div class="control-group">'
            + '<label>Data:</label>'
            + '<input type="text" id="date" name="date"/>'
          + '</div>'
          + '<div class="control-group">'
            + '<button class="btn btn-primary">Check-in</button>'
          + '</div>'
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
      $checkIn: $container.find('.check-in'),
      $client: $container.find("#id"),
      $date: $container.find('#date')
    }
  };

  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    $("#date").mask('99/99/9999');
    $("#date").datepicker({ dateFormat: "dd/mm/yy" });
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
