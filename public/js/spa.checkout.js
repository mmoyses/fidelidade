spa.checkout = (function() {
  'use strict';
  var configMap = {
    main_html: String()
      + '<div class="check-out">'
        + '<form class="form-inline">'
          + '<fieldset>'
            + '<legend>Check-out</legend>'
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
            + '<button class="btn btn-primary">Check-out</button>'
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
      $checkOut: $container.find('.check-out'),
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
    if (jqueryMap.$checkOut) {
      jqueryMap.$checkOut.remove();
      jqueryMap = {};
    }
    stateMap.$container = null;
  }

  return {
    initModule: initModule,
    removeComponent: removeComponent
  };
}()); 
