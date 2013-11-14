spa.model = (function() {
  'use strict';
  var configMap = {},
      stateMap = {},
      isFakeData = true,
      client, initModule;

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
