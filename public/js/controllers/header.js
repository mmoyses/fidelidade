angular.module('fidelidade.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
  $scope.global = Global;

  $scope.menu = [
  {
    title: 'Check-in',
    link: 'checkin'
  },
  {
    title: 'Check-out',
    link: 'checkout'
  },
  {
    title: 'Consultar',
    link: 'consultar'
  },
  {
    title: 'Usuários',
    link: 'usuarios'
  },
  {
    title: 'Relatórios',
    link: 'relatorios'
  }
  ];
}]);