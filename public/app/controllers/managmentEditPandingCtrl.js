angular.module('app')
        .controller('managmentEditPandingCtrl', function ($scope, usersInEvent, $state, $stateParams, $clubToast) {

        console.log(usersInEvent);
        $scope.users = usersInEvent;


        });
