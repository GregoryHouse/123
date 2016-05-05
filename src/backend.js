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

            companies[randomCompanyIndex].clients.push({id: users[j].id})
          }

          resolve(users)

        }, function errorCallback(response) {
          throw response
        });
      });

      initCompany
        .then(initUsers);

      $httpBackend.whenGET('/api/companies').respond(function () {
        return [200, companies]
      });

      $httpBackend.whenGET(/^\/api\/companies\/\d+-\d+-\d+-\d+$/).respond(function (method, url, data, headers) {
        var regex = /^\/api\/companies\/(\d+-\d+-\d+-\d+)/g;

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

      $httpBackend.whenPOST('/api/companies/ismailunique').respond(function (method, url, data, headers) {

        var data = JSON.parse(data);

        for (var i = 0, l = companies.length; i < l; i++) {
          if (companies[i].companyMail === data.mail && (data.id && (companies[i].id !== data.id))) {
            return [200, false];
          }
        }

        return [200, true];
      });

      $httpBackend.whenDELETE(/^\/api\/companies\/\d+-\d+-\d+-\d+$/).respond(function (method, url, data, headers) {
        var regex = /^\/api\/companies\/(\d+-\d+-\d+-\d+)/g;

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

      $httpBackend.whenGET(/^\/api\/users\/\d+-\d+-\d+-\d+$/).respond(function (method, url, data, headers) {

        var regex = /^\/api\/users\/(\d+-\d+-\d+-\d+)/g;

        var id = regex.exec(url)[1];

        for (var i = 0, l = users.length; i < l; i++) {
          if (users[i].id === id) {
            var user = users[i];
            break;
          }
        }

        return [200, user];
      });

      $httpBackend.whenPOST('/api/users/ismailunique').respond(function (method, url, data, headers) {

        var data = JSON.parse(data);

        for (var i = 0, l = users.length; i < l; i++) {
          if (users[i].mail === data.mail && (users[i].id !== data.id)) {
            return [200, false];
          }
        }

        return [200, true];
      });

      $httpBackend.whenPOST('/api/users').respond(function (method, url, data, headers) {

        var user = JSON.parse(data);
        if (user.id) {
          for (var i = 0, l = users.length; i < l; i++) {
            if (users[i].id === user.id) {

              if (user.company.id !== users[i].company.id) {

                for (var a = 0, n = companies.length; a < n; a++) {
                  if (users[i].company.id === companies[a].id) {

                    for (var b = 0; b < companies[a].clients.length; b++) {

                      if (users[i].id === companies[a].clients[b].id) {
                        companies[a].clients.splice(companies[a].clients.indexOf(companies[a].clients[b]), 1)
                        break
                      }
                    }
                  }

                  if (user.company.id === companies[a].id) {
                    companies[a].clients.push({id: user.id})
                  }
                }
              }

              users[i] = user;
              break;
            }
          }
        } else {
          user.id = createId();
          users.push(user);

          for (var j = 0, m = companies.length; j < m; j++) {
            if (companies[j].id === user.company.id) {
              companies[j].clients.push({id: user.id})
            }

          }

        }

        return [201, user];
      });

      $httpBackend.whenDELETE(/^\/api\/users\/\d+-\d+-\d+-\d+$/).respond(function (method, url, data, headers) {
        var regex = /^\/api\/users\/(\d+-\d+-\d+-\d+)/g;

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

    return s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }
})();


