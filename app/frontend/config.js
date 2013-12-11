angular.module('spa').config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/checkin', {
      templateUrl: 'partials/checkin.html'
    }).
    when('/checkout', {
      templateUrl: 'partials/checkout.html'
    }).
    when('/consultar', {
      templateUrl: 'partials/consultar.html'
    }).
    when('/relatorios', {
      templateUrl: 'partials/relatorios.html'
    }).
    when('/home', {
      templateUrl: 'partials/index.html'
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);
