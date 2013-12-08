spa.relatorios = (function() {
	'use strict';
  var configMap = {
      main_html: String() +
        '<div class="relatorio">' +
          '<form class="form-inline">' +
            '<fieldset>' +
              '<legend>Relatórios</legend>' +
              '<div class="form-group col-xs-2 start">' +
                '<label for="start">Data Início</label>' +
                '<input type="text" id="start" name="start" class="form-control">' +
              '</div>' +
              '<div class="form-group col-xs-2 end">' +
                '<label for="end">Data Fim</label>' +
                '<input type="text" id="end" name="end" class="form-control">' +
              '</div>' +
              '<button type="submit" class="btn btn-default">Procurar</button>' +
              '<span class="help-block">&nbsp;</span>' +
            '</fieldset>' +
          '</form>',
      settable_map: {
        hospedagem_model: true
      },
      hospedagem_model: null
    },
    stateMap = {
      $container: null,
      startDate: null,
      endDate: null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule, onSubmitRelatorio, onGetRelatorio,
    removeComponent, setParameters;

  setJqueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $relatorio: $container.find('.relatorio'),
      $formRelatorio: $container.find('.form-inline'),
      $helpBlock: $container.find('.help-block'),
      $formGroup: $container.find('.form-inline .form-group'),
      $start: $container.find('#start'),
      $end: $container.find('#end'),
      $table: null,
      $export: null,
      $window: $(window)
    };
  };

  configModule = function(input_map) {
    spa.util.setConfigMap({
      input_map: input_map,
      settable_map: configMap.settable_map,
      config_map: configMap
    });

    return true;
  };

  onSubmitRelatorio = function() {
    var start = jqueryMap.$start.val(),
        end = jqueryMap.$end.val(),
        d, startDate, endDate, month;
    jqueryMap.$helpBlock.html('&nbsp;').removeClass('text-error');
    jqueryMap.$formGroup.removeClass('has-error');
    if (jqueryMap.$table)
      jqueryMap.$table.remove();
    if (start.match(/\d{2}\/\d{2}\/\d{4}/)) {
      d = start.split('/');
      month = Number(d[1]) - 1;
      startDate = new Date(d[2], month, d[0], '12', '00', '00');
    } else if (start.match(/\d{2}\/\d{2}\/\d{2}/)) {
      d = start.split('/');
      month = Number(d[1]) - 1;
      startDate = new Date('20' + d[2], month, d[0], '12', '00', '00');
    }
    if (end.match(/\d{2}\/\d{2}\/\d{4}/)) {
      d = end.split('/');
      month = Number(d[1]) - 1;
      endDate = new Date(d[2], month, d[0], '12', '00', '00');
    } else if (end.match(/\d{2}\/\d{2}\/\d{2}/)) {
      d = end.split('/');
      month = Number(d[1]) - 1;
      endDate = new Date('20' + d[2], month, d[0], '12', '00', '00');
    }
    if (startDate) {
      stateMap.startDate = startDate;
      if (!endDate) {
        endDate = new Date();
      }
      stateMap.endDate = endDate;
      configMap.hospedagem_model.getRelatorio(startDate, endDate);
    } else {
      jqueryMap.$helpBlock.html('Preencha pelo menos a data de início').addClass('text-error');
      jqueryMap.$formGroup.addClass('has-error');
    }

    return false;
  };

  onGetRelatorio = function(event, relatorio_map) {
    var error, $tbody, $tfoot, i, value, entries,
        total = 0;
    if (relatorio_map) {
      error = relatorio_map.error;
      if (error) {
        jqueryMap.$relatorio.append('<p class="table-responsive">' + error + '</p>');
        jqueryMap.$table = jqueryMap.$relatorio.find('.table-responsive');
      } else {
        jqueryMap.$relatorio.append('<div class="table-responsive">' +
          '<table class="table table-striped table-condensed">' +
            '<thead>' +
              '<tr>' +
                '<th>Cliente</th>' +
                '<th>Data check-in</th>' +
                '<th>Data check-out</th>' +
                '<th>R$ Cliente</th>' +
                '<th>R$ Programa</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody class="tbody">' +
            '</tbody>' +
            '<tfoot class="tfoot">' +
            '</tfoot>' +
          '</table>' +
        '</div>');
        jqueryMap.$table = jqueryMap.$relatorio.find('.table-responsive');
        $tbody = jqueryMap.$table.find('.tbody');
        $tfoot = jqueryMap.$table.find('.tfoot');
        entries = relatorio_map.entries;
        for (i = 0; i < entries.length; i++) {
          value = entries[i].pontos;
          total += value;
          $tbody.append('<tr><td>' + entries[i].client + '</td>' +
            '<td>' + spa.util.getDate(entries[i].data_checkin) + '</td>' +
            '<td>' + spa.util.getDate(entries[i].data_checkout) + '</td>' +
            '<td>' + spa.util.toReal(value.toFixed(2)) + '</td>' +
            '<td>' + spa.util.toReal((value * 2).toFixed(2)) + '</td></tr>');
        }
        $tfoot.append('<tr class="warning">' +
          '<td colspan="3">Total</td><td>' + spa.util.toReal(total.toFixed(2)) + '</td>' +
          '<td>' + spa.util.toReal((total * 2).toFixed(2)) + '</td></tr>');
        jqueryMap.$relatorio.append('<form method="get" action="relatorio.csv">' +
          '<input type="hidden" name="startDate" value="' + stateMap.startDate + '"/>' +
          '<input type="hidden" name="endDate" value="' + stateMap.endDate + '"/>' +
          '<button class="btn btn-default" type="submit" id="export">Exportar Relatório</button>' +
        '</form>');
        jqueryMap.$export = jqueryMap.$relatorio.find('#export');
      }
    }
  };

  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
    if (jqueryMap.$window.width() > 768) {
      jqueryMap.$start.mask('99/99/9999');
      jqueryMap.$start.datepicker({ dateFormat: 'dd/mm/yy' });
      jqueryMap.$end.mask('99/99/9999');
      jqueryMap.$end.datepicker({ dateFormat: 'dd/mm/yy' });
    } else {
      jqueryMap.$start.mask('99/99/99');
      jqueryMap.$start.datepicker({ dateFormat: 'dd/mm/y' });
      jqueryMap.$end.mask('99/99/99');
      jqueryMap.$end.datepicker({ dateFormat: 'dd/mm/y' });
    }
    jqueryMap.$formRelatorio.bind('submit', onSubmitRelatorio);

    $.gevent.subscribe(jqueryMap.$formRelatorio, 'spa-getrelatorio', onGetRelatorio);
  };

  removeComponent = function() {
    if (jqueryMap.$relatorio) {
      jqueryMap.$relatorio.remove();
      jqueryMap = {};
    }
    stateMap.$container = null;
    stateMap.startDate = null;
    stateMap.endDate = null;
  };

  setParameters = function() {
  };

  return {
    initModule: initModule,
    removeComponent: removeComponent,
    configModule: configModule,
    setParameters: setParameters
  };
}());
