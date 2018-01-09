angular.module('app')

        .controller('managmentEditPandingCtrl', function ($scope, usersInEvent, $state, $stateParams, $clubToast, $mdDialog) {

            $scope.isOpen = false;

            $scope.back = function ()
            {
                $scope.$parent.partiesShow = true;
                $state.go('managment.parties', {clubId: $stateParams.clubId, role: $stateParams.role});
            };

            $scope.checkAll = function ()
            {
                
            };

            $scope.chart = function ()
            {

            };

            $scope.filter = function ()
            {

            };

            console.log(usersInEvent);
            $scope.users = usersInEvent;
            $scope.showConfirm = function (ev, user) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm({
                    controller: AvatarCtrl,
                    templateUrl: 'app/templete/avatar.tmpl.html',
                    parent: angular.element(document.body),
                    locals: {
                        User: user
                    },
                    targetEvent: ev
                });
                $mdDialog.show(confirm).then(function () {
                    $scope.status = 'Confirm resolved';
                    $scope.codeRunningBeforeResolve = 'code only runs after resolve';
                });

                $scope.codeRunningBeforeResolve = 'code is running before resolve!';
            };
        });



function AvatarCtrl($scope, $mdDialog, User) {
    $scope.User = User;
    console.log(User);
    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}
