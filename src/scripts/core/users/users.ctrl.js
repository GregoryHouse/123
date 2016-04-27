"use strict";
(function () {
  angular.module('myApp.Users').controller("myApp.Users.usersCtrl", ['$scope', 'UsersSrv', function ($scope, UsersSrv) {

    $scope.userRole = {
      'ADMIN': 'Admin',
      'USER': 'User'
    };

    $scope.editUserId = '';
    UsersSrv.getAllUsers(function(resp){
      $scope.users = resp;
    });

    $scope.orderUser = {
      predicate: 'firstName',
      reverse: false
    };

    $scope.sortUsers = function (predicate) {
      $scope.orderUser.reverse = ($scope.orderUser.predicate === predicate) ? !$scope.orderUser.reverse : false;
      $scope.orderUser.predicate = predicate;
    };

    $scope.openUserForm = function (userId) {

      if (!userId) {
        $scope.editUserId = '';
      } else if (userId === 'newUser') {
        $scope.editUserId = 'newUser';
      } else {
          $scope.editUserId = userId;
      }
    };

    $scope.deleteUser = function (userId) {
      UsersSrv.deleteUser(userId, function(resp){
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


