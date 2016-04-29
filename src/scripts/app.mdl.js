"use strict";
(function () {
  angular.module("myApp", ["myApp.Users", "myApp.Companies", "ui.router", 'ngMessages', 'ui.bootstrap', 'ngAnimate'])

    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/users');

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

})();
