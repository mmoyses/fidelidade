angular.module('spa').controller('RelatoriosController', ['$scope', '$http', function($scope, $http) {

  $scope.dateOptions = {
    dateFormat: 'dd/mm/yy'
  };

  $scope.createReport = function() {
    var i,
        total = 0;
    $http.get('/data/hospedagens?startDate=' + $scope.startDate.valueOf() +
      '&endDate=' + ($scope.endDate || Date.now()))
      .success(function(data) {
        $scope.message = undefined;
        if (data && data.length > 0) {
          for (i = 0; i < data.length; i++) {
            total += data[i].pontos;
          }
          $scope.total = total;
          $scope.entries = data;
        }
      })
      .error(function() {
        $scope.message = 'Nenhuma hospedagem encontrada nesse período';
        $scope.entries = undefined;
      });
  };

}]);
