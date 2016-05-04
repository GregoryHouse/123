"use strict";
(function () {
  angular.module('myApp.Companies').controller("myApp.Companies.editCompaniesCtrl", ['$scope', 'CompaniesSrv', function ($scope, CompaniesSrv) {

    if ($scope.editCompanyId === 'newCompany') {
      $scope.editCompany = {};
    } else {
      $scope.editCompany = CompaniesSrv.getOneCompanyById($scope.editCompanyId, function (resp) {
        $scope.editCompany = angular.copy(resp);
      });
    }

    $scope.saveCompany = function (form, editCompany) {

      if (form.$valid) {

        $scope.disabledSave = true;

        CompaniesSrv.saveUpdateCompany(editCompany, function (resp) {

          $scope.$emit('scroll-to-company', resp.id);

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

          $scope.openCompanyForm();
          $scope.disabledSave = false;
        });
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
