"use strict";
(function () {
  angular.module('myApp.Companies').controller("myApp.Companies.companyCtrl", ['$scope', 'UsersSrv', 'CompaniesSrv', function ($scope, UsersSrv, CompaniesSrv) {

    CompaniesSrv.getOneCompanyById($scope.company.id, function (resp) {

      $scope.clientsCompany = resp.clients ? resp.clients.length : 0;

      $scope.companyClients = resp.clients;
      $scope.companyUsers = [];

      if($scope.companyClients) {
        for (var j = 0, l = $scope.companyClients.length; j < l; j++) {
          UsersSrv.getOneUserById($scope.companyClients[j].id, function (resp) {
            $scope.companyUsers.push({firstName: resp.firstName, lastName: resp.lastName});
          });
        }
      }
    });
  }])

}());


