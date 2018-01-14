angular.module('app')

        .controller('managmentEditPandingCtrl', function ($scope, usersInEvent, $state, $stateParams, $clubToast, $mdDialog) {

            console.log(usersInEvent);
            $scope.users = usersInEvent;
            $scope.isOpen = false;
            $scope.all = false;
            $scope.updated = false;
            $scope.isFilterOpen = false;
            $scope.countt = 0;
            
            $scope.checkChanged = function () {
            };

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

                $clubToast.show('הרשימות לא עודכנו', 'managment-content', 'error');
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

                $clubToast.show('הרשימות עודכנו', 'managment-content', 'error');
            };


            $scope.changeState = function (user)
            {
                console.log(user);
                console.log($scope.users);
                if (user.approved)
                    $scope.updated = true;
                else
                    $scope.updated = false;
                $scope.users.$save(user);
            };



            $scope.checkAll = function ()
            {
                var count = 0;
                if (!$scope.all)
                {

                    $scope.users.forEach(function (user) {
                        if (!user.approved) {
                            user.approved = true;
                            $scope.users.$save(user);
                            count++;
                        }
                    });
                    $scope.all = true;
                    $scope.updated = true;
                    $clubToast.show('סומנו ' + count + ' בליינים', 'pending-content', 'success');
                } else
                {
                    $scope.users.forEach(function (user) {
                        if (!user.sent) {
                            user.approved = false;
                            $scope.users.$save(user);
                            count++;
                        }
                    });
                    $scope.all = false;
                    $scope.updated = false;
                    $clubToast.show('הוסרו ' + count + ' בליינים', 'pending-content', 'success');
                }
            };

            $scope.chart = function ()
            {

            };

            $scope.filter = function ()
            {

            };


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
