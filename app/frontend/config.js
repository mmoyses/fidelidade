angular.module('spa')
  .config(['$routeProvider', '$locationProvider', 'authorizationProvider',
  function($routeProvider, $locationProvider, authorizationProvider) {
  $routeProvider.
    when('/checkin', {
      templateUrl: 'partials/checkin.html',
      resolve: {
        authenticated: authorizationProvider.requireAuthenticatedUser
      }
    }).
    when('/checkout', {
      templateUrl: 'partials/checkout.html',
      resolve: {
        authenticated: authorizationProvider.requireAuthenticatedUser
      }
    }).
    when('/consultar', {
      templateUrl: 'partials/consultar.html',
      resolve: {
        authenticated: authorizationProvider.requireAuthenticatedUser
      }
    }).
    when('/relatorios', {
      templateUrl: 'partials/relatorios.html',
      resolve: {
        authenticated: authorizationProvider.requireAuthenticatedUser
      }
    }).
    when('/home', {
      templateUrl: 'partials/index.html'
    }).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true).hashPrefix('!');
}]);
