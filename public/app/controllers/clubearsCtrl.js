(function () {

    angular.module('app').controller('clubearsCtrl',
            function ($scope, currentAuth, userObj) {


                $scope.currentAuth = currentAuth;
                $scope.currentUser = userObj;
                $scope.showMobileMainHeader = true;

            });
})();