
angular.module('app').controller('clubPartyCtrl',
        function ($scope, $state, $mdDialog, $clubToast, currentClub,clubesEvents,userObj,EVENTS) {
            $scope.clubEvents = clubesEvents;
            console.log($scope.clubes);
            console.log(currentClub);
            console.log(userObj); 

            $scope.showConfirm = function (eventId,ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                console.log(ev);
                console.log(eventId);
                var confirm = $mdDialog.confirm()
                        .title('היי, בחרת להרשם למסיבה, יש אישור?')
                        .targetEvent(ev)
                        .ok('!כן תרשמו אותי')
                        .cancel('אחשוב על זה');

                $mdDialog.show(confirm).then(function () {
                    console.log(eventId);
                    $scope.status = 'ok.';
                    EVENTS.addUserToEvent();
                    $clubToast.show('הבקשה לרישום נשלחה', 'toaster-ancor', 'success');
                }, function () {
                    $scope.status = 'no.';
                    $clubToast.show('בקשה לרישום בוטלה', 'toaster-ancor', 'error');
                });
            };



            function DialogController($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            }
        });
  