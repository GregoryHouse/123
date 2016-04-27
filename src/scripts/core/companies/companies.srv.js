"use strict";
(function () {
  angular.module("myApp.Companies").service('CompaniesSrv', ['$http', function ($http) {

    var CompaniesSrv = {
      saveUpdateCompany: saveUpdateCompany,
      deleteCompany: deleteCompany,
      getAllCompanies: getAllCompanies,
      getOneCompanyById: getOneCompanyById
      //unique: unique
    };

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

        console.log(company.yearFoundation)
        if(editCompany.id){
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
          if(callback){
            callback(resp.data)
          }
        })
    }

    function getAllCompanies(callback) {

      return $http.get('/api/companies')
        .then(function (resp) {
          if(callback){
            callback(resp.data)
          }
          return resp.data;
        })
    }

    function getOneCompanyById(companyId, callback) {

      return $http.get('/api/companies/'+companyId)
        .then(function (resp) {
          if(callback){
            callback(resp.data)
          }
          return resp.data;
        })
    }

    return CompaniesSrv;
  }]);

})();

