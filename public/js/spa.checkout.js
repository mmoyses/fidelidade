spa.checkout = (function() {
  'use strict';
  var configMap = {
      main_html: String()
      + '<div class="check-out">'
        + '<form class="form-inline">'
          + '<fieldset>'
            + '<legend>Check-out</legend>'
            + '<input type="text" id="id" name="id" placeholder="Digite o ID…">'
            + '<button type="submit" class="btn" id="search-btn" name="search">Procurar</button>'
          + '</fieldset>'
        + '</form>'
        + '<form class="form-button form-horizontal">'
          + '<div class="control-group">'
            + '<label>Data:</label>'
            + '<input type="text" id="date" name="date"/>'
          + '</div>'
          + '<div class="control-group">'
            + '<button class="btn btn-primary" id="checkout-btn" name="checkout">Check-out</button>'
          + '</div>'
        + '</form>'
      + '</div>',
      settable_map: {
        client_model: true
      },
      client_model: null
    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule, removeComponent;

  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $checkOut: $container.find('.check-out'),
      $client: $container.find('#id'),
      $searchBtn: $container.find('#search-btn'),
      $checkOutBtn: $container.find('#checkout-btn'),
      $date: $container.find('#date')
    }
  };

  configModule = function(input_map) {
    spa.util.setConfigMap({
      input_map: input_map,
      settable_map: configMap.settable_map,
      config_map: configMap
    });

    return true;
  };

  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
    jqueryMap.$date.mask('99/99/9999');
    jqueryMap.$date.datepicker({ dateFormat: 'dd/mm/yy' });
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
    removeComponent: removeComponent,
    configModule: configModule
  };
}()); 
