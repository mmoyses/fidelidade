spa.model = (function() {
  'use strict';
  var configMap = {},
      stateMap = {},
      isFakeData = true,
      client, initModule;

  client = (function() {
    var getList, getClient, checkIn, init, _publish_getclient, _publish_checkin;

    _publish_getclient = function(client_map) {
      $.gevent.publish('spa-getclient', [client_map]);
    };

    _publish_checkin = function(arguments) {
      // body...
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
      sio.on('checkin', _publish_checkin);
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
      checkIn: checkIn,
      init: init
    }
  }());

  initModule = function() {
    client.init();
  };

  return {
    initModule: initModule,
    client: client
  };

}());
