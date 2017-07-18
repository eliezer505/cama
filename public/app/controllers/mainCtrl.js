(function () {

    angular.module('app').controller('mainCtrl',
            function ($scope, $state, $stateParams, Auth, currentAuth) {
 
$scope.currentNavItem = "clubes";
       
                $scope.name = currentAuth.displayName;

                $scope.picture = currentAuth.photoURL;
            });
})();