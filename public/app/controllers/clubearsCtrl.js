(function () {

    angular.module('app').controller('clubearsCtrl',
                 function ($scope, $mdSidenav, currentAuth) {

                $scope.currentAuth = currentAuth;

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
})();