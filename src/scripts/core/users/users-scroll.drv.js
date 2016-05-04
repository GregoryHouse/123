angular.module('myApp.Users').directive('usersScroll',
  ['$timeout', function ($timeout) {
    return {

      link: function (scope, element) {

        scope.$on('scroll-to-user', function (event, data) {

            $timeout(function () {
              var newUser = element.find('[user-id =\'' + data + '\']');
              var scrollTop = newUser.offset().top;
              window.scrollBy(0, scrollTop);

              newUser.addClass('newUser');
              $timeout(function () {
                newUser.removeClass('newUser')
              }, 3000);

            }, 0);
          }
        );
      }
    }
  }]);
