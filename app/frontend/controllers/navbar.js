angular.module('spa').controller('NavbarController', ['$scope', '$location', 'security', function($scope, $location, security) {
  $scope.highlight = function(path) {
    return $location.path().substr(0, path.length) === path && $location.path().length === path.length;
  };

  security.requestCurrentUser().then(function(user) {
    $scope.nome = user.nome;
    if (user.username) {
      $scope.navs = [
        { label: 'Check-in', link: '/checkin' },
        { label: 'Check-out', link: '/checkout' },
        { label: 'Consultar', link: '/consultar' },
        { label: 'Relatórios', link: '/relatorios' }
      ];
    } else {
      $scope.navs = [
        { label: 'Histórico', link: '/historico' },
        { label: 'Resgatar', link: '/resgatar' }
      ];
    }
  });
}]);
