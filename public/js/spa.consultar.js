spa.consultar = (function() {
	'use strict';
  var configMap = {
      main_html: String()
      + '<div class="consulta">'
        + '<form class="form-inline">'
          + '<fieldset>'
            + '<legend>Consulta</legend>'
            + '<div class="form-group">'
              + '<label class="sr-only" for="id">Id do cliente</label>'
              + '<input type="text" id="id" name="id" class="form-control" placeholder="Digite o ID…">'
            + '</div>'
            + '<button type="submit" class="btn btn-default">Procurar</button>'
            + '<span class="help-block">&nbsp;</span>'
          + '</fieldset>'
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
    setJqueryMap, onSubmitClient, onGetClient, onGetHospedagens, configModule, initModule, removeComponent;

  setJqueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $consulta: $container.find('.consulta'),
      $client: $container.find('#id'),
      $formClient: $container.find('.form-inline'),
      $helpBlock: $container.find('.help-block'),
      $formGroup: $container.find('.form-inline .form-group'),
      $table: null
    }
  };

  onGetClient = function(event, client_map) {
    var error,
        client_id = jqueryMap.$client.val();
    if (client_map) {
      error = client_map.error;
      if (error) {
        jqueryMap.$helpBlock.html(error).addClass('text-error');
        jqueryMap.$formGroup.addClass('has-error');
      } else {
        jqueryMap.$helpBlock.html(client_map.nome);
        configMap.client_model.getHospedagens(spa.util.getEmpresa(), client_id);
      }
    }
  }

  onSubmitClient = function() {
    var client,
        id = jqueryMap.$client.val();
    jqueryMap.$helpBlock.html('&nbsp;').removeClass('text-error');
    jqueryMap.$formGroup.removeClass('has-error');
    if (jqueryMap.$table)
      jqueryMap.$table.remove();
    if (id.trim() === '') {
      return false;
    }
    configMap.client_model.getClient(id);
    
    return false;
  };

  onGetHospedagens = function(event, hospedagens_map) {
    var error, $tbody, i, hospedagens;
    if (hospedagens_map) {
      error = hospedagens_map.error;
      if (error) {
        jqueryMap.$consulta.append('<p class="table">' + error + '</p>');
        jqueryMap.$table = jqueryMap.$consulta.find('.table');
      } else {
        jqueryMap.$consulta.append('<table class="table table-striped"><thead><tr><th>Data check-in</th><th>Data check-out</th><th>Pontos</th></tr></thead><tbody class="tbody"></tbody></table>');
        jqueryMap.$table = jqueryMap.$consulta.find('.table');
        $tbody = jqueryMap.$table.find('.tbody');
        hospedagens = hospedagens_map.hospedagens;
        for (i = 0; i < hospedagens.length; i++) {
          $tbody.append('<tr><td>' + spa.util.getDate(hospedagens[i].data_checkin) + '</td><td>' + spa.util.getDate(hospedagens[i].data_checkout) + '</td><td>' + hospedagens[i].pontos + '</td></tr>');
        }
      }
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
    jqueryMap.$formClient.bind('submit', onSubmitClient);

    $.gevent.subscribe(jqueryMap.$formClient, 'spa-getclient', onGetClient);
    $.gevent.subscribe(jqueryMap.$consulta, 'spa-gethospedagens', onGetHospedagens);
  };

  removeComponent = function() {
    if (jqueryMap.$consulta) {
      jqueryMap.$consulta.remove();
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
