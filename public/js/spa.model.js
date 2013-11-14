spa.model = (function() {
  'use strict';
  var configMap = {},
      stateMap = {},
      isFakeData = true,
      client, initModule;

  client = (function() {
    var getList, getClient;

    getList = function() {
      var list = isFakeData ? spa.fake.getClientList() : spa.data.getClientList();

      return list;
    };

    getClient = function(id) {
      var client = isFakeData ? spa.fake.getClient(id) : spa.data.getClient(id);

      return client;
    };

    return {
      getList: getList,
      getClient: getClient
    }
  }());

  initModule = function() {};

  return {
    initModule: initModule,
    client: client
  };

}());
