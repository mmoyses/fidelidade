spa.checkout = (function() {
  'use strict';
  var configMap = {
      main_html: String()
      + '<div class="check-out">'
        + '<form class="form-button form-horizontal">'
          + '<fieldset>'
            + '<legend>Check-out</legend>'
            + '<div class="control-group hospedagem">'
            + '</div>'
            + '<div class="control-group">'
              + '<label>Data:</label>'
              + '<input type="text" id="date" name="date" disabled="disabled"/>'
            + '</div>'
            + '<div class="control-group">'
              + '<button class="btn btn-primary" disabled="disabled">Check-out</button>'
              + '<span class="help-inline"></span>'
            + '</div>'
          + '</fieldset>'
        + '</form>'
      + '</div>',
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
    setJqueryMap, onSubmitCheckout, onDateChange, onGetActiveList, onCheckOut, configModule, initModule, removeComponent;

  setJqueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $checkOut: $container.find('.check-out'),
      $date: $container.find('#date'),
      $formCheckOut: $container.find('.form-button.form-horizontal'),
      $checkOutBtn: $container.find('.btn-primary'),
      $helpInline: $container.find('.form-button .help-inline'),
      $hospedagem: $container.find('.hospedagem')
    }
  };

  onSubmitCheckout = function() {
    var date = jqueryMap.$date.val(),
        id = jqueryMap.$hospedagem.find('input[name="hospedagem"]:checked').val(),
        d, checkOutDate, month;
    if (date.match(/\d{2}\/\d{2}\/\d{4}/) && id.trim() !== '') {
      d = date.split('/');
      month = Number(d[1]) - 1;
      checkOutDate = new Date(d[2], month, d[0], '12', '00', '00');
      configMap.hospedagem_model.checkOut(id, checkOutDate);
      jqueryMap.$helpInline.attr('class', 'help-inline');
      jqueryMap.$helpInline.html('');
    }

    return false;
  };

  onDateChange = function() {
    var date = jqueryMap.$date.val();
    if (date.length >= 10)
      jqueryMap.$checkOutBtn.removeAttr('disabled');
    else
      jqueryMap.$checkOutBtn.attr('disabled','disabled');
    return false;
  };

  onCheckOut = function(event, checkout_map) {
    var msg, error, id;
    if (checkout_map) {
      msg = checkout_map.msg;
      if (msg) {
        jqueryMap.$helpInline.addClass('text-success');
        jqueryMap.$helpInline.html(msg);
        id = checkout_map.id;
        jqueryMap.$hospedagem.find('input[value="' + id + '"]').parent().remove();
        jqueryMap.$date.val('');
      } else {
        error = checkout_map.error;
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

  onGetActiveList = function(event, hospedagem_map) {
    var i, id, client, date, error, hospedagens;
    if (hospedagem_map) {
      error = hospedagem_map.error;
      if (error) {
        jqueryMap.$hospedagem.append('<p class="text-info">' + error + '</p>');
      } else {
        hospedagens = hospedagem_map.hospedagens;
        for (i = 0; i < hospedagens.length; i++) {
          id = hospedagens[i].id;
          client = hospedagens[i].client;
          date = hospedagens[i].date;
          jqueryMap.$hospedagem.append('<label class="radio"><input type="radio" name="hospedagem" value="' + id + '"/>' + client + ' (' + date + ')</label>');
        }
        $('input:radio').bind('change', function() {
          jqueryMap.$date.removeAttr('disabled');
        });
      }
    }
  };

  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
    jqueryMap.$date.mask('99/99/9999');
    jqueryMap.$date.datepicker({ dateFormat: 'dd/mm/yy' });
    jqueryMap.$formCheckOut.bind('submit', onSubmitCheckout);
    jqueryMap.$date.bind('change', onDateChange);

    $.gevent.subscribe(jqueryMap.$formCheckOut, 'spa-getactivelist', onGetActiveList);
    $.gevent.subscribe(jqueryMap.$hospedagem, 'spa-checkout', onCheckOut);
    configMap.hospedagem_model.getActiveList('x'); //FIXME
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
