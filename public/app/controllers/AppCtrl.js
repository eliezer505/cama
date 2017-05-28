angular
        .module('app')

        .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme('altTheme')
                    .primaryPalette('deep-purple')
                    .accentPalette('purple'); // specify primary color, all
            // other color intentions will be inherited
            // from default
        })

        .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdMedia, $http) {

        

            $scope.showMobileMainHeader = true;
            $scope.openSideNavPanel = function () {
                $mdSidenav('left').open();
            };
            $scope.closeSideNavPanel = function () {
                $mdSidenav('left').close();
            };
//            $scope.toggleLeft = buildToggler('right');
//            $scope.toggleRight = buildToggler('left');
//
//            function buildToggler(componentId) {
//                return function () {
//                    $mdSidenav(componentId).toggle();
//                };
//            }
        });
  