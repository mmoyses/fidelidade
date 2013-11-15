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
            + '<span class="help-block">&nbsp;</span>'
          + '</fieldset>'
        + '</form>'
        + '<form class="form-button form-horizontal">'
          + '<div class="control-group">'
            + '<label>Data:</label>'
            + '<input type="text" id="date" name="date" disabled="disabled"/>'
          + '</div>'
          + '<div class="control-group">'
            + '<button class="btn btn-primary" disabled="disabled">Check-in</button>'
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
    setJqueryMap, onSubmitClient, onSubmitCheckin, onGetClient, onDateChange, configModule, initModule, removeComponent;

  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $checkIn: $container.find('.check-in'),
      $client: $container.find('#id'),
      $formClient: $container.find('.form-inline'),
      $formCheckIn: $container.find('.form-button'),
      $date: $container.find('#date'),
      $helpBlock: $container.find('.help-block'),
      $checkInBtn: $container.find('.btn-primary')
    }
  };

  onGetClient = function(event, client_map) {
    var msg;
    if (client_map) {
      msg = client_map.msg;
      if (msg) {
        jqueryMap.$helpBlock.html(msg).addClass('text-error');
      } else {
        jqueryMap.$helpBlock.html(client_map.nome);
        jqueryMap.$date.removeAttr('disabled');
      }
    }
  }

  onSubmitClient = function() {
    var client,
        id = jqueryMap.$client.val();
    jqueryMap.$helpBlock.html('&nbsp;').removeClass('text-error');
    jqueryMap.$date.val('');
    jqueryMap.$checkInBtn.attr('disabled','disabled');
    jqueryMap.$date.attr('disabled','disabled');
    if (id.trim() === '') {
      return false;
    }
    configMap.client_model.getClient(id);
    
    return false;
  };

  onSubmitCheckin = function() {
    var date = jqueryMap.$date.val(),
        id = jqueryMap.$client.val(),
        d, checkInDate, month;
    if (date.match(/\d{2}\/\d{2}\/\d{4}/) && id.trim() !== '') {
      d = date.split('/');
      month = Number(d[1]) - 1;
      checkInDate = new Date(d[2], month, d[0], '12', '00', '00');
      configMap.client_model.checkIn(id, checkInDate);
    }

    return false;
  };

  onDateChange = function() {
    var date = jqueryMap.$date.val();
    if (date.length >= 10)
      jqueryMap.$checkInBtn.removeAttr('disabled');
    else
      jqueryMap.$checkInBtn.attr('disabled','disabled');
    return false;
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
    jqueryMap.$formClient.bind('submit', onSubmitClient);
    jqueryMap.$formCheckIn.bind('submit', onSubmitCheckin);
    jqueryMap.$date.bind('change', onDateChange);

    $.gevent.subscribe(jqueryMap.$formClient, 'spa-getclient', onGetClient);
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
    removeComponent: removeComponent,
    configModule: configModule
  };
}());
