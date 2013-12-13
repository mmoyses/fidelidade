angular.module('spa').controller('CheckoutController', ['$scope', '$http', function($scope, $http) {

  $scope.dateOptions = {
    dateFormat: 'dd/mm/yy'
  };

  $scope.fetch = function() {
    $http.get('/data/checkout')
      .success(function(data) {
        $scope.hospedagens = data;
        $scope.error = undefined;
      })
      .error(function() {
        $scope.hospedagens = undefined;
        $scope.error = 'Não há hospedagens em aberto';
      });
  };

  $scope.checkout = function() {
    $http.post('/data/checkout',
      { hospedagem: $scope.hospedagens[$scope.h]._id, date: $scope.date, price: $scope.price })
      .success(function() {
        $scope.failure = false;
        $scope.success = true;
        $scope.message = 'Check-out realizado com sucesso';
        $scope.hospedagens.splice($scope.h, 1);
        delete $scope.h;
        delete $scope.date;
        delete $scope.price;
      })
      .error(function(data) {
        $scope.failure = true;
        $scope.success = false;
        $scope.message = data.error;
      });
  };

}]);
