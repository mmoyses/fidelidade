angular.module('spa', ['ngRoute', 'ui.date'])
  .filter('brazilianCurrency', function() {
    return function(input) {
      return input.replace('.', '#').replace(',', '.').replace('#', ',');
    };
  });
