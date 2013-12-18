angular.module('security.service', [])
  .factory('security', ['$http', '$q', function($http, $q) {
    var service = {
      currentUser: null,
      requestCurrentUser: function() {
        if (service.isAuthenticated()) {
          return $q.when(service.currentUser);
        } else {
          return $http.get('/data/current-user').then(function(response) {
            service.currentUser = response.data;
            return service.currentUser;
          });
        }
      },
      isAuthenticated: function() {
        return !!service.currentUser;
      },
      isRegularUser: function() {
        return !!(service.currentUser && service.currentUser.username);
      },
      isAdmin: function() {
        return !!(service.currentUser && service.currentUser.admin);
      },
      block: function() {
        var defer = $q.defer();
        defer.reject();
        return defer.promise;
      }
    };
    return service;
  }])
  .provider('authorization', {
    requireAdminUser: ['authorization', function(authorization) {
      return authorization.requireAdminUser();
    }],
    requireAuthenticatedUser: ['authorization', function(authorization) {
      return authorization.requireAuthenticatedUser();
    }],
    $get: ['security', function(security) {
      var service = {
        requireAuthenticatedUser: function() {
          var promise = security.requestCurrentUser().then(function(userInfo) {
            if (!security.isRegularUser()) {
              return security.block();
            }
          });
          return promise;
        },
        requireAdminUser: function() {
          var promise = security.requestCurrentUser().then(function(userInfo) {
            if (!security.isAdmin()) {
              return security.block();
            }
          });
          return promise;
        }
      };
      return service;
    }]
  });
