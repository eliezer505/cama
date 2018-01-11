angular.module('app')

        .controller('managmentEditPandingCtrl', function ($scope, usersInEvent, $state, $stateParams, $clubToast, $mdDialog) {

            $scope.isOpen = false;
            $scope.all = false;


            $scope.cancel = function () {
                $scope.users.forEach(function (user) {
                    console.log(user);
                    if (!user.sent && user.approved) {
                        user.approved = false;
                        $scope.users.$save(user);
                    }
                });

                $scope.$parent.partiesShow = true;
                $state.go('managment.parties', {clubId: $stateParams.clubId, role: $stateParams.role});

                $clubToast.show('הרשימות לא עודכנו', 'pending-content', 'error');
            };

            $scope.updatePendingUsers = function ()
            {
                $scope.users.forEach(function (user) {
                    if (!user.sent && user.approved) {
                        user.sent = true;
                        $scope.users.$save(user);
                    }
                });
                  $scope.$parent.partiesShow = true;
                 $state.go('managment.parties', {clubId: $stateParams.clubId, role: $stateParams.role});

                $clubToast.show('הרשימות עודכנו', 'pending-content', 'error');
            };


            $scope.changeState = function (user)
            {
                console.log(user);
                console.log($scope.users);

                $scope.users.$save(user);
            };



            $scope.checkAll = function ()
            {

                if (!$scope.all)
                {
                    $scope.users.forEach(function (user) {
                        user.approved = true;
                        $scope.users.$save(user);
                    });
                    $scope.all = true;
                } else
                {
                    $scope.users.forEach(function (user) {
                        if (!user.sent) {
                            user.approved = false;
                            $scope.users.$save(user);
                        }
                    });
                    $scope.all = false;
                }
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
