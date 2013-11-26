spa.util = (function () {
  'use strict';
  var makeError, setConfigMap, getDate, convertPrice;

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

  getDate = function(date) {
    var day, month, year;
    day = date.getDate().toString();
    if (day.length === 1)
      day = '0' + day;
    month = (date.getMonth() + 1).toString();
    if (month.length === 1)
      month = '0' + month;
    year = date.getFullYear().toString();

    return day + '/' + month + '/' + year;
  };

  convertPrice = function(price) {
    var p = Number(price.replace(',', '#').replace('.', ',').replace('#', '.'));
    return p;
  };

  return {
    makeError: makeError,
    setConfigMap: setConfigMap,
    getDate: getDate,
    convertPrice: convertPrice
  };
}());
