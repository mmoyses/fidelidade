spa.checkout = (function() {
  'use strict';
  var configMap = {
      main_html: String() +
        '<div class="check-out">' +
          '<form class="form-checkout">' +
            '<fieldset>' +
              '<legend>Check-out</legend>' +
              '<div class="row">' +
                '<div class="form-group hospedagem">' +
                '</div>' +
              '</div>' +
              '<div class="row">' +
                '<div class="form-group col-xs-3">' +
                  '<label for="date">Data</label>' +
                  '<input type="text" id="date" name="date" class="form-control" disabled="disabled"/>' +
                '</div>' +
                '<div class="form-group col-xs-3">' +
                  '<label for="price">Valor diárias</label>' +
                  '<input type="text" id="price" name="price" class="form-control" disabled="disabled"/>' +
                '</div>' +
              '</div>' +
              '<div class="form-group">' +
                '<button class="btn btn-primary" disabled="disabled">Check-out</button>' +
                '<span class="help-inline"></span>' +
              '</div>' +
            '</fieldset>' +
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
    setJqueryMap, onSubmitCheckout, onDateChange, onPriceChange, onGetActiveList,
    onCheckOut, onGetUser, configModule, initModule, removeComponent, setParameters;

  setJqueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $checkOut: $container.find('.check-out'),
      $date: $container.find('#date'),
      $price: $container.find('#price'),
      $formCheckOut: $container.find('.form-checkout'),
      $checkOutBtn: $container.find('.btn-primary'),
      $helpInline: $container.find('.form-checkout .help-inline'),
      $hospedagem: $container.find('.hospedagem')
    };
  };

  onSubmitCheckout = function() {
    var date = jqueryMap.$date.val(),
        id = jqueryMap.$hospedagem.find('input[name="hospedagem"]:checked').val(),
        price = spa.util.convertPrice(jqueryMap.$price.val()),
        d, checkOutDate, month;
    if (date.match(/\d{2}\/\d{2}\/\d{4}/) && id.trim() !== '') {
      d = date.split('/');
      month = Number(d[1]) - 1;
      checkOutDate = new Date(d[2], month, d[0], '12', '00', '00');
      configMap.hospedagem_model.checkOut(id, checkOutDate, price);
      jqueryMap.$helpInline.attr('class', 'help-inline');
      jqueryMap.$helpInline.html('');
    }

    return false;
  };

  onDateChange = function() {
    var date = jqueryMap.$date.val();
    if (date.length >= 10)
      jqueryMap.$price.removeAttr('disabled');
    else
      jqueryMap.$price.attr('disabled','disabled');
    return false;
  };

  onPriceChange = function() {
    var price = spa.util.convertPrice(jqueryMap.$price.val());
    if (price > 0)
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
        jqueryMap.$date.attr('disabled','disabled');
        jqueryMap.$price.val('');
        jqueryMap.$price.attr('disabled','disabled');
        jqueryMap.$checkOutBtn.attr('disabled','disabled');
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
          date = hospedagens[i].data_checkin;
          jqueryMap.$hospedagem.append('<label class="radio"><input type="radio" name="hospedagem" value="' +
            id + '"/>' + client + ' (' + spa.util.getDate(date) + ')</label>');
        }
        $('input:radio').bind('change', function() {
          jqueryMap.$date.removeAttr('disabled');
        });
      }
    }
  };

  onGetUser = function() {
    configMap.hospedagem_model.getActiveList();
  };

  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();
    jqueryMap.$date.mask('99/99/9999');
    jqueryMap.$price.maskMoney({ thousands: '.', decimal: ','});
    jqueryMap.$date.datepicker({ dateFormat: 'dd/mm/yy' });
    jqueryMap.$formCheckOut.bind('submit', onSubmitCheckout);
    jqueryMap.$date.bind('change', onDateChange);
    jqueryMap.$price.bind('keypress', onPriceChange);

    $.gevent.subscribe(jqueryMap.$formCheckOut, 'spa-getactivelist', onGetActiveList);
    $.gevent.subscribe(jqueryMap.$hospedagem, 'spa-checkout', onCheckOut);
    if (!spa.user.getUser())
      $.gevent.subscribe(jqueryMap.$container, 'spa-getuser', onGetUser);
    else
      configMap.hospedagem_model.getActiveList();
  };

  removeComponent = function() {
    if (jqueryMap.$checkOut) {
      jqueryMap.$checkOut.remove();
      jqueryMap = {};
    }
    stateMap.$container = null;
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
