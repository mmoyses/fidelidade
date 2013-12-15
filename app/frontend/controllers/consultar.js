angular.module('spa').controller('ConsultarController', ['$scope', '$http', function($scope, $http) {

  $scope.findCliente = function() {
    $http.get('/data/cliente/hospedagens/' + $scope.id)
      .success(function(data) {
        $scope.error = false;
        $scope.nome = data.nome;
        if (data.hospedagens && data.hospedagens.length > 0) {
          $scope.hospedagens = data.hospedagens;
          $scope.message = undefined;
        } else {
          $scope.message = 'Não há hospedagens para esse cliente';
          $scope.hospedagens = undefined;
        }
      })
      .error(function() {
        $scope.error = true;
        $scope.nome = 'Não foi possível encontrar um usuário com esse id';
        $scope.message = undefined;
        $scope.hospedagens = undefined;
      });
  };

}]);
