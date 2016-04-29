"use strict";
(function () {
  angular.module("myApp.Companies").service('CompaniesSrv', ['$http','UsersSrv', function ($http, UsersSrv) {

    var CompaniesSrv = {
      getAllUserByCompany: getAllUserByCompany,
      saveUpdateCompany: saveUpdateCompany,
      deleteCompany: deleteCompany,
      getAllCompanies: getAllCompanies,
      getOneCompanyById: getOneCompanyById
    };

    function getAllUserByCompany(clients) {
      var companyClients = [];
        for (var j = 0, l = clients.length; j < l; j++) {
          UsersSrv.getOneUserById(clients[j].id, function (resp) {
            companyClients.push({firstName: resp.firstName, lastName: resp.lastName});
          });
        }

        return companyClients
      }

      function saveUpdateCompany(editCompany, callback) {

        if (!editCompany.name && editCompany.name > 3) {
          throw 'Name is required'
        } else {

          var company = {
            name: editCompany.name,
            addressCompany: editCompany.addressCompany,
            companyMail: editCompany.companyMail,
            yearFoundation: Date.parse(editCompany.yearFoundation),
            clients: editCompany.clients
          };

          if (editCompany.id) {
            company.id = editCompany.id
          }

          return $http.post('/api/companies', company)
            .then(function success(resp) {
              console.log('success', resp.data);
              if (callback) {
                callback(resp.data)
              }
            }, function error() {
              return console.log('error');
            })
        }
      }

      function deleteCompany(removeCompany, callback) {

        return $http.delete('/api/companies/' + removeCompany.id)
          .then(function success(resp) {
            if (callback) {
              callback(resp.data)
            }
          })
      }

      function getAllCompanies(callback) {

        return $http.get('/api/companies')
          .then(function (resp) {
            if (callback) {
              callback(resp.data)
            }
            return resp.data;
          })
      }

      function getOneCompanyById(companyId, callback) {

        return $http.get('/api/companies/' + companyId)
          .then(function (resp) {
            if (callback) {
              callback(resp.data)
            }
            return resp.data;
          })
      }

      return CompaniesSrv;
    }

    ]);

})();

