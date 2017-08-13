angular
        .module('app')
        .controller('managmentCtrl', function ($scope, $state, clubesAssign, userClubesRoll) {

            $scope.clubes = clubesAssign;
            $scope.roles = userClubesRoll;
            console.log(userClubesRoll);
            console.log(clubesAssign);
//            $state.go('managment.parties');


            $scope.back = function () {
                $state.go('clubears.main.clubes');
            };


        });


