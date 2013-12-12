angular.module('spa').controller('CheckinController', ['$scope', '$http', function($scope, $http) {

  $scope.dateOptions = {
    dateFormat: 'dd/mm/yy'
  };

  $scope.isNomeEmpty = function() {
    return $scope.nome ? ($scope.error ? true : false) : true;
  };

  $scope.isDateEmpty = function() {
    return $scope.date ? false : true;
  };

  $scope.findCliente = function() {
    $http.get('/data/cliente/' + $scope.id)
      .success(function(data) {
        $scope.error = false;
        $scope.nome = data.nome;
      })
      .error(function() {
        $scope.error = true;
        $scope.nome = 'Não foi possível encontrar um usuário com esse id';
      });
  };

  $scope.checkin = function() {
    $http.post('/data/checkin', { cliente: $scope.id, date: $scope.date })
      .success(function() {
        $scope.failure = false;
        $scope.success = true;
        $scope.message = 'Check-in realizado com sucesso';
        delete $scope.id;
        delete $scope.date;
      })
      .error(function(data) {
        $scope.failure = true;
        $scope.success = false;
        $scope.message = data.error;
      });
  };

}]);
