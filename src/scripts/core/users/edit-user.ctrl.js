"use strict";
(function () {
  angular.module('myApp.Users').controller("myApp.Users.editUsersCtrl", ['$scope', 'UsersSrv', 'CompaniesSrv', function ($scope, UsersSrv, CompaniesSrv) {

    if ($scope.editUserId === 'newUser') {
      $scope.editUser = {
        type: 'USER'
      };
    } else {
      UsersSrv.getOneUserById($scope.editUserId, function (resp) {
        $scope.editUser = angular.copy(resp);
        $scope.editUser.birthDay = new Date($scope.editUser.birthDay).toLocaleDateString();

      });
    }

    CompaniesSrv.getAllCompanies(function (resp) {
      $scope.companies = resp;
    });

    $scope.formatCompany = function (company) {
      if (company && company.id && $scope.companies) {
        for(var i = 0, len = $scope.companies.length; i < len; i++){
          if(company.id === $scope.companies[i].id){
            return $scope.companies[i].name;
          }
        }
      }
    };

    $scope.chooseRole = function (key) {
      $scope.editUser.type = key;
    };

    $scope.saveUser = function (form) {
      if (form.$valid) {
        //if (UsersSrv.unique(editUser.mail)) {

        UsersSrv.saveUpdateUser($scope.editUser, function (resp) {

          if ($scope.editUser.id) {
            for (var i = 0; i < $scope.users.length; i++) {
              if ($scope.users[i].id === resp.id) {
                $scope.users[i] = resp;
                break;
              }
            }
          } else {
            $scope.users.push(resp)
          }
        });

        $scope.openUserForm()
      }
      //}
      else {
        $scope.tryToSave = true;
      }
    };

    $scope.isShowErrors = function (form, formFild) {
      return form && form[formFild] && (form[formFild].$dirty || form[formFild].$touched || $scope.tryToSave) && form[formFild].$invalid;
    }

}]);

}());
