(function () {

    angular.module('app').controller('mainCtrl',
            function ($scope, $state, $stateParams, Auth, currentAuth) {
                $scope.auth = Auth;

                $scope.refUser = $stateParams.userObj;

                $scope.name = $scope.refUser.first_name + ' ' + $scope.refUser.last_name;

                $scope.picture = $scope.refUser.picture;
            });
})();