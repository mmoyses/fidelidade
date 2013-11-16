spa.model = (function() {
  'use strict';
  var configMap = {},
      stateMap = {},
      isFakeData = true,
      client, hospedagem, initModule;

  client = (function() {
    var getList, getClient, checkIn, init, _publish_getclient, _publish_checkin;

    _publish_getclient = function(client_map) {
      $.gevent.publish('spa-getclient', [client_map]);
    };

    _publish_checkin = function(checkin_map) {
      $.gevent.publish('spa-checkin', [checkin_map]);
    };

    getList = function() {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      
    };

    getClient = function(id) {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.emit('getclient', { id: id });
      return true;
    };

    checkIn = function(id, date) {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.emit('checkin', { id: id, date: date });
    };

    init = function() {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.on('getclient', _publish_getclient);
      sio.on('checkin', _publish_checkin);
    };

    return {
      getList: getList,
      getClient: getClient,
      checkIn: checkIn,
      init: init
    }
  }());

  hospedagem = (function() {
    var getActiveList, _publish_getactivelist, checkOut, _publish_checkout, init;

    getActiveList = function(hotel_id) {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.emit('getactivelist', { hotel: hotel_id });
    };

    _publish_getactivelist = function(hospedagem_map) {
      $.gevent.publish('spa-getactivelist', [hospedagem_map]);
    };

    checkOut = function(id, date) {
      console.log('model');
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.emit('checkout', { id: id, date: date });
    };

    _publish_checkout = function(checkout_map) {
      $.gevent.publish('spa-checkout', [checkout_map]);
    }

    init = function() {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.on('getactivelist', _publish_getactivelist);
      sio.on('checkout', _publish_checkout);
    };

    return {
      getActiveList: getActiveList,
      init: init,
      checkOut: checkOut
    };
  }());

  initModule = function() {
    client.init();
    hospedagem.init();
  };

  return {
    initModule: initModule,
    client: client,
    hospedagem: hospedagem
  };
}());
