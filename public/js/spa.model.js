spa.model = (function() {
  'use strict';
  var isFakeData = true,
      client, hospedagem, user, initModule;

  client = (function() {
    var getList, getClient, init, _publish_getclient;

    _publish_getclient = function(client_map) {
      $.gevent.publish('spa-getclient', [client_map]);
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

    init = function() {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.on('getclient', _publish_getclient);
    };

    return {
      getList: getList,
      getClient: getClient,
      init: init
    };
  }());

  hospedagem = (function() {
    var getActiveList, _publish_getactivelist, checkOut, checkIn, _publish_checkout, _publish_checkin,
    getHospedagens, _publish_gethospedagens, init;

    getActiveList = function(hotel_id) {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.emit('getactivelist', { hotel: hotel_id });
    };

    _publish_getactivelist = function(hospedagem_map) {
      $.gevent.publish('spa-getactivelist', [hospedagem_map]);
    };

    _publish_checkin = function(checkin_map) {
      $.gevent.publish('spa-checkin', [checkin_map]);
    };

    _publish_gethospedagens = function(hospedagens_map) {
      $.gevent.publish('spa-gethospedagens', [hospedagens_map]);
    };

    checkOut = function(id, date, price) {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.emit('checkout', { id: id, date: date, price: price });
    };

    _publish_checkout = function(checkout_map) {
      $.gevent.publish('spa-checkout', [checkout_map]);
    };

    checkIn = function(id, date) {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.emit('checkin', { id: id, date: date });
    };

    getHospedagens = function(hotel_id, client_id) {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.emit('gethospedagens', { client: client_id, hotel: hotel_id });
    };

    init = function() {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.on('getactivelist', _publish_getactivelist);
      sio.on('checkout', _publish_checkout);
      sio.on('checkin', _publish_checkin);
      sio.on('gethospedagens', _publish_gethospedagens);
    };

    return {
      getActiveList: getActiveList,
      init: init,
      checkOut: checkOut,
      checkIn: checkIn,
      getHospedagens: getHospedagens
    };
  }());

  user = (function() {
    var getUser, _publish_getuser, init;

    _publish_getuser = function(user_map) {
      $.gevent.publish('spa-getuser', [user_map]);
    };

    getUser = function() {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.emit('getuser', {});
    };

    init = function() {
      var sio = isFakeData ? spa.fake.mockSio : spa.data.getSio();
      if (!sio)
        return false;
      sio.on('getuser', _publish_getuser);
    };

    return {
      getUser: getUser,
      init: init
    };
  }());

  initModule = function() {
    client.init();
    hospedagem.init();
    user.init();
  };

  return {
    initModule: initModule,
    client: client,
    hospedagem: hospedagem,
    user: user
  };
}());
