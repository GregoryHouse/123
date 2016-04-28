"use strict";
(function () {
  angular.module("myApp.Users").service('UsersSrv', ['$http', function ($http) {

    var UsersSrv = {
      saveUpdateUser: saveUpdateUser,
      deleteUser: deleteUser,
      getAllUsers: getAllUsers,
      getOneUserById: getOneUserById,
    };

    function saveUpdateUser(editUser, callback) {

      if (!editUser.name && editUser.name > 3) {
        throw 'Name is required'
      } else {

        var user = {
          firstName: editUser.firstName,
          lastName: editUser.lastName,
          company: {id: editUser.company.id},
          birthDay: Date.parse(editUser.birthDay),
          type: editUser.type,
          mail: editUser.mail
        };
        if(editUser.id){
          user.id = editUser.id
        }

        return $http.post('/api/users', user)
          .then(function success(resp) {
            if (callback) {
              callback(resp.data)
            }
          }, function error() {
            return console.log('error');
          })
      }
    }

    function deleteUser(removeUser, callback) {

      return $http.delete('/api/users/' + removeUser.id)
        .then(function success(resp) {
          if(callback){
            callback(resp.data)
          }
        })
    }

    function getAllUsers(callback) {

      return $http.get('/api/users')
        .then(function (resp) {
          if(callback){
            callback(resp.data)
          }
          return resp.data;
        })
    }

    function getOneUserById(userId, callback) {

      return $http.get('/api/users/'+userId)
        .then(function (resp) {
          if(callback){
            callback(resp.data)
          }
          return resp.data;
        })
    }

    return UsersSrv;
  }]);

})();

