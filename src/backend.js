"use strict";
(function () {

  angular.module('myApp')

    .config(function ($provide) {
      $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    })

    .run(function ($httpBackend, $http) {

      var companies, users;

      var initCompany = new Promise(function (resolve, reject) {
        $http({
          method: 'GET',
          url: '/json-models/companies.json'
        }).then(function successCallback(response) {
          companies = response.data;

          for (var j = 0, l = companies.length; j < l; j++) {
            companies[j].id = createId();
          }

          resolve(companies)
        }, function errorCallback(response) {
          throw response
        });
      });

      var initUsers = new Promise(function (resolve, reject) {
        $http({
          method: 'GET',
          url: '/json-models/users.json'
        }).then(function successCallback(response) {
          users = response.data;

          for (var j = 0, l = users.length; j < l; j++) {
            users[j].id = createId();
            var randomCompanyIndex = Math.floor(Math.random() * (companies.length));

            users[j].company = {
              id: companies[randomCompanyIndex].id
            };
            //companies[randomCompanyIndex].clients.push({id: users[j].id})
          }

          resolve(users)

        }, function errorCallback(response) {
          throw response
        });
      });

      initCompany
        .then(initUsers);


      function userInCompany() {

        for (var j = 0, l = companies.length; j < l; j++) {
          companies[j].clients = [];

          for (var m = 0, k = users.length; m < k; m++) {
            if (companies[j].id === users[m].company.id) {
              companies[j].clients.push({id: users[m].id});
            }
          }
        }
      }

      $httpBackend.whenGET('/api/companies').respond(function () {
        userInCompany();
        return [200, companies]
      });

      $httpBackend.whenGET(/^\/api\/companies\/\d+$/).respond(function (method, url, data, headers) {
        var regex = /^\/api\/companies\/(\d+)/g;

        var id = regex.exec(url)[1];

        for (var i = 0, l = companies.length; i < l; i++) {
          if (companies[i].id === id) {
            var company = companies[i];
            break;
          }
        }

        return [200, company];
      });


      $httpBackend.whenPOST('/api/companies').respond(function (method, url, data, headers) {
        var company = JSON.parse(data);
        if (company.id) {
          for (var i = 0, l = companies.length; i < l; i++) {
            if (companies[i].id === company.id) {
              companies[i] = company;
              break;
            }
          }
        } else {
          company.id = createId();
          companies.push(company)
        }

        return [201, company];
      });


      $httpBackend.whenDELETE(/^\/api\/companies\/\d+$/).respond(function (method, url, data, headers) {
        var regex = /^\/api\/companies\/(\d+)/g;

        var id = regex.exec(url)[1];

        for (var i = 0, l = companies.length; i < l; i++) {
          if (companies[i].id === id) {
            var index = companies.indexOf(companies[i]);
            var company = companies[i];
            companies.splice(index, 1);
            break;
          }
        }

        return [204, company];
      });

      $httpBackend.whenGET('/api/users').respond(function () {
        return [200, users];
      });

      $httpBackend.whenGET(/^\/api\/users\/\d+$/).respond(function (method, url, data, headers) {

        var regex = /^\/api\/users\/(\d+)/g;

        var id = regex.exec(url)[1];

        for (var i = 0, l = users.length; i < l; i++) {
          if (users[i].id === id) {
            var user = users[i];
            break;
          }
        }

        return [200, user];
      });


      $httpBackend.whenPOST('/api/users').respond(function (method, url, data, headers) {
        var user = JSON.parse(data);
        if (user.id) {
          for (var i = 0, l = users.length; i < l; i++) {
            if (users[i].id === user.id) {
              users[i] = user;
              break;
            }
          }
        } else {
          user.id = createId();
          users.push(user)
        }

        return [201, user];
      });

      $httpBackend.whenDELETE(/^\/api\/users\/\d+$/).respond(function (method, url, data, headers) {
        var regex = /^\/api\/users\/(\d+)/g;

        var id = regex.exec(url)[1];

        for (var i = 0, l = users.length; i < l; i++) {
          if (users[i].id === id) {
            var index = users.indexOf(users[i]);
            var user = users[i];
            users.splice(index, 1);
            break;
          }
        }

        return [204, user];
      });

      $httpBackend.whenGET(/\.html|\.json/).passThrough();
    });

  function createId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(10)
        .substring(1);
    }

    return s4();
  }
})();


