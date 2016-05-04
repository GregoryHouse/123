angular.module('myApp.Users').directive('uniqueEmail', ["UsersSrv",
  function () {
    return {
      restrict: "A,E",
      controller: "myApp.Users.editUsersCtrl",
      require: "ngModel",
      link: function (scope, element, attributes, ctrl) {


        scope.$watch(function(){
          return ctrl.$viewValue
        }, function () {

          if(ctrl.$viewValue){
            scope.isEmailUnique(ctrl.$viewValue, ctrl);
          }
        });

      }
    };
  }
]);
