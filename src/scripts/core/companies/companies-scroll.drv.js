angular.module('myApp.Companies').directive('companiesScroll',
  ['$timeout', function ($timeout) {
    return {

      link: function (scope, element) {

        scope.$on('scroll-to-company', function (event, data) {

            $timeout(function () {
              var newCompany = element.find('[company-id =\'' + data + '\']');
              var scrollTop = newCompany.offset().top;
              window.scrollBy(0, scrollTop);

              newCompany.addClass('newCompany');
              $timeout(function () {
                newCompany.removeClass('newCompany')
              }, 3000);

            }, 0);
          }
        );
      }
    }
  }]);
