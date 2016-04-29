"use strict";
(function () {
  angular.module('myApp.Users').controller("myApp.Users.userCtrl",
    ['$scope', 'UsersSrv', 'CompaniesSrv',
      function ($scope, UsersSrv, CompaniesSrv) {

        CompaniesSrv.getOneCompanyById($scope.user.company.id, function (resp) {
          $scope.userCompany = resp;
        });

        $scope.deleteUser = function () {
          UsersSrv.deleteUser($scope.user.id, function (resp) {
            for (var i = 0; i < $scope.users.length; i++) {
              if ($scope.users[i].id === resp.id) {
                $scope.users.splice($scope.users.indexOf($scope.users[i]), 1);
                break;
              }
            }
          });
        };

      }])

}());


