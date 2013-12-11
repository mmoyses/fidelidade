angular.module('spa').controller('NavbarController', ['$scope', '$location', function($scope, $location) {
  $scope.highlight = function(path) {
    return $location.path().substr(0, path.length) === path && $location.path().length === path.length;
  };
}]);
