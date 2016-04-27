"use strict";
(function () {
  angular.module("myApp", ["myApp.Users", "myApp.Companies", "ui.router", 'ngMessages', 'ui.bootstrap', 'ngAnimate'])

    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function ($stateProvider) {

        $stateProvider
          .state('users', {
            url: "/users",
            controller: "myApp.Users.usersCtrl",
            templateUrl: "scripts/core/users/users.tpl.html"
          })

          .state('companies', {
            url: "/companies",
            controller: "myApp.Companies.companiesCtrl",
            templateUrl: 'scripts/core/companies/companies.tpl.html'
          });
      }]);

  angular.module('myApp').directive('datePicker',
    function () {

      return {
        restrict: "A,E,C",
        link: function (scope, element) {
          $(function () {
            $(element).datepicker({
              format: "dd.mm.yyyy"
            });
          });
        }
      };
    });

})();
