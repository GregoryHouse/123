"use strict";
(function () {
  angular.module('myApp.Users').controller("myApp.Users.userCtrl", ['$scope', 'UsersSrv', 'CompaniesSrv', function ($scope, UsersSrv, CompaniesSrv) {

    CompaniesSrv.getOneCompanyById($scope.user.company.id, function(resp){
      $scope.userCompany = resp;
    });
  }])

}());


