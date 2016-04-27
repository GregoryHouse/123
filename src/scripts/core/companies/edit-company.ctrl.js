"use strict";
(function () {
  angular.module('myApp.Companies').controller("myApp.Companies.editCompaniesCtrl", ['$scope', 'CompaniesSrv', function ($scope, CompaniesSrv) {

    if ($scope.editCompanyId === 'newCompany') {
      $scope.editCompany = {};
    } else {
      $scope.editCompany = CompaniesSrv.getOneCompanyById($scope.editCompanyId, function (resp) {
        $scope.editCompany = angular.copy(resp);
        $scope.editCompany.yearFoundation = new Date($scope.editCompany.yearFoundation).toLocaleDateString();
      });
    }

    $scope.saveCompany = function (form, editCompany) {

      if (form.$valid) {
        CompaniesSrv.saveUpdateCompany(editCompany, function (resp) {

          if (editCompany.id) {
            for (var i = 0; i < $scope.companies.length; i++) {
              if ($scope.companies[i].id === editCompany.id) {
                $scope.companies[i] = editCompany;
                break;
              }
            }
          } else {
            $scope.companies.push(resp)
          }

          $scope.tryToSave = true;
        });

        $scope.openCompanyForm()
      }
      else {
        $scope.tryToSave = true;
      }
    };

    $scope.isShowErrors = function (form, formFild) {
      return form && form[formFild] && (form[formFild].$dirty || form[formFild].$touched || $scope.tryToSave) && form[formFild].$invalid;
    }

  }]);


}());
