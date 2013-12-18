angular.module('spa', ['ngRoute', 'ui.date', 'security.service'])
  .filter('brazilianCurrency', function() {
    return function(input) {
      return input.replace('.', '#').replace(',', '.').replace('#', ',');
    };
  });
