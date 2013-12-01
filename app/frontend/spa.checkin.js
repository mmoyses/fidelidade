spa.checkin = (function() {
	'use strict';
  var configMap = {
      main_html: String() +
        '<div class="check-in">' +
          '<form class="form-inline">' +
            '<fieldset>' +
              '<legend>Check-in</legend>' +
              '<div class="form-group">' +
                '<label class="sr-only" for="id">Id do cliente</label>' +
                '<input type="text" id="id" name="id" class="form-control" placeholder="Digite o ID…">' +
              '</div>' +
              '<button type="submit" class="btn btn-default">Procurar</button>' +
              '<span class="help-block">&nbsp;</span>' +
            '</fieldset>' +
          '</form>' +
          '<form class="form-checkin">' +
            '<div class="row">' +
              '<div class="form-group col-xs-3">' +
                '<label for="date">Data</label>' +
                '<input type="text" id="date" name="date" class="form-control" disabled="disabled"/>' +
              '</div>' +
            '</div>' +
            '<button class="btn btn-primary" disabled="disabled">Check-in</button>' +
            '<span class="help-inline"></span>' +
          '</form>' +
        '</div>',
      settable_map: {
        client_model: true,
        hospedagem_model: true
      },
      client_model: null,
      hospedagem_model: null
    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},
    setJqueryMap, onSetClient, submitClient, onSubmitCheckin, onGetClient, onDateChange,
    onCheckIn, configModule, initModule, removeComponent, setParameters;

  setJqueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $checkIn: $container.find('.check-in'),
      $client: $container.find('#id'),
      $formClient: $container.find('.form-inline'),
      $formCheckIn: $container.find('.form-checkin'),
      $date: $container.find('#date'),
      $helpBlock: $container.find('.help-block'),
      $checkInBtn: $container.find('.btn-primary'),
      $formGroup: $container.find('.form-inline .form-group'),
      $helpInline: $container.find('.form-checkin .help-inline')
    };
  };

  onGetClient = function(event, client_map) {
    var error;
    if (client_map) {
      error = client_map.error;
      if (error) {
        jqueryMap.$helpBlock.html(error).addClass('text-error');
        jqueryMap.$formGroup.addClass('has-error');
      } else {
        jqueryMap.$helpBlock.html(client_map.nome);
        jqueryMap.$date.removeAttr('disabled');
        jqueryMap.$date.focus();
      }
    }
  };

  onSetClient = function() {
    var id = jqueryMap.$client.val();
    spa.shell.changeAnchorPart({ page: 'checkin', _page: { client: id } });
    return false;
  };

  submitClient = function(id) {
    jqueryMap.$client.val(id);
    jqueryMap.$helpBlock.html('&nbsp;').removeClass('text-error');
    jqueryMap.$date.val('');
    jqueryMap.$checkInBtn.attr('disabled','disabled');
    jqueryMap.$date.attr('disabled','disabled');
    jqueryMap.$formGroup.removeClass('has-error');
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
      configMap.hospedagem_model.checkIn(id, checkInDate);
      jqueryMap.$helpInline.attr('class', 'help-inline');
      jqueryMap.$helpInline.html('');
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

  onCheckIn = function(event, checkin_map) {
    var msg, error;
    if (checkin_map) {
      msg = checkin_map.msg;
      if (msg) {
        jqueryMap.$helpInline.addClass('text-success');
        jqueryMap.$helpInline.html(msg);
      } else {
        error = checkin_map.error;
        if (error) {
          jqueryMap.$helpInline.addClass('text-error');
          jqueryMap.$helpInline.html(error);
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
    jqueryMap.$date.mask('99/99/9999');
    jqueryMap.$date.datepicker({ dateFormat: 'dd/mm/yy' });
    jqueryMap.$formClient.bind('submit', onSetClient);
    jqueryMap.$formCheckIn.bind('submit', onSubmitCheckin);
    jqueryMap.$date.bind('change', onDateChange);

    $.gevent.subscribe(jqueryMap.$formClient, 'spa-getclient', onGetClient);
    $.gevent.subscribe(jqueryMap.$formCheckIn, 'spa-checkin', onCheckIn);
    jqueryMap.$client.focus();
  };

  removeComponent = function() {
    if (jqueryMap.$checkIn) {
      jqueryMap.$checkIn.remove();
      jqueryMap = {};
    }
    stateMap.$container = null;
  };

  setParameters = function(page) {
    if (page.client) {
      submitClient(page.client);
    }
  };

  return {
    initModule: initModule,
    removeComponent: removeComponent,
    configModule: configModule,
    setParameters: setParameters
  };
}());