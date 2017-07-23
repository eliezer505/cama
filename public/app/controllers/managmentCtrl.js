angular
        .module('app')
        .controller('managmentCtrl', function ($scope,$state,$mdSidenav) {

   $scope.openSideNavPanel = function () {
                $mdSidenav('left').open();
            };
            $scope.closeSideNavPanel = function () {
                $mdSidenav('left').close();
            };


            $state.go('managment.parties');


        });


