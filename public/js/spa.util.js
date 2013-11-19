spa.util = (function () {
  'use strict';
  var makeError, setConfigMap, setUser, getEmpresa,
      stateMap = {
        user: null
      };

  makeError = function(name_text, msg_text, data) {
    var error = new Error();
    error.name = name_text;
    error.message = msg_text;

    if (data) {
      error.data = data;
    }

    return error;
  };

  setConfigMap = function(arg_map) {
    var input_map = arg_map.input_map,
        settable_map = arg_map.settable_map,
        config_map = arg_map.config_map,
        key_name, error;

    for (key_name in input_map) {
      if (input_map.hasOwnProperty(key_name)) {
        if (settable_map.hasOwnProperty(key_name)) {
          config_map[key_name] = input_map[key_name];
        } else {
          error = makeError('Bad Input', 'Setting config key |' + key_name + '| is not supported');
          throw error;
        }
      }
    }
  };

  setUser = function(user) {
    stateMap.user = user;
  };

  getEmpresa = function() {
    if (stateMap.user && stateMap.user.empresa)
      return stateMap.user.empresa;
    return null;
  };

  return {
    makeError: makeError,
    setConfigMap: setConfigMap,
    setUser: setUser,
    getEmpresa: getEmpresa
  };
}());
