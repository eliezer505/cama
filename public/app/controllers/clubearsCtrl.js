(function () {

    angular.module('app').controller('clubearsCtrl',
                 function ($scope, $mdSidenav, currentAuth) {

                $scope.currentAuth = currentAuth;
                $scope.showMobileMainHeader = true;

           });
})();