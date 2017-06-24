angular
        .module('app')

        .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme('altTheme')
                    .primaryPalette('deep-purple')
                    .accentPalette('purple'); // specify primary color, all
            // other color intentions will be inherited
            // from default
        })

        .controller('AppCtrl', ["$scope", "$mdSidenav", "currentAuth",
            function ($scope, $mdSidenav, currentAuth) {

         
            }]);
  