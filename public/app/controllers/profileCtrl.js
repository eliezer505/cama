angular.module('app').controller('profileCtrl',
        function ($scope, $stateParams, Auth, currentAuth) {

            $scope.auth = Auth;

            $scope.refUser = $stateParams.userObj;

            $scope.name = $scope.refUser.first_name + ' ' + $scope.refUser.last_name;

            $scope.picture = $scope.refUser.picture;
            $scope.gender = $scope.refUser.gender=='male' ? 'בן':'בת';
            $scope.status = "רווק";
          
            $scope.age = "24";


        });