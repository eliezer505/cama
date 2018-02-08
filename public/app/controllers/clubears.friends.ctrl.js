(function () {

    angular.module('app').controller('clubears.friends.ctrl',
            function ($scope, $state, $stateParams, Auth, currentAuth, facebookService) {
                console.log(currentAuth);
                console.log(currentAuth.providerData[0].uid);
                $scope.currentNavItem = "all-friends";

                $scope.name = currentAuth.displayName;

                $scope.picture = currentAuth.photoURL;

                facebookService.getMyLastName(currentAuth.providerData[0].uid)
                        .then(function (response) {
                            console.log(response.last_name);
                        }
                        );

            });
})();